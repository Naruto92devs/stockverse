// components/StocksList.js
import Image from "next/image";

async function StocksList() {
// Fetch data from the API on the server side
const res = await fetch('https://api.stockverse.ai/top7');
const data = await res.json();

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

// Extract necessary information (symbol, market cap, price)
const stockData = Object.values(data).map((stock) => {
    const domain = new URL(stock.Overview.OfficialSite).hostname.replace('www.', '');
    return {
    symbol: stock.Overview.Symbol,
    name: stock.Overview.Name,
    logoUrl: `https://logo.clearbit.com/${domain}`, // Use Clearbit to get the logo
    marketCap: formatNumber(Number(stock.Overview.MarketCapitalization)),
    avgGrowth: stock["Global Quote"]["10. change percent"],
    price: Number(stock["Global Quote"]["05. price"]),
    volume: formatNumber(Number(stock["Global Quote"]["06. volume"])),  // Corrected key for volume
    };
});

return (
    <div className="w-full h-full shadow-lg bg-primaryColor">
    <div className="w-full flex justify-between bg-stockListHeadingBg py-2 px-3 border-y-2 border-stockListHeading/20">
        <p className="w-[25%] min-w-max font-sansMedium text-sm text-stockListHeading">STOCK</p>
        <p className="w-[10%] min-w-max font-sansMedium text-sm text-stockListHeading">MARKET CAP</p>
        <p className="w-[10%] min-w-max font-sansMedium text-sm text-stockListHeading">AVG GROWTH</p>
        <p className="w-[10%] min-w-max font-sansMedium text-sm text-stockListHeading">CURRENT PRICE</p>
        <p className="w-[10%] min-w-max font-sansMedium text-sm text-stockListHeading">VOLUME</p>
        <p className="w-[5%] min-w-max font-sansMedium text-sm text-stockListHeading">WATCH</p>
    </div>
    {stockData.map((stock) => (
        <div key={stock.symbol} className="w-full flex justify-between py-2 px-3">
        <div className="w-[25%] flex items-center min-w-max font-sansMedium text-sm text-stockListHeading">
            <Image width={24} height={24} src={stock.logoUrl} alt={stock.name} className="w-6 h-6 mr-2" /> {/* Display the logo */}
            <ul className="flex flex-col">
            {/* <p>{stock.symbol}</p> */}
            <li>{stock.name}</li>
            </ul>
        </div>
        <p className="w-[10%] min-w-max font-sansMedium text-sm text-stockListHeading">${stock.marketCap}</p>
        <p className={`w-[10%] min-w-max font-sansMedium text-sm ${
            parseFloat(stock.avgGrowth) >= 0 ? 'text-buy' : 'text-sell'
            }`}
        >
            {stock.avgGrowth}
        </p>
        <p className="w-[10%] min-w-max font-sansMedium text-sm text-stockListHeading">${stock.price.toFixed(2)}</p>
        <p className="w-[10%] min-w-max font-sansMedium text-sm text-stockListHeading">{stock.volume}</p>
        <svg
            className="w-[5%]"
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
}

export default StocksList;