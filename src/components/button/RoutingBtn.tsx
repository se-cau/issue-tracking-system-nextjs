import React from 'react';
import {useRouter} from 'next/router';

interface ButtonProps {
    text: string;
    path: string
}


const RoutingBtn: React.FC<ButtonProps> = ({text, path}) => {
    const router = useRouter();

    const handleClick = ()=>{
        router.push(path);
    }

    return (
        <button id='forLanding' onClick={handleClick}>
            {text}
        </button>
    );
};

export default RoutingBtn;