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
    public function findByFilters($phrase = '', $filter = ''): array
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

        return $queryBuilder->getQuery()->getResult();
    }
}
