import React,{useState} from 'react';
import styled from 'styled-components';
import { members } from '@/mocks/mockData';
import { issuePriority } from '@/recoil/issueState';
import { useRecoilState } from 'recoil';

interface InputProps{
    place: string;
    value: string;
}


const priorities = ["Major", "Critical", "Blocker", "Minor", "Trivial"];


const PriorityToggle: React.FC<InputProps> = ({place, value}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [issuePrior, setIssuePrior] = useRecoilState(issuePriority);

    const handleToggle = ()=>{
        setIsVisible(!isVisible);
    }


    const toggleItem = (issuePrior:string) =>{
        setIssuePrior(issuePrior);
    }


    return (
        <>
        <InputWrapper>
            <div>Priority</div>
                <div id='input' className='forModal'>
                    <div id='toggle'>{issuePrior?issuePrior:place}</div>
                    <div id='toggleButton' >{isVisible ? '▲' : '▼'}</div>
                </div>
        </InputWrapper>
        

        <ToggleContainerM isVisible={isVisible}>
        {priorities.map(priority=>(
            <ToggleItem key={priority} onClick={() => toggleItem(priority)}>
                <div>{priority}</div>
            </ToggleItem>
        ))}
        </ToggleContainerM> 
    </>
    );
};

export default PriorityToggle;

const InputWrapper = styled.div`
text-align: left;
font-size: 20px;
margin-bottom: 30px;

#input{
    display: flex;
    height:50px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1.5px solid black;

    #toggle{
        font-size: 15px;
        margin: 5px 0;
        color: #757575;
    }

    #toggleButton{
        cursor: pointer;
    }  

}

.forModal{
    width:100%;
}

.forRegister{
    width:500px;
}
`



const ToggleContainer = styled.div<{isVisible:boolean}>`
    display: ${({ isVisible}) => (isVisible ? 'block':'none')};
    text-align: left;
    position: absolute;
    width: 500px;
    top: 650px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.1);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;

`

const ToggleContainerM=styled(ToggleContainer)`
    top: 360px;
    width: 330px;
    overflow: auto;

`


const ToggleItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid#CFCFCF;
    padding: 0 20px;
    cursor: pointer;
    height: 36px;


    &:hover{
    background-color:#ebe9e9;
}

`

