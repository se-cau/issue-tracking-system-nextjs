// Navbar.tsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import RoutingBtn from '../button/RoutingBtn';
import { typeColor } from '@/styles/color';

const Navbar = () => {
    const router = useRouter();
    const isHomePage = router.pathname === '/';
    const isLoginPage = router.pathname === '/login';
    const isRegisterPage = router.pathname === '/register';

    const [userInfo, setUserInfo] = useState<{ userName: string | null, userRole: string | null }>({ userName: null, userRole: null });

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedUserRole = localStorage.getItem('userRole');

        if (storedUserName !== null && storedUserRole !== null) {
            setUserInfo({ userName: storedUserName, userRole: storedUserRole });
        }
    }, []);

    const handleClick = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        setUserInfo({ userName: null, userRole: null });
        router.push('/');
    }

    return (
        <NavWrapper>
            <Btn text='home' path='/'/>
            <Btn text='project' path='/project'/>
            <button onClick={handleClick}>logout</button>
            <div id='userInfo'>
                <Role color={userInfo.userRole?typeColor[userInfo.userRole]:'black'}> {userInfo.userName} </Role>
            </div>
        </NavWrapper>
    );
}

export default Navbar;

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
    /* width: 70px; */
    
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
