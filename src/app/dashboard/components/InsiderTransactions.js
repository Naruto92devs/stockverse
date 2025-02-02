'use client';
import React from 'react';
import { useInsiderTransactions } from '@/context/InsiderTransactionsContext';
import DataNotAvailable from '@/loaders&errors_UI/dataUnavailable';
import RequestError from '@/loaders&errors_UI/requestError';
import Loading from '@/loaders&errors_UI/loading';
import MainLoader from '@/loaders&errors_UI/mian_loader';

const InsiderTransactions = ({ symbol }) => {
    const { transactions, loading, error } = useInsiderTransactions(); // Access insider transactions directly

    if (!transactions && loading) {
        return <MainLoader />; // Handle loading state
    }

    return (
        <div className='flex flex-col items-center w-full h-full gap-4'>
            <div className='w-full px-4 py-6 flex flex-col items-center gap-4'>
                <h1 className='font-sansMedium md:text-3xl text-2xl text-center'>
                    Insider Transactions for <span className='dashboard_symbol_heading'>{symbol}</span>
                </h1>

                {/* Response Data Table Start */}
                <div className='flex overflow-x-auto overflow-y-hidden w-full bg-primaryBg py-4 rounded-xl scrollbar-thin'>
                    
                    {/* Executive Name Column */}
                    <div className='flex flex-col items-center w-[20%] min-w-max'>
                        <div className='w-full text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Executive
                        </div>
                        {transactions && transactions.map((transaction, index) => (
                            <div className='w-full' key={`${transaction.ticker}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {transaction.executive || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Shares Transacted Column */}
                    <div className='flex flex-col items-center w-[10%] min-w-max'>
                        <div className='w-full text-center text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Shares
                        </div>
                        {transactions && transactions.map((transaction, index) => (
                            <div className='w-full text-center' key={`${transaction.ticker}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {transaction.shares || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Share Price Column */}
                    <div className='flex flex-col items-center w-[10%] min-w-max'>
                        <div className='w-full text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Share Price
                        </div>
                        {transactions && transactions.map((transaction, index) => (
                            <div className='w-full' key={`${transaction.ticker}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {transaction.share_price ? `$${transaction.share_price}` : 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Transaction Date Column */}
                    <div className='flex flex-col items-start w-[15%] min-w-max'>
                        <div className='w-full text-base text-primaryTextColor/60 bg-dashboardBg px-4 py-3 border border-x-0 border-black/5'>
                            Transaction Date
                        </div>
                        {transactions && transactions.map((transaction, index) => (
                            <div className='w-full' key={`${transaction.ticker}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {transaction.transaction_date && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(transaction.transaction_date.trim()) 
                                        ? transaction.transaction_date.trim() 
                                        : 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>



                    {/* Executive Title Column */}
                    <div className='flex flex-col items-center w-[15%] min-w-max'>
                        <div className='w-full text-center text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Executive Title
                        </div>
                        {transactions && transactions.map((transaction, index) => (
                            <div className='w-full text-center' key={`${transaction.ticker}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {transaction.executive_title || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Security Type Column */}
                    <div className='flex flex-col items-center w-[10%] min-w-max'>
                        <div className='w-full text-center text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Security Type
                        </div>
                        {transactions && transactions.map((transaction, index) => (
                            <div className='w-full text-center' key={`${transaction.ticker}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {transaction.security_type || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Acquisition/Disposal Column */}
                    <div className='flex flex-col items-center w-[10%] min-w-max'>
                        <div className='w-full text-center text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Action
                        </div>
                        {transactions && transactions.map((transaction, index) => (
                            <div className='w-full text-center' key={`${transaction.ticker}-${index}`}>
                                <div className='p-3 text-sm border-b border-black/5'>
                                    {transaction.acquisition_or_disposal || 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Response Data Table End */}
            </div>

            {/* Loader Start */}
            {loading && (
                <div className='absolute w-full h-full bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center'>
                    <Loading />
                </div>
            )}
            {/* Loader End */}

            {!error && transactions.length === 0 && !loading && (
                <DataNotAvailable />
            )}

            {error && !transactions && !loading && (
                <RequestError />
            )}
        </div>
    );
};

export default InsiderTransactions;