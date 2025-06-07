import { JSX } from 'react';
import { FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa';

type SocialMediaItems = {
    link: string;
    icon: JSX.Element;
};

const SocialMediaItems: SocialMediaItems[] = [
    {
        link: '/',
        icon: <FaTelegram size={30} />,
    },
    {
        link: '/',
        icon: <FaInstagram size={30} />,
    },
    {
        link: '/',
        icon: <FaFacebook size={30} />,
    },
];

export const SocialMedia = () => {
    return (
        <div className="flex flex-row items-center justify-between gap-5">
            {SocialMediaItems.map((item, index) => (
                <a href={item.link} key={index}>
                    {item.icon}
                </a>
            ))}
        </div>
    );
};
