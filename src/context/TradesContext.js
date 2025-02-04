import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSymbol } from './SymbolContext'; // Access the global symbol context

const TradesContext = createContext();

export const TradesProvider = ({ children }) => {
    const { symbol } = useSymbol(); // Get the current stock symbol
    const [trades, setTrades] = useState(null);
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false); // Track background fetch state
    const [selectedDate, setSelectedDate] = useState(getLatestTradingDay()); // Optional: Allow filtering by date

    // Function to get the latest trading day (skip weekends)
    function getLatestTradingDay() {
      const today = new Date();
      let day = today.getDay(); // 0 = Sunday, 6 = Saturday

      if (day === 6) {
          today.setDate(today.getDate() - 1); // Move to Friday
      } else if (day === 0) {
          today.setDate(today.getDate() - 2); // Move to Friday
      }

      return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }
    
    // Function to sanitize the stock symbol
    const sanitizeSymbol = (inputSymbol) => {
        return inputSymbol?.trim().toUpperCase();
    };

    // Function to fetch trade data
    const fetchTrades = async (currentSymbol = symbol, isBackground = false) => {
        if (!currentSymbol) return;

        try {
            if (!isBackground) {
                setLoading(true);
            } else {
                setBackgroundRefreshing(true);
            }

            const sanitizedSymbol = sanitizeSymbol(currentSymbol);
            let apiUrl = `https://api.polygon.io/v3/trades/${sanitizedSymbol}?limit=1000&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`;

            // Append timestamp if a date is selected
            if (selectedDate) {
                apiUrl += `&timestamp=${selectedDate}`;
            }

            const { data: tradeResponse } = await axios.get(apiUrl);
            setTrades(tradeResponse.results || []); // Ensure trades is an array

            // Fetch latest quote data
            const quoteUrl = `https://api.polygon.io/v2/last/nbbo/${sanitizedSymbol}?apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`;
            const { data: quoteResponse } = await axios.get(quoteUrl);
            setQuote(quoteResponse.results || null);
            setError(null);
        } catch (err) {
            console.error("Error fetching trade/quote data:", err);
            setError('Error loading data. Please try again later.');
        } finally {
            if (!isBackground) {
                setLoading(false);
            } else {
                setBackgroundRefreshing(false);
            }
        }
    };

    // Initial fetch when the symbol changes
    useEffect(() => {
        if (symbol) {
            setTrades(null);
            fetchTrades(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    // Initial fetch when the symbol changes
    useEffect(() => {
        if (symbol) {
            fetchTrades(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    // Background fetch every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchTrades(symbol, true);
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);


    useEffect(() => {
      console.log("Updated quote:", quote);
  }, [quote]);
    return (
        <TradesContext.Provider
            value={{
                trades,
                quote,
                loading,
                error,
                fetchTrades,
                backgroundRefreshing,
                selectedDate,
                setSelectedDate,
            }}
        >
            {children}
        </TradesContext.Provider>
    );
};

export const useTrades = () => useContext(TradesContext);