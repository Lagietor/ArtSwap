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
class NFTCollectionController extends AbstractController
{
    #[Route('/collection', name: 'api_collection_create', methods:['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em
    ): JsonResponse
    {
        // TODO dodać walidacje
        $request = json_decode($request->getContent(), true);

        $userId = $request['userId'];
        $user = $em->getRepository(User::class)->findOneBy(['id' => $userId]);

        $collection = new NFTCollection();
        $collection->setUser($user);
        $collection->setName($request['name']);
        $collection->setDescription($request['desc']);
        $collection->setItemsCount(0);
        $collection->setFloorPrice(0);
        $collection->setVolume(0);
        $collection->setViews(0);
        $collection->setImage($request['image']);

        $em->persist($collection);
        $em->flush();

        return $this->json([
            'message' => 'Collection was created'
        ]);
    }

    #[Route('/collection', name: 'api_collection', methods:['GET'])]
    public function getCollections(
        Request $request,
        EntityManagerInterface $em
    ) : JsonResponse
    {
        $phrase = $request->query->get('phrase', '');
        $filter = $request->query->get('filter', '');

        $collections = $em->getRepository(NFTCollection::class)->findByFilters($phrase, $filter);
        $result = [];

        if (!$collections) {
            return $this->json([]);
        }

        foreach ($collections as $collection) {
            $result[] = [
                'id' => $collection->getId(),
                'user' => [
                    'id' => $collection->getUser()->getId(),
                    'email' => $collection->getUser()->getEmail(),
                    'username' => $collection->getUser()->getUsername(),
                    'image' => $collection->getUser()->getImage()
                ],
                'name' => $collection->getName(),
                'itemsCount' => $collection->getItemsCount(),
                'floorPrice' => $collection->getFloorPrice(),
                'volume' => $collection->getVolume(),
                'views' => $collection->getViews(),
                'image' => $collection->getImage(),
                'description' => $collection->getDescription()
            ];
        }

        return $this->json($result);
    }

    #[Route('/collection/{id}/items', name: 'api_collection_items', methods:['GET'])]
    public function getItems(
        Request $request,
        EntityManagerInterface $em,
        int $id
    ) : JsonResponse
    {
        $phrase = $request->query->get('phrase', '');
        $filter = $request->query->get('filter', '');

        $items = $em->getRepository(NFTItem::class)->findByFilters($id, $phrase, $filter);
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

    #[Route('/collection/{id}', name: 'api_collection_get', methods:['GET'])]
    public function get(
        EntityManagerInterface $em,
        $id
    ): JsonResponse
    {
        /**
         * @var NFTCollection collection
         */
        $collection = $em->getRepository(NFTCollection::class)->findOneBy(['id' => $id]);

        return $this->json([
            'id' => $collection->getId(),
            'user' => [
                'id' => $collection->getUser()->getId(),
                'email' => $collection->getUser()->getEmail(),
                'username' => $collection->getUser()->getUsername(),
                'image' => $collection->getUser()->getImage()
            ],
            'name' => $collection->getName(),
            'itemsCount' => $collection->getItemsCount(),
            'floorPrice' => $collection->getFloorPrice(),
            'volume' => $collection->getVolume(),
            'views' => $collection->getViews(),
            'image' => $collection->getImage(),
            'description' => $collection->getDescription()
        ]);
    }
}
