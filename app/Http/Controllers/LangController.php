<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LangController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $availableLocales = config('app.supported_locales', ['ru', 'uz']);

        $validated = $request->validate([
            'language' => ['required', 'string', Rule::in($availableLocales)],
        ]);

        session(['locale' => $validated['language']]);
        app()->setLocale($validated['language']);

        $params = array_merge($validated['params'] ?? [], ['locale' => $validated['language']]);

        if (!\Route::has($request->page)) {
            abort(404);
        }

        return redirect(route($request->page, $params));
    }
}
