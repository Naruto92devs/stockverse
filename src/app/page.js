'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link.js';
import Image from 'next/image.js';
import { useEffect, useState } from 'react';
import React from 'react';
import Cookies from 'js-cookie';
import { useMetadata } from "@/context/MetadataContext";


export default function Home() {

  const { setMetadata } = useMetadata();
  const token = Cookies.get('authToken');
  const [userVisible, setUserVisible] = useState(false);
  const [why, setWhy] = useState('1');

  useEffect(() => {
    setMetadata({
      title: "Stockverse - Home",
      description: "Discover real-time stock data, expert financial analysis, and market insights on Stockverse.",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
      if (token) {
          setUserVisible(true); // User is logged in, show user data
      } else {
          setUserVisible(false); // No token, hide user data
          localStorage.removeItem('UserInfo');
      }
  }, [token]);


  const faqData = [
    {
      question: "What is Stockverse?",
      answer:
        "Stockverse is an innovative platform providing real-time stock data, expert insights, and AI-powered tools to help investors make informed decisions with ease.",
    },
    {
      question: "How does Stockverse GPT work?",
      answer:
        "Stockverse GPT is an AI-powered platform designed to assist users with stock-related insights. By leveraging advanced language models and real-time data sources, Stockverse GPT can provide stock prices, company details, news, market status, upcoming IPOs, and other essential financial information. Users simply ask a question, and Stockverse GPT uses integrated APIs to fetch accurate, up-to-date answers tailored to their query. Whether you're analyzing trends, exploring opportunities, or tracking stocks, Stockverse GPT makes complex financial data accessible and easy to understand.",
    },
    {
      question: "Is Stockverse suitable for beginners?",
      answer:
        "Stockverse is designed to be user-friendly and accessible for beginners. The platform provides clear, easy-to-understand insights and tools, such as real-time stock data, company details, market trends, and AI-powered assistance through Stockverse GPT. Beginners can easily navigate the platform to make informed decisions while learning about stocks and the market at their own pace.",
    },
    {
      question: "What is Level 2 Data, and why is it important?",
      answer:
        "Level 2 data, also known as market depth data, provides detailed information about the order book for a particular stock, showing the highest bids and lowest asks from traders. It includes the size of each order and the price levels, offering insights into the supply and demand dynamics for that stock. Stockverse provides Level 2 data in its Premium package, empowering users with advanced tools for informed trading.",
    },
    {
      question: "How often is stock data updated on Stockverse?",
      answer:
        "Stock data on Stockverse is updated in real-time for users with access to Level 2 data. For non-premium users, the data is updated continously to provide near real-time insights. This ensures that all users, regardless of their subscription level, have timely and accurate information to make informed decisions.",
    },
    {
      question: "Can I create custom watchlist on Stockverse?",
      answer:
        "Yes, Stockverse allows you to create and manage a custom watchlist. Users can add their favorite stocks to the watchlist, enabling easy tracking of stock performance, prices, and related news. This feature helps streamline your investment research by keeping all the stocks you’re interested in within quick reach on the platform.",
    },
    {
      question: "Is my data secure on Stockverse?",
      answer:
        "Yes, Stockverse prioritizes the security and privacy of user data. We use robust encryption protocols and secure servers to protect your personal and financial information. Additionally, we adhere to industry best practices and compliance standards to ensure your data remains safe. Stockverse never shares your data with third parties without your explicit consent.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="hero pb-0 w-full bg-heroBg bg-no-repeat bg-cover bg-top-left">
        <Navbar/>
        {/* ----------hero section---------- */}
        <section className='w-full pt-20 max-sm:py-4 pl-6 max-sm:pl-3 mx-auto xl:container h-full flex max-md:flex-col items-center justify-between gap-y-8'>
          <div className='md:w-[50%] flex flex-col items-start w-full max-md:py-4 gap-y-4'>
            <h1 className='font-sansMedium xl:mb-4 2xl:text-8xl lg:text-6xl text-4xl text-primaryTextColor'>One Stop Shop <span className='hero_h1'>Everything</span> <span className='text-heading'> Stocks</span></h1>
            <p className='font-sansRegular text-lg text-primaryTextColor '>Access real-time stock data, AI-driven analysis, and powerful tools to simplify your trading—everything you need, all in one platform.</p>
            <Link className='py-2 px-4 bg-primaryMain hover:bg-primaryMain/80 rounded-lg text-white text-md font-sansMedium' href='/register'>{`${userVisible? 'Dashboard' : 'Get started for free'}`}</Link>
          </div>
          <div className='md:w-[48%] w-full flex justify-end'>
            <Image className='md:w-full w-[80%]' src="/images/hero_img.png" width={660} height={493} alt='Stockverse Logo' />
          </div>
        </section>
        {/* ----------second section---------- */}
        <section className='w-full lg:px-0 px-3 mx-auto xl:container py-12 flex md:flex-row flex-col items-center justify-between gap-y-8'>
          <div className='md:w-[48%] w-full'>
            <h2 className='text-5xl text-primaryTextColor font-sansMedium mb-8'>Why <span className='text-primaryMain'> Stockverse?</span></h2>
            <div onMouseEnter={() => setWhy('1')} className={`flex gap-4 p-4 items-center border-l-2 ${why === '1' ? 'border-primaryMain' : 'border-black/20'}`}>
              <svg className='w-12 h-12' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.9995 19.999H16.7995C15.1194 19.999 14.2793 19.999 13.6375 19.672C13.0731 19.3844 12.6141 18.9255 12.3265 18.361C11.9995 17.7193 11.9995 16.8792 11.9995 15.199V8.79902C11.9995 7.11887 11.9995 6.27879 12.3265 5.63705C12.6141 5.07257 13.0731 4.61362 13.6375 4.326C14.2793 3.99902 15.1194 3.99902 16.7995 3.99902H16.9995M16.9995 19.999C16.9995 21.1036 17.8949 21.999 18.9995 21.999C20.1041 21.999 20.9995 21.1036 20.9995 19.999C20.9995 18.8945 20.1041 17.999 18.9995 17.999C17.8949 17.999 16.9995 18.8945 16.9995 19.999ZM16.9995 3.99902C16.9995 5.10359 17.8949 5.99902 18.9995 5.99902C20.1041 5.99902 20.9995 5.10359 20.9995 3.99902C20.9995 2.89445 20.1041 1.99902 18.9995 1.99902C17.8949 1.99902 16.9995 2.89445 16.9995 3.99902ZM6.99951 11.999L16.9995 11.999M6.99951 11.999C6.99951 13.1036 6.10408 13.999 4.99951 13.999C3.89494 13.999 2.99951 13.1036 2.99951 11.999C2.99951 10.8945 3.89494 9.99902 4.99951 9.99902C6.10408 9.99902 6.99951 10.8945 6.99951 11.999ZM16.9995 11.999C16.9995 13.1036 17.8949 13.999 18.9995 13.999C20.1041 13.999 20.9995 13.1036 20.9995 11.999C20.9995 10.8945 20.1041 9.99902 18.9995 9.99902C17.8949 9.99902 16.9995 10.8945 16.9995 11.999Z" stroke={`${why === '1' ? '#634FF7' : '#000'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <h3 className='text-3xl text-primaryTextColor font-sansMedium'>All-in-One Stock Research Platform</h3>
                <p className='text-base text-primaryTextColor font-sansRegular'>Get real-time market data, AI-driven insights, and deep analysis—all in one easy-to-use platform.</p>
              </div>
            </div>
            <div onMouseEnter={() => setWhy('2')} className={`flex gap-4 p-4 items-center border-l-2 ${why === '2' ? 'border-primaryMain' : 'border-black/20'}`}>
              <svg className='w-12 h-12' width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 18V11M11 18V8M3 18L3 14M12.4067 3.0275L17.5751 4.96567M9.79877 3.40092L4.20023 7.59983M20.0607 4.43934C20.6464 5.02513 20.6464 5.97487 20.0607 6.56066C19.4749 7.14645 18.5251 7.14645 17.9393 6.56066C17.3536 5.97487 17.3536 5.02513 17.9393 4.43934C18.5251 3.85355 19.4749 3.85355 20.0607 4.43934ZM4.06066 7.43934C4.64645 8.02513 4.64645 8.97487 4.06066 9.56066C3.47487 10.1464 2.52513 10.1464 1.93934 9.56066C1.35355 8.97487 1.35355 8.02513 1.93934 7.43934C2.52513 6.85355 3.47487 6.85355 4.06066 7.43934ZM12.0607 1.43934C12.6464 2.02513 12.6464 2.97487 12.0607 3.56066C11.4749 4.14645 10.5251 4.14645 9.93934 3.56066C9.35355 2.97487 9.35355 2.02513 9.93934 1.43934C10.5251 0.853553 11.4749 0.853553 12.0607 1.43934Z" stroke={`${why === '2' ? '#634FF7' : '#000'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <h3 className='text-3xl text-primaryTextColor font-sansMedium'>Insights Tailored to You</h3>
                <p className='text-base text-primaryTextColor font-sansRegular'>Access personalized stock analysis and research based on your preferences to stay ahead of the market.</p>
              </div>
            </div>
            <div onMouseEnter={() => setWhy('3')} className={`flex gap-4 p-4 items-center border-l-2 ${why === '3' ? 'border-primaryMain' : 'border-black/20'}`}>
              <svg className='w-12 h-12' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.302 21.6143C11.5234 21.7434 11.6341 21.808 11.7903 21.8415C11.9116 21.8675 12.0884 21.8675 12.2097 21.8415C12.3659 21.808 12.4766 21.7434 12.698 21.6143C14.646 20.4778 20 16.9078 20 11.9994V7.21698C20 6.41747 20 6.01772 19.8692 5.67409C19.7537 5.37052 19.566 5.09966 19.3223 4.88491C19.0465 4.64182 18.6722 4.50146 17.9236 4.22073L12.5618 2.21006C12.3539 2.1321 12.25 2.09312 12.143 2.07766C12.0482 2.06396 11.9518 2.06396 11.857 2.07766C11.75 2.09312 11.6461 2.1321 11.4382 2.21006L6.0764 4.22073C5.3278 4.50146 4.9535 4.64182 4.67766 4.88491C4.43398 5.09966 4.24627 5.37052 4.13076 5.67409C4 6.01772 4 6.41747 4 7.21698V11.9994C4 16.9078 9.35396 20.4778 11.302 21.6143Z" stroke={`${why === '3' ? '#634FF7' : '#000'}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <h3 className='text-3xl text-primaryTextColor font-sansMedium'>Secure and Reliable</h3>
                <p className='text-base text-primaryTextColor font-sansRegular'>Enjoy peace of mind with industry-leading security measures and dependable performance for your trading needs.</p>
              </div>
            </div>
          </div>
          <div className='md:w-[48%] sm:w-[70%] w-full'>
            <Image className={`${why === '1' ? 'visible' : 'hidden'} w-full rounded-3xl`} src="/images/why_img1.jpg" width={1218} height={1260} alt='Stockverse Logo' />
            <Image className={`${why === '2' ? 'visible' : 'hidden'} w-full rounded-3xl`} src="/images/why_img2.jpg" width={1218} height={1260} alt='Stockverse Logo' />
            <Image className={`${why === '3' ? 'visible' : 'hidden'} w-full rounded-3xl`} src="/images/why_img3.jpg" width={1218} height={1260} alt='Stockverse Logo' />
          </div>
        </section>
      </div>
      {/* ----------about section---------- */}
      <section className='w-full px-6 max-sm:px-3 mx-auto xl:container flex flex-col gap-y-6 py-4'>
        <div className='w-full flex items-center gap-y-4 justify-between max-lg:flex-col py-8'>
          <div className='lg:w-[40%] w-full'>
            <h2 className='font-sansMedium w-full 2xl:text-5xl lg:text-5xl text-3xl text-primaryTextColor'>Our Dedication to Simplifying <span className='hero_h2'>Stock Research</span> for Everyone</h2>
          </div>
          <div className='lg:w-[50%]'>
            <p className='font-sansRegular text-lg text-primaryTextColor'>Stockverse was built on the vision that every investor, regardless of experience, should have access to reliable and simplified market insights. We know the stock market can be complex, so we’re here to decode it, providing you with real-time data, expert analysis, and intuitive tools to support confident decision-making.</p>
          </div>
        </div>
        <div className='w-full border border-primaryTextColor/10 sm:border-x-0 flex flex-wrap '>
          <div className='lg:w-[25%] sm:w-[50%] md:p-8 px-4 pb-6 sm:border border-primaryTextColor/10 sm:border-y-0'>
            <Image className='w-[30%]' src="/images/about_logo1.png" width={96} height={96} alt='Stockverse Logo' />
            <h3 className='font-sansSemibold text-xl'>Realtime Market Data</h3>
            <p className='font-sansRegular text-base text-primaryTextColor'>Stay connected to the market instantly. Stockverse delivers real-time data, helping you act quickly and make precise decisions.</p>
          </div>
          <div className='lg:w-[25%] sm:w-[50%] md:p-8 px-4 pb-6 sm:border-r-[1px] border-primaryTextColor/10'>
            <Image className='w-[30%]' src="/images/about_logo1.png" width={96} height={96} alt='Stockverse Logo' />
            <h3 className='font-sansSemibold text-xl'>AI-Powered Stock Insights</h3>
            <p className='font-sansRegular text-base text-primaryTextColor'>Leverage AI-driven analysis to spot trends, detect patterns, and develop a deeper market understanding for smarter trading.</p>
          </div>
          <div className='lg:w-[25%] sm:w-[50%] md:p-8 px-4 pb-6 lg:border-r-[1px] lg:border-l-0 lg:border-t-0 sm:border border-primaryTextColor/10'>
            <Image className='w-[30%]' src="/images/about_logo1.png" width={96} height={96} alt='Stockverse Logo' />
            <h3 className='font-sansSemibold text-xl'>Pro-Level Charting & Analysis</h3>
            <p className='font-sansRegular text-base text-primaryTextColor'>Access advanced charts, technical indicators, and in-depth analytics to refine your strategy and optimize market performance.</p>
          </div>
          <div className='lg:w-[25%] sm:w-[50%] md:p-8 px-4 pb-6 lg:border-r-[1px] lg:border-l-0 lg:border-t-0 sm:border sm:border-l-0 border-primaryTextColor/10'>
            <Image className='w-[30%]' src="/images/about_logo1.png" width={96} height={96} alt='Stockverse Logo' />
            <h3 className='font-sansSemibold text-xl'>Personalized Watchlists</h3>
            <p className='font-sansRegular text-base text-primaryTextColor'>Track and organize stocks effortlessly. Stay focused on key stocks with a tailored watchlist built specifically for traders.</p>
          </div>
        </div>
        <div className='w-full mt-8 flex flex-wrap md:justify-between justify-center gap-14 max-md:gap-8'>
          <Image className='max-sm:w-[40%]' src="/images/about_p1.png" width={178} height={48} alt='Stockverse Logo' />
          <Image className='max-sm:w-[40%]' src="/images/about_p2.png" width={178} height={48} alt='Stockverse Logo' />
          <Image className='max-sm:w-[40%]' src="/images/about_p3.png" width={178} height={48} alt='Stockverse Logo' />
          <Image className='max-sm:w-[40%]' src="/images/about_p4.png" width={178} height={48} alt='Stockverse Logo' />
          <Image className='max-sm:w-[40%]' src="/images/about_p5.png" width={178} height={48} alt='Stockverse Logo' />
        </div>
        <Image className='self-center' src="/images/about_divider.png" width={1128} height={15} alt='Stockverse Logo' />
      </section>
      {/* ----------features section---------- */}
      <section className='w-full flex flex-col bg-darkBlue py-16 relative'>
        <Image className='absolute top-0 w-full z-[1] self-center' src="/images/features_main_bg.png" width={1128} height={15} alt='Stockverse Logo' />
        <div className='z-[2] w-full px-6 max-sm:px-3 mx-auto xl:container flex flex-col items-center gap-y-8'>
          <h2 className='2xl:w-[50%] lg:w-[70%] font-sansMedium w-full 2xl:text-5xl lg:text-5xl text-center text-2xl text-white'>Tools and Resources Designed To Enhance Your Investments</h2>
          <p className='2xl:w-[40%] lg:w-[50%] w-full text-white font-sansRegular text-md text-center'>rom real-time stock data to tailored financial tools, Stockverse provides an array of services to help you maximize your portfolio.</p>
          {/* ----------features stockverse-gpt---------- */}
          <div className='w-full mt-8 lg:py-4 lg:px-8 p-8 gap-y-8 flex max-lg:flex-col items-center justify-between relative border border-white/5 rounded-2xl !overflow-hidden'>
            <Image className='absolute lg:top-0 lg:right-0 max-lg:left-0 max-lg:bottom-0 z-[2]' src="/images/features_gpt_bg.png" width={910} height={910} alt='Stockverse Logo' />
            <Image className='absolute lg:top-[-40%] lg:right-[-15%] max-lg:right-[-25%] max-lg:bottom-[-25%] max-lg:w-[150%] z-[1]' src="/images/features_gpt_color.png" width={734} height={401} alt='Stockverse Logo' />
            <div className='relative xl:w-[33%] lg:w-[40%] w-full flex flex-col items-start gap-y-2'>
              <h3 className='font-sansMedium w-full xl:text-4xl lg:text-3xl text-2xl text-white'>StockVerse GPT</h3>
              <p className='w-full text-white font-sansRegular text-lg'>Stockverse GPT is the ChatGPT for stocks—delivering real-time data, technical analysis, and market predictions instantly to help you trade smarter.</p>
            </div>
            <div className='relative xl:w-[64%] lg:w-[55%] w-full flex flex-col items-end gap-y-4'>
              <Image className='lg:w-[70%] w-full relative z-[3]' src="/images/features_gpt.png" width={954} height={738} alt='Stockverse Logo' />
            </div>
          </div>
          {/* ----------features search & Realtime Row---------- */}
          <div className='w-full flex flex-wrap justify-between gap-y-8'>
            {/* ----------features search---------- */}
            <div className='lg:w-[49%] p-8 bg-searchBg bg-cover bg-center bg-no-repeat w-full flex flex-col gap-y-8 items-center relative border border-white/5 rounded-2xl !overflow-hidden'>
              <div className='flex flex-col items-start gap-y-2'>
                <h3 className='font-sansMedium w-full xl:text-4xl lg:text-3xl text-2xl text-white'>Search your stocks</h3>
                <p className='w-full pr-2 text-white font-sansRegular text-lg'>Your AI-powered investment assistant, ready to answer your questions, and guide you through the market with ease.</p>
              </div>
              <Image className='w-[80%] pt-6 max-lg:pb-14' src="/images/features_search.png" width={632} height={646} alt='Stockverse Logo' />
            </div>
            {/* ----------features Realtime---------- */}
            <div  className='lg:w-[49%] bg-realtimeBg bg-cover bg-center bg-no-repeat p-8 w-full flex flex-col gap-y-8 items-center relative border border-white/5 rounded-2xl !overflow-hidden'>
              <div className='flex flex-col items-start gap-y-2'>
                <h3 className='font-sansMedium w-full xl:text-4xl lg:text-3xl text-2xl text-white'>Track Market Leaders Instantly</h3>
                <p className='w-full pr-2 text-white font-sansRegular text-lg'>Get real-time stock data on top movers. Instantly track key stats, trends, and price action to make smarter trades.</p>
              </div>
              <Image className='w-full' src="/images/features_realtime.png" width={632} height={646} alt='Stockverse Logo' />
            </div>
          </div>
          {/* ----------features level 2---------- */}
          <div className='w-full lg:pl-8 pt-8 gap-y-12 flex max-lg:flex-col items-center justify-between relative border border-white/5 rounded-2xl !overflow-hidden'>
            <Image className='absolute lg:top-[-100%] lg:self-center max-lg:left-[-30%] w-full z-[1]' src="/images/features_gpt_color.png" width={734} height={401} alt='Stockverse Logo' />
            <div className='max-lg:px-8 relative lg:w-[50%] w-full flex flex-col items-start gap-y-2'>
              <h3 className='font-sansMedium w-full xl:text-4xl lg:text-3xl text-2xl text-white'>Level 2 Data</h3>
              <p className='w-full text-white font-sansRegular text-lg'>Dive deeper with detailed market activity, including bid and ask prices, so you can see the true dynamics of stock movement.</p>
              <Image className='w-full relative z-[3]' src="/images/features_level2_stocks.png" width={954} height={738} alt='Stockverse Logo' />
            </div>
            <div className='relative xl:w-[50%] lg:w-[55%] w-full flex flex-col items-end gap-y-4'>
              <Image className=' w-full relative z-[3]' src="/images/features_level2.png" width={954} height={738} alt='Stockverse Logo' />
            </div>
          </div>
        </div>
      </section>
      {/* ----------FAQ section---------- */}
      <section className='w-full px-6 max-sm:px-3 mx-auto xl:container flex flex-col gap-y-12 py-16'>
        <div className='w-full flex items-center gap-y-4 justify-between max-lg:flex-col lg:pt-8'>
          <div className='lg:w-[40%] w-full'>
            <h2 className='font-sansMedium w-full 2xl:text-5xl lg:text-5xl text-3xl text-primaryTextColor'>Everything You Need To Know <span className='hero_h2'>About Stockverse</span></h2>
          </div>
          <div className='lg:w-[45%]'>
            <p className='font-sansRegular text-lg text-primaryTextColor'>ind quick answers to frequently asked questions about Stockverse’s tools, subscription options, and resources</p>
          </div>
        </div>
        <div className='flex flex-col gap-y-2'>
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-[#FAFAFB]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-toggle flex justify-between items-center w-full px-6 py-4 font-sansMedium xl:text-2xl md:text-xl text-lg text-left"
              >
                <span>{faq.question}</span>
                <span
                  className={`icon transition-transform duration-300 ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                >
                  {/* {activeIndex === index ? "–" : "+"} */}
                  <Image className='w-full' src="/images/star.png" width={22} height={22} alt='Stockverse Logo' />
                </span>
              </button>
              <div
                className={`faq-content px-6 text-primaryTextColor font-sansRegular text-base transition-all duration-600 overflow-hidden ${
                  activeIndex === index ? "max-h-screen pb-6" : "max-h-0"
                }`}
                style={{ maxHeight: activeIndex === index ? "600px" : "0" }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
        <p className='text-primaryTextColor font-sansMedium text-md flex flex-wrap items-center justify-center gap-4'>
          Have any more Questions? 
          <Link className='py-2 px-4 bg-primaryMain hover:bg-primaryMain/80 rounded-lg text-white text-md font-sansMedium' href='/feedback'>Let us know</Link>
        </p>
      </section>
      {/* ----------join section---------- */}
      <section className='w-full px-6 max-sm:px-3 py-8 mx-auto xl:container flex flex-col items-center gap-y-4'>
        <div className='w-full max-md:px-3 py-12 bg-joinBg bg-cover bg-center gap-y-6 flex flex-col items-center justify-center relative border border-white/5 rounded-3xl !overflow-hidden'>
          <h3 className='font-sansMedium xl:w-[46%] lg:w-[60%] md:w-[60%] w-full 2xl:text-6xl lg:text-5xl text-3xl text-center text-white'>Revolutionize Your Stock <span className='hero_h3'> Trading Journey</span></h3>
          <p className='2xl:w-[40%] md:w-[50%] w-full text-white font-sansRegular md:text-lg text-base text-center'>Join a platform trusted by investors looking to elevate their journey in the stock market.</p>
          <Image className='max-md:w-[90%]' src="/images/join_stocks.png" width={614} height={92} alt='Stockverse Logo' />
          <Link className='py-2 px-4 bg-primaryMain hover:bg-primaryMain/80 rounded-lg text-white text-md font-sansMedium' href='/register'>Get started for free</Link>
        </div>
      </section>
      <Footer/>
    </div>
  );
}