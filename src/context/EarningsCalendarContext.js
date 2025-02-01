import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSymbol } from './SymbolContext'; // Import the global SymbolContext

const EarningsCalendarContext = createContext();

export const EarningsCalendarProvider = ({ children }) => {
    const { symbol } = useSymbol(); // Access the global symbol
    const [horizon, setHorizon] = useState('12month');
    const [earnings, setEarnings] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false); // New state for background refreshing

    const fetchEarningsCalendar = async (currentSymbol = symbol, currentHorizon = horizon, isBackground = false) => {
        try {
            if (!isBackground) {
                setLoading(true); // Only set loading true for non-background fetches
            } else {
                setBackgroundRefreshing(true); // Indicate background refresh
            }

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END}/earnings-calendar?symbol=${currentSymbol}&horizon=${currentHorizon}`
            );

            if (response.status === 200 && Array.isArray(response.data) && response.data.length > 0) {
                setEarnings(response.data);
                setError(false);
            } else {
                setEarnings(response.data);
            }
        } catch (error) {
            console.error('Error fetching earnings calendar:', error);
            setError(true);
            setEarnings(null);
        } finally {
            if (!isBackground) {
                setLoading(false); // End loading for non-background fetches
            } else {
                setBackgroundRefreshing(false); // End background refreshing
            }
        }
    };

    useEffect(() => {
        if (symbol && (!earnings)) {
            fetchEarningsCalendar(symbol, horizon);
        }
    }, [earnings]);

    // Trigger initial fetch on symbol or horizon change
    useEffect(() => {
        if (symbol) {
            setEarnings(null);
            fetchEarningsCalendar(symbol);
        }
    }, [symbol]);

    // Trigger initial fetch on symbol or horizon change
    useEffect(() => {
        if (symbol) {
            fetchEarningsCalendar(symbol, horizon);
        }
    }, [horizon]);

    // Background fetch every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchEarningsCalendar(symbol, horizon, true); // Pass true for background fetch
            }
        }, 10000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [symbol, horizon]);

    return (
        <EarningsCalendarContext.Provider
            value={{
                earnings,
                loading,
                error,
                horizon,
                setHorizon,
                setEarnings,
                fetchEarningsCalendar,
                backgroundRefreshing, // Expose background refreshing state if needed
            }}
        >
            {children}
        </EarningsCalendarContext.Provider>
    );
};

export const useEarningsCalendar = () => useContext(EarningsCalendarContext);