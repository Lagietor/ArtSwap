<?php

namespace App\Service;

use App\Entity\NFTCollection;
use Doctrine\ORM\EntityManagerInterface;

class SearchCollectionService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function getCollectionsByParams($phrase, $filter)
    {
        $result = $this->em->getRepository(NFTCollection::class)->findByFilters($phrase, $filter);

        return $result;
    }
}