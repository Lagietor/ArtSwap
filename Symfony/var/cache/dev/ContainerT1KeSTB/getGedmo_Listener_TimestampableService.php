<?php

namespace ContainerT1KeSTB;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getGedmo_Listener_TimestampableService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private 'gedmo.listener.timestampable' shared autowired service.
     *
     * @return \Gedmo\Timestampable\TimestampableListener
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/doctrine/event-manager/src/EventSubscriber.php';
        include_once \dirname(__DIR__, 4).'/vendor/gedmo/doctrine-extensions/src/Mapping/MappedEventSubscriber.php';
        include_once \dirname(__DIR__, 4).'/vendor/gedmo/doctrine-extensions/src/AbstractTrackingListener.php';
        include_once \dirname(__DIR__, 4).'/vendor/gedmo/doctrine-extensions/src/Timestampable/TimestampableListener.php';

        return $container->privates['gedmo.listener.timestampable'] = new \Gedmo\Timestampable\TimestampableListener();
    }
}