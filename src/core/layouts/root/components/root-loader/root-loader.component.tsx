'use client';
import {useStore} from '@/store/store.config';
import LoaderComponent from '@/core/shared/loader/loader.component';

const RootLoaderComponent = () => {
    const loading = useStore('loader');
    return (
        loading ? <LoaderComponent/> : null
    );
};


export default RootLoaderComponent;
