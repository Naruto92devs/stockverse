'use client'
import { useEffect } from "react";
import { useMetadata } from "@/context/MetadataContext";
export default function Policy() {
    const  { setMetadata } = useMetadata();

    useEffect(()=>{
        setMetadata({
            title : "Refund Policy - Stockverse",
            description : "Review Stockverse's Refund Policy. Learn about subscription refunds, cancellations and exceptional circumstances. Contact us for refund requests or inquiries"
        })
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div className="hero py-16 max-md:py-6 w-full">
        <div className="px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
            <h1 className="text-3xl font-sansSemibold text-primaryText">Refund Policy</h1>
            <p className="text-lg font-sansMedium text-primaryText">
            Last updated: November 18, 2024
            </p>
            <h2 className="mt-8 text-primaryText text-xl font-sansSemibold">1. Subscription Refunds</h2>
            <p className="text-base text-primaryText"><span className="font-sansSemibold">Monthly Subscriptions:</span> Payments for monthly plans are non-refundable once processed. By subscribing, you agree that payments are final.</p>
            <p className="text-base text-primaryText"><span className="font-sansSemibold">Annual Subscriptions:</span> Annual plans are non-refundable except in cases where Stockverse fails to deliver promised services. If uncertain, we recommend starting with a monthly plan.</p>
            <p className="text-base text-primaryText"><span className="font-sansSemibold">Trial Periods:</span> Free trials, if offered, will automatically convert to a paid plan unless canceled before the trial ends.</p>
            <h3 className="mt-8 text-primaryText text-lg font-sansSemibold">2. Cancellation Policy</h3>
            <p className="text-base text-primaryText">For the purposes of this Privacy Policy:</p>
            <p className="text-base text-primaryText">	Subscriptions can be canceled anytime through account settings. Cancellation takes effect at the end of the billing cycle, with continued access until then.</p>
            <p className="text-base text-primaryText">Partial refunds are not provided for mid-cycle cancellations.</p>
            <h4 className="mt-8 text-primaryText text-lg font-sansSemibold">3. Exceptional Circumstances</h4>
            <p className="text-base text-primaryText">For the purposes of this Privacy Policy:</p>
            <p className="text-base text-primaryText"><span className="font-sansSemibold">Technical Issues:</span>	 Refunds or credits may be granted for technical issues preventing access, if reported within 30 days.</p>
            <p className="text-base text-primaryText"><span className="font-sansSemibold">Service Disruptions:</span> For disruptions exceeding 24 hours, partial refunds or credits may be issued at Stockverse&#39;s discretion.</p>
            <h4 className="mt-8 text-primaryText text-lg font-sansSemibold">4. Requesting Refunds</h4>
            <p className="text-base text-primaryText"> To request a refund, email us at support@stockverse.com with your account details and reason for the request. Refunds are reviewed case-by-case, with responses typically provided within 5-7 business days.</p>
            <h4 className="mt-8 text-primaryText text-lg font-sansSemibold">5. Policy Updates</h4>
            <p className="text-base text-primaryText">Stockverse reserves the right to modify this policy. Significant changes will be communicated via email or the website, with immediate effect upon posting.</p>
        </div>
        </div>
        );
}