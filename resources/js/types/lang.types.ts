export interface MenuProps {
    name: string;
    url: string;
    prefix: string;
    routes: {
        [key: string]: any;
    };
}

export interface Language {
    name: string;
    prefix: 'ru' | 'uz';
}

export interface PageProps {
    languages: Language[];
    current_language: Language;
    menu: MenuProps[];
    [key: string]: any;
}
