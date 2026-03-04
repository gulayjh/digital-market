import styles from './page.module.scss';
import useServerTranslation from '@/i18n/i18n';
import {ILang} from '@/i18n/locale';

const Test = async ({params: {locale}}: { params: { locale: ILang } }) => {
    const {t} = await useServerTranslation(locale);
    return (
            <main className={styles.main}>
                TEST
                <p>
                    {t('rights')}
                </p>
            </main>
    );
};

export default Test;
