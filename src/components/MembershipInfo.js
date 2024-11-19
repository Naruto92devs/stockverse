'use client';
import { useMembership } from '../context/MembershipContext';
import Link from 'next/link';

export default function MembershipInfo() {
    const { loading, membershipInfo } = useMembership();

    const plans = {
        price_free: { price: "$0.00/Monthly", oldPrice: "$9.99", label: "Free" },
        price_1QMSAIBi8ZwCbxPYXKZFxfFk: { price: "$29.99/Monthly", oldPrice: "$49.99", label: "Basic" },
        price_1QMSALBi8ZwCbxPY90cWxOs8: { price: "$79.99/Monthly", oldPrice: "$99.99", label: "Standard" },
        price_1QMSANBi8ZwCbxPYrNWX1v9k: { price: "$129.99/Monthly", oldPrice: "$149.99", label: "Premium" },
        price_1QMSAPBi8ZwCbxPY5rlGmPjA: { price: "$299.99/Yearly", oldPrice: "$499.99", label: "Basic" },
        price_1QMSARBi8ZwCbxPYtXfSl80D: { price: "$959.99/Yearly", oldPrice: "$1199.99", label: "Standard" },
        price_1QMSASBi8ZwCbxPY8hAWCmSn: { price: "$1549.99/Yearly", oldPrice: "$1799.99", label: "Premium" },
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
    const activePlan = membershipInfo?.price_id ? plans[membershipInfo.price_id] : null;

    return (
        <div className="w-full h-full">
            <div className="py-4 md:py-14 mx-auto xl:container md:gap-y-8 gap-y-4 flex max-lg:flex-col items-start justify-between">
                <div className="flex flex-col lg:w-[35%] w-full">
                    <h1 className="text-primaryText max-sm:text-2xl text-xl font-sansMedium">Membership</h1>
                    <p>See any current plans you have running.</p>
                </div>
                <div className="lg:w-[60%] md:p-6 w-full max-md:border-t-2 max-md:border-dashed max-md:border-primaryText/20 max-md:pt-6 md:bg-background md:shadow-xl flex flex-col items-start gap-y-8">
                    <h1 className="font-sansBold text-primaryText text-xl">Active Plan</h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : activePlan ? (
                        <div className="w-full h-full flex flex-col items-start gap-y-12 p-6 bg-membershipPkg bg-no-repeat bg-center bg-cover">
                            <div className="flex flex-wrap justify-between items-center w-full">
                                <div className="flex justify-between items-center gap-2">
                                    <h2 className="bg-primaryHeading text-mobNavLink py-2 px-4 text-lg font-sansMedium">
                                        {activePlan.label}
                                    </h2>
                                    <p className="text-lg font-sansMedium text-primaryText">Plan</p>
                                </div>
                                <p className="text-lg font-sansMedium text-primaryText">{activePlan.price}</p>
                            </div>
                            <div className="w-full flex flex-wrap gap-4 justify-between items-center">
                                <p className="text-base font-sansMedium text-primaryText">
                                    Your current plan runs out on {formatDate(membershipInfo.expires_at)}
                                </p>
                                <div className="flex gap-4">
                                    <Link href='/feedback' className="bg-background text-primaryText py-2 px-4 text-lg font-sansMedium">
                                        Cancel
                                    </Link>
                                    <Link href='/pricing' className="bg-primaryHeading text-mobNavLink py-2 px-4 text-lg font-sansMedium">
                                        Upgrade
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-base font-sansMedium text-primaryText">
                            No active membership plan found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
