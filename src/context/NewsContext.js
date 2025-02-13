import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSymbol } from './SymbolContext'; // Import the global SymbolContext

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
    const { symbol } = useSymbol(); // Access the global symbol
    const [news, setNews] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false);

    const fetchNews = async (currentSymbol = symbol, isBackground = false) => {
        try {
            if (!isBackground) {
                setLoading(true);
            } else {
                setBackgroundRefreshing(true);
            }

            const response = await axios.get(
                `https://api.polygon.io/v2/reference/news?ticker=${currentSymbol}&limit=1000&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`
            );

            if (response.status === 200 && Array.isArray(response.data.results)) {
                const formattedNews = response.data.results.map(article => ({
                    publisher_name: article.publisher?.name || 'N/A',
                    publisher_homepage: article.publisher?.homepage_url || 'N/A',
                    publisher_logo: article.publisher?.logo_url || 'N/A',
                    title: article.title || 'N/A',
                    author: article.author || 'N/A',
                    published_utc: article.published_utc || 'N/A',
                    article_url: article.article_url || 'N/A',
                    image_url: article.image_url || 'N/A',
                    description: article.description || 'N/A'
                }));

                setNews(formattedNews);
                setError(false);
            } else {
                setNews([]);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            setError(true);
            setNews(null);
        } finally {
            if (!isBackground) {
                setLoading(false);
            } else {
                setBackgroundRefreshing(false);
            }
        }
    };

    useEffect(() => {
        if (symbol && !news) {
            fetchNews(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [news]);

    useEffect(() => {
        if (symbol) {
            setNews(null);
            fetchNews(symbol);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) {
                fetchNews(symbol, true);
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    return (
        <NewsContext.Provider value={{ news, loading, error, fetchNews, backgroundRefreshing }}>
            {children}
        </NewsContext.Provider>
    );
};

export const useNews = () => useContext(NewsContext);
