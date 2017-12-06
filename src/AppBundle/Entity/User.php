<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * User
 *
 * @ORM\Table(name="`user`")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 */
class User extends BaseUser
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(name="first_name", type="string", length=255)
     */
    protected $firstName;

    /**
     * @var string
     *
     * @ORM\Column(name="last_name", type="string", length=255)
     */
    protected $lastName;

    /**
     * @var string
     *
     * @ORM\Column(name="company_legal_name", type="string", length=255)
     */
    protected $companyLegalName;

    /**
     * @var string
     *
     * @ORM\Column(name="company_website", type="string", length=255)
     */
    protected $companyWebsite;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set firstName
     *
     * @param string $firstName
     *
     * @return User
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get firstName
     *
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @param string $lastName
     *
     * @return User
     */
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get lastName
     *
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set companyLegalName
     *
     * @param string $companyLegalName
     *
     * @return User
     */
    public function setCompanyLegalName($companyLegalName)
    {
        $this->companyLegalName = $companyLegalName;

        return $this;
    }

    /**
     * Get companyLegalName
     *
     * @return string
     */
    public function getCompanyLegalName()
    {
        return $this->companyLegalName;
    }

    /**
     * Set companyWebsite
     *
     * @param string $companyWebsite
     *
     * @return User
     */
    public function setCompanyWebsite($companyWebsite)
    {
        $this->companyWebsite = $companyWebsite;

        return $this;
    }

    /**
     * Get companyWebsite
     *
     * @return string
     */
    public function getCompanyWebsite()
    {
        return $this->companyWebsite;
    }
}

