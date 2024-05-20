import React from 'react';
import styled from 'styled-components';


interface InputProps {
    infoType: string;
    data: string;
}

const InfoBox: React.FC<InputProps> = ({infoType, data}) => {
    return (
        <DescBoxWrapper>
            <div id='desc-container'>
                <div>{infoType}</div>
                {infoType=="State" &&
                    <div id="change">변경</div>}
            </div>
            <div className='forDesc'>{data}</div>
        </DescBoxWrapper>
    );
};

export default InfoBox;



const DescBoxWrapper = styled.div`
flex: 1;

#desc-container{
    display: flex;
    align-items: center;
}

.forDesc{
    display: flex;
    align-items: center;
    
    height:50px;
    font-size: 15px;
    font-weight: 400;
}

#change{
    border-bottom: 1px solid gray;
    font-size: 13px;
    color: gray;
    cursor: pointer;
    margin-left: 10px;
}


    

`