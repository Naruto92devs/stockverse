import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSymbol } from './SymbolContext'; // Import the global SymbolContext

const EarningsCalendarContext = createContext();

export const EarningsCalendarProvider = ({children}) => {
    const { symbol } = useSymbol(); // Access the global symbol
    const [horizon, setHorizon] = useState('12month');
    const [earnings, setEarnings] = useState(null);

    const fetchEarningsCalendar = async (currentSymbol = symbol, currentHorizon = horizon) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END}/earnings-calendar?symbol=${currentSymbol}&horizon=${currentHorizon}`
            );
            if (response.status === 200) {
                setEarnings(response.data);
                console.log(earnings);
            }
        } catch (error) {
            console.error('Error fetching earnings calendar:', error);
        }
    };

    useEffect(() => {
        if (symbol && (!earnings)) {
            fetchEarningsCalendar(symbol, horizon);
        }
    }, [earnings]);

    useEffect(() => {
        if (symbol) {
            fetchEarningsCalendar(symbol, horizon);
        }
    }, [symbol, horizon]);

    return (
        <EarningsCalendarContext.Provider value={{ earnings, setHorizon, setEarnings, fetchEarningsCalendar }}>
            {children}
        </EarningsCalendarContext.Provider>
    );
};

export const useEarningsCalendar = () => useContext(EarningsCalendarContext);