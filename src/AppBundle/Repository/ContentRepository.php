<?php

namespace AppBundle\Repository;

/**
 * ContentRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ContentRepository extends \Doctrine\ORM\EntityRepository
{


    public function getSearchContent($value)
    {

        return $this->createQueryBuilder('c')
            ->leftJoin('c.company', 'com')
            ->leftJoin('c.sport', 's')
            ->leftJoin('c.tournament', 't')
            ->leftJoin('c.sportCategory', 'cat')
            ->where('c.eventType LIKE :value')
            ->orWhere('c.description LIKE :value')
            ->orWhere('c.releaseYear LIKE :value')
            ->orWhere('c.ownLicense LIKE :value')
            ->orWhere('c.brochure LIKE :value')
            ->orWhere('c.programName LIKE :value')
            ->orWhere('c.programType LIKE :value')
            ->orWhere('c.seriesType LIKE :value')
            ->orWhere('c.salesPackages LIKE :value')
            ->orWhere('c.distributionPackages LIKE :value')
            ->orWhere('com.legalName LIKE :value')
            ->orWhere('s.name LIKE :value')
            ->orWhere('t.name LIKE :value')
            ->orWhere('cat.name LIKE :value')
            ->setParameter('value', '%'.$value.'%')
            ->getQuery()
            ->getResult();

    }

    public function getBuyPackages($salesPackages){

        $data = [];

        if(count($salesPackages) > 0){
            foreach ($salesPackages as $salesPackage){
                if($salesPackage['territories'] == 'worldwide'){
                    $data[] = [
                        'salesPackage'=>$salesPackage,
                        'countries'=>[],
                    ];

                }else{
                    if($salesPackage['territories'] == 'selected'){
                        $territories = $salesPackage['selectedTerritories'];
                    }elseif($salesPackage['territories'] == 'excluded'){
                        $territories = $salesPackage['excludedTerritories'];
                    }

                    $countries = $this->getEntityManager()
                        ->getRepository('AppBundle:Country')
                        ->createQueryBuilder('c')
                        ->where('c.country_code IN (:territories)')
                        ->setParameter('territories',$territories)
                        ->getQuery()->getResult(2);
                    $data[] = [
                        'salesPackage'=>$salesPackage,
                        'countries'=>$countries
                    ];
                }
            }

            return $data;
        }
        return [];
    }

}
