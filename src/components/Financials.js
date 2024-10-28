'use client';
import React, { useEffect, useState, useRef } from 'react';
import GainerFallbackUI from './GainerFallbackUI';
import formatNumber from './FormatNumber';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

const Financials = ({ symbol }) => {
    const [Info, setInfo] = useState([]);
    const [IncomeStatement, setIncomeStatement] = useState([]);
    const [comprehensiveIncome, setComprehensiveIncome] = useState([]);
    const [cashFlowStatement, setCashFlowStatement] = useState([]);
    const [balanceSheet, setBalanceSheet] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const scrollRef = useRef();
    
    // State to track mouse dragging
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        // Function to handle mouse down event
        const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
        };

        // Function to handle mouse move event
        const handleMouseMove = (e) => {
            if (!isDragging) return; // Stop function if not dragging
            e.preventDefault();
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 2; // Increase the value to scroll faster
            scrollRef.current.scrollLeft = scrollLeft - walk;
        };

        // Function to handle mouse up event
        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const scrollableDiv = scrollRef.current;
        scrollableDiv.addEventListener('mousedown', handleMouseDown);
        scrollableDiv.addEventListener('mousemove', handleMouseMove);
        scrollableDiv.addEventListener('mouseleave', handleMouseUp);
        scrollableDiv.addEventListener('mouseup', handleMouseUp);

        // Clean up event listeners on component unmount
        return () => {
            scrollableDiv.removeEventListener('mousedown', handleMouseDown);
            scrollableDiv.removeEventListener('mousemove', handleMouseMove);
            scrollableDiv.removeEventListener('mouseleave', handleMouseUp);
            scrollableDiv.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startX, scrollLeft]);

    useEffect(() => {
        const fetchFinancialsData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.polygon.io/vX/reference/financials?ticker=${symbol}&limit=1&apiKey=9SqQlpW_rHXpqHJgrC3Ea0Q1fibyvtjy`);
                if (!response.ok) throw new Error('Failed to fetch financial data');
                
                const responseData = await response.json();
                const Info = responseData.results[0];
                const IncomeStatement = responseData.results[0].financials.income_statement;
                const comprehensiveIncome = responseData.results[0].financials.comprehensive_income;
                const cashFlowStatement = responseData.results[0].financials.cash_flow_statement;
                const balanceSheet = responseData.results[0].financials.balance_sheet;

                setInfo([
                    { label: 'Company', value: Info.tickers[0] },
                    { label: 'Start Date', value: Info.start_date },
                    { label: 'End Date', value: Info.end_date },
                    { label: 'CIK', value: Info.cik },
                    { label: 'Fiscal Period', value: Info.fiscal_period }
                ]);

                setIncomeStatement([
                    { label: 'Revenue', value: IncomeStatement.revenues.value, unit: IncomeStatement.revenues.unit },
                    { label: 'Net Income', value: IncomeStatement.net_income_loss.value, unit: IncomeStatement.net_income_loss.unit },
                    { label: 'Operating Income', value: IncomeStatement.operating_income_loss.value, unit: IncomeStatement.operating_income_loss.unit },
                    { label: 'EPS (Diluted)', value: IncomeStatement.diluted_earnings_per_share.value, unit: IncomeStatement.diluted_earnings_per_share.unit },
                    { label: 'Gross Profit', value: IncomeStatement.gross_profit.value, unit: IncomeStatement.gross_profit.unit }
                ]);

                setComprehensiveIncome([
                    { label: 'Comprehensive Income', value: comprehensiveIncome.comprehensive_income_loss.value, unit: comprehensiveIncome.comprehensive_income_loss.unit },
                    { label: 'Other Comprehensive Income', value: comprehensiveIncome.other_comprehensive_income_loss.value, unit: comprehensiveIncome.other_comprehensive_income_loss.unit },
                    { label: 'Comprehensive Income (Parent)', value: comprehensiveIncome.comprehensive_income_loss_attributable_to_parent.value, unit: comprehensiveIncome.comprehensive_income_loss_attributable_to_parent.unit },
                    { label: 'Other Comprehensive Income (Parent)', value: comprehensiveIncome.other_comprehensive_income_loss_attributable_to_parent.value, unit: comprehensiveIncome.other_comprehensive_income_loss_attributable_to_parent.unit },
                    { label: 'Comprehensive Income/Loss Attributable', value: comprehensiveIncome.comprehensive_income_loss_attributable_to_noncontrolling_interest.value, unit: comprehensiveIncome.comprehensive_income_loss_attributable_to_noncontrolling_interest.unit }
                ]);

                setCashFlowStatement([
                    { label: 'Net Cash Flow', value: cashFlowStatement.net_cash_flow.value, unit: cashFlowStatement.net_cash_flow.unit },
                    { label: 'Net Cash Flow, Continuing', value: cashFlowStatement.net_cash_flow_continuing.value, unit: cashFlowStatement.net_cash_flow_continuing.unit },
                    { label: 'Net Cash Flow From Investing', value: cashFlowStatement.net_cash_flow_from_investing_activities.value, unit: cashFlowStatement.net_cash_flow_from_investing_activities.unit },
                    { label: 'Net Cash Flow From Financing', value: cashFlowStatement.net_cash_flow_from_financing_activities.value, unit: cashFlowStatement.net_cash_flow_from_financing_activities.unit },
                    { label: 'Net Cash Flow From Financing', value: cashFlowStatement.net_cash_flow_from_financing_activities.value, unit: cashFlowStatement.net_cash_flow_from_financing_activities.unit }
                ]);

                setBalanceSheet([
                    { label: 'Current Assets', value: balanceSheet.current_assets.value, unit: balanceSheet.current_assets.unit },
                    { label: 'Current Liabilities', value: balanceSheet.current_liabilities.value, unit: balanceSheet.current_liabilities.unit },
                    { label: 'Equity', value: balanceSheet.equity.value, unit: balanceSheet.equity.unit },
                    { label: 'Assets', value: balanceSheet.assets.value, unit: balanceSheet.assets.unit },
                    { label: 'Inventory', value: balanceSheet.inventory.value, unit: balanceSheet.inventory.unit }
                ]);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching financial data:", error);
                setError('Error loading financial data. Please try again later.');
                setLoading(false);
            }
        };

        fetchFinancialsData();
    }, [symbol]);
    
    return (
        <div className='w-full flex flex-wrap gap-8 p-0'>
            <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">
                {/* Columns */}
                <div ref={scrollRef} className="flex max-w-full w-max max-h-[550px] overflow-y-auto">

                    {/* Lables Column */}
                    <div className="min-w-max w-max sticky top-0 left-0 z-[2] h-max  bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                        {/* Header for Stock Column */}
                        <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                        Overview
                        </div>
                        {/* Transaction Rows */}
                        {loading || !Info || Info.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            Info.map((item, index) => (
                                <div key={index} className="w-full cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                    <ul className="w-full">
                                        <li className="text-xs w-full text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">{item.label}</li>
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Value Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 pl-2 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Value
                        </div>
                        {/* Rows */}
                        {loading || !Info || Info.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            Info.map((item, index) => (
                                <div key={index} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                    {item.value}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">
                {/* Columns */}
                <div ref={scrollRef} className="flex max-w-full w-max max-h-[550px] overflow-y-auto">

                    {/* Lables Column */}
                    <div className="min-w-max w-max sticky top-0 left-0 z-[2] h-max  bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                        {/* Header for Stock Column */}
                        <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                        Financials
                        </div>
                        {/* Transaction Rows */}
                        {loading || !IncomeStatement || IncomeStatement.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            IncomeStatement.map((item, index) => (
                                <div key={index} className="w-full cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                    <ul className="w-full">
                                        <li className="text-xs w-full text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">{item.label}</li>
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Value Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 pl-2 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Value
                        </div>
                        {/* Rows */}
                        {loading || !IncomeStatement || IncomeStatement.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            IncomeStatement.map((item, index) => (
                                <div key={index} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                    {formatNumber(Number(item.value))}
                                </div>
                            ))
                        )}
                    </div>

                    {/* CUrrency Price Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Currency
                        </div>
                        {/* Rows */}
                        {loading || !IncomeStatement || IncomeStatement.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            IncomeStatement.map((item, index) => (
                                <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10 text-primaryText">
                                    {item.unit}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">
                {/* Columns */}
                <div ref={scrollRef} className="flex max-w-full w-max max-h-[550px] overflow-y-auto">

                    {/* Lables Column */}
                    <div className="min-w-max w-max sticky top-0 left-0 z-[2] h-max  bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                        {/* Header for Stock Column */}
                        <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                        BalanceSheet
                        </div>
                        {/* Transaction Rows */}
                        {loading || !balanceSheet || balanceSheet.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            balanceSheet.map((item, index) => (
                                <div key={index} className="w-full cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                    <ul className="w-full">
                                        <li className="text-xs w-full text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">{item.label}</li>
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Value Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 pl-2 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Value
                        </div>
                        {/* Rows */}
                        {loading || !balanceSheet || balanceSheet.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            balanceSheet.map((item, index) => (
                                <div key={index} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                    {formatNumber(Number(item.value))}
                                </div>
                            ))
                        )}
                    </div>

                    {/* CUrrency Price Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Currency
                        </div>
                        {/* Rows */}
                        {loading || !balanceSheet || balanceSheet.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            balanceSheet.map((item, index) => (
                                <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10 text-primaryText">
                                    {item.unit}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">
                {/* Columns */}
                <div ref={scrollRef} className="flex max-w-full w-max max-h-[550px] overflow-y-auto">

                    {/* Lables Column */}
                    <div className="min-w-max w-max sticky top-0 left-0 z-[2] h-max  bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                        {/* Header for Stock Column */}
                        <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                        Comprehensive Income
                        </div>
                        {/* Transaction Rows */}
                        {loading || !comprehensiveIncome || comprehensiveIncome.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            comprehensiveIncome.map((item, index) => (
                                <div key={index} className="w-full cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                    <ul className="w-full">
                                        <li className="text-xs w-full text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">{item.label}</li>
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Value Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 pl-2 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Value
                        </div>
                        {/* Rows */}
                        {loading || !comprehensiveIncome || comprehensiveIncome.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            comprehensiveIncome.map((item, index) => (
                                <div key={index} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                    {formatNumber(Number(item.value))}
                                </div>
                            ))
                        )}
                    </div>

                    {/* CUrrency Price Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Currency
                        </div>
                        {/* Rows */}
                        {loading || !comprehensiveIncome || comprehensiveIncome.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            comprehensiveIncome.map((item, index) => (
                                <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10 text-primaryText">
                                    {item.unit}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div ref={scrollRef} className="flex-grown cursor-pointer select-none overflow-x-auto">
                {/* Columns */}
                <div ref={scrollRef} className="flex max-w-full w-max max-h-[550px] overflow-y-auto">

                    {/* Lables Column */}
                    <div className="min-w-max w-max sticky top-0 left-0 z-[2] h-max  bg-background flex flex-col border-y-[1px] border-r-[1px] border-primaryText/10">
                        {/* Header for Stock Column */}
                        <div className="sticky top-0 left-0 py-3 px-3 bg-mobNavBg font-sansMedium text-sm text-mobNavLink border-b-[1px] border-primaryText/10">
                        Cash Flow Statement
                        </div>
                        {/* Transaction Rows */}
                        {loading || !cashFlowStatement || cashFlowStatement.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            cashFlowStatement.map((item, index) => (
                                <div key={index} className="w-full cursor-pointer flex items-center gap-x-2 py-3 px-3 group border-b-[1px] border-primaryText/10">
                                    <ul className="w-full">
                                        <li className="text-xs w-full text-center py-1 px-2 bg-primaryText/10 rounded-md group-hover:bg-article group-hover:text-mobNavLink">{item.label}</li>
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Value Column */}
                    <div className="flex flex-col min-w-[10rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 pl-2 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Value
                        </div>
                        {/* Rows */}
                        {loading || !cashFlowStatement || cashFlowStatement.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            cashFlowStatement.map((item, index) => (
                                <div key={index} className="text-base pl-2 py-3 border-b-[1px] border-primaryText/10">
                                    {formatNumber(Number(item.value))}
                                </div>
                            ))
                        )}
                    </div>

                    {/* CUrrency Price Column */}
                    <div className="flex flex-col min-w-[8rem] h-max text-left border-y-[1px] border-primaryText/10">
                        {/* Header */}
                        <div className="sticky top-0 left-0 py-3 font-sansMedium text-sm bg-mobNavBg text-mobNavLink border-b-[1px] border-primaryText/10">
                            Currency
                        </div>
                        {/* Rows */}
                        {loading || !cashFlowStatement || cashFlowStatement.length === 0 ? (
                            <GainerFallbackUI/>
                        ) : (
                            cashFlowStatement.map((item, index) => (
                                <div key={index} className="text-base py-3 border-b-[1px] border-primaryText/10 text-primaryText">
                                    {item.unit}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Financials;