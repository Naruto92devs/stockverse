import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSymbol } from './SymbolContext'; // Import the global SymbolContext

const InsiderTransactionsContext = createContext();

export const InsiderTransactionsProvider = ({ children }) => {
    const { symbol } = useSymbol(); // Access the global symbol
    const [transactions, setTransactions] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false); // Background refresh state

    const fetchInsiderTransactions = async (currentSymbol = symbol, isBackground = false) => {
        try {
            if (!isBackground) {
                setLoading(true); // Only set loading for primary fetch
            } else {
                setBackgroundRefreshing(true); // Indicate background refresh
            }

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END}/insider_transactions?symbol=${currentSymbol}`
            );

            if (response.status === 200 && Array.isArray(response.data.data) && response.data.data.length > 0) {
              setTransactions(response.data.data); // Corrected: Setting the actual array
              setError(false);
          } else {
              setTransactions([]); // If no data, set an empty array
          }         
        } catch (error) {
            console.error('Error fetching insider transactions:', error);
            setError(true);
            setTransactions(null);
        } finally {
            if (!isBackground) {
                setLoading(false);
            } else {
                setBackgroundRefreshing(false);
            }
        }
    };

    useEffect(() => {
        if (symbol && !transactions) {
            fetchInsiderTransactions(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions]);

    useEffect(() => {
        if (symbol) {
            setTransactions(null);
            fetchInsiderTransactions(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    // Background fetch every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchInsiderTransactions(symbol, true); // Pass true for background fetch
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);


    return (
        <InsiderTransactionsContext.Provider
            value={{
                transactions,
                loading,
                error,
                fetchInsiderTransactions,
                backgroundRefreshing, // Expose background refreshing state
            }}
        >
            {children}
        </InsiderTransactionsContext.Provider>
    );
};

export const useInsiderTransactions = () => useContext(InsiderTransactionsContext);