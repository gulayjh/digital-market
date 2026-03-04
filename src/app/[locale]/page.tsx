import styles from './page.module.scss';
import useServerTranslation from '@/i18n/i18n';
import {ILang} from '@/i18n/locale';

const Home = async ({params: {locale}}: {params: {locale: ILang}}) => {
    // const translate = useLocalization();
    // const translate = await useDictionary('az');
    const {t} = await useServerTranslation(locale);
  return (
    <main className={styles.main}>
        <p>
            {t('rights')}
        </p>
      {/*<a href='/src/assets/fonts/Nunito/NunitoSans-Black.ttf'>{translate.rights}</a>*/}
    </main>
  );
};

export default Home;
