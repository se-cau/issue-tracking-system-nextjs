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
    created_at: string;
    updated_at: string;
}


export interface NewIssue{
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
    created_at: string;
    authorId: number;
}


export interface NewComment{
    message: string;
    authorId: string|null;
}

export const Status = ["ALL", "NEW","ASSIGNED","FIXED", "REOPENED", "RESOLVED", "CLOSED"];
export type StatusType = (typeof Status)[number];
