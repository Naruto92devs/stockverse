import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const IPOsContext = createContext();

export const IPOsProvider = ({ children }) => {
    const [ipos, setIpos] = useState(null);
    const [status, setStatus] = useState('new');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false);

    const fetchIPOs = async (currentStatus = status, isBackground = false) => {
        try {
            if (!isBackground) {
                setLoading(true);
            } else {
                setBackgroundRefreshing(true);
            }

            const response = await axios.get(
                `https://api.polygon.io/vX/reference/ipos?ipo_status=${currentStatus}&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`
            );

            if (response.status === 200 && response.data && Array.isArray(response.data.results)) {
                setIpos(response.data.results);
                setError(false);
            } else {
                setIpos([]);
            }
        } catch (error) {
            console.error('Error fetching IPO data:', error);
            setError(true);
            setIpos(null);
        } finally {
            if (!isBackground) {
                setLoading(false);
            } else {
                setBackgroundRefreshing(false);
            }
        }
    };

    useEffect(() => {
        if (status) {
            fetchIPOs(status);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    // Background fetch every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (status) {
                fetchIPOs(status, true);
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <IPOsContext.Provider value={{ ipos, status, loading, error, setStatus, fetchIPOs, backgroundRefreshing }}>
            {children}
        </IPOsContext.Provider>
    );
};

export const useIPOs = () => useContext(IPOsContext);