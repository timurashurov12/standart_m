import { MenuProps, PageProps } from '@/types/lang.types';
import { Link, usePage } from '@inertiajs/react';

export const Menu = () => {
    const { current_language, menu } = usePage<PageProps>().props;

    return (
        <div className={'hidden flex-row gap-5 lg:flex'}>
            {menu?.map((item: MenuProps) => (
                <Link href={`/${current_language?.prefix}/${item?.prefix}`} key={item?.name}>
                    {item?.name}
                </Link>
            ))}
        </div>
    );
};
