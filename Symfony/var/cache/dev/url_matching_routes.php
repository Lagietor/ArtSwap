<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/_profiler' => [[['_route' => '_profiler_home', '_controller' => 'web_profiler.controller.profiler::homeAction'], null, null, null, true, false, null]],
        '/_profiler/search' => [[['_route' => '_profiler_search', '_controller' => 'web_profiler.controller.profiler::searchAction'], null, null, null, false, false, null]],
        '/_profiler/search_bar' => [[['_route' => '_profiler_search_bar', '_controller' => 'web_profiler.controller.profiler::searchBarAction'], null, null, null, false, false, null]],
        '/_profiler/phpinfo' => [[['_route' => '_profiler_phpinfo', '_controller' => 'web_profiler.controller.profiler::phpinfoAction'], null, null, null, false, false, null]],
        '/_profiler/open' => [[['_route' => '_profiler_open_file', '_controller' => 'web_profiler.controller.profiler::openAction'], null, null, null, false, false, null]],
        '/api/register' => [[['_route' => 'api_api_register', '_controller' => 'App\\Controller\\AuthenticationController::register'], null, ['POST' => 0], null, false, false, null]],
        '/api/login' => [[['_route' => 'api_api_login', '_controller' => 'App\\Controller\\AuthenticationController::login'], null, ['POST' => 0], null, false, false, null]],
        '/api/google-login' => [[['_route' => 'api_api_google_login', '_controller' => 'App\\Controller\\AuthenticationController::googleLogin'], null, ['POST' => 0], null, false, false, null]],
        '/api/github-login' => [[['_route' => 'api_api_github_login', '_controller' => 'App\\Controller\\AuthenticationController::githubLogin'], null, ['POST' => 0], null, false, false, null]],
        '/api/collection' => [
            [['_route' => 'api_api_collection_create', '_controller' => 'App\\Controller\\NFTCollectionController::create'], null, ['POST' => 0], null, false, false, null],
            [['_route' => 'api_api_collection', '_controller' => 'App\\Controller\\NFTCollectionController::getCollections'], null, ['GET' => 0], null, false, false, null],
        ],
        '/api/item' => [[['_route' => 'api_app_item', '_controller' => 'App\\Controller\\NFTItemController::create'], null, ['POST' => 0], null, false, false, null]],
        '/api/user/edit' => [[['_route' => 'api_api_user_edit', '_controller' => 'App\\Controller\\UserController::edit'], null, ['POST' => 0], null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/api(?'
                    .'|/\\.well\\-known/genid/([^/]++)(*:43)'
                    .'|(?:/(index)(?:\\.([^/]++))?)?(*:78)'
                    .'|/(?'
                        .'|docs(?:\\.([^/]++))?(*:108)'
                        .'|co(?'
                            .'|ntexts/([^.]+)(?:\\.(jsonld))?(*:150)'
                            .'|llection/([^/]++)(?'
                                .'|/items(*:184)'
                                .'|(*:192)'
                            .')'
                        .')'
                        .'|item/([^/]++)(*:215)'
                        .'|user/([^/]++)/items(*:242)'
                    .')'
                .')'
                .'|/_(?'
                    .'|error/(\\d+)(?:\\.([^/]++))?(*:283)'
                    .'|wdt/([^/]++)(*:303)'
                    .'|profiler/([^/]++)(?'
                        .'|/(?'
                            .'|search/results(*:349)'
                            .'|router(*:363)'
                            .'|exception(?'
                                .'|(*:383)'
                                .'|\\.css(*:396)'
                            .')'
                        .')'
                        .'|(*:406)'
                    .')'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        43 => [[['_route' => 'api_genid', '_controller' => 'api_platform.action.not_exposed', '_api_respond' => 'true'], ['id'], null, null, false, true, null]],
        78 => [[['_route' => 'api_entrypoint', '_controller' => 'api_platform.action.entrypoint', '_format' => '', '_api_respond' => 'true', 'index' => 'index'], ['index', '_format'], null, null, false, true, null]],
        108 => [[['_route' => 'api_doc', '_controller' => 'api_platform.action.documentation', '_format' => '', '_api_respond' => 'true'], ['_format'], null, null, false, true, null]],
        150 => [[['_route' => 'api_jsonld_context', '_controller' => 'api_platform.jsonld.action.context', '_format' => 'jsonld', '_api_respond' => 'true'], ['shortName', '_format'], null, null, false, true, null]],
        184 => [[['_route' => 'api_api_collection_items', '_controller' => 'App\\Controller\\NFTCollectionController::getItems'], ['id'], ['GET' => 0], null, false, false, null]],
        192 => [[['_route' => 'api_api_collection_get', '_controller' => 'App\\Controller\\NFTCollectionController::get'], ['id'], ['GET' => 0], null, false, true, null]],
        215 => [[['_route' => 'api_api_item_get', '_controller' => 'App\\Controller\\NFTItemController::get'], ['id'], ['GET' => 0], null, false, true, null]],
        242 => [[['_route' => 'api_api_user_items', '_controller' => 'App\\Controller\\UserController::getItems'], ['id'], ['GET' => 0], null, false, false, null]],
        283 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        303 => [[['_route' => '_wdt', '_controller' => 'web_profiler.controller.profiler::toolbarAction'], ['token'], null, null, false, true, null]],
        349 => [[['_route' => '_profiler_search_results', '_controller' => 'web_profiler.controller.profiler::searchResultsAction'], ['token'], null, null, false, false, null]],
        363 => [[['_route' => '_profiler_router', '_controller' => 'web_profiler.controller.router::panelAction'], ['token'], null, null, false, false, null]],
        383 => [[['_route' => '_profiler_exception', '_controller' => 'web_profiler.controller.exception_panel::body'], ['token'], null, null, false, false, null]],
        396 => [[['_route' => '_profiler_exception_css', '_controller' => 'web_profiler.controller.exception_panel::stylesheet'], ['token'], null, null, false, false, null]],
        406 => [
            [['_route' => '_profiler', '_controller' => 'web_profiler.controller.profiler::panelAction'], ['token'], null, null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
