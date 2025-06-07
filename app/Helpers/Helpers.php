<?php

/**
 * Проверяет, существует ли указанный ключ в многомерном массиве.
 *
 * @param array  $array Массив, в котором нужно искать.
 * @param string $key   Искомый ключ.
 * @return bool
 */
function keyExistsRecursive(array $array, string $key): bool
{
    foreach ($array as $k => $v) {
        if ($k === $key) {
            return true;
        }

        if (is_array($v) && keyExistsRecursive($v, $key)) {
            return true;
        }
    }

    return false;
}

function getMarkdownContent(string $file): string
{
    if ($file === 'language.store') {
        return '';
    }

    $locale = app()->getLocale();

    if (str_contains($file, '.')) {
        $file = str_replace('.', '/', $file);
    }

    $path = resource_path("content/{$locale}/{$file}.html");

    // Проверка существования файла
    if (!File::exists($path)) {
        abort(404, 'Страница не найдена');
    }

    // Получаем содержимое файла
    return File::get($path);
}
