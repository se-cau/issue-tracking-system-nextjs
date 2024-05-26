export interface User{
    userId: number;
    username: string;
    role: string;
    //role: Admin, Dev, Pl, Tester
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
    userid: number;
    assigneeid: number;
}
