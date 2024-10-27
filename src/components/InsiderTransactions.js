'use client';
import React, { useEffect, useState, useRef } from 'react';
import GainerFallbackUI from './GainerFallbackUI';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

const Insider_Transactions = ({ symbol }) => {
    const [transactions, setTransactions] = useState([]); // State for transactions data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const scrollRef = useRef();
    
    // State to track mouse dragging
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        // Function to handle mouse down event
        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
        };

        // Function to handle mouse move event
        const handleMouseMove = (e) => {
            if (!isDragging) return; // Stop function if not dragging
            e.preventDefault();
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 2; // Increase the value to scroll faster
            scrollRef.current.scrollLeft = scrollLeft - walk;
        };

        // Function to handle mouse up event
        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const scrollableDiv = scrollRef.current;
        scrollableDiv.addEventListener('mousedown', handleMouseDown);
        scrollableDiv.addEventListener('mousemove', handleMouseMove);
        scrollableDiv.addEventListener('mouseleave', handleMouseUp);
        scrollableDiv.addEventListener('mouseup', handleMouseUp);

        // Clean up event listeners on component unmount
        return () => {
            scrollableDiv.removeEventListener('mousedown', handleMouseDown);
            scrollableDiv.removeEventListener('mousemove', handleMouseMove);
            scrollableDiv.removeEventListener('mouseleave', handleMouseUp);
            scrollableDiv.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startX, scrollLeft]);

    useEffect(() => {
        const fetchInsiderTransactions = async () => {
            setLoading(true);
            try {
                // Fetch insider transactions data
                const response = await fetch(`${STOCKVERSE_BACK_END}/insider_transactions?symbol=${symbol}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions data');
                }

                const responseData = await response.json();
                const transactionsData = responseData.data.map(transaction => {
                    // Extract and clean the transaction date
                    const cleanDate = transaction.transaction_date && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(transaction.transaction_date.trim())
                        ? transaction.transaction_date.trim()
                        : 'N/A';

                    return {
                        transactionDate: cleanDate,
                        ticker: transaction.ticker ? transaction.ticker : 'N/A',
                        executive: transaction.executive ? transaction.executive : 'N/A',
                        executiveTitle: transaction.executive_title ? transaction.executive_title : 'N/A',
                        securityType: transaction.security_type ? transaction.security_type : 'N/A',
                        acquisitionOrDisposal: transaction.acquisition_or_disposal ? transaction.acquisition_or_disposal : 'N/A',
                        shares: transaction.shares ? transaction.shares : 'N/A',
                        sharePrice: transaction.share_price ? `$${transaction.share_price}` : 'N/A', // Format price
                    };
                });

                setTransactions(transactionsData); // Update state with parsed data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching transactions data:", error);
                setError('Error loading transactions data. Please try again later.');
                setLoading(false);
            }
        };

        fetchInsiderTransactions(); // Fetch transactions data on component mount
    }, [symbol]); // Refetch when symbol changes
    
    return (
        <div className='w-full'>
            <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">
                {/* Columns */}
                <div ref={scrollRef} className="flex max-w-full w-max max-h-[550px] overflow-y-auto">

                    {/* executive Column */}
                    <div className="min-w-max w-[15rem] sticky top-0 left-0 z-[2] h-max  bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                        {/* Header for Stock Column */}
                        <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                        Executive
                        </div>
                        {/* Transaction Rows */}
                        {loading || !transactions || transactions.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            transactions.map((transaction, index) => (
                                <div key={index} className="w-full cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                    <ul className="w-full">
                                        <li className="text-xs w-full text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">{transaction.executive}</li>
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Shares Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 pl-2 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Shares
                        </div>
                        {/* Rows */}
                        {loading || !transactions || transactions.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            transactions.map((transaction, index) => (
                                <div key={index} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                    {transaction.shares}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Share Price Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Share Price
                        </div>
                        {/* Rows */}
                        {loading || !transactions || transactions.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            transactions.map((transaction, index) => (
                                <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10 text-primaryText">
                                    {transaction.sharePrice}
                                </div>
                            ))
                        )}
                    </div>

                    {/* acquisitionOrDisposal Column */}
                    <div className="flex flex-col min-w-[12rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Acquisition Or Disposal
                        </div>
                        {/* Rows */}
                        {loading || !transactions || transactions.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            transactions.map((transaction, index) => (
                                <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10 text-primaryText">
                                    {transaction.acquisitionOrDisposal}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Transaction Date Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 pl-2 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Transaction Date
                        </div>
                        {/* Rows */}
                        {loading || !transactions || transactions.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            transactions.map((transaction, index) => (
                                <div key={index} className="text-base py-3 pl-2 border-b-[1px] border-primaryText/10">
                                    {transaction.transactionDate}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Executive Title Column */}
                    <div className="flex flex-col min-w-max w-[15rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 pl-2 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Executive Title
                        </div>
                        {/* Rows */}
                        {loading || !transactions || transactions.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            transactions.map((transaction, index) => (
                                <div key={index} className="text-base py-3 pl-2 border-b-[1px] border-primaryText/10">
                                    {transaction.executiveTitle}
                                </div>
                            ))
                        )}
                    </div>

                    {/* security Type Column */}
                    <div className="flex flex-col min-w-max w-[15rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 pl-2 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Security Type
                        </div>
                        {/* Rows */}
                        {loading || !transactions || transactions.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            transactions.map((transaction, index) => (
                                <div key={index} className="text-base py-3 pl-2 border-b-[1px] border-primaryText/10">
                                    {transaction.securityType}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Insider_Transactions;