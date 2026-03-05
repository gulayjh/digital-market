'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import css from './search-results.module.scss';

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

const MOCK_SIMILAR_DOMAINS = [
  { name: 'Turka.siz', price: null, bestOffer: true },
  { name: 'Turka.biz', price: '21 AZN/illik', bestOffer: false },
  { name: 'Turka.name.az', price: '22 AZN/illik', bestOffer: false },
  { name: 'Turka.inst.az', price: '22 AZN/illik', bestOffer: false },
  { name: 'Turka.co', price: '22 AZN/illik', bestOffer: false },
];

interface SearchResultsComponentProps {
  domain: string;
}

export default function SearchResultsComponent({ domain }: SearchResultsComponentProps) {
  const { t } = useTranslation();
  const [aboutOpen, setAboutOpen] = useState(false);
  const displayDomain = domain || 'domain.com';

  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        <div className={css.cardGrid}>
          <div className={css.cardColLeft}>
            <div className={css.domainRow}>
              <span className={css.soldIcon} aria-hidden />
              <h2 className={css.domainName}>{displayDomain}</h2>
            </div>
            <p className={css.statusText}>{t('landing.search.domainSoldLabel')}</p>
          </div>
          <div className={css.cardColRight}>
            <span className={css.getViaBroker}>{t('landing.search.getViaBroker')}</span>
            <span className={css.price}>{t('landing.search.pricePerYear')}</span>
            <button type="button" className={css.getItBtn}>
              {t('landing.search.getItButton')}
            </button>
          </div>
        </div>
        <button
          type="button"
          className={css.aboutToggle}
          onClick={() => setAboutOpen(!aboutOpen)}
          aria-expanded={aboutOpen}
        >
          <span className={css.aboutToggleText}>{t('landing.search.aboutDomain', { domain: displayDomain })}</span>
          <span className={css.chevronWrap}>
            <ChevronDown className={`${css.chevron} ${aboutOpen ? css.chevronOpen : ''}`} />
          </span>
        </button>
        <AnimatePresence>
          {aboutOpen && (
            <motion.div
              className={css.aboutContent}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {t('landing.search.aboutDomain', { domain: displayDomain })} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <h3 className={css.similarTitle}>{t('landing.search.similarDomainsTitle')}</h3>
      <ul className={css.similarList}>
        {MOCK_SIMILAR_DOMAINS.map((item) => (
          <li key={item.name} className={css.similarItem}>
            <div className={css.similarItemLeft}>
              <span className={css.similarDomainName}>{item.name}</span>
              {item.bestOffer && (
                <span className={css.bestOfferTag}>{t('landing.search.bestOffer')}</span>
              )}
            </div>
            <div className={css.similarItemRight}>
              {item.price && <span className={css.similarPrice}>{item.price}</span>}
              <div className={css.similarActions}>
                <button type="button" className={css.getItBtn}>
                  {t('landing.search.getItButton')}
                </button>
                <button type="button" className={css.cartIconBtn} aria-label="Add to cart">
                  <CartIcon className={css.cartIcon} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
