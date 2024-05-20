import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { typeColor } from '@/styles/color';
import InfoBox from '@/components/issue/InfoBox';

const Issue = () => {
    const router = useRouter();
    const {id, query} = router.query;

    const data = {
        title: "Issue 123",
        state: "fixed",
        priority: "Major",
        reporter: "ccc",
        reportedDate: "2024.03.05",
        assginee: "ddd",
        fixer: "aaa",
        description: "이렇게 저렇게 바꿔 주세요",
    }

    const comments = [{
        userId: "user1",
        userType: "pl",
        contents: "일을 열심히 하세요",
    },{
        userId: "user02",
        userType: "dev",
        contents: "싫어요. 나는야 배짱이가 될래요",
    },{
        userId: "user03",
        userType: "test",
        contents: "인생 날로 먹고 싶네요",
    }
    ]


    return (
        <Wrapper>
            <BoardTopWrapper>
            <div id='boardName'>Issue {id} </div>
            </BoardTopWrapper>

            <DescWrapper>
                <InfoBox infoType="State" data={data.state} />
                <InfoBox infoType="Priority" data={data.priority} />
            </DescWrapper>

            <DescWrapper>
                <InfoBox infoType="Reporter" data={data.reporter} />
                <InfoBox infoType="Reported Date" data={data.reportedDate} />
            </DescWrapper>

            <DescWrapper>
                <InfoBox infoType="Assignee" data={data.assginee} />
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
                    {comments.map(comment=>(
                        <div id='comment-container'>
                            <CommentUser id="userType" color={typeColor[comment.userType]}> 
                                <div id='user'>{comment.userId}</div>
                                <div id='user-type'>{comment.userType}</div>
                            </CommentUser>
                            <div id="contents"> {comment.contents} </div>
                        </div>
                        ))}

                </CommentBoxWrapper>
            </CommentWrapper>
        </Wrapper>
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


