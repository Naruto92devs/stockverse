'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function User() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);  // Initialize as null, not true
    const token = Cookies.get('authToken');

    // Load userInfo from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUserInfo = localStorage.getItem('UserInfo');
            if (savedUserInfo) {
                setUserInfo(JSON.parse(savedUserInfo));  // Parse the saved JSON string
            } else {
                setUserInfo(null);  // Default value
            }
        }
    }, []);  // Empty array, only run once on mount

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!token) {
                    setLoading(false);
                    return console.log("Token does not exist");
                } else {
                    console.log(token);
                }

                const response = await axios.get('https://devsalman.tech/get-user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    console.log(response.data);
                    localStorage.setItem('UserInfo', JSON.stringify(response.data));  // Save data in localStorage
                    setUserInfo(response.data);  // Set the userInfo directly from API response
                } else {
                    console.log('Failed to fetch user');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    if (loading) {
        return <div className="text-center text-gray-600">Loading user data...</div>;
    }

    if (!userInfo) {  // Check if userInfo is null
        return <div className="text-center text-red-600">No user data found</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h1>
            <p className="text-gray-600"><strong>Full Name:</strong> {userInfo.user.fullname}</p>
            <p className="text-gray-600"><strong>Email:</strong> <a href={`mailto:${userInfo.user.email}`}>{userInfo.user.email}</a></p>
            <p className="text-gray-600"><strong>Verified:</strong> {userInfo.user.is_verified ? 'Yes' : 'No'}</p>
            <p className="text-gray-600"><strong>User ID:</strong> {userInfo.user.userid}</p>
        </div>
    );
}