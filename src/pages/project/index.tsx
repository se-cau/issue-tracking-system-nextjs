import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import NewProject from '@/components/modal/NewProject';
import { useRecoilState} from 'recoil';
import { modalState } from '@/recoil/state';
import useFetchData from '@/hooks/useFetchData';
import useFetchProject from '@/hooks/useFetchProject';
import { User, ProjectInfo } from '@/types/type';
import { setCookie, getCookie } from '@/utils/cookie';
import Cookies from 'js-cookie';
import { userIdState } from '@/recoil/userState';
import Navbar from '@/components/nav/Navbar';

const fetchUserData = (data:any):User => ({
    userId: data.userId,
    username: data.username,
    role: data.role,
})

const fetchProjectData = (data:any):ProjectInfo=>({
    projectId: data.projectId,
    title: data.title,
    adminName: data.adminName,
    contributorNames: data.contributorNames

})

const Projects = () => {
    const router = useRouter();
    const [userId, setUserId] = useRecoilState<number>(userIdState);
    const [isVisible, setVisiable] = useRecoilState(modalState);

    const endpoint = '/users'; 
    const {data, loading, error} = useFetchData<User>(endpoint, fetchUserData);

    const endpointP = '/projects'; 
    const {dataP, loadingP, errorP, refetch} = useFetchProject<ProjectInfo>(endpointP, fetchProjectData, userId);

    
    

    const handleModal = ()=>{
        setVisiable(true);
    }

    const handleClick = (path:string)=>{
        router.push(path);
    }

    const handleNewProjectCreated = ()=>{
        refetch();
    }


    return (
        <>
        <Navbar/>
        <Wrapper>
            <BoardTopWrapper>
                <div id='boardName'>Project</div>
                <button onClick={handleModal} id="forNew">New</button>
                {isVisible && <NewProject userData={data} onProjectCreated={handleNewProjectCreated}/>}
            </BoardTopWrapper>
            
            <BoardWrapper>
                <Attribute>title</Attribute>

                {dataP && dataP.map(data=>(
                <Project key={data.projectId} onClick={()=>{
                    handleClick(`/project/${data.projectId}`)
                    localStorage.setItem('projectId', data.projectId.toString())
                    localStorage.setItem('projectName', data.title)
                    }}>
                    <div>{data.title}</div>
                </Project>
            ))}
            </BoardWrapper>
        </Wrapper>
        </>
    );
};

export default Projects;

const Wrapper=styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
font-family: "K2D", sans-serif;
margin: 100px 100px 0 100px;

#boardName{
    font-size:50px;

}
`

const BoardTopWrapper=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-end;
`

const BoardWrapper=styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    margin-top: 10px;

`

const Attribute = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 50px;
border-top: 1.5px solid black;
border-bottom: 1.5px solid black;

`

const Project=styled.div`
display: flex;
align-items: center;
height: 50px;
padding: 10px;
border-bottom: 1px solid#CFCFCF;
cursor: pointer;

&:hover{
    background-color:#ebe9e9;
}
    
`

