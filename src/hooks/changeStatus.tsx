


const changeStatus = async(endpoint:string, issueId:number, issueData:string) =>{
    const url =  `${process.env.NEXT_PUBLIC_API_BASE_URL}status?issueId=${issueId}`;
    const requestOption = {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(issueData)
    }

    try{
        const response = await fetch(url, requestOption);
        if(!response.ok){
            throw new Error('HTTP error! status: ${response.status}');
        }
        const data = await response.json();
        return data;
    }catch (error){
        console.error('Error updating issue status:', error);
        throw error;
    }

    }