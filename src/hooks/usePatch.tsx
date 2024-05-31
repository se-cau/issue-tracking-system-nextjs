import { UpdateIssueInfo } from "@/types/type";



const usePatch = async(endpoint:string, issueId:number, issueData:UpdateIssueInfo) =>{
    const url =  `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}?issueId=${issueId}`;
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
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch (error){
        console.error('Error updating issue status:', error);
        throw error;
    }

    }

    export default usePatch;