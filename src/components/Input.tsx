import React from 'react';
import styled from 'styled-components';

interface InputProps {
    text: string;
    place: string;
    type: string;
}


const Input: React.FC<InputProps> = ({text, place, type}) => {

    return (
        <InputWrapper>
            <div>{text}</div>
            <input placeholder={place} type={type}></input>
        </InputWrapper>
    );
};

export default Input;

const InputWrapper = styled.div`
text-align: left;
font-size: 20px;
margin-bottom: 40px;


input{
    width: 500px;
    height:50px;
    font-size: 15px;
    margin: 5px 0;
    
    
    border-color: black;
    border-width:0 0 1.5px;
}
    
`