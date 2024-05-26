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
        

        const requestBody = JSON.stringify({ username, password, role });

        console.log(requestBody);

        try{
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password, role })

            });

            if(!response.ok){
                const errorText = `Network response was not ok. Status: ${response.status} ${response.statusText}`
                throw new Error(errorText);
            }

            const result = await response;
            setData(result);
            console.log(result.status);
            router.push('/login');

        } catch (err:any){
            alert(err);
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

