import { CandidateInfo } from '@/types/type';
import { useState, useEffect, useCallback } from 'react';

interface FetchResult<T>{
    candidate: T | null;
    loading: boolean;
    error: string | null;
}


const useFetchCandidate = <T,>(endpoint: string, fetchedData: (data: any) => T): FetchResult<T> & { refetch: () => void }=>{
const [candidate, setData] = useState<T | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);

const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const id = localStorage.getItem('issueId');
            const url = new URL(`http://ec2-43-203-119-113.ap-northeast-2.compute.amazonaws.com/api/v1${endpoint}?issueId=${id}`);

            console.log(url);

            const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setError(null);
        
        console.log(response);

    } catch (error:any) {
        setError(error.message);
        setData(null);
        console.log("error");
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

    return {candidate, loading, error, refetch};
};

export default useFetchCandidate;
