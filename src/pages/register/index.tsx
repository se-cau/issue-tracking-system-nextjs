import React,{useEffect} from 'react';
import styled from 'styled-components';
import Input from '@/components/Input';
import InputToggle from '@/components/InputToggle';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNameState, passwordState, roleState, visibleState } from '@/recoil/state';
import useSignup from '@/hooks/useSignup';
import SubmitBtn from '@/components/button/SubmitBtn';
import RoutingBtn from '@/components/button/RoutingBtn';

const Register = () => {
    const [userName, setUserName] = useRecoilState(userNameState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [role, setRole] = useRecoilState(roleState);
    const isVisible = useRecoilValue(visibleState);

    const {signup, loading, error, data} = useSignup();

    useEffect(() => {
        setUserName('');
        setPassword(''); 
    }, [setUserName, setPassword]); 


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await signup(userName, password, role);
        
    };

    return (
        <>
        <NavWrapper>
                <Btn text='← back' path='/'/>
        </NavWrapper>
        <Wrapper>
            <TextWrapper>Register</TextWrapper>
            <form onSubmit={handleSubmit}>
            <InputWrapper>
                <Input text='Id' place='Enter your id' type='text' modal={false} value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <Input text='Password' place='Enter your password' type='password' modal={false} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <InputToggle text='Role' place='Choose your role' modal={false} data={[]}/>
            </InputWrapper>
            <ButtonWrapper isVisible = {isVisible}>
                <div id="button">
                    <SubmitBtn path="/login" text='Submit' success={!!data} error={error}/>
                </div>

            </ButtonWrapper>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <p style={{ color: 'green' }}>Signup successful!</p>}
        </Wrapper>
        </>
    );
};

export default Register;

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
height: 550px;
margin-top: 200px;


`

const TextWrapper=styled.div`
font-size:50px;
`


const ButtonWrapper=styled.div<{isVisible:boolean}>`
    display: flex;
    justify-content: center;
    z-index: 0;
    margin-top: 70px;

    #button{
        display: ${({isVisible}) => (!isVisible ? 'flex':'none')};
    }

`