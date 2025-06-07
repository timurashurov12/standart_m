import { usePage } from '@inertiajs/react';

import ru_flag from '../../../../../public/assets/images/flags/ru.svg';
import uz_flag from '../../../../../public/assets/images/flags/uz.svg';

import { PageProps } from '@/types/lang.types';
import Dropdown from '../Dropdown/Dropdown';

const flags: { [key: string]: string } = {
    ru: ru_flag,
    uz: uz_flag,
};

export default function LangToggle() {
    const { languages, current_language } = usePage<PageProps>()?.props;

    if (!languages || !current_language) return null;

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <img src={flags[current_language?.prefix]} alt={current_language?.name} className="h-6 w-6 rounded-full object-cover" />
                <span>{current_language?.name}</span>
            </Dropdown.Trigger>
            <Dropdown.Content>
                {languages?.map((language, key) => (
                    <Dropdown.Link
                        key={key}
                        className={
                            'flex w-full cursor-pointer items-center gap-x-3 px-4 py-2 text-left text-base transition-colors duration-200 hover:text-white'
                        }
                        href={route('language.store')}
                        method="post"
                        preserveScroll={true}
                        preserveState={true}
                        replace={true}
                        data={{ language: language.prefix, page: route().current(), params: route().params }}
                        as="button"
                    >
                        <img src={flags[language.prefix]} alt={language.name} className="h-6 w-6 rounded-full object-cover" />
                        <span className="text-white">{language.name}</span>
                    </Dropdown.Link>
                ))}
            </Dropdown.Content>
        </Dropdown>
    );
}
