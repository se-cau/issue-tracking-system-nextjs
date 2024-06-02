import React,{useState} from 'react';
import styled from 'styled-components';
import Input from '../Input';
import AssigneeToggle from '../input/AssigneeToggle';
import Button from '../Button';
import {useRecoilState} from 'recoil';
import { modalState } from '@/recoil/state';
import useFetchCandidate from '@/hooks/useFetchCandidate';
import { CandidateInfo } from '@/types/type';
import { assigneeState, assigneeIdState } from '@/recoil/projectState';

interface SelectAssigneeProps {
    assigneeList: string[];
    assigneeListId: number[];
    status: string;
    priority: string;
    title: string;
    description: string;
}

const fetchCandidateData = (data:any):CandidateInfo => ({
    userId: data.userId,
    username: data.username,
    role: data.role

})


const SelectAssignee: React.FC<SelectAssigneeProps> = ({ assigneeList, assigneeListId, title, description, priority, status }) => {
    const [isVisible, setVisiable] = useRecoilState(modalState);
    const [assignee, setAssignee] = useRecoilState<string>(assigneeState);
    const [assigneeId, setAssigneeId] = useRecoilState<number>(assigneeIdState);

    console.log(assignee);

    const endpoint = '/issues/candidates';
    const {candidate, loading, error} = useFetchCandidate<CandidateInfo>(endpoint, fetchCandidateData);

    const handleClose = ()=>{
        setVisiable(false);
    }

    const handleModalClick=(e: React.MouseEvent)=>{
        e.stopPropagation();
    }

    const handleSubmit = async() =>{
        const id = localStorage.getItem('issueId');
        const userId = localStorage.getItem('userId');

        try {

            const url = `http://ec2-43-203-119-113.ap-northeast-2.compute.amazonaws.com/api/v1/issues/assignees?issueId=${id}`;
            const issueData = {
                title: title.toString(),  
                description: description.toString(),
                priority: priority.toString(),
                status: status.toString(),
                userId: userId ? Number(userId) : 0,
                assigneeId: assigneeId ? Number(assigneeId) : 0 
            };

            console.log(issueData);
            console.log(url);

            const response = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(issueData)

            });

            if(!response.ok){
                const errorText = await response.json();
                const errorCode = errorText.code;
                const errorMessage = errorText.message;
                console.error(errorText);
                throw new Error(`${errorMessage} ${errorCode} `);
                
                
            }
            const result = await response;
            console.log(result);
            alert("성공적으로 제출하였습니다.");


        } catch (error) {
            console.log('Error updating issue status', error);
            // alert(error);
            alert("담당자 배정은 PL의 권한입니다.");
        }
    }

    return (
        <ModalWrapper isVisible={isVisible} onClick={handleClose} >
                <ModalContainer isVisible={isVisible} onClick={handleModalClick}>

                    <div id='modalName'>Select Assignee</div>
                    <CandidateWrapper>
                        <div>Best Candidate</div>
                        {candidate?
                        <div id='item'> {candidate.username} </div> :
                        <div id='item'> 미배정 </div> 
                        }
                    </CandidateWrapper>
                    <AssigneeToggle datas={assigneeList} idData={assigneeListId} text='Assignee' place='Choose the assignee' modal/>
                    
                    {isVisible&&
                        <div id='button'>
                        <div onClick={handleSubmit}>
                            <Button type='submit' text='Complete' path='/project'/>
                        </div>
                    </div>
                    }
                    
                </ModalContainer>
            </ModalWrapper>
    );
};

export default SelectAssignee;


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
height: 550px;
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
    padding-top: 130px;
    div{
        width: 200px;
    }
}

`
const CandidateWrapper=styled.div`
text-align: left;
font-size: 20px;
margin-bottom: 30px;
border-bottom: 1.5px solid black;


#item{
    display: flex;
    align-items: center;
    height:50px;
    font-size: 15px;
    margin: 5px 0;
    color: grey;
}
`