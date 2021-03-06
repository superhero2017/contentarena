<?php

namespace AppBundle\Controller\Api;

use AppBundle\Entity\Content;
use AppBundle\Entity\User;
use AppBundle\Error\ListingErrors;
use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\ContentService;
use AppBundle\Service\EmailService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Service\BidService;
use JMS\Serializer\SerializerBuilder;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;

class ApiListingController extends Controller
{

    use ControllerHelper;

    /**
     * @Route("/api/listing/save", name="saveListingAsInactive")
     * @param Request $request
     * @param ContentService $contentService
     * @return JsonResponse
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function saveListingAsInactive(Request $request, ContentService $contentService  )
    {
        $user = $this->getUser();
        $content = $contentService->saveContentAsInactive($user, $request);
        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        return new JsonResponse(array(
            "success"=>true,
            "contentId"=> $content->getId(),
            "customId" => $content->getCustomId(),
            "status" => $content->getStatus()->getName(),
            "salesPackages" => ($content->getSalesPackages() != null) ? $serializer->toArray($content->getSalesPackages()) : array()
        ));
    }

    /**
     * @Route("/api/listing/publish", name="saveContentAsActive")
     * @param Request $request
     * @param ContentService $contentService
     * @return JsonResponse
     */
    public function saveContentAsActive(Request $request, ContentService $contentService  )
    {
        /* @var User $user */
        $user = $this->getUser();
        $username = ($user != null) ? $user->getEmail() : "Anonymous";
        $listingId = $request->get("customId");
        $logger = $this->get('logger');

        $logger->info("USER SUBMITTED LISTING", array(
            "user" => $username,
            "listingId" => $listingId,
        ));

        try {
            $content = $contentService->saveContentAsActive($user, $request);

            $logger->info("USER SUBMITTED LISTING SUCCESSFULLY", array(
                "user" => $username,
                "listingId" => $listingId,
            ));

            $data = array('success'=>true, "contentId"=> $content->getId(), "customId" => $content->getCustomId());
            return $this->getSerializedResponse($data);
        } catch (\Exception $e){
            $logger->info("USER SUBMITTED LISTING UNSUCCESSFULLY", array(
                "user" => $username,
                "listingId" => $listingId,
                "errorMessage" => $e->getMessage()
            ));
            return $this->getHandledErrorResponse(ListingErrors::class, 102, $e->getMessage());
        }
    }

    /**
     * @Route("/api/listing/republish", name="republishListing")
     * @param Request $request
     * @param ContentService $contentService
     * @return Response
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function republishListing(Request $request, ContentService $contentService  )
    {
        $user = $this->getUser();
        $listing = $contentService->republishListing($user, $request->get('customId'));
        $context = SerializationContext::create()->setGroups(array('board'));
        $data = array('success'=>true, 'listing' => $listing);
        $serialized = $this->serialize($data,$context);
        $response = new Response($serialized);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Route("/api/listings/watchlist", name="apiListingsWatchlist")
     */
    public function apiListingsWatchlist(Request $request){

        $user = $this->getUser();
        $watchlistItems = $this->getDoctrine()->getRepository('AppBundle:Watchlist')->findBy(['company'=>$user->getCompany()], array('id' => 'DESC'));

        $contents = [];

        foreach ($watchlistItems as $watchlist){
            $contents[] = $watchlist->getContent();
        }

        $paginator  = $this->get('knp_paginator');
        $contents = $paginator->paginate($contents,$request->query->getInt('page',1),50);
        return $this->getSerializedResponse($contents->getItems(), array('listing') );
    }

    /**
     * @Route("/api/listings/remove", name="apiListingsRemove")
     */
    public function apiListingsRemove(Request $request, ContentService $contentService){

        $response = $contentService->removeListing($request->get('customId'));
        return new JsonResponse(array("success"=>$response));
    }

    /**
     * @Route("/api/listings/draft", name="listingsDrafts")
     */
    public function listingsDrafts(Request $request, ContentService $contentService)
    {
        $user = $this->getUser();
        $listings = $contentService->getDrafts($user);
        $context = SerializationContext::create()->setGroups(array('board'));

        $data = $this->serialize($listings,$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/inactive", name="listingsInactive")
     */
    public function listingsInactive(Request $request, ContentService $contentService)
    {
        $user = $this->getUser();
        $listings = $contentService->getInactive($user);
        $context = SerializationContext::create()->setGroups(array('board'));

        $data = $this->serialize($listings,$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/active", name="listingsActive")
     */
    public function listingsActive(Request $request, ContentService $contentService, BidService $bidService)
    {
        $user = $this->getUser();
        $listings = $contentService->getActive($user);

        foreach ( $listings as $listing ) {
            /* @var Content $listing*/
            $bids = $bidService->getAllBidsByContent($listing);
            $pendingBid = $bidService->getPendingBidsByContent($listing);

            if ( $pendingBid != null ) $listing->setHasPendingBids(true);
            if ( $bids != null ) $listing->setHasActivity(true);
        }

        $context = SerializationContext::create()->setGroups(array('board'));

        $data = $this->serialize($listings,$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/expired", name="listingsExpired")
     */
    public function listingsExpired(Request $request, ContentService $contentService, BidService $bidService)
    {
        $user = $this->getUser();
        $listings = $contentService->getExpired($user);
        $context = SerializationContext::create()->setGroups(array('board'));

        foreach ( $listings as $listing ) {
            /* @var Content $listing*/
            $bids = $bidService->getAllBidsByContent($listing);

            if ( $bids != null ) $listing->setHasActivity(true);
        }

        $data = $this->serialize($listings,$context);

        $response = new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/duplicate", name="apiListingsDuplicate")
     */
    public function apiListingsDuplicate(Request $request, ContentService $contentService){

        $user = $this->getUser();
        $listing = $contentService->duplicateListing($request->get('customId'), $user);
        $context = SerializationContext::create()->setGroups(array('board'));
        $data = array('success'=>true, 'listing' => $listing);
        $serialized = $this->serialize($data,$context);
        $response = new Response($serialized);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }

    /**
     * @Route("/api/listings/deactivate", name="apiListingsDeactivate")
     * @param Request $request
     * @param ContentService $contentService
     * @param EmailService $emailService
     * @return mixed|string|Response
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function apiListingsDeactivate(Request $request, ContentService $contentService, EmailService $emailService){

        $user = $this->getUser();
        $listing = $contentService->deactivateListing($request->get('customId'), $user);
        $emailService->internalUserListingDeactivate($user,$listing);
        $data = array('success'=>true, 'listing' => $listing);
        return $this->getSerializedResponse($data, array('board'));

    }

    /**
     * @Route("/api/listings/archive", name="apiListingsArchive")
     * @param Request $request
     * @param ContentService $contentService
     * @param EmailService $emailService
     * @return mixed|string|Response
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function apiListingsArchive(Request $request, ContentService $contentService, EmailService $emailService){

        $user = $this->getUser();
        $listing = $contentService->archiveListing($request->get('customId'), $user);
        $emailService->internalUserListingArchive($user,$listing);
        $data = array('success'=>true, 'listing' => $listing);
        return $this->getSerializedResponse($data, array('board'));

    }

    /**
     * @Route("/api/content/preview", name="listingDetailsPreview")
     * @param Request $request
     * @param ContentService $contentService
     * @return JsonResponse
     */
    public function listingDetailsPreview(Request $request, ContentService $contentService){
        $customId = $request->get('id');
        if(!$customId) {
            return $this->getErrorResponse(ListingErrors::class, 103);
        }

        $listingPreview = $contentService->findByCustomId($customId);

        if (!$listingPreview) {
            return $this->getErrorResponse(ListingErrors::class, 100);
        }

        $data = array('success'=>true, 'listing' => $listingPreview);
        return $this->getSerializedResponse($data, array('preview'));
    }
}
