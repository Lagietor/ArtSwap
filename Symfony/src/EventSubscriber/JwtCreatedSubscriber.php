<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User;

class JwtCreatedSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            'lexik_jwt_authentication.on_jwt_created' => 'onJWTCreated',
        ];
    }

    public function onJwtCreated(JWTCreatedEvent $event)
    {
        /**
         * @var User user
         */
        $user = $event->getUser();
        if (!$user instanceof UserInterface) {
            return;
        }

        $payload = $event->getData();
        $payload['id'] = $user->getId();
        $payload['email'] = $user->getEmail();
        $payload['roles'] = $user->getRoles();
        $payload['image'] = $user->getImage();

        $event->setData($payload);
    }
}