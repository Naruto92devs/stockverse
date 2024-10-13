'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Logo from '@/components/Logo';
import formatNumber from '@/components/FormatNumber';
import Chart from '@/components/Chart'; // Assuming you have a separate component for TradingView
import StockNews from '@/components/stockNews';
import Earnings_Calendar from '@/components/EarningsCalendar';
import Insider_Transactions from '@/components/InsiderTransactions';
import Technical_Analysis from '@/components/TechnicalAnalysis';
import Historical_Summary from '@/components/Historical_Summary';
import Historical_Data from '@/components/HistoricalData';
import Trades from '@/components/Trades';
import StockVerse_GPT from '@/components/StockverseGpt';
import Level_2 from '@/components/Level2';
import SymbolFallBackUI from '@/components/SymbolFallbackUI';
import SymbolDetailsFallBackUI from '@/components/SymbolDetailsFallbackUI';

// Utility function to truncate a string after a certain number of words
const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
        return {
            truncated: words.slice(0, wordLimit).join(' '),
            isTruncated: true,
        };
    }
    return {
        truncated: description,
        isTruncated: false,
    };
};

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function StockDetails() {
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false); // State to toggle full description
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const symbol = pathname.split('/').pop(); // Extract symbol from URL
    // Initialize the filter state with null to wait for sessionStorage check
    const [filter, setFilter] = useState(null);
    
    // Decode the query parameter to ensure it's properly formatted
    const searchBarName = searchParams.get('name') ? decodeURIComponent(searchParams.get('name')) : null;

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                // Fetch data from the new API on the server side using fetch
                const response = await fetch(`${STOCKVERSE_BACK_END}/stocks-list?symbols=${symbol}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const stock = data[0]; // Assuming we always get one stock object


                // Use the fallback name if `stock.overview.Name` is "Not Available" or null
                const stockName = (stock.overview.Name && stock.overview.Name !== "Not Available" && stock.overview.Name !== "Undefined") ? stock.overview.Name : searchBarName;

                const formattedData = {
                    symbol: stock.overview.Symbol,
                    name: stockName, // Fallback to search bar name if not available
                    AssetType: stock.overview.AssetType,
                    Sector: stock.overview.Sector,
                    Industry: stock.overview.Industry,
                    Description: stock.overview.Description,
                    siteUrl: stock.overview.OfficialSite,
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
    }, [symbol, searchBarName]);

    // Ensure stockData is available before accessing Description
    const { truncated, isTruncated } = stockData
    ? truncateDescription(stockData.Description, 30) // 30 word limit
    : { truncated: '', isTruncated: false };

    useEffect(() => {
        // Check if `sessionStorage` is available (client-side only)
        if (typeof window !== 'undefined') {
            const savedFilter = sessionStorage.getItem('symbol-details');
            if (savedFilter) {
                setFilter(savedFilter);
            } else {
                setFilter('chart'); // Default value if nothing is stored
            }
        }
    }, []);

    // Store the filter state in sessionStorage whenever it changes
    useEffect(() => {
        if (filter !== null && typeof window !== 'undefined') {
            sessionStorage.setItem('symbol-details', filter);
        }
    }, [filter]);

    // Function to handle filter change
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    // Wait until the filter is loaded before rendering
    if (filter === null) return null;

    return (
        <div className="w-full h-full">
            {/* hero section */}
            <div className="pb-10 pt-8 max-md:pt-6 w-full bg-stocksBg bg-no-repeat bg-cover bg-right-bottom">
                <div className="px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
                    {loading ? (
                            <SymbolFallBackUI/>
                    ) : error ? (
                        // Display a custom error UI or message if there's an error
                        <div>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-y-4 py-2 max-sm:px-1.5 lg:pr-[30%]">
                            <div className="flex max-md:flex-col-reverse max-md:items-start max-md:gap-4 items-end justify-between">
                                <div className="flex items-end">
                                    <Logo siteUrl={stockData.siteUrl} symbol={stockData.symbol} alt={stockData.name} size={42} className="w-14 h-14 mr-2 max-sm:mr-1.5 rounded-full shadow-md" />
                                    <div>
                                        <h1 className="text-xl text-secondaryHeading font-sansSemibold">{stockData.symbol}</h1>
                                        <p className="text-sm text-secondaryHeading">{stockData.name}</p>
                                    </div>
                                </div>
                                <div className="max-md:ml-auto flex items-center">
                                    <p className="text-sm text-mobNavLink font-sansMedium py-2 px-4 bg-primaryHeading">{stockData.AssetType}</p>
                                    <p className="text-sm cursor-pointer flex items-center gap-x-2 text-secondaryColor font-sansMedium py-2 px-4 max-md:py-1 bg-background">Watch Stock 
                                        <svg
                                            className="cursor-pointer max-sm:p-1 text-center max-md:w-7 max-md:h-7"
                                            width="17"
                                            height="20"
                                            viewBox="0 0 26 29"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M17.5 22H8.5M17.5 22H25L22.8925 19.8925C22.6095 19.6094 22.385 19.2734 22.2319 18.9035C22.0787 18.5337 21.9999 18.1373 22 17.737V13C22.0002 11.1384 21.4234 9.32251 20.3488 7.80233C19.2743 6.28215 17.755 5.13245 16 4.5115V4C16 3.20435 15.6839 2.44129 15.1213 1.87868C14.5587 1.31607 13.7956 1 13 1C12.2044 1 11.4413 1.31607 10.8787 1.87868C10.3161 2.44129 10 3.20435 10 4V4.5115C6.505 5.7475 4 9.082 4 13V17.7385C4 18.5455 3.679 19.321 3.1075 19.8925L1 22H8.5H17.5ZM17.5 22V23.5C17.5 24.6935 17.0259 25.8381 16.182 26.682C15.3381 27.5259 14.1935 28 13 28C11.8065 28 10.6619 27.5259 9.81802 26.682C8.97411 25.8381 8.5 24.6935 8.5 23.5V22H17.5Z"
                                                stroke="currentColor" // Use symbol-specific color
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </p>
                                </div>
                            </div>
                            <div className="description-section">
                                <p className="text-base font-sansRegular text-secondaryHeading/50">
                                    {showFullDescription ? stockData.Description : truncated}
                                </p>
                                {isTruncated && (
                                    <button
                                        onClick={() => setShowFullDescription(!showFullDescription)}
                                        className="text-primaryHeading hover:underline"
                                    >
                                        {showFullDescription ? 'See Less' : 'Click To See More'}
                                    </button>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* symbol details */}
            <div className="px-6 pb-16 -mt-8 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
                <div className="bg-primaryHeading max-md:rounded-2xl w-full p-8 rounded-lg shadow-xl">
                    {loading ? (
                        <SymbolDetailsFallBackUI/>
                    ) : error ? (
                        // Display a custom error UI or message if there's an error
                        <div>
                            <p>{error}</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap md:gap-10 max-lg:gap-y-8 justify-between w-full">
                            <div className="max-md:w-[45%] flex flex-col gap-y-4">
                                <p className="flex text-base font-sansMedium text-mobNavLink items-center gap-x-2">
                                    <svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.1667 6.50033V3.83366C20.1667 3.12641 19.8857 2.44814 19.3856 1.94804C18.8855 1.44794 18.2072 1.16699 17.5 1.16699H4.16667C3.45942 1.16699 2.78115 1.44794 2.28105 1.94804C1.78095 2.44814 1.5 3.12641 1.5 3.83366V11.8337C1.5 12.5409 1.78095 13.2192 2.28105 13.7193C2.78115 14.2194 3.45942 14.5003 4.16667 14.5003H6.83333M9.5 19.8337H22.8333C23.5406 19.8337 24.2189 19.5527 24.719 19.0526C25.219 18.5525 25.5 17.8742 25.5 17.167V9.16699C25.5 8.45975 25.219 7.78147 24.719 7.28137C24.2189 6.78128 23.5406 6.50033 22.8333 6.50033H9.5C8.79276 6.50033 8.11448 6.78128 7.61438 7.28137C7.11428 7.78147 6.83333 8.45975 6.83333 9.16699V17.167C6.83333 17.8742 7.11428 18.5525 7.61438 19.0526C8.11448 19.5527 8.79276 19.8337 9.5 19.8337ZM18.8333 13.167C18.8333 13.8742 18.5524 14.5525 18.0523 15.0526C17.5522 15.5527 16.8739 15.8337 16.1667 15.8337C15.4594 15.8337 14.7811 15.5527 14.281 15.0526C13.781 14.5525 13.5 13.8742 13.5 13.167C13.5 12.4597 13.781 11.7815 14.281 11.2814C14.7811 10.7813 15.4594 10.5003 16.1667 10.5003C16.8739 10.5003 17.5522 10.7813 18.0523 11.2814C18.5524 11.7815 18.8333 12.4597 18.8333 13.167Z" stroke="#CACACA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Market Cap
                                </p>
                                <p className="text-sm text-mobNavLink">{stockData.marketCap}</p>
                            </div>
                            <div className="max-md:w-[45%] flex flex-col gap-y-4">
                                <p className="flex text-base font-sansMedium text-mobNavLink items-center gap-x-2">
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2374_2581)">
                                    <path d="M9.33496 0.77832V17.8925" stroke="#CACACA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.2246 3.88965H7.39019C6.66808 3.88965 5.97555 4.1765 5.46494 4.68711C4.95434 5.19772 4.66748 5.89025 4.66748 6.61236C4.66748 7.33446 4.95434 8.02699 5.46494 8.5376C5.97555 9.04821 6.66808 9.33506 7.39019 9.33506H11.2798C12.0019 9.33506 12.6944 9.62192 13.205 10.1325C13.7156 10.6431 14.0025 11.3357 14.0025 12.0578C14.0025 12.7799 13.7156 13.4724 13.205 13.983C12.6944 14.4936 12.0019 14.7805 11.2798 14.7805H4.66748" stroke="#CACACA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_2374_2581">
                                    <rect width="18.67" height="18.67" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    Price
                                </p>
                                <p className="text-sm text-mobNavLink">${stockData.price}</p>
                            </div>
                            <div className="max-md:w-[45%] flex flex-col gap-y-4">
                                <p className="flex text-base font-sansMedium text-mobNavLink items-center gap-x-2">
                                    <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.1694 6.83438H16.0761C15.7393 6.83423 15.4066 6.90695 15.1006 7.04754C14.7947 7.18813 14.5228 7.39326 14.3036 7.64885L8.7014 14.188C8.48207 14.4438 8.20997 14.649 7.90381 14.7896C7.59764 14.9302 7.26466 15.0028 6.92775 15.0025H6.8344M3.18325 1C1.74263 3.90069 0.995262 7.09628 1.00002 10.335C1.00002 13.6886 1.78533 16.8578 3.18325 19.67V1ZM19.6712 19.67C21.1114 16.7692 21.8584 13.5736 21.8533 10.335C21.8533 6.9814 21.0679 3.81217 19.6712 1V19.67ZM8.00127 6.83438H9.4552C9.70863 6.83449 9.95513 6.9171 10.1574 7.06973C10.3598 7.22236 10.5069 7.4367 10.5766 7.68036L12.4272 14.1565C12.4969 14.4002 12.644 14.6145 12.8464 14.7671C13.0487 14.9198 13.2952 15.0024 13.5486 15.0025H15.0025L8.00127 6.83438Z" stroke="#CACACA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Volume
                                </p>
                                <p className="text-sm text-mobNavLink">{stockData.volume}</p>
                            </div>
                            <div className="max-md:w-[45%] flex flex-col gap-y-4">
                                <p className="flex text-base font-sansMedium text-mobNavLink items-center gap-x-2">
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.26056 19.67H12.4094M17.5956 19.67V3.07444C17.5956 2.52427 17.377 1.99662 16.988 1.60759C16.5989 1.21856 16.0713 1 15.5211 1H5.14889C4.59871 1 4.07107 1.21856 3.68204 1.60759C3.293 1.99662 3.07444 2.52427 3.07444 3.07444V19.67H17.5956ZM17.5956 19.67H19.67H17.5956ZM17.5956 19.67H12.4094H17.5956ZM3.07444 19.67H1H3.07444ZM3.07444 19.67H8.26056H3.07444ZM7.22333 5.14889H8.26056H7.22333ZM7.22333 9.29778H8.26056H7.22333ZM12.4094 5.14889H13.4467H12.4094ZM12.4094 9.29778H13.4467H12.4094ZM8.26056 19.67V14.4839C8.26056 14.2088 8.36983 13.945 8.56435 13.7505C8.75887 13.5559 9.02269 13.4467 9.29778 13.4467H11.3722C11.6473 13.4467 11.9111 13.5559 12.1056 13.7505C12.3002 13.945 12.4094 14.2088 12.4094 14.4839V19.67H8.26056Z" stroke="#CACACA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Sector
                                </p>
                                <p className="text-sm text-mobNavLink">{stockData.Sector}</p>
                            </div>
                            <div className=" flex flex-col gap-y-4">
                                <p className="flex text-base font-sansMedium text-mobNavLink items-center gap-x-2">
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.67 12.6739C16.7041 13.8732 13.5342 14.4878 10.335 14.4839C7.03352 14.4839 3.88348 13.8408 1 12.6739M10.335 11.3722H10.3454M14.4839 5.14889V3.07444C14.4839 2.52427 14.2653 1.99662 13.8763 1.60759C13.4873 1.21856 12.9596 1 12.4094 1H8.26056C7.71038 1 7.18274 1.21856 6.7937 1.60759C6.40467 1.99662 6.18611 2.52427 6.18611 3.07444V5.14889H14.4839ZM3.07444 19.67H17.5956C18.1457 19.67 18.6734 19.4514 19.0624 19.0624C19.4514 18.6734 19.67 18.1457 19.67 17.5956V7.22333C19.67 6.67316 19.4514 6.14551 19.0624 5.75648C18.6734 5.36745 18.1457 5.14889 17.5956 5.14889H3.07444C2.52427 5.14889 1.99662 5.36745 1.60759 5.75648C1.21856 6.14551 1 6.67316 1 7.22333V17.5956C1 18.1457 1.21856 18.6734 1.60759 19.0624C1.99662 19.4514 2.52427 19.67 3.07444 19.67Z" stroke="#CACACA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Industory
                                </p>
                                <p className="text-sm text-mobNavLink">{stockData.Industry}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="px-6 pb-16 -mt-8 max-lg:px-0 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
                {/* Buttons for selecting stock type */}
                <div className="max-w-full w-max flex justify-start items-end gap-2 overflow-x-auto pb-2">
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'chart' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => handleFilterChange('chart')}
                    >
                        Chart
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'news' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => handleFilterChange('news')}
                    >
                        News
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'technical-analysis' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => handleFilterChange('technical-analysis')}
                    >
                        Technical Analysis
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'earnings-calendar' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => handleFilterChange('earnings-calendar')}
                    >
                        Earnings Calendar
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'insider-transactions' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => handleFilterChange('insider-transactions')}
                    >
                        Insider Transactions
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'historical' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => handleFilterChange('historical')}
                    >
                        Historical
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'trades' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => handleFilterChange('trades')}
                    >
                        Trades
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'level2' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => handleFilterChange('level2')}
                    >
                        Level 2
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'stockverse-gpt' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => handleFilterChange('stockverse-gpt')}
                    >
                        StockVerse GPT
                    </button>
                </div>

                {/* Render content based on filter */}
                <div className="w-full h-full pt-2">
                    {(() => {
                        switch (filter) {
                            case 'chart':
                                return (
                                    <div className="flex flex-col gap-y-6 max-lg:px-3">
                                        <Chart symbol={symbol} />
                                        <StockNews symbol={symbol} />
                                    </div>
                                );
                            case 'news':
                                return (
                                    <div className="max-lg:px-3">
                                        <StockNews symbol={symbol} />
                                    </div>
                                ) ;
                            case 'earnings-calendar':
                                return <Earnings_Calendar symbol={symbol} />;
                            case 'insider-transactions':
                                return <Insider_Transactions symbol={symbol} />;
                            case 'technical-analysis':
                                return <Technical_Analysis symbol={symbol} />;
                            case 'historical':
                                return (
                                    <div className="w-full h-full flex flex-col gap-y-6">
                                        <Historical_Summary symbol={symbol} />
                                        <Historical_Data symbol={symbol} />
                                    </div>
                                );
                            case 'trades':
                                return <Trades symbol={symbol} />;
                            case 'stockverse-gpt':
                                return <StockVerse_GPT symbol={symbol} />;
                            case 'level2':
                                return <Level_2 symbol={symbol} />;
                            default:
                                return null;
                        }
                    })()}
                    {/* <div className="pt-8">
                        <StockNews symbol={symbol}/>
                    </div> */}
                </div>
            </div>
        </div>
    );
}