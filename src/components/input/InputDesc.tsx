import React from 'react';
import styled from 'styled-components';

interface InputProps {
    place: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const InputDesc: React.FC<InputProps> = ({place, value, onChange}) => {

    return (
        <InputWrapper>
            <div>Description</div>
            <input type='textarea' id='input' placeholder="Add the issue description" value={value} onChange={onChange}/>
        </InputWrapper>
    );
};

export default InputDesc;

const InputWrapper = styled.div`
text-align: left;
font-size: 20px;
margin-bottom: 10px;


#input{
    height:100px;
    font-size: 15px;

    margin: 15px 0;
    width: 100%;

    border-color: black;
    border-width:0 0 1.5px;
}


`