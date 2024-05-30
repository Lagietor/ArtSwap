<?php

namespace App\Controller;

use App\Entity\NFTCollection;
use App\Entity\NFTItem;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class NFTItemController extends AbstractController
{
    #[Route('/item', name: 'app_item', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse
    {
        $request = json_decode($request->getContent(), true);

        $ownerId = $request['owner'];
        $owner = $em->getRepository(User::class)->find($ownerId);

        if (!$owner) {
            return $this->json([
                'message' => 'There is no user with id ' . $ownerId
            ]);
        }

        $collectionId = $request['collection'];
        $collection = $em->getRepository(NFTCollection::class)->find($collectionId);

        if (!$collection) {
            return $this->json([
                'message' => 'There is no collection with id ' . $collectionId
            ]);
        }

        $name = $request['name'];
        $value = $request['value'];
        $views = $request['views'];
        $image = $request['image'];

        $item = $em->getRepository(NFTItem::class)->findOneBy(['name' => $name]);
        if ($item) {
            return $this->json([
                'message' => 'item with this name already exists'
            ], 400);
        }

        $item = new NFTItem();
        $item->setCollection($collection);
        $item->setOwner($owner);
        $item->setName($name);
        $item->setValue($value);
        $item->setViews($views);
        $item->setImage($image);

        $em->persist($item);
        $em->flush();

        return $this->json([
            'message' => 'item created'
        ]);
    }

    #[Route('/item/{id}', name: 'api_item_get', methods:['GET'])]
    public function get(
        EntityManagerInterface $em,
        $id
    ): JsonResponse
    {
        /**
         * @var NFTItem item
         */
        $item = $em->getRepository(NFTItem::class)->findOneBy(['id' => $id]);

        return $this->json([
            'id' => $item->getId(),
            'owner' => [
                'id' => $item->getOwner()->getId(),
                'email' => $item->getOwner()->getEmail(),
                'username' => $item->getOwner()->getUsername(),
                'image' => $item->getOwner()->getImage()
            ],
            'name' => $item->getName(),
            'views' => $item->getViews(),
            'value' => $item->getValue(),
            'image' => $item->getImage()
        ]);
    }
}
