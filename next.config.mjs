/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        styledComponents:true,
    },
    env:{
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    }
};

export default nextConfig;
