import { cn } from '@/lib/utils';
import { LangPageProps } from '@/types/lang.types';
import { Link, usePage } from '@inertiajs/react';
import { ComponentProps } from 'react';
import LogoBlack from '../../../../../public/logoBlack.svg';
import LogoWhite from '../../../../../public/logoWhite.svg';

type AppLogoProps = {
    className?: ComponentProps<'img'>['className'];
    type?: 'white' | 'black';
};

export default function AppLogo({ className = '', type = 'black' }: AppLogoProps) {
    const { current_language } = usePage<LangPageProps>().props;
    return (
        <Link href={`/${current_language?.prefix}`}>
            <img className={cn('max-h-[70px]', className)} src={type === 'white' ? LogoWhite : LogoBlack} alt="Standart M" />
        </Link>
    );
}
