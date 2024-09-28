'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import router for navigation

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

// Utility function to format large numbers (e.g., 1000000 -> 1M, 250000 -> 250K)
const formatNumber = (num) => {
    if (num >= 1.0e12) {
        return (num / 1.0e12).toFixed(1) + 'T';
    } else if (num >= 1.0e9) {
        return (num / 1.0e9).toFixed(1) + 'B';
    } else if (num >= 1.0e6) {
        return (num / 1.0e6).toFixed(1) + 'M';
    } else if (num >= 1.0e3) {
        return (num / 1.0e3).toFixed(1) + 'K';
    } else {
        return num;
    }
};

const ActiveStocks = () => {
    const [stockData, setStockData] = useState([]); // State for stock data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const router = useRouter(); // Next.js router for navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the new API on the server side using fetch
                const response = await fetch(`${STOCKVERSE_BACK_END}/active-stocks`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                const formattedData = data.map((stock) => {
                    return {
                        symbol: stock.ticker,
                        price: Number(stock.price),
                        priceChange: Number(stock.change_amount),
                        avgGrowth: stock.change_percentage,
                        volume: formatNumber(Number(stock.volume)),
                    };
                });

                setStockData(formattedData); // Update state with formatted data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stock data:", error);
                setError('Error loading stocks data. Please try again later.');
            }
        };

        fetchData(); // Fetch data on component mount
    }, []); // Empty dependency array means this effect runs once on mount

    const handleResultClick = (symbol) => {
        router.push(`/stocks/${symbol}`); // Navigate to the stock detail page
    };


    return (
        <div className="w-full h-full my-[40px] max-sm:mt-0 rounded-xl">
            {(loading || !stockData || stockData.length === 0) ? (
                <div className="py-14 flex flex-col gap-2 justify-center items-center h-[315px]">
                    <h1>Loading....</h1>
                </div>
            ) : (
                stockData.map((stock) => (
                    <div key={stock.symbol} className="w-full items-center flex justify-between py-2 px-3 max-sm:px-1.5">
                        <div className="cursor-pointer w-[27%] max-sm:w-[22%] flex gap-x-4 items-center min-w-max font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">
                        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="44" transform="translate(0 0.5)" fill="#1877F2"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M20.6261 13.0285C22.8389 10.6264 26.7534 12.9893 25.659 16.0664L24.4886 19.3572H28.1525C30.7664 19.3572 32.13 22.4674 30.359 24.3898L23.3742 31.9715C21.1613 34.3736 17.2468 32.0107 18.3413 28.9335L19.5117 25.6429H15.8477C13.2339 25.6429 11.8703 22.5326 13.6413 20.6102L20.6261 13.0285ZM23.7746 15.3962C24.1395 14.3705 22.8346 13.5829 22.097 14.3836L15.1123 21.9653C14.5219 22.6061 14.9764 23.6429 15.8477 23.6429H20.9287C21.2537 23.6429 21.5584 23.8008 21.7458 24.0663C21.9331 24.3318 21.9798 24.6718 21.8709 24.978L20.2256 29.6038C19.8608 30.6295 21.1656 31.4171 21.9033 30.6164L28.888 23.0347C29.4784 22.3939 29.0238 21.3572 28.1525 21.3572H23.0716C22.7466 21.3572 22.4419 21.1993 22.2545 20.9338C22.0672 20.6682 22.0205 20.3282 22.1294 20.0221L23.7746 15.3962Z" fill="white"/>
                        </svg>
                            <ul onClick={() => handleResultClick(stock.symbol)} className="flex items-center gap-x-1 max-xl:flex-col max-xl:items-start">
                                <li>{stock.symbol}</li>
                                <li className="text-xs max-lg:hidden">({stock.volume})</li>
                            </ul>
                        </div>
                        {/* <p className="w-[20%] max-sm:w-[15%] text-center min-w-max font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">${stock.marketCap}</p> */}
                        <p className={`w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] ${
                            parseFloat(stock.avgGrowth) >= 0 ? 'text-buy' : 'text-sell'
                        }`}>
                            {parseFloat(stock.avgGrowth).toFixed(2) + '%'}
                        </p>
                        <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">${stock.price.toFixed(2)}</p>
                        <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">${stock.priceChange.toFixed(2)}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default ActiveStocks;