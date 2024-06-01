import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userIdState } from '@/recoil/userState';
import { useRouter } from 'next/router';
import { userNameState, roleState } from '@/recoil/state';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    const [userId, setUserId] = useRecoilState(userIdState);
    const[userName, setUserName] = useRecoilState(userNameState);
    const [userRole, setUserRole] = useRecoilState(roleState);

    const login = async (username:string, password:string)=>{
        setLoading(true);
        setError(null);
        setData(null);

        const requestBody = JSON.stringify({ username, password});

        // const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const endpoint='/users/login';
        const apiBaseUrl = 'http://ec2-43-203-119-113.ap-northeast-2.compute.amazonaws.com';
        const url = `${apiBaseUrl}/api/v1${endpoint}`;
        

        console.log(requestBody);

        try{
            
            const response = await fetch(url,{
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

            const result = await response.json();
            setData(result);
            setUserId(result.userId);
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('userName', result.username);
            localStorage.setItem('userRole', result.role)
            

            router.push('/project');
            console.log(localStorage.getItem('userId'));

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

