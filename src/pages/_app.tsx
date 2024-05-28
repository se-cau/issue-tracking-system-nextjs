import {useEffect, useState} from 'react';
import type {AppProps} from 'next/app'
import {GlobalStyle} from '../styles/global.style';
import { RecoilRoot } from 'recoil';
import { styled } from 'styled-components';
import { useRouter } from 'next/router';
import RoutingBtn from '../components/button/RoutingBtn';
import { typeColor } from '@/styles/color';
import { userNameState, roleState } from '@/recoil/state';

function MyApp({Component, pageProps} :AppProps){
    const router = useRouter();
    const isHomePage = router.pathname === '/';
    const isLoginPage = router.pathname === '/login';
    const isRegisterPage = router.pathname === '/register';

    const [userId, setUserId] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<{ userName: string | null, userRole: string | null }>({ userName: null, userRole: null });

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedUserRole = localStorage.getItem('userRole');

        if (storedUserName !== null && storedUserRole !== null) {
            setUserInfo({ userName: storedUserName, userRole: storedUserRole });
        }

        // console.log(storedUserName);
        // console.log(storedUserRole);
    }, []);

    const handleClick = ()=>{
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        setUserId('');
        setUserInfo({ userName: null, userRole: null });
        router.push('/');

    }


    return(
        <RecoilRoot>
            <GlobalStyle />
            {/* {!isHomePage && !isLoginPage && !isRegisterPage &&
                <NavWrapper>
                    <Btn text='home' path='/'/>
                    <Btn text='project' path='/project'/>
                    <button onClick={handleClick}>logout</button>
                    <div id='userInfo'>
                        <Role color={userInfo.userRole?typeColor[userInfo.userRole]:'black'}> {userInfo.userName} </Role>
                    </div>
                </NavWrapper>
            } */}
            <Component {...pageProps}/>
        </RecoilRoot>
    )
}

export default MyApp


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


const NavWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    background-color: black;
    color: white;
    font-family: "K2D", sans-serif;

    #userInfo{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const Role = styled.button<{color:string}>`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props=>props.color};
    height: 30px;
    width: 70px;
    
`
