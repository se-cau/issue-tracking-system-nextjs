import React,{useState} from 'react';
import styled from 'styled-components';

interface ButtonProps {
    text: string;
    place: string;
}



const Button: React.FC<ButtonProps> = ({text, place}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [role, setRole] = useState<string | null>(null);

    const handleToggle = ()=>{
        setIsVisible(!isVisible);
    }

    const handleRole = (item:string)=>{
        setRole(item);
        setIsVisible(false);
    }


    return (
        <>
        <InputWrapper>
            <div>{text}</div>
            <ToggleWrapper>
                <div id='toggle'>{role?role:place}</div>
                <div id='toggleButton' onClick={handleToggle}>{isVisible ? '▲' : '▼'}</div>
            </ToggleWrapper>
        </InputWrapper>
        <ToggleContainer isVisible={isVisible}>
            <ToggleItem color='black' onClick={() => handleRole('Admin')}>Admin</ToggleItem>
            <ToggleItem color='#21A2FF' onClick={() => handleRole('Dev')}>Dev</ToggleItem>
            <ToggleItem color="#FF9E59" onClick={() => handleRole('Pl')}>PL</ToggleItem>
            <ToggleItem color='#4BDD62' onClick={() => handleRole('Tester')}>Tester</ToggleItem>
        </ToggleContainer>
    </>
    );
};

export default Button;

const InputWrapper = styled.div`
text-align: left;
font-size: 20px;
`

const ToggleWrapper = styled.div`
    display: flex;
    width: 500px;
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

`

const ToggleContainer = styled.div<{isVisible:boolean}>`
    display: ${({ isVisible}) => (isVisible ? 'block':'none')};
    text-align: left;
    position: absolute;
    width: 500px;
    top: 652px;
    padding: 0 20px 20px 20px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.1);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`
const ToggleItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    margin-top: 10px;
    color: white;
    width: 70px;
    cursor: pointer;
    

    border-radius: 10px;
    background-color: ${props=>props.color};

`