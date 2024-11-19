'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MembershipContext = createContext();

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export function MembershipProvider({ children }) {
    const [loading, setLoading] = useState(true); // Start as loading
    const [membershipInfo, setMembershipInfo] = useState(null);

    const token = Cookies.get('authToken');

    // Fetch membership information
    const fetchMembership = async () => {
        if (!token) {
            setLoading(false);
            console.log("Token does not exist");
            return;
        }

        try {
            const response = await axios.get(`${STOCKVERSE_BACK_END}/membership_info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            if (response.status === 207) {
                const subscription = response.data.subscription;
                sessionStorage.setItem('MembershipStatus', JSON.stringify(subscription));
                setMembershipInfo(subscription);
            } else {
                console.log('Failed to fetch membership info');
            }
        } catch (error) {
            console.error('Error fetching membership info:', error);
        } finally {
            setLoading(false);
        }
    };

    // Reset membership info without causing unmount/remount cycles
    const resetMembershipInfo = async () => {
        try {
            if (loading) return; // Prevent re-fetching if already loading
            setLoading(true); // Show loading while re-fetching
            const response = await axios.get(`${STOCKVERSE_BACK_END}/membership_info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            if (response.status === 207) {
                const subscription = response.data.subscription;
                sessionStorage.setItem('MembershipStatus', JSON.stringify(subscription));
                setMembershipInfo(subscription);
            } else {
                console.log('Failed to fetch membership info');
            }
        } catch (error) {
            console.error('Error resetting membership info:', error);
        } finally {
            setLoading(false);
        }
    };

    // Load membership info from sessionStorage or API on initial render
    useEffect(() => {
        const savedMembership = sessionStorage.getItem('MembershipStatus');
        if (savedMembership) {
            setMembershipInfo(JSON.parse(savedMembership));
            setLoading(false);
        } else if (token) {
            fetchMembership();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <MembershipContext.Provider
            value={{
                loading,
                membershipInfo,
                fetchMembership,
                resetMembershipInfo,
            }}
        >
            {!loading && children} {/* Prevent rendering children until loading completes */}
        </MembershipContext.Provider>
    );
}

export function useMembership() {
    return useContext(MembershipContext);
}
