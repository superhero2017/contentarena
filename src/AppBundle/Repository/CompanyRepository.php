<?php

namespace AppBundle\Repository;

/**
 * CompanyRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CompanyRepository extends \Doctrine\ORM\EntityRepository
{

    public function findByLegalName($name)
    {

var_dump($name);
        $qb = $this->_em->createQueryBuilder();
        $qb->select('c')
            ->from($this->_entityName, 'c')
            ->where( 'c.legalName = :legalName')
            ->setParameter('legalName', $name );
        var_dump($qb->getQuery()->getSQL());
        return $qb->getQuery()->getResult();
    }

}
