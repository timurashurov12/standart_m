import { Hero } from '@/components/UI/Hero/Hero';
import { useTranslate } from '@/hooks/useTranslate';
import { Layout } from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

import { LangPageProps } from '@/types/lang.types';
import Banner from '../../../public/assets/images/home/hero.jpg';
import MetrologyImg from '../../../public/assets/images/home/metrology.jpg';
import SertificationImg from '../../../public/assets/images/home/sertification.jpeg';
import TestingImg from '../../../public/assets/images/home/testing.jpg';

const Home = () => {
    const { t } = useTranslate();
    const { current_language } = usePage<LangPageProps>().props;
    return (
        <>
            <Head title={t('home.title')}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <Hero title={t('home.title')} subtitle={t('home.subtitle')} banner={Banner} className="h-[70vh]" />
            <section className="container my-10 flex flex-col gap-10">
                <h2 className="text-center text-4xl font-semibold">{t('home.services.title')}</h2>
                <div className="grid- grid grid-cols-1 gap-5">
                    {/* Metrology */}
                    <section className="w-full">
                        <div className="flex h-full w-full flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl bg-slate-300 shadow md:flex-row">
                            <div className="w-full p-5 text-left md:flex-7/12">
                                <Link
                                    href={`${current_language?.prefix}/metrologiya`}
                                    className="text-center text-2xl font-bold text-slate-800 hover:text-slate-950"
                                >
                                    {t('home.services.metrologiya.title')}
                                </Link>
                                <div className="my-5 flex flex-col gap-3">
                                    {t('home.services.metrologiya.links')?.map((item: { link: string; name: string }, index: number) => (
                                        <Link
                                            href={`${current_language?.prefix}/metrologiya/${item.link}`}
                                            key={index}
                                            className="text-base text-slate-800 hover:text-slate-950"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="h-full w-full md:flex-5/12">
                                <img src={MetrologyImg} alt={t('home.services.metrologiya.title')} className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </section>
                    {/* Testing */}
                    <section className="w-full">
                        <div className="flex h-full w-full flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl bg-gray-200 shadow md:flex-row-reverse">
                            <div className="w-full p-5 text-right md:flex-7/12">
                                <Link href={`${current_language?.prefix}/test`} className="text-2xl font-bold text-gray-800 hover:text-gray-950">
                                    {t('home.services.test.title')}
                                </Link>
                                <div className="my-5 flex flex-col gap-3">
                                    {t('home.services.test.links')?.map((item: { link: string; name: string }, index: number) => (
                                        <Link
                                            href={`${current_language?.prefix}/test/${item.link}`}
                                            key={index}
                                            className="text-base text-gray-800 hover:text-gray-950"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="md:flex-5/12">
                                <img src={TestingImg} alt={t('home.services.metrologic.title')} className="h-full w-full object-cover md:order-1" />
                            </div>
                        </div>
                    </section>
                    {/* Sertifikatiya */}
                    <section className="w-full">
                        <div className="flex h-full w-full flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl bg-stone-300 shadow md:flex-row">
                            <div className="w-full p-5 text-left md:flex-7/12">
                                <Link
                                    href={`${current_language?.prefix}/sertifikatiya`}
                                    className="text-center text-2xl font-bold text-stone-800 hover:text-stone-950"
                                >
                                    {t('home.services.sertifikatiya.title')}
                                </Link>
                                <div className="my-5 flex flex-col gap-3">
                                    {t('home.services.sertifikatiya.links')?.map((item: { link: string; name: string }, index: number) => (
                                        <Link
                                            href={`${current_language?.prefix}/sertifikatiya/${item.link}`}
                                            key={index}
                                            className="text-base text-stone-800 hover:text-stone-950"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="md:flex-5/12">
                                <img src={SertificationImg} alt={t('home.services.sertifikatiya.title')} className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
};

Home.layout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Home;
