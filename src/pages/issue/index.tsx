import React from 'react';
import { IssueInfo } from '@/types/type';
import useFetchIssue from '../../hooks/useFetchIssue';


const fetchIssueData = (data:any):IssueInfo => ({
    id: data.id,
    title: data.title,
    description: data.description,
    reporter: data.reporter,
    assignee: data.assignee,
    fixer: data.fixer,
    status: data.status,
    priority: data.priority,
    created_at: data.created_at,
    updated_at: data.updated_at
})


const Issue = ()=> {
    const endpoint = '/issues'; 
    const {data, loading, error} = useFetchIssue<IssueInfo>(endpoint, fetchIssueData);

    return (
        <div>
            dd
        </div>
    );
};

export default Issue;