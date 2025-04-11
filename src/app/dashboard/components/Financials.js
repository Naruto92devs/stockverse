import TickerInfo from "./TickerOverview";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useFinancials } from "@/context/FinancialsContext";
import formatNumber from '@/components/FormatNumber';
import DataNotAvailable from '@/loaders&errors_UI/dataUnavailable';
import RequestError from '@/loaders&errors_UI/requestError';
import Loading from '@/loaders&errors_UI/loading';
import MainLoader from '@/loaders&errors_UI/mian_loader';
import Image from 'next/image';



const Financials = ({ symbol, watchlistHide, setWatchlistHide }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);
  const activeButtonRef = useRef(null);
  const PAGE_SIZE = 1; // Get dynamic page size
  // const dropdownRef = useRef(null);
  const { financials, loading, error, timeframe, setTimeframe } = useFinancials();

  useEffect(() => {
      // Scroll to the active button
      if (activeButtonRef.current && containerRef.current) {
          activeButtonRef.current.scrollIntoView({
              behavior: 'smooth',
              inline: 'center',
              block: 'nearest',
          });
      }
  }, [currentPage]);

  useEffect(() => {
      setCurrentPage(1);
  }, [symbol]);
  
  // Divide transactions into chunks of PAGE_SIZE
  const paginatedData = useMemo(() => {
      if (!financials || financials.length === 0) return [];
      return financials.reduce((result, row, index) => {
          const pageIndex = Math.floor(index / PAGE_SIZE);
          if (!result[pageIndex]) result[pageIndex] = [];
          result[pageIndex].push(row);
          return result;
      }, []);
  }, [financials, PAGE_SIZE]);

  // Get total pages
  const totalPages = paginatedData.length;

  // Change page handler
  const goToPage = (page) => {
      if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
      }
  };

  if (!financials && loading) {
      return <MainLoader Zindex={10} />; // Handle loading state
  }

  const changeStatus = (status) => {
    setTimeframe(status);
  };

  return (
    <div className="w-full h-full flex flex-col items-start">
      <TickerInfo watchlistHide={watchlistHide} setWatchlistHide={setWatchlistHide} />
        {financials && (
          <div>
            {/* filters Start */}
            <div className="w-full flex items-center justify-center">
                <div className=' max-w-full overflow-x-auto overflow-y-hidden scrollbar-hide flex items-center gap-2 py-1 mt-4 px-1 bg-primaryBg border border-primaryMain/10 rounded-full'>
                <div onClick={() => changeStatus('annual')} className={`rounded-full font-sansMedium text-base text-primaryTextColor py-1 px-2 cursor-pointer ${timeframe === 'annual' ? 'bg-primaryMain text-white px-4' : ''}`}>
                    Annual
                </div>
                <div onClick={() => changeStatus('quarterly')} className={`rounded-full font-sansMedium text-base text-primaryTextColor py-1 px-2 cursor-pointer ${timeframe === 'quarterly' ? 'bg-primaryMain text-white px-4' : ''}`}>
                    Quarterly
                </div>
                <div onClick={() => changeStatus('ttm')} className={`rounded-full font-sansMedium text-base text-primaryTextColor py-1 px-2 cursor-pointer ${timeframe === 'ttm' ? 'bg-primaryMain text-white px-4' : ''}`}>
                    TTM
                </div>
                </div>
            </div>
            {/* filters End */}
            <div className="w-full p-4 flex flex-wrap justify-between gap-4 gap-y-8">
              {/* Company Overview */}
              <div className='lg:w-[48%] w-full bg-primaryBg shadow-lg py-4 rounded-xl'>
                  <h2 className="pl-2 pb-4 text-black text-xl font-sansMedium">Company Overview</h2>
                  <div className='flex w-full overflow-auto scrollbar-thin'>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Overview
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Company
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Start Date
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            End Date
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            CIK
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Fiscal Period
                          </div>
                          {/* <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Fiscal Year
                          </div> */}
                      </div>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Value
                          </div>
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.tickers}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.tickers? row.tickers : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.start_date}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.start_date? row.start_date : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.end_date}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.end_date? row.end_date : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.cik}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.cik? row.cik : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.fiscal_period}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.fiscal_period? row.fiscal_period : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {/* {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.fiscal_year}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row.fiscal_year || 'N/A'}
                                  </div>
                              </div>
                          ))} */}
                      </div>

                  </div>
                  
                  {/* Controller Start */}
                  {totalPages > 1 && (
                      <div className='px-4 pt-4 bg-primaryBg w-full flex justify-between items-center gap-4'>
                          {/* Previous Button */}
                          <button 
                              className='px-3 py-1 font-sansMedium text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === 1} 
                              onClick={() => goToPage(currentPage - 1)}
                          >
                              Previous
                          </button>
                          
                          {/* Scrollable Numbered Buttons */}
                          <div className='overflow-x-auto scrollbar-hide w-full max-w-[300px]' ref={containerRef}>
                              <div className='w-max flex gap-2'>
                                  {Array.from({ length: totalPages }, (_, index) => (
                                      <button 
                                          key={index} 
                                          ref={currentPage === index + 1 ? activeButtonRef : null}
                                          className={`px-3 py-0.5 rounded-full text-black font-sansMedium ${
                                              currentPage === index + 1 ? 'text-primaryMain bg-primaryMain/10' : ''
                                          }`} 
                                          onClick={() => goToPage(index + 1)}
                                      >
                                          {index + 1}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          
                          {/* Next Button */}
                          <button 
                              className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === totalPages} 
                              onClick={() => goToPage(currentPage + 1)}
                          >
                              Next
                          </button>
                      </div>
                  )}
                  {/* Controller End */}
              </div>

              {/* Financials */}
              <div className='lg:w-[48%] w-full bg-primaryBg shadow-lg py-4 rounded-xl'>
                  <h2 className="pl-2 pb-4 text-black text-xl font-sansMedium">Financials</h2>
                  <div className='flex w-full overflow-auto scrollbar-thin'>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Financials
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Revenue
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Net Income
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Operating Income
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            EPS (Diluted) 
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Gross Profit
                          </div>
                          {/* <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Research & Development
                          </div> */}
                      </div>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Value
                          </div>
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.revenues? formatNumber(row.financials.income_statement.revenues.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.net_income_loss? formatNumber(row.financials.income_statement.net_income_loss.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.operating_income_loss? formatNumber(row.financials.income_statement.operating_income_loss.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.diluted_earnings_per_share? formatNumber(row.financials.income_statement.diluted_earnings_per_share.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.gross_profit? formatNumber(row.financials.income_statement.gross_profit.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {/* {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {formatNumber(row.financials.income_statement.research_and_development.value) || 'N/A'}
                                  </div>
                              </div>
                          ))} */}
                      </div>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Currency
                          </div>
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.revenues? row.financials.income_statement.revenues.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.net_income_loss? row.financials.income_statement.net_income_loss.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.operating_income_loss? row.financials.income_statement.operating_income_loss.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.diluted_earnings_per_share? row.financials.income_statement.diluted_earnings_per_share.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.income_statement?.gross_profit? row.financials.income_statement.gross_profit.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {/* {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row.financials.income_statement.research_and_development.unit || 'N/A'}
                                  </div>
                              </div>
                          ))} */}
                      </div>
                  </div>
                  
                  {/* Controller Start */}
                  {totalPages > 1 && (
                      <div className='px-4 pt-4 bg-primaryBg w-full flex justify-between items-center gap-4'>
                          {/* Previous Button */}
                          <button 
                              className='px-3 py-1 font-sansMedium text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === 1} 
                              onClick={() => goToPage(currentPage - 1)}
                          >
                              Previous
                          </button>
                          
                          {/* Scrollable Numbered Buttons */}
                          <div className='overflow-x-auto scrollbar-hide w-full max-w-[300px]' ref={containerRef}>
                              <div className='w-max flex gap-2'>
                                  {Array.from({ length: totalPages }, (_, index) => (
                                      <button 
                                          key={index} 
                                          ref={currentPage === index + 1 ? activeButtonRef : null}
                                          className={`px-3 py-0.5 rounded-full text-black font-sansMedium ${
                                              currentPage === index + 1 ? 'text-primaryMain bg-primaryMain/10' : ''
                                          }`} 
                                          onClick={() => goToPage(index + 1)}
                                      >
                                          {index + 1}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          
                          {/* Next Button */}
                          <button 
                              className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === totalPages} 
                              onClick={() => goToPage(currentPage + 1)}
                          >
                              Next
                          </button>
                      </div>
                  )}
                  {/* Controller End */}
              </div>

              {/* Balance Sheet */}
              <div className='lg:w-[48%] w-full bg-primaryBg shadow-lg py-4 rounded-xl'>
                  <h2 className="pl-2 pb-4 text-black text-xl font-sansMedium">Balance Sheet</h2>
                  <div className='flex w-full overflow-auto scrollbar-thin'>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                            Balance Sheet
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Current Assets
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Current Liabilities
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Equity
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Assets
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Inventory
                          </div>
                          {/* <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Research & Development
                          </div> */}
                      </div>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Value
                          </div>
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.current_assets? formatNumber(row.financials.balance_sheet.current_assets.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.current_liabilities? formatNumber(row.financials.balance_sheet.current_liabilities.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.equity? formatNumber(row.financials.balance_sheet.equity.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.assets? formatNumber(row.financials.balance_sheet.assets.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.inventory? formatNumber(row.financials.balance_sheet.inventory.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          
                          {/* {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {formatNumber(row.financials.income_statement.research_and_development.value) || 'N/A'}
                                  </div>
                              </div>
                          ))} */}
                      </div>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Currency
                          </div>
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.current_assets? row.financials.balance_sheet.current_assets.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.current_liabilities? row.financials.balance_sheet.current_liabilities.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.equity? row.financials.balance_sheet.equity.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.assets? row.financials.balance_sheet.assets.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.balance_sheet}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.balance_sheet?.inventory? row.financials.balance_sheet.inventory.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {/* {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row.financials.income_statement.research_and_development.unit || 'N/A'}
                                  </div>
                              </div>
                          ))} */}
                      </div>
                  </div>
                  
                  {/* Controller Start */}
                  {totalPages > 1 && (
                      <div className='px-4 pt-4 bg-primaryBg w-full flex justify-between items-center gap-4'>
                          {/* Previous Button */}
                          <button 
                              className='px-3 py-1 font-sansMedium text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === 1} 
                              onClick={() => goToPage(currentPage - 1)}
                          >
                              Previous
                          </button>
                          
                          {/* Scrollable Numbered Buttons */}
                          <div className='overflow-x-auto scrollbar-hide w-full max-w-[300px]' ref={containerRef}>
                              <div className='w-max flex gap-2'>
                                  {Array.from({ length: totalPages }, (_, index) => (
                                      <button 
                                          key={index} 
                                          ref={currentPage === index + 1 ? activeButtonRef : null}
                                          className={`px-3 py-0.5 rounded-full text-black font-sansMedium ${
                                              currentPage === index + 1 ? 'text-primaryMain bg-primaryMain/10' : ''
                                          }`} 
                                          onClick={() => goToPage(index + 1)}
                                      >
                                          {index + 1}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          
                          {/* Next Button */}
                          <button 
                              className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === totalPages} 
                              onClick={() => goToPage(currentPage + 1)}
                          >
                              Next
                          </button>
                      </div>
                  )}
                  {/* Controller End */}
              </div>
              
              {/* Income */}
              <div className='lg:w-[48%] w-full bg-primaryBg shadow-lg py-4 rounded-xl'>
                  <h2 className="pl-2 pb-4 text-black text-xl font-sansMedium">Income</h2>
                  <div className='flex w-full overflow-auto scrollbar-thin'>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                          Comprehensive Income
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Comprehensive Income
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                          Other Comprehensive Income 
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                          Comprehensive Income (Parent)
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                          Other Comprehensive Income  (Parent) 
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                          Comprehensive Income/Loss Attributable
                          </div>
                          {/* <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Research & Development
                          </div> */}
                      </div>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Value
                          </div>
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.comprehensive_income_loss? formatNumber(row.financials.comprehensive_income.comprehensive_income_loss.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.other_comprehensive_income_loss? formatNumber(row.financials.comprehensive_income.other_comprehensive_income_loss.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.comprehensive_income_loss_attributable_to_parent? formatNumber(row.financials.comprehensive_income.comprehensive_income_loss_attributable_to_parent.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.other_comprehensive_income_loss_attributable_to_parent? formatNumber(row.financials.comprehensive_income.other_comprehensive_income_loss_attributable_to_parent.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.comprehensive_income_loss_attributable_to_noncontrolling_interest? formatNumber(row.financials.comprehensive_income.comprehensive_income_loss_attributable_to_noncontrolling_interest.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          
                          {/* {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {formatNumber(row.financials.income_statement.research_and_development.value) || 'N/A'}
                                  </div>
                              </div>
                          ))} */}
                      </div>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Currency
                          </div>
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.comprehensive_income_loss? row.financials.comprehensive_income.comprehensive_income_loss.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.other_comprehensive_income_loss? row.financials.comprehensive_income.other_comprehensive_income_loss.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.comprehensive_income_loss_attributable_to_parent? row.financials.comprehensive_income.comprehensive_income_loss_attributable_to_parent.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.other_comprehensive_income_loss_attributable_to_parent? row.financials.comprehensive_income.other_comprehensive_income_loss_attributable_to_parent.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.comprehensive_income}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.comprehensive_income?.comprehensive_income_loss_attributable_to_noncontrolling_interest? row.financials.comprehensive_income.comprehensive_income_loss_attributable_to_noncontrolling_interest.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {/* {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row.financials.income_statement.research_and_development.unit || 'N/A'}
                                  </div>
                              </div>
                          ))} */}
                      </div>
                  </div>
                  
                  {/* Controller Start */}
                  {totalPages > 1 && (
                      <div className='px-4 pt-4 bg-primaryBg w-full flex justify-between items-center gap-4'>
                          {/* Previous Button */}
                          <button 
                              className='px-3 py-1 font-sansMedium text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === 1} 
                              onClick={() => goToPage(currentPage - 1)}
                          >
                              Previous
                          </button>
                          
                          {/* Scrollable Numbered Buttons */}
                          <div className='overflow-x-auto scrollbar-hide w-full max-w-[300px]' ref={containerRef}>
                              <div className='w-max flex gap-2'>
                                  {Array.from({ length: totalPages }, (_, index) => (
                                      <button 
                                          key={index} 
                                          ref={currentPage === index + 1 ? activeButtonRef : null}
                                          className={`px-3 py-0.5 rounded-full text-black font-sansMedium ${
                                              currentPage === index + 1 ? 'text-primaryMain bg-primaryMain/10' : ''
                                          }`} 
                                          onClick={() => goToPage(index + 1)}
                                      >
                                          {index + 1}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          
                          {/* Next Button */}
                          <button 
                              className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === totalPages} 
                              onClick={() => goToPage(currentPage + 1)}
                          >
                              Next
                          </button>
                      </div>
                  )}
                  {/* Controller End */}
              </div>

              {/* Cash Flow Statement */}
              <div className='lg:w-[48%] w-full bg-primaryBg shadow-lg py-4 rounded-xl'>
                  <h2 className="pl-2 pb-4 text-black text-xl font-sansMedium">Cash Flow Statement</h2>
                  <div className='flex w-full overflow-auto scrollbar-thin'>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                          Cash Flow Statement
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                          Net Cash Flow
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                          Net Cash Flow, Continuing
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                          Net Cash Flow From Investing
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                          Net Cash Flow From Financing
                          </div>
                          <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                          Net Cash Flow Operating
                          </div>
                          {/* <div className='w-full min-w-max font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                            Research & Development
                          </div> */}
                      </div>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Value
                          </div>
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow? formatNumber(row.financials.cash_flow_statement.net_cash_flow.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow_continuing? formatNumber(row.financials.cash_flow_statement.net_cash_flow_continuing.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow_from_investing_activities? formatNumber(row.financials.cash_flow_statement.net_cash_flow_from_investing_activities.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow_from_financing_activities? formatNumber(row.financials.cash_flow_statement.net_cash_flow_from_financing_activities.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow_from_operating_activities? formatNumber(row.financials.cash_flow_statement.net_cash_flow_from_operating_activities.value) : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          
                          {/* {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {formatNumber(row.financials.income_statement.research_and_development.value) || 'N/A'}
                                  </div>
                              </div>
                          ))} */}
                      </div>

                      <div className='flex flex-col h-max w-[50%] min-w-max'>
                          <div className='w-full min-w-max font-sansMedium text-primaryTextColor/60 text-base bg-dashboardBg p-3 border border-x-0 border-black/5'>
                              Currency
                          </div>
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow? row.financials.cash_flow_statement.net_cash_flow.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow_continuing? row.financials.cash_flow_statement.net_cash_flow_continuing.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow_from_investing_activities? row.financials.cash_flow_statement.net_cash_flow_from_investing_activities.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow_from_financing_activities? row.financials.cash_flow_statement.net_cash_flow_from_financing_activities.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.cash_flow_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row?.financials?.cash_flow_statement?.net_cash_flow_from_operating_activities? row.financials.cash_flow_statement.net_cash_flow_from_operating_activities.unit : 'N/A'}
                                  </div>
                              </div>
                          ))}
                          {/* {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((row, index) => (
                              <div className='w-full min-w-max' key={`${row.financials.income_statement}-${index}`}>
                                  <div className='p-3 font-sansRegular text-base bg-white p-3 border border-x-0 border-black/5'>
                                      {row.financials.income_statement.research_and_development.unit || 'N/A'}
                                  </div>
                              </div>
                          ))} */}
                      </div>
                  </div>
                  
                  {/* Controller Start */}
                  {totalPages > 1 && (
                      <div className='px-4 pt-4 bg-primaryBg w-full flex justify-between items-center gap-4'>
                          {/* Previous Button */}
                          <button 
                              className='px-3 py-1 font-sansMedium text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === 1} 
                              onClick={() => goToPage(currentPage - 1)}
                          >
                              Previous
                          </button>
                          
                          {/* Scrollable Numbered Buttons */}
                          <div className='overflow-x-auto scrollbar-hide w-full max-w-[300px]' ref={containerRef}>
                              <div className='w-max flex gap-2'>
                                  {Array.from({ length: totalPages }, (_, index) => (
                                      <button 
                                          key={index} 
                                          ref={currentPage === index + 1 ? activeButtonRef : null}
                                          className={`px-3 py-0.5 rounded-full text-black font-sansMedium ${
                                              currentPage === index + 1 ? 'text-primaryMain bg-primaryMain/10' : ''
                                          }`} 
                                          onClick={() => goToPage(index + 1)}
                                      >
                                          {index + 1}
                                      </button>
                                  ))}
                              </div>
                          </div>
                          
                          {/* Next Button */}
                          <button 
                              className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
                              disabled={currentPage === totalPages} 
                              onClick={() => goToPage(currentPage + 1)}
                          >
                              Next
                          </button>
                      </div>
                  )}
                  {/* Controller End */}
              </div>
            </div>
          </div>
        )}
      
      {/* Loader Start */}
      {loading && (
          <div className='fixed z-[7] w-full h-full bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center'>
              <Loading />
          </div>
      )}
      {/* Loader End */}

      {!error && !financials && !loading && (
          <DataNotAvailable />
      )}

      {error && !financials && !loading && (
          <RequestError />
      )}
    </div>
  );
};

export default Financials;