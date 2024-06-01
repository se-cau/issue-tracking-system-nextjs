import useStatistics from '@/hooks/useStastistics';
import React, {useState, useEffect} from 'react';
import { styled } from 'styled-components';
import { PJStatistics } from '../types/overView';


const fetchData = (data:any):PJStatistics => ({
    statusDistribution: data.StatusDistribution,
    reporterDistribution: data.ReporterDistribution,
    assigneeDistribution: data.AssigneeDistribution,
    topCommentedIssues: data.topCommentedIssues,
})


const OverView = () => {
    const endpoint = '/api/v1/issues/statistics/';
    
    
    const [projectId, setProjectId] = useState<string>('');

    useEffect(()=>{
        if (typeof window!== 'undefined'){
            const storedProjectId = localStorage.getItem('projectId');

            if (storedProjectId !== null) {
                setProjectId(storedProjectId);
            }
        }

    })

    const {data, loading, error} = useStatistics<PJStatistics>(projectId, endpoint, fetchData);
    const statusL = data?.statusDistribution && Object.entries(data.statusDistribution);
    const reporterL = data?.reporterDistribution && Object.entries(data.reporterDistribution);
    const assigneeL = data?.assigneeDistribution && Object.entries(data.assigneeDistribution);
    const topCommentIssue = data?.topCommentedIssues && data.topCommentedIssues;

    console.log(projectId);
    return (
        <Wrapper>
            <DistributionWrapper>
                <div id='title'>이슈 상태 분포</div>
                <DistributionList>
                    {statusL?.map(([item, count]) => (
                            <div key={item}>{item}: {count}</div>
                        ))}
                </DistributionList>
            </DistributionWrapper>

            <DistributionWrapper>
                <div id='title'>reporter 분포</div>
                <DistributionList>
                    {reporterL?.map(([item, count]) => (
                            <div key={item}>{item}: {count}</div>
                        ))}
                </DistributionList>
            </DistributionWrapper>

            <DistributionWrapper>
                <div id='title'> assignee 분포</div>
                <DistributionList>
                    {assigneeL?.map(([item, count]) => (
                            <div key={item}>{item}: {count}</div>
                        ))}
                </DistributionList>
            </DistributionWrapper>

            <DistributionWrapper>
                <div id='title'> 이슈별 코멘트 분포</div>
                <DistributionList>
                    {topCommentIssue?.map((item) => (
                            <div key={item}>{item}</div>
                        ))}
                </DistributionList>
            </DistributionWrapper>
        </Wrapper>
                    
    );
};

export default OverView;

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

border: black solid 1.5px;
border-radius: 20px;
width: 100%;
margin: 20px 0;
`

const DistributionWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 0 20px 0;
padding: 10px;


#title{
    background-color: black;
    color: white;
    padding: 5px;
    border-radius: 10px;

}
    
`
const DistributionList = styled.div`
`