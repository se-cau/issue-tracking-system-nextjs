import React from 'react';
import { styled } from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useRecoilState } from 'recoil';
import { userNameState } from '@/recoil/state';
import { passwordState } from '@/recoil/state';
import useLogin from '@/hooks/useLogin';
import SubmitBtn from '../../components/button/SubmitBtn';


const Login = () => {
    const [userName, setUserName] = useRecoilState(userNameState);
    const [password, setPassword] = useRecoilState(passwordState);

    const {login, loading, error, data} = useLogin();


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await login(userName, password);
        console.log(userName, password)
        
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
            <TextWrapper>Login</TextWrapper>
            <InputWrapper>
                <Input text='Id' place='Enter your id' type='text' modal={false} value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <Input text='Password' place='Enter your password' type='password' modal={false} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </InputWrapper>
            <ButtonWrapper><SubmitBtn path="/project" text='Submit' loading={loading} success={!!data} error={error} /></ButtonWrapper>
            
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <p style={{ color: 'green' }}>Signup successful!</p>}
        </Wrapper>

        
    );
};

export default Login;

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