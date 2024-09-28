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

const TopGainers = () => {
    const [stockData, setStockData] = useState([]); // State for stock data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const router = useRouter(); // Next.js router for navigation

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the new API on the server side using fetch
                const response = await fetch(`${STOCKVERSE_BACK_END}/gainer-stocks`);
                
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
                        <rect width="44" height="44" transform="translate(0 0.5)" fill="#00AB30"/>
                        <path d="M31 17.5L23 25.5L19 21.5L13 27.5M23 17.5H31H23ZM31 17.5V25.5V17.5Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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

export default TopGainers;