'use client';
import React, { useEffect, useState, useRef } from 'react';
import GainerFallbackUI from './GainerFallbackUI';
import formatNumber from './FormatNumber';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

const Historical_Data = ({ symbol }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState(null);
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const dropdownRef = useRef(null);

    const scrollRef = useRef();

    
    // Load filter from sessionStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedFilter = sessionStorage.getItem('historical-filter');
            if (savedFilter) {
                setFilter(savedFilter);
            } else {
                setFilter('TIME_SERIES_MONTHLY_ADJUSTED'); // Default value
            }
        }
    }, []);

    // Store filter in sessionStorage whenever it changes
    useEffect(() => {
        if (filter !== null && typeof window !== 'undefined') {
            sessionStorage.setItem('historical-filter', filter);
        }
    }, [filter]);
    
    // Functions to handle filter dropdown
    const FilterToggle = () => setIsFilterOpen(prev => !prev);
    const FilterClose = () => setIsFilterOpen(false);

    const handleFilterChange = (value) => {
        setFilter(value);
        FilterClose();
    };

    // Close the dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                FilterClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // API REQUEST AND DATA PROCESSING
    useEffect(() => {
        const fetchHistoricalData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${STOCKVERSE_BACK_END}/historical-data?filter=${filter}&symbol=${symbol}&interval=1min`);
                if (!response.ok) {
                    throw new Error('Failed to fetch historical data');
                }

                const responseData = await response.json();
                let timeSeriesKey;
                switch (filter) {
                    case 'TIME_SERIES_DAILY_ADJUSTED':
                        timeSeriesKey = 'Time Series (Daily)';
                        break;
                    case 'TIME_SERIES_WEEKLY_ADJUSTED':
                        timeSeriesKey = 'Weekly Adjusted Time Series';
                        break;
                    case 'TIME_SERIES_MONTHLY_ADJUSTED':
                        timeSeriesKey = 'Monthly Adjusted Time Series';
                        break;
                    case 'TIME_SERIES_INTRADAY':
                        timeSeriesKey = 'Time Series (1min)';
                        break;
                    default:
                        timeSeriesKey = 'Time Series (Daily)';
                }

                const timeSeriesData = responseData[timeSeriesKey];
                const historicalDataArray = Object.entries(timeSeriesData).map(([dateTime, data]) => {
                    const open = parseFloat(data['1. open']);
                    const close = parseFloat(data['4. close']);
                    const change = (close - open).toFixed(2);
                    const changePercentage = (((close - open) / open) * 100).toFixed(2);
                    const volume = formatNumber(Number(data['6. volume'])) ? formatNumber(Number(data['6. volume'])) : formatNumber(Number(data['5. volume']));

                    return {
                        dateTime,
                        open: open.toFixed(2),
                        high: parseFloat(data['2. high']).toFixed(2),
                        low: parseFloat(data['3. low']).toFixed(2),
                        volume: volume ? volume : 'N/A',
                        close: close.toFixed(2),
                        change,
                        changePercentage
                    };
                });

                setHistoricalData(historicalDataArray);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching historical data:", error);
                setError('Error loading historical data. Please try again later.');
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, [symbol, filter]);

        // Prevent rendering until filter is loaded
        if (filter === null) return null;

    return (
        <div ref={scrollRef} className="flex flex-col items-start cursor-pointer select-none overflow-x-auto">
            {/* Filter Dropdown */}
            <div className="mb-4 flex items-center" ref={dropdownRef}>
                <label htmlFor="filter" className="font-medium mr-2 max-lg:pl-2">Select Time Frame:</label>
                <div className="relative">
                    <div onClick={FilterToggle} className={`cursor-pointer font-medium gap-x-2 flex items-end px-4 py-2 text-sm text-primaryText lg:hover:bg-primaryText/10 rounded-lg border ${isFilterOpen ? 'lg:bg-primaryText/10' : ''}`}>
                        {filter.replace('_ADJUSTED', '').replace('TIME_SERIES_', '').replace('_', ' ')}
                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="var(--svg-color)" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {isFilterOpen && (
                        <ul className={`absolute p-2 z-10 transition duration-300 ease-in-out top-[100%] left-0 mt-2 w-48 bg-background rounded-md shadow-xl ${isFilterOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                            <li className="w-full h-full font-medium rounded text-sm block px-4 py-2 text-primaryText hover:bg-primaryText/10" onClick={() => handleFilterChange('TIME_SERIES_INTRADAY')}>Intraday</li>
                            <li className="w-full h-full font-medium rounded text-sm block px-4 py-2 text-primaryText hover:bg-primaryText/10" onClick={() => handleFilterChange('TIME_SERIES_DAILY_ADJUSTED')}>Daily</li>
                            <li className="w-full h-full font-medium rounded text-sm block px-4 py-2 text-primaryText hover:bg-primaryText/10" onClick={() => handleFilterChange('TIME_SERIES_WEEKLY_ADJUSTED')}>Weekly</li>
                            <li className="w-full h-full font-medium rounded text-sm block px-4 py-2 text-primaryText hover:bg-primaryText/10" onClick={() => handleFilterChange('TIME_SERIES_MONTHLY_ADJUSTED')}>Monthly</li>
                        </ul>
                    )}
                </div>
            </div>

            {/* Columns */}
            <div ref={scrollRef} className="flex max-w-full w-max max-h-[550px] overflow-y-auto">

                {/* Date/Time Column */}
                <div className="min-w-max w-[8rem] sticky top-0 left-0 z-[2] h-max bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                    {/* Header */}
                    <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                        {filter === 'TIME_SERIES_INTRADAY' ? 'Date & Time' : 'Date'}
                    </div>
                    {/* Rows */}
                    {loading || !historicalData || historicalData.length === 0 ? (
                        <GainerFallbackUI />
                    ) : (
                        historicalData.map((data, index) => (
                            <div key={index} className="w-full cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                <ul className="w-full">
                                    <li className="text-xs w-full text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">
                                        {data.dateTime}
                                    </li>
                                </ul>
                            </div>
                        ))
                    )}
                </div>

                {/* Close Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    {/* Header */}
                    <div className="sticky top-0 pl-2 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Close
                    </div>
                    {/* Rows */}
                    {loading || !historicalData || historicalData.length === 0 ? (
                        <GainerFallbackUI />
                    ) : (
                        historicalData.map((data, index) => (
                            <div key={index} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                {data.close}
                            </div>
                        ))
                    )}
                </div>

                {/* Change Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    {/* Header */}
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Change
                    </div>
                    {/* Rows */}
                    {loading || !historicalData || historicalData.length === 0 ? (
                        <GainerFallbackUI />
                    ) : (
                        historicalData.map((data, index) => (
                            <div key={index} className={`text-base py-3 border-b-[1px] border-primaryText/10 \
                            ${(data.change) >= 0 ? 'text-buy' : 'text-sell'}`}>
                                {data.change}
                            </div>
                        ))
                    )}
                </div>

                {/* Change % Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    {/* Header */}
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Change %
                    </div>
                    {/* Rows */}
                    {loading || !historicalData || historicalData.length === 0 ? (
                        <GainerFallbackUI />
                    ) : (
                        historicalData.map((data, index) => (
                            <div key={index} className={`text-base py-3 border-b-[1px] border-primaryText/10 ${(data.change) >= 0 ? 'text-buy' : 'text-sell'}`}>
                                {data.changePercentage}%
                            </div>
                        ))
                    )}
                </div>

                {/* Open Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    {/* Header */}
                    <div className="sticky top-0 pl-2 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Open
                    </div>
                    {/* Rows */}
                    {loading || !historicalData || historicalData.length === 0 ? (
                        <GainerFallbackUI />
                    ) : (
                        historicalData.map((data, index) => (
                            <div key={index} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                {data.open}
                            </div>
                        ))
                    )}
                </div>

                {/* High Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    {/* Header */}
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        High
                    </div>
                    {/* Rows */}
                    {loading || !historicalData || historicalData.length === 0 ? (
                        <GainerFallbackUI />
                    ) : (
                        historicalData.map((data, index) => (
                            <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10">
                                {data.high}
                            </div>
                        ))
                    )}
                </div>

                {/* Low Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    {/* Header */}
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Low
                    </div>
                    {/* Rows */}
                    {loading || !historicalData || historicalData.length === 0 ? (
                        <GainerFallbackUI />
                    ) : (
                        historicalData.map((data, index) => (
                            <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10">
                                {data.low}
                            </div>
                        ))
                    )}
                </div>

                {/* Volume Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    {/* Header */}
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Volume
                    </div>
                    {/* Rows */}
                    {loading || !historicalData || historicalData.length === 0 ? (
                        <GainerFallbackUI />
                    ) : (
                        historicalData.map((data, index) => (
                            <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10">
                                {data.volume}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Historical_Data;