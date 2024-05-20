import React from 'react';
import styled from 'styled-components';

interface InputProps {
    text: string;
    place: string;
    type: string;
    modal: boolean
}


const InputDesc=() => {

    return (
        <InputWrapper>
            <div>Description</div>
            <textarea id='input' placeholder="Add the issue description"></textarea>
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