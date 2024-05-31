import { UpdateIssueInfo } from "@/types/type";

interface PatchFunction {
    (issueData: UpdateIssueInfo): Promise<any>;
}

export type UsePatchReturnType = PatchFunction;

const usePatch = async(endpoint:string, issueId:number): Promise<PatchFunction> =>{
    const patchStatus: PatchFunction = async (issueData: UpdateIssueInfo) => {

    const url =  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/${endpoint}?issueId=${issueId}`;
    const requestBody = JSON.stringify(issueData);
    const requestOption = {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:requestBody
    }
    console.log(url);
    console.log(requestBody);

    try{
        const response = await fetch(url, requestOption);
        if(!response.ok){
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Something went wrong');

        }
        const data = await response.json();
        return data;
    } 
    catch (error:any){
        alert(error.message);
        console.error('Error updating issue status:', error);
    }
};
    
    return  patchStatus ;
}

export default usePatch;