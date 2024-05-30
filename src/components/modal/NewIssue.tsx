import React,{useState} from 'react';
import styled from 'styled-components';
import Input from '../Input';
import SubmitBtn from '../button/SubmitBtn';
import {useRecoilState} from 'recoil';
import { modalState } from '@/recoil/state';
import InputDesc from '../input/InputDesc';
import PriorityToggle from '../input/PriorityToggle';
import { NewIssue } from '@/types/type';
import { issueTitleState, issuePriority, issueDescState } from '@/recoil/issueState';
import useCreateNewIssue from '@/hooks/createNewIssue';

interface IssueProps {
    onIssueCreated: () => void;
}

const NewIssue = ({onIssueCreated }: IssueProps) => {
    const [issueTitle, setIssueTitle] = useRecoilState(issueTitleState);
    const [issuePrior, setIssuePrior] = useRecoilState(issuePriority);
    const [issueDesc, setIssueDesc] = useRecoilState(issueDescState);

    const {create, error, data} = useCreateNewIssue();

    const [isVisible, setVisiable] = useRecoilState(modalState);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const userId = parseInt(localStorage.getItem('userId')||'0', 10);

        const newIssue: NewIssue  = {
            title: issueTitle,
            description: issueDesc,
            priority: issuePrior,
            status: 'NEW',
            userid: userId,
            assigneeid: 0,
        }
        

        await create(newIssue);

        if(!error){
            alert("성공적으로 생성했습니다.") ;
            setVisiable(false); 
            onIssueCreated();
            setIssueTitle('');
            setIssuePrior('');
            setIssueDesc('');
        }
        else{
            alert(error);
        }
    }

    const handleClose = ()=>{
        setVisiable(false);
    }

    const handleModalClick=(e: React.MouseEvent)=>{
        e.stopPropagation();
    }

    return (
        <ModalWrapper isVisible={isVisible} onClick={handleClose} >
                <ModalContainer isVisible={isVisible} onClick={handleModalClick}>
                    <form onSubmit={handleSubmit}>
                    <div id='modalName'>New Issue</div>
                    <Input text='Title' type='text' place={`Enter the issue title`} modal value={issueTitle} onChange={(e)=>setIssueTitle(e.target.value)}/>
                    <PriorityToggle place='Choose the Priority' value={issuePrior}/>
                    <InputDesc place='Write issue description' value={issueDesc} onChange={(e)=>setIssueDesc(e.target.value)}/>

                    <div id='button'>
                        <button type="submit">
                            <SubmitBtn text='Create' path='/project' success={!!data} error={error}/>
                        </button>
                    </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                </ModalContainer>
            </ModalWrapper>
    );
};

export default NewIssue;


const ModalWrapper= styled.div<{isVisible:boolean}>`
display: ${({isVisible}) => (isVisible ? 'flex':'none')};
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.16);
z-index: 999; 
display: flex;
justify-content: center;
align-items: center;
`

const ModalContainer = styled.div<{isVisible:boolean}>`
display: ${({isVisible}) => (isVisible ? 'flex':'none')};
flex-direction:column;
width:400px;
height: 600px;
background-color: white;
box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);;
border-radius: 50px;
z-index: 1000;
padding: 40px; 

#modalName{
    font-size: 35px;
    margin:10px 0 30px;
}

#button{
    display: flex;
    justify-content: center;
    align-items: center;

    div{
        width: 200px;
    }
}

`