<?php
/**
 * Created by PhpStorm.
 * User: JuanCruz
 * Date: 10/1/2018
 * Time: 6:38 PM
 */

// src/DataFixtures/AppFixtures.php
namespace AppBundle\DataFixtures;

use AppBundle\Entity\RightsItemContent;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class RightsItemContentFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $content = array(
            array("Transmission Means - Cable& IPTV", "Cable& IPTV", "Transmission Means - Cable& IPTV","Cable&IPTV means the system for the transmission of audiovisual images through broadband connection on closed IP networks, for the reception of the same on television sets appropriate to the reception thereof, through set-top boxes or decoders connected with the distribution system managed by the Broadcaster (usually, but not necessarily, based on a subscription model)."),
            array("Transmission Means - Satellite", "Satellite", "Transmission Means - Satellite","Satellite means the broadcast of audiovisual images destined for reception on television sets by means of satellite “direct-to-home” in DVB-S standard."),
            array("Transmission Means - Digital Terrestrial", "Digital Terrestrial", "Transmission Means - Digital Terrestrial","Digital terrestrial means the broadcast of audiovisual images destined for reception on television set by means of digital terrestrial frequencies in DVB-T standard and its specific evolutions, such as DVB-T2 standard."),
            array("Transmission Means - OTT", "OTT", "Transmission Means - OTT","OTT means a broadcast modality by which audio-visual content is delivered by way of the public internet (open IP network) on demand, including by means of Pay Broadcast, without requiring viewers to subscribe to a cable or satellite subscription service."),
            array("Transmission Means - Internet", "Internet", "Transmission Means - Internet","Internet means the system for the transmission of audiovisual images through the public internet (open IP net) for the reception of the same on personal computers, tablets, smartphones and smart TV, without the need for equipment or receiving software other than those generally available and technologically established."),
            array("Transmission Means - Mobile", "Mobile", "Transmission Means - Mobile","Mobile means the system for the transmission of audiovisual images in unicast (PtoP) modality through GSM, GPRS/EDGE, UMTS/HSDPA, LTE standards and their specific evolutions, for the reception of the same on devices connected with mobile communication networks."),
            array("Exclusivity - Yes", "Yes", "Content is exclusive", ""),
            array("Exclusivity - No", "No", "Content is not exclusive", ""),
            array("Exploitation Form - Free only", "Free only", "Free only", "Means an unencrypted system of communication to the public of any content that is accessible by all viewers free of charge."),
            array("Exploitation Form - Pay only", "Pay only", "Pay only", "Communication to the public that permits conditional access by a viewer to any content upon payment of a particular sum, even upon individual demand."),
            array("Exploitation Form - Inship&Inflight", "Inship&Inflight", "Inship&Inflight", "The In-Flight and In-Ship Package is comprised of the right to broadcast content on ships and planes if these operate within the relevant acquired territories. "),
            array("Exploitation Form - Closed circuit hospitality", "Closed circuit hospitality", "Closed circuit hospitality", "Means the right to transmit content by means of any closed-circuit delivery system to closed user groups such as hotels, restaurants, bars, educational institutions, hospitals, oil rigs, transportation services (excluding ships and planes) within private internet groups and virtual private networks other than bettings shops.  "),

            array("Reserved Rights - No rights reserved", "No rights reserved", "No rights reserved", ""),
            array("Reserved Rights - 2", "The non exclusive right to exploit the archive right on own&operated platforms after {{smallInput}} days after single event completion. ", "The non exclusive right to exploit the archive right on own&operated platforms after {{smallInput}} days after single event completion. ", ""),
            array("Reserved Rights - 3", "The non exclusive right to exploit a maximum of {{smallInput}} seconds of content of a single event {{smallInput}} hours after its offical completion.", "The non exclusive right to exploit a maximum of {{smallInput}} seconds of content of a single event {{smallInput}} hours after its offical completion.", ""),
            array("Reserved Rights - 4", "The non-exclusive right for the organizer of a single event to exploit closed circuit and public screening inside the event location premises. ", "The non-exclusive right for the organizer of a single event to exploit closed circuit and public screening inside the event location premises. ", ""),
            array("Reserved Rights - Other", "Other reserved right {{bigInput}}", "", ""),

            array("Time Embargo - No", "No time embargo", "No time embargo", ""),
            array("Time Embargo - Yes", "{{smallInput}} hours after the event {{bigInput}}", "", ""),

            array("Video Standard - SD", "SD", "SD", ""),
            array("Video Standard - HD", "HD", "HD", ""),
            array("Video Standard - UHD", "UHD", "UHD", ""),
            array("Video Standard - VR", "VR", "VR", ""),

            array("Graphics - Yes", "Yes, graphics available in {{language}}", "Yes, graphics available in {{language}}", ""),
            array("Graphics - No", "No graphics available", "No graphics available", ""),

            array("Aspect Ratio - 16:9", "16:9", "16:9", ""),
            array("Aspect Ratio - 4:3", "4:3", "46:3", ""),
            array("Aspect Ratio - custom", "{{smallInput}}px width x {{smallInput}}px height", "", ""),

            array("Subtitles - Yes", "Yes, subtitles available in {{language}}", "Yes, subtitles available in {{language}}", ""),
            array("Subtitles - No", "No subtitles available", "No subtitles available", ""),

            array("Commentary - Yes", "Yes, commentary available in {{language}}", "Yes, commentary available in {{language}}", ""),
            array("Commentary - No", "No commentary available", "No commentary available", ""),

            array("Script - Yes", "Yes, script available in {{language}}", "Yes, script available in {{language}}", ""),
            array("Script - No", "No script available", "No script available", ""),

            array("Number of Cameras - Minimum", "Event will be filmed by minimum of {{smallInput}} cameras", "Event will be filmed by minimum of {{smallInput}} cameras", ""),
            array("Number of Cameras - Defined", "As defined in text field {{bigInput}}", "As defined in text field {{bigInput}}", ""),
            array("Number of Cameras - No", "Not applicable", "Not applicable", ""),

            array("Highlights cut available - Yes", "Yes", "Highlights cut available", ""),
            array("Highlights cut available - No", "No", "Highlights cut no available", ""),

            array("Clips cut available - Yes", "Yes", "Clips cut available", ""),
            array("Clips cut available - No", "No", "Clips cut no available", ""),

            array("News access cut available - Yes", "Yes", "News access cut available", ""),
            array("News access cut available - No", "No", "News access cut no available", ""),

            /*array("Distributed with Highlights - Yes", "Yes", "Distributed with Highlights", ""),
            array("Distributed with Highlights - No", "No", "", ""),

            array("Distributed with Clips - Yes", "Yes", "Distributed with Clips", ""),
            array("Distributed with Clips - No", "No", "", ""),

            array("Distributed with Live Signal - Yes", "Yes", "Distributed with Live Signal", ""),
            array("Distributed with Live Signal - No", "No", "", ""),*/

            array("Distribution Method - IP", "IP", "", ""),
            array("Distribution Method - Fiber", "Fiber", "", ""),
            array("Distribution Method - FTP Server", "FTP Server", "", ""),
            array("Distribution Method - Satellite", "Satellite", "", ""),

            array("Technical Delivery Time", "Content will be delivered within {{smallInput}} hours before each single event.", "", ""),

            array("Technical Fee", "{{smallInput}}", "", ""),

        );

        for ($i = 0; $i < count($content); $i++) {

            $en = $manager->getRepository("AppBundle:RightsItemContent")->findOneBy( array('name' => $content[$i][0] ));

            if ( $en == null ){
                $emailContent = new RightsItemContent();
                $emailContent->setName($content[$i][0]);
                $emailContent->setFormContent($content[$i][1]);
                $emailContent->setContractContent($content[$i][2]);
                $emailContent->setDescription($content[$i][3]);
                $manager->persist($emailContent);
            }
        }

        $manager->flush();
    }
}