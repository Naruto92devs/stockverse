import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSymbol } from "./SymbolContext"; // Access the global symbol context

const ChartDataContext = createContext();

export const ChartDataProvider = ({ children }) => {
    const { symbol } = useSymbol(); // Get the current stock symbol
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false); // Track background fetch state
    const [timeframe, setTimeframe] = useState('5Y'); // Default timeframe

    // Function to get US Eastern Time
    const getUSEasternTime = () => {
        const now = new Date();
        const utcOffset = now.getTimezoneOffset(); // Get local offset in minutes
        const estOffset = 300; // EST is UTC-5 (300 minutes)
        const edtOffset = 240; // EDT is UTC-4 (240 minutes)

        // Determine if daylight saving time is active
        const isDST = (new Date(now.getFullYear(), 2, 14).getTimezoneOffset() < utcOffset);
        const offset = isDST ? edtOffset : estOffset;

        return new Date(now.getTime() + (utcOffset - offset) * 60000);
    };

    // Function to determine the date range and granularity in US Eastern Time
    const getDateRange = (timeframe) => {
        let end_date = getUSEasternTime();
        let start_date = new Date(end_date);
        let range = "day"; // Default to daily data

        // Adjust end_date if it's Saturday (6) or Sunday (0)
        if (end_date.getUTCDay() === 6) {
            end_date.setUTCDate(end_date.getUTCDate() - 1); // Move to Friday
        } else if (end_date.getUTCDay() === 0) {
            end_date.setUTCDate(end_date.getUTCDate() - 2); // Move to Friday
        }

        // Adjust start_date based on timeframe
        if (timeframe === "1D") {
            start_date.setUTCDate(end_date.getUTCDate() - 1);
            range = "minute"; // Use minute-level data for 1D
        } else if (timeframe === "5D") {
            start_date.setUTCDate(end_date.getUTCDate() - 5);
            range = "minute"; // Use hourly data for 5D
        } else if (timeframe === "1M") {
            start_date.setUTCMonth(end_date.getUTCMonth() - 1);
            range = "hour"; // Use hourly data for 1M
        } else if (timeframe === "6M") {
            start_date.setUTCMonth(end_date.getUTCMonth() - 6);
            range = "day"; // Use daily data for 6M
        } else if (timeframe === "1Y") {
            start_date.setUTCFullYear(end_date.getUTCFullYear() - 1);
            range = "day"; // Use daily data for 1Y
        } else if (timeframe === "5Y") {
            start_date.setUTCFullYear(end_date.getUTCFullYear() - 5);
            range = "day"; // Use daily data for 5Y
        } else {
            start_date = new Date(Date.UTC(2000, 0, 1)); // Jan 1, 2000 in UTC
            range = "month"; // Use monthly data for ALL
        }

        // If start_date falls on a weekend, adjust it to the last Friday
        if (start_date.getUTCDay() === 6) {
            start_date.setUTCDate(start_date.getUTCDate() - 1); // Move to Friday
        } else if (start_date.getUTCDay() === 0) {
            start_date.setUTCDate(start_date.getUTCDate() - 2); // Move to Friday
        }

        // If today is Monday, start_date should be last Friday
        if (end_date.getUTCDay() === 1) {
            start_date.setUTCDate(start_date.getUTCDate() - 3); // Move to Friday
        }

        return {
            start_date: start_date.toISOString().split("T")[0],
            end_date: end_date.toISOString().split("T")[0],
            range,
        };
    };

    // Function to fetch chart data
    const fetchChartData = async (currentSymbol = symbol, selectedTimeframe = timeframe, isBackground = false) => {
        if (!currentSymbol) return;

        try {
            if (!isBackground) {
                setLoading(true);
            } else {
                setBackgroundRefreshing(true);
            }

            const { start_date, end_date, range } = getDateRange(selectedTimeframe);

            const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${currentSymbol}/range/1/${range}/${start_date}/${end_date}?sort=asc&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`;

            const response = await axios.get(apiUrl);
            setChartData(response.data.results || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching chart data:", err);
            setError("Error loading chart data. Please try again later.");
        } finally {
            if (!isBackground) {
                setLoading(false);
            } else {
                setBackgroundRefreshing(false);
            }
        }
    };

    // Fetch chart data when the symbol or timeframe changes
    useEffect(() => {
        if (symbol) {
            fetchChartData(symbol, timeframe);
        }
    }, [symbol, timeframe]);

    // Background fetch every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchChartData(symbol, timeframe, true);
            }
        }, 60 * 1000); // Refresh every minute

        return () => clearInterval(interval);
    }, [symbol, timeframe]);

    return (
        <ChartDataContext.Provider
            value={{
                chartData,
                loading,
                error,
                fetchChartData,
                timeframe,
                setTimeframe,
                backgroundRefreshing, // Expose background refreshing state
            }}
        >
            {children}
        </ChartDataContext.Provider>
    );
};

export const useChartData = () => useContext(ChartDataContext);