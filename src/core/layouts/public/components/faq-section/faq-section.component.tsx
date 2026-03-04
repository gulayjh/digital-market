'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import css from './faq-section.module.scss';

const FAQ_IDS = ['1', '2', '3', '4'] as const;

export default function FAQSectionComponent() {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className={css.section} id="faq">
      <div className={css.container}>
        <span className={css.watermark} aria-hidden>FAQ</span>
        <div className={css.content}>
          <motion.div
            className={css.header}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
          >
            <h2 className={css.title}>{t('landing.faq.title')}</h2>
            <p className={css.subtitle}>{t('landing.faq.subtitle')}</p>
          </motion.div>
          <motion.ul
            className={css.list}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {FAQ_IDS.map((id) => (
              <motion.li
                key={id}
                className={css.item}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              >
                <button
                  type="button"
                  className={css.trigger}
                  onClick={() => setOpenId(openId === id ? null : id)}
                >
                  {t(`landing.faq.q${id}`)}
                  <motion.span
                    className={css.chevron}
                    animate={{ rotate: openId === id ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openId === id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className={css.answer}>{t(`landing.faq.a${id}`)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
