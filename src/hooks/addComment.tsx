import {useState} from 'react';
import {NewComment, CommentInfo} from '@/types/type'
import axios from 'axios';
import {useRouter} from 'next/router';

const addComment = () => {
    const [errorA, setError] = useState<string|null>(null);
    const [dataA, setData] = useState<CommentInfo|null>(null);
    const router = useRouter();

    const create = async (newComment: NewComment): Promise<CommentInfo | null>=>{
        setError(null);
        setData(null);

        const requestBody = JSON.stringify(newComment);

        try{
            const issueId = Number(localStorage.getItem('issueId'));
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments?issueId=${issueId}`;
            
            const response = await axios.post(url, newComment,{
                headers:{
                    'Content-Type': 'application/json'
                },
            });

            console.log(requestBody);
            console.log(url);

            if(!response.data){
                const errorText = `Network response was not ok. Status: ${response.status} ${response.statusText}`
                throw new Error(errorText);
            }

            const result = response.data;
            setData(result);

            router.replace(router.asPath);

            return result;

        } catch (err:any){
            alert(err);
            setError(err.message);
            console.error("error:", err);
            return null;

        }finally {
        }

    };

    return{create, errorA, dataA};
};

export default addComment;

