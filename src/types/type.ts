export interface User{
    userId: number;
    username: string;
    role: string;
    //role: Admin, Dev, PL, Tester
}

export interface ProjectInfo{
    projectId: number;
    title: string;
    adminName: string;
    contributorNames: string[];
}

export interface IssueInfo{
    id: number;
    title: string;
    description: string;
    reporter: string;
    assignee: string;
    fixer: string;
    status: string; 
    priority: string;
    createdAt: string;
    updatedAt: string;
}


export interface NewIssueInfo{
    title: string;
    description: string;
    priority: string;
    status: string;
    userId: number;
    assigneeId: number;
}

export interface CommentInfo{
    id: number;
    username: string;
    role: string;
    message: string;
    createdAt: string;
    authorId: number;
}


export interface NewComment{
    message: string;
    userId: string|null;
}

export const Status = ["ALL", "NEW","ASSIGNED","FIXED", "REOPENED", "RESOLVED", "CLOSE"];
export type StatusType = (typeof Status)[number];

export interface UpdateIssueInfo {
    title: string;
    description: string;
    priority: string;
    status: string;
    userId: number;
    assigneeId: number;
}


export interface CandidateInfo {
    userId: number,
    username: string,
    role: string,
}

export interface AssigneeList{
    userId: number,
    username:string,
    role: string
}
