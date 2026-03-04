'use client';
import css from './header.module.scss';
import {Select} from 'antd';
import {usePathname, useRouter} from 'next/navigation';
import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

const HeaderComponent = () => {
    const {t} = useTranslation();
    const router = useRouter();
    const pathname = usePathname();

    const locale = useMemo(() => {
        return pathname.split('/')[1];
    }, [pathname]);

    const onLanguageChange = useCallback((value: string) => {
        const path = pathname.split('/');
        path[1] = value;
        router.replace(path.join('/'));

        // router.replace();
    }, [pathname, router]);


    return (
        <header className={css.header}>
            {t('rights')}
            <div className='container'>
                <Select onChange={onLanguageChange} defaultValue={locale} options={[
                    {label: 'Az', value: 'az'},
                    {label: 'En', value: 'en'},
                    {label: 'Ru', value: 'ru'},
                ]}/>
            </div>
        </header>
    );
};


export default HeaderComponent;
