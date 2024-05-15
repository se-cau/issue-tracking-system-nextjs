import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    text: string;
    place: string;
    type: string;
}


const Button: React.FC<ButtonProps> = ({text, place, type}) => {

    return (
        <InputWrapper>
            <div>{text}</div>
            <input placeholder={place} type={type}></input>
        </InputWrapper>
    );
};

export default Button;

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