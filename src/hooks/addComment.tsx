import { useState} from 'react';
import {NewComment, NewIssue} from '@/types/type'
import {useRouter} from 'next/router';

const addComment = () => {
    const [errorA, setError] = useState<any>(null);
    const [dataA, setData] = useState<any>(null);

    const create = async (newIssue: NewComment)=>{
        setError(null);
        setData(null);

        const requestBody = JSON.stringify(newIssue);

        console.log(requestBody);

        try{
            const issueId = Number(localStorage.getItem('issueId'));
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments?issueId=${issueId}`;
            
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

    return{create, errorA, dataA};
};

export default addComment;

