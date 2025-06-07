<?php

use App\Http\Controllers\LangController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$urls = config('menu');

Route::get('/', fn() => redirect(app()->getLocale()));
Route::post('/language', LangController::class)->name('language.store');

Route::prefix('{locale}')->group(function () use ($urls) {
    foreach ($urls as $key => $item) {
        if (isset($item['prefix']) && isset($item['routes'])) {
            Route::prefix(
                $item['prefix']
            )->group(
                    function () use ($item, $key) {
                        foreach ($item['routes'] as $name => $route) {
                            Route::get(
                                $route['url'],
                                fn() => Inertia::render($route['page'] ?? 'index')
                            )
                                ->name("{$key}" . ($name !== 'index' ? ".{$name}" : ''));
                        }
                    }
                );
        } else {
            Route::get(
                $item['url'],
                fn() => Inertia::render($item['page'] ?? 'index')
            )
                ->name($key);
        }
    }
});
