const useDeleteComment = async (commentId: string): Promise<boolean> => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments?commentId=${commentId}`;
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
