'use client';
import React from 'react';
import HeaderComponent from '@/core/layouts/public/components/header/header.component';
import FooterComponent from '@/core/layouts/public/components/footer/footer.component';

const PublicLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <HeaderComponent/>
            <main>
                {children}
            </main>
            <FooterComponent/>
        </>
    );
};


export default PublicLayout;

