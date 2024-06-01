import React ,{useState, useEffect} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import NewIssue from '@/components/modal/NewIssue';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/state';
import { IssueInfo,Status,StatusType, CommentInfo } from '@/types/type';
import useFetchIssue from '../../hooks/useFetchIssue';
import Navbar from '@/components/nav/Navbar';
import useFetchComment from '@/hooks/useFetchComment';
import OverView from '@/components/OverView';


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
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    })

    const fetchCommentData = (data: any): CommentInfo => ({
        id: data.id,
        message: data.message,
        authorId: data.authorId,
        createdAt: data.createdAt,
        username: data.username,
        role: data.role
    });

    const router = useRouter();
    const endpoint = '/issues'; 
    const {data, loading, error, refetch} = useFetchIssue<IssueInfo>(endpoint, fetchIssueData);
    const endpointC = '/comments';
    const { comments, loadingC: loadingComments, errorC: errorComments, refetchC} = useFetchComment<CommentInfo>(endpointC, fetchCommentData);


    const [isVisible, setVisiable] = useRecoilState(modalState);
    const [projectName, setProjectname] = useState<string|null>(null);
    const [projectId, setProjectId] = useState<string>('');

    useEffect(()=>{
        if (typeof window!== 'undefined'){
            setProjectname(localStorage.getItem('projectName'));
            const storedProjectId = localStorage.getItem('projectId');

        if (storedProjectId !== null) {
            setProjectId(storedProjectId);
        }
    }

    })

    const handleModal = ()=>{
        setVisiable(true);
    }

    const handleClick = (path:string)=>{
        router.push(path);
    }

    const handleNewIssueCreated = ()=>{
        refetch();
    }
    


    const [isHovered, setIsHovered] = useState(false);
    const[statusFilter, setStatusFilter] = useState<StatusType | null>(null);
    const filteredData = statusFilter ? data?.filter(issue => issue.status===statusFilter):data;


    const handleMouseHover = ()=>{
        setIsHovered(true)
    }
    const handleMouseLeave=()=>{
        setIsHovered(false);
    }

    const handleStatus =(status:StatusType)=>{
        setStatusFilter(status==="ALL" ? null : status);
        console.log(status);
    }

    const getCommentCount = (issueId: number) => {
        return comments?.filter((comment:any) => comment.issueId === issueId).length || 0;
    };

    const changeStatus = (issueId:number) =>{
        
    }


    return (
        <>
        <Navbar/>
        <Wrapper>
            <BoardTopWrapper>
                <div id='topWrapper'>
                    <div id='projectName'>Project Title | {projectName}</div>
                    <OverView />
                    <div id='boardName'>Issues</div>
                </div>
            </BoardTopWrapper>
                
                
                <ButtonWrapper>
                    <div id="buttons">
                    {isHovered && (
                        <HoverWrapper onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave}>
                            {Status.map((status, i)=>(
                                <button key={status} onClick={()=>handleStatus(status)}>{status}</button>
                            ))}
                        </HoverWrapper>
                    )}
                        <ButtonSearch onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave}>상태별 이슈</ButtonSearch>
                        <button onClick={handleModal} id="forNew">+</button>
                        {isVisible&&(<NewIssue onIssueCreated={handleNewIssueCreated}/>)}
                    </div>
                </ButtonWrapper>
            
            <BoardWrapper>
                <Attribute>
                    <div className='atr'>title</div>
                    <div className='atr'>state</div>
                    <div className='atr'>reporter</div>
                    <div className='atr'>assignee</div>
                    
                </Attribute>

                {filteredData && filteredData.map(item=>(
                <Issue key={item.id} onClick={()=>{
                    handleClick(`/issue/${item.id}`)
                    localStorage.setItem('issueId', item.id.toString())
                    }}>
                    <div className='item'>{item.title}</div>
                    <div className='item'>{item.status}</div>
                    <div className='item'>{item.reporter}</div>
                    <div className='item'>{item.assignee}</div>
                </Issue>
            ))}
            </BoardWrapper>
        </Wrapper>
        </>
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
width: 100%;
#topWrapper{
    width: 100%;
}
#projectName{
    font-size: 20px;
}
`

const BoardWrapper=styled.div`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    margin-top: 10px;

`

const HoverWrapper = styled.div`
display: flex;
position: relative;
flex-wrap: wrap;
justify-content: center;
align-items: end;

button{
    display: flex;
    margin: 0 5px;
    font-size: 8px;
    width: 60px;
    border-radius: 50%;
}



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
flex-direction: column;
align-items: end;
justify-content: end;
width:100%;


#buttons{
    display: flex;
}

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

