'use client';
import { lazy, Suspense, useState, useEffect } from "react";
import ProfileLogo from "@/components/ProfileLogo"
import { useSearchParams, useRouter } from "next/navigation";
import { useSymbol } from '@/context/SymbolContext';
import { useWatchlist } from '@/context/WatchlistContext';
import ChartView from "./components/ChartView";
import UserSettings from "./components/Settings";
import News from "./components/news";
import Earnings_Calendar from "@/app/dashboard/components/EarningsCalendar";
import InsiderTransactions from "./components/InsiderTransactions";
import IPOsCalendar from "./components/IposCalendar";
import TopGainersLosers from "./components/TopGainers&Losers";
import WatchList from "./components/Watchlist";
import Level2 from "./components/Level2";
import Historical_Summary from "@/app/dashboard/components/Historical";
import Trades from "@/app/dashboard/components/Trades";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import SearchBar from "@/components/SearchBar";
import MainLoader from "@/loaders&errors_UI/mian_loader";
import Logo from '@/components/Logo';
import axios from 'axios';
import LogInPopup from "@/components/loginPopup";
import NewsLetterPopup from "@/components/NewsLetterPopup";
// import CandlestickChart from "./components/CandlestickChart";
// import dynamic from 'next/dynamic';

// const CandlestickChart = dynamic(() => import('./components/CandlestickChart'), { ssr: false });
// const LineChart = dynamic(() => import('./components/LineChart'), { ssr: false });
// const Earnings_Calendar = lazy(() => import("@/components/EarningsCalendar"));

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function DashBoard() {
  return (
    <Suspense fallback={<MainLoader Zindex={40} />}>
      <DashboardContent />
    </Suspense>
  )
}

function DashboardContent() {

  const token = Cookies.get("authToken");
  const searchParams = useSearchParams();
  const { watchlist, fetchWatchlist, loading, error } = useWatchlist();
  const router = useRouter();
  const { setSymbol } = useSymbol();
  const [settings, setSettings] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  // Get query parameters directly from useSearchParams
  const symbol = searchParams.get('symbol') || 'AAPL';
  const view = searchParams.get('view') || 'chart';

  // Sync symbol from search params to global context
  useEffect(() => {
    setSymbol(symbol);
  }, [symbol, setSymbol]);

  // State to manage sidebar visibility
  const [sidebarHide, setSidebarHide] = useState(false);
  // State to indicate whether the initial check is done
  const [isInitialized, setIsInitialized] = useState(false);
  // State to manage watchlistHide visibility
  const [watchlistHide, setWatchlistHide] = useState(false);
  // State to manage searchbar visibility
  const [isSearchBar, setIsSearchBar] = useState(false);

  // First Sidebar Render conditionally
  useEffect(() => {
    // Check sessionStorage first
    const storedSidebarState = sessionStorage.getItem("sidebarHide");

    if (storedSidebarState !== null) {
      setSidebarHide(storedSidebarState === "true"); // Override with sessionStorage
    } else {
      // Apply media query conditions if sessionStorage is empty
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1536) {
        setSidebarHide(false);
      } else if (screenWidth >= 1024) {
        setSidebarHide(true);
      } else {
        setSidebarHide(false);
      }

      // Store the default value in sessionStorage
      sessionStorage.setItem("sidebarHide", sidebarHide.toString());
    }

    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for window resize and update the sidebar state dynamically
  useEffect(() => {
    const handleResize = () => {
      if (sessionStorage.getItem("sidebarHide") === null) {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1536) {
          setSidebarHide(false);
        } else if (screenWidth >= 1024) {
          setSidebarHide(true);
        } else {
          setSidebarHide(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check if a value exists in sessionStorage
    const storedSidebarState = sessionStorage.getItem("watchlistHide");
    if (storedSidebarState !== null) {
      setWatchlistHide(storedSidebarState === "true"); // Convert string to boolean
    } else {
      sessionStorage.setItem("watchlistHide", "false"); // Default value
      setWatchlistHide(false);
    }

    // Mark initialization as complete
    setIsInitialized(true);
  }, []);

  // when watchlist is empty this is close automatically if it's not it will not close
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 1024; // Check if screen is smaller than 1024px
  
      if (!watchlist) {
        setWatchlistHide(!isSmallScreen); // Hide on large screens, show on small
      } else if (watchlist && !isSmallScreen) {
        setWatchlistHide(isSmallScreen); // Show on large screens, hide on small
      } else if (watchlist && isSmallScreen) {
        setWatchlistHide(!isSmallScreen);
      }
    };
  
    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize); // Listen for screen resize
  
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, [watchlist]);

  // Function to update the Sidebar
  const toggleSidebar = () => {
    setSidebarHide((prev) => {
      const newState = !prev;
      sessionStorage.setItem("sidebarHide", newState.toString());
      return newState;
    });
  };

  // addWatchlist
  const addWatchlist = () => {
    setIsSearchBar(true);
  };

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

  // Render nothing or a placeholder while checking sessionStorage
  if (!isInitialized) {
    return null; // You can return a loader or skeleton if needed
  }

  // Function to update the URL while retaining existing values
  const updateUrl = (newSymbol, newView) => {
    const params = new URLSearchParams(searchParams); // Start with current params
    if (newSymbol) params.set('symbol', newSymbol);
    if (newView) params.set('view', newView);

    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <section className={`${view === 'chart' ? 'bg-primaryBg' : ''}bg-dashboardBg w-full flex flex-col h-[100dvh] overflow-hidden relative scrollbar-hide`}>
      <LogInPopup/>
      {/* Nav bar start */}
      <nav className="flex-shrink-0 w-full flex items-center lg:gap-1 gap-2 bg-primaryBg p-3 border-b border-black/5">
        <div title="Toggel Sidebar" onClick={toggleSidebar} className={`flex-shrink-0 relative flex items-center justify-between transition-width duration-300 ease-in-out ${sidebarHide ? 'lg:w-[5.5rem] w-max' : 'lg:w-[15rem] w-max'}`}>
          <div className="cursor-pointer flex items-center gap-2">
            <Image src="/images/favicon.png" width={48} height={48} alt='Stockverse Logo' />
            <p className={`max-lg:hidden font-sansMedium text-primaryTextColor text-xl ${sidebarHide ? 'hidden' : 'visible'}`}>StockVerse</p>
          </div>
          <Image className={`cursor-pointer transition-transform duration-300 ${sidebarHide ? 'lg:rotate-180 rotate-0' : 'lg:rotate-0 rotate-180'}`} src="/images/sidebar_toggle.png" width={36} height={36} alt='Stockverse Logo' />
        </div>
        <div onClick={() => setIsSearchBar(true)} className="flex-grow xl:ml-4 lg:max-w-[20rem] relative">
          <Image className="absolute top-2.5 left-3" src='/images/search.svg' width={18} height={18} alt="search logo"></Image>
          <input
            type="email"
            id="email"
            autoComplete="email"
            readOnly
            placeholder="Search Stocks"
            required
            className="w-full text-sm px-2 pl-10 py-2 border bg-primaryBg text-primaryTextColor border-primaryTextColor/10 rounded-lg focus:outline-none"
          />
        </div>
        <SearchBar isVisible={isSearchBar} setIsvisible={setIsSearchBar} updateUrl={updateUrl} />
        <Link href='/stockverse-gpt' target="_blank" className="max-lg:hidden flex items-center gap-2 px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
          StockVerse Gpt
          {/* <span className="-rotate-45">&rarr;</span> */}
        </Link>
        <Link href='/cvkd' className="max-lg:hidden flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
          Stock Picks
        </Link>
        <Link href='' onClick={() => setNewsletter(true)} className="max-lg:hidden flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
          Newsletter
        </Link>
        <Link href='/pricing' className="max-lg:hidden flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
          Pricing
        </Link>
        <div className="ml-auto">
          <ProfileLogo settings={settings} setSettings={setSettings} />
        </div>
      </nav>
      {/* Nav bar end */}
      
      <div className="w-full flex-1 min-h-0 flex items-start">
        {/* side bar start */}
        <aside className={`transition-width flex-shrink-0 overflow-x-hidden py-4 flex flex-col h-full border-r border-black/5 bg-primaryBg z-10 overflow-y-scroll scrollbar-thin max-lg:absolute transition duration-300 ease-in-out ${sidebarHide ? 'w-[4rem] max-lg:w-max max-lg:translate-x-[0]' : 'lg:w-[16rem] max-lg:w-max max-lg:translate-x-[-900px]'}`}>
          <div title="Chart View" onClick={() => updateUrl(undefined, 'chart')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'chart' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_19260_6154)">
                <path d="M11.625 2.625V1.5M14.5795 3.4205L15.375 2.625M15.3827 6.375H16.5077M16.463 9.75C16.0867 13.54 12.889 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 5.11099 4.46001 1.91332 8.25 1.53703M9 6H12V9M11.7148 6C9.949 8.49569 7.03977 10.125 3.75 10.125C2.99782 10.125 2.26554 10.0398 1.56227 9.87859" stroke={view === 'chart' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_19260_6154">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className={`font-sansMedium text-md ${view === 'chart' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Chart</p>
          </div>
          <div title="Top Gainers & Losers" onClick={() => updateUrl(undefined, 'gainers_losers')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'gainers_losers' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 5.25L10.5985 11.1515C10.3015 11.4485 10.153 11.597 9.98176 11.6526C9.83113 11.7016 9.66887 11.7016 9.51824 11.6526C9.34699 11.597 9.19848 11.4485 8.90147 11.1515L6.84853 9.09853C6.55152 8.80152 6.40301 8.65301 6.23176 8.59737C6.08113 8.54842 5.91887 8.54842 5.76824 8.59737C5.59699 8.65301 5.44848 8.80152 5.15147 9.09853L1.5 12.75M16.5 5.25H11.25M16.5 5.25V10.5" stroke={view === 'gainers_losers' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={`font-sansMedium text-md ${view === 'gainers_losers' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Top Gainers & Losers</p>
          </div>
          <div title="News" onClick={() => updateUrl(undefined, 'news')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'news' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.75014 1.5L3.07023 9.51589C2.80863 9.82982 2.67782 9.98678 2.67582 10.1193C2.67409 10.2346 2.72544 10.3442 2.81508 10.4167C2.9182 10.5 3.12252 10.5 3.53117 10.5H9.00014L8.25014 16.5L14.93 8.48411C15.1917 8.17018 15.3225 8.01322 15.3245 7.88065C15.3262 7.76541 15.2748 7.65577 15.1852 7.58333C15.0821 7.5 14.8778 7.5 14.4691 7.5H9.00014L9.75014 1.5Z" stroke={view === 'news' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={`font-sansMedium text-md ${view === 'news' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>News</p>
          </div>
          <div title="Ipo Calendar" onClick={() => updateUrl(undefined, 'ipo_calendar')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'ipo_calendar' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.5 6.75C13.9142 6.75 14.25 7.08579 14.25 7.5V15C14.25 15.4142 13.9142 15.75 13.5 15.75C13.0858 15.75 12.75 15.4142 12.75 15V7.5C12.75 7.08579 13.0858 6.75 13.5 6.75Z" stroke={view === 'ipo_calendar' ? 'rgba(var(--primary-main))' : 'black'} />
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 9.75C4.91421 9.75 5.25 10.0858 5.25 10.5V15C5.25 15.4142 4.91421 15.75 4.5 15.75C4.08579 15.75 3.75 15.4142 3.75 15V10.5C3.75 10.0858 4.08579 9.75 4.5 9.75Z" stroke={view === 'ipo_calendar' ? 'rgba(var(--primary-main))' : 'black'} />
              <path fillRule="evenodd" clipRule="evenodd" d="M9 2.25C9.41421 2.25 9.75 2.58579 9.75 3V15C9.75 15.4142 9.41421 15.75 9 15.75C8.58579 15.75 8.25 15.4142 8.25 15V3C8.25 2.58579 8.58579 2.25 9 2.25Z" stroke={view === 'ipo_calendar' ? 'rgba(var(--primary-main))' : 'black'} />
            </svg>
            <p className={`font-sansMedium text-md ${view === 'ipo_calendar' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>IPO Calendar</p>
          </div>
          <div title="Earnings Calendar" onClick={() => updateUrl(undefined, 'earnings_calendar')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'earnings_calendar' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.75 7.5H2.25M12 1.5V4.5M6 1.5V4.5M5.85 16.5H12.15C13.4101 16.5 14.0402 16.5 14.5215 16.2548C14.9448 16.039 15.289 15.6948 15.5048 15.2715C15.75 14.7902 15.75 14.1601 15.75 12.9V6.6C15.75 5.33988 15.75 4.70982 15.5048 4.22852C15.289 3.80516 14.9448 3.46095 14.5215 3.24524C14.0402 3 13.4101 3 12.15 3H5.85C4.58988 3 3.95982 3 3.47852 3.24524C3.05516 3.46095 2.71095 3.80516 2.49524 4.22852C2.25 4.70982 2.25 5.33988 2.25 6.6V12.9C2.25 14.1601 2.25 14.7902 2.49524 15.2715C2.71095 15.6948 3.05516 16.039 3.47852 16.2548C3.95982 16.5 4.58988 16.5 5.85 16.5Z" stroke={view === 'earnings_calendar' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={`font-sansMedium text-md ${view === 'earnings_calendar' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Earnings Calendar</p>
          </div>
          <div title="Insider Transactions" onClick={() => updateUrl(undefined, 'insider_transactions')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'insider_transactions' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 8.65104C8.42515 8.11632 9.57476 8.11632 10.4999 8.65104M6.62132 6.87868C7.79289 8.05025 7.79289 9.94974 6.62132 11.1213C5.44975 12.2929 3.55026 12.2929 2.37868 11.1213C1.20711 9.94975 1.20711 8.05026 2.37868 6.87868C3.55025 5.70711 5.44974 5.70711 6.62132 6.87868ZM15.6213 6.87868C16.7929 8.05025 16.7929 9.94974 15.6213 11.1213C14.4498 12.2929 12.5503 12.2929 11.3787 11.1213C10.2071 9.94975 10.2071 8.05026 11.3787 6.87868C12.5502 5.70711 14.4497 5.70711 15.6213 6.87868Z" stroke={view === 'insider_transactions' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={`font-sansMedium text-md ${view === 'insider_transactions' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Insider Transactions</p>
          </div>
          <div title="Historical Data" onClick={() => updateUrl(undefined, 'historical')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'historical' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 1.70215V4.80005C10.5 5.22009 10.5 5.43011 10.5817 5.59055C10.6537 5.73167 10.7684 5.8464 10.9095 5.91831C11.0699 6.00005 11.28 6.00005 11.7 6.00005H14.7979M6 11.25V13.5M12 9.75V13.5M9 7.875V13.5M15 7.49117V12.9C15 14.1601 15 14.7902 14.7548 15.2715C14.539 15.6948 14.1948 16.039 13.7715 16.2548C13.2902 16.5 12.6601 16.5 11.4 16.5H6.6C5.33988 16.5 4.70982 16.5 4.22852 16.2548C3.80516 16.039 3.46095 15.6948 3.24524 15.2715C3 14.7902 3 14.1601 3 12.9V5.1C3 3.83988 3 3.20982 3.24524 2.72852C3.46095 2.30516 3.80516 1.96095 4.22852 1.74524C4.70982 1.5 5.33988 1.5 6.6 1.5H9.00883C9.55916 1.5 9.83432 1.5 10.0933 1.56217C10.3229 1.61729 10.5423 1.7082 10.7436 1.83156C10.9707 1.9707 11.1653 2.16527 11.5544 2.55442L13.9456 4.94558C14.3347 5.33473 14.5293 5.5293 14.6684 5.75636C14.7918 5.95767 14.8827 6.17715 14.9378 6.40673C15 6.66568 15 6.94084 15 7.49117Z" stroke={view === 'historical' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={`font-sansMedium text-md ${view === 'historical' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Historical</p>
          </div>
          <div title="Watch List" onClick={() => updateUrl(undefined, 'watchlist')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'watchlist' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.46199 2.58993C8.63485 2.23972 8.72128 2.06462 8.83862 2.00867C8.94071 1.96 9.05931 1.96 9.1614 2.00867C9.27874 2.06462 9.36517 2.23972 9.53804 2.58993L11.178 5.9124C11.2291 6.01579 11.2546 6.06748 11.2919 6.10762C11.3249 6.14316 11.3645 6.17195 11.4085 6.1924C11.4582 6.21551 11.5152 6.22384 11.6293 6.24052L15.2977 6.77672C15.684 6.83318 15.8772 6.86141 15.9666 6.95577C16.0444 7.03786 16.0809 7.15066 16.0661 7.26277C16.0491 7.39162 15.9093 7.52782 15.6296 7.80022L12.9761 10.3848C12.8934 10.4653 12.852 10.5056 12.8253 10.5535C12.8017 10.596 12.7865 10.6426 12.7807 10.6908C12.7741 10.7453 12.7838 10.8022 12.8034 10.916L13.4295 14.5665C13.4955 14.9516 13.5285 15.1441 13.4665 15.2583C13.4125 15.3577 13.3165 15.4274 13.2053 15.448C13.0775 15.4717 12.9046 15.3808 12.5588 15.199L9.27928 13.4743C9.1771 13.4206 9.12601 13.3937 9.07218 13.3832C9.02452 13.3738 8.9755 13.3738 8.92784 13.3832C8.87402 13.3937 8.82293 13.4206 8.72074 13.4743L5.44119 15.199C5.09544 15.3808 4.92256 15.4717 4.79473 15.448C4.68351 15.4274 4.58754 15.3577 4.53355 15.2583C4.4715 15.1441 4.50452 14.9516 4.57056 14.5665L5.19666 10.916C5.21618 10.8022 5.22594 10.7453 5.21934 10.6908C5.21349 10.6426 5.19833 10.596 5.1747 10.5535C5.14802 10.5056 5.10666 10.4653 5.02394 10.3848L2.37042 7.80022C2.09075 7.52782 1.95091 7.39162 1.93389 7.26277C1.91909 7.15066 1.95567 7.03786 2.03344 6.95577C2.12283 6.86141 2.31598 6.83318 2.70228 6.77672L6.37073 6.24052C6.48482 6.22384 6.54186 6.21551 6.59154 6.1924C6.63552 6.17195 6.67512 6.14316 6.70814 6.10762C6.74543 6.06748 6.77095 6.01579 6.82198 5.9124L8.46199 2.58993Z" stroke={view === 'watchlist' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={`font-sansMedium text-md ${view === 'watchlist' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Watch List</p>
          </div>
          <div title="Trades" onClick={() => updateUrl(undefined, 'trades')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'trades' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_19251_325)">
                <path d="M4.5 4.5L6 3M6 3L4.5 1.5M6 3H4.5C2.84315 3 1.5 4.34315 1.5 6M13.5 13.5L12 15M12 15L13.5 16.5M12 15H13.5C15.1569 15 16.5 13.6569 16.5 12M10.0629 10.0629C10.6496 10.3431 11.3065 10.5 12 10.5C14.4853 10.5 16.5 8.48528 16.5 6C16.5 3.51472 14.4853 1.5 12 1.5C9.51472 1.5 7.5 3.51472 7.5 6C7.5 6.69354 7.65689 7.35043 7.93712 7.93712M10.5 12C10.5 14.4853 8.48528 16.5 6 16.5C3.51472 16.5 1.5 14.4853 1.5 12C1.5 9.51472 3.51472 7.5 6 7.5C8.48528 7.5 10.5 9.51472 10.5 12Z" stroke={view === 'trades' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_19251_325">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className={`font-sansMedium text-md ${view === 'trades' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Trades</p>
          </div>
          <div title="Level 2" onClick={() => updateUrl(undefined, 'level2')} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'level2' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.5 6.75C13.9142 6.75 14.25 7.08579 14.25 7.5V15C14.25 15.4142 13.9142 15.75 13.5 15.75C13.0858 15.75 12.75 15.4142 12.75 15V7.5C12.75 7.08579 13.0858 6.75 13.5 6.75Z" stroke={view === 'level2' ? 'rgba(var(--primary-main))' : 'black'} />
              <path fillRule="evenodd" clipRule="evenodd" d="M4.5 9.75C4.91421 9.75 5.25 10.0858 5.25 10.5V15C5.25 15.4142 4.91421 15.75 4.5 15.75C4.08579 15.75 3.75 15.4142 3.75 15V10.5C3.75 10.0858 4.08579 9.75 4.5 9.75Z" stroke={view === 'level2' ? 'rgba(var(--primary-main))' : 'black'} />
              <path fillRule="evenodd" clipRule="evenodd" d="M9 2.25C9.41421 2.25 9.75 2.58579 9.75 3V15C9.75 15.4142 9.41421 15.75 9 15.75C8.58579 15.75 8.25 15.4142 8.25 15V3C8.25 2.58579 8.58579 2.25 9 2.25Z" stroke={view === 'level2' ? 'rgba(var(--primary-main))' : 'black'} />
            </svg>
            <p className={`font-sansMedium text-md ${view === 'level2' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Level 2</p>
          </div>
          <Link href='/stockverse-gpt' target="_blank" title="Stockverse Gpt" className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'stockverse_gpt' ? 'border-primaryMain' : 'border-white'}`}>
            <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.75014 1.5L3.07023 9.51589C2.80863 9.82982 2.67782 9.98678 2.67582 10.1193C2.67409 10.2346 2.72544 10.3442 2.81508 10.4167C2.9182 10.5 3.12252 10.5 3.53117 10.5H9.00014L8.25014 16.5L14.93 8.48411C15.1917 8.17018 15.3225 8.01322 15.3245 7.88065C15.3262 7.76541 15.2748 7.65577 15.1852 7.58333C15.0821 7.5 14.8778 7.5 14.4691 7.5H9.00014L9.75014 1.5Z" stroke={view === 'stockverse_gpt' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={`font-sansMedium text-md ${view === 'stockverse_gpt' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Stockverse Gpt</p>
          </Link>
          {/* user profile related links */}
          <div className="mt-auto flex flex-col">
            <div title="Settings" onClick={() => setSettings(true)} className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'settings' ? 'border-primaryMain' : 'border-white'}`}>
              <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.04677 14.5283L7.4851 15.5142C7.61541 15.8076 7.82806 16.057 8.09727 16.232C8.36648 16.4069 8.68069 16.5001 9.00177 16.5C9.32285 16.5001 9.63706 16.4069 9.90627 16.232C10.1755 16.057 10.3881 15.8076 10.5184 15.5142L10.9568 14.5283C11.1128 14.1785 11.3753 13.8869 11.7068 13.695C12.0404 13.5026 12.4263 13.4206 12.8093 13.4608L13.8818 13.575C14.201 13.6088 14.5232 13.5492 14.8093 13.4035C15.0954 13.2578 15.333 13.0322 15.4934 12.7542C15.6541 12.4763 15.7306 12.1577 15.7137 11.8372C15.6969 11.5166 15.5873 11.2079 15.3984 10.9483L14.7634 10.0758C14.5373 9.76285 14.4165 9.38611 14.4184 9C14.4184 8.61494 14.5403 8.23976 14.7668 7.92833L15.4018 7.05583C15.5907 6.79632 15.7002 6.48755 15.7171 6.16701C15.7339 5.84646 15.6574 5.52791 15.4968 5.25C15.3363 4.97193 15.0987 4.74637 14.8126 4.60067C14.5265 4.45497 14.2044 4.3954 13.8851 4.42917L12.8126 4.54333C12.4296 4.58356 12.0437 4.50159 11.7101 4.30917C11.3779 4.11619 11.1154 3.82302 10.9601 3.47167L10.5184 2.48583C10.3881 2.19238 10.1755 1.94304 9.90627 1.76805C9.63706 1.59306 9.32285 1.49995 9.00177 1.5C8.68069 1.49995 8.36648 1.59306 8.09727 1.76805C7.82806 1.94304 7.61541 2.19238 7.4851 2.48583L7.04677 3.47167C6.89147 3.82302 6.62892 4.11619 6.29677 4.30917C5.96318 4.50159 5.57727 4.58356 5.19427 4.54333L4.11844 4.42917C3.79918 4.3954 3.47699 4.45497 3.19092 4.60067C2.90485 4.74637 2.6672 4.97193 2.50677 5.25C2.34614 5.52791 2.26961 5.84646 2.28647 6.16701C2.30333 6.48755 2.41286 6.79632 2.60177 7.05583L3.23677 7.92833C3.46323 8.23976 3.58517 8.61494 3.5851 9C3.58517 9.38506 3.46323 9.76024 3.23677 10.0717L2.60177 10.9442C2.41286 11.2037 2.30333 11.5124 2.28647 11.833C2.26961 12.1535 2.34614 12.4721 2.50677 12.75C2.66736 13.0279 2.90504 13.2534 3.19107 13.399C3.4771 13.5447 3.79921 13.6044 4.11844 13.5708L5.19094 13.4567C5.57394 13.4164 5.95985 13.4984 6.29344 13.6908C6.62683 13.8833 6.89059 14.1765 7.04677 14.5283Z" stroke={view === 'settings' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.00043 11.25C10.2431 11.25 11.2504 10.2426 11.2504 9C11.2504 7.75736 10.2431 6.75 9.00043 6.75C7.75779 6.75 6.75043 7.75736 6.75043 9C6.75043 10.2426 7.75779 11.25 9.00043 11.25Z" stroke={view === 'settings' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className={`font-sansMedium text-md ${view === 'settings' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Settings</p>
            </div>
            <Link href='/help-center' title="Help Center" className={`w-max p-3 pl-4 border-l-4 cursor-pointer flex items-center gap-4 ${view === 'help' ? 'border-primaryMain' : 'border-white'}`}>
              <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 13.5V9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9V13.5M4.125 15.75C3.08947 15.75 2.25 14.9105 2.25 13.875V12.375C2.25 11.3395 3.08947 10.5 4.125 10.5C5.16053 10.5 6 11.3395 6 12.375V13.875C6 14.9105 5.16053 15.75 4.125 15.75ZM13.875 15.75C12.8395 15.75 12 14.9105 12 13.875V12.375C12 11.3395 12.8395 10.5 13.875 10.5C14.9105 10.5 15.75 11.3395 15.75 12.375V13.875C15.75 14.9105 14.9105 15.75 13.875 15.75Z" stroke={view === 'help' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className={`font-sansMedium text-md ${view === 'help' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Help Center</p>
            </Link>
            <div title="Upgrade Plan" className={`w-full px-3 pt-4 max-lg:mb-20 ${sidebarHide ? 'lg:hidden' : 'lg:visible'}`}>
              <div className="w-full bg-primaryMain/10 p-2 rounded-xl">
                <div className="w-full flex flex-col gap-4 justify-center bg-upgradeBg px-2 py-4 rounded-lg">
                  <div className="w-full flex items-center gap-2">
                    <Image src='/images/upgrade.svg' width={40} height={40} alt="upgrade"></Image>
                    <p className="text-white font-sansMedium text-lg">Upgrade Plan</p>
                  </div>
                  <Link className='w-full text-center py-2 px-4 bg-primaryBg hover:bg-primaryBg/90 rounded-lg text-black text-md font-sansMedium' href='/pricing'>Click Here</Link>
                </div>
              </div>
            </div>
          </div>
        </aside>
        {/* side bar end */}

        <UserSettings settings={settings} setSettings={setSettings}/>
        <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter}/>

        {/* Dashboard Area */}
        <div className="relative flex flex-col items-center flex-grow max-w-full h-full overflow-y-scroll scrollbar-thin">
          {/* View Case sensitive data that changes */}
          {(() => {
            switch (view) {
              case 'chart':
                return (
                  <ChartView symbol={symbol} isSearchBar={isSearchBar} watchlistHide={watchlistHide} setWatchlistHide={setWatchlistHide} />
                );
              case 'gainers_losers':
                return (
                  <TopGainersLosers symbol={symbol} />
                );
              case 'news':
                return (
                  <News symbol={symbol} updateUrl={updateUrl}/>
                );
              case 'ipo_calendar':
                return (
                  <IPOsCalendar />
                );
              case 'earnings_calendar':
                return (
                  <Earnings_Calendar symbol={symbol} />
                );
              case 'insider_transactions':
                return (
                  <InsiderTransactions symbol={symbol} />
                );
              case 'historical':
                return (
                  <Historical_Summary symbol={symbol} />
                );
              case 'watchlist':
                return (
                  <WatchList setIsvisible={setIsSearchBar} />
                );
              case 'trades':
                return (
                  <Trades symbol={symbol} />
                );
              case 'level2':
                return (
                  <Level2 symbol={symbol} />
                );
              default:
                return null;
            }
          })()}
        </div>
        {/* Dashboard Area */}

        {/* watchlist side bar start */}
        <aside className={`transition-width flex-shrink-0 overflow-x-hidden flex flex-col h-full border-l border-black/5 bg-primaryBg z-10 max-lg:pb-20 overflow-y-scroll scrollbar-thin max-lg:absolute max-lg:top-15 max-lg:right-0 transition duration-300 ease-in-out ${watchlistHide ? 'w-0 max-lg:w-max max-lg:translate-x-[0]' : 'lg:w-[18rem] max-lg:w-max max-lg:translate-x-[900px]'} ${view === 'chart' ? 'visible' : 'hidden'}`}>
          <div className='min-w-full sticky top-0 bg-primaryBg w-max flex justify-between max-lg:gap-8 items-center p-3 border-b border-black/5'>
            <h1 className='font-sansMedium text-lg sm:text-lg text-primaryTextColor'>My watchlist</h1>
            <button onClick={addWatchlist} className='text-base text-primaryMain font-sansMeium rounded-lg'>+ Add</button>
          </div>
          {watchlist && watchlist.length > 0 && watchlist.map((stock, index) => (
            <div className='min-w-full w-max flex justify-between max-lg:gap-8 items-center p-3' key={`${stock.ticker}`}>
              <div onClick={() => updateUrl(stock.ticker, 'chart')} className='flex gap-2 items-center cursor-pointer'>
                <Logo symbol={stock.ticker} alt={stock.name} size={300} className="w-10 h-10 rounded-lg shadow" />
                <div className=''>
                  <h2 className='text-base leading-[110%] font-sansMedium text-primaryTextColor'>{stock.ticker || 'N/A'}</h2>
                  <p className='text-xs font-sansRegular leading-[100%] text-primaryTextColor/60'>
                    {stock.name ? (stock.name.includes(" ") ? stock.name.split(" ")[0] : stock.name) : "Undefined"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="text-right">
                  <p className="font-sansMedium text-md">${stock.price}</p>
                  <p className={`font-sansMedium text-xs ${stock.todaysChangePerc >= 0 ? 'text-buy' : 'text-sell'}`}>
                    {stock.todaysChangePerc >= 0 ? `+${stock.todaysChangePerc.toFixed(2)}%` : `${stock.todaysChangePerc.toFixed(2)}%`}
                  </p>
                </div>
                <Image onClick={() => handleSubmitWatchList(stock.ticker)} className='cursor-pointer' src='/images/cross.svg' width={24} height={24} alt='remove' />
              </div>
            </div>
          ))}
        </aside>
        {/* watchlist side bar end */}
      </div>
    </section>
  );
}