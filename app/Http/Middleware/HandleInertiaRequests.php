<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $urls = config('menu');

        $pageName = Route::currentRouteName();

        foreach ($urls as $key => $item) {
            if ($item['prefix'] !== 'home') {
                $urls[$key]['name'] = __("frontend.menu.{$item['prefix']}");
            }
        }

        $languages = [
            'ru' => [
                'prefix' => 'ru',
                'name' => 'Русский',
            ],
            'uz' => [
                'prefix' => 'uz',
                'name' => 'O\'zbekcha',
            ],
        ];

        $data = [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'languages' => array_values($languages),
            'current_language' => $languages[app()->getLocale()],
            'translate' => __('frontend'),
            'pageName' => $pageName,
            'pageContent' => getMarkdownContent($pageName) ?? '',
            'menu' => array_values($urls),
        ];

        return $data;
    }
}
