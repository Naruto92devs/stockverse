import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSymbol } from './SymbolContext'; // Import the global SymbolContext

const EarningsCalendarContext = createContext();

export const EarningsCalendarProvider = ({ children, horizon = '12month' }) => {
    const { symbol } = useSymbol(); // Access the global symbol
    const [earnings, setEarnings] = useState(null);
    console.log(earnings);

    const fetchEarningsCalendar = async (currentSymbol, currentHorizon = '12month') => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END}/earnings-calendar?symbol=${currentSymbol}&horizon=${currentHorizon}`
            );
            if (response.status === 200) {
                setEarnings(response.data);
            }
        } catch (error) {
            console.error('Error fetching earnings calendar:', error);
        }
    };

    useEffect(() => {
        if (symbol) {
            fetchEarningsCalendar(symbol, horizon);
        }
    }, [symbol, horizon]);

    return (
        <EarningsCalendarContext.Provider value={{ earnings, fetchEarningsCalendar }}>
            {children}
        </EarningsCalendarContext.Provider>
    );
};

export const useEarningsCalendar = () => useContext(EarningsCalendarContext);