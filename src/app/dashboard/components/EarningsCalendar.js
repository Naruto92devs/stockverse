'use client';
import React from 'react';
import { useEarningsCalendar } from '@/context/EarningsCalendarContext';
import DataNotAvailable from '@/loaders&errors_UI/dataUnavailable';
import RequestError from '@/loaders&errors_UI/requestError';
import Loading from '@/loaders&errors_UI/loading';
import MainLoader from "@/loaders&errors_UI/mian_loader";

const Earnings_Calendar = ({symbol}) => {
    const { earnings, loading, horizon, error, setHorizon, } = useEarningsCalendar(); // Access earnings directly

    if (!earnings && loading) {
        return <MainLoader Zindex={10}/>; // Handle loading or invalid data state
    }

    const changeHorizon = (horizon) => {
        setHorizon(horizon);
    };

    return (
        <div className='flex flex-col items-center w-full h-full gap-4'>
            
            <div className='w-full px-4 py-6 flex flex-col items-center gap-4'>
                <h1 className='font-sansMedium md:text-3xl text-2xl text-center'>Earnings Calendar for <span className='dashboard_symbol_heading'>{symbol}</span></h1>
                {/* filters Start */}
                <div className='flex items-center gap-2'>
                    <div onClick={() => changeHorizon('3month')} className={`bg-primaryBg border border-primaryMain/10 rounded-full text-sm text-primaryTextColor py-1 px-4 cursor-pointer ${horizon === '3month' ? 'bg-primaryMain text-white' : ''}`}>
                        3 Months
                    </div>
                    <div onClick={() => changeHorizon('6month')} className={`bg-primaryBg border border-primaryMain/10 rounded-full text-sm text-primaryTextColor py-1 px-4 cursor-pointer ${horizon === '6month' ? 'bg-primaryMain text-white' : ''}`}>
                        6 Months
                    </div>
                    <div onClick={() => changeHorizon('12month')} className={`bg-primaryBg border border-primaryMain/10 rounded-full text-sm text-primaryTextColor py-1 px-4 cursor-pointer ${horizon === '12month' ? 'bg-primaryMain text-white' : ''}`}>
                        12 Months
                    </div>
                </div>
                {/* filters End */}
                {/* Response Data Table Start */}
                <div className='flex overflow-x-auto overflow-y-hidden w-full bg-primaryBg py-4 rounded-xl scrollbar-thin'>
                    {/* Stock Name Column*/}
                    <div className='flex flex-col items-start w-[40%] min-w-max'>
                        <div className='w-full text-base text-primaryTextColor/60 bg-dashboardBg px-4 py-3 border border-x-0 border-black/5'>
                            Stock Name
                        </div>
                        {earnings && earnings.map((stock, index) => (
                            <div className='w-full pl-1' key={`${stock.symbol}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    ({stock.name.length > 8 ? stock.name.substring(0, 30) : stock.name || 'N/A'})
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Estimated Profit Column*/}
                    <div className='flex flex-col items-center w-[15%] min-w-max'>
                        <div className='w-full text-center text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Estimated Profit
                        </div>
                        {earnings && earnings.map((stock, index) => (
                            <div className='w-full text-center' key={`${stock.symbol}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {stock.estimate ? `$${stock.estimate}` : 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Report Due Column*/}
                    <div className='flex flex-col items-center w-[15%] min-w-max'>
                        <div className='w-full text-center text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Report Due
                        </div>
                        {earnings && earnings.map((stock, index) => (
                            <div className='w-full text-center' key={`${stock.symbol}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {stock.reportDate || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Fiscal Ending Column*/}
                    <div className='flex flex-col items-center w-[15%] min-w-max'>
                        <div className='w-full text-center text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Fiscal Ending
                        </div>
                        {earnings && earnings.map((stock, index) => (
                            <div className='w-full text-center' key={`${stock.symbol}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {stock.fiscalDateEnding || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Currency Column*/}
                    <div className='flex flex-col items-start w-[15%] min-w-max'>
                        <div className='w-full text-base text-center text-primaryTextColor/60 bg-dashboardBg px-4 py-3 border border-x-0 border-black/5'>
                            Currency
                        </div>
                        {earnings && earnings.map((stock, index) => (
                            <div className='w-full text-center pr-1' key={`${stock.symbol}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {stock.currency || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Response Data Table End */}
            </div>

            {/* Loader Start */}
            {loading && (
                <div className='absolute z-[7] w-full h-full bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center'>
                    <Loading/>
                </div>
            )}
            {/* Loader End */}
            {!error && earnings.length === 0 && !loading && (
                <DataNotAvailable/>
            )}
            {error && !earnings && !loading && (
                <RequestError/>
            )}
        </div>
    );
};

export default Earnings_Calendar;