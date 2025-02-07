'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useInsiderTransactions } from '@/context/InsiderTransactionsContext';
import DataNotAvailable from '@/loaders&errors_UI/dataUnavailable';
import RequestError from '@/loaders&errors_UI/requestError';
import Loading from '@/loaders&errors_UI/loading';
import MainLoader from '@/loaders&errors_UI/mian_loader';

const usePageSize = () => {
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const updatePageSize = () => {
            if (window.matchMedia('(min-width: 2048px)').matches) {
                setPageSize(20); // XL screens
            } else if (window.matchMedia('(min-width: 1560px)').matches) {
                setPageSize(16); // LG screens
            } else if (window.matchMedia('(min-width: 768px)').matches) {
                setPageSize(10); // LG screens
            } else {
                setPageSize(8); // Default for smaller screens
            }
        };

        updatePageSize(); // Run initially
        window.addEventListener('resize', updatePageSize);
        return () => window.removeEventListener('resize', updatePageSize);
    }, []);

    return pageSize;
};

const InsiderTransactions = ({ symbol }) => {
    const { transactions, loading, error, fetchInsiderTransactions } = useInsiderTransactions(); // Access insider transactions directly
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);
    const activeButtonRef = useRef(null);
    const PAGE_SIZE = usePageSize(); // Get dynamic page size

    // Background fetch every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchInsiderTransactions(symbol, true);
            }
        }, 20 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    useEffect(() => {
        // Scroll to the active button
        if (activeButtonRef.current && containerRef.current) {
            activeButtonRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [symbol]);

    // Divide transactions into chunks of PAGE_SIZE
    const paginatedData = useMemo(() => {
        if (!transactions || transactions.length === 0) return [];
        return transactions.reduce((result, transaction, index) => {
            const pageIndex = Math.floor(index / PAGE_SIZE);
            if (!result[pageIndex]) result[pageIndex] = [];
            result[pageIndex].push(transaction);
            return result;
        }, []);
    }, [transactions, PAGE_SIZE]);

    // Get total pages
    const totalPages = paginatedData.length;

    // Change page handler
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (!transactions && loading) {
        return <MainLoader Zindex={10} />; // Handle loading state
    }

    return (
        <div className='flex flex-col lg:px-4 px-2 items-center w-full gap-4'>
            <div className='w-full flex flex-col py-6 items-center gap-4'>
                <h1 className='font-sansMedium md:text-3xl text-2xl text-center'>
                    Insider Transactions for <span className='dashboard_symbol_heading'>{symbol}</span>
                </h1>

                {/* Response Data Table Start */}
                <div className=' w-full bg-primaryBg py-4 rounded-xl'>
                    <div className='flex w-full overflow-auto scrollbar-thin'>
                        {/* Executive Name Column */}
                        <div className='flex flex-col items-center h-max w-[20%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Executive
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((transaction, index) => (
                                <div className='w-full pl-1' key={`${transaction.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {transaction.executive || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Shares Transacted Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Shares
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((transaction, index) => (
                                <div className='w-full' key={`${transaction.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {transaction.shares || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Share Price Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Share Price
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((transaction, index) => (
                                <div className='w-full' key={`${transaction.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {transaction.share_price ? `$${transaction.share_price}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Acquisition/Disposal Column */}
                        <div className='flex flex-col items-center h-max w-[15%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-center text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Acquisition or Disposal
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((transaction, index) => (
                                <div className='w-full text-center' key={`${transaction.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {transaction.acquisition_or_disposal || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Transaction Date Column */}
                        <div className='flex flex-col items-start h-max w-[15%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-base text-primaryTextColor/60 bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Transaction Date
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((transaction, index) => (
                                <div className='w-full' key={`${transaction.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {transaction.transaction_date && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(transaction.transaction_date.trim()) 
                                            ? transaction.transaction_date.trim() 
                                            : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Executive Title Column */}
                        <div className='flex flex-col items-center h-max w-[15%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Executive Title
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((transaction, index) => (
                                <div className='w-full' key={`${transaction.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {transaction.executive_title || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Security Type Column */}
                        <div className='flex flex-col items-center h-max w-[15%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Security Type
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((transaction, index) => (
                                <div className='w-full pr-1' key={`${transaction.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {transaction.security_type || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Controller Start */}
                    {totalPages > 1 && (
                        <div className='px-4 pt-4 bg-primaryBg w-full flex justify-between items-center gap-4'>
                            {/* Previous Button */}
                            <button 
                                className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                                disabled={currentPage === 1} 
                                onClick={() => goToPage(currentPage - 1)}
                            >
                                Previous
                            </button>
                            
                            {/* Scrollable Numbered Buttons */}
                            <div className='overflow-x-auto scrollbar-hide w-full max-w-[300px]' ref={containerRef}>
                                <div className='w-max flex gap-2'>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button 
                                            key={index} 
                                            ref={currentPage === index + 1 ? activeButtonRef : null}
                                            className={`px-3 font-sansMedium py-0.5 rounded-full text-black ${
                                                currentPage === index + 1 ? 'text-primaryMain bg-primaryMain/10' : ''
                                            }`} 
                                            onClick={() => goToPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Next Button */}
                            <button 
                                className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                                disabled={currentPage === totalPages} 
                                onClick={() => goToPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                    {/* Controller End */}
                </div>
            </div>
            {/* Response Data Table End */}

            {/* Loader Start */}
            {loading && (
                <div className='fixed z-[7] w-full h-full bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center'>
                    <Loading />
                </div>
            )}
            {/* Loader End */}

            {!error && transactions.length === 0 && !loading && (
                <DataNotAvailable />
            )}

            {error && !transactions && !loading && (
                <RequestError />
            )}
        </div>
    );
};

export default InsiderTransactions;