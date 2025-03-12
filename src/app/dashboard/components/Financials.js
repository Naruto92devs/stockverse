import TickerInfo from "./TickerOverview";

const Financials = ({ symbol, watchlistHide, setWatchlistHide }) => {

  return (
    <div className="w-full h-full flex flex-col items-start">
      <TickerInfo watchlistHide={watchlistHide} setWatchlistHide={setWatchlistHide} />
      <h1>Financials</h1>
    </div>
  );
};

export default Financials;