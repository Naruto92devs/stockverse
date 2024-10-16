'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileInfo from '@/components/ProfileInfo';
import ProfileSecurity from '@/components/ProfileSecurity';
import MembershipInfo from '@/components/MembershipInfo';
import StocksList from '@/components/StocksList';

export default function Profile() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);
    const [symbols, setSymbols] = useState([]);  // Initialize as an empty array
    const [currentView, setCurrentView] = useState(null); // Initialize with null to wait for sessionStorage

    // Load userInfo from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUserInfo = localStorage.getItem('UserInfo');
            if (savedUserInfo) {
                const parsedUserInfo = JSON.parse(savedUserInfo);  // Parse the saved JSON string
                setUserInfo(parsedUserInfo);

                // Extract symbols from the watchlist and update the symbols state
                const watchlistSymbols = parsedUserInfo.watchlist?.map(stock => stock.symbol.toUpperCase()) || [];
                setSymbols(watchlistSymbols);  // Set symbols with watchlist symbols
            } else {
                router.push('/');
            }
        }
    }, [router]);  // Empty array, only run once on mount

    // Load the current view from sessionStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedView = sessionStorage.getItem('profileInfo');
            if (savedView) {
                setCurrentView(savedView);
            } else {
                setCurrentView('Profile');  // Set default view
            }
        }
    }, []);

    // Save the current view to sessionStorage whenever it changes
    useEffect(() => {
        if (currentView && typeof window !== 'undefined') {
            sessionStorage.setItem('profileInfo', currentView);
        }
    }, [currentView]);

    // Handle tab navigation by setting the current view
    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    // Wait until the current view is loaded before rendering
    if (currentView === null) return null;

    return (
        <div className="w-full h-full">
            <div className="py-16 max-sm:py-10 w-full bg-newsBg bg-no-repeat bg-cover bg-center">
                <div className="lg:pr-[25%] max-md:py-0 py-10 px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
                    <h1 className="text-secondaryHeading max-sm:text-3xl text-6xl font-sansSemibold">Settings</h1>
                </div>
            </div>
            <div className="md:px-6 bg-primaryText/10 overflow-x-scroll scrollbar-hide">
                <div className="flex mx-auto xl:container w-max">
                    <div
                        className={`cursor-pointer px-10 max-xl:px-6 max-sm:px-4 py-3 text-base ${currentView === 'Profile' ? 'border-article/100 bg-background' : 'border-article/0'} hover:bg-background text-primaryText font-sansMedium border-b-4`}
                        onClick={() => handleViewChange('Profile')}
                    >
                        Profile
                    </div>
                    <div
                        className={`cursor-pointer px-10 max-xl:px-6 max-sm:px-4 py-3 text-base ${currentView === 'Security' ? 'border-article/100 bg-background' : 'border-article/0'} hover:bg-background text-primaryText font-sansMedium border-b-4`}
                        onClick={() => handleViewChange('Security')}
                    >
                        Security
                    </div>
                    <div
                        className={`cursor-pointer px-10 max-xl:px-6 max-sm:px-4 py-3 text-base ${currentView === 'Membership' ? 'border-article/100 bg-background' : 'border-article/0'} hover:bg-background text-primaryText font-sansMedium border-b-4`}
                        onClick={() => handleViewChange('Membership')}
                    >
                        Membership
                    </div>
                    <div
                        className={`cursor-pointer px-10 max-xl:px-6 max-sm:px-4 py-3 text-base ${currentView === 'Stocks' ? 'border-article/100 bg-background' : 'border-article/0'} hover:bg-background text-primaryText font-sansMedium border-b-4`}
                        onClick={() => handleViewChange('Stocks')}
                    >
                        Your Stocks
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-center py-6 mx-auto xl:container md:px-6 px-3">
                {/* Conditionally render based on the selected view */}
                {currentView === 'Profile' && <ProfileInfo />}
                {currentView === 'Security' && <ProfileSecurity />}
                {currentView === 'Membership' && <MembershipInfo />}
                {currentView === 'Stocks' && (
                    symbols.length > 0 ? (
                        <StocksList symbols={symbols} />
                    ) : userInfo ? (
                        <p>You don&apos;t have anything in your watchlist yet.</p>
                    ) : (
                        <p>Loading your watchlist...</p>
                    )
                )}
            </div>
        </div>
    );
}