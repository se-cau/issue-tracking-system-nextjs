import React, {useEffect} from 'react';
import { styled } from 'styled-components';
import { useRouter } from 'next/router';
import Input from '../../components/Input';
import { useRecoilState } from 'recoil';
import { userNameState } from '@/recoil/state';
import { passwordState } from '@/recoil/state';
import useLogin from '@/hooks/useLogin';
import SubmitBtn from '../../components/button/SubmitBtn';
import RoutingBtn from '@/components/button/RoutingBtn';


const Login = () => {
    const [userName, setUserName] = useRecoilState(userNameState);
    const [password, setPassword] = useRecoilState(passwordState);

    const {login, loading, error, data} = useLogin();

    const router = useRouter();
    useEffect(() => {
        setUserName('');
        setPassword(''); 
    }, [setUserName, setPassword]); 


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await login(userName, password);
        console.log(userName, password)
        
    };

    return (
        <>
        <NavWrapper>
                <Btn text='← back' path='/'/>
        </NavWrapper>
        <Wrapper>
            
            <form onSubmit={handleSubmit}>            
            <TextWrapper>Login</TextWrapper>
            <InputWrapper>
                <Input text='Id' place='Enter your id' type='text' modal={false} value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <Input text='Password' place='Enter your password' type='password' modal={false} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </InputWrapper>
            <ButtonWrapper><SubmitBtn path="/project" text='Submit' success={!!data} error={error} /></ButtonWrapper>
            
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <p style={{ color: 'green' }}>Login successful!</p>}
        </Wrapper>
        </>

        
    );
};

export default Login;

const NavWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    background-color: black;
    color: white;
    font-family: "K2D", sans-serif;
`

const Btn = styled(RoutingBtn)`
&& {
    box-shadow: none;
    border-radius: 30px;
    border: solid white 1px;
    width: 100px;
    height: 50px;
    background-color: pink;

}

`


const InputWrapper=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`


const Wrapper=styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
text-align: center;
font-family: "K2D", sans-serif;
height: 500px;
margin-top: 200px;

`

const TextWrapper=styled.div`
font-size:50px;
`


const ButtonWrapper=styled.div`
    display: flex;
    justify-content: center;

`