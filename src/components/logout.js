'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

const LogoutButton = ({ onLogout }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = async () => {
        setLoading(true);
        setError('');

        try {
            await axios.post(`${STOCKVERSE_BACK_END}/logout`, {}, { withCredentials: true });
            // Redirect to the login page or home page after successful logout
            Cookies.remove('authToken');
            localStorage.removeItem('UserInfo');
            sessionStorage.removeItem('MembershipStatus');
            // Call the passed onLogout function to reset state in the User component
            if (onLogout) {
                onLogout();
            }
            router.push('/login');
        } catch (err) {
            console.error('Error logging out:', err);
            setError('Failed to log out. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleLogout}
                className={`text-base relative font-sansMedium text-primaryText w-[100%] px-4 pr-12 py-2 hover:bg-primaryText/10 rounded text-left ${loading ? 'cursor-not-allowed' : ''}`}
                disabled={loading} // Disable button while loading
            >
                {loading ? 'Logging out...' : 'Logout'}
            </button>
            {error && <p className="mt-2 text-red-600">{error}</p>} {/* Display error if any */}
        </div>
    );
};

export default LogoutButton;
