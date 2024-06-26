import { useRouter } from 'next/router';
import { useState } from 'react';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    const signup = async (username:string, password:string, role:string)=>{
        setLoading(true);
        setError(null);
        setData(null);
        

        const requestBody = JSON.stringify({ username, password, role});
        console.log(requestBody);

        try{
            
            const response = await fetch(`http://ec2-43-203-119-113.ap-northeast-2.compute.amazonaws.com/api/v1/users/register`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password, role })

            });

            if(!response.ok){
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Something went wrong');

            }

            const result = await response;

            setData(result);
            router.push('/login');

        } catch (err:any){
            alert(err.message);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(err.message);
            console.error("Signup error:", errorMessage);

        }finally {
            setLoading(false);
        }

    };

    return{signup, loading, error, data};
};

export default useSignup;

