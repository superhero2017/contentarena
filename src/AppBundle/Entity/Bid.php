<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation\MaxDepth;

/**
 * Bid
 *
 * @ORM\Table(name="bid")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BidRepository")
 */
class Bid
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"closed", "commercial"})
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="custom_id", type="string")
     * @Groups({"closed", "commercial"})
     */
    private $customId;

    /**
     * @var int
     *
     * @ORM\Column(name="multiple", type="string", nullable=true)
     * @Groups({"closed", "commercial"})
     */
    private $multiple;

    /**
     * @var int
     *
     * @ORM\Column(name="amount", type="decimal", precision=12, scale=2)
     * @Groups({"closed", "commercial"})
     */
    private $amount;

    /**
     * @var int
     *
     * @ORM\Column(name="total_fee", type="decimal", precision=12, scale=2)
     * @Groups({"closed", "commercial"})
     */
    private $totalFee;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Content", inversedBy="bid")
     * @ORM\JoinColumn(name="content_id",referencedColumnName="id",nullable=true)
     * @Groups({"closed", "commercial"})
     * @MaxDepth(1)
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Content", inversedBy="bid", cascade={"remove"})
     * @ORM\JoinColumn(name="sold_listing_id",
     *      referencedColumnName="id",
     *      onDelete="CASCADE",nullable=true)
     * @Groups({"closed", "commercial"})
     */
    private $soldListing;


    /**
     * @var BidStatus
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\BidStatus", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"closed", "commercial"})
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\BidType", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"closed", "commercial"})
     */
    private $type;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\User", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"closed", "commercial"})
     */
    private $buyerUser;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Company", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"closed", "commercial"})
     */
    private $buyerCompany;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\CompanySnapshot", inversedBy="bid", cascade={"persist"})
     * @ORM\JoinColumn(nullable=true)
     */
    private $buyerCompanySnapshot;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\CompanySnapshot", inversedBy="bid", cascade={"persist"})
     * @ORM\JoinColumn(nullable=true)
     */
    private $sellerCompanySnapshot;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\SalesPackage", inversedBy="bid")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"closed", "commercial"})
     */
    private $salesPackage;

    /**
     * @var mixed
     *
     * @ORM\Column(name="signature", type="string")
     */
    private $signature;

    /**
     * @var string
     *
     * @ORM\Column(name="signature_name", type="text", nullable=true)
     */
    private $signatureName;

    /**
     * @var string
     *
     * @ORM\Column(name="signature_position", type="text", nullable=true)
     */
    private $signaturePosition;

    /**
     * @var mixed
     *
     * @ORM\Column(name="seller_signature", type="string", nullable=true)
     */
    private $sellerSignature;

    /**
     * @var string
     *
     * @ORM\Column(name="seller_signature_name", type="text", nullable=true)
     */
    private $sellerSignatureName;

    /**
     * @var string
     *
     * @ORM\Column(name="seller_signature_position", type="text", nullable=true)
     */
    private $sellerSignaturePosition;

    /**
     * @var mixed
     *
     * @ORM\Column(name="created_at", type="datetime")
     * @Groups({"closed", "commercial"})
     */
    private $createdAt;

    /**
     * @var string
     *
     * @ORM\Column(name="message", type="text", nullable=true)
     * @Groups({"closed", "commercial"})
     */
    private $message;

    /**
     * @var mixed
     *
     * @ORM\Column(name="updated_at", type="datetime")
     * @Groups({"closed", "commercial"})
     */
    private $updatedAt;

    /**
     * @var mixed
     *
     * @ORM\Column(name="seller_signature_date", type="datetime", nullable=true)
     */
    private $sellerSignatureDate;

    /**
     * @var mixed
     *
     * @ORM\Column(name="buyer_signature_date", type="datetime", nullable=true)
     */
    private $buyerSignatureDate;

    public function __construct() {
    }

    /**
     * @return string
     */
    public function getSignatureName()
    {
        return $this->signatureName;
    }

    /**
     * @param string $signatureName
     */
    public function setSignatureName($signatureName)
    {
        $this->signatureName = $signatureName;
    }

    /**
     * @return string
     */
    public function getSignaturePosition()
    {
        return $this->signaturePosition;
    }

    /**
     * @param string $signaturePosition
     */
    public function setSignaturePosition($signaturePosition)
    {
        $this->signaturePosition = $signaturePosition;
    }

    /**
     * @return string
     */
    public function getSellerSignatureName()
    {
        return $this->sellerSignatureName;
    }

    /**
     * @param string $sellerSignatureName
     */
    public function setSellerSignatureName($sellerSignatureName)
    {
        $this->sellerSignatureName = $sellerSignatureName;
    }

    /**
     * @return string
     */
    public function getSellerSignaturePosition()
    {
        return $this->sellerSignaturePosition;
    }

    /**
     * @param string $sellerSignaturePosition
     */
    public function setSellerSignaturePosition($sellerSignaturePosition)
    {
        $this->sellerSignaturePosition = $sellerSignaturePosition;
    }




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
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param mixed $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return mixed
     */
    public function getBuyerUser()
    {
        return $this->buyerUser;
    }

    /**
     * @param mixed $buyerUser
     */
    public function setBuyerUser($buyerUser)
    {
        $this->buyerUser = $buyerUser;
    }

    /**
     * @return int
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param int $amount
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }


    /**
     * @param mixed $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return BidStatus
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
    }

    /**
     * @return int
     */
    public function getCustomId()
    {
        return $this->customId;
    }

    /**
     * @param int $customId
     */
    public function setCustomId($customId)
    {
        $this->customId = $customId;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    public function filterRights($rights){
        $rightIds = $rights->map(function ($right) {
           return $right->getId();
        });

        return $rightIds->toArray();
    }


    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Bid
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Add country
     *
     * @param \AppBundle\Entity\Country $country
     *
     * @return Bid
     */
    public function addCountry(\AppBundle\Entity\Country $country)
    {
        $this->countries[] = $country;

        return $this;
    }

    /**
     * Remove country
     *
     * @param \AppBundle\Entity\Country $country
     */
    public function removeCountry(\AppBundle\Entity\Country $country)
    {
        $this->countries->removeElement($country);
    }

    /**
     * @return int
     */
    public function getTotalFee()
    {
        return $this->totalFee;
    }

    /**
     * @param int $totalFee
     */
    public function setTotalFee($totalFee)
    {
        $this->totalFee = $totalFee;
    }

    /**
     * @return mixed
     */
    public function getSalesPackage()
    {
        return $this->salesPackage;
    }

    /**
     * @param mixed $salesPackage
     */
    public function setSalesPackage($salesPackage)
    {
        $this->salesPackage = $salesPackage;
    }

    /**
     * @return mixed
     */
    public function getSignature()
    {
        return $this->signature;
    }

    /**
     * @param mixed $signature
     */
    public function setSignature($signature)
    {
        $this->signature = $signature;
    }

    /**
     * @return mixed
     */
    public function getSellerSignature()
    {
        return $this->sellerSignature;
    }

    /**
     * @param mixed $sellerSignature
     */
    public function setSellerSignature($sellerSignature)
    {
        $this->sellerSignature = $sellerSignature;
    }

    /**
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param string $message
     */
    public function setMessage($message)
    {
        $this->message = $message;
    }

    /**
     * @return mixed
     */
    public function getSoldListing()
    {
        return $this->soldListing;
    }

    /**
     * @param mixed $soldListing
     */
    public function setSoldListing($soldListing)
    {
        $this->soldListing = $soldListing;
    }

    /**
     * @return mixed
     */
    public function getSellerSignatureDate()
    {
        return $this->sellerSignatureDate;
    }

    /**
     * @param mixed $sellerSignatureDate
     */
    public function setSellerSignatureDate($sellerSignatureDate)
    {
        $this->sellerSignatureDate = $sellerSignatureDate;
    }

    /**
     * @return mixed
     */
    public function getBuyerSignatureDate()
    {
        return $this->buyerSignatureDate;
    }

    /**
     * @param mixed $buyerSignatureDate
     */
    public function setBuyerSignatureDate($buyerSignatureDate)
    {
        $this->buyerSignatureDate = $buyerSignatureDate;
    }

    /**
     * @return mixed
     */
    public function getBuyerCompany()
    {
        return $this->buyerCompany;
    }

    /**
     * @param mixed $buyerCompany
     */
    public function setBuyerCompany($buyerCompany)
    {
        $this->buyerCompany = $buyerCompany;
    }

    /**
     * @return mixed
     */
    public function getBuyerCompanySnapshot()
    {
        return $this->buyerCompanySnapshot;
    }

    /**
     * @param mixed $buyerCompanySnapshot
     */
    public function setBuyerCompanySnapshot($buyerCompanySnapshot)
    {
        $this->buyerCompanySnapshot = $buyerCompanySnapshot;
    }

    /**
     * @return mixed
     */
    public function getSellerCompanySnapshot()
    {
        return $this->sellerCompanySnapshot;
    }

    /**
     * @param mixed $sellerCompanySnapshot
     */
    public function setSellerCompanySnapshot($sellerCompanySnapshot)
    {
        $this->sellerCompanySnapshot = $sellerCompanySnapshot;
    }

    /**
     * @return int
     */
    public function getMultiple()
    {
        return $this->multiple;
    }

    /**
     * @param int $multiple
     */
    public function setMultiple($multiple)
    {
        $this->multiple = $multiple;
    }




}
