import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNews } from '@/context/NewsContext';
import Image from "next/image";
import Link from "next/link";
import DataNotAvailable from '@/loaders&errors_UI/dataUnavailable';
import RequestError from '@/loaders&errors_UI/requestError';

const usePageSize = () => {
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
      const updatePageSize = () => {
          if (window.matchMedia('(min-width: 2048px)').matches) {
              setPageSize(10); // XL screens
          } else if (window.matchMedia('(min-width: 1560px)').matches) {
              setPageSize(5); // LG screens
          } else if (window.matchMedia('(min-width: 768px)').matches) {
              setPageSize(5); // LG screens
          } else {
              setPageSize(5); // Default for smaller screens
          }
      };

      updatePageSize(); // Run initially
      window.addEventListener('resize', updatePageSize);
      return () => window.removeEventListener('resize', updatePageSize);
  }, []);

  return pageSize;
};

const stockverseNews = [
  {
    id: 1,
    title: "Halozyme Therapeutics in Talks for Major Acquisition by Large Pharma Partner",
    published_utc: "Nov 21 2024 by Rafie",
    image_url: "/images/news_sample.jpg",
    author: "Stockverse",
    article_url: "/neov",
  },
  {
    id: 2,
    title: "Tesla Unveils New Battery Technology with Longer Lifespan",
    published_utc: "Nov 22 2024 by Alex",
    image_url: "/images/news_sample.jpg",
    author: "Stockverse",
    article_url: "/tesla-battery",
  },
  {
    id: 3,
    title: "Apple's Vision Pro Expected to Disrupt AR Market",
    published_utc: "Nov 23 2024 by Emily",
    image_url: "/images/news_sample.jpg",
    author: "Stockverse",
    article_url: "/apple-vision-pro",
  },
  {
    id: 4,
    title: "Microsoft Invests $10 Billion in AI Research Lab",
    published_utc: "Nov 24 2024 by John",
    image_url: "/images/news_sample.jpg",
    author: "Stockverse",
    article_url: "/microsoft-ai",
  },
  {
    id: 5,
    title: "Amazon Expands Cloud Services with New Data Centers",
    published_utc: "Nov 25 2024 by Lisa",
    image_url: "/images/news_sample.jpg",
    author: "Stockverse",
    article_url: "/aws-expansion",
  },
  {
    id: 6,
    title: "Halozyme Therapeutics in Talks for Major Acquisition by Large Pharma Partner",
    published_utc: "Nov 21 2024 by Rafie",
    image_url: "/images/news_sample.jpg",
    author: "Stockverse",
    article_url: "/neov",
  },
  {
    id: 7,
    title: "Tesla Unveils New Battery Technology with Longer Lifespan",
    published_utc: "Nov 22 2024 by Alex",
    image_url: "/images/news_sample.jpg",
    author: "Stockverse",
    article_url: "/tesla-battery",
  },
  {
    id: 8,
    title: "Halozyme Therapeutics in Talks for Major Acquisition by Large Pharma Partner",
    published_utc: "Nov 21 2024 by Rafie",
    image_url: "/images/news_sample.jpg",
    author: "Stockverse",
    article_url: "/neov",
  },
  {
    id: 9,
    title: "Tesla Unveils New Battery Technology with Longer Lifespan",
    published_utc: "Nov 22 2024 by Alex",
    image_url: "/images/news_sample.jpg",
    author: "Stockverse",
    article_url: "/tesla-battery",
  },
];

export default function News({symbol, updateUrl}) {

  const { news, loading, error } = useNews(); // Access insider articles directly
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);
  const activeButtonRef = useRef(null);
  const PAGE_SIZE = usePageSize(); // Get dynamic page size
  
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

  // Divide news into chunks of PAGE_SIZE
  const paginatedData = useMemo(() => {
      if (!news || news.length === 0) return [];
      return news.reduce((result, news, index) => {
          const pageIndex = Math.floor(index / PAGE_SIZE);
          if (!result[pageIndex]) result[pageIndex] = [];
          result[pageIndex].push(news);
          return result;
      }, []);
  }, [news, PAGE_SIZE]);
  
  // Get total pages
  const totalPages = paginatedData.length;

  // Change page handler
  const goToPage = (page) => {
      if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
      }
  };

  const handleSearchClick = (symbol, view) => {
    updateUrl(symbol, view); // Example: Navigate with `symbol` and a specific view
  };

  return (
    <div className="w-full max-h-full overflow-y-auto bg-primaryBg flex flex-col scrollbar-hide">
      {/* Top Banner */}
      <div className="w-full flex-none bg-[#EFEDFE] flex md:flex-row flex-col gap-4 md:items-center justify-between px-[5%] py-8">
        <div className="md:w-[50%] w-full flex flex-col gap-4">
          <h1 className="xl:text-5xl text-4xl font-sansMedium text-primaryTextColor">
            One Stop Shop <br /> <span className="hero_h1">Everything Stocks</span>
          </h1>
          <p className="text-lg font-sansRegular text-primaryTextColor">
            Discover real-time stock data, personalized insights, and AI-driven recommendations tailored to your trading style
          </p>
        </div>
        <div className="md:w-[45%] w-full flex flex-col">
          <Image className="rounded-3xl" width={552} height={291} src="/images/news_banner.jpg" alt="news banner" />
        </div>
      </div>

      {/* Stockverse News & Ticker News */}
      <div  className="w-full lg:min-h-[680px] 2xl:min-h-[350px] flex-grow flex lg:flex-row flex-col">
        {/* Hot Topics */}
        <div className="lg:w-[40%] w-full flex flex-col gap-2 lg:border-r max-lg:border-b border-black/10">
          <h1 className="pt-3 pl-3 text-xl font-sansMedium text-primaryTextColor">Hot Topics</h1>
          <div className="flex flex-col gap-4 lg:overflow-y-auto p-3 scrollbar-thin">
            {stockverseNews.map((news) => (
              <Link key={news.id} href={news.article_url} className="flex items-start gap-3 hover:bg-gray-100 rounded-lg transition">
                <Image className="rounded-xl" src={news.image_url} width={80} height={80} alt={news.title} />
                <div className="">
                  <h2 className="text-sm font-semibold text-primaryTextColor">{news.title}</h2>
                  <p className="text-sm text-gray-500">{news.published_utc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Realtime News Component */}
        <div className="lg:w-[60%] w-full flex flex-col relative">
          <div className='w-full p-3 flex max-xl:flex-col gap-4 items-center justify-between'>
            <div className='xl:w-[50%] w-full'>
              <h1 className="2xl:text-2xl text-xl font-sansMedium text-primaryTextColor">View Market News From Around The World</h1>
            </div>
            <div className='xl:flex-grow w-full flex flex-wrap gap-2'>
              <div onClick={() => handleSearchClick('AMZN', undefined)} className='py-1 px-3 font-sansMedium text-xs md:text-sm cursor-pointer bg-primarybg rounded-full border border-black/5'>
                Amazon
              </div>
              <div onClick={() => handleSearchClick('TSLA', undefined)} className='py-1 px-3 font-sansMedium text-xs md:text-sm cursor-pointer bg-primarybg rounded-full border border-black/5'>
                Tesla
              </div>
              <div onClick={() => handleSearchClick('AAPL', undefined)} className='py-1 px-3 font-sansMedium text-xs md:text-sm cursor-pointer bg-primarybg rounded-full border border-black/5'>
                Apple
              </div>
              <div onClick={() => handleSearchClick('GOOG', undefined)} className='py-1 px-3 font-sansMedium text-xs md:text-sm cursor-pointer bg-primarybg rounded-full border border-black/5'>
                Google
              </div>
              <div onClick={() => handleSearchClick('MSFT', undefined)} className='py-1 px-3 font-sansMedium text-xs md:text-sm cursor-pointer bg-primarybg rounded-full border border-black/5'>
                Microsoft
              </div>
              <div onClick={() => handleSearchClick('META', undefined)} className='py-1 px-3 font-sansMedium text-xs md:text-sm cursor-pointer bg-primarybg rounded-full border border-black/5'>
                Facebook
              </div>
              <div onClick={() => handleSearchClick('INTC', undefined)} className='py-1 px-3 font-sansMedium text-xs md:text-sm cursor-pointer bg-primarybg rounded-full border border-black/5'>
                Intel
              </div>
              <div onClick={() => handleSearchClick('NFLX', undefined)} className='max-md:hidden py-1 px-3 font-sansMedium text-xs md:text-sm cursor-pointer bg-primarybg rounded-full border border-black/5'>
                Netflix
              </div>
            </div>
          </div>

          {/* When News available by api */}
          {news && !loading && (
            <>
              <div className='w-full px-3 pb-[80px] max-lg:max-h-[80dvh] max-sm:max-h-[69dvh] overflow-y-auto scrollbar-thin'>
                <div className='w-full flex flex-col gap-4 items-start'>
                    {paginatedData.length > 0 && paginatedData[currentPage - 1]?.map((article, index) => (
                      <Link key={article.id} href={article.article_url} className="w-full flex sm:items-center max-sm:flex-col items-start gap-5 justify-between" target="_blank" rel="noopener noreferrer">
                        {/* <Image className="rounded-xl" src='/images/news_sample.jpg' width={190} height={130} alt={article.title} /> */}
                        <div style={{ backgroundImage: article.image_url ? `url(${article.image_url})` : 'url(/images/news_sample.jpg)' }}
                            className={`sm:w-[180px] w-full flex-none sm:h-[130px] h-[180px] bg-primaryText/10 rounded-xl bg-[length:100%_100%] bg-center bg-no-repeat`}>
                        </div>
                        <div className="flex-grow flex flex-col lg:gap-1 gap-2">
                          <div className='flex gap-2 items-center'>
                            <Image width={28} height={28} className='rounded-full' src={article.favicon_url} alt={article.publisher_name} unoptimized/>
                            <p className='text-base font-sansMedium text-primaryTextColor'>{article.publisher_name}</p>
                          </div>
                          <h2 className="text-lg font-sansMedium text-primaryTextColor">{article.title}</h2>
                          <div className='flex flex-wrap gap-2'>
                            <p className="text-base font-sansMedium text-primaryTextColor">{article.published_utc} by {article.author}</p>
                            <p className="text-base font-sansMedium text-primaryTextColor"></p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
              {/* Controller */}
              {totalPages > 1 && (
                  <div className='p-4 absolute bottom-0 left-0 border-t border-black/10 bg-primaryBg w-full flex justify-between items-center gap-4'>
                      {/* Previous Button */}
                      <button 
                          className='px-3 font-sansMedium py-1 text-white bg-primaryMain rounded-md disabled:text-black disabled:bg-primaryMain/10' 
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
                                      className={`px-3 font-sansMedium py-0.5 rounded-full text-black ${
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
            </>
          )}

          {/* Loading UI */}
          {!news && loading && (
            <div className='w-full px-3 pb-[80px] max-lg:max-h-[80dvh] max-sm:max-h-[69dvh] overflow-y-auto scrollbar-thin'>
              <div className='w-full px-3 flex flex-col gap-4 items-start'>
                {Array.from({ length: 15 }).map((_, index) => (
                  <div key={index} className="w-full flex sm:items-center max-sm:flex-col items-start gap-5 justify-between news-item">
                    {/* Banner image */}
                    <div className="sm:w-[180px] w-full flex-none sm:h-[130px] h-[180px] bg-primaryText/10 rounded-xl card__skeleton"></div>

                    {/* Title and Summary */}
                    <div className='flex-grow max-sm:w-full flex flex-col lg:gap-1 gap-2'>
                      <h3 className="w-[60%] card__title card__skeleton rounded py-3 max-sm:px-1.5"></h3>
                      <p className="w-full card__skeleton rounded py-4 max-sm:px-1.5"></p>
                      <p className="w-full card__skeleton rounded py-6 max-sm:px-1.5"></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!error && news && news.length === 0 && !loading && (
              <DataNotAvailable />
          )}

          {error && !news && !loading && (
              <RequestError />
          )}
          
        </div>
      </div>
    </div>
  );
}