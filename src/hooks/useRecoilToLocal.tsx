import {useEffect} from 'react';
import { userIdState } from '@/recoil/userState';
import React from 'react';
import { useRecoilState } from 'recoil';

const useRecoilToLocal = () => {
    const [userId, setUserId] = useRecoilState(userIdState);

    useEffect(() => {
        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
            setUserId(savedUserId);
        }
    }, [setUserId]);

    useEffect(()=>{
        (userId!==null?  
            localStorage.setItem('userId', userId):
            localStorage.setItem('userId', '')
        )
    },[userId]);

    return [userId, setUserId] as const;

};

export default useRecoilToLocal;