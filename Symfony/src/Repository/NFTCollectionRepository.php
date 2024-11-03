<?php

namespace App\Repository;

use App\Entity\NFTCollection;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<NFTCollection>
 *
 * @method NFTCollection|null find($id, $lockMode = null, $lockVersion = null)
 * @method NFTCollection|null findOneBy(array $criteria, array $orderBy = null)
 * @method NFTCollection[]    findAll()
 * @method NFTCollection[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NFTCollectionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NFTCollection::class);
    }

//    /**
//     * @return NFTCollection[] Returns an array of NFTCollection objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('n.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?NFTCollection
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }


    /**
     * @return NFTCollection[]
     */
    public function findByFilters($phrase = '', $filter = '', $limit, $offset): array
    {
        $queryBuilder = $this->createQueryBuilder('n');

        if (!empty($phrase)) {
            $queryBuilder->andWhere('n.name LIKE :phrase')
            ->setParameter('phrase', '%' . $phrase . '%');
        }

        if ($filter === 'Newest') {
            $queryBuilder->orderBy('n.createdAt', 'DESC');
        }

        if ($filter === 'Oldest') {
            $queryBuilder->orderBy('n.createdAt', 'ASC');
        }

        if ($filter === 'Popular') {
            $queryBuilder->orderBy('n.views', 'DESC');
        }

        if ($filter === 'Expensive') {
            $queryBuilder->orderBy('n.floorPrice', 'DESC');
        }

        $queryBuilder->setFirstResult($offset)
        ->setMaxResults($limit);

        return $queryBuilder->getQuery()->getResult();
    }

    /**
     * @return NFTCollection[]
     */
    public function findByUser($userId, $filter = '', $phrase = '', $sort = ''): array
    {
        $queryBuilder = $this->createQueryBuilder('n');

        if ($filter === '' || $filter === 'all') {
            $queryBuilder->andWhere('n.user = :userId')
                ->setParameter('userId', $userId);
        }

        // if ($filter === 'collected') {
        //     $queryBuilder->andWhere('n.owner = :userId')
        //         ->setParameter('userId', $userId);
        // }

        // if ($filter === 'created') {
        //     $queryBuilder->join('n.collection', 'c')
        //         ->andWhere('c.user = :userId')
        //         ->setParameter('userId', $userId);
        // }

        if (!empty($phrase)) {
            $queryBuilder->andWhere('n.name LIKE :phrase')
            ->setParameter('phrase', '%' . $phrase . '%');
        }

        // if ($sort === 'Newest') {
        //     $queryBuilder->orderBy('n.createdAt', 'DESC');
        // }

        // if ($sort === 'Oldest') {
        //     $queryBuilder->orderBy('n.createdAt', 'ASC');
        // }

        // if ($sort === 'Popular') {
        //     $queryBuilder->orderBy('n.views', 'DESC');
        // }

        // if ($sort === 'Expensive') {
        //     $queryBuilder->orderBy('n.value', 'DESC');
        // }

        return $queryBuilder->getQuery()->getResult();
    }
}
