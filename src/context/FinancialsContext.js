import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSymbol } from './SymbolContext'; // Import the global SymbolContext

const FinancialsContext = createContext();

export const FinancialsProvider = ({ children }) => {
    const { symbol } = useSymbol(); // Access the global symbol
    const [timeframe, setTimeframe] = useState('annual');
    const [financials, setFinancials] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false);

    const fetchFinancials = async (currentSymbol = symbol, currentTimeframe = timeframe, isBackground = false) => {
        if (!currentSymbol) return;

        try {
            if (!isBackground) {
                setLoading(true);
            } else {
                setBackgroundRefreshing(true);
            }

            const response = await axios.get(
                `https://api.polygon.io/vX/reference/financials?ticker=${currentSymbol}&timeframe=${currentTimeframe}&order=desc&limit=100&sort=filing_date&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`
            );

            if (response.status === 200 && response.data && Array.isArray(response.data.results) && response.data.results.length > 0) {
                setFinancials(response.data.results);
                console.log('Updated Financials:', response.data.results);
                setError(false);
            } else {
                setFinancials(null);
            }
        } catch (err) {
            console.error('Error fetching financials:', err);
            setError(true);
            setFinancials(null);
        } finally {
            if (!isBackground) {
                setLoading(false);
            } else {
                setBackgroundRefreshing(false);
            }
        }
    };

    // Initial + param change fetch
    useEffect(() => {
        if (symbol) {
            fetchFinancials(symbol, timeframe);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol, timeframe]);

    // Background refresh every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchFinancials(symbol, timeframe, true);
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol, timeframe]);

    return (
        <FinancialsContext.Provider
            value={{
                financials,
                timeframe,
                loading,
                error,
                setTimeframe,
                fetchFinancials,
                backgroundRefreshing,
            }}
        >
            {children}
        </FinancialsContext.Provider>
    );
};

export const useFinancials = () => useContext(FinancialsContext);