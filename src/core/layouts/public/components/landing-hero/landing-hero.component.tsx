'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import css from './landing-hero.module.scss';
import ChatBubbleComponent from '@/core/layouts/public/components/chat-bubble/chat-bubble.component';
import { Routes } from '@/router/routes';

const TLD_KEYS = ['tldCom', 'tldAz', 'tldBiz', 'tldCo', 'tldOrgAz'] as const;
const TYPEWRITER_WORDS = ['azerbaijantravel.az', 'bakubusiness.biz'];
const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 500;

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useTypewriter(words: string[]) {
  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const wordIdx = useRef(0);
  const charIdx = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const tick = useCallback(() => {
    const current = words[wordIdx.current];

    if (!isDeleting) {
      charIdx.current++;
      setDisplay(current.slice(0, charIdx.current));

      if (charIdx.current === current.length) {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        return;
      }
      timeoutRef.current = setTimeout(tick, TYPE_SPEED);
    } else {
      charIdx.current--;
      setDisplay(current.slice(0, charIdx.current));

      if (charIdx.current === 0) {
        setIsDeleting(false);
        wordIdx.current = (wordIdx.current + 1) % words.length;
        timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      timeoutRef.current = setTimeout(tick, DELETE_SPEED);
    }
  }, [isDeleting, words]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(timeoutRef.current);
  }, [tick]);

  return display;
}

const pillContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.5 },
  },
};

const pillItemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.35-4.35' />
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
  const typedText = useTypewriter(TYPEWRITER_WORDS);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = domain.trim();
    if (query) {
      router.push(`/${locale}${Routes.search}?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className={css.section}>
      <div className={css.beamsWrap} aria-hidden='true'>
        {[1, 2, 3].map((i) => (
          <div key={i} className={classNames(css.beam, css[`beam_${i}`])}>
            <div className={css.beamLine}>
              <div className={classNames(css.beamLight, css.beamLight_down)} />
            </div>
            <div className={css.beamLine}>
              <div className={classNames(css.beamLight, css.beamLight_up)} />
            </div>
          </div>
        ))}
      </div>
      <div className={css.content}>
        <motion.h1
          className={css.title}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_EXPO }}
        >
          {t('landing.hero.title')}
        </motion.h1>

        <motion.p
          className={css.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: EASE_OUT_EXPO }}
        >
          <span className={css.typed}>{typedText}</span>
          <span className={css.cursor} />
        </motion.p>

        <motion.form
          className={css.searchWrap}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE_OUT_EXPO }}
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
            </div>
            <motion.button
              type='submit'
              className={css.searchBtn}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              aria-label='Search'
            >
              <SearchIcon className={css.searchBtnIcon} />
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          className={css.pillsWrap}
          variants={pillContainerVariants}
          initial='hidden'
          animate='visible'
        >
          {TLD_KEYS.map((key) => (
            <motion.button
              key={key}
              type='button'
              className={classNames(css.pill, { [css.pill_active]: selectedTld === key })}
              onClick={() => setSelectedTld(key)}
              variants={pillItemVariants}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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
