import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/state';
import SelectAssignee from '../modal/SelectAssignee';
import  usePatch from '@/hooks/usePatch';
import { UpdateIssueInfo, ProjectInfo } from '@/types/type';
import { projectState } from '@/recoil/projectState';
import { contributerId } from '../../recoil/state';
import useFetchProject from '@/hooks/useFetchProject';
interface InputProps {
    infoType: string;
    data: string;
    patchData: UpdateIssueInfo;
    isAssigned: number;
}

const fetchProjectData = (data:any):ProjectInfo=>({
    projectId: data.projectId,
    title: data.title,
    adminName: data.adminName,
    contributorNames: data.contributorNames

})

const InfoBox: React.FC<InputProps> = ({infoType, data, patchData, isAssigned}) => {
    const [isVisible, setVisiable] = useRecoilState(modalState);
    const [issueId, setIssueId] = useState<string|null>(null);
    const [projectId, setProjectId] = useState<string|null>(null);
    const [userId, setUserId] = useState<string|null>(null);

    const patchStatus = usePatch('issues/status', issueId ? Number(issueId) : 0)

    const [projects, setProjects] = useRecoilState<ProjectInfo[]>(projectState);

    const endpointP = '/projects';
    const {dataP, loadingP, errorP, refetch} = useFetchProject<ProjectInfo>(endpointP, fetchProjectData, Number(userId));

    useEffect(() => {
        if (typeof window!== 'undefined'){
            setIssueId(localStorage.getItem('issueId'));
            setProjectId(localStorage.getItem('projectId'));
            setUserId(localStorage.getItem('userId'));
        }

        if (dataP) {
            setProjects(dataP);
        }

    }, [dataP, setProjects, setIssueId, setProjectId]);
    

    const contributerPerPj =  projects
    ? (projects as ProjectInfo[])
    .filter((item:ProjectInfo) => item.projectId===Number(projectId))
    .map((item:ProjectInfo) => item.contributorNames) 
    :[0, 1];

    console.log(contributerPerPj);


    const handleAssignee = ()=>{
        setVisiable(true);
    }



    const handleStatusUpdate = async () =>{
        try{
            const updatedIssueData:UpdateIssueInfo={
                title: patchData.title,
                description: patchData.description,
                priority: patchData.priority,
                status: patchData.status,
                userId: Number(patchData.userId),
                assigneeId: patchData.assigneeId,
            }

            const updatedIssue = await patchStatus.then(fn => fn(updatedIssueData));
            console.log('Updated Issue:', updatedIssue);
        } catch(error){
            console.error('Error updating issue status', error);
        }
    
    }



    return (
        <DescBoxWrapper>
            <div id='desc-container'>
                <div>{infoType}</div>
                {(infoType=="State" && isAssigned!==0) &&(
                    <div id="change" onClick={() => handleStatusUpdate()}>변경</div>)}
                {(infoType==="Assignee" && isAssigned===0) && (
                <div id="change" onClick={handleAssignee}>선택</div>)}
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