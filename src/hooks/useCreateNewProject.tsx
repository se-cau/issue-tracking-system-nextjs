import { useState } from 'react';

const useCreateNewProject = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [data, setData] = useState<any>(null);

    const create = async (title:string, contributorIds:number[], adminId:number)=>{
        setLoading(true);
        setError(null);
        setData(null);

        const requestBody = JSON.stringify({title, adminId,contributorIds,});

        console.log(requestBody);


        try{
            
            const response = await fetch(`http://ec2-43-203-119-113.ap-northeast-2.compute.amazonaws.com/api/v1/projects`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title, 
                    adminId,
                    contributorIds
                })

            });
            console.log(requestBody);

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
            setLoading(false);
        }

    };

    return{create, loading, error, data};
};

export default useCreateNewProject;

