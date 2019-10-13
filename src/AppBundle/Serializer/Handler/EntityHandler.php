<?php

namespace AppBundle\Serializer\Handler;

use Doctrine\Common\Annotations\AnnotationReader;
use Doctrine\ORM\EntityManagerInterface;
use JMS\Serializer\Naming\IdenticalPropertyNamingStrategy;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use ReflectionClass;
use Symfony\Bridge\Doctrine\RegistryInterface;
use JMS\Serializer\Context;
use JMS\Serializer\Exception\InvalidArgumentException;
use JMS\Serializer\GenericDeserializationVisitor;
use JMS\Serializer\Handler\SubscribingHandlerInterface;
use JMS\Serializer\VisitorInterface;
use JMS\Serializer\GraphNavigator;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\PropertyAccess\PropertyAccess;

class EntityHandler implements SubscribingHandlerInterface
{
    /**
     * @var RegistryInterface
     */
    protected $registry;

    private $container;

    /**
     * @return array
     */
    public static function getSubscribingMethods()
    {
        $methods = [];

        $methods[] = [
            'type' => "CurrencyObject",
            'direction' => GraphNavigator::DIRECTION_DESERIALIZATION,
            'format' => 'json',
            'method' => 'deserializeCurrencyObject',
        ];
        $methods[] = [
            'type' => "CurrencyObject",
            'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
            'format' => 'json',
            'method' => 'serializeCurrencyObject',
        ];
        $methods[] = [
            'type' => "CustomIdItem",
            'direction' => GraphNavigator::DIRECTION_DESERIALIZATION,
            'format' => 'json',
            'method' => 'deserializeEntityByCustomId',
        ];
        $methods[] = [
            'type' => "CustomIdItem",
            'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
            'format' => 'json',
            'method' => 'serializeCustomIdEntity',
        ];
        $methods[] = [
            'type' => "TerritorialBundles",
            'direction' => GraphNavigator::DIRECTION_DESERIALIZATION,
            'format' => 'json',
            'method' => 'deserializeEntityById',
        ];
        $methods[] = [
            'type' => "TerritorialBundles",
            'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
            'format' => 'json',
            'method' => 'serializeIdEntity',
        ];
        $methods[] = [
            'type' => "PropertyEventItem",
            'direction' => GraphNavigator::DIRECTION_DESERIALIZATION,
            'format' => 'json',
            'method' => 'deserializeEntity',
        ];
        $methods[] = [
            'type' => "PropertyEventItem",
            'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
            'format' => 'json',
            'method' => 'serializeEntity',
        ];
        $methods[] = [
            'type' => "PropertyTerritoryItem",
            'direction' => GraphNavigator::DIRECTION_DESERIALIZATION,
            'format' => 'json',
            'method' => 'deserializeTerritoryEntity',
        ];
        $methods[] = [
            'type' => "PropertyTerritoryItem",
            'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
            'format' => 'json',
            'method' => 'serializeTerritoryEntity',
        ];
        $methods[] = [
            'type' => "JsObject",
            'direction' => GraphNavigator::DIRECTION_DESERIALIZATION,
            'format' => 'json',
            'method' => 'deserializeJsObject',
        ];
        $methods[] = [
            'type' => "JsObject",
            'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
            'format' => 'json',
            'method' => 'serializeJsObject',
        ];
        return $methods;
    }

    /**
     * EntityHandler constructor.
     * @param RegistryInterface $registry
     * @param Container $container
     */
    public function __construct(RegistryInterface $registry, Container $container)
    {
        $this->registry = $registry;
        $this->container = $container;
    }

    /**
     * @param GenericDeserializationVisitor $visitor
     * @param null|object $item
     * @param array $type
     * @return null|object
     */
    public function deserializeCurrencyObject(GenericDeserializationVisitor $visitor, $item, array $type)
    {
        if (null === $item || (is_array($item) && empty($item))) {
            return null;
        }

        if (!(is_array($type) && isset($type['params']) && is_array($type['params']) && isset($type['params']['0']))) {
            return null;
        }

        $entity = null;
        $entityClass = $type['params'][0]['name'];
        $entityManager = $this->getEntityManager($entityClass);

        if (isset($item)){
            $entity = $entityManager->getRepository($entityClass)->findOneBy(array(
                "code" => $item
            ));
        }

        if (null === $entity){
            $namingStrategy = new IdenticalPropertyNamingStrategy();
            $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
            $entity = $serializer->deserialize(json_encode($item), $entityClass, 'json');
        }

        return $entity;
    }

    public function serializeCurrencyObject(VisitorInterface $visitor, $entity, array $type, Context $context)
    {

        $entityClass = $this->getEntityClassFromParameters($type['params']);
        if (!$entity instanceof  $entityClass) {
            throw new InvalidArgumentException(
                sprintf("Entity class '%s' was expected, but '%s' got", $entityClass, get_class($entity))
            );
        }

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $newContext = SerializationContext::create();
        $groups = $context->attributes->get("groups");

        if ( $context->attributes != null && !$groups->isEmpty() ) $newContext->setGroups($groups->get(0));
        return json_decode($serializer->serialize($entity->getCode(), 'json', $newContext));

    }

    /**
     * @param VisitorInterface $visitor
     * @param $entity
     * @param array $type
     * @param Context $context
     * @return mixed
     */
    public function serializeEntity(VisitorInterface $visitor, $entity, array $type, Context $context)
    {

        $entityClass = $this->getEntityClassFromParameters($type['params']);
        if (!$entity instanceof  $entityClass) {
            throw new InvalidArgumentException(
                sprintf("Entity class '%s' was expected, but '%s' got", $entityClass, get_class($entity))
            );
        }

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $newContext = SerializationContext::create();
        $groups = $context->attributes->get("groups");

        if ( $context->attributes != null && !$groups->isEmpty() ) $newContext->setGroups($groups->get(0));
        return json_decode($serializer->serialize($entity, 'json', $newContext));

    }

    /**
     * @param VisitorInterface $visitor
     * @param $entity
     * @param array $type
     * @param Context $context
     * @return mixed
     */
    public function serializeCustomIdEntity(VisitorInterface $visitor, $entity, array $type, Context $context)
    {

        $entityClass = $this->getEntityClassFromParameters($type['params']);
        if (!$entity instanceof  $entityClass) {
            throw new InvalidArgumentException(
                sprintf("Entity class '%s' was expected, but '%s' got", $entityClass, get_class($entity))
            );
        }

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $newContext = SerializationContext::create();
        $groups = $context->attributes->get("groups");

        if ( $context->attributes != null && !$groups->isEmpty() ) $newContext->setGroups($groups->get(0));
        return json_decode($serializer->serialize($entity, 'json', $newContext));

    }

    public function serializeIdEntity(VisitorInterface $visitor, $entity, array $type, Context $context)
    {

        $entityClass = $this->getEntityClassFromParameters($type['params']);
        if (!$entity instanceof  $entityClass) {
            throw new InvalidArgumentException(
                sprintf("Entity class '%s' was expected, but '%s' got", $entityClass, get_class($entity))
            );
        }

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $newContext = SerializationContext::create();
        $groups = $context->attributes->get("groups");

        if ( $context->attributes != null && !$groups->isEmpty() ) $newContext->setGroups($groups->get(0));
        return json_decode($serializer->serialize($entity, 'json', $newContext));

    }

    /**
     * @param GenericDeserializationVisitor $visitor
     * @param null|object $item
     * @param array $type
     * @return null|object
     */
    public function deserializeEntity(GenericDeserializationVisitor $visitor, $item, array $type)
    {
        if (null === $item || (is_array($item) && empty($item))) {
            return null;
        }

        if (!(is_array($type) && isset($type['params']) && is_array($type['params']) && isset($type['params']['0']))) {
            return null;
        }

        $entity = null;
        $entityClass = $type['params'][0]['name'];
        $entityManager = $this->getEntityManager($entityClass);

        if (isset($item["externalId"])){
            $entity = $entityManager->getRepository($entityClass)->findOneBy(array(
                "externalId" => $item["externalId"]
            ));
        }

        if (null === $entity){
            $namingStrategy = new IdenticalPropertyNamingStrategy();
            $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
            $entity = $serializer->deserialize(json_encode($item), $entityClass, 'json');
        }

        return $entity;
    }

    /**
     * @param GenericDeserializationVisitor $visitor
     * @param null|object $item
     * @param array $type
     * @return null|object
     */
    public function deserializeEntityByCustomId(GenericDeserializationVisitor $visitor, $item, array $type)
    {
        if (null === $item || (is_array($item) && empty($item))) {
            return null;
        }

        if (!(is_array($type) && isset($type['params']) && is_array($type['params']) && isset($type['params']['0']))) {
            return null;
        }

        $entity = null;
        $entityClass = $type['params'][0]['name'];
        $entityManager = $this->getEntityManager($entityClass);

        if (isset($item["customId"])){
            $entity = $entityManager->getRepository($entityClass)->findOneBy(array(
                "customId" => $item["customId"]
            ));
        }

        if (null === $entity) $entity = $this->deserialize($item, $entityClass);

        return $entity;
    }

    public function deserializeEntityById(GenericDeserializationVisitor $visitor, $item, array $type)
    {
        if (null === $item || (is_array($item) && empty($item))) {
            return null;
        }

        if (!(is_array($type) && isset($type['params']) && is_array($type['params']) && isset($type['params']['0']))) {
            return null;
        }

        $entity = null;
        $entityClass = $type['params'][0]['name'];
        $entityManager = $this->getEntityManager($entityClass);

        if (isset($item["id"])){
            $entity = $entityManager->getRepository($entityClass)->findOneBy(array(
                "id" => $item["id"]
            ));
        }

        if (null === $entity){
            $namingStrategy = new IdenticalPropertyNamingStrategy();
            $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
            $entity = $serializer->deserialize(json_encode($item), $entityClass, 'json');
        }

        return $entity;
    }

    /**
     * @param VisitorInterface $visitor
     * @param $entity
     * @param array $type
     * @param Context $context
     * @return mixed
     */
    public function serializeTerritoryEntity(VisitorInterface $visitor, $entity, array $type, Context $context)
    {

        $entityClass = $this->getEntityClassFromParameters($type['params']);
        if (!$entity instanceof  $entityClass) {
            throw new InvalidArgumentException(
                sprintf("Entity class '%s' was expected, but '%s' got", $entityClass, get_class($entity))
            );
        }

        $namingStrategy = new IdenticalPropertyNamingStrategy();
        $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
        $newContext = SerializationContext::create();
        $groups = $context->attributes->get("groups");

        if ( $context->attributes != null && !$groups->isEmpty() ) $newContext->setGroups($groups->get(0));
        return json_decode($serializer->serialize($entity, 'json', $newContext));

    }

    /**
     * @param GenericDeserializationVisitor $visitor
     * @param null|object $item
     * @param array $type
     * @return null|object
     */
    public function deserializeTerritoryEntity(GenericDeserializationVisitor $visitor, $item, array $type)
    {
        if (null === $item || (is_array($item) && empty($item))) {
            return null;
        }

        if (!(is_array($type) && isset($type['params']) && is_array($type['params']) && isset($type['params']['0']))) {
            return null;
        }

        $entity = null;
        $entityClass = $type['params'][0]['name'];
        $entityManager = $this->getEntityManager($entityClass);

        if (isset($item["id"])){
            $entity = $entityManager->getRepository($entityClass)->findOneBy(array(
                "id" => $item["id"]
            ));
        }

        if (null === $entity){
            $namingStrategy = new IdenticalPropertyNamingStrategy();
            $serializer = SerializerBuilder::create()->setPropertyNamingStrategy($namingStrategy)->build();
            $entity = $serializer->deserialize(json_encode($item), $entityClass, 'json');
        }

        return $entity;
    }

    /**
     * @param GenericDeserializationVisitor $visitor
     * @param null|object $item
     * @param array $type
     * @return null|object
     */
    public function deserializeToSingleEntity(GenericDeserializationVisitor $visitor, $item, array $type)
    {
        if (null === $item || !is_array($item) || empty($item) ) {
            return null;
        }

        return $this->deserializeEntity($visitor, $item[0], $type);
    }

    private function deserialize($item, $entityClass) {
        $serializer = $this->container->get('jms_serializer');
        return $serializer->deserialize(json_encode($item), $entityClass, 'json');
    }

    /**
     * @param array $parameters
     * @return string
     */
    protected function getEntityClassFromParameters(array $parameters)
    {
        if (!(isset($parameters[0]) && is_array($parameters[0]) && isset($parameters[0]['name']))) {
            throw new InvalidArgumentException('Entity class is not defined');
        }

        if (!class_exists($parameters[0]['name'])) {
            throw new InvalidArgumentException(sprintf("Entity class '%s' is not found", $parameters[0]['name']));
        }

        return $parameters[0]['name'];
    }

    /**
     * @param string $entityClass
     * @return EntityManagerInterface
     */
    protected function getEntityManager($entityClass)
    {
        $entityManager = $this->registry->getManagerForClass($entityClass);
        if (!$entityManager) {
            throw new InvalidArgumentException(
                sprintf("Entity class '%s' is not managed by Doctrine", $entityClass)
            );
        }

        return $entityManager;
    }

    /**
     * @param VisitorInterface $visitor
     * @param $entity
     * @param array $type
     * @param Context $context
     * @return mixed
     */
    public function serializeJsObject(VisitorInterface $visitor, $entity, array $type, Context $context)
    {
        return json_decode($entity);
    }

    /**
     * @param GenericDeserializationVisitor $visitor
     * @param null|object $item
     * @param array $type
     * @return null|object
     */
    public function deserializeJsObject(GenericDeserializationVisitor $visitor, $item, array $type)
    {
        return json_encode($item);
    }

}
