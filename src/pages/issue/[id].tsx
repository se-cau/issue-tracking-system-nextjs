import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { typeColor } from '@/styles/color';
import InfoBox from '@/components/issue/InfoBox';
import { CommentInfo, IssueInfo, NewComment, NewIssueInfo, UpdateIssueInfo } from '@/types/type';
import useFetchIssueDetail from '../../hooks/useFetchIssueDetail';
import useFetchComment from '@/hooks/useFetchComment';
import useAddComment from '@/hooks/useAddComment';
import useDeleteComment from '@/hooks/useDeleteComment';
import { useRouter } from 'next/router';
import Navbar from '@/components/nav/Navbar';
import usePatch from '../../hooks/usePatch';

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

const fetchComment = (data:any):CommentInfo => ({
    id: data.id,
    message: data.message,
    authorId: data.authorId,
    createdAt: data.createdAt,
    username: data.username,
    role: data.role
})



const Issue = () => {
    const endpoint = '/issues/details'; 
    const {data, loading, error} = useFetchIssueDetail<IssueInfo>(endpoint, fetchIssueData);

    const endpointC = '/comments';
    const {comments:initialComment, loadingC, errorC, refetchC} = useFetchComment<CommentInfo>(endpointC, fetchComment);

    const [comments, setComments] = useState<CommentInfo[]>([]);
    const [messageC, setMessage] = useState('');
    const [issueId, setIssueId] = useState<string|null>(null);
    const [userId, setUserId] = useState<string|null>(null);
    const {create, errorA, dataA} = useAddComment();
    const deleteComment = useDeleteComment;
    const router = useRouter();

    useEffect(() => {
        if (initialComment){
            setComments(initialComment);
        }

        if (typeof window!== 'undefined'){
            setIssueId(localStorage.getItem('issueId'));
            setUserId(localStorage.getItem('userId'));
        }
    }, [initialComment]);


    const handleSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        const newComment: NewComment  = {
            message: messageC,
            userId: userId
        }
        createComment(newComment);
    }


    const createComment = async (newComment:NewComment) =>{
        const createdComment = await create(newComment);
        if(createdComment){
            setComments([...comments, createdComment]);
            setMessage('');
            refetchC();
            
        }
    }

    const handleDeleteComment = async (commentId:string) =>{
        try {
            const deleted = await deleteComment(commentId);
            if (deleted) {
                setComments(comments.filter(comment => comment.id !== Number(commentId)));
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleBack  = () =>{
        router.push(`/project/${localStorage.getItem('projectId')}`);
    }

    const getSafeString = (value: string | undefined): string => value ?? '';
    const getSafeNumber = (value: number | undefined): number => value ?? 0;

    const updateIssueInfo: UpdateIssueInfo = {
        title: getSafeString(data?.title),
        description: getSafeString(data?.description),
        priority: getSafeString(data?.priority),
        status: getSafeString(data?.status),
        userId: getSafeNumber(Number(userId)),
        assigneeId: getSafeNumber(Number(data?.assignee)) 
    }



    return (
        <>
        {data &&
        <>
            <Navbar/>
            <Wrapper>
            <BoardTopWrapper>
                <button id='arrow' onClick={handleBack}> ← back</button>
                <div id='boardName'> {data.title} </div>
            </BoardTopWrapper>

            <DescWrapper>
                <InfoBox infoType="State" data={data.status} patchData={updateIssueInfo} isAssigned={Number(data.assignee)} />
                <InfoBox infoType="Priority" data={data.priority} patchData={updateIssueInfo} isAssigned={Number(data.assignee)}/>
            </DescWrapper>

            <DescWrapper>
                <InfoBox infoType="Reporter" data={data.reporter} patchData={updateIssueInfo} isAssigned={Number(data.assignee)}/>
                <InfoBox infoType="Reported Date" data={data.createdAt} patchData={updateIssueInfo} isAssigned={Number(data.assignee)}/>
            </DescWrapper>

            <DescWrapper>
                <InfoBox infoType="Assignee" data={data.assignee} patchData={updateIssueInfo} isAssigned={Number(data.assignee)}/>
                <InfoBox infoType="Fixer" data={data.fixer} patchData={updateIssueInfo} isAssigned={Number(data.assignee)}/>
            </DescWrapper>

            <DescWrapper>
                <InfoBox infoType="Description" data={data.description} patchData={updateIssueInfo} isAssigned={Number(data.assignee)}/>
            </DescWrapper>

            <CommentWrapper>
                <form onSubmit={handleSubmit}>
                <InputBoxWrapper>
                    <div id='desc-type'>Comment</div>
                    <div id="comment-input-container">
                        <input id='comment-input' placeholder='댓글 추가...' value={messageC} onChange={(e)=>setMessage(e.target.value)}></input>
                        <button id="forIssue" type="submit">Submit</button>
                    </div>
                </InputBoxWrapper>
                </form>
                    
                <CommentBoxWrapper>
                    {comments&& comments.map(comment=>(
                        <div className='comment-container' key={comment.id}>
                            <CommentUser id="userType" color={typeColor[comment.role]}> 
                                <div id='user'>{comment.username}</div>
                                <div id='user-type'>{comment.role}</div>
                            </CommentUser>
                            <div id="contents"> {comment.message} </div>
                            <div id="contents"> {comment.createdAt} </div>
                            <button id="deleteBtn" onClick={() => handleDeleteComment(comment.id.toString())}> X </button>
                        </div>
                        ))}

                </CommentBoxWrapper>
                
            </CommentWrapper>
        </Wrapper>
        </>
        
        }
        </>

    );
};

export default Issue;


const Wrapper=styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
font-family: "K2D", sans-serif;
margin: 50px 100px 0 100px;

#boardName{
    font-size:50px;

}


`

const BoardTopWrapper=styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;

margin-bottom: 10px;

#arrow{
    margin-bottom: 50px;
    font-size: 20px;
    background-color: white;
    color: black;
    box-shadow: none;
    width: 100px;
}
`


const DescWrapper = styled.div`
display: flex;
flex-direction: row;
text-align: left;
font-size: 20px;
margin: 8px 0;

border-color: black;
border-width:0 0 1.5px;
border-bottom: solid 1.5px black;
font-weight: 500;


#comment-input{
    width: 100%;
    height: 50px;
    border-style: none;
}

`

const InputBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    #comment-input-container{
        display: flex;
        margin: 10px 0;
        
        input{
            height: 40px;
            border-radius: 10px;
            border: #CFCFCF solid 1.5px;
        }
    }

`
const CommentWrapper=styled(DescWrapper)`
    flex-direction: column;
`
const CommentBoxWrapper=styled.div`
.comment-container{
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 15px;
    border-bottom: solid 1.5px #CFCFCF;


    #contents{
        flex: 8;
        margin-left: 30px;
    }

    #deleteBtn{
        background-color: white;
        box-shadow: none;
        color: black;
        font-size: 15px;

    }
}
`

const CommentUser = styled.div<{color: string}>`
flex: 1.5;
display: flex;
justify-content: center;
align-items: center;
height: 36px;
margin: 10px 0;
width: 50px;
color: white;
width: 6px;

#user{
    flex:1;
    text-align: center;
    color: black;
}

#user-type{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: ${props=>props.color};
    height: 100%;

    border-radius: 10px;
    width: 100%;

}


`


