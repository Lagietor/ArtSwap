<?php

namespace App\Controller;

use App\Entity\NFTCollection;
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
        $request = json_decode($request->getContent(), true);

        $userEmail = $request['userEmail'];
        $user = $em->getRepository(User::class)->findOneBy($userEmail);

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
}
