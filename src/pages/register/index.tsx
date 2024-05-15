import React from 'react';
import styled from 'styled-components';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputToggle from '@/components/InputToggle';
const Register = () => {
    return (
        <Wrapper>
            <TextWrapper>Register</TextWrapper>
            <InputWrapper>
                <Input text='Id' place='Enter your id' type='text'/>
                <Input text='Password' place='Enter your password' type='password'/>
                <InputToggle text='Role' place='Choose your role'/>
            </InputWrapper>
            <ButtonWrapper><Button path="/project" text='Submit'/></ButtonWrapper>
            

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