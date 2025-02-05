'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useGainersLosers } from '@/context/GainersLosersContext';
import DataNotAvailable from '@/loaders&errors_UI/dataUnavailable';
import RequestError from '@/loaders&errors_UI/requestError';
import Loading from '@/loaders&errors_UI/loading';
import MainLoader from '@/loaders&errors_UI/mian_loader';
import Logo from '@/components/Logo';

const usePageSize = () => {
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const updatePageSize = () => {
            if (window.matchMedia('(min-width: 2048px)').matches) {
                setPageSize(12); // XL screens
            } else if (window.matchMedia('(min-width: 1560px)').matches) {
                setPageSize(8); // LG screens
            } else if (window.matchMedia('(min-width: 768px)').matches) {
                setPageSize(6); // LG screens
            } else {
                setPageSize(4); // Default for smaller screens
            }
        };

        updatePageSize(); // Run initially
        window.addEventListener('resize', updatePageSize);
        return () => window.removeEventListener('resize', updatePageSize);
    }, []);

    return pageSize;
};

const TopGainersLosers = ({ symbol }) => {
    const { gainers, losers, loading, error } = useGainersLosers();
    const [gainersCurrentPage, setGainersCurrentPage] = useState(1);
    const [losersCurrentPage, setLosersCurrentPage] = useState(1);
    const gainersContainerRef = useRef(null);
    const gainersActiveButtonRef = useRef(null);
    const losersContainerRef = useRef(null);
    const losersActiveButtonRef = useRef(null);
    const PAGE_SIZE = usePageSize(); // Get dynamic page size

    useEffect(() => {
        // Scroll to the active button
        if (gainersActiveButtonRef.current && gainersActiveButtonRef.current) {
            gainersActiveButtonRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [gainersCurrentPage]);

    useEffect(() => {
        // Scroll to the active button
        if (losersActiveButtonRef.current && losersContainerRef.current) {
            losersActiveButtonRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [losersCurrentPage]);

    useEffect(() => {
        setLosersCurrentPage(1);
    }, [gainers, symbol]);

    // Divide transactions into chunks of PAGE_SIZE
    const gainersPaginatedData = useMemo(() => {
        if (!gainers || gainers.length === 0) return [];
        return gainers.reduce((result, gainers, index) => {
            const pageIndex = Math.floor(index / PAGE_SIZE);
            if (!result[pageIndex]) result[pageIndex] = [];
            result[pageIndex].push(gainers);
            return result;
        }, []);
    }, [gainers, PAGE_SIZE]);

    // Get total pages
    const gainersTotalPages = gainersPaginatedData.length;

    // Divide transactions into chunks of PAGE_SIZE
    const losersPaginatedData = useMemo(() => {
        if (!losers || losers.length === 0) return [];
        return losers.reduce((result, losers, index) => {
            const pageIndex = Math.floor(index / PAGE_SIZE);
            if (!result[pageIndex]) result[pageIndex] = [];
            result[pageIndex].push(losers);
            return result;
        }, []);
    }, [losers, PAGE_SIZE]);

    // Get total pages
    const losersTotalPages = losersPaginatedData.length;

    // Change page handler
    const gainersGoToPage = (page) => {
        if (page >= 1 && page <= gainersTotalPages) {
            setGainersCurrentPage(page);
        }
    };

    // Change page handler
    const losersGoToPage = (page) => {
        if (page >= 1 && page <= losersTotalPages) {
            setLosersCurrentPage(page);
        }
    };

    if (!gainers && loading) {
        return <MainLoader Zindex={10} />; // Handle loading state
    }

    return (
        <div className='flex flex-col lg:px-4 px-2 items-center w-full gap-4'>
            <div className='w-full flex flex-col py-6 items-center gap-4'>
                <h1 className='font-sansMedium md:text-3xl text-2xl text-center'>
                    Top Gainers And Losers
                </h1>
                <p className='text-md font-sansRegular text-primaryTextColor xl:w-[35%] lg:w-[60%] text-center'>Discover real-time stock data, personalized insights, and AI-driven recommendations tailored to your trading style</p>

                {/* Response Data Table Start */}
                <div className='w-full flex pt-8 lg:flex-row flex-col justify-between lg:gap-0 gap-8'>
                    {/* Top Gainers */}
                    <div className='lg:w-[49%] w-full'>
                        <h1 className='font-sansMedium text-2xl text-primaryTextColor'>Top Gainers</h1>
                        <div className=' w-full mt-4 bg-primaryBg py-4 rounded-xl'>
                            <div className='flex w-full overflow-auto scrollbar-thin'>
                                {/* Stocks Name Column */}
                                <div className='flex flex-col items-center h-max w-[40%] min-w-max'>
                                    <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                        Stocks
                                    </div>
                                    {gainersPaginatedData.length > 0 && gainersPaginatedData[gainersCurrentPage - 1]?.map((stock, index) => (
                                        <div className='w-full pl-1 gap-2' key={`${stock.ticker}-${index}`}>
                                            <div className='p-3 flex gap-2 items-center border-b border-black/5'>
                                                <Logo symbol={stock.ticker} alt={stock.name} size={300} className="w-12 h-12 rounded-lg shadow" />
                                                <div className=''>
                                                    <h2 className='text-base leading-[110%] font-sansMedium text-primaryTextColor'>{stock.ticker || 'N/A'}</h2>
                                                    <p className='textr-xs font-sansRegular leading-[100%] text-primaryTextColor/60'>
                                                        {stock.name ? (stock.name.includes(" ") ? stock.name.split(" ")[0] : stock.name) : "Undefined"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Column */}
                                <div className='flex flex-col items-center h-max w-[20%] min-w-max'>
                                    <div className='w-full sticky font-sansMedium top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                        Price
                                    </div>
                                    {gainersPaginatedData.length > 0 && gainersPaginatedData[gainersCurrentPage - 1]?.map((stock, index) => (
                                        <div className='w-full' key={`${stock.ticker}-${index}`}>
                                            <div className='px-3 py-6 font-sansMedium text-md border-b border-black/5'>
                                                {stock.price ? `$${stock.price}` : 'N/A'}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* M.Cap Column */}
                                <div className='flex flex-col items-center h-max w-[20%] min-w-max'>
                                    <div className='w-full sticky top-0 z-[2] font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                        M.Cap
                                    </div>
                                    {gainersPaginatedData.length > 0 && gainersPaginatedData[gainersCurrentPage - 1]?.map((stock, index) => (
                                        <div className='w-full' key={`${stock.ticker}-${index}`}>
                                            <div className='px-3 py-6 font-sansMedium text-md border-b border-black/5'>
                                                {stock.marketCap ? `$${stock.marketCap}` : 'N/A'}
                                            </div>
                                        </div>
                                    ))}
                                </div>


                                {/* Move Price Column */}
                                <div className='flex flex-col items-center h-max w-[20%] min-w-max'>
                                    <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                        Move
                                    </div>
                                    {gainersPaginatedData.length > 0 && gainersPaginatedData[gainersCurrentPage - 1]?.map((stock, index) => (
                                        <div className='w-full' key={`${stock.ticker}-${index}`}>
                                            <div className='px-3 py-6 font-sansMedium text-md text-buy border-b border-black/5'>
                                                {stock.todaysChangePerc ? `+${stock.todaysChangePerc.toFixed(2)}%` : 'N/A'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Controller Start */}
                            {gainersTotalPages > 1 && (
                                <div className='px-4 pt-4 bg-primaryBg w-full flex justify-between items-center gap-4'>
                                    {/* Previous Button */}
                                    <button
                                        className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10'
                                        disabled={gainersCurrentPage === 1}
                                        onClick={() => gainersGoToPage(gainersCurrentPage - 1)}
                                    >
                                        Previous
                                    </button>

                                    {/* Scrollable Numbered Buttons */}
                                    <div className='overflow-x-auto scrollbar-hide w-full max-w-[150px]' ref={gainersContainerRef}>
                                        <div className='w-max flex gap-2'>
                                            {Array.from({ length: gainersTotalPages }, (_, index) => (
                                                <button
                                                    key={index}
                                                    ref={gainersCurrentPage === index + 1 ? gainersActiveButtonRef : null}
                                                    className={`px-3 py-0.5 font-sansMedium rounded-full text-black ${gainersCurrentPage === index + 1 ? 'text-primaryMain bg-primaryMain/10' : ''
                                                        }`}
                                                    onClick={() => gainersGoToPage(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10'
                                        disabled={gainersCurrentPage === gainersTotalPages}
                                        onClick={() => gainersGoToPage(gainersCurrentPage + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                            {/* Controller End */}
                        </div>
                    </div>

                    {/* Top Losers */}
                    <div className='lg:w-[49%] w-full'>
                        <h1 className='font-sansMedium text-2xl text-primaryTextColor'>Top Losers</h1>
                        <div className=' w-full mt-4 bg-primaryBg py-4 rounded-xl'>
                            <div className='flex w-full overflow-auto scrollbar-thin'>
                                {/* Stocks Name Column */}
                                <div className='flex flex-col items-center h-max w-[40%] min-w-max'>
                                    <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                        Stocks
                                    </div>
                                    {losersPaginatedData.length > 0 && losersPaginatedData[losersCurrentPage - 1]?.map((stock, index) => (
                                        <div className='w-full pl-1 gap-2' key={`${stock.ticker}-${index}`}>
                                            <div className='p-3 flex gap-2 items-center border-b border-black/5'>
                                                <Logo symbol={stock.ticker} alt={stock.name} size={300} className="w-12 h-12 rounded-lg shadow" />
                                                <div className=''>
                                                    <h2 className='text-base leading-[110%] font-sansMedium text-primaryTextColor'>{stock.ticker || 'N/A'}</h2>
                                                    <p className='textr-xs font-sansRegular leading-[100%] text-primaryTextColor/60'>
                                                        {stock.name ? (stock.name.includes(" ") ? stock.name.split(" ")[0] : stock.name) : "Undefined"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Column */}
                                <div className='flex flex-col items-center h-max w-[20%] min-w-max'>
                                    <div className='w-full sticky font-sansMedium top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                        Price
                                    </div>
                                    {losersPaginatedData.length > 0 && losersPaginatedData[losersCurrentPage - 1]?.map((stock, index) => (
                                        <div className='w-full' key={`${stock.ticker}-${index}`}>
                                            <div className='px-3 py-6 font-sansMedium text-md border-b border-black/5'>
                                                {stock.price ? `$${stock.price}` : 'N/A'}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* M.Cap Column */}
                                <div className='flex flex-col items-center h-max w-[20%] min-w-max'>
                                    <div className='w-full sticky top-0 z-[2] font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                        M.Cap
                                    </div>
                                    {losersPaginatedData.length > 0 && losersPaginatedData[losersCurrentPage - 1]?.map((stock, index) => (
                                        <div className='w-full' key={`${stock.ticker}-${index}`}>
                                            <div className='px-3 py-6 font-sansMedium text-md border-b border-black/5'>
                                                {stock.marketCap ? `$${stock.marketCap}` : 'N/A'}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Move Price Column */}
                                <div className='flex flex-col items-center h-max w-[20%] min-w-max'>
                                    <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                        Move
                                    </div>
                                    {losersPaginatedData.length > 0 && losersPaginatedData[losersCurrentPage - 1]?.map((stock, index) => (
                                        <div className='w-full' key={`${stock.ticker}-${index}`}>
                                            <div className='px-3 py-6 font-sansMedium text-md text-sell border-b border-black/5'>
                                                {stock.todaysChangePerc ? `${stock.todaysChangePerc.toFixed(2)}%` : 'N/A'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Controller Start */}
                            {losersTotalPages > 1 && (
                                <div className='px-4 pt-4 bg-primaryBg w-full flex justify-between items-center gap-4'>
                                    {/* Previous Button */}
                                    <button
                                        className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10'
                                        disabled={losersCurrentPage === 1}
                                        onClick={() => losersGoToPage(losersCurrentPage - 1)}
                                    >
                                        Previous
                                    </button>

                                    {/* Scrollable Numbered Buttons */}
                                    <div className='overflow-x-auto scrollbar-hide w-full max-w-[150px]' ref={losersContainerRef}>
                                        <div className='w-max flex gap-2'>
                                            {Array.from({ length: losersTotalPages }, (_, index) => (
                                                <button
                                                    key={index}
                                                    ref={losersCurrentPage === index + 1 ? losersActiveButtonRef : null}
                                                    className={`px-3 font-sansMedium py-0.5 rounded-full text-black ${losersCurrentPage === index + 1 ? 'text-primaryMain bg-primaryMain/10' : ''
                                                        }`}
                                                    onClick={() => losersGoToPage(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10'
                                        disabled={losersCurrentPage === losersTotalPages}
                                        onClick={() => losersGoToPage(losersCurrentPage + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                            {/* Controller End */}
                        </div>
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

            {!error && gainers.length === 0 && !loading && (
                <DataNotAvailable />
            )}

            {error && !gainers && !loading && (
                <RequestError />
            )}
        </div>
    );
};

export default TopGainersLosers;