<?php

namespace App\EventSubscriber;

use App\Entity\NFTItem;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class VolumeUpdateSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function onKernelController(ControllerEvent $event): void
    {
        $request = $event->getRequest();
        $controller = $event->getController();

        if (!is_array($controller) || $controller[1] !== 'buy') {
            return;
        }

        $content = json_decode($request->getContent(), true);
        $itemId = $content['nftId'] ?? null;

        if (!$itemId) {
            return;
        }

        $item = $this->em->getRepository(NFTItem::class)->find($itemId);
        $collection = $item->getCollection();
        $orders = $collection->getOrders();

        $totalVolume = 0;
        foreach ($orders as $order) {
            $totalVolume += $order->getSalePrice();
        }

        $collection->setVolume((double) $totalVolume);
        $this->em->persist($collection);
        $this->em->flush();
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}