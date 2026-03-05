'use client';

import css from './logo-marquee-divider.module.scss';

const LOGO_COUNT = 6;

function LogoItem() {
  return (
    <span className={css.logoItem} aria-hidden>
      <span className={css.logoDigital}>digital</span>
      <span className={css.logoMarket}>market</span>
    </span>
  );
}

export default function LogoMarqueeDivider() {
  const logos = Array.from({ length: LOGO_COUNT }, (_, i) => <LogoItem key={i} />);

  return (
    <div className={css.strip} role="presentation" aria-hidden="true">
      <div className={css.track}>
        {logos}
        {logos}
      </div>
    </div>
  );
}
