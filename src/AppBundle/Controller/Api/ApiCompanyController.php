<?php

namespace AppBundle\Controller\Api;

use AppBundle\Helper\ControllerHelper;
use AppBundle\Service\EmailService;
use AppBundle\Service\JobService;
use AppBundle\Service\TestService;
use AppBundle\Service\UserService;
use AppBundle\Service\CompanyService;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ApiCompanyController extends Controller
{

    use ControllerHelper;

    const MARKETPLACE_PAGE_SIZE = 10;

    public function __construct()
    {

    }

    /**
     * @Route("/api/company/invite", name="inviteCompanyUsers")
     * @param Request $request
     * @param UserService $userService
     * @param EmailService $emailService
     * @param JobService $jobService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function inviteCompanyUsers(
        Request $request,
        UserService $userService,
        EmailService $emailService,
        JobService $jobService
    )
    {
        $user = $this->getUser();
        $users = $request->get("users");
        $hostUrl = $this->container->getParameter("carena_host_url");
        $filteredUsers = $userService->inviteCompanyUsers($users, $user->getCompany());


        foreach ($filteredUsers["invitedUsers"] as $invitedUser){

            $confirmationUrl = $this->container->get('router')->generate('fos_user_registration_confirm_new', array('token' => $invitedUser->getConfirmationToken()), UrlGeneratorInterface::ABSOLUTE_URL);
            $params = array(
                "hostUrl" => $hostUrl,
                "user" => $invitedUser,
                "colleague" => $user,
                "confirmationUrl" => $confirmationUrl
            );

            $emailService->sendUserInvite($params);
            $jobService->createAccountIncompleteFromInviteJob($invitedUser, $user);
        }

        return $this->getSerializedResponse($filteredUsers, array('companyUsers') );
    }


    /**
     * @Route("/api/company/users", name="getCompanyUsers")
     */
    public function getCompanyUsers()
    {
        $user = $this->getUser();
        $users = $user->getCompany()->getUsers();
        return $this->getSerializedResponse($users, array('companyUsers') );
    }

    /**
     * @Route("/api/company/update", name="updateCompany")
     * @param Request $request
     * @param UserService $userService
     * @return mixed|string|\Symfony\Component\HttpFoundation\Response
     */
    public function updateCompany(Request $request, UserService $userService)
    {
        $user = $this->getUser();
        $company = $userService->updateCompany($request->get("company"), $user);
        return $this->getSerializedResponse($company, array('settings') );

    }

}