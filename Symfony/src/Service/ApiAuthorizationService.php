<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Request;

class ApiAuthorizationService
{
    private string $validPassword = 'your_secret_password';

    public function validateApiKey(Request $request): bool
    {
        $authHeader = $request->headers->get('Authorization');

        if ($authHeader !== 'Bearer ' . $this->validPassword) {
            return false;
        }

        return true;
    }
}