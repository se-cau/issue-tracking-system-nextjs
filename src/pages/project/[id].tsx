import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import NewIssue from '@/components/modal/NewIssue';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/state';
import { IssueInfo } from '@/types/type';
import useFetchIssue from '../../hooks/useFetchIssue';

const Issues = () => {
    const fetchIssueData = (data:any):IssueInfo => ({
        id: data.id,
        title: data.title,
        description: data.description,
        reporter: data.reporter,
        assignee: data.assignee,
        fixer: data.fixer,
        status: data.status,
        priority: data.priority,
        created_at: data.created_at,
        updated_at: data.updated_at
    })

    const router = useRouter();
    const query=router.query;
    const projectId = Number(query.id);
    const endpoint = '/issues'; 
    const {data, loading, error} = useFetchIssue<IssueInfo>(endpoint, fetchIssueData, projectId);
    console.log("project id:", projectId);


    const [isVisible, setVisiable] = useRecoilState(modalState);

    const handleModal = ()=>{
        setVisiable(true);
    }



    const handleClick = (path:string)=>{
        router.push(path);
    }


    return (
        <Wrapper>
            <BoardTopWrapper>
                <div id='boardName'>Issue</div>
                <ButtonWrapper>
                    <ButtonSearch>전체 검색</ButtonSearch>
                    <ButtonSearch>할당된 이슈</ButtonSearch>
                    <button onClick={handleModal} id="forNew">New</button>
                    {isVisible&&(<NewIssue />)}
                </ButtonWrapper>
                
            </BoardTopWrapper>
            
            <BoardWrapper>
                <Attribute>
                    <div className='atr'>title</div>
                    <div className='atr'>state</div>
                    <div className='atr'>reporter</div>
                    <div className='atr'>assignee</div>
                    
                </Attribute>

                {data && data.map(item=>(
                <Issue onClick={()=>{handleClick(`/issue/${item.id}`)}}>
                    <div className='item'>{item.title}</div>
                    <div className='item'>{item.status}</div>
                    <div className='item'>{item.reporter}</div>
                    <div className='item'>{item.assignee}</div>
                    
                </Issue>
            ))}
            </BoardWrapper>
        </Wrapper>
    );
};

export default Issues;



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

.atr{
    display:flex;
    justify-content: center;
}

.atr:nth-child(1){
    width: 50%;
}
.atr:nth-child(2){
    width: 20%;
}
.atr:nth-child(3),
.atr:nth-child(4){
    width: 15%;
}

`

const Issue=styled.div`
display: flex;
align-items: center;
height: 50px;
padding: 10px;
border-bottom: 1px solid#CFCFCF;
cursor: pointer;

&:hover{
    background-color:#ebe9e9;
}

.item{
    display:flex;
    justify-content: center;
}

.item:nth-child(1){
    width: 50%;
    justify-content: left;
}
.item:nth-child(2){
    width: 20%;
}
.item:nth-child(3),
.item:nth-child(4){
    width: 15%;
}


    
`

const ButtonWrapper=styled.div`
display: flex;
`

const ButtonSearch=styled.div`
display: flex;
width: 90px;
flex-direction: row;
align-items: center;
justify-content: center;
text-decoration: none;
cursor: pointer;

height: 40px;
background-color: white;
color: black;
border: black solid 2px;
border-radius: 10px;
margin-right:7px;
font-weight: 600;
`

