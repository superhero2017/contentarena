<?php

namespace AppBundle\Repository;


use AppBundle\Entity\Country;
use AppBundle\Entity\SalesPackage;
use AppBundle\Entity\Territory;


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

    public function getTerritoryInfo($customId){
        $data = [];
        $country = $this->getEntityManager()->getRepository(Country::class);
        $content = $this->findOneBy(['customId'=>$customId]);

        $salesPackages = $content->getSalesPackages();
        foreach($salesPackages as $index => $salesPackage){

            if(!$salesPackage->getSellAsPackage()){

                if( $salesPackage->isWorldwide() ){

                    $result = $country->createQueryBuilder('c')
                        ->where('c.id >= 1')
                        ->getQuery()
                        ->getResult(2);

                } elseif ( count( $salesPackage->getSelectedCountries() ) > 0 ){
                    $result = $salesPackage->getSelectedCountries();

                } elseif ( count( $salesPackage->getExcludedCountries() ) > 0 ){

                    $result = $salesPackage->getExcludedCountries();
                }

                $territories = array();

                foreach ( $result->getIterator() as $country ){
                    if ( !in_array( $country->getTerritory(),$territories, true ) ){
                        $territories[] = $country->getTerritory();
                    }
                }

                $data[] = [
                    'salesPackage'=>$salesPackage,
                    'countries'=>$result,
                ];
            }
        }

        $data['territories'] =$territories;

        return $data;
    }

    /**
     * @param SalesPackage[] $salesPackages
     * @return array
     */
    public function getBuyPackages($salesPackages){

        $data = [];

        if(count($salesPackages) > 0){

            foreach ($salesPackages as $salesPackage){

                if($salesPackage->getSellAsPackage() ){
                    $countries = [];
                    if( !$salesPackage->isWorldwide() ){

                        if( count( $salesPackage->getSelectedCountries() ) > 0){
                            $countries = $salesPackage->getSelectedCountries();
                        } elseif ( count( $salesPackage->getExcludedCountries() ) > 0 ){
                            $countries = $salesPackage->getExcludedCountries();
                        }

                    }

                    $data[] = [
                        'salesPackage'=>$salesPackage,
                        'countries'=>$countries,
                    ];

                }
            }

            return $data;
        }
        return [];
    }

}



