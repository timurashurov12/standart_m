<?php

namespace App\Console\Commands;

use DOMDocument;
use DOMXPath;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class Parser extends Command
{
    protected array $visited = [];

    protected $signature = 'app:parser';
    protected $description = 'Парсинг сайта rostest.ru с глубиной и очисткой HTML';

    // Максимально допустимая глубина вложенности
    protected int $maxDepth = 3;

    public function handle()
    {
        $this->crawl('https://www.rostest.ru', 0);
        $this->info("Парсинг завершён, данные сохранены.");
    }

    private function crawl(string $url, int $depth): void
    {
        $this->parseRecursive($url, $depth);
    }

    private function parseRecursive(string $url, int $depth): void
    {
        if ($depth > $this->maxDepth)
            return;
        if (isset($this->visited[$url]))
            return;

        echo "Глубина $depth: $url\n";
        $this->visited[$url] = true;

        $html = $this->getHtml($url);
        if (!$html)
            return;

        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        $dom->loadHTML($html);
        $xpath = new DOMXPath($dom);

        $title = $xpath->query('//title')?->item(0)?->textContent ?? '';

        $bodyNode = $xpath->query('//body')?->item(0);
        $bodyHtml = $bodyNode ? $dom->saveHTML($bodyNode) : '';
        $cleanText = strip_tags($bodyHtml);
        $text = trim(preg_replace('/\s+/', ' ', $cleanText));

        $data = [
            'url' => $url,
            'title' => $title,
            'text' => $text,
        ];

        $fileName = md5($url) . '.json';
        Storage::put("rostest/pages/{$fileName}", json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

        foreach ($xpath->query('//a') as $a) {
            $href = $a->getAttribute('href');
            if (!$href || str_starts_with($href, 'mailto:') || str_starts_with($href, 'tel:'))
                continue;

            $absolute = $this->normalizeUrl($href, $url);

            if (str_starts_with($absolute, 'https://www.rostest.ru')) {
                $this->parseRecursive($absolute, $depth + 1);
            }
        }

        libxml_clear_errors();
    }

    private function getHtml(string $url): ?string
    {
        $ch = curl_init($url);

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            CURLOPT_TIMEOUT => 10,
        ]);

        $html = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);

        curl_close($ch);

        if ($html === false || $httpCode >= 400) {
            \Log::error("Ошибка загрузки: $url | $httpCode | $error");
            return null;
        }

        return $html;
    }

    private function normalizeUrl(string $relativeOrAbsolute, string $base): string
    {
        if (str_starts_with($relativeOrAbsolute, 'http')) {
            return $relativeOrAbsolute;
        }

        return rtrim(dirname($base), '/') . '/' . ltrim($relativeOrAbsolute, '/');
    }
}
