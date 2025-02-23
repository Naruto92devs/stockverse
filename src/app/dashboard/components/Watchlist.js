'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useWatchlist } from '@/context/WatchlistContext';
import DataNotAvailable from '@/loaders&errors_UI/dataUnavailable';
import RequestError from '@/loaders&errors_UI/requestError';
import Loading from '@/loaders&errors_UI/loading';
import MainLoader from '@/loaders&errors_UI/mian_loader';
import Logo from '@/components/Logo';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

const usePageSize = () => {
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const updatePageSize = () => {
            if (window.matchMedia('(min-width: 2048px)').matches) {
                setPageSize(15); // XL screens
            } else if (window.matchMedia('(min-width: 1560px)').matches) {
                setPageSize(11); // LG screens
            } else if (window.matchMedia('(min-width: 768px)').matches) {
                setPageSize(7); // LG screens
            } else {
                setPageSize(6); // Default for smaller screens
            }
        };

        updatePageSize(); // Run initially
        window.addEventListener('resize', updatePageSize);
        return () => window.removeEventListener('resize', updatePageSize);
    }, []);

    return pageSize;
};

const WatchList = ({ setIsvisible }) => {
    const { watchlist, fetchWatchlist, loading, error } = useWatchlist();
    const [CurrentPage, setCurrentPage] = useState(1);
    const ContainerRef = useRef(null);
    const ActiveButtonRef = useRef(null);
    const PAGE_SIZE = usePageSize(); // Get dynamic page size

    useEffect(() => {
        // Scroll to the active button
        if (ActiveButtonRef.current && ActiveButtonRef.current) {
            ActiveButtonRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [CurrentPage]);

    // Divide transactions into chunks of PAGE_SIZE
    const PaginatedData = useMemo(() => {
        if (!watchlist || watchlist.length === 0) return [];
        return watchlist.reduce((result, watchlist, index) => {
            const pageIndex = Math.floor(index / PAGE_SIZE);
            if (!result[pageIndex]) result[pageIndex] = [];
            result[pageIndex].push(watchlist);
            return result;
        }, []);
    }, [watchlist, PAGE_SIZE]);

    // Get total pages
    const watchlistTotalPages = PaginatedData.length;

    // Change page handler
    const goToPage = (page) => {
        if (page >= 1 && page <= watchlistTotalPages) {
            setCurrentPage(page);
        }
    };

    // Change page handler
    const addWatchlist = () => {
        setIsvisible(true);
    };

    const handleSubmitWatchList = async (symbol) => {
        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/watchlist`, {
                symbol,
            }, {
                withCredentials: true,
            });
    
            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                fetchWatchlist();
            } else if (response.status === 200) {
                fetchWatchlist();
            }
        } catch (error) {
            console.error('Error during watchlist submission:', error);
        }
    };

    if (!watchlist && loading) {
        return <MainLoader Zindex={10} />; // Handle loading state
    }

    return (
        <div className='flex flex-col lg:px-4 px-2 items-center w-full gap-4'>
            <div className='w-full flex flex-col py-6 items-center gap-4'>
                {/* Response Data Table Start */}
                <div className='w-full'>
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='font-sansMedium text-xl sm:text-2xl text-primaryTextColor'>My watchlist</h1>
                        <button onClick={addWatchlist} className='px-3 py-2 text-base text-white bg-primaryMain font-sansMeium rounded-lg'>+ Add WatchList</button>
                    </div>
                    <div className=' w-full mt-4 bg-primaryBg py-4 rounded-xl'>
                        <div className='flex w-full overflow-auto scrollbar-thin'>
                            {/* Stocks Name Column */}
                            <div className='flex flex-col items-center h-max w-[15%] flex-grow min-w-max'>
                                <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Stocks
                                </div>
                                {PaginatedData.length > 0 && PaginatedData[CurrentPage - 1]?.map((stock, index) => (
                                    <div className='w-full pl-1 gap-2' key={`${stock.ticker}-${index}`}>
                                        <Link href={`/dashboard?symbol=${stock.ticker}&view=chart`} className='p-3 flex gap-2 items-center border-b border-black/5'>
                                            <Logo symbol={stock.ticker} alt={stock.name} size={300} className="w-10 h-10 rounded-lg shadow" />
                                            <h2 className='text-lg leading-[110%] font-sansMedium text-primaryTextColor'>{stock.ticker || 'N/A'}</h2>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Name Column */}
                            <div className='flex max-sm:hidden flex-col items-center h-max w-[25%] min-w-max'>
                                <div className='w-full sticky font-sansMedium top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Name
                                </div>
                                {PaginatedData.length > 0 && PaginatedData[CurrentPage - 1]?.map((stock, index) => (
                                    <div className='w-full' key={`${stock.ticker}-${index}`}>
                                        <div className='px-3 py-5 font-sansMedium text-md border-b border-black/5'>
                                            {stock.name ? (stock.name.match(/\b\w+\b/g)?.slice(0, 4).join(" ") || stock.name) : "Undefined"}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Column */}
                            <div className='flex flex-col items-center h-max w-[15%] min-w-max'>
                                <div className='w-full sticky font-sansMedium top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Price
                                </div>
                                {PaginatedData.length > 0 && PaginatedData[CurrentPage - 1]?.map((stock, index) => (
                                    <div className='w-full' key={`${stock.ticker}-${index}`}>
                                        <div className='px-3 py-5 font-sansMedium text-md border-b border-black/5'>
                                            ${stock.price}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Change Price Column */}
                            <div className='flex flex-col items-center h-max w-[15%] min-w-max'>
                                <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Change
                                </div>
                                {PaginatedData.length > 0 && PaginatedData[CurrentPage - 1]?.map((stock, index) => (
                                    <div className='w-full' key={`${stock.ticker}-${index}`}>
                                        <div className={`flex px-1 py-4 border-b border-black/5`}>
                                            <div className={`px-3 py-1.5 leading-[119%] font-sansMedium rounded-full text-md border-b border-black/5 ${stock.todaysChangePerc >= 0 ? 'text-buy bg-buy/10' : 'text-sell bg-sell/10'}`}>
                                                {stock.todaysChangePerc ? stock.todaysChangePerc >= 0 ? `+${stock.todaysChangePerc.toFixed(2)}%` : `${stock.todaysChangePerc.toFixed(2)}%` : 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Volume Column */}
                            <div className='flex flex-col items-center h-max w-[15%] min-w-max'>
                                <div className='w-full sticky top-0 z-[2] font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Volume
                                </div>
                                {PaginatedData.length > 0 && PaginatedData[CurrentPage - 1]?.map((stock, index) => (
                                    <div className='w-full' key={`${stock.ticker}-${index}`}>
                                        <div className='px-3 py-5 font-sansMedium text-md border-b border-black/5'>
                                            {stock.volume ? stock.volume : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* M.Cap Column */}
                            <div className='flex flex-col items-center h-max w-[15%] min-w-max'>
                                <div className='w-full sticky top-0 z-[2] font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    M.Cap
                                </div>
                                {PaginatedData.length > 0 && PaginatedData[CurrentPage - 1]?.map((stock, index) => (
                                    <div className='w-full' key={`${stock.ticker}-${index}`}>
                                        <div className='px-3 py-5 font-sansMedium text-md border-b border-black/5'>
                                            {stock.marketCap ? `$${stock.marketCap}` : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Remove Column */}
                            <div className='flex flex-col items-center h-max w-[5%] min-w-max'>
                                <div className='w-full text-center sticky top-0 z-[2] font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Remove
                                </div>
                                {PaginatedData.length > 0 && PaginatedData[CurrentPage - 1]?.map((stock, index) => (
                                    <div className='w-full' key={`${stock.ticker}-${index}`}>
                                        <div className='px-3 py-4 flex items-center justify-center border-b border-black/5'>
                                            <Image onClick={() => handleSubmitWatchList(stock.ticker)} className='cursor-pointer' src='/images/cross.svg' width={32} height={32} alt='remove'/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controller Start */}
                        {watchlistTotalPages > 1 && (
                            <div className='px-4 pt-4 bg-primaryBg w-full flex justify-between items-center gap-4'>
                                {/* Previous Button */}
                                <button
                                    className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10'
                                    disabled={CurrentPage === 1}
                                    onClick={() => goToPage(CurrentPage - 1)}
                                >
                                    Previous
                                </button>

                                {/* Scrollable Numbered Buttons */}
                                <div className='overflow-x-auto scrollbar-hide w-full max-w-[150px]' ref={ContainerRef}>
                                    <div className='w-max flex gap-2'>
                                        {Array.from({ length: watchlistTotalPages }, (_, index) => (
                                            <button
                                                key={index}
                                                ref={CurrentPage === index + 1 ? ActiveButtonRef : null}
                                                className={`px-3 py-0.5 font-sansMedium rounded-full text-black ${CurrentPage === index + 1 ? 'text-primaryMain bg-primaryMain/10' : ''
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
                                    disabled={CurrentPage === watchlistTotalPages}
                                    onClick={() => goToPage(CurrentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                        {/* Controller End */}
                    </div>
                </div>
                {/* Response Data Table End */}
            </div>

            {/* Loader Start */}
            {loading && (
                <div className='fixed z-[7] w-full h-full bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center'>
                    <Loading />
                </div>
            )}
            {/* Loader End */}

            {!error && watchlist && watchlist.length === 0 && !loading && (
                <DataNotAvailable />
            )}

            {!error && !watchlist && !loading && (
                <DataNotAvailable />
            )}

            {error && !watchlist && !loading && (
                <RequestError />
            )}
        </div>
    );
};

export default WatchList;