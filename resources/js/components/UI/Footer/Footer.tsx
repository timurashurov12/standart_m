import AppLogo from '../Logo/app-logo';
import { SocialMedia } from '../SocialMedia/SocialMedia';

export const Footer = () => {
    return (
        <footer className="">
            <section className="bg-slate-900 p-4 text-gray-300 shadow lg:p-8 dark:bg-gray-800">
                <div className="container grid grid-cols-1 gap-5 lg:grid-cols-4">
                    <AppLogo type="white" />
                    <div className="flex flex-col gap-5 md:col-span-2">
                        <div className="text-sm">
                            "Центр стандартизации, метрологии и сертификации в Узбекистане" Узбекистан, Ташкент, 200100, Какой то адрес, Какой то дом
                        </div>
                        <hr />
                        <div className="text-sm text-slate-500">
                            Все права защищены. Перепечатка материалов с сайта www.standart-m.uz разрешается с письменного согласия администрации
                            сайта.
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <SocialMedia />
                        <hr />
                        <div className="text-center text-sm">© standart-m.uz | 2020-{new Date().getFullYear()}</div>
                    </div>
                </div>
            </section>
        </footer>
    );
};
