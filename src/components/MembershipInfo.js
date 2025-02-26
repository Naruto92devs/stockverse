'use client';
import { useMembership } from '../context/MembershipContext';
import Link from 'next/link';

export default function MembershipInfo() {
    const { loading, membership } = useMembership();

    const plans = {
        price_free: { price: "$0.00/Month", oldPrice: "$9.99", label: "Free" },
        price_1QMSAIBi8ZwCbxPYXKZFxfFk: { price: "$29.99/Month", oldPrice: "$49.99", label: "Basic" },
        price_1QMSALBi8ZwCbxPY90cWxOs8: { price: "$79.99/Month", oldPrice: "$99.99", label: "Standard" },
        price_1QMSANBi8ZwCbxPYrNWX1v9k: { price: "$129.99/Month", oldPrice: "$149.99", label: "Premium" },
        price_1QMSAPBi8ZwCbxPY5rlGmPjA: { price: "$299.99/Year", oldPrice: "$499.99", label: "Basic" },
        price_1QMSARBi8ZwCbxPYtXfSl80D: { price: "$959.99/Year", oldPrice: "$1199.99", label: "Standard" },
        price_1QMSASBi8ZwCbxPY8hAWCmSn: { price: "$1549.99/Year", oldPrice: "$1799.99", label: "Premium" },
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
                        Your next build is {activePlan.price} on {formatDate(membership.expires_at)}. 
                    </p>
                    <p className="text-lg font-sansMedium text-primaryTextColor">{activePlan.price}</p>
                    <div className="flex gap-4">
                        <Link href='/pricing' className="bg-white text-black border rounded-lg py-1 px-4 text-base font-sansMedium">
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
