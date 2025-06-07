import { Hero } from '@/components/UI/Hero/Hero';
import { useTranslate } from '@/hooks/useTranslate';
import { Layout } from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import Markdown from 'markdown-to-jsx';
import React, { ReactNode } from 'react';

const options = {
    overrides: {
        h1: {
            props: {
                className: 'text-4xl font-bold text-gray-900',
            },
        },
        h2: {
            props: {
                className: 'text-2xl font-semibold text-gray-800',
            },
        },
        h3: {
            props: {
                className: 'text-xl font-semibold text-gray-800',
            },
        },
        p: {
            props: {
                className: 'text-base text-gray-700 mb-4',
            },
        },
        ul: {
            props: {
                className: 'list-disc ml-6 mb-4',
            },
        },
        ol: {
            props: {
                className: 'list-decimal ml-6 mb-4',
            },
        },
        li: {
            props: {
                className: 'mb-2',
            },
        },
        strong: {
            props: {
                className: 'font-semibold text-gray-900',
            },
        },
        a: {
            props: {
                className: 'text-blue-600 hover:underline',
            },
        },
        table: {
            props: {
                className: 'bg-white w-full border-collapse border border-gray-300 min-w-full border-collapse',
            },
        },
        th: {
            props: {
                className: 'border border-gray-300 p-2',
            },
        },
        tr: {
            props: {
                className: 'border border-gray-300',
            },
        },
        td: {
            props: {
                className: 'border border-gray-300 p-2',
            },
        },
    },
    wrapper: React.Fragment,
};

const Index = () => {
    const { t } = useTranslate();
    const { pageName, pageContent } = usePage<{ pageName: string; pageContent: string }>().props;
    return (
        <>
            <Head title={t(`${pageName}.title`)}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <Hero className="h-[10vh] bg-white text-black md:h-[30vh]" title={t(`${pageName}.title`)} />

            <section className="container flex flex-col gap-5 p-5">
                <div className="flex flex-col gap-5">
                    <Markdown options={options} children={pageContent} />
                </div>
            </section>
        </>
    );
};

Index.layout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Index;
