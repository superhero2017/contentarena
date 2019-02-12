<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 4/2/2018
 * Time: 2:36 AM
 */

namespace AppBundle\Service;

use AppBundle\Entity\Bid;
use AppBundle\Entity\Company;
use AppBundle\Entity\Content;
use AppBundle\Entity\Thread;
use Doctrine\ORM\EntityManager;
use FOS\UserBundle\Model\User;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


class EmailService
{

    private $em;

    private $mailer;

    private $twig;

    private $hostUrl;

    static private $TEST_EMAIL = "juancruztalco@gmail.com";
    static private $ALERTS_EMAIL = "alerts@contentarena.com";

    public function __construct(EntityManager $entityManager, \Twig_Environment $twig, \Swift_Mailer $mailer, $hostUrl) {
        $this->em = $entityManager;
        $this->twig = $twig;
        $this->mailer = $mailer;
        $this->hostUrl = $hostUrl;
    }

    /**
     * @param Content $listing
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function listingExpired( Content $listing){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_seller_listing_expired");
        $content = $emailContentRepository->findBySlug("email_content_seller_listing_expired");
        $content2 = $emailContentRepository->findBySlug("email_content_seller_listing_expired_2");
        $content3 = $emailContentRepository->findBySlug("email_content_seller_listing_expired_3");
        $company = $listing->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "content3" => $content3->getContent(),
            "listing" => $listing,
            "company" => $company,
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.seller.listing-expired.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function listingExpiry( Content $listing){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_seller_listing_expiry");
        $content = $emailContentRepository->findBySlug("email_content_seller_listing_expiry");
        $content2 = $emailContentRepository->findBySlug("email_content_seller_listing_expiry_2");
        $content3 = $emailContentRepository->findBySlug("email_content_seller_listing_expiry_3");
        $company = $listing->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "content3" => $content3->getContent(),
            "listing" => $listing,
            "company" => $company,
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.seller.listing-expiry.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @param Thread $thread
     * @param Company $sender
     * @param Company $recipient
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function newMessage( Content $listing, Thread $thread, Company $sender, Company $recipient){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_message_new");
        $content = $emailContentRepository->findBySlug("email_content_message_new");
        $content2 = $emailContentRepository->findBySlug("email_content_message_new_2");
        $content3 = $emailContentRepository->findBySlug("email_content_message_new_3");
        $recipients = array();
        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "content3" => $content3->getContent(),
            "listing" => $listing,
            "company" => $recipient,
            "sender" => $sender,
            "thread" => $thread
        );

        foreach ($recipient->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.messages.new.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @param Bid $bid
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function closedDealBuyer( Content $listing, Bid $bid){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_buyer_closed_deal");
        $content = $emailContentRepository->findBySlug("email_content_buyer_closed_deal");
        $content2 = $emailContentRepository->findBySlug("email_content_buyer_closed_deal_2");
        $content3 = $emailContentRepository->findBySlug("email_content_buyer_closed_deal_3");
        $company = $bid->getBuyerUser()->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "content3" => $content3->getContent(),
            "listing" => $listing,
            "company" => $company,
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.buyer.closed-deal.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @param Bid $bid
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function bidAccepted( Content $listing, Bid $bid){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_buyer_bid_accepted");
        $content = $emailContentRepository->findBySlug("email_content_buyer_bid_accepted");
        $content2 = $emailContentRepository->findBySlug("email_content_buyer_bid_accepted_2");
        $content3 = $emailContentRepository->findBySlug("email_content_buyer_bid_accepted_3");
        $company = $bid->getBuyerUser()->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "content3" => $content3->getContent(),
            "listing" => $listing,
            "company" => $company,
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.buyer.bid-accepted.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @param Bid $bid
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function bidDeclined( Content $listing, Bid $bid){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_buyer_bid_declined");
        $content = $emailContentRepository->findBySlug("email_content_buyer_bid_declined");
        $content2 = $emailContentRepository->findBySlug("email_content_buyer_bid_declined_2");
        $content3 = $emailContentRepository->findBySlug("email_content_buyer_bid_declined_3");
        $company = $bid->getBuyerUser()->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "content3" => $content3->getContent(),
            "listing" => $listing,
            "company" => $company,
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.buyer.bid-declined.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @param Bid $bid
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function bidPlaced( Content $listing, Bid $bid){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_buyer_bid_placed");
        $content = $emailContentRepository->findBySlug("email_content_buyer_bid_placed");
        $content2 = $emailContentRepository->findBySlug("email_content_buyer_bid_placed_2");
        $company = $bid->getBuyerUser()->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "listing" => $listing,
            "company" => $company,
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.buyer.bid-placed.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function soldOut( Content $listing){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_seller_sold_out");
        $content = $emailContentRepository->findBySlug("email_content_seller_sold_out");
        $content2 = $emailContentRepository->findBySlug("email_content_seller_sold_out_2");
        $company = $listing->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "listing" => $listing,
            "company" => $company,
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.seller.sold-out.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @param Bid $bid
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function dealClosed( Content $listing, Bid $bid){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_seller_deal_closed");
        $content = $emailContentRepository->findBySlug("email_content_seller_deal_closed");
        $content2 = $emailContentRepository->findBySlug("email_content_seller_deal_closed_2");
        $content3 = $emailContentRepository->findBySlug("email_content_seller_deal_closed_3");
        $company = $listing->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "content3" => $content3->getContent(),
            "listing" => $listing,
            "company" => $company,
            "bid" => $bid
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.seller.deal-closed.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @param Bid $bid
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function bidReceived( Content $listing, Bid $bid){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_seller_bid_received");
        $content = $emailContentRepository->findBySlug("email_content_seller_bid_received");
        $content2 = $emailContentRepository->findBySlug("email_content_seller_bid_received_2");
        $content3 = $emailContentRepository->findBySlug("email_content_seller_bid_received_3");
        $company = $listing->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "content3" => $content3->getContent(),
            "listing" => $listing,
            "company" => $company,
            "bid" => $bid
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.seller.bid-received.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function listingDeactivated( Content $listing){

        /* @var Company $company*/

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_seller_listing_deactivated");
        $content = $emailContentRepository->findBySlug("email_content_seller_listing_deactivated");
        $content2 = $emailContentRepository->findBySlug("email_content_seller_listing_deactivated_2");
        $company = $listing->getCompany();
        $recipients = array();

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "listing" => $listing,
            "company" => $company
        );

        foreach ($company->getUsers() as $user){
            $recipients[] = $user->getEmail();
        }

        $this->sendEmails("email/email.seller.listing-deactivated.twig", $subject->getContent(), $recipients, $parameters );

    }

    /**
     * @param Content $listing
     * @param User $user
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function listingMatch( Content $listing, User $user){

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_buyer_listing_match");
        $content = $emailContentRepository->findBySlug("email_content_buyer_listing_match");
        $content2 = $emailContentRepository->findBySlug("email_content_buyer_listing_match_2");

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "listing" => $listing,
            "user" => $user
        );
        $this->sendEmail("email/email.buyer.listing-match.twig", $subject->getContent(), $user->getEmail(), $parameters );

    }

    /**
     * @param Content $listing
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function listingApproved( Content $listing){

        $emailContentRepository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $emailContentRepository->findBySlug("email_subject_seller_listing_approved");
        $content = $emailContentRepository->findBySlug("email_content_seller_listing_approved");
        $content2 = $emailContentRepository->findBySlug("email_content_seller_listing_approved_2");

        $parameters = array(
            "content" => $content->getContent(),
            "content2" => $content2->getContent(),
            "listing" => $listing,
            "user" => $listing->getOwner()
        );
        $this->sendEmail("email/email.seller.listing-approved.twig", $subject->getContent(), $listing->getOwner()->getEmail(), $parameters );

    }

    /**
     * @param $params
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function userRequestedLogin($params){

        $repository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $repository->findBySlug("email_subject_internal_user_request");
        $content = $repository->findBySlug("email_content_internal_user_request");
        $parameters = array_merge(
            $params,
            array(
                "content" => $content->getContent()
            )
        );
        $this->sendEmail("email/email.internal.user-request.twig", $subject->getContent(), $this::$ALERTS_EMAIL, $parameters );

    }

    /**
     * @param $params
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendActivationLink($params){

        $repository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $repository->findBySlug("email_subject_user_activation_link");
        $content = $repository->findBySlug("email_content_user_activation_link");
        $content2 = $repository->findBySlug("email_content_user_activation_link_2");
        $parameters = array_merge(
            $params,
            array(
                "content" => $content->getContent(),
                "content2" => $content2->getContent()
            )
        );
        $this->sendEmail("email/email.user.activation-link.twig", $subject->getContent(), $params['user']->getEmail(), $parameters );

    }

    public function sendUserInvite($params){

        $repository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $repository->findBySlug("email_subject_user_invite");
        $content = $repository->findBySlug("email_content_user_invite");
        $content2 = $repository->findBySlug("email_content_user_invite_2");
        $content3 = $repository->findBySlug("email_content_user_invite_3");
        $content4 = $repository->findBySlug("email_content_user_invite_4");
        $parameters = array_merge(
            $params,
            array(
                "content" => $content->getContent(),
                "content2" => $content2->getContent(),
                "content3" => $content3->getContent(),
                "content4" => $content4->getContent()
            )
        );
        $this->sendEmail("email/email.user.invite.twig", $subject->getContent(), $params['user']->getEmail(), $parameters );

    }

    /**
     * @param $params
     * @param $email
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function shareListing($params, $email){

        $repository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $repository->findBySlug("email_subject_share_listing");
        $content = $repository->findBySlug("email_content_share_listing");
        $content2 = $repository->findBySlug("email_content_share_listing_2");
        $content3 = $repository->findBySlug("email_content_share_listing_3");
        $parameters = array_merge(
            $params,
            array(
                "content" => $content->getContent(),
                "content2" => $content2->getContent(),
                "content3" => $content3->getContent(),
            )
        );
        $this->sendEmail("email/email.share.listing.twig", $subject->getContent(), $email, $parameters );

    }

    /**
     * @param $params
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function welcomeUser($params){

        $repository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $repository->findBySlug("email_subject_user_welcome");
        $content = $repository->findBySlug("email_content_user_welcome");
        $parameters = array_merge(
            $params,
            array(
                "content" => $content->getContent(),
            )
        );
        $this->sendEmail("email/email.user.welcome.twig", $subject->getContent(), $params['user']->getEmail(), $parameters );

    }

    /**
     * @param $params
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function forgotPassword($params){

        $repository = $this->em->getRepository("AppBundle:EmailContent");
        $subject = $repository->findBySlug("email_subject_user_forgot_password");
        $content = $repository->findBySlug("email_content_user_forgot_password");
        $content2 = $repository->findBySlug("email_content_user_forgot_password_2");
        $parameters = array_merge(
            $params,
            array(
                "content" => $content->getContent(),
                "content2" => $content2->getContent()
            )
        );
        $this->sendEmail("email/email.user.forgot-password.twig", $subject->getContent(), $params['user']->getEmail(), $parameters );

    }

    /**
     * @param $template
     * @param $subject
     * @param array $recipients
     * @param $params
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmails($template, $subject, $recipients = array(), $params){

        foreach ($recipients as $recipient){
            $this->sendEmail($template, $subject, $recipient, $params);
        }

    }

    /**
     * @param $template
     * @param $subject
     * @param $to
     * @param $params
     * @return bool
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmail($template, $subject, $to, $params )
    {
        $parameters = array_merge(
            $params,
            array(
                "hostUrl" => $this->hostUrl
            )
        );

        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setContentType("text/html")
            ->setFrom('info@contentarena.com', "Content Arena")
            ->setTo($to)
            ->setBody(
                $this->twig->render( $template, $parameters )
            )
        ;
        $this->mailer->send($message);

        return true;
    }


}