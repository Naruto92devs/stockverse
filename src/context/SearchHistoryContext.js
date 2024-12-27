'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const SearchHistoryContext = createContext();

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export const SearchHistoryProvider = ({ children }) => {
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const token = Cookies.get('authToken');

    const fetchSearchHistory = async () => {
        const token = Cookies.get('authToken');
        if (!token) {
            setLoading(false);
            return console.log('No token available');
        }

        try {
            const response = await axios.get(`${STOCKVERSE_BACK_END}/get-user-history`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (response.status === 200) {
                localStorage.setItem('SearchHistory', JSON.stringify(response.data));
                setHistory(response.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedSearchHistory = localStorage.getItem('SearchHistory');
        if (savedSearchHistory && token) {
            setHistory(JSON.parse(savedSearchHistory));
            setLoading(false);
        } else if (token) {
            fetchSearchHistory();
        } else {
            setHistory(null);
            localStorage.removeItem('SearchHistory');
            setLoading(false);
        }
    }, [token]);

    return (
        <SearchHistoryContext.Provider value={{ history: history, loading, fetchSearchHistory: fetchSearchHistory, setHistory: setHistory }}>
            {children}
        </SearchHistoryContext.Provider>
    );
};

export const useSearchHistory = () => useContext(SearchHistoryContext);