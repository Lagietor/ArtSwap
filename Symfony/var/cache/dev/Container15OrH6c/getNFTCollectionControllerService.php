<?php

namespace Container15OrH6c;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getNFTCollectionControllerService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'App\Controller\NFTCollectionController' shared autowired service.
     *
     * @return \App\Controller\NFTCollectionController
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/symfony/framework-bundle/Controller/AbstractController.php';
        include_once \dirname(__DIR__, 4).'/src/Controller/NFTCollectionController.php';

        $container->services['App\\Controller\\NFTCollectionController'] = $instance = new \App\Controller\NFTCollectionController();

        $instance->setContainer(($container->privates['.service_locator.l1ae.Qz'] ?? $container->load('get_ServiceLocator_L1ae_QzService'))->withContext('App\\Controller\\NFTCollectionController', $container));

        return $instance;
    }
}