import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Button from '../components/Button';


const Home= () => {
    const router = useRouter();

    return (
        <div>
            <Wrapper>
            <LoginWrapper>
            <TextWrapper>
                Issue Tracking System
            </TextWrapper>

            <ButtonWrapper>
                <Button path='/login' text='로그인' type="submit"/>
                <Button path='/register' text='회원가입' type="submit"/>
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

