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
    
            // API URLs
            const snapshotUrl = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${currentSymbol}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;
            const referenceUrl = `https://api.polygon.io/v3/reference/tickers/${currentSymbol}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;
    
            let snapshotData = null;
            let referenceData = null;
    
            // Fetch data with independent error handling
            try {
                const snapshotResponse = await axios.get(snapshotUrl);
                if (snapshotResponse.status === 200) {
                    snapshotData = snapshotResponse.data.ticker;
                }
            } catch (error) {
                console.warn("Snapshot API error:", error.message);
            }
    
            try {
                const referenceResponse = await axios.get(referenceUrl);
                if (referenceResponse.status === 200) {
                    referenceData = referenceResponse.data.results;
                }
            } catch (error) {
                console.warn("Reference API error:", error.message);
            }
    
            // If both APIs fail, show error
            if (!snapshotData && !referenceData) {
                setError(true);
                setTickerDetails(null);
                return;
            }
    
            // Extract data safely
            const extractedData = {
                ticker: snapshotData?.ticker || referenceData?.ticker || currentSymbol,
                todaysChangePerc: snapshotData?.todaysChangePerc ? snapshotData.todaysChangePerc >= 0 ? `+${snapshotData.todaysChangePerc.toFixed(2)}%` : `-${snapshotData.todaysChangePerc.toFixed(2)}%` : 'N/A',
                todaysChange: snapshotData?.todaysChange ? snapshotData?.todaysChange.toFixed(2) : 'N/A',
                closePrice: snapshotData?.prevDay?.c ? `$${snapshotData?.prevDay.c}` : 'N/A',
                volume: snapshotData?.prevDay?.v ? `$${formatNumber(snapshotData?.prevDay.v)}` : "N/A",
                name: referenceData?.name || 'Undefined',
                type: referenceData?.type ? getTypeDescription(referenceData?.type) : 'Undefined',
                market_cap: referenceData?.market_cap ? `$${formatNumber(referenceData?.market_cap)}` : 'N/A',
                description: referenceData?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                exchange: referenceData?.primary_exchange || 'Unknown',
                sic_description: referenceData?.sic_description || 'N/A',
            };
    
            setTickerDetails(extractedData);
            setError(false);
        } catch (error) {
            console.error("Unexpected error:", error);
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