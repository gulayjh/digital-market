'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRightCircle } from './products-section.icons';
import css from './products-section.module.scss';

import domainIcon from '@/assets/images/products/domain.png';
import infrastructureIcon from '@/assets/images/products/infrastructure.png';
import securityIcon from '@/assets/images/products/security.png';
import solutionsIcon from '@/assets/images/products/solutions.png';

const CATEGORIES = [
  {
    titleKey: 'categoryDomen',
    iconSrc: domainIcon.src,
    items: ['itemDomainSearch', 'itemBulkSearch', 'itemTransfers', 'itemPremiumDomains'],
  },
  {
    titleKey: 'categoryInfrastruktur',
    iconSrc: infrastructureIcon.src,
    items: ['itemBuludVps', 'itemManagedHosting', 'itemDedicatedServers'],
  },
  {
    titleKey: 'categoryTehlukesizlik',
    iconSrc: securityIcon.src,
    items: ['itemSslCertificate', 'itemSiteSecurityScans', 'itemEmailEncryption'],
  },
  {
    titleKey: 'categorySolutions',
    iconSrc: solutionsIcon.src,
    items: ['itemStartStore', 'itemBuildPortfolio', 'itemEnterpriseScaling'],
  },
];

export default function ProductsSectionComponent() {
  const { t } = useTranslation();

  return (
    <section className={css.section} id="products">
      <div className={css.container}>
        <motion.div
          className={css.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
        >
          <h2 className={css.title}>{t('landing.products.title')}</h2>
          <p className={css.subtitle}>{t('landing.products.subtitle')}</p>
        </motion.div>
        <motion.div
          className={css.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {CATEGORIES.map((cat) => (
              <motion.div
                key={cat.titleKey}
                className={css.card}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className={css.iconBox}>
                  <img
                    src={cat.iconSrc}
                    alt=""
                    className={css.iconImage}
                  />
                </div>
                <h3 className={css.cardTitle}>{t(`landing.products.${cat.titleKey}`)}</h3>
                <ul className={css.list}>
                  {cat.items.map((itemKey) => (
                    <li key={itemKey} className={css.listItem}>
                      <Link href="#" className={css.link}>
                        <span className={css.linkText}>{t(`landing.products.${itemKey}`)}</span>
                        <span className={css.arrowCircle}>
                          <ArrowRightCircle />
                        </span>
                      </Link>
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
