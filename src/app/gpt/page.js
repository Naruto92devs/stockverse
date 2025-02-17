'use client';
import { lazy, Suspense, useState, useEffect } from "react";
import ProfileLogo from "@/components/ProfileLogo"
import { useSearchParams, useRouter } from "next/navigation";
import { useSymbol } from '@/context/SymbolContext';
import { useWatchlist } from '@/context/WatchlistContext';
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import SearchBar from "@/components/SearchBar";
import MainLoader from "@/loaders&errors_UI/mian_loader";
import Logo from '@/components/Logo';
import axios from 'axios';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function DashBoard() {
  return (
    <Suspense fallback={<MainLoader Zindex={40} />}>
      <StockverseGPT />
    </Suspense>
  )
}

function StockverseGPT() {

  const token = Cookies.get("authToken");
  const searchParams = useSearchParams();
  const { watchlist, fetchWatchlist, loading, error } = useWatchlist();
  const router = useRouter();
  const { setSymbol } = useSymbol();

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

  useEffect(() => {
    // Check if a value exists in sessionStorage
    const storedSidebarState = sessionStorage.getItem("sidebarHide");
    if (storedSidebarState !== null) {
      setSidebarHide(storedSidebarState === "true"); // Convert string to boolean
    } else {
      sessionStorage.setItem("sidebarHide", "false"); // Default value
      setSidebarHide(false);
    }

    // Mark initialization as complete
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Listen for window resize and update the sidebar state dynamically
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

    router.push(`/gpt?${params.toString()}`);
  };

  return (
    <section className={`bg-stockversegptBg bg-cover bg-top-center w-full flex flex-col h-[100dvh] overflow-hidden relative scrollbar-hide`}>
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
        <Link href='/cvkd' className="max-lg:hidden flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
          Stock Picks
        </Link>
        <Link href='' className="max-lg:hidden flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
          Newsletter
        </Link>
        <Link href='/pricing' className="max-lg:hidden flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
          Pricing
        </Link>
        <div className="ml-auto">
          <ProfileLogo />
        </div>
      </nav>
      {/* Nav bar end */}
      <div className="w-full flex-1 min-h-0 flex items-start">
        {/* side bar start */}
        <aside className={`transition-width flex-shrink-0 overflow-x-hidden pt-4 max-lg:pb-16 flex flex-col h-full border-r border-black/5 bg-primaryBg z-10 overflow-y-scroll scrollbar-thin relative max-lg:absolute transition duration-300 ease-in-out ${sidebarHide ? 'w-0 max-lg:w-max max-lg:translate-x-[0]' : 'lg:w-[18rem] max-lg:w-max max-lg:translate-x-[-900px]'}`}>

          {/* user profile related links */}
          <div className="mt-auto sticky w-full bg-primaryBg bottom-0 left-0 flex flex-col">
            <div title="Settings" className={`w-max p-3 pl-4 cursor-pointer flex items-center gap-4`}>
              <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.04677 14.5283L7.4851 15.5142C7.61541 15.8076 7.82806 16.057 8.09727 16.232C8.36648 16.4069 8.68069 16.5001 9.00177 16.5C9.32285 16.5001 9.63706 16.4069 9.90627 16.232C10.1755 16.057 10.3881 15.8076 10.5184 15.5142L10.9568 14.5283C11.1128 14.1785 11.3753 13.8869 11.7068 13.695C12.0404 13.5026 12.4263 13.4206 12.8093 13.4608L13.8818 13.575C14.201 13.6088 14.5232 13.5492 14.8093 13.4035C15.0954 13.2578 15.333 13.0322 15.4934 12.7542C15.6541 12.4763 15.7306 12.1577 15.7137 11.8372C15.6969 11.5166 15.5873 11.2079 15.3984 10.9483L14.7634 10.0758C14.5373 9.76285 14.4165 9.38611 14.4184 9C14.4184 8.61494 14.5403 8.23976 14.7668 7.92833L15.4018 7.05583C15.5907 6.79632 15.7002 6.48755 15.7171 6.16701C15.7339 5.84646 15.6574 5.52791 15.4968 5.25C15.3363 4.97193 15.0987 4.74637 14.8126 4.60067C14.5265 4.45497 14.2044 4.3954 13.8851 4.42917L12.8126 4.54333C12.4296 4.58356 12.0437 4.50159 11.7101 4.30917C11.3779 4.11619 11.1154 3.82302 10.9601 3.47167L10.5184 2.48583C10.3881 2.19238 10.1755 1.94304 9.90627 1.76805C9.63706 1.59306 9.32285 1.49995 9.00177 1.5C8.68069 1.49995 8.36648 1.59306 8.09727 1.76805C7.82806 1.94304 7.61541 2.19238 7.4851 2.48583L7.04677 3.47167C6.89147 3.82302 6.62892 4.11619 6.29677 4.30917C5.96318 4.50159 5.57727 4.58356 5.19427 4.54333L4.11844 4.42917C3.79918 4.3954 3.47699 4.45497 3.19092 4.60067C2.90485 4.74637 2.6672 4.97193 2.50677 5.25C2.34614 5.52791 2.26961 5.84646 2.28647 6.16701C2.30333 6.48755 2.41286 6.79632 2.60177 7.05583L3.23677 7.92833C3.46323 8.23976 3.58517 8.61494 3.5851 9C3.58517 9.38506 3.46323 9.76024 3.23677 10.0717L2.60177 10.9442C2.41286 11.2037 2.30333 11.5124 2.28647 11.833C2.26961 12.1535 2.34614 12.4721 2.50677 12.75C2.66736 13.0279 2.90504 13.2534 3.19107 13.399C3.4771 13.5447 3.79921 13.6044 4.11844 13.5708L5.19094 13.4567C5.57394 13.4164 5.95985 13.4984 6.29344 13.6908C6.62683 13.8833 6.89059 14.1765 7.04677 14.5283Z" stroke={view === 'settings' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.00043 11.25C10.2431 11.25 11.2504 10.2426 11.2504 9C11.2504 7.75736 10.2431 6.75 9.00043 6.75C7.75779 6.75 6.75043 7.75736 6.75043 9C6.75043 10.2426 7.75779 11.25 9.00043 11.25Z" stroke={view === 'settings' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className={`font-sansMedium text-md ${view === 'settings' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Settings</p>
            </div>
            <Link href='/help-center' title="Help Center" className={`w-max p-3 pl-4 max-lg:pb-5 cursor-pointer flex items-center gap-4`}>
              <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 13.5V9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9V13.5M4.125 15.75C3.08947 15.75 2.25 14.9105 2.25 13.875V12.375C2.25 11.3395 3.08947 10.5 4.125 10.5C5.16053 10.5 6 11.3395 6 12.375V13.875C6 14.9105 5.16053 15.75 4.125 15.75ZM13.875 15.75C12.8395 15.75 12 14.9105 12 13.875V12.375C12 11.3395 12.8395 10.5 13.875 10.5C14.9105 10.5 15.75 11.3395 15.75 12.375V13.875C15.75 14.9105 14.9105 15.75 13.875 15.75Z" stroke={view === 'help' ? 'rgba(var(--primary-main))' : 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className={`font-sansMedium text-md ${view === 'help' ? 'text-primaryMain' : 'text-primaryTextColor'}`}>Help Center</p>
            </Link>
          </div>
        </aside>
        {/* side bar end */}

        {/* Dashboard Area */}
        <div className="relative flex flex-col items-center flex-grow max-w-full h-full overflow-y-scroll scrollbar-thin">
          {/* View Case sensitive data that changes */}
          
        </div>
        {/* Dashboard Area */}

        {/* watchlist side bar start */}
        <aside className={`hidden transition-width flex-shrink-0 overflow-x-hidden flex flex-col h-full border-l border-black/5 bg-primaryBg z-10 max-lg:pb-20 overflow-y-scroll scrollbar-thin max-lg:absolute max-lg:top-15 max-lg:right-0 transition duration-300 ease-in-out ${watchlistHide ? 'w-0 max-lg:w-max max-lg:translate-x-[0]' : 'lg:w-[18rem] max-lg:w-max max-lg:translate-x-[900px]'}`}>
          <div className='min-w-full sticky top-0 bg-primaryBg w-max flex justify-between max-lg:gap-8 items-center p-3 border-b border-black/5'>
            <h1 className='font-sansMedium text-lg sm:text-lg text-primaryTextColor'>My watchlist</h1>
            <button onClick={addWatchlist} className='text-base text-primaryMain font-sansMeium rounded-lg'>+ Add</button>
          </div>
          {watchlist && watchlist.length > 0 && watchlist.map((stock, index) => (
            <div className='min-w-full w-max flex justify-between max-lg:gap-8 items-center p-3' key={`${stock.ticker}`}>
              <div className='flex gap-2 items-center'>
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
                  <p className="font-sansMedium text-md">{stock.price ? `$${stock.price}` : 'N/A'}</p>
                  <p className={`font-sansMedium text-xs ${stock.todaysChangePerc >= 0 ? 'text-buy' : 'text-sell'}`}>
                    {stock.todaysChangePerc ? stock.todaysChangePerc >= 0 ? `+${stock.todaysChangePerc.toFixed(2)}%` : `${stock.todaysChangePerc.toFixed(2)}%` : 'N/A'}
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