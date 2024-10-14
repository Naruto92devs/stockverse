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

// Function to map exchange integer values to names
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
    62: "OTC Equity Security",
};

// Fetch quotes data to get bid and ask prices
const fetchQuotes = async (symbol) => {
    const response = await fetch(`https://api.polygon.io/v3/quotes/${symbol}?limit=1&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`);
    const data = await response.json();
    return data.results[0]; // We are only interested in the latest bid and ask
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

const Trades = ({ symbol }) => {
    const [tradeData, setTradeData] = useState([]); // State for trade data
    const [quoteData, setQuoteData] = useState({}); // State for the latest quote (bid/ask)
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [selectedDate, setSelectedDate] = useState(''); // State for selected date
    const router = useRouter(); // Next.js router for navigation

    const scrollRef = useRef();

    const fetchTrades = async () => {
        setLoading(true);
        try {
            const sanitizedSymbol = sanitizeSymbol(symbol);
            let apiUrl = `https://api.polygon.io/v3/trades/${sanitizedSymbol}?limit=1000&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`;

            // Append timestamp to API URL if the date is selected
            if (selectedDate) {
                apiUrl += `&timestamp=${selectedDate}`;
            }

            // Fetch trade data
            const tradeResponse = await fetch(apiUrl);
            const tradeData = await tradeResponse.json();
            setTradeData(tradeData.results); // Set the trade data in the state

            // Fetch quote data
            const quote = await fetchQuotes(sanitizedSymbol);
            setQuoteData(quote); // Set the latest bid/ask data
            setLoading(false);
        } catch (error) {
            console.error("Error fetching trade/quote data:", error);
            setError('Error loading data. Please try again later.');
            setLoading(false);
        }
    };

    // Fetch trades when the component mounts and refetch every 10 seconds
    useEffect(() => {
        fetchTrades();
        const intervalId = setInterval(fetchTrades, 10000);

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [selectedDate, symbol]);

    const handleDateChange = (e) => {
        const formattedDate = e.target.value; // Date in YYYY-MM-DD format
        setSelectedDate(formattedDate); // Set selected date
    };


    return (
        <div className="w-full h-full flex flex-col gap-y-4">
            <div className="flex gap-2 items-center">
                <p className="max-lg:pl-3 text-base text-primaryText">Select Date:</p>
                <input onChange={handleDateChange} placeholder="Search" className="input" type="date" />
            </div>
            <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">
                <div ref={scrollRef} className="flex max-w-full w-max max-h-[500px] overflow-y-auto">

                    {/* Exchange Column */}
                    <div className="flex sticky top-0 left-0 bg-background z-[5] flex-col min-w-max h-max text-left border-y-[1px] border-r-[1px] border-primaryText/10">
                        <div className="sticky top-0 left-0 px-4 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Exchange
                        </div>
                        {tradeData.map((trade, index) => (
                            <div key={index} className="text-base px-4 py-3 border-b-[1px] border-primaryText/10">
                                {exchangeMapping[trade.exchange] || 'Unknown Exchange'}
                            </div>
                        ))}
                    </div>

                    {/* Price Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        <div className="sticky top-0 left-0 px-4 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Price
                        </div>
                        {tradeData.map((trade, index) => (
                            <div key={index} className="text-base px-4 py-3 border-b-[1px] border-primaryText/10">
                                ${trade.price}
                            </div>
                        ))}
                    </div>

                    {/* Size Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        <div className="sticky top-0 left-0 py-3 px-4 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Size
                        </div>
                        {tradeData.map((trade, index) => (
                            <div key={index} className={"text-base py-3 px-4 border-b-[1px] border-primaryText/10 text-primaryText"}>
                                {trade.size}
                            </div>
                        ))}
                    </div>

                    {/* Buy/Sell Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        <div className="sticky top-0 left-0 px-4 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Buy/Sell
                        </div>
                        {tradeData.map((trade, index) => (
                            <div key={index} className="text-base px-4 py-3 border-b-[1px] border-primaryText/10">
                                {determineBuyOrSell(trade.price, quoteData.bid_price, quoteData.ask_price)}
                            </div>
                        ))}
                    </div>

                    {/* ID Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        <div className="sticky top-0 left-0 px-4 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Num
                        </div>
                        {tradeData.map((trade, index) => (
                            <div key={index} className="text-base px-4 py-3 border-b-[1px] border-primaryText/10">
                                {trade.id}
                            </div>
                        ))}
                    </div>

                    {/* Timestamp Column */}
                    <div className="flex flex-col min-w-max h-max text-left border-y-[1px] border-primaryText/10">
                        <div className="sticky top-0 left-0 py-3 px-4 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Timestamp
                        </div>
                        {tradeData.map((trade, index) => (
                            <div key={index} className="text-base py-3 px-4 border-b-[1px] border-primaryText/10">
                                {convertTimestamp(trade.participant_timestamp)}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Trades;