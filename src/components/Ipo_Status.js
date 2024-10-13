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

const IPO = ({ stocksType }) => {
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
        const fetchIpos = async () => {
            setLoading(true); // Set loading to true when filter changes
            try {
                // Fetch symbols data (gainers, losers, or active stocks)
                const symbolsResponse = await fetch(`${STOCKVERSE_BACK_END}/${stocksType}`);
                if (!symbolsResponse.ok) {
                    throw new Error('Failed to fetch stock symbols');
                }

                const symbolsData = await symbolsResponse.json();

                // Merge data from both APIs (symbol details and overview)
                const ipoData = symbolsData.map(symbol => {
                    const sanitizedSymbol = sanitizeSymbol(symbol.symbol);

                    return {
                        symbol: sanitizedSymbol,
                        name: symbol.name,
                        exchange: symbol.exchange,
                        ipoDate: symbol.ipoDate,
                        priceRangeLow: symbol.priceRangeLow ? `$${symbol.priceRangeLow}` : symbol.assetType,
                        priceRangeHigh: symbol.priceRangeHigh ? `$${symbol.priceRangeHigh}` : symbol.delistingDate,
                        currency: symbol.currency ? symbol.currency : symbol.status,
                    };
                });

                setStockData(ipoData); // Update state with combined data
                setLoading(false);

                // Initialize stroke colors here once the data is available
                const initialColors = {};
                ipoData.forEach((stock) => {
                    initialColors[stock.symbol] = 'var(--svg-color)'; // Default color
                });
                setStrokeColors(initialColors);
            } catch (error) {
                console.error("Error fetching stock data:", error);
                setError('Error loading stocks data. Please try again later.');
                setLoading(false);
            }
        };

        fetchIpos(); // Fetch symbols and stock data on component mount
    }, [stocksType]); // Depend on stocksType to refetch when it changes

    const handleResultClick = (symbol) => {
        router.push(`/stocks/${symbol}`); // Navigate to the stock detail page
    };

    // Get the label for priceRangeLow based on the data being shown
    const priceRangeLowLabel = stockData.some(stock => stock.priceRangeLow.includes('$')) ? 'Price Range Low' : 'Asset Type';

    // Get the label for priceRangeHigh based on the data being shown
    const priceRangeHighLabel = stockData.some(stock => stock.priceRangeHigh.includes('$')) ? 'Price Range High' : 'Delisting Date';

    // Get the label for priceRangeHigh based on the data being shown
    const currencyLabel = stockData.some(stock => stock.currency.includes('USD')) ? 'Currency' : 'Status';

    return (
            
            <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">
                {/* Columns */}
                <div ref={scrollRef} className="flex max-w-full w-max max-h-[497px] overflow-y-auto">

                    <div className="min-w-[21rem] sticky top-0 left-0 z-[2] h-max max-md:min-w-[7rem] bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                        {/* Header for Stock Column */}
                        <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                            STOCK
                        </div>
                        {/* Stock Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            stockData.map((stock) => (
                                <div key={stock.symbol} onClick={() => handleResultClick(stock.symbol)} className="cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                    {/* <Logo siteUrl={stock.siteUrl} symbol={stock.symbol} alt={stock.name} size={32} className="w-8 h-8 mr-2 max-sm:mr-1.5 rounded-full" /> */}
                                    <ul className="flex gap-x-2 items-center">
                                        <li className="text-xs min-w-[5rem] text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">{stock.symbol}</li>
                                        <li className="text-xs max-md:hidden">
                                            ({stock.name.length > 8 ? stock.name.substring(0, 30) + '...' : stock.name})
                                        </li>
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Exchange Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 pl-2 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Exchange
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                {stock.exchange}
                            </div>
                        ))
                        )}
                    </div>

                    {/* ipoDate Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            ipoDate
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className={"text-base py-3 border-b-[1px] border-primaryText/10 text-primaryText"}>
                                {stock.ipoDate}
                            </div>
                        ))
                        )}
                    </div>

                    {/* priceRangeLow Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            {priceRangeLowLabel}
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className={`text-base py-3 border-b-[1px] border-primaryText/10 
                                ${stock.priceRangeLow.includes('$') && parseFloat(stock.changePercentage) >= 0 
                                    ? 'text-buy' 
                                    : stock.priceRangeLow.includes('$') 
                                    ? 'text-sell' 
                                    : 'text-primaryText'
                                }`
                            }>
                                {stock.priceRangeLow}
                            </div>
                        ))
                        )}
                    </div>

                    {/* priceRangeHigh Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        {priceRangeHighLabel}
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                        stockData.map((stock) => (
                            <div key={stock.symbol} className={`text-base py-3 border-b-[1px] border-primaryText/10 
                                ${stock.priceRangeHigh.includes('$') && parseFloat(stock.changePercentage) >= 0 
                                    ? 'text-buy' 
                                    : stock.priceRangeHigh.includes('$') 
                                    ? 'text-sell' 
                                    : 'text-primaryText'
                                }`
                            }>
                                {stock.priceRangeHigh}
                            </div>
                        ))
                        )}
                    </div>

                    {/* currency Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 pl-2 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        {currencyLabel}
                        </div>
                        {/* Rows */}
                        {loading || !stockData || stockData.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            stockData.map((stock) => (
                                <div key={stock.symbol} className="text-base py-3 pl-2 border-b-[1px] border-primaryText/10">
                                    {stock.currency}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
    );
}

export default IPO;