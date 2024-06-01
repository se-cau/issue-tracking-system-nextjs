import { useState} from 'react';
import {NewIssueInfo} from '@/types/type'
import {useRouter} from 'next/router';

const useCreateNewIssue = () => {
    const [error, setError] = useState<string|null>(null);
    const [data, setData] = useState<any>(null);

    const router = useRouter();
    const query=router.query;
    const projectId = Number(query.id);


    const create = async (newIssue: NewIssueInfo)=>{
        setError(null);
        setData(null);

        const requestBody = JSON.stringify(newIssue);

        console.log(requestBody);

        try{
            const url = `http://ec2-43-203-119-113.ap-northeast-2.compute.amazonaws.com/api/v1/issues?projectId=${projectId}`;
            
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
                const errorText = await response.json();
                const errorCode = errorText.code;
                const errorMessage = errorText.message;
                console.error(errorText);
                throw new Error(`${errorMessage} ${errorCode} `);
                
                
            }

            const result = await response;
            setData(result);
            console.log(result.status);

        } catch (err:any){
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            alert(errorMessage);
            setError(errorMessage);

        }finally {
        }

    };

    return{create, error, data};
};

export default useCreateNewIssue;

