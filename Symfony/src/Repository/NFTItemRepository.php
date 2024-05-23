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
}
