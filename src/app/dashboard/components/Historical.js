'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useHistoricalSummary } from '@/context/HistoricalSummaryContext';
import { useHistoricalData } from '@/context/HistoricalDataContext';
import formatNumber from '@/components/FormatNumber';
import DataNotAvailable from '@/loaders&errors_UI/dataUnavailable';
import RequestError from '@/loaders&errors_UI/requestError';
import Loading from '@/loaders&errors_UI/loading';
import MainLoader from '@/loaders&errors_UI/mian_loader';
import Image from 'next/image';

const usePageSize = () => {
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const updatePageSize = () => {
            if (window.matchMedia('(min-width: 2048px)').matches) {
                setPageSize(17); // XL screens
            } else if (window.matchMedia('(min-width: 1560px)').matches) {
                setPageSize(11); // LG screens
            } else if (window.matchMedia('(min-width: 768px)').matches) {
                setPageSize(8); // LG screens
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

const Historical = ({ symbol }) => {

    const { historicalSummary, summaryLoading, summaryError } = useHistoricalSummary(); // Fix destructuring
    const { historicalData, loading, filter, setFilter, error } = useHistoricalData(); // Fix destructuring
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);
    const activeButtonRef = useRef(null);
    const PAGE_SIZE = usePageSize(); // Get dynamic page size
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const dropdownRef = useRef(null);

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
    }, [historicalData, symbol]);
    
    // Divide transactions into chunks of PAGE_SIZE
    const paginatedData = useMemo(() => {
        if (!historicalData || historicalData.length === 0) return [];
        return historicalData.reduce((result, row, index) => {
            const pageIndex = Math.floor(index / PAGE_SIZE);
            if (!result[pageIndex]) result[pageIndex] = [];
            result[pageIndex].push(row);
            return result;
        }, []);
    }, [historicalData, PAGE_SIZE]);

    // Get total pages
    const totalPages = paginatedData.length;

    // Change page handler
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    
    // Functions to handle filter dropdown
    const FilterToggle = () => setIsFilterOpen(prev => !prev);
    const FilterClose = () => setIsFilterOpen(false);
    const handleFilterChange = (value) => {
        setFilter(value);
        FilterClose();
    };

    if (!historicalSummary && summaryLoading) {
        return <MainLoader Zindex={10} />; // Handle loading state
    }

    return (
        <div className='flex flex-col lg:px-4 px-2 items-center w-full gap-4'>
            <div className='w-full flex flex-col py-6 items-center'>
                <h1 className='font-sansMedium md:text-3xl text-2xl text-center'>
                    Historical for <span className='dashboard_symbol_heading'>{symbol}</span>
                </h1>

                {/* Summary Start */}
                    <div className='flex pt-4 max-w-full w-max gap-4 overflow-x-auto overflow-y-hidden scrollbar-thin'>
                        {historicalSummary &&
                            Object.entries(historicalSummary).map(([label, data]) => (
                                <div className='px-4 py-4 rounded-lg shadow-lg bg-primaryBg' key={label}>
                                    <div className='flex items-center justify-between gap-8'>
                                        <div className='text-sm font-sansMedium text-primaryTextColor/60'>{label}</div>
                                        <Image width={28} height={28} className='w-4 h-4' src='/images/warning.png' alt='logo' />
                                    </div>
                                    <div className='mt-2 flex items-center justify-between gap-8'>
                                        <div className='text-base text-primaryTextColor font-sansMedium'>Change</div>
                                        <div className={`text-base font-sansMedium ${data.percentageChange >= 0 ? 'text-buy' : 'text-sell'}`}>{data.percentageChange.toFixed(2)}%</div>
                                    </div>
                                    <div className='flex items-center justify-between gap-8'>
                                        <div className='text-base text-primaryTextColor font-sansMedium'>Change</div>
                                        <div>{formatNumber(data.volume)}</div>
                                    </div>

                                    {/* <div>{data.date}</div>
                                    <div>${data.adjustedClose.toFixed(2)}</div>
                                    <div>${data.priceChange.toFixed(2)}</div> */}
                                </div>
                        ))}
                    </div>
                {/* Summary End */}
                
                {/* Response Data Table Start */}
                    <div className='w-full pt-8 flex md:justify-between items-center'>
                        <h2 className='max-md:hidden font-sansMedium md:text-2xl text-xl text-center'>
                            Detailed History
                        </h2>
                        {/* Filter Dropdown */}
                        <div className="mb-4 flex items-center select-none" ref={dropdownRef}>
                            <label htmlFor="filter" className="font-sansMedium text-lg text-primaryTextColor/70 mr-2 max-lg:pl-2">Timeframe:</label>
                            <div className="relative">
                                <div onClick={FilterToggle} className={`cursor-pointer font-sansMedium gap-x-2 flex items-end px-4 py-2 text-sm text-primaryTextColor bg-white lg:hover:bg-primaryMain/5 rounded-lg border-2 border-[#D0D5DD] ${isFilterOpen ? 'lg:bg-primaryMain/5' : ''}`}>
                                    {filter.replace('_ADJUSTED', '').replace('TIME_SERIES_', '').replace('_', ' ')}
                                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="var(--svg-color)" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                {isFilterOpen && (
                                    <ul className={`absolute p-2 z-10 transition duration-300 ease-in-out top-[100%] left-0 mt-2 w-48 bg-white rounded-xl shadow-xl  ${isFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                        <li className="w-full h-full cursor-pointer font-sansMedium rounded text-sm block px-4 py-2 text-primaryTextColor hover:bg-primaryMain/10" onClick={() => handleFilterChange('TIME_SERIES_INTRADAY')}>Intraday</li>
                                        <li className="w-full h-full cursor-pointer font-sansMedium rounded text-sm block px-4 py-2 text-primaryTextColor hover:bg-primaryMain/10" onClick={() => handleFilterChange('TIME_SERIES_DAILY_ADJUSTED')}>Daily</li>
                                        <li className="w-full h-full cursor-pointer font-sansMedium rounded text-sm block px-4 py-2 text-primaryTextColor hover:bg-primaryMain/10" onClick={() => handleFilterChange('TIME_SERIES_WEEKLY_ADJUSTED')}>Weekly</li>
                                        <li className="w-full h-full cursor-pointer font-sansMedium rounded text-sm block px-4 py-2 text-primaryTextColor hover:bg-primaryMain/10" onClick={() => handleFilterChange('TIME_SERIES_MONTHLY_ADJUSTED')}>Monthly</li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='w-full bg-primaryBg shadow-lg py-4 rounded-xl'>
                        <div className='flex w-full overflow-auto scrollbar-thin'>
                            {/* dateTime Column */}
                            <div className='flex flex-col h-max w-[20%] min-w-max'>
                                <div className='w-full sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Date
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                                    <div className='w-full pl-1' key={`${row.dateTime}-${index}`}>
                                        <div className='p-3 text-sm border-b border-black/5'>
                                            {row.dateTime || 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Close Transacted Column */}
                            <div className='flex flex-col h-max w-[15%] min-w-max'>
                                <div className='w-full sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Close
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                                    <div className='w-full' key={`${row.dateTime}-${index}`}>
                                        <div className='p-3 text-sm border-b border-black/5'>
                                            {row.close ? `$${row.close}` : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Change % Price Column */}
                            <div className='flex flex-col items-center h-max w-[12.5%] min-w-max'>
                                <div className='w-full sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Change %
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                                    <div className='w-full' key={`${row.dateTime}-${index}`}>
                                        <div className={`p-3 text-sm border-b border-black/5 ${row.changePercentage >= 0 ? 'text-buy pl-4' : 'text-sell'}`}>
                                            {row.changePercentage ? `${row.changePercentage}%` : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Open Column */}
                            <div className='flex flex-col h-max w-[12.5%] min-w-max'>
                                <div className='w-full sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Open
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                                    <div className='w-full' key={`${row.dateTime}-${index}`}>
                                        <div className='p-3 text-sm border-b border-black/5'>
                                            {row.open ? `$${row.open}` : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* High Column */}
                            <div className='flex flex-col h-max w-[12.5%] min-w-max'>
                                <div className='w-full sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    High
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                                    <div className='w-full' key={`${row.dateTime}-${index}`}>
                                        <div className='p-3 text-sm border-b border-black/5'>
                                            {row.high ? `$${row.high}` : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Low Column */}
                            <div className='flex flex-col h-max w-[12.5%] min-w-max'>
                                <div className='w-full sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Low
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                                    <div className='w-full' key={`${row.dateTime}-${index}`}>
                                        <div className='p-3 text-sm border-b border-black/5'>
                                            {row.low ? `$${row.low}` : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Volume Column */}
                            <div className='flex flex-col h-max w-[15%] min-w-max'>
                                <div className='w-full sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Volume
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                                    <div className='w-full pr-1' key={`${row.dateTime}-${index}`}>
                                        <div className='p-3 text-sm border-b border-black/5'>
                                            {row.volume || 'N/A'}
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
                                    className='px-3 py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
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
                                                className={`px-3 py-1 rounded-full text-black ${
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
                                    className='px-3 py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                                    disabled={currentPage === totalPages} 
                                    onClick={() => goToPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        {/* Controller End */}
                    </div>
                {/* Response Data Table End */}
            </div>

            {/* Loader Start */}
            {loading && (
                <div className='absolute z-[7] w-full h-full bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center'>
                    <Loading />
                </div>
            )}
            {/* Loader End */}

            {!error && historicalData && historicalData.length === 0 && !loading && (
                <DataNotAvailable />
            )}

            {error && !historicalData && !loading && (
                <RequestError />
            )}
        </div>
    );
};

export default Historical;