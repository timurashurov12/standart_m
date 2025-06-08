import { Footer } from '@/components/UI/Footer/Footer';
import { Header } from '@/components/UI/Header/Header';
import { cn } from '@/lib/utils';
import { useEffect, useState, type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: AppLayoutProps) => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [menuOpen]);

    return (
        <div className={cn(menuOpen ? 'overflow-y-hidden' : '', 'min-h-screen bg-gray-100 text-gray-900')}>
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <main>{children}</main>
            <Footer />
        </div>
    );
};
