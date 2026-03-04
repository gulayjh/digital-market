'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import css from './pricing-section.module.scss';

type Billing = 'yearly' | 'triennial';

const PLANS = ['starter', 'pro', 'business'] as const;
const FEATURE_KEYS = ['featureDomain3y', 'featureSsl', 'featureSupport24', 'featureEmail', 'featureVps', 'featureHosting'] as const;
const PRICES = { starter: { yearly: 34, triennial: 16 }, pro: { yearly: 54, triennial: 26 }, business: { yearly: 64, triennial: 32 } };

export default function PricingSectionComponent() {
  const { t } = useTranslation();
  const [billing, setBilling] = useState<Billing>('yearly');

  return (
    <section className={css.section} id="pricing">
      <div className={css.container}>
        <motion.div
          className={css.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <h2 className={css.title}>{t('landing.pricing.title')}</h2>
          <p className={css.subtitle}>{t('landing.pricing.subtitle')}</p>
          <div className={css.toggleWrap}>
            <button
              type="button"
              onClick={() => setBilling('yearly')}
              className={classNames(css.toggleBtn, { [css.toggleBtn_active]: billing === 'yearly' })}
            >
              {t('landing.pricing.yearly')}
            </button>
            <button
              type="button"
              onClick={() => setBilling('triennial')}
              className={classNames(css.toggleBtn, { [css.toggleBtn_active]: billing === 'triennial' })}
            >
              {t('landing.pricing.triennial')}
            </button>
          </div>
        </motion.div>
        <motion.div
          className={css.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {PLANS.map((planId) => (
            <motion.div
              key={planId}
              className={classNames(css.card, { [css.card_highlighted]: planId === 'pro' })}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              {planId === 'pro' && (
                <span className={css.badge}>{t('landing.pricing.badgeBestValue')}</span>
              )}
              <h3 className={css.cardTitle}>
                {t(`landing.pricing.plan${planId.charAt(0).toUpperCase() + planId.slice(1)}`)}
              </h3>
              <div className={css.priceWrap}>
                {billing === 'triennial' && (
                  <span className={css.priceOriginal}>{PRICES[planId].yearly}</span>
                )}
                <span className={css.price}>
                  {billing === 'yearly' ? PRICES[planId].yearly : PRICES[planId].triennial}
                </span>
                <span className={css.priceSymbol}>₼</span>
                <span className={css.priceSuffix}>{t('landing.pricing.perMonth')}</span>
              </div>
              <button
                type="button"
                className={classNames(css.cta, { [css.cta_primary]: planId === 'pro' })}
              >
                {t('landing.pricing.getIt')}
              </button>
              <p className={css.includesLabel}>{t('landing.pricing.includes')}</p>
              <ul className={css.featureList}>
                {FEATURE_KEYS.map((key) => (
                  <li key={key} className={css.featureItem}>
                    <span className={css.bullet} />
                    {t(`landing.pricing.${key}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
