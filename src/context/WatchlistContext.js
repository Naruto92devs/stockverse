'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import formatNumber from '@/components/FormatNumber';

// Context for managing the watchlist
const WatchlistContext = createContext();
const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;
const POLYGON_API_KEY = "9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy";

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(null); // Stores the watchlist data
    const [loading, setLoading] = useState(true); // Indicates loading state
    // const [tickers, setTickers] = useState([]);
    const [error, setError] = useState(false); // Indicates if there was an error

    const token = Cookies.get('authToken'); // Retrieve auth token from cookies

    // Fetch the user's watchlist from the backend
    const fetchWatchlist = async () => {
        if (!token) {
            setLoading(false);
            console.log('No token available');
            return;
        }

        try {
            const response = await axios.get(`${STOCKVERSE_BACK_END}/get-watchlist`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (response.status === 200) {
                // Extract tickers and ensure they are capitalized
                const tickers = response.data
                .map(item => item.symbol.toUpperCase())
                .sort((a, b) => a.localeCompare(b));

                // Save to local storage for persistence
                localStorage.setItem('Watchlist', JSON.stringify(response.data));

                // Fetch detailed data for the tickers
                // setTickers(tickers);
                await fetchWatchlistData(tickers);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("Watchlist not found, removing from localStorage...");
                localStorage.removeItem('Watchlist');
                setWatchlist(null);
            } else {
                console.error('Error fetching user watchlist:', error);
                setError(true);
            }
        } finally {
            setLoading(false);
        }
    };

    // Fetch detailed data for each ticker in the watchlist
    const fetchWatchlistData = async (tickers) => {
        if (!tickers || tickers.length === 0) return; // Return if no tickers

        try {
            // Construct API requests for ticker snapshots and company details
            const tickersStr = tickers.join(',');
            const [tickerResponse, companyResponses] = await Promise.all([
                axios.get(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${tickersStr}&apiKey=${POLYGON_API_KEY}`),
                Promise.all(tickers.map(ticker => axios.get(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${POLYGON_API_KEY}`)))
            ]);

            // Extract data from API responses
            const tickerData = tickerResponse.data?.tickers || [];
            const companyData = companyResponses.map(res => res.data?.results || {});

            // Combine ticker and company data into a unified format
            const watchlistData = tickers.map((ticker, index) => {
                const tickerInfo = tickerData.find(t => t.ticker === ticker) || {}; // Find ticker data
                const companyInfo = companyData[index] || {}; // Corresponding company info

                return {
                    ticker: ticker, // Ticker symbol
                    name: companyInfo.name || "Unknown", // Company name
                    industry: companyInfo.sic_description || "Unknown", // Company name
                    marketCap: companyInfo.market_cap ? formatNumber(companyInfo.market_cap) : null, // Market capitalization
                    price: tickerInfo.day?.c !== undefined ? Number(tickerInfo.day.c.toFixed(2)) : watchlist?.find(w => w.ticker === ticker)?.price || 0,
                    todaysChangePerc: tickerInfo.todaysChangePerc !== undefined ? tickerInfo.todaysChangePerc : watchlist?.find(w => w.ticker === ticker)?.todaysChangePerc || 0,
                    volume: formatNumber(tickerInfo.day?.v) || 0, // Volume
                    todaysChange: tickerInfo.todaysChange || 0, // Absolute change today
                    logoUrl: companyInfo.branding?.logo_url || null, // Logo URL
                    iconUrl: companyInfo.branding?.icon_url || null, // Icon URL
                };
            });

            // ✅ Only update the state if data has changed
            if (JSON.stringify(watchlist) !== JSON.stringify(watchlistData)) {
                setWatchlist(watchlistData);
                console.log('Updated Watchlist:', watchlistData);
            } else {
                console.log('No changes in watchlist, skipping update.');
            }
            setLoading(false);
            // Run fetchWatchlistData again after completion with updated tickers
            // setTimeout(() => fetchWatchlistData(tickers), 10000); // 10-second delay
        } catch (error) {
            console.error('Error fetching watchlist data:', error);
            setError(true);
        }
    };

    // Effect to initialize the watchlist on component mount
    useEffect(() => {
        const savedWatchlist = localStorage.getItem('Watchlist');
        if (savedWatchlist && token) {
            // Load from local storage and fetch detailed data
            const tickers = JSON.parse(savedWatchlist)
            .map(item => item.symbol.toUpperCase())
            .sort((a, b) => a.localeCompare(b));
            
            fetchWatchlistData(tickers);
        } else if (token) {
            // Fetch from backend if no local storage data
            fetchWatchlist();
        } else {
            // Clear watchlist if no token
            setWatchlist(null);
            localStorage.removeItem('Watchlist');
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (watchlist) {
                fetchWatchlist();
            }
        }, 10 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchlist]);

    return (
        <WatchlistContext.Provider value={{ watchlist, loading, error, fetchWatchlist, setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

// Hook to use the watchlist context
export const useWatchlist = () => useContext(WatchlistContext);