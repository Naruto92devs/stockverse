import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import formatNumber from '@/components/FormatNumber';

const GainersLosersContext = createContext();

export const GainersLosersProvider = ({ children }) => {
    const [gainers, setGainers] = useState(null);
    const [losers, setLosers] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false);

    const apiKey = "9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy";

    // Fetch gainers and losers
    const fetchGainersLosers = async (isBackground = false) => {
        try {
            if (!isBackground) setLoading(true);
            else setBackgroundRefreshing(true);

            const gainersResponse = await axios.get(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=${apiKey}`);
            const losersResponse = await axios.get(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/losers?apiKey=${apiKey}`);

            // Extract relevant data
            const extractData = async (data) => {
                if (!data?.tickers) return [];

                const extracted = data.tickers.map((tickerData) => ({
                    ticker: tickerData.ticker,
                    todaysChangePerc: tickerData.todaysChangePerc,
                    todaysChange: tickerData.todaysChange,
                    price: tickerData.prevDay?.c || 0, // Extract volume
                    volume: formatNumber(tickerData.prevDay?.v) || 0, // Extract volume
                }));

                // Fetch company details for each ticker
                const withCompanyDetails = await Promise.all(
                    extracted.map(async (item) => {
                        try {
                            const companyResponse = await axios.get(`https://api.polygon.io/v3/reference/tickers/${item.ticker}?apiKey=${apiKey}`);
                            const companyData = companyResponse.data.results || {};
                            
                            return {
                                ...item,
                                name: companyData.name || "Unknown",
                                marketCap: companyData.market_cap ? formatNumber(companyData.market_cap) : null,
                                // iconUrl: companyData.branding?.icon_url || null,
                            };
                        } catch (error) {
                            console.error(`Error fetching details for ${item.ticker}:`, error);
                            return item; // Return without company details if API fails
                        }
                    })
                );

                return withCompanyDetails;
            };

            const gainersData = await extractData(gainersResponse.data);
            const losersData = await extractData(losersResponse.data);

            setGainers(gainersData);
            setLosers(losersData);
            setError(false);
        } catch (error) {
            console.error("Error fetching gainers & losers:", error);
            setError(true);
            setGainers(null);
            setLosers(null);
        } finally {
            if (!isBackground) setLoading(false);
            else setBackgroundRefreshing(false);
        }
    };

    useEffect(() => {
        fetchGainersLosers();

        // Refresh every 5 minutes
        const interval = setInterval(() => fetchGainersLosers(true), 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <GainersLosersContext.Provider
            value={{
                gainers,
                losers,
                loading,
                error,
                backgroundRefreshing,
                fetchGainersLosers,
            }}
        >
            {children}
        </GainersLosersContext.Provider>
    );
};

export const useGainersLosers = () => useContext(GainersLosersContext);