'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import css from './landing-hero.module.scss';
import ChatBubbleComponent from '@/core/layouts/public/components/chat-bubble/chat-bubble.component';
import { Routes } from '@/router/routes';

const TLD_KEYS = ['tldCom', 'tldAz', 'tldBiz', 'tldCo', 'tldOrgAz'] as const;

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

export default function LandingHeroComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'az';
  const [domain, setDomain] = useState('');
  const [selectedTld, setSelectedTld] = useState<string>(TLD_KEYS[0]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = domain.trim();
    if (query) {
      router.push(`/${locale}${Routes.search}?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className={css.section}>
      <div className={css.content}>
        <motion.h1
          className={css.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('landing.hero.title')}
        </motion.h1>
        <motion.p
          className={css.exampleText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          bakushopping.az|
        </motion.p>

        <motion.form
          className={css.searchWrap}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSearchSubmit}
        >
          <div className={css.searchBox}>
            <div className={css.inputWrap}>
              <input
                type='text'
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder={t('landing.hero.placeholder')}
                className={css.input}
                aria-label={t('landing.hero.placeholder')}
              />
              <button type='submit' className={css.searchIconBtn} aria-label='Search'>
                <SearchIcon className={css.searchIcon} />
              </button>
            </div>
      {/*      <motion.button
              type='button'
              className={css.aiBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
            >
              <SparkleIcon className={css.aiIcon} />
              {t('landing.hero.aiSearch')}
            </motion.button>*/}
          </div>
        </motion.form>

        <motion.div
          className={css.pillsWrap}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
        >
          {TLD_KEYS.map((key) => (
            <motion.button
              key={key}
              type='button'
              className={classNames(css.pill, { [css.pill_active]: selectedTld === key })}
              onClick={() => setSelectedTld(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
            >
              {t(`landing.hero.${key}`)}
            </motion.button>
          ))}
        </motion.div>
        <ChatBubbleComponent />

      </div>
    </section>
  );
}
