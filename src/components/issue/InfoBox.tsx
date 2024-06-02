import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/state';
import SelectAssignee from '../modal/SelectAssignee';
import  usePatch from '@/hooks/usePatch';
import { UpdateIssueInfo, ProjectInfo, AssigneeList } from '@/types/type';
import { projectState } from '@/recoil/projectState';
import { contributerId } from '../../recoil/state';
import useFetchProject from '@/hooks/useFetchProject';
import useAssigneeList from '@/hooks/useAssigneeList';
import useFetchIssue from '../../hooks/useFetchIssue';
import { IssueInfo } from '@/types/type';


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

const fetchAssigneeList = (data:any):AssigneeList=>({
    userId: data.userId,
    username: data.username,
    role: data.role,

})

const fetchIssueData = (data:any):IssueInfo => ({
    id: data.id,
    title: data.title,
    description: data.description,
    reporter: data.reporter,
    assignee: data.assignee,
    fixer: data.fixer,
    status: data.status,
    priority: data.priority,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
})

const InfoBox: React.FC<InputProps> = ({infoType, data, patchData, isAssigned}) => {
    const [isVisible, setVisiable] = useRecoilState(modalState);
    const [issueId, setIssueId] = useState<string|null>(null);
    const [projectId, setProjectId] = useState<string|null>(null);
    const [userId, setUserId] = useState<string|null>(null);

    const patchStatus = usePatch('issues/status', issueId ? Number(issueId) : 0)

    const [projects, setProjects] = useRecoilState<AssigneeList[]>(projectState);

    const endpointP = '/projects';

    //assignee 배정에 필요한 props
    const endpoint = '/issues'; 
    const {data:dataI, loading, error, refetch} = useFetchIssue<IssueInfo>(endpoint, fetchIssueData);
    console.log("Issueeeee::",dataI);

    const queryA = '?projectId='; 
    const {dataA, loadingA, errorA, refetchA} = useAssigneeList<AssigneeList>(endpointP, queryA, fetchAssigneeList, Number(userId));


    useEffect(() => {
        if (typeof window!== 'undefined'){
            setIssueId(localStorage.getItem('issueId'));
            setProjectId(localStorage.getItem('projectId'));
            setUserId(localStorage.getItem('userId'));
        }

        if (dataA) {
            setProjects(dataA);
            
        }

    }, [dataA, setProjects, setIssueId, setProjectId]);
    

    const assigneeList = projects.map((assignee) => assignee.username);
    const assigneeListId = projects.map((assignee) => assignee.userId);

    const filteredIssue =  dataI?.filter(issue => issue.id === Number(issueId))[0];
    console.log(filteredIssue);

    const title= filteredIssue?.title|| "";
    const description=  filteredIssue?.description || "";
    const priority=  filteredIssue?.priority || "";
    const status=  filteredIssue?.status || "";

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
                    <SelectAssignee 
                    assigneeList={assigneeList} 
                    assigneeListId={assigneeListId} 
                    title={title}
                    priority={priority}
                    description={description}
                    status={status} />)}
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