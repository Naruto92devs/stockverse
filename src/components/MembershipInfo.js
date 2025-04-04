'use client';
import { useMembership } from '../context/MembershipContext';
import Link from 'next/link';

export default function MembershipInfo() {
    const { loading, membership } = useMembership();

    const plans = {
        price_free: { price: "$0.00/Month", oldPrice: "$9.99", label: "Free" },
        price_1QMSAIBi8ZwCbxPYXKZFxfFk: { price: "$9.99/Month", oldPrice: "$29.99", label: "Premium" },
        price_1RAIqeBi8ZwCbxPY42hCa5sp: { price: "$9.99/Month", oldPrice: "$29.99", label: "Premium" },
        price_1RAFH5Bi8ZwCbxPYZOgkq1qn: { price: "$99.99/Year", oldPrice: "$299.99", label: "Premium" },
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

    // Get plan details based on price_id
    const activePlan = membership?.price_id ? plans[membership.price_id] : null;

    return (
        <div className="w-full h-full">
            <h4 className="font-sansRegular mb-4 text-primaryTextColor/50 text-lg">Current Plan</h4>
            {loading ? (
                <p>Loading...</p>
            ) : activePlan ? (
                <div className="w-full h-full flex flex-col items-start gap-2">
                    <h4 className="text-2xl text-primaryTextColor font-sansMedium">
                        {activePlan.label} Membership
                    </h4>
                    <p className="text-base py-1 px-4 border border-primaryMain rounded-lg bg-primaryMain/5  font-sansMedium text-primaryMain">
                        Your next payment of {activePlan.price} is scheduled for {formatDate(membership.expires_at)}.
                    </p>
                    <p className="text-lg font-sansMedium text-primaryTextColor">{activePlan.price}</p>
                    <div className="flex gap-4">
                        <Link href='/pricing' className={`${membership?.price_id === 'price_free' ? 'visible' : 'hidden'} bg-white text-black border rounded-lg py-1 px-4 text-base font-sansMedium`}>
                            Upgrade
                        </Link>
                        <Link href='/feedback' className="bg-white text-sell border border-sell rounded-lg py-1 px-4 text-base font-sansMedium">
                            Cancel
                        </Link>
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
