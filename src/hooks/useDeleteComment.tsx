const useDeleteComment = async (commentId: string): Promise<boolean> => {
    try {
        const url = `http://ec2-43-203-119-113.ap-northeast-2.compute.amazonaws.com/api/v1/comments?commentId=${commentId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }

        return true; 
        
    } catch (error) {
        console.error('Error deleting comment:', error);
        return false; 
    }
};

export default useDeleteComment;
