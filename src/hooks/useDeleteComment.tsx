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

        return true; // 성공적으로 삭제됨을 반환
    } catch (error) {
        console.error('Error deleting comment:', error);
        return false; // 삭제 실패를 반환
    }
};

export default useDeleteComment;
