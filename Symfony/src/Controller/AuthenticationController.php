<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use GuzzleHttp\Client;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api', name: 'api_')]
class AuthenticationController extends AbstractController
{
    #[Route('/register', name: 'api_register', methods:['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        JWTTokenManagerInterface $jwtManager,
        ValidatorInterface $validator): JsonResponse
    {
        $request = json_decode($request->getContent(), true);

        $email = $request['email'];
        $passwordPlain = $request['password'];
        $username = $request['username'];

        $emailExists = $em->getRepository(User::class)->findOneBy(['email' => $email]);

        if ($emailExists) {
            return $this->json([
                'message' => 'This email is already registered',
            ], 400);
        }

        $user = new User();

        $user->setEmail($email);
        $user->setPassword($passwordPlain);
        $user->setUsername($username);

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $passwordHashed = $hasher->hashPassword($user, $passwordPlain);
        $user->setPassword($passwordHashed);

        $token = $jwtManager->create($user);

        if (!$token) {
            return $this->json([
                'message' => 'There was problem with generating jwt token'
            ], 500);
        }

        $em->persist($user);
        $em->flush();

        return $this->json([
            'token' => $token
        ]);
    }

    #[Route('/login', name: 'api_login', methods:['POST'])]
    public function login(
        Request $request,
        EntityManagerInterface $em,
        JWTTokenManagerInterface $jwtManager,
        UserPasswordHasherInterface $hasher): JsonResponse
    {
        $request = json_decode($request->getContent(), true);
        
        $email = $request['email'];
        $password = $request['password'];

        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user || !$hasher->isPasswordValid($user, $password)) {
            return $this->json([
                'message' => 'wrong email or password'
            ], 400);
        }

        $token = $jwtManager->create($user);

        return $this->json([
            'token' => $token
        ]);
    }

    #[Route('/google-login', name: 'api_google_login', methods:['POST'])]
    public  function googleLogin(
        Request $request,
        EntityManagerInterface $em,
        JWTTokenManagerInterface $jwtManager,
        UserPasswordHasherInterface $hasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $accessToken = $data['token'];

        $response = file_get_contents("https://www.googleapis.com/oauth2/v3/userinfo?access_token={$accessToken}");
        $payload = json_decode($response, true);

        if (!isset($payload['email'])) {
            return $this->json(['message' => 'Invalid token'], 400);
        }

        $email = $payload['email'];
        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            $user = new User();
            $user->setEmail($email);
            $user->setUsername($payload['name']);
            $password = bin2hex(random_bytes(16));
            $hashedPassword = $hasher->hashPassword($user, $password);
            $user->setPassword($hashedPassword);

            $em->persist($user);
            $em->flush();
        }

        $token = $jwtManager->create($user);

        return $this->json(['token' => $token]);
    }

    #[Route('/github-login', name: 'api_github_login', methods: ['POST'])]
    public function githubLogin(
        Request $request,
        EntityManagerInterface $em,
        JWTTokenManagerInterface $jwtManager,
        UserPasswordHasherInterface $hasher): JsonResponse
    {
        $client = new Client();
        $code = json_decode($request->getContent(), true)['code'];
        $clientId = 'Ov23liBPuSRVeVtlU4jx';
        $clientSecret = '9e2c2af46835f23dbc5d7ac52dc137a6e6db3e87';

        $response = $client->post('https://github.com/login/oauth/access_token', [
            'form_params' => [
                'client_id' => $clientId,
                'client_secret' => $clientSecret,
                'code' => $code,
            ],
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);

        $data = json_decode($response->getBody()->getContents(), true);
        $accessToken = $data['access_token'];

        $userResponse = $client->get('https://api.github.com/user', [
            'headers' => [
                'Authorization' => "Bearer $accessToken",
                'Accept' => 'application/json',
            ],
        ]);

        $userData = json_decode($userResponse->getBody()->getContents(), true);

        $email = $userData['email'];

        if (!$email) {
            return $this->json([
                'message' => 'make your email public to let us use it for register purposes',
            ], 400);
        }

        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            $user = new User();
            $user->setEmail($email);
            $user->setUsername($userData['login']);
            $password = bin2hex(random_bytes(16));
            $hashedPassword = $hasher->hashPassword($user, $password);
            $user->setPassword($hashedPassword);

            $em->persist($user);
            $em->flush();
        }

        $token = $jwtManager->create($user);

        return $this->json(['token' => $token]);
    }
}
