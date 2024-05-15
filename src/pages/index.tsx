import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';


const Home= () => {
    const router = useRouter();

    const handleClick=()=>{
        router.push('/login')
    }
    

    return (
        <div>
            <Wrapper>
            <LoginWrapper>
            <TextWrapper>
                Issue Tracking System
            </TextWrapper>

            <ButtonWrapper>
                <Button onClick={()=>{router.push('/login')}}>
                    Login
                </Button>
                <Button onClick={()=>{router.push('/signup')}}>
                    Signup
                </Button>
            </ButtonWrapper>

        </LoginWrapper>
        </Wrapper>
        </div>
    );
};

export default Home;


const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
font-family: "K2D", sans-serif;

margin-top: 400px;
`

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const TextWrapper = styled.div`
font-size: 70px;
margin-bottom: 100px;

`

const ButtonWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
    
`


const Button = styled.div`
display: flex;
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
