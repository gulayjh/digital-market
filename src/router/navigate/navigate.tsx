'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

const Navigate = ({to, replace = false}: { to: string, replace?: boolean }) => {
    const router = useRouter();
    
    useEffect(() => {
        if (replace){
            router.replace(to);
        }
        else router.push(to);
    }, [replace, router, to]);
    
    return <></>;
};

export default Navigate;
