import { useState } from 'react';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [data, setData] = useState<any>(null);

    const login = async (username:string, password:string)=>{
        setLoading(true);
        setError(null);
        setData(null);

        const requestBody = JSON.stringify({ username, password});

        console.log(requestBody);

        try{
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})

            });

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
            console.error("Login error:", errorMessage);

        }finally {
            setLoading(false);
        }

    };

    return{login, loading, error, data};
};

export default useLogin;

