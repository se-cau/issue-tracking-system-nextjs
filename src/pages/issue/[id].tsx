import React from 'react';
import styled from 'styled-components';
import { typeColor } from '@/styles/color';
import InfoBox from '@/components/issue/InfoBox';
import { CommentInfo, IssueInfo } from '@/types/type';
import useFetchIssueDetail from '../../hooks/useFetchIssueDetail';
import useFetchComment from '@/hooks/useFetchComment';


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

const fetchComment = (data:any):CommentInfo => ({
    id: data.id,
    message: data.message,
    authorid: data.authorid,
    created_at: data.created_at,
})


const Issue = () => {
    const endpoint = '/issues/details'; 
    const {data, loading, error} = useFetchIssueDetail<IssueInfo>(endpoint, fetchIssueData);


    console.log(data);

    const endpointC = '/comments';
    const {comments, loadingC, errorC} = useFetchComment<CommentInfo>(endpointC, fetchComment);

    // const comments = [{
    //     userId: "user1",
    //     userType: "Pl",
    //     contents: "일을 열심히 하세요",
    // },{
    //     userId: "user02",
    //     userType: "Dev",
    //     contents: "싫어요. 나는야 배짱이가 될래요",
    // },{
    //     userId: "user03",
    //     userType: "Tester",
    //     contents: "인생 날로 먹고 싶네요",
    // }
    // ]


    return (
        <>
        {data &&
            <Wrapper>
            <BoardTopWrapper>
            <div id='boardName'>Issue {data.title} </div>
            </BoardTopWrapper>

            <DescWrapper>
                <InfoBox infoType="State" data={data.status} />
                <InfoBox infoType="Priority" data={data.priority} />
            </DescWrapper>

            <DescWrapper>
                <InfoBox infoType="Reporter" data={data.reporter} />
                <InfoBox infoType="Reported Date" data={data.created_at} />
            </DescWrapper>

            <DescWrapper>
                <InfoBox infoType="Assignee" data={data.assignee} />
                <InfoBox infoType="Fixer" data={data.fixer} />
            </DescWrapper>

            <DescWrapper>
                <InfoBox infoType="Description" data={data.description} />
            </DescWrapper>

            <CommentWrapper>
                <InputBoxWrapper>
                    <div id='desc-type'>Comment</div>
                    <div id="comment-input-container">
                        <input id='comment-input' placeholder='댓글 추가...'></input>
                        <button id="forIssue">Submit</button>
                    </div>
                </InputBoxWrapper>
                    
                <CommentBoxWrapper>
                    {comments&& comments.map(comment=>(
                        <div id='comment-container'>
                            <CommentUser id="userType" color={typeColor['Pl']}> 
                                <div id='user'>{comment.id}</div>
                                <div id='user-type'>role</div>
                            </CommentUser>
                            <div id="contents"> {comment.message} </div>
                        </div>
                        ))}

                </CommentBoxWrapper>
            </CommentWrapper>
        </Wrapper>
        
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

margin-bottom: 10px;
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
#comment-container{
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 15px;
    border-bottom: solid 1.5px #CFCFCF;


    #contents{
        flex: 8;
        margin-left: 30px;
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


