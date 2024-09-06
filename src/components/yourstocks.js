// components/StocksListServer.js
import Image from "next/image";
import axios from 'axios'; // Import axios

async function StocksList() {
try {
// Fetch data from the new API on the server side using axios
const res = await axios.get('https://api.stockverse.ai/stocks-list?symbols=aapl,msft,goog,amzn,nvda,tsla,meta');
const data = res.data;

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

// Extract necessary information (symbol, market cap, price) from the updated API structure
const stockData = data.map((stock) => {
    const domain = new URL(stock.overview.OfficialSite).hostname.replace('www.', '');
    return {
    symbol: stock.overview.Symbol,
    name: stock.overview.Name,
    logoUrl: `https://img.logo.dev/${domain}?token=pk_GpgWOqB2R1qdEWrvsnD45w&size=200&format=png`, // Use Clearbit to get the logo
    marketCap: formatNumber(Number(stock.overview.MarketCapitalization)),
    avgGrowth: stock.globalQuote["10. change percent"],
    price: Number(stock.globalQuote["05. price"]),
    volume: formatNumber(Number(stock.globalQuote["06. volume"])), // Corrected key for volume
    };
});

return (
    <div className="w-full h-full shadow-lg bg-background mt-[50px]">
    <div className="w-full flex justify-between bg-stockListHeadingBg py-3 px-3 max-sm:px-1.5 border-y-2 border-stockListHeading/20">
        <p className="w-[27%] max-sm:w-[22%] min-w-max font-sansSemibold text-sm max-sm:text-[3vw] text-stockListHeading">STOCK</p>
        <p className="w-[20%] max-sm:hidden min-w-max text-center font-sansSemibold text-sm max-sm:text-[3vw] text-stockListHeading">MARKET CAP</p>
        <p className="w-[15%] hidden max-sm:block min-w-max text-center font-sansSemibold text-sm max-sm:text-[3vw] text-stockListHeading">MCap</p>
        <p className="w-[15%] min-w-max text-center font-sansSemibold text-sm max-sm:text-[3vw] text-stockListHeading">CHANGE</p>
        <p className="w-[15%] min-w-max text-center font-sansSemibold text-sm max-sm:text-[3vw] text-stockListHeading">PRICE</p>
        <p className="w-[15%] min-w-max text-center font-sansSemibold text-sm max-sm:text-[3vw] text-stockListHeading">VOLUME</p>
        <p className="w-[8%] max-sm:w-[14%] min-w-max text-center font-sansSemibold text-sm max-sm:text-[3vw] text-stockListHeading">WATCH</p>
    </div>
    {stockData.map((stock) => (
        <div key={stock.symbol} className="w-full items-center flex justify-between py-2 px-3 max-sm:px-1.5">
        <div className="w-[27%] max-sm:w-[22%] flex items-center min-w-max font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">
            <Image width={24} height={24} src={stock.logoUrl} alt={stock.name} className="w-6 h-6 mr-2 max-sm:mr-1.5 rounded-full" /> {/* Display the logo */}
            <ul className="flex items-center gap-x-1 max-xl:flex-col max-xl:items-start">
            <li>{stock.symbol}</li>
            <li className="text-xs max-lg:hidden">({stock.name})</li>
            </ul>
        </div>
        <p className="w-[20%] max-sm:w-[15%] text-center min-w-max font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">${stock.marketCap}</p>
        <p className={`w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] ${
            parseFloat(stock.avgGrowth) >= 0 ? 'text-buy' : 'text-sell'
            }`}
        >
            {parseFloat(stock.avgGrowth).toFixed(2) + '%'}
        </p>
        <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">${stock.price.toFixed(2)}</p>
        <p className="w-[15%] min-w-max text-center font-sansMedium text-sm max-sm:text-[3vw] text-primaryText">{stock.volume}</p>
        <svg
            className="w-[8%] max-sm:w-[14%] max-sm:p-1 text-center"
            width="26"
            height="29"
            viewBox="0 0 26 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M17.5 22H8.5M17.5 22H25L22.8925 19.8925C22.6095 19.6094 22.385 19.2734 22.2319 18.9035C22.0787 18.5337 21.9999 18.1373 22 17.737V13C22.0002 11.1384 21.4234 9.32251 20.3488 7.80233C19.2743 6.28215 17.755 5.13245 16 4.5115V4C16 3.20435 15.6839 2.44129 15.1213 1.87868C14.5587 1.31607 13.7956 1 13 1C12.2044 1 11.4413 1.31607 10.8787 1.87868C10.3161 2.44129 10 3.20435 10 4V4.5115C6.505 5.7475 4 9.082 4 13V17.7385C4 18.5455 3.679 19.321 3.1075 19.8925L1 22H8.5H17.5ZM17.5 22V23.5C17.5 24.6935 17.0259 25.8381 16.182 26.682C15.3381 27.5259 14.1935 28 13 28C11.8065 28 10.6619 27.5259 9.81802 26.682C8.97411 25.8381 8.5 24.6935 8.5 23.5V22H17.5Z"
            stroke="var(--svg-color)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
        </div>
    ))}
    </div>
);
} catch (error) {
console.error("Error fetching stock data:", error);
return <div>Error loading stocks data. Please try again later.</div>;
}
}

export default StocksList;