'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Logo from './Logo';

const initialStocks = [
    { "1. symbol": "GOOG", "2. name": "Alphabet Inc." },
    { "1. symbol": "AMZN", "2. name": "Amazon.com Inc." },
    { "1. symbol": "META", "2. name": "Meta Platforms Inc." },
    { "1. symbol": "AAPL", "2. name": "Apple Inc." },
    { "1. symbol": "MSFT", "2. name": "Microsoft Corp." },
    { "1. symbol": "TSLA", "2. name": "Tesla Inc." },
    { "1. symbol": "NVDA", "2. name": "NVIDIA Corp." },
    { "1. symbol": "INTC", "2. name": "Intel Corp." },
    { "1. symbol": "AMD", "2. name": "Advanced Micro Devices Inc." },
];

export default function SearchBar({isVisible, setIsvisible, updateUrl }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [stocks, setStocks] = useState(initialStocks);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const searchBarRef = useRef(null);
    const requestIdRef = useRef(0);
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (query.length > 0) {
                const currentRequestId = ++requestIdRef.current;
                setLoading(true);
                try {
                    // Fetch data from the current search API
                    const searchResponse = await fetch(`/api/search?keyword=${query}`);
                    if (!searchResponse.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const searchData = await searchResponse.json();
    
                    // Filter results from the search API
                    const filteredResults = searchData.bestMatches.filter(
                        result =>
                            !result['1. symbol'].includes('.') && // Remove symbols with periods
                            !result['2. name'].toLowerCase().includes('warrant') && // Remove companies with "warrant" in their name
                            !(result['1. symbol'].endsWith('X')) // Remove symbols where "X" is the fifth letter
                    );
    
                    // Extract tickers for the Polygon API
                    const tickers = filteredResults.map(result => result['1. symbol']).join(',');
    
                    // Fetch data from the Polygon API
                    const polygonResponse = await fetch(
                        `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickers}&include_otc=true&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`
                    );
                    if (!polygonResponse.ok) {
                        throw new Error('Polygon API response was not ok');
                    }
                    const polygonData = await polygonResponse.json();
    
                    // Combine data from both APIs
                    if (currentRequestId === requestIdRef.current) {
                        const combinedResults = filteredResults.map(result => {
                            const tickerData = polygonData.tickers.find(
                                ticker => ticker.ticker === result['1. symbol']
                            );
                            return {
                                ...result,
                                todaysChangePerc: tickerData?.todaysChangePerc ? parseFloat(tickerData?.todaysChangePerc).toFixed(2) : 'N/A',
                                closingPrice: tickerData?.day?.c ? parseFloat(tickerData?.day?.c).toFixed(2) : 'N/A',
                            };
                        });
    
                        setResults(combinedResults);
                        setNoResults(combinedResults.length === 0);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    if (currentRequestId === requestIdRef.current) {
                        setNoResults(true);
                    }
                } finally {
                    if (currentRequestId === requestIdRef.current) {
                        setLoading(false);
                    }
                }
            }
        };
    
        fetchData();
    }, [query]);

    useEffect(() => {
        const updateStocks = async () => {
            try {
                const symbols = initialStocks.map(stock => stock["1. symbol"]).join(",");
                const response = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${symbols}&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`);
                const data = await response.json();

                if (data.status === "OK") {
                    const updatedStocks = initialStocks.map(stock => {
                        const matchingTicker = data.tickers.find(ticker => ticker.ticker === stock["1. symbol"]);
                        return {
                            ...stock,
                            todaysChangePerc: matchingTicker?.todaysChangePerc?.toFixed(2) || "N/A", // Add percentage or "N/A"
                        };
                    });
                    setStocks(updatedStocks);
                } else {
                    console.error("Failed to fetch stock data:", data);
                }
            } catch (error) {
                console.error("Error updating stocks:", error);
            }
        };

        // Fetch data immediately and then every 10 seconds
        updateStocks();
        const intervalId = setInterval(updateStocks, 10000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setIsvisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsvisible]);

    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus(); // Autofocus the input when isVisible is true
        }
    }, [isVisible]);

    const handleSearchClick = (symbol, view) => {
        updateUrl(symbol, view); // Example: Navigate with `symbol` and a specific view
        setIsvisible(false);
        handleSubmitHistory(symbol);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value.toUpperCase());
        if (value.length < 1) {
            setResults([]);
            setNoResults(false);
        }
    };

    const handleSubmitHistory = async (symbol) => {
        try {
            const response = await axios.post('https://devsalman.tech/search-history', {
                symbol,
            }, {
                withCredentials: true,
            });
    
            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                console.log(response.data.symbol);
            } else {
                console.log(data.message)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data.message)
            } else {
                console.log('An error occurred. Please try again.');
            }
            console.error('Error during watchlist submission:', error);
        }
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full lg:pt-[15%] pt-[7vh] backdrop-blur-sm bg-black/50 z-20 ${isVisible ? 'visible' : 'hidden'}`}>
            <div ref={searchBarRef} className="xl:w-[45%] lg:w-[55%] sm:w-[75%] w-[94%] h-auto flex flex-col gap-y-2 xl:container mx-auto">
                <div className="w-full relative">
                    <Image className="absolute top-3 left-3" src='/images/search.svg' width={18} height={18} alt="search logo"></Image>
                    <input
                        ref={inputRef}
                        name="search_Symbols"
                        type="text"
                        placeholder="Search stocks, symbols & companies here..."
                        value={query}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className="w-full text-md px-2 pl-10 py-2 border bg-primaryBg font-sansMedium text-primaryTextColor border-primaryTextColor/10 rounded-xl focus:outline-none"
                    />
                </div>
                <ul className="relative flex flex-col bg-primaryBg px-4 max-sm:px-3 rounded-xl min-h-[35vh] lg:max-h-[45vh] max-h-[57vh] overflow-y-auto scrollbar-thin">
                    {/* Loader Start */}
                    <div 
                    className={`${loading ? 'visible' : 'hidden'} absolute top-0 left-0 right-0 bottom-0 w-full flex md:items-center justify-center max-md:pt-[30%] backdrop-blur-[2px] bg-black/20`}
                    >
                        <div class="typewriter">
                            <div class="slide"><i></i></div>
                            <div class="paper"></div>
                            <div class="keyboard"></div>
                        </div>
                    </div>
                    {/* Loader End */}

                    {/* No Results Start*/}
                    {noResults && !loading && (
                        <div className='flex flex-col gap-2'>
                        <div className='mt-4 flex items-center gap-2 text-base font-sansMedium bg-primaryMain/10 border border-primaryMain/5 px-2 pr-3 py-[2px] rounded-full'>
                            <Image src="/images/top-stocks.png" width={24} height={24} alt='Stockverse Logo' />
                            Best Matches
                        </div>
                        <div className='p-2 rounded-xl text-white flex gap-2 bg-sell'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none"><path fill="#fff" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path></svg>
                            No Match Found
                        </div>
                    </div>
                    )}
                    {/* No Results End*/}

                    {/* Search Results Start*/}
                    {results.length > 0 && (
                        <div>
                            <div className='mt-4 flex items-center gap-2 text-base font-sansMedium bg-primaryMain/10 border border-primaryMain/5 px-2 pr-3 py-[2px] rounded-full'>
                                <Image src="/images/top-stocks.png" width={24} height={24} alt='Stockverse Logo' />
                                Best Matches
                            </div>
                            {results.map((result) => (
                                <li
                                    key={result['1. symbol']}
                                    className="flex py-4 bg-primaryBg items-center justify-between border-b border-black/5"
                                >
                                    <div onClick={() => handleSearchClick(result['1. symbol'], undefined)} className='flex items-center gap-2 cursor-pointer'>
                                        <Logo symbol={result['1. symbol']} alt={result['2. name']} size={300} className="w-10 h-10 rounded-lg shadow" />
                                        <div className="sm:text-md text-base font-sansMedium text-primaryTextColor">{result['1. symbol']}</div>
                                        {/* <div className='flex flex-col items-end pl-2'>
                                            <div className="text-sm font-sansMedium text-primaryTextColor">${result.closingPrice}</div>
                                        </div> */}
                                        <div className={`flex items-center gap-1 sm:text-sm text-xs font-sansMedium px-2 py-[1px] rounded-full ${result.todaysChangePerc >= 0 ? 'text-buy bg-buy/5' : 'text-sell bg-sell/5'}`}>
                                            { result.todaysChangePerc !== 'N/A' ? `${result.todaysChangePerc}%` : result.todaysChangePerc}
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <div onClick={() => handleSearchClick(result['1. symbol'], 'chart')} className='max-md:hidden cursor-pointer flex items-center gap-1 text-base font-sansMedium bg-primaryMain/10 border border-primaryMain/5 px-2 pr-3 py-[2px] rounded-full'>
                                            <Image src="/images/level2.png" width={22} height={22} alt='Stockverse Logo' />
                                            Chart
                                        </div>
                                        <div className='cursor-pointer flex items-center gap-1 sm:text-base text-sm font-sansMedium bg-primaryMain/10 border border-primaryMain/5 px-2 pr-3 py-[2px] rounded-full'>
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.46199 2.58993C8.63485 2.23972 8.72128 2.06462 8.83862 2.00867C8.94071 1.96 9.05931 1.96 9.1614 2.00867C9.27874 2.06462 9.36517 2.23972 9.53804 2.58993L11.178 5.9124C11.2291 6.01579 11.2546 6.06748 11.2919 6.10762C11.3249 6.14316 11.3645 6.17195 11.4085 6.1924C11.4582 6.21551 11.5152 6.22384 11.6293 6.24052L15.2977 6.77672C15.684 6.83318 15.8772 6.86141 15.9666 6.95577C16.0444 7.03786 16.0809 7.15066 16.0661 7.26277C16.0491 7.39162 15.9093 7.52782 15.6296 7.80022L12.9761 10.3848C12.8934 10.4653 12.852 10.5056 12.8253 10.5535C12.8017 10.596 12.7865 10.6426 12.7807 10.6908C12.7741 10.7453 12.7838 10.8022 12.8034 10.916L13.4295 14.5665C13.4955 14.9516 13.5285 15.1441 13.4665 15.2583C13.4125 15.3577 13.3165 15.4274 13.2053 15.448C13.0775 15.4717 12.9046 15.3808 12.5588 15.199L9.27928 13.4743C9.1771 13.4206 9.12601 13.3937 9.07218 13.3832C9.02452 13.3738 8.9755 13.3738 8.92784 13.3832C8.87402 13.3937 8.82293 13.4206 8.72074 13.4743L5.44119 15.199C5.09544 15.3808 4.92256 15.4717 4.79473 15.448C4.68351 15.4274 4.58754 15.3577 4.53355 15.2583C4.4715 15.1441 4.50452 14.9516 4.57056 14.5665L5.19666 10.916C5.21618 10.8022 5.22594 10.7453 5.21934 10.6908C5.21349 10.6426 5.19833 10.596 5.1747 10.5535C5.14802 10.5056 5.10666 10.4653 5.02394 10.3848L2.37042 7.80022C2.09075 7.52782 1.95091 7.39162 1.93389 7.26277C1.91909 7.15066 1.95567 7.03786 2.03344 6.95577C2.12283 6.86141 2.31598 6.83318 2.70228 6.77672L6.37073 6.24052C6.48482 6.22384 6.54186 6.21551 6.59154 6.1924C6.63552 6.17195 6.67512 6.14316 6.70814 6.10762C6.74543 6.06748 6.77095 6.01579 6.82198 5.9124L8.46199 2.58993Z" stroke="rgba(var(--primary-main))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Watchlist
                                        </div>
                                        <div onClick={() => handleSearchClick(result['1. symbol'], 'news')} className='max-md:hidden cursor-pointer flex items-center gap-1 text-base font-sansMedium bg-primaryMain/10 border border-primaryMain/5 px-2 pr-3 py-[2px] rounded-full'>
                                            <Image src="/images/news.png" width={22} height={22} alt='Stockverse Logo' />
                                            Stock News
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </div>
                    )}
                    {/* Search Results End*/}

                    {/* Top Stocks Start*/}
                    <div className='mt-4 flex items-center gap-2 text-base font-sansMedium bg-primaryMain/10 border border-primaryMain/5 px-2 pr-3 py-[2px] rounded-full'>
                        <Image src="/images/top-stocks.png" width={24} height={24} alt='Stockverse Logo' />
                        Top Stocks
                    </div>
                    {stocks.map((stock) => (
                        <li
                            key={stock['1. symbol']}
                            className="flex py-4 bg-primaryBg items-center justify-between border-b border-black/5"
                        >
                            <div onClick={() => handleSearchClick(stock['1. symbol'], undefined)} className='flex items-center gap-2 cursor-pointer'>
                                <Logo symbol={stock['1. symbol']} alt={stock['2. name']} size={300} className="w-10 h-10 rounded-lg shadow" />
                                <div className="sm:text-md text-base font-sansMedium text-primaryTextColor">{stock['1. symbol']}</div>
                                <div className={`flex items-center gap-1 sm:text-sm text-xs font-sansMedium px-2 py-[1px] rounded-full ${stock.todaysChangePerc >= 0 ? 'text-buy bg-buy/5' : 'text-sell bg-sell/5'}`}>
                                    { stock.todaysChangePerc !== 'N/A' ? `${stock.todaysChangePerc}%` : stock.todaysChangePerc}
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div onClick={() => handleSearchClick(stock['1. symbol'], 'chart')} className='max-md:hidden flex items-center gap-1 text-base font-sansMedium bg-primaryMain/10 border border-primaryMain/5 px-2 pr-3 py-[2px] rounded-full cursor-pointer'>
                                    <Image src="/images/level2.png" width={22} height={22} alt='Stockverse Logo' />
                                    Chart
                                </div>
                                <div className='flex items-center gap-1 sm:text-base text-sm font-sansMedium bg-primaryMain/10 border border-primaryMain/5 px-2 pr-3 py-[2px] rounded-full cursor-pointer'>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.46199 2.58993C8.63485 2.23972 8.72128 2.06462 8.83862 2.00867C8.94071 1.96 9.05931 1.96 9.1614 2.00867C9.27874 2.06462 9.36517 2.23972 9.53804 2.58993L11.178 5.9124C11.2291 6.01579 11.2546 6.06748 11.2919 6.10762C11.3249 6.14316 11.3645 6.17195 11.4085 6.1924C11.4582 6.21551 11.5152 6.22384 11.6293 6.24052L15.2977 6.77672C15.684 6.83318 15.8772 6.86141 15.9666 6.95577C16.0444 7.03786 16.0809 7.15066 16.0661 7.26277C16.0491 7.39162 15.9093 7.52782 15.6296 7.80022L12.9761 10.3848C12.8934 10.4653 12.852 10.5056 12.8253 10.5535C12.8017 10.596 12.7865 10.6426 12.7807 10.6908C12.7741 10.7453 12.7838 10.8022 12.8034 10.916L13.4295 14.5665C13.4955 14.9516 13.5285 15.1441 13.4665 15.2583C13.4125 15.3577 13.3165 15.4274 13.2053 15.448C13.0775 15.4717 12.9046 15.3808 12.5588 15.199L9.27928 13.4743C9.1771 13.4206 9.12601 13.3937 9.07218 13.3832C9.02452 13.3738 8.9755 13.3738 8.92784 13.3832C8.87402 13.3937 8.82293 13.4206 8.72074 13.4743L5.44119 15.199C5.09544 15.3808 4.92256 15.4717 4.79473 15.448C4.68351 15.4274 4.58754 15.3577 4.53355 15.2583C4.4715 15.1441 4.50452 14.9516 4.57056 14.5665L5.19666 10.916C5.21618 10.8022 5.22594 10.7453 5.21934 10.6908C5.21349 10.6426 5.19833 10.596 5.1747 10.5535C5.14802 10.5056 5.10666 10.4653 5.02394 10.3848L2.37042 7.80022C2.09075 7.52782 1.95091 7.39162 1.93389 7.26277C1.91909 7.15066 1.95567 7.03786 2.03344 6.95577C2.12283 6.86141 2.31598 6.83318 2.70228 6.77672L6.37073 6.24052C6.48482 6.22384 6.54186 6.21551 6.59154 6.1924C6.63552 6.17195 6.67512 6.14316 6.70814 6.10762C6.74543 6.06748 6.77095 6.01579 6.82198 5.9124L8.46199 2.58993Z" stroke="rgba(var(--primary-main))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Watchlist
                                </div>
                                <div onClick={() => handleSearchClick(stock['1. symbol'], 'news')} className='max-md:hidden flex items-center gap-1 text-base font-sansMedium bg-primaryMain/10 border border-primaryMain/5 px-2 pr-3 py-[2px] rounded-full cursor-pointer'>
                                    <Image src="/images/news.png" width={22} height={22} alt='Stockverse Logo' />
                                    Stock News
                                </div>
                            </div>
                        </li>
                    ))}
                    {/* Top Stocks End*/}
                </ul>
            </div>
        </div>
    );
}