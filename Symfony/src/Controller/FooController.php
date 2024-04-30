<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class FooController extends AbstractController
{
    /**
     * @Route("/foo", name="app_foo")
     */
    public function index(): JsonResponse
    {
        dd($_SERVER);

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/FooController.php',
        ]);
    }
}