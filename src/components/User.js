'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LogoutButton from './logout';
import Link from 'next/link';

export default function User() {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);  // Initialize as null
    const [userInfoVisible, setUserInfoVisible] = useState(false);
    const token = Cookies.get('authToken');

    // Check if userInfo is stored in localStorage and load it
    useEffect(() => {
        const savedUserInfo = localStorage.getItem('UserInfo');
        if (savedUserInfo) {
            setUserInfo(JSON.parse(savedUserInfo));  // Use saved data from localStorage
            setLoading(false);  // Stop loading if data is available
        } else if (token) {
            fetchUser();  // Fetch data from API if userInfo is not available
        } else {
            setLoading(false);  // No token, no user info, stop loading
        }
    }, [token]);  // Dependency array includes token, runs when token changes

    // Fetch user data from API
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

    // Function to extract initials
    const getInitials = (fullname) => {
        const nameArray = fullname.split(' ');
        const initials = nameArray.map(name => name[0]).join('');
        return initials.toUpperCase(); // Convert to uppercase
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setUserInfoVisible(!userInfoVisible); // Toggle the dropdown
    };

    // Handle logout: Reset user info and hide user data
    const handleLogout = () => {
        setUserInfo(null);  // Reset user info to null
        setUserInfoVisible(false);  // Hide dropdown
        localStorage.removeItem('UserInfo');  // Remove userInfo from localStorage
        Cookies.remove('authToken');  // Optionally remove the token
    };

    // UI related functions to set session storage
    const showWatchList = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('profileInfo', 'Stocks');
        }
    };

    const showProfile = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('profileInfo', 'Profile');
        }
    };

    // Display loading skeleton while fetching data
    if (loading) {
        return <div className="cursor-pointer bg-background border-[.125rem] border-primaryText rounded-full w-10 h-10 card__skeleton flex items-center justify-center text-xl font-sansRegular font-bold text-primaryText"></div>;
    }

    // If userInfo is not available, show default fallback
    if (!userInfo) {
        return <div className="cursor-pointer bg-background border-[.125rem] border-primaryText rounded-full w-10 h-10 card__skeleton flex items-center justify-center text-xl font-sansRegular font-bold text-primaryText">E</div>;
    }

    return (
        <div className="flex flex-col relative">
            {/* Profile picture and username */}
            <div className="flex items-center gap-2">
                <p className="text-sm px-4 py-2 bg-primaryText/10 rounded font-sansMedium">{userInfo.user.fullname}</p>
                <div onClick={toggleDropdown} className="cursor-pointer bg-background border-[.125rem] border-gray-500 rounded-full w-10 h-10 flex items-center justify-center text-xl font-sansRegular font-bold text-primaryText">
                    {getInitials(userInfo.user.fullname)} {/* Display the initials */}
                </div>
            </div>
            <div className={`${userInfoVisible ? 'visible' : 'hidden'} absolute top-[125%] right-0 w-max mx-auto bg-background shadow-md rounded-lg p-2 flex flex-col gap-y-2`}>
                <Link onClick={showWatchList} href="/profile" className="text-base relative font-sansMedium text-primaryText w-[100%] px-4 pr-12 py-2 hover:bg-primaryText/10 rounded">My Stocks</Link>
                <Link onClick={showProfile} href="/profile" className="text-base relative font-sansMedium text-primaryText w-[100%] px-4 pr-12 py-2 hover:bg-primaryText/10 rounded">Manage Account</Link>
                <Link href="/feedback" className="text-base relative font-sansMedium text-primaryText w-[100%] px-4 pr-12 py-2 hover:bg-primaryText/10 rounded">Get Support</Link>
                <LogoutButton onLogout={handleLogout}/>
            </div>
        </div>
    );
}