<?php

return [
    'home' => [
        'url' => '/',
        'page' => 'home',
        'prefix' => 'home',
    ],
    'about' => [
        'prefix' => 'about',
        'url' => '/about',
    ],
    'metrologiya' => [
        'prefix' => 'metrologiya',
        'routes' => [
            'index' => [
                'url' => '/',
            ],
            'poverka' => [
                'url' => '/poverka',
            ],
            'kalibrovka' => [
                'url' => '/kalibrovka',
            ],
            'tests_si' => [
                'url' => '/tests-si',
            ],
            'metrologicheskaya_ekspertiza' => [
                'url' => '/metrologicheskaya_ekspertiza',
            ],
            'attestatiya' => [
                'url' => '/attestatiya',
            ],
        ],
    ],
    'test' => [
        'prefix' => 'test',
        'routes' => [
            'index' => [
                'url' => '/',
            ],
            'testing_app' => [
                'url' => '/testing_app',
            ],
            'food_prod' => [
                'url' => '/food_prod',
            ],
            'cosmetic' => [
                'url' => '/cosmetic',
            ],
            'gmo' => [
                'url' => '/gmo',
            ],
            'ems' => [
                'url' => '/ems',
            ],
        ],
    ],
    'sertifikatiya' => [
        'prefix' => 'sertifikatiya',
        'routes' => [
            'index' => [
                'url' => '/',
            ],
            'sertifikatiya-elektroenergii' => [
                'url' => '/sertifikatiya-elektroenergii',
            ],
            'menedzhment' => [
                'url' => '/menedzhment',
            ],
        ],
    ],
    'consumer_corner' => [
        'prefix' => 'consumer_corner',
        'routes' => [
            'index' => [
                'url' => '/',
            ],
        ],
    ],
];
