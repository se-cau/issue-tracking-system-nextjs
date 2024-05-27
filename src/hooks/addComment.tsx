import {useState} from 'react';
import {NewComment, CommentInfo} from '@/types/type'
import axios from 'axios';

const addComment = () => {
    const [errorA, setError] = useState<string|null>(null);
    const [dataA, setData] = useState<CommentInfo|null>(null);

    const create = async (newComment: NewComment): Promise<CommentInfo | null>=>{
        setError(null);
        setData(null);

        const requestBody = JSON.stringify(newComment);

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

            const text = await response.json();
            console.log('Response Text:', text);

            if(!text){
                throw new Error('Response body is Empty');
            }

            const result = JSON.parse(text);
            console.log('Response JSON:', result);

            if(result && result.id && result.message && result.authorid){
                setData(result);
                return result as CommentInfo;
            }
            else{
                throw new Error('Invalid response format');
            }


        } catch (err:any){
            alert(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(err.message);
            console.error("error:", errorMessage);
            return null;

        }finally {
        }

    };

    return{create, errorA, dataA};
};

export default addComment;

