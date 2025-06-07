import { cn } from '@/lib/utils';

interface Props {
    title: string;
    subtitle?: string;
    banner?: string;
    className?: string;
}

export const Hero = ({ title, subtitle, banner = '', className = '' }: Props) => {
    return (
        <section
            className={cn('flex h-screen flex-col items-center justify-center gap-5 text-center text-white', className)}
            style={
                banner
                    ? { background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${banner}) no-repeat center center / cover` }
                    : undefined
            }
        >
            <h1 className="container max-w-[1000px] text-3xl font-bold md:text-[48px]">{title}</h1>
            {subtitle && <h2 className="container max-w-[800px] text-base md:text-lg">{subtitle}</h2>}
        </section>
    );
};
