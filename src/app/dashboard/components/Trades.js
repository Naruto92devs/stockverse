'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTrades } from '@/context/TradesContext';
import formatNumber from '@/components/FormatNumber';
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
              setPageSize(14); // LG screens
          } else if (window.matchMedia('(min-width: 768px)').matches) {
              setPageSize(9); // LG screens
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


const Trades = ({ symbol }) => {

    const { trades, quote, loading, selectedDate, setSelectedDate, error, fetchTrades } = useTrades(); // Get trades data from context
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
    }, [setSelectedDate, symbol]);

    
    // Background fetch every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchTrades(symbol, true);
            }
        }, 10 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol, selectedDate]);
    
    // Divide transactions into chunks of PAGE_SIZE
    const paginatedData = useMemo(() => {
        if (!trades || trades.length === 0) return [];
        return trades.reduce((result, row, index) => {
            const pageIndex = Math.floor(index / PAGE_SIZE);
            if (!result[pageIndex]) result[pageIndex] = [];
            result[pageIndex].push(row);
            return result;
        }, []);
    }, [PAGE_SIZE, trades]);

    // Get total pages
    const totalPages = paginatedData.length;

    // Change page handler
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDateChange = (e) => {
        const formattedDate = e.target.value; // Date in YYYY-MM-DD format
        setSelectedDate(formattedDate); // Set selected date
    };

    if (!trades && loading) {
        return <MainLoader Zindex={10} />; // Handle loading state
    }

    return (
        <div className='flex flex-col lg:px-4 px-2 items-center w-full gap-4'>
            <div className='w-full flex flex-col py-6 items-center gap-4'>
                <h1 className='font-sansMedium md:text-3xl text-2xl text-center'>
                    Trades for <span className='dashboard_symbol_heading'>{symbol}</span>
                </h1>
                
                {/* Response Data Table Start */}
                    <div className='w-full md:pt-4 flex md:justify-between gap-4 items-center'>
                        <h2 className='max-md:hidden font-sansMedium md:text-2xl text-xl text-center'>
                            Trades List
                        </h2>
                        {/* Filter Dropdown */}
                        <div className="max-md:w-full flex flex-wrap justify-between gap-2 items-center">
                            <p className="max-lg:pl-3 font-sansMedium  text-base text-primaryTextColor">Select Date:</p>
                            <input 
                                onChange={handleDateChange} 
                                placeholder="Search" 
                                value={selectedDate}
                                type="date"
                                className="px-3 py-1 border-2 border-[#D0D5DD] outline-none overflow-hidden bg-white rounded-lg transition-all duration-500"/>
                        </div>
                    </div>
                    <div className='w-full bg-primaryBg shadow-lg py-4 rounded-xl'>
                        <div className='flex w-full overflow-auto scrollbar-thin'>
                            {/* Exchange Column */}
                            <div className='flex flex-col h-max w-[20%] min-w-max'>
                                <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Excahnge
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((trade, index) => (
                                    <div className='w-full pl-1' key={`${trade.id}-${index}`}>
                                        <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                            {exchangeMapping[trade.exchange] || 'Unknown Exchange'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Transacted Column */}
                            <div className='flex flex-col h-max w-[10%] min-w-max'>
                                <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Price
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((trade, index) => (
                                    <div className='w-full' key={`${trade.id}-${index}`}>
                                        <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                            {trade.price ? `$${trade.price}` : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Size Price Column */}
                            <div className='flex flex-col items-center h-max w-[10%] min-w-max'>
                                <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Size
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((trade, index) => (
                                    <div className='w-full' key={`${trade.id}-${index}`}>
                                        <div className={`p-3 font-sansMedium text-sm border-b border-black/5`}>
                                            {trade.size ? trade.size : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Buy/Sell Column */}
                            <div className='flex flex-col h-max w-[15%] min-w-max'>
                                <div className='w-full font-sansMedium sticky text-center top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Buy/Sell
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((trade, index) => (
                                    <div className='w-full' key={`${trade.id}-${index}`}>
                                        <div className='p-3 font-sansMedium text-center text-sm border-b border-black/5'>
                                            {quote && (
                                            <div>
                                                {determineBuyOrSell(trade.price, quote.p, quote.P)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Num Column */}
                            <div className='flex flex-col h-max w-[15%] min-w-max'>
                                <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Num
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((trade, index) => (
                                    <div className='w-full' key={`${trade.id}-${index}`}>
                                        <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                            {trade.sequence_number ? `${trade.sequence_number}` : 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tape Column */}
                            <div className='flex flex-col h-max w-[15%] min-w-max'>
                                <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Tape
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((trade, index) => (
                                    <div className='w-full' key={`${trade.id}-${index}`}>
                                        <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                            {tapeMapping[trade.tape] || 'N/A'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Timestamp Column */}
                            <div className='flex flex-col h-max w-[15%] min-w-max'>
                                <div className='w-full font-sansMedium sticky top-0 z-[2] text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                                    Timestamp
                                </div>
                                {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((trade, index) => (
                                    <div className='w-full' key={`${trade.id}-${index}`}>
                                        <div className='p-3 font-sansMedium text-sm border-b border-black/5'>
                                            {convertTimestamp(trade.participant_timestamp)}
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
                                    className='px-3 py-1 font-sansMedium text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
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
                <div className='fixed z-[7] w-full h-full bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center'>
                    <Loading />
                </div>
            )}
            {/* Loader End */}

            {!error && trades && trades.length === 0 && !loading && (
                <DataNotAvailable />
            )}

            {error && !trades && !loading && (
                <RequestError />
            )}
        </div>
    );
};

export default Trades;

// Utility function to convert SIP timestamp to time-only format
const convertTimestamp = (sipTimestamp) => {
  const timestampInSeconds = sipTimestamp / 1_000_000_000;
  const date = new Date(timestampInSeconds * 1000); // Convert to milliseconds
  return date.toLocaleTimeString(); // Return only the time part
};

// Function to map tape integer values to names
const tapeMapping = {
  1: "NYSE",
  2: "NYSE ARCA / NYSE American",
  3: "NASDAQ",
};

// Function to map exchange integer values to names
const exchangeMapping = {
  1: "NYSE American, LLC",
  2: "Nasdaq OMX BX, Inc.",
  3: "NYSE National, Inc.",
  4: "FINRA Alternative Display Facility",
  5: "Unlisted Trading Privileges",
  6: "International Securities Exchange, LLC - Stocks",
  7: "Cboe EDGA",
  8: "Cboe EDGX",
  9: "NYSE Chicago, Inc.",
  10: "New York Stock Exchange",
  11: "NYSE Arca, Inc.",
  12: "Nasdaq",
  13: "Consolidated Tape Association",
  14: "Long-Term Stock Exchange",
  15: "Investors Exchange",
  16: "Cboe Stock Exchange",
  17: "Nasdaq Philadelphia Exchange LLC",
  18: "Cboe BYX",
  19: "Cboe BZX",
  20: "MIAX Pearl",
  21: "Members Exchange",
  62: "OTC Equity Security",
  201: "FINRA NYSE TRF",
  202: "FINRA Nasdaq TRF Carteret",
  203: "FINRA Nasdaq TRF Chicago",
};

// Function to determine Buy or Sell based on trade price, bid price, and ask price
const determineBuyOrSell = (tradePrice, bidPrice, askPrice) => {
  if (tradePrice >= askPrice) {
      return "Buy";
  } else if (tradePrice <= bidPrice) {
      return "Sell";
  }
  return "Neutral";
};