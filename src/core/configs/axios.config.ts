import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {environment} from './app.config';
import {store} from '@/store/store.config';
import {setLoader} from '@/store/store.reducer';
import {errorToast} from '../shared/toast/toast';
import {getToken} from '@/core/helpers/local-storage';
import {paginationConfig} from '@/core/configs/pagination.config';

const axiosInstance = axios.create({
    baseURL: environment.apiMain,
});
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        store.dispatch(setLoader(true));
        if (getToken()) {
            config.headers.set('Authorization', `Bearer ${getToken()}`);
        }
        return {
            ...config,
            params: {
                ...config.params,
                pageSize: paginationConfig.pageSize,
            },

        };
    }, (error: any) => {
        store.dispatch(setLoader(true));
        return Promise.reject(error);
    });

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        const method = response?.config?.method?.toUpperCase() ?? '';
        const url = response?.config?.url ?? '';
        // if (method === 'POST') {
        //     if (!url.includes('login')) {
        //         successToast('Müraciət göndərildi');
        //     }
        // }
        // if (method === 'PUT') {
        //     successToast('Müraciət dəyişdirildi');
        // }
        // if (response.data) {
        //     store.dispatch(setLoader(false));
        // }
        store.dispatch(setLoader(false));

        return response;
    },
    (error: any) => {
        let errMessage = '';
        const {
            response: {status,},
        } = error;

        switch (status) {
            case 401:
                errMessage = 'Sessiya müddəti bitmişdir';
                localStorage.removeItem(`${environment.applicationName}-token`);
                break;

            case 404:
                errMessage = 'Məlumat tapılmadı';
                // Router.navigate('/404');
                break;

            case 500:
                errMessage = 'Server xətası';
                break;

            default:
                errMessage = 'Xəta baş verdi';
        }

        errorToast(error.response.data);
        store.dispatch(setLoader(false));
        return Promise.reject(error);
    }
);
export default axiosInstance;
