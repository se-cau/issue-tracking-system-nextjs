import React,{useState} from 'react';
import styled from 'styled-components';
import Input from './Input';
import InputToggle from './InputToggle';
import Button from './Button';
import {useRecoilState} from 'recoil';
import { modalState } from '@/recoil/state';


interface ModalProps {
    type: string;
}


const Modal:React.FC<ModalProps> = ({type}) => {
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
                    {type=='project'?
                    <>
                    <div id='modalName'>New Project</div>
                    <Input text='Title' type='text' place={`Enter the ${type} title`} modal/>
                    <InputToggle text='Member' place='Choose the project member' modal/>
                    </>
                    :
                    <div>
                    <div id='modalName'>New Issue</div>
                    <Input text='Title' type='text' place={`Enter the ${type} title`} modal/>
                    <InputToggle text='Member' place='Choose the project member' modal/>
                    </div>
                    }
                    
                    <div id='button'>
                        <div onClick={handleClose}>
                            <Button text='Create' path='/project'/>
                        </div>
                    </div>

                </ModalContainer>
            </ModalWrapper>
    );
};

export default Modal;


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