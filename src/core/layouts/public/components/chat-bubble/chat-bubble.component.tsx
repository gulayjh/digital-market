'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import css from './chat-bubble.module.scss';

export default function ChatBubbleComponent() {
  const { t } = useTranslation();

  return (
    <motion.div
      className={css.wrap}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        type="button"
        className={css.btn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'tween', duration: 0.2 }}
        aria-label={t('landing.chat.greeting')}
      >
        <svg className={css.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
