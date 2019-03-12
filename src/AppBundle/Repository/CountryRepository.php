<?php

namespace AppBundle\Repository;

/**
 * CountryRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CountryRepository extends \Doctrine\ORM\EntityRepository
{

    public function countTerritoriesByTerritoryId($id){
        $result = $this->createQueryBuilder('c')
            ->where('c.territoryId = :id')
            ->setParameter('id',$id)
            ->getQuery()
            ->getScalarResult();

        return count((array)$result);
    }

    public function findCountriesByIds($ids){

        return $this->createQueryBuilder('c')
            ->where('c.id IN (:ids)')
            ->setParameter('ids',$ids)
            ->getQuery()
            ->getResult();
    }

    public function getAll(){
        return $this->createQueryBuilder('c')
            //->innerJoin("c.regions","regions")
            //->where("c.country_code != :null")
            //->setParameter("null", null)
            ->getQuery()
            ->getResult();
    }

    /**
     * @return int
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function countAll()
    {
        return intval($this->createQueryBuilder('c')
            ->select('COUNT(c)')
            ->getQuery()->getSingleScalarResult());
    }
}
