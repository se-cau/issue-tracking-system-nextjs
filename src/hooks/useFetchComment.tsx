import { useState, useEffect, useCallback } from 'react';

interface FetchResult<T>{
    comments: T[] | null;
    loadingC: boolean;
    errorC: string | null;
}

const useFetchComment = <T,>(endpoint: string, fetchedData: (data: any) => T): FetchResult<T>& { refetchC: () => void } =>{
const [comments, setData] = useState<T[] | null>(null);
const [loadingC, setLoading] = useState<boolean>(false);
const [errorC, setError] = useState<string | null>(null);


    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const id = localStorage.getItem('issueId');
            const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}/api/v1?issueId=${id}`);

            console.log(url);

            const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result:T[] = await response.json();
        setData(result);
        setError(null);
        
        console.log("comments",response);

    } catch (error:any) {
        setError(error.message);
        setData(null);
        console.log("error");
        } finally {
        setLoading(false);
    }
    },[endpoint]);

useEffect(() => {
    fetchData();
}, [fetchData]);

const refetchC=()=>{
    fetchData();
}

    return {comments, loadingC, errorC, refetchC};
};

export default useFetchComment;
