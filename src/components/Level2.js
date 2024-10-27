'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Utility function to convert SIP timestamp to time-only format
const convertTimestamp = (sipTimestamp) => {
    const timestampInSeconds = sipTimestamp / 1_000_000_000;
    const date = new Date(timestampInSeconds * 1000); // Convert to milliseconds
    return date.toLocaleTimeString(); // Return only the time part
};

// Utility function to ensure symbol is uppercase
const sanitizeSymbol = (symbol) => {
    return symbol.toUpperCase();
};

// Mapping object for exchange ID to name
const exchangeMapping = {
    1: "NYSE American, LLC",
    2: "Nasdaq OMX BX, Inc.",
    3: "NYSE National, Inc.",
    4: "FINRA NYSE TRF",
    5: "Unlisted Trading Privileges",
    6: "International Securities Exchange",
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
    17: "Nasdaq Philadelphia Exchange",
    18: "Cboe BYX",
    19: "Cboe BZX",
    20: "MIAX Pearl",
    21: "Members Exchange",
    62: "OTC Equity Security",
};

// Function to determine Buy or Sell
const determineBuyOrSell = (price, bidPrice, askPrice) => {
    if (price >= askPrice) {
        return "Buy";
    } else if (price <= bidPrice) {
        return "Sell";
    }
    return "Neutral";
};

const Level2 = ({ symbol }) => {
    const [level2Data, setLevel2Data] = useState([]); // State for level 2 data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [selectedDate, setSelectedDate] = useState(''); // State for selected date
    const router = useRouter(); // Next.js router for navigation

    const scrollRef = useRef();

    const fetchLevel2 = async () => {
        setLoading(true);
        try {
            const sanitizedSymbol = sanitizeSymbol(symbol);
            let apiUrl = `https://api.polygon.io/v3/quotes/${sanitizedSymbol}?limit=1000&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`;

            // Append timestamp to API URL if the date is selected
            if (selectedDate) {
                apiUrl += `&timestamp=${selectedDate}`;
            }

            // Fetch level 2 data from Polygon API
            const level2Response = await fetch(apiUrl);
            const level2Data = await level2Response.json();
            setLevel2Data(level2Data.results); // Set the level 2 data in the state
            setLoading(false);
        } catch (error) {
            console.error("Error fetching level 2 data:", error);
            setError('Error loading level 2 data. Please try again later.');
            setLoading(false);
        }
    };

    // Fetch trades when the component mounts and refetch every 10 seconds
    useEffect(() => {
        fetchLevel2();
        const intervalId = setInterval(fetchLevel2, 10000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [selectedDate, symbol]);

    const handleDateChange = (e) => {
        const formattedDate = e.target.value; // Date in YYYY-MM-DD format
        setSelectedDate(formattedDate); // Set selected date
    };

    return (
        <div className="flex flex-col items-center max-xl:w-full h-full gap-4">
            <div className="w-full flex gap-2 items-center">
                <p className="max-lg:pl-3 text-base text-primaryText">Select Date:</p>
                <input onChange={handleDateChange} placeholder="Search" className="input" type="date" />
            </div>

            <div className='flex flex-wrap gap-12 lg:w-max max-xl:w-full'>
                <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">

                    {/* <input placeholder="Search" className="input" type="date" /> */}

                    {/* Columns */}
                    <div ref={scrollRef} className="flex max-w-full w-max max-h-[500px] overflow-y-auto">

                        <div className="min-w-max sticky top-0 left-0 z-[2] h-max min-w-max bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                            {/* Header for Ask Exchange Column */}
                            <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                                Ask Exchange
                            </div>
                            {/* Rows */}
                            {level2Data.map((trade, index) => (
                                <div key={index} onClick={() => handleResultClick(symbol)} className="cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                    <ul className="flex gap-x-2 items-center">
                                        <li className="text-xs min-w-max text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">
                                            {exchangeMapping[trade.ask_exchange] || 'Unknown Exchange'}
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Ask Size Column */}
                        <div className="flex flex-col min-w-max h-max text-left border-y-[1px] border-primaryText/10">
                            {/* Header */}
                            <div className="sticky top-0 left-0 px-4 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Ask Size
                            </div>
                            {/* Rows */}
                            {level2Data.map((trade, index) => (
                                <div key={index} className="text-base px-4 py-3 border-b-[1px] border-primaryText/10">
                                    {trade.ask_size}
                                </div>
                            ))}
                        </div>

                        {/* Ask Price Column */}
                        <div className="flex flex-col min-w-max h-max text-left border-y-[1px] border-primaryText/10">
                            {/* Header */}
                            <div className="sticky top-0 left-0 px-6 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                                Ask Price
                            </div>
                            {/* Rows */}
                            {level2Data.map((trade, index) => (
                                <div key={index} className="text-base px-6 py-3 border-b-[1px] border-primaryText/10">
                                    ${trade.ask_price}
                                </div>
                            ))}
                        </div>


                        {/* Timestamp Column */}
                        <div className="flex flex-col min-w-max h-max text-left border-y-[1px] border-primaryText/10">
                            {/* Header */}
                            <div className="sticky top-0 left-0 py-3 px-4 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                                Time
                            </div>
                            {/* Rows */}
                            {level2Data.map((trade, index) => (
                                <div key={index} className="text-base py-3 px-4 border-b-[1px] border-primaryText/10">
                                    {convertTimestamp(trade.participant_timestamp)}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">

                    {/* <input placeholder="Search" className="input" type="date" /> */}

                    {/* Columns */}
                    <div ref={scrollRef} className="flex max-w-full w-max max-h-[500px] overflow-y-auto">

                        <div className="min-w-max sticky top-0 left-0 z-[2] h-max min-w-max bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                            {/* Header for Ask Exchange Column */}
                            <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                                Bid Exchange
                            </div>
                            {/* Rows */}
                            {level2Data.map((trade, index) => (
                                <div key={index} onClick={() => handleResultClick(symbol)} className="cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                    <ul className="flex gap-x-2 items-center">
                                        <li className="text-xs min-w-max text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">
                                            {exchangeMapping[trade.bid_exchange] || 'Unknown Exchange'}
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Bid Size Column */}
                        <div className="flex flex-col min-w-max h-max text-left border-y-[1px] border-primaryText/10">
                            {/* Header */}
                            <div className="sticky top-0 left-0 px-6 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Bid Size
                            </div>
                            {/* Rows */}
                            {level2Data.map((trade, index) => (
                                <div key={index} className="text-base px-6 py-3 border-b-[1px] border-primaryText/10">
                                    {trade.bid_size}
                                </div>
                            ))}
                        </div>

                        {/* Bid Price Column */}
                        <div className="flex flex-col min-w-max h-max text-left border-y-[1px] border-primaryText/10">
                            {/* Header */}
                            <div className="sticky top-0 left-0 px-6 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                                Bid Price
                            </div>
                            {/* Rows */}
                            {level2Data.map((trade, index) => (
                                <div key={index} className="text-base px-6 py-3 border-b-[1px] border-primaryText/10">
                                    ${trade.bid_price}
                                </div>
                            ))}
                        </div>


                        {/* Timestamp Column */}
                        <div className="flex flex-col min-w-max h-max text-left border-y-[1px] border-primaryText/10">
                            {/* Header */}
                            <div className="sticky top-0 left-0 py-3 px-4 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                                Time
                            </div>
                            {/* Rows */}
                            {level2Data.map((trade, index) => (
                                <div key={index} className="text-base py-3 px-4 border-b-[1px] border-primaryText/10">
                                    {convertTimestamp(trade.participant_timestamp)}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Level2;