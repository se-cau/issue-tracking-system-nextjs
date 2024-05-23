import React,{useState} from 'react';
import styled from 'styled-components';
import { members } from '@/mocks/mockData';
import { typeColor } from '@/styles/color';
import { useRecoilState } from 'recoil';
import { memberState, roleState } from '@/recoil/state';

interface InputProps{
    text: string;
    place: string;
    modal: boolean;
}

const items:{name:string, type:string, color:string}[]=[
    {name:'Admin', type:'admin', color:'black'},
    {name:'Developer', type:'dev', color:'#21A2FF'},
    {name:'Project Leader', type:'pl', color:'#FF9E59'},
    {name:'Tester', type:'test', color:'#4BDD62'}
]

const priorities = ["major", "critical", "blocker", "minor", "trivial"];


const InputToggle: React.FC<InputProps> = ({text, place, modal}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [role, setRole] = useRecoilState(roleState);
    // const [member, setMember] = useRecoilState<string[]>(memberState);

    const handleToggle = ()=>{
        setIsVisible(!isVisible);
    }

    const handleRole = (item:string)=>{
        setRole(item);
        setIsVisible(false); 
    }


    const [selectedItems, setSelectedItems] = useRecoilState<string[]>(memberState);

    const toggleItem = (id:string) => {
        setSelectedItems((prevSelectedItems:string[]) =>
            prevSelectedItems.includes(id)
            ? prevSelectedItems.filter((itemId:string) => itemId !== id)
            : [...prevSelectedItems, id]
        );
    };

    const selectToggle = () =>{
        setIsVisible(!isVisible); 

    }


    return (
        <>
        <InputWrapper>
            <div>{text}</div>
            {modal?
                <div id='input' className='forModal'>
                    <div id='toggle'>{selectedItems ? selectedItems+ "  " : place}</div>
                    <div id='toggleButton' onClick={selectToggle}>{isVisible  ? '▲' : '▼'}</div>
                </div>
            :
                <div id='input' className='forRegister'>
                    <div id='toggle'>{role?role:place}</div>
                    <div id='toggleButton' onClick={handleToggle}>{isVisible ? '▲' : '▼'}</div>
                </div>
            }
        </InputWrapper>
        
        {modal?
        <ToggleContainerM isVisible={isVisible}>
        {members.map(member=>(
            <li key={member.id}>
                <label>
                    <input
                    type="checkbox"
                    className = "checkbox"
                    checked={selectedItems.includes(member.id)}
                    onChange={() => toggleItem(member.id)}/>
                    <ToggleItem>
                        <div>{member.id}</div>
                        <ToggleRole color={typeColor[member.type]}>{member.type}</ToggleRole>
                    </ToggleItem>
                    
                </label>
            </li>
        ))}
        </ToggleContainerM>

        :
        <ToggleContainer isVisible={isVisible}>
        {items.map(item=>(
            <ToggleItem key={item.type} onClick={() => handleRole(item.name)}>
                <div>{item.name}</div>
                <ToggleRole color={item.color} >{item.type}</ToggleRole>
            </ToggleItem>
        ))}
        </ToggleContainer> 
    
        }
    </>
    );
};

export default InputToggle;

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
    top: 390px;
    width: 330px;
    height: 228px;
    overflow: auto;

`


const ToggleItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid#CFCFCF;
    padding: 0 20px;
    cursor: pointer;


    &:hover{
    background-color:#ebe9e9;
}

`

const ToggleRole = styled.div<{color:string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    margin: 10px 0;
    color: white;
    width: 60px;
    

    border-radius: 30px;
    background-color: ${props=>props.color};
    
`