import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSymbol } from './SymbolContext'; // Import the global SymbolContext
import formatNumber from '@/components/FormatNumber';

const HistoricalDataContext = createContext();

export const HistoricalDataProvider = ({ children }) => {
    const { symbol } = useSymbol(); // Access the global symbol
    const [historicalData, setHistoricalData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false); // Background refresh state
    const [filter, setFilter] = useState('TIME_SERIES_INTRADAY'); // Change filter as needed

    // Function to determine the correct key for the time series data
    const getTimeSeriesKey = (filter) => {
        switch (filter) {
            case 'TIME_SERIES_DAILY_ADJUSTED':
                return 'Time Series (Daily)';
            case 'TIME_SERIES_WEEKLY_ADJUSTED':
                return 'Weekly Adjusted Time Series';
            case 'TIME_SERIES_MONTHLY_ADJUSTED':
                return 'Monthly Adjusted Time Series';
            case 'TIME_SERIES_INTRADAY':
                return 'Time Series (5min)';
            default:
                return 'Time Series (Daily)';
        }
    };

    // Function to fetch historical data
    const fetchHistoricalData = async (currentSymbol = symbol, isBackground = false) => {
        try {
            if (!isBackground) {
                setLoading(true); // Only set loading for primary fetch
            } else {
                setBackgroundRefreshing(true); // Indicate background refresh
            }

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END}/historical-data?filter=${filter}&symbol=${currentSymbol}&interval=5min`
            );

            if (response.status === 200 && response.data) {
                const timeSeriesKey = getTimeSeriesKey(filter);
                const timeSeriesData = response.data[timeSeriesKey];

                if (timeSeriesData) {
                    const formattedData = Object.entries(timeSeriesData).map(([dateTime, data]) => ({
                        dateTime,
                        open: parseFloat(data['1. open']).toFixed(2),
                        high: parseFloat(data['2. high']).toFixed(2),
                        low: parseFloat(data['3. low']).toFixed(2),
                        close: parseFloat(data['4. close']).toFixed(2),
                        volume: formatNumber(data['6. volume'] || data['5. volume']),
                        change: (parseFloat(data['4. close']) - parseFloat(data['1. open'])).toFixed(2),
                        changePercentage: (((parseFloat(data['4. close']) - parseFloat(data['1. open'])) / parseFloat(data['1. open'])) * 100).toFixed(2)
                    }));

                    setHistoricalData(formattedData);
                    setError(false);
                } else {
                    setHistoricalData([]);
                }
            } else {
                setHistoricalData(null);
            }
        } catch (error) {
            console.error('Error fetching historical data:', error);
            setError(true);
            setHistoricalData(null);
        } finally {
            if (!isBackground) {
                setLoading(false);
            } else {
                setBackgroundRefreshing(false);
            }
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        if (symbol && !historicalData) {
            fetchHistoricalData(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historicalData]);

    // Refetch when the symbol changes
    useEffect(() => {
        if (symbol) {
            setHistoricalData(null);
            fetchHistoricalData(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    // Refetch when the filter changes
    useEffect(() => {
        if (symbol) {
            fetchHistoricalData(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    // Background fetch every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchHistoricalData(symbol, true);
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    return (
        <HistoricalDataContext.Provider
            value={{
                historicalData,
                loading,
                filter,
                setFilter,
                error,
                fetchHistoricalData,
                backgroundRefreshing, // Expose background refreshing state
            }}
        >
            {children}
        </HistoricalDataContext.Provider>
    );
};

export const useHistoricalData = () => useContext(HistoricalDataContext);
