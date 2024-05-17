<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
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

        // Validation
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
            ], 302);
        }

        $token = $jwtManager->create($user);

        return $this->json([
            'token' => $token
        ]);
    }

    private function validation($user)
    {

    }
}
