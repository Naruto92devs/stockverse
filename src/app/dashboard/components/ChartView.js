import React, { useState, useEffect } from "react";
import TickerInfo from "./TickerOverview";
import LineChart from "./LineChart";
import CandlestickChart from "./CandlestickChart";
import { useTickerDetails } from "@/context/TickerDetailsContext";
import { useChartData } from "@/context/ChartDataContext";
import MainLoader from "@/loaders&errors_UI/mian_loader";
import Image from "next/image";

const ChartView = ({ symbol, watchlistHide, setWatchlistHide }) => {
  const [chart, setChart] = useState("line");
  const [selectedInterval, setSelectedInterval] = useState(null);
  const { tickerDetails } = useTickerDetails();
  const { chartData, fetchChartData, timeframe, setTimeframe, loading } = useChartData();
  const [fullScreen, setFullScreen] = useState(false);

  const changeInterval = (interval) => {
    setTimeframe(interval);
    // setSelectedInterval(interval);
  };

  const toggleCharts = (value) => {
    setChart(value);
  };

  const toggleChartScreen = () => {
    setFullScreen(!fullScreen);
  };

  useEffect(() => {
    if (timeframe) {
      setSelectedInterval(timeframe);
    }
  }, [timeframe]); // Update selectedInterval whenever timeframe changes

  const intervals = ["1D", "5D", "1M", "6M", "1Y", "5Y", "All"]; // Define available intervals

  if (!chartData && loading) {
      return <MainLoader Zindex={10} />; // Handle loading state
  }

  return (
    <div className="w-full h-full flex flex-col items-start">
      <TickerInfo watchlistHide={watchlistHide} setWatchlistHide={setWatchlistHide} />
      {/* Full Screen */}
      <div className={`${fullScreen? 'fixed w-full h-full z-20 top-0 left-0 bottom-0 right-0' : ''} w-full flex-grow flex flex-col items-start bg-primaryBg`}>
        <div className="w-full flex-none flex flex-wrap gap-2 p-3 items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-black/60 font-sansRegular text-base">{tickerDetails?.ticker} PRICE</h1>
            <div className="flex gap-2 items-center">
              <h2 className="text-black font-sansMedium text-xl">{tickerDetails?.closePrice}</h2>
              <h2 className={`${tickerDetails?.todaysChangePerc >= 0 ? 'text-buy' : 'text-sell'} font-sansMedium text-sm`}>{tickerDetails?.todaysChangePerc >= 0 && tickerDetails?.todaysChangePerc !== 'N/A' ? `+${tickerDetails?.todaysChangePerc}%` : `${tickerDetails?.todaysChangePerc}%` || tickerDetails?.todaysChangePerc}</h2>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Full Screen Chart */}
            <button onClick={toggleChartScreen} className={`px-3 py-1.5 rounded-lg bg-primaryBg shadow ${chart === "line" ? "" : ""}`}>
                <Image width={24} height={24} src='/images/expandchart.svg' alt='Line'/>
            </button>
            {/* Filter Buttons for Chart Type */}
            <div className="flex items-center bg-[#F7F7F7] rounded-lg p-1">
              <button onClick={() => toggleCharts("line")} className={`px-3 py-1 rounded-lg ${chart === "line" ? "bg-primaryBg" : ""}`}>
                <Image width={24} height={24} src='/images/linechart.svg' alt='Line'/>
              </button>
              <button onClick={() => toggleCharts("candle")} className={`px-3 py-1 rounded-lg ${chart === "candle" ? "bg-primaryBg" : ""}`}>
                <Image width={24} height={24} src='/images/candlechart.svg' alt='Line'/>
              </button>
            </div>
            {/* Filter Buttons for Intervals */}
            <div className="flex items-center bg-[#F7F7F7] rounded-lg p-1">
              {intervals.map((interval) => (
                <button
                  key={interval}
                  onClick={() => changeInterval(interval)}
                  className={`px-3 py-1 rounded-lg text-black font-sansMedium ${selectedInterval === interval ? "bg-primaryBg" : ""}`}
                >
                  {interval}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Conditional Rendering of Charts */}
        {chart === "line" && <LineChart loading={loading} data={chartData} selectedInterval={selectedInterval} fullScreen={fullScreen} />}
        {chart === "candle" && <CandlestickChart loading={loading} data={chartData} selectedInterval={selectedInterval} fullScreen={fullScreen} />}
      </div>
    </div>
  );
};

export default ChartView;