'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TradingViewWidget from '@/components/TradingViewWidget'; // Assuming you have a separate component for TradingView

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

export default function StockDetails() {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const pathname = usePathname();
    const symbol = pathname.split('/').pop(); // Extract symbol from URL

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                // Fetch data from the new API on the server side using fetch
                const response = await fetch(`https://api.stockverse.ai/stocks-list?symbols=${symbol}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const stock = data[0]; // Assuming we always get one stock object

                const domain = new URL(stock.overview.OfficialSite).hostname.replace('www.', '');
                const formattedData = {
                    symbol: stock.overview.Symbol,
                    name: stock.overview.Name,
                    logoUrl: `https://img.logo.dev/${domain}?token=pk_GpgWOqB2R1qdEWrvsnD45w&size=200&format=png`,
                    marketCap: formatNumber(Number(stock.overview.MarketCapitalization)),
                    avgGrowth: stock.globalQuote["10. change percent"],
                    price: Number(stock.globalQuote["05. price"]),
                    volume: formatNumber(Number(stock.globalQuote["06. volume"])),
                };

                setStockData(formattedData); // Update state with formatted data
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stock data:", error);
                setError('Error loading stocks data. Please try again later.');
                setLoading(false); // Ensure loading state is updated
            }
        };

        fetchStockData();
    }, [symbol]);

    return (
        <div className="w-full h-full">
            <div className="py-16 max-sm:py-10 w-full bg-stocksBg bg-no-repeat bg-cover bg-right-bottom">
                <div className="px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
                    {loading ? (
                        <div className="">
                            <p>Loading...</p>
                        </div>
                    ) : error ? (
                        // Display a custom error UI or message if there's an error
                        <div>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="w-full items-center flex justify-between py-2 px-3 max-sm:px-1.5">
                            <div className="cursor-pointer w-[27%] max-sm:w-[22%] flex items-center min-w-max font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">
                                <ul className="flex items-center gap-x-1 max-xl:flex-col max-xl:items-start">
                                    <li>{stockData.symbol}</li>
                                    <li className="text-xs max-lg:hidden">({stockData.name})</li>
                                </ul>
                            </div>
                            <p className="w-[20%] max-sm:w-[15%] text-center min-w-max font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">${stockData.marketCap}</p>
                            <p className={`w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] ${
                                parseFloat(stockData.avgGrowth) >= 0 ? 'text-buy' : 'text-sell'
                            }`}>
                                {parseFloat(stockData.avgGrowth).toFixed(2) + '%'}
                            </p>
                            <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">${stockData.price.toFixed(2)}</p>
                            <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">{stockData.volume}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="px-6 py-16 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
                <TradingViewWidget symbol={symbol} />
            </div>
        </div>
    );
}