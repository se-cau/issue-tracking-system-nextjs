import { useState, useEffect } from 'react';

interface FetchResult<T>{
    data: T|null;
    loading: boolean;
    error: string | null;
}


const useFetchIssue = <T,>(endpoint: string, fetchedData: (data: any) => T): FetchResult<T> =>{
const [data, setData] = useState<T|null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
}, [endpoint]);

    return {data, loading, error};
};

export default useFetchIssue;
