<?php

namespace App\Controller;

use App\Entity\NFTItem;
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
class UserController extends AbstractController
{
    #[Route('/user/edit', name: 'api_user_edit', methods: ['POST'])]
    public function edit(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $hasher,
        ValidatorInterface $validator,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse
    {
        $request = json_decode($request->getContent(), true);

        $id = $request['id'];

        /**
         * @var User user
         */
        $user = $em->getRepository(User::class)->find($id);

        $email = (!empty($request['email'])) ? $request['email'] : $user->getEmail();
        $username = (!empty($request['username'])) ? $request['username'] : $user->getUsername();
        $password = (!empty($request['password'])) ? $request['password'] : $user->getPassword();

        if (isset($request['email'])) {
            $userExists = $em->getRepository(User::class)->findOneBy(['email' => $request['email']]);

            if ($userExists) {
                return $this->json([
                    'message' => 'This email is already registered'
                ], 400);
            }
        }

        $user->setEmail($email);
        $user->setUsername($username);
        $user->setPassword($password);

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $user->setPassword($hasher->hashPassword($user, $password));

        $token = $jwtManager->create($user);
        $em->flush($user);

        return $this->json([
            'token' => $token,
        ]);
    }

    #[Route('/user/{id}/items', name: 'api_user_items', methods: ['GET'])]
    public function getItems(
        Request $request,
        EntityManagerInterface $em,
        int $id
    ): JsonResponse
    {
        $phrase = $request->query->get('phrase', '');
        $sort = $request->query->get('sort', '');
        $filter = $request->query->get('filter', '');

        $items = $em->getRepository(NFTItem::class)->findByUser($id, $filter, $phrase, $sort);
        $result = [];

        foreach ($items as $item) {
            $result[] = [
                'id' => $item->getId(),
                'collection' => [
                    'id' => $item->getCollection()->getId()
                ],
                'owner' => [
                    'id' => $item->getOwner()->getId(),
                    'email' => $item->getOwner()->getEmail(),
                    'username' => $item->getOwner()->getUsername(),
                    'image' => $item->getOwner()->getImage()
                ],
                'name' => $item->getName(),
                'views' => $item->getViews(),
                'value' => $item->getValue(),
                'image' => $item->getImage(),
            ];
        }

        return $this->json($result);
    }
}
