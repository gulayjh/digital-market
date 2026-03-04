'use client';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '@/store/store.config';
import RootLoaderComponent from '@/core/layouts/root/components/root-loader/root-loader.component';
import AuthProtectedComponent from '@/router/protected/auth-protected.component';

const RootLayoutComponent = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Provider store={store}>
                <RootLoaderComponent/>
                <AuthProtectedComponent>
                    {children}
                </AuthProtectedComponent>
            </Provider>
        </>
    );
};


export default RootLayoutComponent;

