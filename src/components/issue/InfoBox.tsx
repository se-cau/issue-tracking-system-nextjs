import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/state';
import SelectAssignee from '../modal/SelectAssignee';
import usePatch from '@/hooks/usePatch';
import { UpdateIssueInfo } from '@/types/type';


interface InputProps {
    infoType: string;
    data: string;
    patchData: UpdateIssueInfo;
}

const InfoBox: React.FC<InputProps> = ({infoType, data, patchData}) => {
    const [isVisible, setVisiable] = useRecoilState(modalState);

    const handleAssignee = ()=>{
        setVisiable(true);
    }

    const updatedIssueData:UpdateIssueInfo={
        title: patchData.title,
        description: patchData.description,
        priority: patchData.priority,
        status: patchData.status,
        userId: Number(patchData.userId),
        assigneeId: patchData.assigneeId,
    }

    const handleStatusUpdate = async () =>{
        try{
            const updatedIssue = await usePatch('issues/status', Number(issueId), updatedIssueData);
            console.log('Updated Issue:', updatedIssue);
        } catch(error){
            console.error('Error updating issue status', error);
        }
    
    }

    const [issueId, setIssueId] = useState<string|null>(null);
    useEffect(() => {
        if (typeof window!== 'undefined'){
            setIssueId(localStorage.getItem('issueId'));
        }
    }, [setIssueId]);


    return (
        <DescBoxWrapper>
            <div id='desc-container'>
                <div>{infoType}</div>
                {infoType=="State" &&
                    <div id="change" onClick={() => handleStatusUpdate()}>변경</div>}
                {infoType=="Assignee" &&
                    <div id="change" onClick={handleAssignee}>변경</div>}
                    {isVisible&&(
                    <SelectAssignee />)}
            </div>
            <div className='forDesc'>
                {data}
            </div>
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