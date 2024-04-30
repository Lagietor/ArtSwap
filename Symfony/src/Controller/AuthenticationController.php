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

#[Route('/api', name: 'api_')]
class AuthenticationController extends AbstractController
{
    #[Route('/register', name: 'api_register', methods:['POST'])]
    public function register(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        $request = json_decode($request->getContent(), true);

        $email = $request['email'];
        $passwordPlain = $request['password'];
        $username = $request['username'];

        $user = new User();
        $passwordHashed = $hasher->hashPassword($user, $passwordPlain);

        $user->setEmail($email);
        $user->setPassword($passwordHashed);
        $user->setUsername($username);

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
}
