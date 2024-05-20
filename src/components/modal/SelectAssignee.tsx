import React,{useState} from 'react';
import styled from 'styled-components';
import Input from '../Input';
import InputToggle from '../InputToggle';
import Button from '../Button';
import {useRecoilState} from 'recoil';
import { modalState } from '@/recoil/state';

const SelectAssignee=() => {
    const [isVisible, setVisiable] = useRecoilState(modalState);

    const handleClose = ()=>{
        setVisiable(false);
    }

    const handleModalClick=(e: React.MouseEvent)=>{
        e.stopPropagation();
    }

    return (
        <ModalWrapper isVisible={isVisible} onClick={handleClose} >
                <ModalContainer isVisible={isVisible} onClick={handleModalClick}>

                    <div id='modalName'>Select Assignee</div>
                    <CandidateWrapper>
                        <div>Best Candidate</div>
                        <div id='item'> user01 </div>
                    </CandidateWrapper>
                    <InputToggle text='Assignee' place='Choose the assignee' modal/>
                    
                    <div id='button'>
                        <div onClick={handleClose}>
                            <Button text='Complete' path='/project'/>
                        </div>
                    </div>
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