<?php

namespace ContainerYjerYsz;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getSluggableEventSubscriberService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'Knp\DoctrineBehaviors\EventSubscriber\SluggableEventSubscriber' shared autowired service.
     *
     * @return \Knp\DoctrineBehaviors\EventSubscriber\SluggableEventSubscriber
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/doctrine/event-manager/src/EventSubscriber.php';
        include_once \dirname(__DIR__, 4).'/vendor/doctrine/doctrine-bundle/src/EventSubscriber/EventSubscriberInterface.php';
        include_once \dirname(__DIR__, 4).'/vendor/knplabs/doctrine-behaviors/src/EventSubscriber/SluggableEventSubscriber.php';

        $a = ($container->services['doctrine.orm.default_entity_manager'] ?? $container->getDoctrine_Orm_DefaultEntityManagerService());

        if (isset($container->services['Knp\\DoctrineBehaviors\\EventSubscriber\\SluggableEventSubscriber'])) {
            return $container->services['Knp\\DoctrineBehaviors\\EventSubscriber\\SluggableEventSubscriber'];
        }
        $b = ($container->services['Knp\\DoctrineBehaviors\\Repository\\DefaultSluggableRepository'] ?? $container->load('getDefaultSluggableRepositoryService'));

        if (isset($container->services['Knp\\DoctrineBehaviors\\EventSubscriber\\SluggableEventSubscriber'])) {
            return $container->services['Knp\\DoctrineBehaviors\\EventSubscriber\\SluggableEventSubscriber'];
        }

        return $container->services['Knp\\DoctrineBehaviors\\EventSubscriber\\SluggableEventSubscriber'] = new \Knp\DoctrineBehaviors\EventSubscriber\SluggableEventSubscriber($a, $b);
    }
}