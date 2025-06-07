import { cn } from '@/lib/utils';
import { HeaderProps } from '@/types/header.types';
import { MenuProps, PageProps } from '@/types/lang.types';
import { Link, usePage } from '@inertiajs/react';
import { FaTimes } from 'react-icons/fa';
import AppLogo from '../Logo/app-logo';

export const MobileMenu = ({ menuOpen, setMenuOpen }: HeaderProps) => {
    const { current_language, menu } = usePage<PageProps>().props;

    return (
        <div
            id="mobile-menu"
            className={cn(
                'fixed inset-0 z-50 flex flex-col items-center justify-center gap-10 bg-white transition-transform duration-300 md:hidden dark:bg-gray-800',
                menuOpen ? 'translate-x-0' : '-translate-x-full',
            )}
        >
            <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 focus:outline-none" aria-label="Закрыть меню">
                <FaTimes size={30} />
            </button>
            <AppLogo className="col-span-2" />
            {menu?.map((item: MenuProps) => (
                <Link href={`/${current_language?.prefix}/${item?.prefix}`} key={item?.name} className="text-2xl" onClick={() => setMenuOpen(false)}>
                    {item?.name}
                </Link>
            ))}
        </div>
    );
};
