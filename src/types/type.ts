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
