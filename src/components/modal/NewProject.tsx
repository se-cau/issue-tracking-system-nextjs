import React from 'react';
import styled from 'styled-components';
import Input from '../Input';
import InputToggle from '../InputToggle';
import {useRecoilState} from 'recoil';
import { modalState } from '@/recoil/state';
import { titleState, memberState } from '@/recoil/state';
import createNewProject from '@/hooks/createNewProject';
import SubmitBtn from '../button/SubmitBtn';


const NewProject = () => {
    const [projectTitle, setTitle] = useRecoilState(titleState);
    //member = contributer
    const [member, setMember] = useRecoilState(memberState);
    const userId = parseInt(localStorage.getItem('userId')||'0');

    const {create, loading, error, data} = createNewProject();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await create(projectTitle, member, userId);
    };

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
                    <form onSubmit={handleSubmit}>
                    <div id='modalName'>New Project</div>
                    <Input text='Title' type='text' place={`Enter the project title`} modal value={projectTitle} onChange={(e)=>setTitle(e.target.value)}/>
                    <InputToggle text='Member' place='Choose the project member' modal/>
                    
                    <div id='button'>
                        {/* <div onClick={handleClose}> */}
                            <SubmitBtn text='Create' path='/project'loading={loading} success={!!data} error={error}/>
                        {/* </div> */}
                    </div>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {data && <p style={{ color: 'green' }}>Login successful!</p>}

                </ModalContainer>
            </ModalWrapper>
    );
};

export default NewProject;


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
    position: absolute;
    left: 625px;
    top: 540px;
    padding-top: 130px;
    z-index: 3;
    div{
        width: 200px;
    }
}

`