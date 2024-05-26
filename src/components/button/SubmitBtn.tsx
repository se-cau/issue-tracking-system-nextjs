import React from 'react';
import { useRouter } from 'next/router';

interface SubmitButtonProps {
    success: boolean | null;
    error: string | null;
    path: string
    text: string
}

const SubmitBtn: React.FC<SubmitButtonProps> = ({success, error, path, text }) => {
    const router = useRouter();

    React.useEffect(()=>{
        if (success){
            alert('성공적으로 제출되었습니다.')
        }
    },[success, router]);

    return (
        <button id="forSubmit" type="submit">
            {text}
        </button>
    );
};

export default SubmitBtn;