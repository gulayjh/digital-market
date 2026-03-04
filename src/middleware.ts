import {NextFetchEvent, NextMiddleware, NextRequest, NextResponse} from 'next/server';
import {i18nRouter} from 'next-i18n-router';
import i18nConfig from '../next-i18next.config';

const locales = ['az', 'en', 'ru'];

// const withLocaleMiddleware = (middleware: NextMiddleware) => {
//     return (request: NextRequest, event: NextFetchEvent) => {
//         const { pathname } = request.nextUrl;
//         const pathnameHasLocale = locales.some(
//             (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
//         );
//         if (pathnameHasLocale) return middleware(request, event);
//         const locale: 'az' | 'en' | 'ru' = 'az';
//         request.nextUrl.pathname = `/${locale}${pathname}`;
//          NextResponse.redirect(request.nextUrl);
//         return middleware(request, event);
//     };
// };

// const withI18nMiddleware = (middleware: NextMiddleware) => {
//     return (request: NextRequest, event: NextFetchEvent) => {
//         i18nRouter(request, i18nConfig);
//         console.log(request);
//         return middleware(request, event);
//     };
// };

const localeMiddleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    if (pathnameHasLocale) return;
    const locale: 'az' | 'en' | 'ru' = 'az';
    console.log('loca');
    const newUrl = new URL(request.nextUrl);
    newUrl.pathname = `/${locale}${pathname}`;
    console.log(newUrl.href, request.nextUrl.href);
    if (newUrl.href === request.nextUrl.href) return null;
    return NextResponse.redirect(newUrl);
};
function i8nMiddleware(request: NextRequest) {
    console.log('lang');
    return i18nRouter(request, i18nConfig);
}

const chainMiddlewares = (request: NextRequest, event: NextFetchEvent, middlewares: NextMiddleware[]) => {
    for (const middleware of middlewares) {
        const response = middleware(request, event);
        if (response) {
            return response;
        }
    }
    return NextResponse.next();
};
export function middleware(request: NextRequest, event: NextFetchEvent){
    const middlewares = [localeMiddleware, i8nMiddleware];
    return chainMiddlewares(request, event, middlewares);
    // return i18nRouter(request, i18nConfig);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
