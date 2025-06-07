import { HeaderProps } from '@/types/header.types';
import { FaBars } from 'react-icons/fa';
import { Contacts } from '../Contacts/Contacts';
import LangToggle from '../LangToggle/LangToggle';
import AppLogo from '../Logo/app-logo';
import { Menu } from '../Menu/Menu';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export const Header = ({ menuOpen, setMenuOpen }: HeaderProps) => {
    return (
        <>
            <header className="dark:bg-gray-80 sticky top-0 bg-white p-4 shadow">
                <section className="mx-auto flex max-w-7xl flex-row items-center justify-between gap-5">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="focus:outline-none lg:hidden"
                        aria-label="Открыть меню"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        <FaBars size={30} />
                    </button>
                    <AppLogo className="col-span-2" />
                    <Menu />
                    <Contacts />
                    <LangToggle />
                </section>
            </header>
            <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </>
    );
};
