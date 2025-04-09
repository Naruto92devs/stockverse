'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMembership } from '../context/MembershipContext';
import Image from 'next/image';
import Link from 'next/link';
import MainLoader from '@/loaders&errors_UI/mian_loader';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

const Return = () => {
    const [status, setStatus] = useState(null);
    const [session, setSession] = useState(null);
    const [subscription, setSubscrition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasReset, setHasReset] = useState(false); // Flag to track reset
    const router = useRouter();
    const { fetchMembership } = useMembership(); // Use reset function from context

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const sessionId = queryParams.get('session_id');

        if (sessionId) {
            axios
                .get(`${STOCKVERSE_BACK_END}/session-status?session_id=${sessionId}`, {
                    withCredentials: true,
                })
                .then((response) => {
                    const data = response.data;
                    setSession(data.session);
                    setSubscrition(data.subscription);
                    setStatus(data.session.payment_status);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    console.error("Error fetching session status:", error);
                    setLoading(false);
                });
        }
        
    }, []);

    useEffect(() => {
        if (status === 'open') {
            router.push("/checkout");
        } else if (status === 'paid' && !hasReset) {
            fetchMembership(); // Trigger membership info reset
            setHasReset(true); // Ensure reset is called only once
        }
    }, [status, router, fetchMembership, hasReset]);

    if (loading) {
        return <MainLoader />;
    }
    
    if (status === 'paid') {
        return (
            <section id="success" className='min-h-[100vh] py-12 bg-[#F9F7FF]'>
                <div className='xl:container lg:px-[29%] md:px-[22%] px-10% mx-auto flex flex-col items-center'>
                    <Image className='-mb-10 relative' width={72} height={72} src='/images/stockverse_rounded_logo.svg' alt='logo'/>
                    <div className='w-[90%] flex flex-col gap-2 items-center bg-white rounded-t-xl shadow-lg/50 p-8 pt-12'>
                        <p className='text-center text-black/60 font-sansRegular text-xl'>Amount</p>
                        <p className='text-center text-black font-sansMedium text-2xl'>USD ${(session.amount_total / 100).toFixed(2)}</p>
                        <p className='text-center font-sansRegular text-lg'>
                            {new Date(session.created * 1000).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            })}
                        </p>
                        <p className='text-center text-[#0A3F0A] py-1 px-4 rounded-full bg-buy/10 flex items-center gap-2'>
                            Success Payment
                            <Image width={24} height={24} src='/images/success.png' alt='logo'/>
                        </p>
                        <div className='w-full pt-8'>
                            <p className='font-sansMedium text-lg py-1 border-b border-black/5'>Payment Details</p>
                            <div className='p-2 border-b border-black/5 flex justify-between'>
                                <p className='font-sansRegular text-base '>Email</p>
                                <p className='font-sansRegular text-base'>{session.customer_details.email}</p>
                            </div>
                            <div className='p-2 border-b border-black/5 flex justify-between'>
                                <p className='font-sansRegular text-base '>Stockverse Premium Plan</p>
                                <p className='font-sansRegular text-base'>${(session.amount_total / 100).toFixed(2)}</p>
                            </div>
                            <div className='p-2 border-b border-black/5 flex justify-between'>
                                <p className='font-sansRegular text-base '>Country TAX</p>
                                <p className='font-sansRegular text-base capitalize'>
                                    ${session.total_details?.amount_tax}
                                </p>
                            </div>
                            <div className='p-2 border-b border-black/5 flex justify-between'>
                                <p className='font-sansRegular text-base '>Billing Cycle</p>
                                <p className='font-sansRegular text-base capitalize'>{subscription.items.data[0].plan.interval}</p>
                            </div>
                            <div className='p-2 border-b border-black/5 flex justify-between'>
                                <p className='font-sansRegular text-base '>Start Date</p>
                                <p className='font-sansRegular text-base capitalize'>
                                    {new Date(subscription.current_period_start * 1000).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div className='p-2 border-b border-black/5 flex justify-between'>
                                <p className='font-sansRegular text-base '>Expiration Date</p>
                                <p className='font-sansRegular text-base capitalize'>
                                    {new Date(subscription.current_period_end * 1000).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div className='p-2 border-b border-black/5 flex justify-between'>
                                <p className='font-sansRegular text-base '>Payment Status</p>
                                <p className='font-sansRegular text-base capitalize'>
                                    {session.payment_status}
                                </p>
                            </div>
                        </div>
                        <Link href='/dashboard' 
                        className={`px-4 mt-2 text-lg py-1 bg-primaryMain font-sansMedium hover:bg-black text-white rounded-lg`}
                        >
                            Back to my account 
                        </Link>
                    </div>
                    <Image className='w-[90%]' width={396} height={40} src='/images/reciept_bottom_bar.svg' alt='logo'/>
                    {error && (
                        <p className='text-black font-sansMedium text-sell'>{error}</p>
                    )}
                </div>
            </section>
        );
    }

    if (error) {
    return (
        <div className="flex justify-center items-center h-screen">
        <p className="text-sell font-sansMedium">{error}</p>
        </div>
    );
    }

    return null;
};

export default Return;

