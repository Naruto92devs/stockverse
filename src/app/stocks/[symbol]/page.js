'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import TradingViewWidget from '@/components/TradingViewWidget'; // Assuming you have a separate component for TradingView

export default function StockDetails() {
const [stockData, setStockData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const pathname = usePathname();
const symbol = pathname.split('/').pop(); // Extract symbol from URL

useEffect(() => {
const fetchStockData = async () => {
    try {
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=VEFY3WP6EIULI240`);
    const data = await response.json();
    if (data['Global Quote']) {
        setStockData(data['Global Quote']);
    } else {
        setError('No data found for the symbol.');
    }
    } catch (err) {
    setError('Error fetching stock data.');
    } finally {
    setLoading(false);
    }
};

fetchStockData();
}, [symbol]);

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

return (
<div>
    <h1>Stock Details for {symbol}</h1>
    <div>
    <p>Price: {stockData['05. price']}</p>
    <p>Change: {stockData['09. change']}</p>
    <p>Change Percent: {stockData['10. change percent']}</p>
    </div>
    <TradingViewWidget symbol={symbol} />
</div>
);
}
