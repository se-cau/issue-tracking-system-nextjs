import React from 'react';
import { useRouter } from 'next/router';

interface SubmitButtonProps {
    loading: boolean;
    success: boolean | null;
    error: string | null;
    path: string
    text: string
}

const SubmitBtn: React.FC<SubmitButtonProps> = ({loading, success, error, path, text }) => {
    const router = useRouter();

    React.useEffect(()=>{
        if (success){
            router.push(path);
        }
    },[success, router]);

    return (
        <button id="forSubmit" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : text }
        </button>
    );
};

export default SubmitBtn;