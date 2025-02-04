import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSymbol } from './SymbolContext'; // Import the global SymbolContext

const HistoricalSummaryContext = createContext();

export const HistoricalSummaryProvider = ({ children }) => {
    const { symbol } = useSymbol(); // Access the global symbol
    const [historicalSummary, setHistoricalSummary] = useState(null);
    const [summaryError, setSummaryError] = useState(false);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false); // Background refresh state

    // Function to extract summarized data with price change calculations
    const extractSummaryData = (dataArray) => {
        const summaryData = {};
        const totalEntries = dataArray.length;

        // Define the time intervals in weeks
        const intervals = [
            { label: '1 Week', weeks: 1 },
            { label: '1 Month', weeks: 4 },
            { label: '3 Months', weeks: 12 },
            { label: '6 Months', weeks: 24 },
            { label: '1 Year', weeks: 52 },
            { label: '3 Years', weeks: 156 },
            { label: '5 Years', weeks: 260 },
            { label: '10 Years', weeks: 520 },
            { label: '15 Years', weeks: 780 },
            { label: '20 Years', weeks: 1040 },
            { label: '30 Years', weeks: 1560 },
        ];

        // Get the latest available price (most recent adjusted close)
        const latestPrice = dataArray[0]?.adjustedClose ?? null;

        intervals.forEach(({ label, weeks }) => {
            const index = weeks; // Using weeks as an index from the most recent data
            if (index < totalEntries && dataArray[index]) { // Ensure data exists for that interval
                const pastPrice = dataArray[index].adjustedClose;
                const priceChange = latestPrice - pastPrice;
                const percentageChange = (priceChange / pastPrice) * 100;

                summaryData[label] = {
                    date: dataArray[index].date,
                    volume: dataArray[index].volume,
                    adjustedClose: pastPrice,
                    priceChange: parseFloat(priceChange.toFixed(4)), // Ensure precision
                    percentageChange: parseFloat(percentageChange.toFixed(2)), // Rounded to 2 decimal places
                };
            }
        });

        return summaryData;
    };

    const fetchHistoricalSummary = async (currentSymbol = symbol, isBackground = false) => {
        try {
            if (!isBackground) {
                setSummaryLoading(true); // Only set loading for primary fetch
            } else {
                setBackgroundRefreshing(true); // Indicate background refresh
            }

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END}/historical-data?filter=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${currentSymbol}`
            );

            if (response.status === 200 && response.data["Weekly Adjusted Time Series"]) {
                const formattedData = Object.entries(response.data["Weekly Adjusted Time Series"]).map(([date, data]) => ({
                    date,
                    open: parseFloat(data["1. open"]),
                    high: parseFloat(data["2. high"]),
                    low: parseFloat(data["3. low"]),
                    close: parseFloat(data["4. close"]),
                    adjustedClose: parseFloat(data["5. adjusted close"]),
                    volume: parseInt(data["6. volume"], 10),
                }));

                const summaryData = extractSummaryData(formattedData);
                setHistoricalSummary(summaryData);
                console.log(summaryData);
                setSummaryError(false);
            } else {
                setHistoricalSummary(null);
            }
        } catch (error) {
            console.error('Error fetching historical data:', error);
            setSummaryError(true);
            setHistoricalSummary(null);
        } finally {
            if (!isBackground) {
                setSummaryLoading(false);
            } else {
                setBackgroundRefreshing(false);
            }
        }
    };

    useEffect(() => {
        if (symbol && !historicalSummary) {
            fetchHistoricalSummary(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historicalSummary]);

    useEffect(() => {
        if (symbol) {
            setHistoricalSummary(null);
            fetchHistoricalSummary(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    // Background fetch every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchHistoricalSummary(symbol, true); // Pass true for background fetch
            }
        }, 15 * 60 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    return (
        <HistoricalSummaryContext.Provider
            value={{
                historicalSummary,
                summaryLoading,
                summaryError,
                fetchHistoricalSummary,
                backgroundRefreshing, // Expose background refreshing state
            }}
        >
            {children}
        </HistoricalSummaryContext.Provider>
    );
};

export const useHistoricalSummary = () => useContext(HistoricalSummaryContext);