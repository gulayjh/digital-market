'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import useServerTranslation from '@/i18n/i18n';
import {ReactNode} from 'react';
import {ILang} from '@/i18n/locale';

const TranslationProvider = ({ children, locale }: {children: ReactNode, locale: ILang}) => {
    const i18nInstance = createInstance();

    useServerTranslation(locale, i18nInstance);

        return (
            <I18nextProvider i18n={i18nInstance}>
                {children}
            </I18nextProvider>
        );
};

export default TranslationProvider;
