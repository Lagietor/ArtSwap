<?php

namespace App\Controller;

use App\Entity\NFTCollection;
use App\Entity\NFTItem;
use App\Entity\User;
use App\Mapper\CollectionMapper;
use App\Mapper\ItemMapper;
use App\Mapper\UserMapper;
use App\Service\UploadImageService;
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
    private $uploadImageService;

    public function __construct(UploadImageService $uploadImageService)
    {
        $this->uploadImageService = $uploadImageService;
    }

    #[Route('/user/{id}', name: 'api_user_get', methods: ['GET'])]
    public function get(
        EntityManagerInterface $em,
        UserMapper $userMapper,
        int $id
    ): JsonResponse
    {
        /**
         * @var User $user
         */
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json([
                'message' => 'There is no user with id: ' . $id
            ]);
        }

        $userDTO = $userMapper->mapToUserDTO($user);

        return $this->json([
            'id' => $userDTO->getId(),
            'email' => $userDTO->getEmail(),
            'username' => $userDTO->getUsername(),
            'profileImage' => $userDTO->getProfileImage(),
            'backgroundImage' => $userDTO->getBackgroundImage()
        ]);
    }

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
        CollectionMapper $collectionMapper,
        UserMapper $userMapper,
        ItemMapper $itemMapper,
        int $id
    ): JsonResponse
    {
        $phrase = $request->query->get('phrase', '');
        $sort = $request->query->get('sort', '');
        $filter = $request->query->get('filter', '');

        $items = $em->getRepository(NFTItem::class)->findByUser($id, $filter, $phrase, $sort);
        $result = [];

        foreach ($items as $item) {
            $collectionDTO = $collectionMapper->mapToCollectionDTO($item->getCollection());
            $itemDTO = $itemMapper->mapToItemDTO($item);
            $userDTO = $userMapper->mapToUserDTO($item->getOwner());

            $result[] = [
                'id' => $itemDTO->getId(),
                'collection' => [
                    'id' => $collectionDTO->getId()
                ],
                'owner' => [
                    'id' => $userDTO->getId(),
                    'email' => $userDTO->getEmail(),
                    'username' => $userDTO->getUsername(),
                    'image' => $userDTO->getProfileImage()
                ],
                'name' => $itemDTO->getName(),
                'views' => $itemDTO->getViews(),
                'value' => $itemDTO->getValue(),
                'image' => $itemDTO->getImage(),
            ];
        }

        return $this->json($result);
    }

    #[Route('/user/{id}/collections', name: 'api_user_collections', methods: ['GET'])]
    public function getCollections(
        Request $request,
        EntityManagerInterface $em,
        CollectionMapper $collectionMapper,
        UserMapper $userMapper,
        int $id
    ): JsonResponse
    {
        $phrase = $request->query->get('phrase', '');
        $sort = $request->query->get('sort', '');
        $filter = $request->query->get('filter', '');

        $collections = $em->getRepository(NFTCollection::class)->findByUser($id, $filter, $phrase, $sort);
        $result = [];

        foreach ($collections as $collection) {
            $collectionDTO = $collectionMapper->mapToCollectionDTO($collection);
            $userDTO = $userMapper->mapToUserDTO($collection->getUser());

            $result[] = [
                'id' => $collectionDTO->getId(),
                'user' => [
                    'id' => $userDTO->getId(),
                    'email' => $userDTO->getEmail(),
                    'username' => $userDTO->getUsername(),
                    'image' => $userDTO->getProfileImage()
                ],
                'name' => $collectionDTO->getName(),
                'itemsCount' => $collectionDTO->getItemsCount(),
                'floorPrice' => $collectionDTO->getFloorPrice(),
                'volume' => $collectionDTO->getVolume(),
                'views' => $collectionDTO->getViews(),
                'image' => $collectionDTO->getImage(),
                'description' => $collectionDTO->getDescription()
            ];
        }

        return $this->json($result);
    }

    #[Route('/user/{id}/images', name: 'api_user_image', methods: ['POST'])]
    public function uploadImages(
        Request $request,
        EntityManagerInterface $em,
        int $id
    ): JsonResponse
    {
        $profileImage = $request->files->get('profileImage');
        $backgroundImage = $request->files->get('backgroundImage');

        /**
         * @var User $user
         */
        $user = $em->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json([
                'message' => 'user with id ' . $id . ' does not exists'
            ], 400);
        }

        $response = [];

        if ($profileImage && $profileImage->isValid()) {
            $profileImageId = $this->uploadImageService->uploadFileToStorage($user->getId(), 'profile', $profileImage);
            $user->setProfileImage($profileImageId);
            $response['profileImageId'] = $profileImageId;
        }

        if ($backgroundImage && $backgroundImage->isValid()) {
            $backgroundImageId = $this->uploadImageService->uploadFileToStorage($user->getId(), 'background', $profileImage);
            $user->setBackgroundImage($backgroundImageId);
            $response['backgroundImageId'] = $backgroundImageId;
        }

        $em->persist($user);
        $em->flush();

        return $this->json($response);
    }
}
