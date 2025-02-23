import { useState } from "react";
import { useTickerDetails } from "@/context/TickerDetailsContext";
import { useWatchlist } from '@/context/WatchlistContext';
import Image from "next/image";
import Logo from "@/components/Logo";
import axios from "axios";

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

// Utility function to truncate a string after a certain number of words
const truncateDescription = (description, wordLimit) => {
  const words = description.split(' ');
  if (words.length > wordLimit) {
    return {
      truncated: words.slice(0, wordLimit).join(' '),
      isTruncated: true,
    };
  }
  return {
    truncated: description,
    isTruncated: false,
  };
};

const TickerInfo = ({watchlistHide, setWatchlistHide}) => {
  const { tickerDetails, loading, error } = useTickerDetails();
  const { watchlist, fetchWatchlist } = useWatchlist();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isInWatchlist = watchlist?.some((item) => item.ticker === tickerDetails?.ticker);

  const handleSubmitWatchList = async (symbol) => {
    try {
      const response = await axios.post(`${STOCKVERSE_BACK_END}/watchlist`, {
        symbol,
      }, {
        withCredentials: true,
      });

      const data = response.data;
      console.log(data);
      if (response.status === 207) {
        fetchWatchlist();
      } else if (response.status === 200) {
        fetchWatchlist();
      }
    } catch (error) {
      console.error('Error during watchlist submission:', error);
    }
  };

  // Ensure stockData is available before accessing Description
  const { truncated, isTruncated } = tickerDetails
    ? truncateDescription(tickerDetails?.description, 60) // 30 word limit
    : { truncated: '', isTruncated: false };

    const toggleWatchlist = () => {
      setWatchlistHide((prev) => {
        const newState = !prev;
        sessionStorage.setItem("watchlistHide", newState.toString());
        return newState;
      });
    };

  if (loading && !tickerDetails) return (
    <div className="w-full px-4 py-2 border-b border-black/5">
      <div className={`w-full flex gap-2 justify-end ${watchlistHide ? 'max-lg:pr-[15%]' : ''}`}>
        <h3 onClick={toggleWatchlist} className="max-lg:hidden cursor-pointer font-sansMedium bg-primaryMain rounded-full px-3 py-1.5 text-sm text-white">
          {watchlistHide ? 'Show Watchlist' : 'Hide Watchlist'}
        </h3>
        <h3 onClick={toggleWatchlist} className="lg:hidden cursor-pointer font-sansMedium bg-primaryMain rounded-full px-3 py-1.5 text-sm text-white">
          {watchlistHide ? 'Hide Watchlist' : 'Show Watchlist'}
        </h3>
        <div className="font-sansMedium cursor-pointer flex items-center gap-2 hover:bg-primaryMain/5 rounded-full px-3 py-1.5 text-sm text-black">
          Watch Stock
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.33353 13.9997H6.66687M1.52943 3.8796C1.51986 2.91204 2.04152 2.00851 2.88423 1.53301M14.4683 3.87961C14.4779 2.91204 13.9562 2.00851 13.1135 1.53301M12.0002 5.33301C12.0002 4.27214 11.5788 3.25473 10.8286 2.50458C10.0785 1.75444 9.06106 1.33301 8.0002 1.33301C6.93933 1.33301 5.92192 1.75444 5.17177 2.50458C4.42163 3.25473 4.0002 4.27214 4.0002 5.33301C4.0002 7.39313 3.48051 8.80365 2.89998 9.73662C2.41028 10.5236 2.16544 10.9171 2.17442 11.0268C2.18436 11.1484 2.21011 11.1947 2.30805 11.2674C2.3965 11.333 2.79526 11.333 3.59277 11.333H12.4076C13.2051 11.333 13.6039 11.333 13.6923 11.2674C13.7903 11.1947 13.816 11.1484 13.826 11.0268C13.835 10.9171 13.5901 10.5236 13.1004 9.73662C12.5199 8.80365 12.0002 7.39313 12.0002 5.33301Z"
              stroke="black"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="w-full flex items-start gap-4 py-2">
        <Image
          width={100}
          height={100}
          src="/images/favicon.png"
          alt="logo"
          className="w-16 h-16 rounded-xl shadow max-lg:hidden"
        />
        <div className="flex flex-grow flex-col gap-2 items-start">
          <div className="flex flex-wrap w-full items-center gap-2">
            <Image
              width={100}
              height={100}
              src="/images/favicon.png" // Fixed "symbol" to "src"
              alt="logo"
              className="w-12 h-12 rounded-xl shadow lg:hidden"
            />
            <h1 className="font-sansMedium text-xl">N/A</h1>
            <h2 className="font-sansRegular text-sm text-black/50">Undefined</h2>
            <h3 className="font-sansMedium bg-primaryMain rounded-full px-3 py-1.5 text-sm text-white">Undefined</h3>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {[
              { src: '/images/marketcap.svg', label: 'Market Cap', value: 'N/A' },
              { src: '/images/dollar.svg', label: 'Price', value: 'N/A' },
              { src: '/images/volume.svg', label: 'Volume', value: 'N/A' },
              { src: '/images/sector.svg', label: 'Sector', value: 'Undefined' },
            ].map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                {item.src ? (
                  <Image width={24} height={24} src={item.src} alt={item.label} />
                ) : null}
                <h4 className="text-bsae font-sansRegular text-black/50">{item.label}</h4>
                <h4 className="text-bsae font-sansMedium text-black">{item.value}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="pt-4 text-base font-sansRegular">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );
  if (error) return (
    <div className="w-full px-4 py-2 border-b border-black/5">
      <div className={`w-full flex gap-2 justify-end ${watchlistHide ? 'max-lg:pr-[15%]' : ''}`}>
        <h3 onClick={toggleWatchlist} className="max-lg:hidden cursor-pointer font-sansMedium bg-primaryMain rounded-full px-3 py-1.5 text-sm text-white">
          {watchlistHide ? 'Show Watchlist' : 'Hide Watchlist'}
        </h3>
        <h3 onClick={toggleWatchlist} className="lg:hidden cursor-pointer font-sansMedium bg-primaryMain rounded-full px-3 py-1.5 text-sm text-white">
          {watchlistHide ? 'Hide Watchlist' : 'Show Watchlist'}
        </h3>
        <div className="font-sansMedium cursor-pointer flex items-center gap-2 hover:bg-primaryMain/5 rounded-full px-3 py-1.5 text-sm text-black">
          Watch Stock
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.33353 13.9997H6.66687M1.52943 3.8796C1.51986 2.91204 2.04152 2.00851 2.88423 1.53301M14.4683 3.87961C14.4779 2.91204 13.9562 2.00851 13.1135 1.53301M12.0002 5.33301C12.0002 4.27214 11.5788 3.25473 10.8286 2.50458C10.0785 1.75444 9.06106 1.33301 8.0002 1.33301C6.93933 1.33301 5.92192 1.75444 5.17177 2.50458C4.42163 3.25473 4.0002 4.27214 4.0002 5.33301C4.0002 7.39313 3.48051 8.80365 2.89998 9.73662C2.41028 10.5236 2.16544 10.9171 2.17442 11.0268C2.18436 11.1484 2.21011 11.1947 2.30805 11.2674C2.3965 11.333 2.79526 11.333 3.59277 11.333H12.4076C13.2051 11.333 13.6039 11.333 13.6923 11.2674C13.7903 11.1947 13.816 11.1484 13.826 11.0268C13.835 10.9171 13.5901 10.5236 13.1004 9.73662C12.5199 8.80365 12.0002 7.39313 12.0002 5.33301Z"
              stroke="black"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="w-full flex items-start gap-4 py-2">
        <Image
          width={100}
          height={100}
          src="/images/favicon.png"
          alt="logo"
          className="w-16 h-16 rounded-xl shadow max-lg:hidden"
        />
        <div className="flex flex-grow flex-col gap-2 items-start">
          <div className="flex flex-wrap w-full items-center gap-2">
            <Image
              width={100}
              height={100}
              src="/images/favicon.png" // Fixed "symbol" to "src"
              alt="logo"
              className="w-12 h-12 rounded-xl shadow lg:hidden"
            />
            <h1 className="font-sansMedium text-xl">N/A</h1>
            <h2 className="font-sansRegular text-sm text-black/50">Undefined</h2>
            <h3 className="font-sansMedium bg-primaryMain rounded-full px-3 py-1.5 text-sm text-white">Undefined</h3>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {[
              { src: '/images/marketcap.svg', label: 'Market Cap', value: 'N/A' },
              { src: '/images/dollar.svg', label: 'Price', value: 'N/A' },
              { src: '/images/volume.svg', label: 'Volume', value: 'N/A' },
              { src: '/images/sector.svg', label: 'Sector', value: 'Undefined' },
            ].map((item, index) => (
              <div key={index} className="flex gap-2 items-center">
                {item.src ? (
                  <Image width={24} height={24} src={item.src} alt={item.label} />
                ) : null}
                <h4 className="text-bsae font-sansRegular text-black/50">{item.label}</h4>
                <h4 className="text-bsae font-sansMedium text-black">{item.value}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="pt-4 text-base font-sansRegular">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );

  return (
      <div className="w-full flex-shrink-0 px-4 py-2 border-b border-black/5">
        <div className={`w-full flex gap-2 justify-end ${watchlistHide? 'max-lg:pr-[15%]' : ''}`}>
          <h3 onClick={toggleWatchlist} className="max-lg:hidden cursor-pointer font-sansMedium bg-primaryMain rounded-full px-3 py-1.5 text-sm text-white">{watchlistHide ? 'Show Watchlist' : 'Hide Watchlist'}</h3>
          <h3 onClick={toggleWatchlist} className="lg:hidden cursor-pointer font-sansMedium bg-primaryMain rounded-full px-3 py-1.5 text-sm text-white">{watchlistHide ? 'Hide Watchlist' : 'Show Watchlist'}</h3>
          <div onClick={() => handleSubmitWatchList(tickerDetails?.ticker)} className="font-sansMedium cursor-pointer flex items-center gap-2 hover:bg-primaryMain/5 rounded-full px-3 py-1.5 text-sm text-black">
            Watch Stock
            <svg width="22" height="22" viewBox="0 0 16 16" fill={`${isInWatchlist ? '#634FF7' : 'none'}`} xmlns="http://www.w3.org/2000/svg">
              <path d="M9.33353 13.9997H6.66687M1.52943 3.8796C1.51986 2.91204 2.04152 2.00851 2.88423 1.53301M14.4683 3.87961C14.4779 2.91204 13.9562 2.00851 13.1135 1.53301M12.0002 5.33301C12.0002 4.27214 11.5788 3.25473 10.8286 2.50458C10.0785 1.75444 9.06106 1.33301 8.0002 1.33301C6.93933 1.33301 5.92192 1.75444 5.17177 2.50458C4.42163 3.25473 4.0002 4.27214 4.0002 5.33301C4.0002 7.39313 3.48051 8.80365 2.89998 9.73662C2.41028 10.5236 2.16544 10.9171 2.17442 11.0268C2.18436 11.1484 2.21011 11.1947 2.30805 11.2674C2.3965 11.333 2.79526 11.333 3.59277 11.333H12.4076C13.2051 11.333 13.6039 11.333 13.6923 11.2674C13.7903 11.1947 13.816 11.1484 13.826 11.0268C13.835 10.9171 13.5901 10.5236 13.1004 9.73662C12.5199 8.80365 12.0002 7.39313 12.0002 5.33301Z" stroke={`${isInWatchlist ? '#634FF7' : 'black'}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="w-full flex items-start gap-4 py-2">
          <Logo symbol={tickerDetails?.ticker} alt={tickerDetails?.name} size={300} className="w-16 h-16 rounded-xl shadow max-lg:hidden" />
          <div className="flex flex-grow flex-col gap-2 items-start">
            <div className="flex flex-wrap w-full items-center gap-2">
              <Logo symbol={tickerDetails?.ticker} alt={tickerDetails?.name} size={300} className="w-12 h-12 rounded-xl shadow lg:hidden" />
              <h1 className="font-sansMedium text-xl">{tickerDetails?.ticker}</h1>
              <h2 className="font-sansRegular text-sm text-black/50">{tickerDetails?.exchange}</h2>
              <h3 className="font-sansMedium bg-primaryMain rounded-full px-3 py-1.5 text-sm text-white">{tickerDetails?.type}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-2 items-center">
                <Image width={24} height={24} src='/images/marketcap.svg' alt="market cap" />
                <h4 className="text-bsae font-sansRegular text-black/50">Market Cap</h4>
                <h4 className="text-bsae font-sansMedium text-black">{tickerDetails?.market_cap}</h4>
              </div>
              <div className="flex gap-2 items-center">
                <Image width={24} height={24} src='/images/dollar.svg' alt="dollar" />
                <h4 className="text-bsae font-sansRegular text-black/50">Price</h4>
                <h4 className="text-bsae font-sansMedium text-black">{tickerDetails?.closePrice}</h4>
              </div>
              <div className="flex gap-2 items-center">
                <Image width={24} height={24} src='/images/volume.svg' alt="volume" />
                <h4 className="text-bsae font-sansRegular text-black/50">Volume</h4>
                <h4 className="text-bsae font-sansMedium text-black">{tickerDetails?.volume}</h4>
              </div>
              <div className="flex gap-2 items-center">
                <Image width={24} height={24} src='/images/sector.svg' alt="Sector" />
                <h4 className="text-bsae font-sansRegular text-black/50">Sector</h4>
                <h4 className="text-sm font-sansMedium text-black">
                  {tickerDetails?.sic_description ? (tickerDetails?.sic_description.match(/\b\w+\b/g)?.slice(0, 2).join(" ") || tickerDetails?.sic_description) : "Undefined"}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-base font-sansRegular">
          {showFullDescription ? tickerDetails?.description : truncated}
          {isTruncated && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="pl-2 text-base text-primaryMain font-sansMedium hover:underline"
            >
              {showFullDescription ? 'See Less' : 'See More'}
            </button>
          )}
        </p>
      </div>
  );
};

export default TickerInfo;