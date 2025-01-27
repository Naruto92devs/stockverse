'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const WatchlistContext = createContext();

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const token = Cookies.get('authToken');

    const fetchWatchlist = async () => {
        const token = Cookies.get('authToken');
        if (!token) {
            setLoading(false);
            return console.log('No token available');
        }

        try {
            const response = await axios.get(`${STOCKVERSE_BACK_END}/get-watchlist`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (response.status === 200) {
                localStorage.setItem('Watchlist', JSON.stringify(response.data));
                setWatchlist(response.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedWatchlist = localStorage.getItem('Watchlist');
        if (savedWatchlist && token) {
            setWatchlist(JSON.parse(savedWatchlist));
            setLoading(false);
        } else if (token) {
            fetchWatchlist();
        } else {
            setWatchlist(null);
            localStorage.removeItem('Watchlist');
            setLoading(false);
        }
    }, [token]);

    return (
        <WatchlistContext.Provider value={{ watchlist: watchlist, loading, fetchWatchlist: fetchWatchlist, setWatchlist: setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => useContext(WatchlistContext);