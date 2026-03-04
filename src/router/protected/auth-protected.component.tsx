'use client';
import {useDispatch} from 'react-redux';
import {useEffect, useMemo, useState} from 'react';
import {getToken} from '@/core/helpers/local-storage';
import {setUser} from '@/store/store.reducer';
import {Routes} from '@/router/routes';
import {IAuthProtectedRouteProps} from '@/router/protected/auth-protected';
import Navigate from '@/router/navigate/navigate';
import {usePathname} from 'next/navigation';
import PublicLayout from '@/core/layouts/public/public.layout';

const AuthProtectedComponent = ({children}: IAuthProtectedRouteProps) => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [childNode, setChildNode] = useState<React.ReactNode>(null);

    const layout = useMemo(() => {
        if (pathname.includes(Routes.auth)) {
            return 'auth';
        }
        if (pathname.includes(Routes.landing)) {
            return 'landing';
        }
        return 'public';
    }, [pathname]);

    useEffect(() => {
        const token = getToken();
        if (token) {
            dispatch(setUser(token));
        }
        switch (layout) {
            case 'auth':
                if (token) setChildNode(<Navigate replace to={Routes.home}/>);
                else setChildNode(children);
                break;
            case 'landing':
                setChildNode(children);
                break;
            case 'public':
                if (token) setChildNode(<PublicLayout>{children}</PublicLayout>);
                else setChildNode(<Navigate replace to={Routes.auth}/>);
                break;
            default:
                setChildNode(children);
                break;
        }
    }, [children, dispatch, layout]);

    return childNode;
};

export default AuthProtectedComponent;
