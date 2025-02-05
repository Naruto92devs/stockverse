'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useIPOs } from '@/context/IposContext';
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
                setPageSize(7); // Default for smaller screens
            }
        };

        updatePageSize(); // Run initially
        window.addEventListener('resize', updatePageSize);
        return () => window.removeEventListener('resize', updatePageSize);
    }, []);

    return pageSize;
};

const IPOsCalendar = () => {
    const { ipos, status, loading, error, fetchIPOs, setStatus, backgroundRefreshing } = useIPOs(); // Access insider transactions directly
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);
    const activeButtonRef = useRef(null);
    const PAGE_SIZE = usePageSize(); // Get dynamic page size

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
    }, [ipos]);

    // Divide transactions into chunks of PAGE_SIZE
    const paginatedData = useMemo(() => {
        if (!ipos || ipos.length === 0) return [];
        return ipos.reduce((result, ipos, index) => {
            const pageIndex = Math.floor(index / PAGE_SIZE);
            if (!result[pageIndex]) result[pageIndex] = [];
            result[pageIndex].push(ipos);
            return result;
        }, []);
    }, [ipos, PAGE_SIZE]);

    // Get total pages
    const totalPages = paginatedData.length;

    // Change page handler
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (!ipos && loading) {
        return <MainLoader Zindex={10} />; // Handle loading state
    }

    const changeStatus = (status) => {
        setStatus(status);
    };

    return (
        <div className='flex flex-col lg:px-4 px-2 items-center w-full gap-4'>
            <div className='w-full flex flex-col py-6 items-center gap-4'>
                <h1 className='font-sansMedium md:text-3xl text-2xl text-center'>
                    IPO Calendar
                </h1>

                {/* filters Start */}
                <div className=' max-w-full overflow-auto scrollbar-hide flex items-center gap-2 py-1 px-2 bg-primaryBg border border-primaryMain/10 rounded-full'>
                    <div onClick={() => changeStatus('pending')} className={`rounded-full font-sansMedium text-base text-primaryTextColor py-1 px-2 cursor-pointer ${status === 'pending' ? 'bg-primaryMain text-white px-4' : ''}`}>
                        Pending
                    </div>
                    <div onClick={() => changeStatus('history')} className={`rounded-full font-sansMedium text-base text-primaryTextColor py-1 px-2 cursor-pointer ${status === 'history' ? 'bg-primaryMain text-white px-4' : ''}`}>
                        History
                    </div>
                    <div onClick={() => changeStatus('new')} className={`rounded-full font-sansMedium text-base text-primaryTextColor py-1 px-2 cursor-pointer ${status === 'new' ? 'bg-primaryMain text-white px-4' : ''}`}>
                        New
                    </div>
                    <div onClick={() => changeStatus('postponed')} className={`rounded-full font-sansMedium text-base text-primaryTextColor py-1 px-2 cursor-pointer ${status === 'postponed' ? 'bg-primaryMain text-white px-4' : ''}`}>
                        Postponed
                    </div>
                    <div onClick={() => changeStatus('rumor')} className={`rounded-full font-sansMedium text-base text-primaryTextColor py-1 px-2 cursor-pointer ${status === 'rumor' ? 'bg-primaryMain text-white px-4' : ''}`}>
                        Rumor
                    </div>
                </div>
                {/* filters End */}

                {/* Response Data Table Start */}
                <div className=' w-full bg-primaryBg py-4 rounded-xl'>
                    <div className='flex w-full overflow-auto scrollbar-thin'>
                        {/* Stocks Name Column */}
                        <div className='flex flex-col items-center h-max w-[7%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Stocks
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full pl-1' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.ticker || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ipo_status Transacted Column */}
                        <div className='flex flex-col items-center h-max w-[7%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Status
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.ipo_status || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* primary_exchange Price Column */}
                        <div className='flex flex-col items-center h-max w-[7%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Exchange
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.primary_exchange ? `${ipo.primary_exchange}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* issuer_name Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Issuer Name
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium  text-sm border-b border-black/5'>
                                        {ipo.issuer_name || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* shares_outstanding Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Shares Outstanding
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3  font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.shares_outstanding || 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* max_shares_offered Date Column */}
                        <div className='flex flex-col items-start h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-base text-primaryTextColor/60 bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Max Shares Offered
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.max_shares_offered || 'N/A'}
                                        {/* {ipo.transaction_date && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(ipo.transaction_date.trim()) 
                                            ? ipo.transaction_date.trim() 
                                            : 'N/A'} */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* total_offer_size Date Column */}
                        <div className='flex flex-col items-start h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-base text-primaryTextColor/60 bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Total Offer Size
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.total_offer_size || 'N/A'}
                                        {/* {ipo.transaction_date && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(ipo.transaction_date.trim()) 
                                            ? ipo.transaction_date.trim() 
                                            : 'N/A'} */}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* lowest_offer_price Title Column */}
                        <div className='flex flex-col items-center h-max w-[5%] min-w-max'>
                            <div className='w-full font-sansMedium  text-center sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Lowest Price
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full text-center' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.lowest_offer_price ? `$${ipo.lowest_offer_price}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* highest_offer_price Type Column */}
                        <div className='flex flex-col items-center h-max w-[5%] min-w-max'>
                            <div className='w-full font-sansMedium text-center sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Highest Price
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full pr-1 text-center' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.highest_offer_price ? `$${ipo.highest_offer_price}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* final_issue_price Type Column */}
                        <div className='flex flex-col items-center h-max w-[5%] min-w-max'>
                            <div className='w-full font-sansMedium text-center sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Final Price
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full pr-1 text-center' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.final_issue_price ? `$${ipo.final_issue_price}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* lot_size Type Column */}
                        <div className='flex flex-col items-center h-max w-[5%] min-w-max'>
                            <div className='w-full font-sansMedium text-center sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Lot Size
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full pr-1 text-center' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.lot_size ? `${ipo.lot_size}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* announced_date Type Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium text-center sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Announced Date
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full pr-1 text-center' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.announced_date ? `${ipo.announced_date}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* last_updated Type Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium text-center sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Last Updated
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full pr-1 text-center' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.last_updated ? `${ipo.last_updated}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* currency_code Type Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium text-center sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Currency
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full pr-1 text-center' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.currency_code ? `${ipo.currency_code}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* us_code Type Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                US Code
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.us_code ? `${ipo.us_code}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* isin Type Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                ISIN
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.isin ? `${ipo.isin}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* security_type Type Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium  text-center sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Security Type
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full pr-1 text-center' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.security_type ? `${ipo.security_type}` : 'N/A'}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* security_description Type Column */}
                        <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                            <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                Security Description
                            </div>
                            {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((ipo, index) => (
                                <div className='w-full pr-1' key={`${ipo.ticker}-${index}`}>
                                    <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                        {ipo.security_description ? `${ipo.security_description}` : 'N/A'}
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

            {!error && ipos.length === 0 && !loading && (
                <DataNotAvailable />
            )}

            {error && !ipos && !loading && (
                <RequestError />
            )}
        </div>
    );
};

export default IPOsCalendar;