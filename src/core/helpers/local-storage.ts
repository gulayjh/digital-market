'use client';

import {environment} from '@/core/configs/app.config';

export const getToken = (): string | null => {
    return localStorage.getItem(`${environment.applicationName}-token`);
};

export const setToken = (token: string) => {
    if (token) {
        localStorage.setItem(`${environment.applicationName}-token`, token);
    }
};

export const getLocale = (): string | null => {
    return localStorage.getItem(`${environment.applicationName}-locale`);
};

export const setLocale = (locale: string) => {
    if (locale) {
        localStorage.setItem(`${environment.applicationName}-locale`, locale);
    }
};
