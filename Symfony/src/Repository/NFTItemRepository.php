<?php

namespace App\Repository;

use App\Entity\NFTItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<NFTItem>
 *
 * @method NFTItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method NFTItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method NFTItem[]    findAll()
 * @method NFTItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class NFTItemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, NFTItem::class);
    }

//    /**
//     * @return NFTItem[] Returns an array of NFTItem objects
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

//    public function findOneBySomeField($value): ?NFTItem
//    {
//        return $this->createQueryBuilder('n')
//            ->andWhere('n.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

    /**
     * @return NFTItem[]
     */
    public function findByFilters($collectionId, $phrase = '', $filter = ''): array
    {
        $queryBuilder = $this->createQueryBuilder('n')
            ->andWhere('n.collection = :collectionId')
            ->setParameter('collectionId', $collectionId);

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
            $queryBuilder->orderBy('n.value', 'DESC');
        }

        return $queryBuilder->getQuery()->getResult();
    }
}
