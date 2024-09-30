'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Import router for navigation
import Logo from './Logo'; // Import your new Logo component
import formatNumber from './FormatNumber';
import GainerFallbackUI from './GainerFallbackUI';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

// Utility function to sanitize symbol
const sanitizeSymbol = (symbol) => {
    // Remove any special characters from the end of the symbol
    return symbol.replace(/[+\-\$%\^&*()]+$/, '');
};

const Gainers_Losers1 = ({ stocksType }) => {
    const [stockData, setStockData] = useState([]); // State for stock data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [strokeColors, setStrokeColors] = useState({});
    const router = useRouter(); // Next.js router for navigation

    const scrollRef = useRef();
    
    // State to track mouse dragging
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
            if (!isDragging) return; // Stop function if not dragging
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
        const fetchSymbolsAndStockData = async () => {
            setLoading(true); // Set loading to true when filter changes
            try {
                // Fetch symbols data (gainers, losers, or active stocks)
                const symbolsResponse = await fetch(`https://api.stockverse.ai/${stocksType}`);
                if (!symbolsResponse.ok) {
                    throw new Error('Failed to fetch stock symbols');
                }

                const symbolsData = await symbolsResponse.json();
                
                // Create a comma-separated string of symbols for the overview request
                const symbols = symbolsData.map(item => item.ticker).join(',');

                // Fetch the company overview for all the symbols
                const overviewResponse = await fetch(`https://api.stockverse.ai/overview?symbol=${symbols}`);
                if (!overviewResponse.ok) {
                    throw new Error('Failed to fetch company overview');
                }
                
                const overviewData = await overviewResponse.json();

                // Merge data from both APIs (symbol details and overview)
                const combinedData = symbolsData.map(symbol => {
                    const sanitizedSymbol = sanitizeSymbol(symbol.ticker);
                    const overview = overviewData.find(item => item.Symbol === sanitizedSymbol.toUpperCase());

                    return {
                        symbol: sanitizedSymbol,
                        price: symbol.price,
                        volume: formatNumber(Number(symbol.volume)),
                        changeAmount: symbol.change_amount,
                        changePercentage: symbol.change_percentage,
                        marketCap: overview ? formatNumber(Number(overview.MarketCapitalization)) : 'N/A',
                        name: overview ? overview.Name : symbol.ticker,
                        sector: overview ? overview.Sector : 'N/A',
                        StrongBuy: overview ? overview.AnalystRatingStrongBuy : '-',
                        StrongSell: overview ? overview.AnalystRatingStrongSell : '-',
                        FiscalYearEnd: overview ? overview.FiscalYearEnd : 'N/A',
                        siteUrl: overview ? overview.OfficialSite : '',
                    };
                });

                setStockData(combinedData); // Update state with combined data
                setLoading(false);

                // Initialize stroke colors here once the data is available
                const initialColors = {};
                combinedData.forEach((stock) => {
                    initialColors[stock.symbol] = 'var(--svg-color)'; // Default color
                });
                setStrokeColors(initialColors);
            } catch (error) {
                console.error("Error fetching stock data:", error);
                setError('Error loading stocks data. Please try again later.');
                setLoading(false);
            }
        };

        fetchSymbolsAndStockData(); // Fetch symbols and stock data on component mount
    }, [stocksType]); // Depend on stocksType to refetch when it changes

    const handleResultClick = (symbol) => {
        router.push(`/stocks/${symbol}`); // Navigate to the stock detail page
    };

    // Function to toggle the stroke color for a specific symbol
    const toggleStrokeColor = (symbol) => {
        setStrokeColors((prevColors) => ({
            ...prevColors,
            [symbol]: prevColors[symbol] === 'var(--svg-color)' ? 'rgba(var(--sell-color))' : 'var(--svg-color)',
        }));
    };


    return (
        <div className="w-full flex relative overflow-x-hidden overflow-y-auto">
            {/* Fixed Stock Column */}
            <div className="w-[30%] max-md:min-w-[35%] bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                {/* Header for Stock Column */}
                <div className="py-3 px-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                    STOCK
                </div>
                {/* Stock Rows */}
                {loading || !stockData || stockData.length === 0 ? (
                    <GainerFallbackUI/>
                ) : (
                    stockData.map((stock) => (
                        <div key={stock.symbol} onClick={() => handleResultClick(stock.symbol)} className="cursor-pointer flex items-center gap-x-2 py-2 px-3 hover:bg-primaryText/10 border-b-[1px] border-primaryText/10">
                            <Logo siteUrl={stock.siteUrl} symbol={stock.symbol} alt={stock.name} size={32} className="w-8 h-8 mr-2 max-sm:mr-1.5 rounded-full" />
                            <ul className="flex gap-x-2 items-center">
                                <li>{stock.symbol}</li>
                                <li className="text-xs max-xl:hidden">
                                    ({stock.name.length > 8 ? stock.name.substring(0, 30) + '...' : stock.name})
                                </li>
                            </ul>
                        </div>
                    ))
                )}
            </div>
            
            {/* Scrollable Columns Container */}
            <div ref={scrollRef} className="flex-grown h-[max-content] cursor-pointer select-none overflow-x-auto scrollbar-hide">
                {/* Columns */}
                <div className="flex w-full">
                    {/* Market Cap Column */}
                    <div className="flex flex-col min-w-[10rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 pl-2 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                            MARKET CAP
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            stockData.map((stock) => (
                                <div key={stock.symbol} className="py-3 pl-2 border-b-[1px] border-primaryText/10">
                                    ${stock.marketCap}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Change Percentage Column */}
                    <div className="flex flex-col min-w-[8rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                            CHANGE %
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className={`py-3 border-b-[1px] border-primaryText/10 ${parseFloat(stock.changePercentage) >= 0 ? 'text-buy' : 'text-sell'}`}>
                                {parseFloat(stock.changePercentage).toFixed(2) + '%'}
                            </div>
                        ))
                        )}
                    </div>

                    {/* Change Amount Column */}
                    <div className="flex flex-col min-w-[8rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                            Price CHANGE
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className={`py-3 border-b-[1px] border-primaryText/10 ${parseFloat(stock.changePercentage) >= 0 ? 'text-buy' : 'text-sell'}`}>
                                {parseFloat(stock.changeAmount).toFixed(2) + '$'}
                            </div>
                        ))
                        )}
                    </div>

                    {/* Price Column */}
                    <div className="flex flex-col min-w-[8rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                            PRICE
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className="py-3 border-b-[1px] border-primaryText/10">
                                ${stock.price}
                            </div>
                        ))
                        )}
                    </div>

                    {/* Volume Column */}
                    <div className="flex flex-col min-w-[8rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                            VOLUME
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className="py-3 border-b-[1px] border-primaryText/10">
                                {stock.volume}
                            </div>
                        ))
                        )}
                    </div>

                    {/* StrongBuy Column */}
                    <div className="flex flex-col min-w-[8rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                            StrongBuy
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className="py-3 border-b-[1px] border-primaryText/10">
                                {stock.StrongBuy}
                            </div>
                        ))
                        )}
                    </div>

                    {/* StrongSell Column */}
                    <div className="flex flex-col min-w-[8rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                            StrongSell
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className="py-3 border-b-[1px] border-primaryText/10">
                                {stock.StrongSell}
                            </div>
                        ))
                        )}
                    </div>

                    {/* FiscalYearEnd Column */}
                    <div className="flex flex-col min-w-[8rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                        FiscalYearEnd
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className="py-3 border-b-[1px] border-primaryText/10">
                                {stock.FiscalYearEnd}
                            </div>
                        ))
                        )}
                    </div>

                     {/* Sector Column */}
                    <div className="flex flex-col min-w-[17rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                            Sector
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className="py-3 border-b-[1px] border-primaryText/10">
                                {/* {stock.sector} */}
                                {stock.sector.length > 8 ? stock.sector.substring(0, 30) + '' : stock.sector}
                            </div>
                        ))
                        )}
                    </div>

                    {/* Watch Column */}
                    <div className="flex flex-col min-w-[10rem] text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="py-3 font-sansMedium text-sm text-primaryText border-b-[1px] border-primaryText/10">
                            WATCH
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className="py-3 pl-3 border-b-[1px] border-primaryText/10">
                                {/* You can add your Watch button or icon here */}
                                <svg
                                    className="cursor-pointer w-6 h-6"
                                    width="26"
                                    height="29"
                                    viewBox="0 0 26 29"
                                    fill="none"
                                    onClick={() => toggleStrokeColor(stock.symbol)} // Toggle specific color on click
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.5 22H8.5M17.5 22H25L22.8925 19.8925C22.6095 19.6094 22.385 19.2734 22.2319 18.9035C22.0787 18.5337 21.9999 18.1373 22 17.737V13C22.0002 11.1384 21.4234 9.32251 20.3488 7.80233C19.2743 6.28215 17.755 5.13245 16 4.5115V4C16 3.20435 15.6839 2.44129 15.1213 1.87868C14.5587 1.31607 13.7956 1 13 1C12.2044 1 11.4413 1.31607 10.8787 1.87868C10.3161 2.44129 10 3.20435 10 4V4.5115C6.505 5.7475 4 9.082 4 13V17.7385C4 18.5455 3.679 19.321 3.1075 19.8925L1 22H8.5H17.5ZM17.5 22V23.5C17.5 24.6935 17.0259 25.8381 16.182 26.682C15.3381 27.5259 14.1935 28 13 28C11.8065 28 10.6619 27.5259 9.81802 26.682C8.97411 25.8381 8.5 24.6935 8.5 23.5V22H17.5Z"
                                        stroke={strokeColors[stock.symbol]} // Use symbol-specific color
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gainers_Losers1;