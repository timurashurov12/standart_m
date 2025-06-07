// hooks/useTranslations.ts
import { usePage } from '@inertiajs/react';

type Translations = Record<string, any>; // поддержка строк, массивов, объектов и т.д.

export function useTranslate() {
    const { props } = usePage<{ translate: Translations }>();

    const parsePath = (path: string): (string | number)[] => {
        return path
            .replace(/\[(\d+)\]/g, '.$1') // Преобразуем: items[0] → items.0
            .split('.') // ['about', 'sections', '0', 'items']
            .map((segment) => (isNaN(Number(segment)) ? segment : Number(segment)));
    };

    const getValueByPath = (obj: any, path: (string | number)[]): any => {
        return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
    };

    const t = (group: string, key?: string): any => {
        let fullPath: (string | number)[];

        if (typeof key === 'undefined') {
            fullPath = parsePath(group);
        } else {
            fullPath = [group, ...parsePath(key)];
        }

        const value = getValueByPath(props.translate, fullPath);

        return value ?? fullPath.join('.');
    };

    const hasTranslate = (group: string, key?: string): boolean => {
        const fullPath = typeof key === 'undefined' ? parsePath(group) : [group, ...parsePath(key)];

        return getValueByPath(props.translate, fullPath) !== undefined;
    };

    const typeOfTranslate = (group: string, key?: string): string => {
        const fullPath = typeof key === 'undefined' ? parsePath(group) : [group, ...parsePath(key)];

        const value = getValueByPath(props.translate, fullPath);

        if (Array.isArray(value)) return 'array';
        if (value === null) return 'null';
        return typeof value;
    };

    return { t, hasTranslate, typeOfTranslate };
}
