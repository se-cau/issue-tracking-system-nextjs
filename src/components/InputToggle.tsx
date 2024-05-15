import React,{useState} from 'react';
import styled from 'styled-components';

interface InputProps {
    text: string;
    place: string;
}

const items:{name:string, type:string, color:string}[]=[
    {name:'Administrator', type:'admin', color:'black'},
    {name:'Developer', type:'dev', color:'#21A2FF'},
    {name:'Project Leader', type:'pl', color:'#FF9E59'},
    {name:'Tester', type:'test', color:'#4BDD62'}
]


const InputToggle: React.FC<InputProps> = ({text, place}) => {
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
            {items.map(item=>(
                <ToggleItem key={item.type} onClick={() => handleRole(item.name)}>
                    <div>{item.name}</div>
                    <Role color={item.color} >{item.type}</Role>
                </ToggleItem>
            ))}
        </ToggleContainer>
    </>
    );
};

export default InputToggle;

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
    top: 650px;
    background-color: white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.1);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`
const ToggleItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1.5px solid#757575;
    padding: 0 20px;

`

const Role = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    margin: 10px 0;
    color: white;
    width: 60px;
    cursor: pointer;

    border-radius: 10px;
    background-color: ${props=>props.color};
    
`