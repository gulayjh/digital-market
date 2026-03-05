'use client';

import LandingNavComponent from '@/core/layouts/public/components/landing-nav/landing-nav.component';
import LandingHeroComponent from '@/core/layouts/public/components/landing-hero/landing-hero.component';
import ProductsSectionComponent from '@/core/layouts/public/components/products-section/products-section.component';
import PricingSectionComponent from '@/core/layouts/public/components/pricing-section/pricing-section.component';
import FAQSectionComponent from '@/core/layouts/public/components/faq-section/faq-section.component';
import LandingFooterComponent from '@/core/layouts/public/components/landing-footer/landing-footer.component';
import ChatBubbleComponent from '@/core/layouts/public/components/chat-bubble/chat-bubble.component';
import LogoMarqueeDivider from '@/core/layouts/public/components/logo-marquee-divider/logo-marquee-divider.component';

export default function LandingPage() {
    return (
        <>
            <LandingNavComponent/>
            <LandingHeroComponent/>
            <ProductsSectionComponent/>
            <LogoMarqueeDivider/>
            <PricingSectionComponent/>
            <FAQSectionComponent/>
            <LandingFooterComponent/>
        </>
    );
}
