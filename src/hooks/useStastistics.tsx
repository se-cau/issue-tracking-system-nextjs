import { useState, useEffect, useCallback } from 'react';
import { userIdState } from '@/recoil/userState';
import { useRecoilState } from 'recoil';

interface FetchResult<T>{
    data: T | null;
    loading: boolean;
    error: string | null;
}


const useStatistics = <T,>(projectId:string, endpoint: string, fetchedData: (data: any) => T): FetchResult<T>  =>{
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {

            const id = localStorage.getItem('projectId');
            const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}${id}`);

            console.log(url);

            const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setError(null);
        console.log(result);
        console.log("url:::",url);
        

    } catch (error:any) {
        setError(error.message);
        setData(null);
        } finally {
        setLoading(false);
    }
    },[endpoint]);


useEffect(()=>{
    fetchData();
},[fetchData]);

const refetch = () =>{
    fetchData();
}

    return { data, loading, error};
    
};

export default useStatistics;
