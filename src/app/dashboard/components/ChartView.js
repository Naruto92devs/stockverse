import TickerInfo from "./TickerOverview";
import LineChart from "./LineChart";
import CandlestickChart from "./CandlestickChart";

const ChartView = ({symbol, watchlistHide, setWatchlistHide, isSearchBar}) => {

  return (
    <div className="w-full h-full flex flex-col items-start">
      <TickerInfo watchlistHide={watchlistHide} setWatchlistHide={setWatchlistHide}/>
      <LineChart ticker={symbol}/>
      <CandlestickChart ticker={symbol}/>
    </div>
  );
};

export default ChartView;