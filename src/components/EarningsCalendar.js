'use client';
import React from 'react';
import { useEarningsCalendar } from '@/context/EarningsCalendarContext';

const Earnings_Calendar = () => {
    const { earnings, setHorizon, setEarnings, fetchEarningsCalendar } = useEarningsCalendar(); // Access earnings directly

    if (!earnings || !Array.isArray(earnings)) {
        return <div>Loading...</div>; // Handle loading or invalid data state
    }

    const changeHorizon = (horizon) => {
        setHorizon(horizon);
    };

    const resetEarnings = () => {
        setEarnings(null); // Clear earnings
    };

    return (
        <div>
            {earnings.length === 0 && (
                <div>
                    NO Data Available...
                </div>
            )}
            {earnings.map((stock, index) => (
                <div key={`${stock.symbol}-${index}`}>
                    <div>
                        <span>{stock.symbol || 'N/A'}</span>
                        <span>
                            ({stock.name.length > 8 ? stock.name.substring(0, 30) + '...' : stock.name || 'N/A'})
                        </span>
                        <span>{stock.estimate ? `$${stock.estimate}` : 'N/A'}</span>
                        <span>{stock.reportDate || 'N/A'}</span>
                        <span>{stock.fiscalDateEnding || 'N/A'}</span>
                        <span>{stock.currency || 'N/A'}</span>
                    </div>
                </div>
            ))}
            <div onClick={() => resetEarnings()}>
                Set Earnigs
            </div>
            <div onClick={() => fetchEarningsCalendar()}>
                Refetch
            </div>
        </div>
    );
};

export default Earnings_Calendar;
