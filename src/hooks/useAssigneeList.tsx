import { useState, useEffect, useCallback } from 'react';
import { userIdState } from '@/recoil/userState';
import { useRecoilState } from 'recoil';
import { projectState } from '@/recoil/projectState';

interface FetchResult<T>{
    dataA: T[] | null;
    loadingA: boolean;
    errorA: string | null;
}


const useAssigneeList = <T,>(endpoint: string, query:string, fetchedData: (data: any) => T, userId:number): FetchResult<T> & { refetchA: () => void } =>{
const [dataA, setData] = useState<T[] | null>(null);
const [loadingA, setLoading] = useState<boolean>(false);
const [errorA, setError] = useState<string | null>(null);
const [userIdT, setUserId] = useRecoilState<number>(userIdState);
const [projectData, setProjectData] = useRecoilState(projectState);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            const id = localStorage.getItem('projectId');
            const url = `http://ec2-43-203-119-113.ap-northeast-2.compute.amazonaws.com/api/v1${endpoint}/${id}/dev`;
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

const refetchA = () =>{
    fetchData();
}

    return { dataA, loadingA, errorA, refetchA};
    
};

export default useAssigneeList;
