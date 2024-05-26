import { useState, useEffect } from 'react';

interface FetchResult<T>{
    comments: T[] | null;
    loadingC: boolean;
    errorC: string | null;
}


const useFetchComment = <T,>(endpoint: string, fetchedData: (data: any) => T): FetchResult<T> =>{
const [comments, setData] = useState<T[] | null>(null);
const [loadingC, setLoading] = useState<boolean>(false);
const [errorC, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const id = localStorage.getItem('issueId');
            const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}?issueId=${id}`);

            console.log(url);

            const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
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
    };

    fetchData();
}, [endpoint]);

    return {comments, loadingC, errorC};
};

export default useFetchComment;
