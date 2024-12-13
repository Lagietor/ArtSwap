<?php

namespace App\EventSubscriber;

use App\Mapper\UserMapper;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTAuthenticationSuccessSubscriber implements EventSubscriberInterface
{
    private $userMapper;

    public function __construct(UserMapper $userMapper)
    {
        $this->userMapper = $userMapper;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            Events::AUTHENTICATION_SUCCESS => 'onAuthenticationSuccess',
        ];
    }

    public function onAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();
        $user = $event->getUser();

        if ($user instanceof UserInterface) {
            // Dodaj dodatkowe dane do odpowiedzi
            $userDTO = $this->userMapper->mapToUserDTO($user);

            $data['user'] = [
                'id' => $userDTO->getId(),
                'email' => $userDTO->getEmail(),
                'username' => $userDTO->getUsername(),
                'profileImage' => $userDTO->getProfileImage(),
                'backgroundImage' => $userDTO->getBackgroundImage(),
                'roles' => $userDTO->getRoles()
                // Dodaj inne dane, które są potrzebne
            ];
        }

        $event->setData($data);
    }
}