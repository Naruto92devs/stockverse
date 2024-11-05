'use client';
import React, { useEffect, useState, useRef } from 'react';
import GainerFallbackUI from './GainerFallbackUI';
import formatNumber from './FormatNumber';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

const Historical_Summary = ({ symbol }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const scrollRef = useRef();

    // Extract specific data points
    const extractSummaryData = (dataArray) => {
        const summaryData = {};
        // Define the intervals you want to extract
        const intervals = [
            { label: '1 Week', index: 0 },
            { label: '1 Month', index: 4 },
            { label: '3 Months', index: 12 },
            { label: '6 Months', index: 24 },
            { label: '1 Year', index: 52 },
            { label: '3 Years', index: 156 },
            { label: '5 Years', index: 260 },
        ];

        // Extract available data for each interval
        intervals.forEach(({ label, index }) => {
            if (dataArray[index]) { // Check if the data exists
                summaryData[label] = dataArray[index];
            }
        });

        return summaryData;
    };

    // API REQUEST AND DATA PROCESSING
    useEffect(() => {
        const fetchHistoricalData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${STOCKVERSE_BACK_END}/historical-data?filter=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch historical data');
                }

                const responseData = await response.json();
                const timeSeriesKey = 'Weekly Adjusted Time Series';

                const timeSeriesData = responseData[timeSeriesKey];
                const historicalDataArray = Object.entries(timeSeriesData).map(([dateTime, data]) => {
                    const open = parseFloat(data['1. open']);
                    const close = parseFloat(data['4. close']) ? parseFloat(data['4. close']) : 'N/A';
                    const change = (close - open).toFixed(2);
                    const changePercentage = (((close - open) / open) * 100).toFixed(2);
                    const volume = formatNumber(Number(data['6. volume'])) ? formatNumber(Number(data['6. volume'])) : 'N/A';

                    return {
                        dateTime,
                        open: open.toFixed(2),
                        high: parseFloat(data['2. high']).toFixed(2),
                        low: parseFloat(data['3. low']).toFixed(2),
                        close: close.toFixed(2),
                        volume: volume,
                        change: change,
                        changePercentage: changePercentage,
                    };
                });

                // Extract summary data based on intervals
                const summaryData = extractSummaryData(historicalDataArray);

                setHistoricalData(summaryData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching historical data:", error);
                setError('Error loading historical data. Please try again later.');
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, [symbol]);

    // Prevent rendering until data is loaded
    if (error) return <div>{error}</div>;

    return (
        <div ref={scrollRef} className="flex flex-col gap-y-4 items-start cursor-pointer select-none overflow-x-auto">
            {/* Summary Table */}
            <h1 className="text-primaryText font-sansMedium text-xl max-lg:pl-2">{symbol} Historical Summary</h1>
            <div className="flex max-w-full w-max max-h-[550px] overflow-y-auto">

                {/* Period Column */}
                <div className="min-w-max w-[8rem] sticky top-0 left-0 z-[2] h-max bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                    <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                        Period
                    </div>
                    {loading ? (
                        <GainerFallbackUI />
                    ) : (
                        Object.keys(historicalData).map((interval, index) => (
                            <div key={index} className="w-full cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                <ul className="w-full">
                                    <li className="text-xs w-full text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">
                                        {interval}
                                    </li>
                                </ul>
                            </div>
                        ))
                    )}
                </div>

                {/* Close Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    <div className="sticky top-0 pl-2 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Close
                    </div>
                    {loading ? (
                        <GainerFallbackUI />
                    ) : (
                        Object.values(historicalData).map((data, index) => (
                            <div key={index} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                {data.close !== undefined ? data.close : 'N/A'}
                            </div>
                        ))
                    )}
                </div>

                {/* Change Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Change
                    </div>
                    {loading ? (
                        <GainerFallbackUI />
                    ) : (
                        Object.values(historicalData).map((data, index) => (
                            <div key={index} className={`text-base py-3 border-b-[1px] border-primaryText/10 ${data.change >= 0 ? 'text-buy' : 'text-sell'}`}>
                                {data.change !== undefined ? data.close : 'N/A'}
                            </div>
                        ))
                    )}
                </div>

                {/* Change % Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Change %
                    </div>
                    {loading ? (
                        <GainerFallbackUI />
                    ) : (
                        Object.values(historicalData).map((data, index) => (
                            <div key={index} className={`text-base py-3 border-b-[1px] border-primaryText/10 ${data.change >= 0 ? 'text-buy' : 'text-sell'}`}>
                                {data.changePercentage !== undefined ? data.close : 'N/A'}%
                            </div>
                        ))
                    )}
                </div>

                {/* Open Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Open
                    </div>
                    {loading ? (
                        <GainerFallbackUI />
                    ) : (
                        Object.values(historicalData).map((data, index) => (
                            <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10">
                                {data.open !== undefined ? data.close : 'N/A'}
                            </div>
                        ))
                    )}
                </div>

                {/* High Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        High
                    </div>
                    {loading ? (
                        <GainerFallbackUI />
                    ) : (
                        Object.values(historicalData).map((data, index) => (
                            <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10">
                                {data.high !== undefined ? data.close : 'N/A'}
                            </div>
                        ))
                    )}
                </div>

                {/* low Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Low
                    </div>
                    {loading ? (
                        <GainerFallbackUI />
                    ) : (
                        Object.values(historicalData).map((data, index) => (
                            <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10">
                                {data.low !== undefined ? data.close : 'N/A'}
                            </div>
                        ))
                    )}
                </div>

                {/* Volume Column */}
                <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                    <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                        Volume
                    </div>
                    {loading ? (
                        <GainerFallbackUI />
                    ) : (
                        Object.values(historicalData).map((data, index) => (
                            <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10">
                                {data.volume !== undefined ? data.close : 'N/A'}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Historical_Summary;