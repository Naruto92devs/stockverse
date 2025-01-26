'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserContext = createContext();

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const token = Cookies.get('authToken');

    const fetchUser = async () => {
        const token = Cookies.get('authToken');
        if (!token) {
            setLoading(false);
            return console.log('No token available');
        }

        try {
            const response = await axios.get(`${STOCKVERSE_BACK_END}/get-user`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (response.status === 200) {
                localStorage.setItem('UserInfo', JSON.stringify(response.data));
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedUserInfo = localStorage.getItem('UserInfo');
        if (savedUserInfo && token) {
            setUser(JSON.parse(savedUserInfo));
            setLoading(false);
        } else if (token) {
            fetchUser();
        } else {
            setUser(null);
            localStorage.removeItem('UserInfo');
            setLoading(false);
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, loading, fetchUser, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);