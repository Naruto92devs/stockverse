import TickerInfo from "./TickerOverview";

const ChartView = ({symbol, watchlistHide, setWatchlistHide}) => {

  return (
    <div className="w-full">
      <TickerInfo watchlistHide={watchlistHide} setWatchlistHide={setWatchlistHide}/>
    </div>
  );
};

export default ChartView;