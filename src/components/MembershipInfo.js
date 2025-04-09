'use client';
import { useMembership } from '../context/MembershipContext';
import Link from 'next/link';
import axios from 'axios';
import { useState } from 'react';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function MembershipInfo() {
    const { loading, membership, fetchMembership } = useMembership();
    const [subscritionLoading, setSubscritionLoading] = useState(false);

    const plans = {
        price_free: { price: "$0.00/Month", oldPrice: "$9.99", label: "Free" },
        price_1QMSAIBi8ZwCbxPYXKZFxfFk: { price: "$9.99/Month", oldPrice: "$29.99", label: "Premium" },
        price_1RAIqeBi8ZwCbxPY42hCa5sp: { price: "$9.99/Month", oldPrice: "$29.99", label: "Premium" },
        price_1RAFH5Bi8ZwCbxPYZOgkq1qn: { price: "$99.99/Year", oldPrice: "$299.99", label: "Premium" },
        price_1QL7M3Bi8ZwCbxPYywOXZXfu: { price: "$299.99/Year", oldPrice: "$499.99", label: "Premium" },
        price_1QKzQKBi8ZwCbxPYENlEObFO: { price: "$29.99/Year", oldPrice: "$49.99", label: "Premium" },
    };

    // Helper to format the expiration date
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString); // Convert ISO date string to Date object
        return date.toLocaleDateString("en-US", {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleSubscritionCancellation = async () => {
        setSubscritionLoading(true);
        try {
            const response = await axios.post(
                `${STOCKVERSE_BACK_END}/subscription/cancel`,
                {},
                { withCredentials: true }
            );

            const data = response.data; // ✅ Get the actual data payload
            console.log(data.canceled);

            if (response.status === 200) {
                fetchMembership();
            }
        } catch (error) {
            console.error('Error during subscription cancellation:', error);
        } finally {
            setSubscritionLoading(false); // ✅ cleaner to always run this
        }
    };

    const handleSubscriptionResume = async () => {
        setSubscritionLoading(true);
        try {
            const response = await axios.post(
                `${STOCKVERSE_BACK_END}/subscription/resume`,
                {},
                { withCredentials: true }
            );

            const data = response.data; // ✅ Correct way to access the payload
            console.log(data.resumed);

            if (response.status === 200) {
                fetchMembership();
            }
        } catch (error) {
            console.error('Error during subscription resume:', error);
        } finally {
            setSubscritionLoading(false); // ✅ Always reset loading
        }
    };

    // Get plan details based on price_id
    const activePlan = membership?.price_id ? plans[membership.price_id] : null;

    return (

        <div className="w-full h-full relative">
            <h4 className="font-sansRegular mb-4 text-primaryTextColor/50 text-lg">Current Plan</h4>
            {loading ? (
                <p>Loading...</p>
            ) : activePlan ? (
                <div className="w-full h-full flex flex-col items-start gap-2">
                    <h4 className="text-2xl text-primaryTextColor font-sansMedium">
                        {activePlan.label} Membership
                    </h4>
                    {/* <p className="text-lg font-sansMedium text-primaryTextColor">{activePlan.price}</p> */}
                    <p className="text-base py-1 px-4 border border-primaryMain rounded-lg bg-primaryMain/5  font-sansMedium text-primaryMain">
                        {(() => {
                            if (membership?.price_id === 'price_free') {
                                return 'You are currently subscribed to our free membership plan.';
                            } else if (membership?.status === 'active') {
                                return `Your next payment of ${activePlan.price} is scheduled for ${formatDate(membership.expires_at)}.`;
                            } else if (membership?.status === 'paused') {
                                return `Your subscription is currently paused. Your ${activePlan.price} plan will automatically cancel on ${formatDate(membership.expires_at)}. Once cancelled, it cannot be resumed. Please click "Resume" below before the expiration date if you wish to keep your subscription.`;
                            } else if (membership?.status === 'canceled') {
                                return `Your subscription is been canceled. You will have access to premium features that your plan ${activePlan.price} provides till ${formatDate(membership.expires_at)}. Once the expiration reached, you will automatically be downgraded to free plan.`;
                            }
                            return null;
                        })()}
                    </p>
                    <div className="flex gap-4">
                        <Link href='/pricing' className={`${membership?.price_id === 'price_free' ? 'visible' : 'hidden'} bg-white text-black border rounded-lg py-1 px-4 text-base font-sansMedium`}>
                            Upgrade
                        </Link>
                        <div onClick={handleSubscritionCancellation} className={`${membership?.status === 'active' && membership?.price_id !== 'price_free' ? 'visible' : 'hidden'} bg-white text-sell border border-sell rounded-lg py-1 px-4 text-base font-sansMedium cursor-pointer`}>
                            {subscritionLoading ? 'Loading...' : 'Cancel'}
                        </div>
                        <div onClick={handleSubscriptionResume} className={`${membership?.status === 'paused' ? 'visible' : 'hidden'} bg-white text-buy border border-buy rounded-lg py-1 px-4 text-base font-sansMedium cursor-pointer`}>
                            {subscritionLoading ? 'Loading...' : 'Resume'}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-base py-1 px-4 border border-primaryMain rounded-lg bg-primaryMain/5  font-sansMedium text-primaryMain">
                    No active membership plan found.
                </p>
            )}
        </div>
    );
}
