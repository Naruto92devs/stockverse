'use client';
import axios from "axios";
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function MembershipInfo() {
    const [loading, setLoading] = useState(false);
    const [membership_info, setMembership_Info] = useState(null);
    const token = Cookies.get('authToken');

        // Check if userInfo is stored in localStorage and load it
        useEffect(() => {
            const savedMembership = sessionStorage.getItem('MembershipStatus');
            if (savedMembership) {
                setMembership_Info(JSON.parse(savedMembership));  // Use saved data from localStorage
                setLoading(false);  // Stop loading if data is available
            } else if (token) {
                fetchMembership();  // Fetch data from API if userInfo is not available
            } else {
                setLoading(false);  // No token, no user info, stop loading
            }
        }, [token]);  // Dependency array includes token, runs when token changes

        // Fetch user data from API
        const fetchMembership = async () => {
            try {
                if (!token) {
                    setLoading(false);
                    return console.log("Token does not exist");
                } else {
                    console.log(token);
                }
    
                const response = await axios.get(`${STOCKVERSE_BACK_END}/membership_info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
    
                if (response.status === 206) {
                    console.log(response.data);
                    sessionStorage.setItem('MembershipStatus', JSON.stringify(response.data.subscription));  // Save data in localStorage
                    setMembership_Info(response.data);  // Set the userInfo directly from API response
                } else {
                    console.log('Failed to fetch user');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="w-full h-full">
                <div className="lg:pr-[25%] max-md:py-0 py-10 px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
                    <h1 className="text-secondaryHeading max-sm:text-3xl text-xl font-sansSemibold">Membership Info</h1>
                </div>
        </div>
    );
}