<?php

namespace ContainerSEvo8R2;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_5O8hVQService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.5O8hV_Q' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.5O8hV_Q'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService, [
            'App\\Controller\\AuthenticationController::githubLogin' => ['privates', '.service_locator.Lg7M_Sj', 'get_ServiceLocator_Lg7MSjService', true],
            'App\\Controller\\AuthenticationController::googleLogin' => ['privates', '.service_locator.Lg7M_Sj', 'get_ServiceLocator_Lg7MSjService', true],
            'App\\Controller\\AuthenticationController::login' => ['privates', '.service_locator.Lg7M_Sj', 'get_ServiceLocator_Lg7MSjService', true],
            'App\\Controller\\AuthenticationController::register' => ['privates', '.service_locator.MkrZLUL', 'get_ServiceLocator_MkrZLULService', true],
            'App\\Controller\\NFTCollectionController::create' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTCollectionController::get' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTCollectionController::getCollections' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTCollectionController::getItems' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTItemController::create' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTItemController::get' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Kernel::loadRoutes' => ['privates', '.service_locator.KfbR3DY', 'get_ServiceLocator_KfbR3DYService', true],
            'App\\Kernel::registerContainerConfiguration' => ['privates', '.service_locator.KfbR3DY', 'get_ServiceLocator_KfbR3DYService', true],
            'kernel::loadRoutes' => ['privates', '.service_locator.KfbR3DY', 'get_ServiceLocator_KfbR3DYService', true],
            'kernel::registerContainerConfiguration' => ['privates', '.service_locator.KfbR3DY', 'get_ServiceLocator_KfbR3DYService', true],
            'App\\Controller\\AuthenticationController:githubLogin' => ['privates', '.service_locator.Lg7M_Sj', 'get_ServiceLocator_Lg7MSjService', true],
            'App\\Controller\\AuthenticationController:googleLogin' => ['privates', '.service_locator.Lg7M_Sj', 'get_ServiceLocator_Lg7MSjService', true],
            'App\\Controller\\AuthenticationController:login' => ['privates', '.service_locator.Lg7M_Sj', 'get_ServiceLocator_Lg7MSjService', true],
            'App\\Controller\\AuthenticationController:register' => ['privates', '.service_locator.MkrZLUL', 'get_ServiceLocator_MkrZLULService', true],
            'App\\Controller\\NFTCollectionController:create' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTCollectionController:get' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTCollectionController:getCollections' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTCollectionController:getItems' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTItemController:create' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'App\\Controller\\NFTItemController:get' => ['privates', '.service_locator.5miB8_X', 'get_ServiceLocator_5miB8XService', true],
            'kernel:loadRoutes' => ['privates', '.service_locator.KfbR3DY', 'get_ServiceLocator_KfbR3DYService', true],
            'kernel:registerContainerConfiguration' => ['privates', '.service_locator.KfbR3DY', 'get_ServiceLocator_KfbR3DYService', true],
        ], [
            'App\\Controller\\AuthenticationController::githubLogin' => '?',
            'App\\Controller\\AuthenticationController::googleLogin' => '?',
            'App\\Controller\\AuthenticationController::login' => '?',
            'App\\Controller\\AuthenticationController::register' => '?',
            'App\\Controller\\NFTCollectionController::create' => '?',
            'App\\Controller\\NFTCollectionController::get' => '?',
            'App\\Controller\\NFTCollectionController::getCollections' => '?',
            'App\\Controller\\NFTCollectionController::getItems' => '?',
            'App\\Controller\\NFTItemController::create' => '?',
            'App\\Controller\\NFTItemController::get' => '?',
            'App\\Kernel::loadRoutes' => '?',
            'App\\Kernel::registerContainerConfiguration' => '?',
            'kernel::loadRoutes' => '?',
            'kernel::registerContainerConfiguration' => '?',
            'App\\Controller\\AuthenticationController:githubLogin' => '?',
            'App\\Controller\\AuthenticationController:googleLogin' => '?',
            'App\\Controller\\AuthenticationController:login' => '?',
            'App\\Controller\\AuthenticationController:register' => '?',
            'App\\Controller\\NFTCollectionController:create' => '?',
            'App\\Controller\\NFTCollectionController:get' => '?',
            'App\\Controller\\NFTCollectionController:getCollections' => '?',
            'App\\Controller\\NFTCollectionController:getItems' => '?',
            'App\\Controller\\NFTItemController:create' => '?',
            'App\\Controller\\NFTItemController:get' => '?',
            'kernel:loadRoutes' => '?',
            'kernel:registerContainerConfiguration' => '?',
        ]);
    }
}