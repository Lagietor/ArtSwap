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
        // TODO dodać walidacje
        $request = json_decode($request->getContent(), true);

        $userId = $request->get('userId');
        $user = $em->getRepository(User::class)->findOneBy(['id' => $userId]);

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
            $imageId = $this->uploadImageService->uploadFileToStorage($collection->getUser()->getUserName(), 'collection', $image);
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
            'itemsCount' => $collectionDTO->getItemsCount(),
            'floorPrice' => $collectionDTO->getFloorPrice(),
            'volume' => $collectionDTO->getVolume(),
            'views' => $collectionDTO->getViews(),
            'image' => $collectionDTO->getImage(),
            'description' => $collectionDTO->getDescription()
        ]);
    }

    #[Route('/collection', name: 'api_collection', methods:['GET'])]
    public function getCollections(
        Request $request,
        EntityManagerInterface $em,
        CollectionMapper $collectionMapper,
        UserMapper $userMapper,
    ) : JsonResponse
    {
        $phrase = $request->query->get('phrase', '');
        $sort = $request->query->get('sort', '');

        $collections = $em->getRepository(NFTCollection::class)->findByFilters($phrase, $sort);
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

    #[Route('/collection/{id}/items', name: 'api_collection_items', methods:['GET'])]
    public function getItems(
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

        $items = $em->getRepository(NFTItem::class)->findByCollection($id, $phrase, $filter);
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
            'itemsCount' => $collectionDTO->getItemsCount(),
            'floorPrice' => $collectionDTO->getFloorPrice(),
            'volume' => $collectionDTO->getVolume(),
            'views' => $collectionDTO->getViews(),
            'image' => $collectionDTO->getImage(),
            'description' => $collectionDTO->getDescription(),
            'shortDescription' => $collectionDTO->getShortDescription()
        ]);
    }
}
