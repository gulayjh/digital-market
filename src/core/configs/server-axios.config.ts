import axios, {AxiosInstance} from 'axios';
import {environment} from '@/core/configs/app.config';

const serverAxiosInstance: AxiosInstance = axios.create({
    baseURL: environment.apiMain,
});

serverAxiosInstance.interceptors.request.use((request) => {
    return request;
}, (error) => {
    return Promise.reject(error);
});

serverAxiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default serverAxiosInstance;