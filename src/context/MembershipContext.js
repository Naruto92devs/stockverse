'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MembershipContext = createContext();

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export const MembershipProvider = ({ children }) => {
    const [membership, setMembership] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const token = Cookies.get('authToken');

    const fetchMembership = async () => {
        const token = Cookies.get('authToken');
        if (!token) {
            setLoading(false);
            return console.log('No token available');
        }

        try {
            const response = await axios.get(`${STOCKVERSE_BACK_END}/membership_info`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (response.status === 200) {
                localStorage.setItem('MembershipInfo', JSON.stringify(response.data));
                setMembership(response.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedMembershipInfo = localStorage.getItem('MembershipInfo');
        if (savedMembershipInfo && token) {
            setMembership(JSON.parse(savedMembershipInfo));
            setLoading(false);
        } else if (token) {
            fetchMembership();
        } else {
            setMembership(null);
            localStorage.removeItem('MembershipInfo');
            setLoading(false);
        }
    }, [token]);

    return (
        <MembershipContext.Provider value={{ membership: membership, loading, fetchMembership: fetchMembership, setMembership: setMembership }}>
            {children}
        </MembershipContext.Provider>
    );
};

export const useMembership = () => useContext(MembershipContext);