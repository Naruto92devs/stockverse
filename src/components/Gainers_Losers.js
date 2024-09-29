'use client';
import React, { useEffect, useState } from 'react';
import FallbackUI from './FallbackUI';
import { useRouter } from 'next/navigation'; // Import router for navigation
import Logo from './Logo'; // Import your new Logo component
import formatNumber from './FormatNumber';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

// Utility function to sanitize symbol
const sanitizeSymbol = (symbol) => {
    // Remove any special characters from the end of the symbol
    return symbol.replace(/[+\-\$%\^&*()]+$/, '');
};

const Gainers_Losers = ({ stocksType }) => {
    const [stockData, setStockData] = useState([]); // State for stock data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [strokeColors, setStrokeColors] = useState({});
    const router = useRouter(); // Next.js router for navigation

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
        <div className="w-full h-full overflow-x-auto">
            <div className="w-full flex justify-between py-3 px-3 max-sm:px-1.5 border-y-[1px] border-primaryText/10">
                <p className="w-[27%] max-sm:w-[22%] min-w-max font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">STOCK</p>
                <p className="w-[20%] max-sm:hidden min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">MARKET CAP</p>
                <p className="w-[15%] hidden max-sm:block min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">MCap</p>
                <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">CHANGE</p>
                <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">PRICE</p>
                <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">VOLUME</p>
                <p className="w-[8%] max-sm:w-[14%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">WATCH</p>
            </div>
            {(loading || !stockData || stockData.length === 0) ? (
                <div className="py-14 flex flex-col gap-2 justify-center items-center h-[315px]">
                    <FallbackUI />
                </div>
            ) : (
                stockData.map((stock) => (
                    <div key={stock.symbol} className="w-full items-center flex justify-between py-2 px-3 max-sm:px-1.5 hover:bg-primaryText/10 border-b-[1px] border-primaryText/10">
                        <div className="cursor-pointer w-[27%] max-sm:w-[22%] flex gap-x-2 items-center min-w-max font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">
                            {/* Use Logo component */}
                            <Logo siteUrl={stock.siteUrl} symbol={stock.symbol} alt={stock.name} size={32} className="w-8 h-8 mr-2 max-sm:mr-1.5 rounded-full" />
                            <ul onClick={() => handleResultClick(stock.symbol)} className="flex items-center gap-x-1 max-xl:flex-col max-xl:items-start">
                                <li>{stock.symbol}</li>
                                <li className="text-xs max-lg:hidden">({stock.name})</li>
                            </ul>
                        </div>
                        <p className="w-[20%] max-sm:w-[15%] text-center min-w-max font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">${stock.marketCap}</p>
                        <p className={`w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] ${
                            parseFloat(stock.changePercentage) >= 0 ? 'text-buy' : 'text-sell'
                        }`}>
                            {parseFloat(stock.changePercentage).toFixed(2) + '%'}
                        </p>
                        <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">${stock.price}</p>
                        <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">{stock.volume}</p>
                        <svg
                            className="cursor-pointer w-[8%] max-sm:w-[14%] max-sm:p-1 text-center"
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
    );
}

export default Gainers_Losers;