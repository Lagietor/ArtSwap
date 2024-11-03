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
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class NFTCollectionController extends AbstractController
{
    private $uploadImageService;

    public function __construct(UploadImageService $uploadImageService)
    {
        $this->uploadImageService = $uploadImageService;
    }

    #[Route('/collection', name: 'api_collection_create', methods:['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        CollectionMapper $collectionMapper,
        UserMapper $userMapper,
    ): JsonResponse
    {
        $userId = $request->get('userId');
        $user = $em->getRepository(User::class)->findOneBy(['id' => $userId]);

        if (!$user) {
            return $this->json([
                'error' => 'There is no user with ' . $userId . ' id'
            ]);
        }

        $image = $request->files->get('image');

        $collection = new NFTCollection();
        $collection->setUser($user);
        $collection->setName($request->get('name'));
        $collection->setDescription($request->get('desc'));
        $collection->setItemsCount(0);
        $collection->setFloorPrice(0);
        $collection->setVolume(0);
        $collection->setViews(0);

        if ($image && $image->isValid()) {
            $imageId = $this->uploadImageService->uploadFileToStorage($collection->getUser()->getId(), 'collection', $image);
            $collection->setImage($imageId);
        }

        $em->persist($collection);
        $em->flush();

        $collectionDTO = $collectionMapper->mapToCollectionDTO($collection);
        $userDTO = $userMapper->mapToUserDTO($collection->getUser());

        return $this->json([
            'id' => $collectionDTO->getId(),
            'user' => [
                'id' => $userDTO->getId(),
                'email' => $userDTO->getEmail(),
                'username' => $userDTO->getUsername(),
                'image' => $userDTO->getprofileImage()
            ],
            'name' => $collectionDTO->getName(),
            'shortName' => $collectionDTO->getShortName(),
            'itemsCount' => $collectionDTO->getItemsCount(),
            'floorPrice' => $collectionDTO->getFloorPrice(),
            'volume' => $collectionDTO->getVolume(),
            'views' => $collectionDTO->getViews(),
            'image' => $collectionDTO->getImage(),
            'description' => $collectionDTO->getDescription()
        ]);
    }

    #[Route('/collection', name: 'api_collection', methods:['GET'])]
    public function getAll(
        Request $request,
        EntityManagerInterface $em,
        CollectionMapper $collectionMapper,
        UserMapper $userMapper,
    ) : JsonResponse
    {
        $phrase = $request->query->get('phrase', '');
        $sort = $request->query->get('sort', '');
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 12);

        $collections = $em->getRepository(NFTCollection::class)->findByFilters($phrase, $sort, $limit, ($page - 1) * $limit);
        $result = [];

        if (!$collections) {
            return $this->json([]);
        }

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
                'shortName' => $collectionDTO->getShortName(),
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

    #[Route('/collection/{id}', name: 'api_collection_get', methods:['GET'])]
    public function get(
        EntityManagerInterface $em,
        CollectionMapper $collectionMapper,
        UserMapper $userMapper,
        $id
    ): JsonResponse
    {
        /**
         * @var NFTCollection collection
         */
        $collection = $em->getRepository(NFTCollection::class)->findOneBy(['id' => $id]);
        $collectionDTO = $collectionMapper->mapToCollectionDTO($collection);
        $userDTO = $userMapper->mapToUserDTO($collection->getUser());

        return $this->json([
            'id' => $collectionDTO->getId(),
            'user' => [
                'id' => $userDTO->getId(),
                'email' => $userDTO->getEmail(),
                'username' => $userDTO->getUsername(),
                'profileImageLink' => $userDTO->getProfileImage()
            ],
            'name' => $collectionDTO->getName(),
            'shortName' => $collectionDTO->getShortName(),
            'itemsCount' => $collectionDTO->getItemsCount(),
            'floorPrice' => $collectionDTO->getFloorPrice(),
            'volume' => $collectionDTO->getVolume(),
            'views' => $collectionDTO->getViews(),
            'image' => $collectionDTO->getImage(),
            'description' => $collectionDTO->getDescription(),
            'shortDescription' => $collectionDTO->getShortDescription()
        ]);
    }

    #[Route('/collection/{id}/items', name: 'api_collection_items', methods:['GET'])]
    public function getCollectionItems(
        Request $request,
        EntityManagerInterface $em,
        CollectionMapper $collectionMapper,
        UserMapper $userMapper,
        ItemMapper $itemMapper,
        int $id
    ) : JsonResponse
    {
        $phrase = $request->query->get('phrase', '');
        $filter = $request->query->get('filter', '');
        $page = $request->query->get('page', 1);
        $limit = $request->query->get('limit', 12);

        $items = $em->getRepository(NFTItem::class)->findByCollection($id, $phrase, '', $filter, $limit, ($page - 1) * $limit);
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
                'shortName' => $itemDTO->getShortName(),
                'views' => $itemDTO->getViews(),
                'value' => $itemDTO->getValue(),
                'image' => $itemDTO->getImage(),
            ];
        }

        return $this->json($result);
    }

    #[Route('/collection/edit/{id}', name: 'api_collection_edit', methods:['POST'])]
    public function edit(
        Request $request,
        EntityManagerInterface $em,
        CollectionMapper $collectionMapper,
        UserMapper $userMapper,
        $id
    )
    {
        $newName = $request->get('name');
        $newDesc = $request->get('desc');
        $newImage = $request->files->get('image');

        /**
         * @var NFTCollection collection
         */
        $collection = $em->getRepository(NFTCollection::class)->findOneBy(['id' => $id]);

        if (!$collection) {
            return $this->json([
                'error' => 'there is no collection with ' . $id . ' id'
            ], 400);
        }

        $collection->setName($newName);
        $collection->setDescription($newDesc);

        $collectionDTO = $collectionMapper->mapToCollectionDTO($collection);
        $userDTO = $userMapper->mapToUserDTO($collection->getUser());

        if ($newImage && $newImage->isValid()) {
            $imageId = $this->uploadImageService->uploadFileToStorage($collection->getUser()->getId(), 'item', $newImage);
            $collection->setImage($imageId);
        }

        $em->persist($collection);
        $em->flush();

        return $this->json([
            'id' => $collectionDTO->getId(),
            'user' => [
                'id' => $userDTO->getId(),
                'email' => $userDTO->getEmail(),
                'username' => $userDTO->getUsername(),
                'profileImageLink' => $userDTO->getProfileImage()
            ],
            'name' => $collectionDTO->getName(),
            'shortName' => $collectionDTO->getShortName(),
            'itemsCount' => $collectionDTO->getItemsCount(),
            'floorPrice' => $collectionDTO->getFloorPrice(),
            'volume' => $collectionDTO->getVolume(),
            'views' => $collectionDTO->getViews(),
            'image' => $collectionDTO->getImage(),
            'description' => $collectionDTO->getDescription(),
            'shortDescription' => $collectionDTO->getShortDescription()
        ]);
    }
  
    #[Route('/collection/{id}/view', name: 'api_collection_view', methods:['GET'])]
    public function incrementViews(
        EntityManagerInterface $em,
        int $id
    ): JsonResponse
    {
        $collection = $em->getRepository(NFTCollection::class)->find($id);
        $views = $collection->getViews();

        $collection->setViews($views + 1);

        $em->persist($collection);
        $em->flush();

        return $this->json([
            'views' => $collection->getViews()
        ]);
    }

    #[Route('/collection/delete', name: 'api_collection_delete', methods:['DELETE'])]
    public function delete(
        Request $request,
        EntityManagerInterface $em,
    )
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        
        $collection = $em->getRepository(NFTCollection::class)->find($id);

        if (!$collection) {
            return $this->json([
                'error' => 'no collection with ' . $id . 'id'
            ], 400);
        }

        $items = $collection->getNftItems();

        foreach ($items as $item) {
            $em->remove($item);
        }

        $em->remove($collection);
        $em->flush();

        return $this->json([
            'message' => 'collection was deleted successfully'
        ]);
    }
}
