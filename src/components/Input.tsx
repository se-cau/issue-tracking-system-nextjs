import React from 'react';
import styled from 'styled-components';

interface InputProps {
    text: string;
    place: string;
    type: string;
    modal: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const Input: React.FC<InputProps> = ({text, place, type, modal, value, onChange}) => {

    return (
        <InputWrapper>
            <div>{text}</div>
            {modal?
            <input 
            id='input' 
            className='forModal' 
            placeholder={place} 
            type={type}
            value = {value}
            onChange={onChange}/>
            :
            <input 
            id='input' 
            className='forRegister' 
            placeholder={place} 
            type={type}
            value={value}
            onChange={onChange}/>
            }
            
        </InputWrapper>
    );
};

export default Input;

const InputWrapper = styled.div`
text-align: left;
font-size: 20px;
margin-bottom: 30px;


#input{
    height:50px;
    font-size: 15px;
    margin: 5px 0;
    
    
    border-color: black;
    border-width:0 0 1.5px;
}

.forModal{
    width:100%;

}
.forRegister{
    width: 500px;
}
`