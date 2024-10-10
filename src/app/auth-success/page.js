'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AuthSuccess() {
    const router = useRouter();

    useEffect(() => {
        // You can retrieve the token from the URL if needed (optional)
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');
        
        // Store token in Cookies (if passed in the URL, optional)
        if (tokenFromUrl) {
            Cookies.set('authToken', tokenFromUrl, { expires: 6 / 24 });
        }

        // Redirect to dashboard or home
        router.push('/');
    }, [router]);

    return <div className="container mx-auto pt-8 text-center">Redirecting...</div>;
}