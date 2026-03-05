'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LandingNavComponent from '@/core/layouts/public/components/landing-nav/landing-nav.component';
import SearchResultsComponent from '@/core/layouts/public/components/search-results/search-results.component';
import { Routes } from '@/router/routes';
import css from './search-page.module.scss';
import FAQSectionComponent from '@/core/layouts/public/components/faq-section/faq-section.component';
import LogoMarqueeDivider from '@/core/layouts/public/components/logo-marquee-divider/logo-marquee-divider.component';

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.35-4.35' />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <path d='m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' />
    </svg>
  );
}

export default function SearchPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = (params?.locale as string) || 'az';

  const initialQuery = useMemo(() => {
    const q = searchParams.get('q');
    return q ? decodeURIComponent(q) : '';
  }, [searchParams]);

  const [domain, setDomain] = useState(initialQuery);

  useEffect(() => {
    setDomain(initialQuery);
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = domain.trim();
    if (query) {
      router.push(`/${locale}${Routes.search}?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <LandingNavComponent />
      <section className={css.topSection}>
        <div className={css.content}>
          <h1 className={css.title}>{t('landing.search.title')}</h1>
          <p className={css.description}>{t('landing.search.description')}</p>
          <motion.form
            className={css.searchWrap}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSearchSubmit}
          >
            <div className={css.searchBox}>
              <div className={css.inputWrap}>
                <input
                  type='text'
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder={t('landing.search.placeholder')}
                  className={css.input}
                  aria-label={t('landing.search.placeholder')}
                />
                <button type='submit' className={css.searchIconBtn} aria-label='Search'>
                  <SearchIcon className={css.searchIcon} />
                </button>
              </div>
            {/*  <motion.button
                type="button"
                className={css.aiBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SparkleIcon className={css.aiIcon} />
                {t('landing.hero.aiSearch')}
              </motion.button>*/}
            </div>
          </motion.form>
        </div>
      </section>
      <div className={css.resultsSection}>
        <SearchResultsComponent domain={initialQuery} />
      </div>
      <LogoMarqueeDivider />
      <FAQSectionComponent/>
    </>
  );
}
