<?php

namespace ContainerT1KeSTB;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_B1hmT0kService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.b1hmT0k' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.b1hmT0k'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService, [
            'collectionMapper' => ['privates', 'App\\Mapper\\CollectionMapper', 'getCollectionMapperService', true],
            'em' => ['services', 'doctrine.orm.default_entity_manager', 'getDoctrine_Orm_DefaultEntityManagerService', false],
            'userMapper' => ['privates', 'App\\Mapper\\UserMapper', 'getUserMapperService', true],
        ], [
            'collectionMapper' => 'App\\Mapper\\CollectionMapper',
            'em' => '?',
            'userMapper' => 'App\\Mapper\\UserMapper',
        ]);
    }
}