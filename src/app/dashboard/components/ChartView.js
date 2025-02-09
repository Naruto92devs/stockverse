import TickerInfo from "./TickerOverview";

const ChartView = ({symbol, watchlistHide, setWatchlistHide}) => {

  const toggleWatchlist = () => {
    setWatchlistHide((prev) => {
      const newState = !prev;
      sessionStorage.setItem("watchlistHide", newState.toString());
      return newState;
    });
  };

  return (
    <div className="w-full">
      <TickerInfo/>
      <div onClick={toggleWatchlist}>Button</div>
    </div>
  );
};

export default ChartView;