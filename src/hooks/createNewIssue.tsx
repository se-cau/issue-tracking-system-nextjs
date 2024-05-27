import { useState, useEffect } from 'react';
import {NewIssue} from '@/types/type'
import {useRouter} from 'next/router';



const createNewIssue = () => {
    const [error, setError] = useState<string|null>(null);
    const [data, setData] = useState<any>(null);

    const router = useRouter();
    const query=router.query;
    const projectId = Number(query.id);


    const create = async (newIssue: NewIssue)=>{
        setError(null);
        setData(null);

        const requestBody = JSON.stringify(newIssue);

        console.log(requestBody);

        try{
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/issues?projectId=${projectId}`;
            
            const response = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: requestBody

            });


            console.log(requestBody);
            console.log(url);

            if(!response.ok){
                const errorText = `Network response was not ok. Status: ${response.status} ${response.statusText}`
                throw new Error(errorText);
            }

            const result = await response;
            alert(result);
            setData(result);
            console.log(result.status);

        } catch (err:any){
            alert(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(err.message);
            console.error("error:", errorMessage);

        }finally {
        }

    };

    return{create, error, data};
};

export default createNewIssue;

