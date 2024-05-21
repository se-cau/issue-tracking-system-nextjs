import React from 'react';
import styled from 'styled-components';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputToggle from '@/components/InputToggle';
import { useRecoilState } from 'recoil';
import { userNameState, passwordState, roleState } from '@/recoil/state';
import useSignup from '@/hooks/useSignup';

const Register = () => {
    const [userName, setUserName] = useRecoilState(userNameState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [role, setRole] = useRecoilState(roleState);

    const {signup, loading, error, data} = useSignup();


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await signup(userName, password, role);
        
    };

    return (
        <Wrapper>
            <TextWrapper>Register</TextWrapper>
            <form onSubmit={handleSubmit}>
            <InputWrapper>
                <Input text='Id' place='Enter your id' type='text' modal={false} value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <Input text='Password' place='Enter your password' type='password' modal={false} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <InputToggle text='Role' place='Choose your role' modal={false}/>
            </InputWrapper>
            <ButtonWrapper>
                <Button path="/project" text='Submit' type="submit"/>
            </ButtonWrapper>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <p style={{ color: 'green' }}>Signup successful!</p>}
        </Wrapper>
    );
};

export default Register;

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
height: 550px;
margin-top: 200px;

`

const TextWrapper=styled.div`
font-size:50px;
`


const ButtonWrapper=styled.div`
    display: flex;
    justify-content: center;

`