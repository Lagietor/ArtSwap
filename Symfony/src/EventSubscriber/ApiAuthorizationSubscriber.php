<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use App\Service\ApiAuthorizationService;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ApiAuthorizationSubscriber implements EventSubscriberInterface
{
    private ApiAuthorizationService $authService;

    public function __construct(ApiAuthorizationService $authService)
    {
        $this->authService = $authService;
    }

    public function onKernelRequest(RequestEvent $event)
    {
        
        // $request = $event->getRequest();
        
        // if (strpos($request->getPathInfo(), '/api/') === 0) {
        //     if (!$this->authService->validateApiKey($request)) {
        //         throw new AccessDeniedHttpException('Unauthorized');
        //     }
        // }
    }

    public static function getSubscribedEvents()
    {
        return [
            'kernel.request' => 'onKernelRequest',
        ];
    }
}