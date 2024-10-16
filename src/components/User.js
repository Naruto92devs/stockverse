'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LogoutButton from './logout';
import Link from 'next/link';

export default function User() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);  // Initialize as null, not true
    const [userInfoVisible, setUserInfoVisible] = useState(false);
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

    // Function to extract initials
    const getInitials = (fullname) => {
        const nameArray = fullname.split(' ');
        const initials = nameArray.map(name => name[0]).join('');
        return initials.toUpperCase(); // Convert to uppercase
    };

    const toggleDropdown = () => {
        setUserInfoVisible(!userInfoVisible); // Toggle the dropdown
    };

    // Handle logout: Reset user info and hide user data
    const handleLogout = () => {
        setUserInfo(null);  // Reset user info to null
        setUserInfoVisible(false);  // Hide dropdown
    };

    if (loading) {
        return <div className="cursor-pointer bg-background border-[.125rem] border-primaryText rounded-full w-10 h-10 card__skeleton flex items-center justify-center text-xl font-sansRegular font-bold text-primaryText"></div>;
    }

    if (!userInfo) {  // Check if userInfo is null
        return <div className="cursor-pointer bg-background border-[.125rem] border-primaryText rounded-full w-10 h-10 card__skeleton flex items-center justify-center text-xl font-sansRegular font-bold text-primaryText">E</div>;
    }

    return (
        <div className="flex flex-col relative">
            {/* Profile picture div */}
            <div className="flex items-center gap-2">
                <p className="text-sm px-4 py-2 bg-primaryText/10 rounded font-sansMedium">{userInfo.user.fullname}</p>
                <div onClick={toggleDropdown} className="cursor-pointer bg-background border-[.125rem] border-gray-500 rounded-full w-10 h-10 flex items-center justify-center text-xl font-sansRegular font-bold text-primaryText">
                    {getInitials(userInfo.user.fullname)} {/* Display the initials */}
                </div>
            </div>
            <div className={`${userInfoVisible? 'visible' : 'hidden'} absolute top-[125%] right-0 w-max mx-auto bg-background shadow-md rounded-lg p-2 flex flex-col gap-y-2`}>
                <Link href="/profile" className="text-base relative font-sansMedium text-primaryText w-[100%] px-4 pr-12 py-2 hover:bg-primaryText/10 rounded">My Stocks</Link>
                <Link href="/profile" className="text-base relative font-sansMedium text-primaryText w-[100%] px-4 pr-12 py-2 hover:bg-primaryText/10 rounded">Manage Account</Link>
                <Link href="/profile" className="text-base relative font-sansMedium text-primaryText w-[100%] px-4 pr-12 py-2 hover:bg-primaryText/10 rounded">Get Support</Link>
                {/* <p className="text-gray-600"><strong>Full Name:</strong> {userInfo.user.fullname}</p>
                <p className="text-gray-600"><strong>Email:</strong> <a href={`mailto:${userInfo.user.email}`}>{userInfo.user.email}</a></p>
                <p className="text-gray-600"><strong>Verified:</strong> {userInfo.user.is_verified ? 'Yes' : 'No'}</p>
                <p className="text-gray-600"><strong>User ID:</strong> {userInfo.user.userid}</p> */}
                <LogoutButton onLogout={handleLogout}/>
            </div>
        </div>
    );
}