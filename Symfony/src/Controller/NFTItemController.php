<?php

namespace App\Controller;

use App\Entity\NFTCollection;
use App\Entity\NFTItem;
use App\Entity\User;
use App\Mapper\ItemMapper;
use App\Mapper\UserMapper;
use App\Service\NFTMetadataService;
use App\Service\UploadImageService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class NFTItemController extends AbstractController
{
    private $uploadImageService;

    public function __construct(UploadImageService $uploadImageService)
    {
        $this->uploadImageService = $uploadImageService;
    }

    #[Route('/item', name: 'app_item', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        ItemMapper $itemMapper,
        UserMapper $userMapper,
    ): JsonResponse
    {
        $ownerId = $request->get('owner');
        $owner = $em->getRepository(User::class)->find($ownerId);

        if (!$owner) {
            return $this->json([
                'error' => 'There is no user with id ' . $ownerId
            ]);
        }

        $collectionId = $request->get('collection');
        $collection = $em->getRepository(NFTCollection::class)->find($collectionId);

        if (!$collection) {
            return $this->json([
                'error' => 'There is no collection with id ' . $collectionId
            ]);
        }

        $tokenId = $request->get('tokenId');
        // return $this->json([
        //     'dfdsffds' => $tokenId
        // ]);
        // dump($tokenId);
        // die;

        $name = $request->get('name');
        $value = $request->get('value');
        $image = ($request->files) ? $request->files->get('image') : NULL;

        $item = $em->getRepository(NFTItem::class)->findOneBy(['name' => $name]);
        if ($item) {
            return $this->json([
                'message' => 'item with this name already exists'
            ], 400);
        }

        $item = new NFTItem();
        $item->setCollection($collection);
        $item->setOwner($owner);
        $item->setTokenId($tokenId);
        $item->setName($name);
        $item->setValue($value);
        $item->setViews(0);

        if ($image && $image->isValid()) {
            $imageId = $this->uploadImageService->uploadFileToStorage($item->getOwner()->getId(), 'item', $image);
            $item->setImage($imageId);
        }

        $em->persist($item);
        $em->flush();

        $itemDTO = $itemMapper->mapToItemDTO($item);
        $userDTO = $userMapper->mapToUserDTO($item->getOwner());

        return $this->json([
            'id' => $itemDTO->getId(),
            'owner' => [
                'id' => $userDTO->getId(),
                'email' => $userDTO->getEmail(),
                'username' => $userDTO->getUsername(),
                'image' => $userDTO->getprofileImage()
            ],
            'name' => $itemDTO->getName(),
            'shortName' => $itemDTO->getShortName(),
            'views' => $itemDTO->getViews(),
            'value' => $itemDTO->getValue(),
            'image' => $itemDTO->getImage(),
            'tokenId' => $itemDTO->getTokenId()
        ]);
    }

    #[Route('/item/{id}', name: 'api_item_get', methods:['GET'])]
    public function get(
        EntityManagerInterface $em,
        ItemMapper $itemMapper,
        UserMapper $userMapper,
        $id
    ): JsonResponse
    {
        /**
         * @var NFTItem item
         */
        $item = $em->getRepository(NFTItem::class)->findOneBy(['id' => $id]);

        if (!$item) {
            return $this->json([
                'error' => 'there is no item with ' . $id . ' id',
            ]);
        }

        $itemDTO = $itemMapper->mapToItemDTO($item);
        $userDTO = $userMapper->mapToUserDTO($item->getOwner());

        return $this->json([
            'id' => $itemDTO->getId(),
            'owner' => [
                'id' => $userDTO->getId(),
                'email' => $userDTO->getEmail(),
                'username' => $userDTO->getUsername(),
                'image' => $userDTO->getprofileImage()
            ],
            'name' => $itemDTO->getName(),
            'shortName' => $itemDTO->getShortName(),
            'views' => $itemDTO->getViews(),
            'value' => $itemDTO->getValue(),
            'image' => $itemDTO->getImage(),
            'tokenId' => $itemDTO->getTokenId()
        ]);
    }

    #[Route('/item/edit', name: 'api_item_edit', methods:['POST'])]
    public function edit(
        Request $request,
        EntityManagerInterface $em,
        ItemMapper $itemMapper,
        UserMapper $userMapper,
    )
    {
        $id = $request->get('id');
        $newName = $request->get('name');
        $newValue = $request->get('value');
        $newImage = $request->files->get('image');

        /**
         * @var NFTItem item
         */
        $item = $em->getRepository(NFTItem::class)->findOneBy(['id' => $id]);

        if (!$item) {
            return $this->json([
                'error' => 'there is no item with ' . $id . ' id'
            ], 400);
        }

        $item->setName($newName);
        $item->setValue($newValue);

        $itemDTO = $itemMapper->mapToItemDTO($item);
        $userDTO = $userMapper->mapToUserDTO($item->getOwner());

        if ($newImage && $newImage->isValid()) {
            $imageId = $this->uploadImageService->uploadFileToStorage($item->getOwner()->getId(), 'item', $newImage);
            $item->setImage($imageId);
        }

        $em->persist($item);
        $em->flush();

        return $this->json([
            'id' => $itemDTO->getId(),
            'owner' => [
                'id' => $userDTO->getId(),
                'email' => $userDTO->getEmail(),
                'username' => $userDTO->getUsername(),
                'image' => $userDTO->getprofileImage()
            ],
            'name' => $itemDTO->getName(),
            'shortName' => $itemDTO->getShortName(),
            'views' => $itemDTO->getViews(),
            'value' => $itemDTO->getValue(),
            'image' => $itemDTO->getImage(),
            'tokenId' => $itemDTO->getTokenId()
        ]);
    }

    #[Route('/item/{id}/view', name: 'api_item_view', methods:['GET'])]
    public function incrementViews(
        EntityManagerInterface $em,
        int $id
    ): JsonResponse
    {
        $item = $em->getRepository(NFTItem::class)->find($id);
        $views = $item->getViews();

        $item->setViews($views + 1);

        $em->persist($item);
        $em->flush();

        return $this->json([
            'views' => $item->getViews()
        ]);
    }

    #[Route('/item/delete', name: 'api_item_delete', methods:['DELETE'])]
    public function delete(
        Request $request,
        EntityManagerInterface $em,
    )
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];

        $item = $em->getRepository(NFTItem::class)->find($id);

        if (!$item) {
            return $this->json([
                'error' => 'no item with ' . $id . 'id'
            ], 400);
        }

        $em->remove($item);
        $em->flush();

        return $this->json([
            'message' => 'item was deleted successfully'
        ]);
    }

    #[Route('/item/buy', name: 'api_item_buy', methods:['POST'])]
    public function buy(
        Request $request,
        EntityManagerInterface $em,
        ItemMapper $itemMapper,
        UserMapper $userMapper
    )
    {
        $data = json_decode($request->getContent(), true);

        $buyerId = $data['buyerId'];
        $itemId = $data['nftId'];

        $buyer = $em->getRepository(User::class)->find($buyerId);

        if (!$buyer) {
            return $this->json([
                'error' => 'There is no user with ' . $buyerId . ' id'
            ]);
        }

        $item = $em->getRepository(NFTItem::class)->find($itemId);

        
        if (!$item) {
            return $this->json([
                'error' => 'There is no nft with ' . $itemId . ' id'
            ]);
        }

        if ($item->getOwner()->getId() == $buyerId) {
            return $this->json([
                'error' => 'You can\'t buy your own NFT'
            ]);
        }

        $item->setOwner($buyer);
        $em->persist($item);
        $em->flush();

        $itemDTO = $itemMapper->mapToItemDTO($item);
        $userDTO = $userMapper->mapToUserDTO($buyer);

        return $this->json([
            'id' => $itemDTO->getId(),
            'owner' => [
                'id' => $userDTO->getId(),
                'email' => $userDTO->getEmail(),
                'username' => $userDTO->getUsername(),
                'image' => $userDTO->getprofileImage()
            ],
            'name' => $itemDTO->getName(),
            'shortName' => $itemDTO->getShortName(),
            'views' => $itemDTO->getViews(),
            'value' => $itemDTO->getValue(),
            'image' => $itemDTO->getImage(),
            'tokenId' => $itemDTO->getTokenId()
        ]);
    }
}
