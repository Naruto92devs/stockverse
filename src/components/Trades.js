'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Import router for navigation

// Utility function to convert SIP timestamp to human-readable format
const convertTimestamp = (sipTimestamp) => {
    const timestampInSeconds = sipTimestamp / 1_000_000_000;
    const date = new Date(timestampInSeconds * 1000); // Convert to milliseconds
    return date.toLocaleString();
};

// Utility function to ensure symbol is uppercase
const sanitizeSymbol = (symbol) => {
    return symbol.toUpperCase();
};

// Function to map tape integer values to exchanges
const mapTapeValue = (tape) => {
    switch (tape) {
        case 1:
            return "NYSE";
        case 2:
            return "NYSE ARCA / NYSE American";
        case 3:
            return "NASDAQ";
        default:
            return "Unknown Tape";
    }
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

const Trades = ({ symbol }) => {
    const [tradeData, setTradeData] = useState([]); // State for trade data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const router = useRouter(); // Next.js router for navigation

    const scrollRef = useRef();
    
    // State to track mouse dragging for horizontal scrolling
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
            if (!isDragging) return;
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
        const fetchTrades = async () => {
            setLoading(true);
            try {
                // Sanitize symbol to uppercase before making the API request
                const sanitizedSymbol = sanitizeSymbol(symbol);

                // Fetch trade data from Polygon API
                const tradeResponse = await fetch(`https://api.polygon.io/v3/trades/${sanitizedSymbol}?limit=1000&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`);
                if (!tradeResponse.ok) {
                    throw new Error('Failed to fetch trade data');
                }

                const tradeData = await tradeResponse.json();
                setTradeData(tradeData.results); // Set the trade data in the state
                setLoading(false);
            } catch (error) {
                console.error("Error fetching trade data:", error);
                setError('Error loading trade data. Please try again later.');
                setLoading(false);
            }
        };

        fetchTrades(); // Fetch trades on component mount

        // Set up an interval to refetch the data every 10 seconds
        const intervalId = setInterval(fetchTrades, 10000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [symbol]); // Re-fetch if the symbol changes

    const handleResultClick = (symbol) => {
        router.push(`/stocks/${symbol}`); // Navigate to the stock detail page
    };

    return (
        <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">
    {/* Columns */}
    <div ref={scrollRef} className="flex max-w-full w-max max-h-[500px] overflow-y-auto">

        <div className="min-w-[21rem] sticky top-0 left-0 z-[2] h-max max-md:min-w-[7rem] bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
            {/* Header for Stock Column */}
            <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                Exchange
            </div>
            {/* Stock Rows */}
            {tradeData.map((trade, index) => (
                <div key={index} onClick={() => handleResultClick(symbol)} className="cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                    <ul className="flex gap-x-2 items-center">
                        <li className="text-xs min-w-[5rem] text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">{exchangeMapping[trade.exchange] || 'Unknown Exchange'}</li>
                    </ul>
                </div>
            ))}
        </div>

        {/* Exchange Column */}
        <div className="flex flex-col min-w-max h-max text-left border-y-[1px] border-primaryText/10">
            {/* Header */}
            <div className="sticky top-0 left-0 px-4 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                ID
            </div>
            {/* Rows */}
            {tradeData.map((trade, index) => (
                <div key={index} className="text-base px-4 py-3 border-b-[1px] border-primaryText/10">
                    
                    {trade.id}
                </div>
            ))}
        </div>

        {/* Price Column */}
        <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
            {/* Header */}
            <div className="sticky top-0 left-0 px-4 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                Price
            </div>
            {/* Rows */}
            {tradeData.map((trade, index) => (
                <div key={index} className="text-base px-4 py-3 border-b-[1px] border-primaryText/10">
                    ${trade.price}
                </div>
            ))}
        </div>

        {/* Size Column */}
        <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
            {/* Header */}
            <div className="sticky top-0 left-0 py-3 px-4 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                Size
            </div>
            {/* Rows */}
            {tradeData.map((trade, index) => (
                <div key={index} className={"text-base py-3 px-4 border-b-[1px] border-primaryText/10 text-primaryText"}>
                    {trade.size}
                </div>
            ))}
        </div>

        {/* participant_timestamp Column */}
        <div className="flex flex-col min-w-max h-max text-left border-y-[1px] border-primaryText/10">
            {/* Header */}
            <div className="sticky top-0 left-0 py-3 px-4 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                Timestamp
            </div>
            {/* Rows */}
            {tradeData.map((trade, index) => (
                <div key={index} className="text-base py-3 px-4 border-b-[1px] border-primaryText/10">
                    {convertTimestamp(trade.participant_timestamp)}
                </div>
            ))}
        </div>
    </div>
</div>
    );
}

export default Trades;