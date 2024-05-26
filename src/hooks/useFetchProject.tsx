import { useState, useEffect } from 'react';

interface FetchResult<T>{
    dataP: T[] | null;
    loadingP: boolean;
    errorP: string | null;
}


const useFetchProject = <T,>(endpoint: string, fetchedData: (data: any) => T, userId:number): FetchResult<T> =>{
const [dataP, setData] = useState<T[] | null>(null);
const [loadingP, setLoading] = useState<boolean>(false);
const [errorP, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`);
            url.searchParams.append('userId', userId.toString());

            const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setError(null);
        

    } catch (error:any) {
        setError(error.message);
        setData(null);
        } finally {
        setLoading(false);
    }
    };

    fetchData();
}, [endpoint]);

    return { dataP, loadingP, errorP};
    
};

export default useFetchProject;
