import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/state';
import SelectAssignee from '../modal/SelectAssignee';


interface InputProps {
    infoType: string;
    data: string;
}

const InfoBox: React.FC<InputProps> = ({infoType, data}) => {
    const [isVisible, setVisiable] = useRecoilState(modalState);

    const handleClick = ()=>{
        window.alert("상태가 변경되었습니다");
    }

    const handleAssignee = ()=>{
        setVisiable(true);
    }

    return (
        <DescBoxWrapper>
            <div id='desc-container'>
                <div>{infoType}</div>
                {infoType=="State" &&
                    <div id="change" onClick={handleClick}>변경</div>}
                {infoType=="Assignee" &&
                    <div id="change" onClick={handleAssignee}>변경</div>}
                    {isVisible&&(
                    <SelectAssignee />)}
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