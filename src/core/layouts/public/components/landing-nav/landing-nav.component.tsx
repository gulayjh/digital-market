'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import css from './landing-nav.module.scss';

const SUBMENU_KEYS = ['itemDomainSearch', 'itemBulkSearch', 'itemTransfers', 'itemPremiumDomains'] as const;

const NAV_ITEMS: { key: string; hasDropdown: boolean }[] = [
  { key: 'linkDomen', hasDropdown: true },
  { key: 'linkInfrastruktur', hasDropdown: true },
  { key: 'linkTehlukesizlik', hasDropdown: true },
  { key: 'linkSolutions', hasDropdown: true },
  { key: 'linkHaqqimizda', hasDropdown: false },
  { key: 'linkElaqe', hasDropdown: false },
];

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function LandingNavComponent() {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={css.nav}
    >
      <div className={css.navRow}>
        <div className={css.navLeft}>
          <Link href="/" className={css.logo}>
            <span className={css.logoDigital}>digital</span>
            <span className={css.logoMarket}>market</span>
          </Link>
        </div>

        <div className={css.navCenter}>
          <ul className={css.menu}>
          {NAV_ITEMS.map(({ key, hasDropdown }) => (
            <li
              key={key}
              className={classNames(css.menuItem, { [css.menuItem_dropdown]: hasDropdown })}
              onMouseEnter={() => hasDropdown && setOpenDropdown(key)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {hasDropdown ? (
                <>
                  <button
                    type="button"
                    className={css.dropdownTrigger}
                    onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                    aria-expanded={openDropdown === key}
                    aria-haspopup="true"
                  >
                    {t(`landing.nav.${key}`)}
                    <ChevronDown className={css.chevron} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === key && (
                      <motion.div
                        className={css.dropdownPanel}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ul className={css.submenu}>
                          {SUBMENU_KEYS.map((subKey) => (
                            <li key={subKey}>
                              <Link href={`#${subKey}`} className={css.submenuLink}>
                                {t(`landing.products.${subKey}`)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href={`#${key}`} className={css.link}>
                  {t(`landing.nav.${key}`)}
                </Link>
              )}
            </li>
          ))}
          </ul>
        </div>

        <div className={css.navRight}>
          <div className={css.actions}>
          <button type="button" className={css.userBtn} aria-label="User menu">
            {t('landing.nav.userName')}
            <ChevronDown className={css.chevron} />
          </button>
          <button type="button" className={css.iconBtn} aria-label="Cart">
            <CartIcon className={css.iconBtnSvg} />
          </button>
          <button type="button" className={css.iconBtn} aria-label="Notifications">
            <BellIcon className={css.iconBtnSvg} />
          </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
