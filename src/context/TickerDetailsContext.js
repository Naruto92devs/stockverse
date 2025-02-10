"use client"; // Required for Next.js App Router

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSymbol } from "./SymbolContext"; // Import global symbol context
import formatNumber from "@/components/FormatNumber";

const TickerDetailsContext = createContext();

export const TickerDetailsProvider = ({ children }) => {
    const { symbol } = useSymbol(); // Get current symbol from global context
    const [tickerDetails, setTickerDetails] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [backgroundRefreshing, setBackgroundRefreshing] = useState(false);

    const typeDescriptions = {
        CS: "Common Stock",
        PFD: "Preferred Stock",
        WARRANT: "Warrant",
        RIGHT: "Rights",
        BOND: "Corporate Bond",
        ETF: "Exchange Traded Fund",
        ETN: "Exchange Traded Note",
        ETV: "Exchange Traded Vehicle",
        SP: "Structured Product",
        ADRC: "American Depository Receipt Common",
        ADRP: "American Depository Receipt Preferred",
        ADRW: "American Depository Receipt Warrants",
        ADRR: "American Depository Receipt Rights",
        FUND: "Fund",
        BASKET: "Basket",
        UNIT: "Unit",
        LT: "Liquidating Trust",
        OS: "Ordinary Shares",
        GDR: "Global Depository Receipts",
        OTHER: "Other Security Type",
        NYRS: "New York Registry Shares",
        AGEN: "Agency Bond",
        EQLK: "Equity Linked Bond",
        ETS: "Single-security ETF"
    };

    const getTypeDescription = (typeCode) => typeDescriptions[typeCode] || "Unknown Type";

    // Fetch ticker details
    const fetchTickerDetails = async (currentSymbol = symbol, isBackground = false) => {
        try {
            if (!isBackground) setLoading(true);
            else setBackgroundRefreshing(true);

            // Fetch snapshot data (price, volume, change)
            const snapshotUrl = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${currentSymbol}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;

            // Fetch reference data (company info)
            const referenceUrl = `https://api.polygon.io/v3/reference/tickers/${currentSymbol}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;

            const [snapshotResponse, referenceResponse] = await Promise.all([
                axios.get(snapshotUrl),
                axios.get(referenceUrl)
            ]);

            if (snapshotResponse.status === 200 && referenceResponse.status === 200) {
                const snapshotData = snapshotResponse.data.ticker;
                const referenceData = referenceResponse.data.results;

                const extractedData = {
                    ticker: snapshotData.ticker,
                    todaysChangePerc: snapshotData.todaysChangePerc,
                    todaysChange: snapshotData.todaysChange,
                    closePrice: snapshotData.day?.c,
                    volume: formatNumber(snapshotData.day?.v),
                    name: referenceData.name,
                    type: getTypeDescription(referenceData.type),
                    market_cap: formatNumber(referenceData.market_cap),
                    description: referenceData.description,
                    exchange: referenceData.primary_exchange,
                    sic_description: referenceData.sic_description,
                    icon_url: referenceData.branding?.icon_url,
                    share_class_shares_outstanding: referenceData.share_class_shares_outstanding
                };

                setTickerDetails(extractedData);
                setError(false);
            } else {
                setTickerDetails(null);
                setError(true);
            }
        } catch (error) {
            console.error("Error fetching ticker details:", error);
            setError(true);
            setTickerDetails(null);
        } finally {
            if (!isBackground) setLoading(false);
            else setBackgroundRefreshing(false);
        }
    };

    useEffect(() => {
        if (symbol) fetchTickerDetails(symbol);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    // Background refresh every 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            if (symbol) fetchTickerDetails(symbol, true);
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol]);

    return (
        <TickerDetailsContext.Provider value={{ tickerDetails, loading, error, backgroundRefreshing }}>
            {children}
        </TickerDetailsContext.Provider>
    );
};

export const useTickerDetails = () => useContext(TickerDetailsContext);