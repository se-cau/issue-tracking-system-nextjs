import { useState, useEffect, useCallback } from 'react';
import { userIdState } from '@/recoil/userState';
import { useRecoilState } from 'recoil';
import { projectState } from '@/recoil/projectState';

interface FetchResult<T>{
    dataP: T[] | null;
    loadingP: boolean;
    errorP: string | null;
}


const useFetchProject = <T,>(endpoint: string, fetchedData: (data: any) => T, userId:number): FetchResult<T> & { refetch: () => void } =>{
const [dataP, setData] = useState<T[] | null>(null);
const [loadingP, setLoading] = useState<boolean>(false);
const [errorP, setError] = useState<string | null>(null);
const [userIdT, setUserId] = useRecoilState<number>(userIdState);
const [projectData, setProjectData] = useRecoilState(projectState);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const id = localStorage.getItem('userId');
            const url = new URL(`http://ec2-43-203-119-113.ap-northeast-2.compute.amazonaws.com/api/v1${endpoint}?userId=${id}`);
            const response = await fetch(url.toString());

            
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setProjectData(result);
        setError(null);
        console.log(result);
        

    } catch (error:any) {
        setError(error.message);
        setData(null);
        } finally {
        setLoading(false);
    }},[endpoint]);


useEffect(()=>{
    fetchData();
},[fetchData]);

const refetch = () =>{
    fetchData();
}

    return { dataP, loadingP, errorP, refetch};
    
};

export default useFetchProject;
