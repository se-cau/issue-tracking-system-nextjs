import React from 'react';
import { styled } from 'styled-components';


const Login = () => {
    return (
        <Wrapper>
            <TextWrapper>Login</TextWrapper>
            <InputWrapper>
                <Input>
                    <div>Id</div>
                    <input placeholder="Enter your id" type='text'></input>
                </Input>
                <Input>
                    <div>Password</div>
                    <input placeholder="Enter your password" type='text'></input>
                </Input>
            </InputWrapper>
            <ButtonWrapper><Button>Submit</Button></ButtonWrapper>
            

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

const Input = styled.div`
text-align: left;
font-size: 20px;
margin-bottom: 40px;


input{
    width: 500px;
    height:50px;
    font-size: 15px;
    margin: 5px 0;
    
    
    border-color: black;
    border-width:0 0 1.5px;
}
    
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



const Button = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
cursor: pointer;


width: 200px;
height: 40px;
background-color: black;
color: white;
border-radius: 10px;
box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`

const ButtonWrapper=styled.div`
    display: flex;
    justify-content: center;

`