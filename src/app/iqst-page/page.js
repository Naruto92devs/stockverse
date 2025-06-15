'use client';
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from "react-icons/fa";
import formatNumber from "@/components/FormatNumber";
import NewsLetterPopup from "@/components/NewsLetterPopup";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap', // << crucial
});


import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Optional default styles
import axios from "axios";
import Link from "next/link";

const IQSTPage = () => {
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [phone, setPhone] = useState('+1');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(null);
  const [stockdata, setstockData] = useState([]); // State to store API data
  const [error, setError] = useState(null); // Error state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [er, setEr] = useState(null);
  const isValidPhone = phone && phone.replace(/\D/g, '').length >= 10;
  const isFormValid = email && isValidPhone && !loading;
  const [newsletter, setNewsletter] = useState(true);
  const heading = "Winning Stock Picks"
  const subHeading = "Grow Your Wealth by +673.66%! Get Exclusive Stock Picks Sent To Your Inbox!"


  const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${STOCKVERSE_BACK_END}/stocks-list?symbols=iqst`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        const formatteddata = {
          symbol: result[0].symbol,
          name: result[0].overview.Name,
          siteUrl: result[0].overview.OfficialSite,
          eps: result[0].overview.EPS,
          market_cap: formatNumber(Number(result[0].overview.MarketCapitalization)),
          avgGrowth: parseFloat(result[0].globalQuote["10. change percent"]).toFixed(2),
          price: parseFloat(Number(result[0].globalQuote["05. price"])).toFixed(2),
          price_change: parseFloat(Number(result[0].globalQuote["09. change"])).toFixed(2),
        }
        setstockData(formatteddata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStockData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      {/* hero */}
      <section className="bg-[#010e140d] min-h-[600px] 2xl:py-20 xl:py-24 py-6 ">
        <div className="w-full xl:container mx-auto px-3 flex justify-between max-lg:flex-col max-lg:gap-y-8">
          <div className="w-[64%] max-lg:w-[100%] lg:space-y-10 space-y-6">
            <div>
            <h1 className="text-black 2xl:text-6xl sm:text-[2.5rem] text-[2rem] !leading-[1.2] font-syneBold">Hot Stock Alert:</h1>
            <h2 className="text-darkGreen 2xl:text-6xl sm:text-[2.5rem] text-[2rem] !leading-[1.2] font-syneBold"><span className="text-black">Ticker: </span> <Link href='/dashboard?symbol=IQST' className="underline"> IQST</Link> <span className="text-black">(NASDAQ)</span></h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=IQST' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/fedelity.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.schwab.com/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/charles.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=IQST&rsO=new' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/article-link.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://robinhood.com/stocks/iqst/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/robinhood_logo.png' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.webull.com/quote/nasdaq-iqst' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg bg-[#fff]" width={60} height={60} src='/images/webull.png' alt="logo" loading="eager" />
              </Link>
            </div>
            <div>
              <p className={`text-gray/60 ${montserrat.className} 2xl:text-xl text-lg w-full`}><span className="font-MontserratBold">Current Status:</span> Undervalued. Strong Financial Growth. Recently Uplisted to NASDAQ.</p>
              <p className={`text-gray/60 ${montserrat.className} 2xl:text-xl text-lg w-full`}><span className="font-MontserratBold">Target:</span> $1 Billion Revenue by 2027 (Company Forecast)</p>
              <p className={`text-gray/60 ${montserrat.className} 2xl:text-xl text-lg w-full`}>In a market full of uncertainty, IQSTEL Inc. (<Link className="font-bold underline" href="/dashboard?symbol=IQST">IQST</Link>) is delivering measurable performance and expanding into new high-growth technology sectors. Backed by strong financial results, a tight float, and a Nasdaq uplisting completed without dilution, IQSTEL is positioning itself for potential revaluation.</p>
            </div>
          </div>
          <div className="w-[35%] max-md:w-[75%] max-sm:w-[100%] max-lg:w-[60%] lg:mt-12">
          </div>
        </div>
      </section>

      {/* main */}
      <section className="w-full xl:container mx-auto py-24 px-3">
        <div className="flex lg:items-start justify-between flex-wrap max-lg:gap-y-8">
          <div className="w-[23%] max-lg:w-[48%] max-md:w-full border border-[#DDE9EF] p-2 shadow-md rounded-md 2xl:rounded-xl sticky top-12 max-lg:relative max-lg:top-0 max-lg:order-2 max-md:order-3">
            <p className="bg-[#F2F3F3] text-[#1D3045] font-MontserratSemibold text-base px-4 py-4 rounded 2xl:rounded-lg">
              Latest News
            </p>
            <div className="flex flex-col gap-2">
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-sm p-2 py-4 border-b border-[#F2F3F3] text-[#343D48] hover:underline"
                href="/news/iqst" target="_blank" rel="noopener noreferrer">
                     IQST - IQSTEL (NASDAQ: IQST) Issues June Update: $77.8M Preliminary Revenue, GlobeTopper Acquisition, NASDAQ Momentum, and a Clear Path to $1B 
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 border-b border-[#F2F3F3] text-[#343D48] hover:underline"
                href="/news/iqst-exclusive-interview" target="_blank" rel="noopener noreferrer">
                Exclusive Interview with Leandro Iglesias, CEO of IQSTEL, Inc. (Nasdaq: IQST); Acquiring Majority Interest in Fintech Innovator GlobeTopper
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 text-[#343D48] hover:underline"
                href="/news/iqstel-conference-2025"
                target="_blank" rel="noopener noreferrer">
                {`IQST - IQSTEL Reports $57.6M Q1 Revenue in First NASDAQ Shareholder Letter, Reaffirms Path to $1 Billion by 2027 as Global Tech Evolution Accelerates`}
              </Link>
            </div>
          </div>
          <div className="w-[50%] pt-6 max-md:w-[100%] max-lg:w-[100%] max-lg:order-3 max-md:order-2">
            <h3 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl text-2xl !leading-[1.5] mb-4 max-md:text-left">
              5 Reasons IQSTEL Should Be On Your Radar
            </h3>
            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48]">1. Proven Revenue Growth and Profitability Trends</h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              IQSTEL recently announced:
            </p>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li><span className="font-MontserratBold">$283 million</span> in 2024 revenue (+96% YoY)</li>
              <li><span className="font-MontserratBold">$57.6 million</span> in Q1 2025 revenue</li>
              <li>Positive net income and <span className="font-MontserratBold">adjusted EBITDA</span></li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              With full-year 2025 revenue guidance reaffirmed at <span className="font-MontserratBold">$340 million</span>, and a year-end revenue run-rate goal of <span className="font-MontserratBold">$400 million</span>, the company has clearly signaled its growth trajectory. The long-term company vision is to reach <span className="font-MontserratBold">$1 billion in revenue by 2027</span>.
            </p>

            {/* <Image className="w-full my-6 xl:my-12 mb-[8] xl:mb-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498} /> */}

            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48]">
              2. Tight Float, Strong Per-Share Metrics
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              IQST has <span className="font-MontserratBold">2.9 million shares outstanding</span>, which is unusually low for a Nasdaq-listed company of its size.
            </p>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li><span className="font-MontserratBold">Revenue per share:</span>  Over $100</li>
              <li><span className="font-MontserratBold">Equity per share:</span>  $4.38</li>
              <li><span className="font-MontserratBold">Market cap:</span> ~$35 million</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              These numbers suggest a disconnect between the company’s fundamentals and its current valuation. A reassessment by the market may occur as institutional awareness increases.
            </p>
            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48]">
              3. Strategic Fintech Expansion Through GlobeTopper
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              The {`company's`} 51% acquisition of GlobeTopper, a fintech provider projected to generate <span className="font-MontserratBold">$65M+ in 2025</span>, enables cross-sector growth. IQSTEL plans to integrate GlobeTopper’s services across its 600+ telecom partners—potentially unlocking new recurring revenue streams and a more diversified business model.
            </p>
            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48]">
              4. NASDAQ Uplisting Completed Without Dilution
            </h6>

            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              On May 14, 2025, IQSTEL uplisted to the <span className="font-MontserratBold">NASDAQ Capital Market</span> through a direct listing. No capital was raised, and no shares were sold—resulting in zero shareholder dilution. This move has increased the {`company's`} visibility and access to new investor classes, including institutions and family offices.
            </p>

            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48]">
              5. Undervalued Relative to Industry Peers
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Despite its financial performance, IQST is trading at a revenue multiple of only <span className="font-MontserratBold">~0.1x 2024 revenue</span>, far below the tech and fintech industry averages. While valuation changes are not guaranteed, the current metrics place the company well below peer benchmarks—potentially presenting an opportunity for growth-oriented investors.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              IQSTEL’s strong financials, diversified business lines, and disciplined capital structure may appeal to both retail and institutional investors looking for exposure to telecom, fintech, and tech-enabled services.
            </p>


            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              📌 This is a stock worth watching as it continues to execute on its strategy.
            </p>
          </div>
          <div className="w-[23%] max-lg:w-[48%] max-md:w-[48%] max-md:w-full border border-[#DDE9EF] p-2 shadow-md rounded-md 2xl:rounded-xl sticky top-12 max-lg:order-1 max-lg:relative max-lg:top-0">
            <p className="bg-[#F2F3F3] text-[#1D3045] font-MontserratSemibold text-base px-4 py-4 rounded 2xl:rounded-lg">
              STOCK INFORMATION
            </p>
            <div className="flex flex-wrap items-center gap-2 p-2 mt-4">
              <Image className="w-[15%]" src="/images/iqst.webp" alt="neov" width={52} height={52} loading="lazy" />
              <div className="">
                <p className="text-base font-MontserratBold">IQSTEL, Inc.</p>
                <p className="flex items-center gap-2 font-MontserratMedium text-xs 2xl:text-sm text-[#747474]">IQST <Image src="/images/nasdaq.svg" alt="neov" width={24} height={24} loading="lazy" /> Nasdaq Stock Market</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-y-4 items-center border-y border-[#F2F3F3] py-4 p-2 mt-4">
              <div className="pr-4 border-r border-[#DDDDDD]">
                <p className="font-MontserratSemibold text-sm">February 26</p>
                <p className="font-MontserratMedium text-[#747474] text-xs">Upcoming Earnings</p>
              </div>
              <div className="border-r border-[#DDDDDD] px-4 mr-4">
                <p className="font-MontserratSemibold text-sm">{stockdata.eps}</p>
                <p className="font-MontserratMedium text-[#747474] text-xs">EPS</p>
              </div>
              <div className="pr-4">
                <p className="font-MontserratSemibold text-sm">{stockdata.market_cap}</p>
                <p className="font-MontserratMedium text-[#747474] text-xs">Market cap</p>
              </div>
            </div>
            <div className="p-2">
              <p className="font-MontserratBold text-lg">{stockdata.price} <span className="font-MontserratSemibold text-sm">USD</span><span className={`text-sm ml-2 font-MontserratMedium ${stockdata.price_change >= 0 ? "text-[#028506]" : "text-[#EE3B38]"}`}> {stockdata.price_change}</span>
                <span className={`text-xs font-MontserratMedium ${stockdata.avgGrowth > 0 ? "text-[#028506]" : "text-[#EE3B38]"}`}> ({stockdata.avgGrowth}%)</span></p>
              <p className="font-MontserratMedium text-xs text-[#747474]">Market Closed (as of 06:29 GMT+5:30)</p>
            </div>
          </div>
        </div>
      </section>

      {/* add neov to watchlist */}
      <section className="py-10">
        <h4 className="text-[#1D3045]  font-MontserratBold text-center 2xl:text-4xl text-2xl !leading-[1.5] mb-12">
          Add <Link href='/iqst' className="font-MontserratBold underline"> IQST</Link> to your watchlist today
        </h4>
        <div className="flex items-center  justify-center border-y-2 border-[#3934341c]">
          <Link href='https://www.etrade.wallst.com/sso/saml2/requestAssertion.ashx?originalTarget=https%3A%2F%2Fwww%2Eetrade%2Ewallst%2Ecom%2Fv1%2Fstocks%2Fsnapshot%2Fsnapshot%2Easp%3Fsymbol%3Diqst%26rsO%3Dnew&authnContext=prospect&ChallengeUrl=https%3A%2F%2Fidp%2Eetrade%2Ecom%2Fidp%2FSSO%2Esaml2' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem]  flex items-center justify-center border-x-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/6.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.schwab.com/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/7.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.tradingview.com/symbols/NASDAQ-IQST/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/8.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=iqst' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/9.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
        </div>
      </section>

      <section className="xl:container mx-auto px-8 xl:px-3 pb-20 relative -z-1 flex flex-col gap-y-8">
        <div className="bg-[#0A84EF] px-2 py-8 xl:py-16 lg:py-[2rem] space-y-4 rounded-3xl bg-cvkd-bg-6 bg-no-repeat bg-[100%_100%] bg-[length:100%_100%]">
          <p className="font-MontserrarMedium md:text-2xl text-base italic text-center text-[#fff]">
            &#8213; Join StockVerse Alerts Today!
          </p>
          <h4 className="text-[2rem] xl:text-[3.2rem] font-MontserratSemibold leading-[130%] lg:leading-[120%] text-center text-[#fff]">
            Winning Stock Picks Sent To Inbox
          </h4>
          <p className="pt-2 font-MontserratRegular text-base md:text-xl xl:tetx-2xl text-[#fff] px-4 lg:px-[15%] leading-[150%] lg:leading-[120%] text-center">
            Sign up for our newsletter to receive the latest updates, insights, and exclusive Winning Stock Picks. As of 2024, our alerts are up a total of
            873.22%.
          </p>
        </div>
      </section>




      <section className="w-full bg-[#000] pt-[3rem]">
        <div className="w-full xl:container py-28 xl:px-3 px-8 px-8 mx-auto flex flex-col lg:flex-row lg:justify-between border-b border-solid border-[#404040] space-y-10 lg:space-y-0">
          {/* Left Section - Sign Up */}

          {/* Right Section - Offices and Social */}
          <div className="w-full lg:w-[48%]">
            {/* <h4 className="text-[1.3rem] text-[#fff] font-MontserratRegular italic mb-8">
                  — Our Offices
                </h4> */}
            {/* Offices */}
            <div className="flex flex-col lg:flex-row lg:justify-between pb-[3rem] mb-[2rem] border-b border-[#404040] space-y-10 lg:space-y-0">
              <div className="lg:text-left w-full lg:w-[48%]">
                <p className="font-MontserratSemibold text-[1.5rem] text-[#fff] flex items-center gap-3 pb-2 lg:justify-start">
                  <Image
                    src="/images/american-flag.png"
                    alt="american-flag"
                    width={100}
                    height={100}
                    className="w-[2rem] h-[2rem]"
                    loading="lazy"
                  />
                  USA
                </p>
                <p className="text-[#aaa] font-MontserratRegular text-xl pb-2">
                  1309 coffeen ave suite 1200
                </p>
                <p className="text-[#aaa] font-MontserratRegular text-xl">
                  sheridan wyoming 84403
                  <br />
                  <a href="https://www.stockverse.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    www.stockverse.com
                  </a>
                </p>
              </div>
              <div className="w-full lg:w-[48%]">
                <h4 className="font-MontserratSemibold text-[1.5rem] text-[#fff] flex items-center gap-3 pb-2">Inquiries</h4>
                <p className="text-gray-400 text-xl flex item-center gap-2">
                  <FaEnvelope className="mt-2" size={20} color="#c0c0c0" />
                  <a href="mailto:support@stockverse.com" className="text-[#aaa] font-MontserratRegular text-xl pb-2 underline">
                    support@stockverse.com
                  </a>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:text-left">
              <h4 className="text-[1.3rem] text-[#fff] font-MontserratMedium italic mb-6">
                — Follow Us
              </h4>
              <div className="flex lg:justify-start space-x-4 text-2xl text-gray-400">
                <a href="https://www.facebook.com/profile.php?id=61556580840606" className="text-[#fff] hover:text-[#d2cecd]">
                  <FaFacebook />
                </a>
                <a href="https://x.com/StockVerseAI" className="text-[#fff] hover:text-[#d2cecd]">
                  <FaTwitter />
                </a>
                <a href="https://www.instagram.com/Stockverse.ai?fbclid=IwY2xjawIPLylleHRuA2FlbQIxMAABHSUdQnEM3uSGxUyLLa4LT0rgf7Zts_N-z36uR9yJlVLC9Nwx255wsE8Teg_aem_3U9gYDg8Fu5a8qJoYl9lgg" className="text-[#fff] hover:text-[#d2cecd]">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/company/stockverseai/" className="text-[#fff] hover:text-[#d2cecd]">
                  <FaLinkedin />
                </a>
                <a href="https://www.youtube.com/@StockVerse.com1" className="text-[#fff] hover:text-[#d2cecd]">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#000] py-12">
        <div className="xl:container mx-auto px-8">
          <div className="flex flex-wrap justify-between gap-8">
            {/* Description Section */}
            <div className="w-full lg:w-[45%]">
              <Image src="/images/Logo.svg" width={100} height={100} alt="logo" className="w-[12rem] mb-8" loading="lazy" />
              <p className="text-[#aaa] text-xl font-MontserratRegular">
                Your trusted platform for live Stock Data, Stock News, IPO Calendar,
                AI-driven insights, Stock Picks, Alerts, and personalized analysis tools.
              </p>
            </div>
            {/* Quick Links */}
            <div className="w-[45%] sm:w-[30%] lg:w-[15%]">
              <h4 className="text-[#fff] text-xl md:text-2xl font-MontserratSemibold mb-8 relative after:content-[''] after:absolute after:left-0 after:top-[2.2rem] after:w-[3rem] after:h-[2px] after:bg-[#2175D9]">
                Quick Links
              </h4>
              <ul className="text-[#aaa] text-lg md:text-xl font-MontserratRegular flex flex-col gap-3">
                <li className="hover:underline"><a href="/">Home</a></li>
                <li className="hover:underline"><a href="/stockverse-gpt">Stockverse GPT</a></li>
                {/* <li><a href="/stockpicks">Stock Picks</a></li> */}
              </ul>
            </div>
            {/* Market */}
            <div className="w-[45%] sm:w-[30%] lg:w-[15%]">
              <h4 className="text-[#fff] text-xl md:text-2xl font-MontserratSemibold mb-8 relative after:content-[''] after:absolute after:left-0 after:top-[2.2rem] after:w-[3rem] after:h-[2px] after:bg-[#2175D9]">
                Market
              </h4>
              <ul className="text-[#aaa] text-lg md:text-xl font-MontserratRegular flex flex-col gap-3">
                <li className="hover:underline"><a href="/gainers&losers">Gainers/Losers</a></li>
                <li className="hover:underline"><a href="/news">News</a></li>
                <li className="hover:underline"><a href="/ipo-calendar">IPO Calendar</a></li>
              </ul>
            </div>
            {/* Contact */}
            <div className="w-[45%] sm:w-[30%] lg:w-[15%]">
              <h4 className="text-[#fff] text-xl md:text-2xl font-MontserratSemibold mb-8 relative after:content-[''] after:absolute after:left-0 after:top-[2.2rem] after:w-[3rem] after:h-[2px] after:bg-[#2175D9]">
                Contact
              </h4>
              <ul className="text-[#aaa] text-lg md:text-xl font-MontserratRegular flex flex-col gap-3">
                <li className="hover:underline"><a href="mailto:support@stockverse.com">Email Us</a></li>
                <li className="hover:underline"><a href="/feedback">Send Us Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between justify-center mt-[4rem] border-t border-[#404040] pt-[2rem] gap-4">
            <p className="text-[#aaa] text-base md:text-lg">
              © 2024 Stockverse, All rights reserved.
            </p>
            <ul className="text-[#aaa] text-base md:text-lg font-MontserratRegular sm:flex-row flex items-center flex-wrap gap-4">
              <li className="border-0 sm:border-r-2 border-[#fafafa] hover:underline sm:pr-4 pr-0">
                <a href="/disclaimer">Disclaimer</a>
              </li>
              <li className="border-0 sm:border-r-2 border-[#fafafa] hover:underline px-0 sm:px-4">
                <a href="/terms">Terms of Service</a>
              </li>
              <li className="border-0 sm:border-r-2 border-[#fafafa] hover:underline px-0 sm:px-4">
                <a href="/policy">Privacy Policy</a>
              </li>
              <li className="sm:pl-4 px-0 hover:underline sm:px-4"><a href="refund-policy">Refund Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
      <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter} tag={"IQST subscriber popup"} heading={heading} subHeading={subHeading}/>
      {/* disclaimer */}
      <div className="hero py-16 max-md:py-6 w-full border-t-[1.2px] border-[#404040]">
      <div className="mx-auto xl:container gap-y-4 px-8 xl:px-3 max-sm:gap-y-3 flex flex-col items-start">
        <h4 className="text-3xl font-inter font-bold text-primaryText">MASTER LEGAL DISCLAIMER</h4>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Effective Date</span>: August 2024</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Last Updated</span>: May 17, 2025</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Publisher</span>: Relqo Media LLC (Wyoming, United States)</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Subject Company</span>: IQSTEL, INC. (IQST)</p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">IMPORTANT SUMMARY — PLEASE READ FIRST</h4>
        <p className="text-base text-primaryText font-inter">
          This website and any affiliated digital materials are published by Relqo Media LLC, a Wyoming marketing agency that has been compensated in cash by CorporateAds, LLC to produce and distribute promotional content regarding iQSTEL, Inc. (NASDAQ: IQST). This communication is a paid advertisement, not a research report, not investment advice, and not an independent publication. Relqo Media is not a broker-dealer, investment adviser, or securities analyst. Investing in small-cap or microcap securities is extremely speculative and may result in the total loss of your investment. We strongly urge all viewers to consult a licensed investment professional and perform their own due diligence.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">1. NATURE AND INTENT OF THIS COMMUNICATION</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC is a for-profit marketing agency engaged in paid promotions of public companies. The content we produce is strictly commercial and intended to create temporary public awareness, visibility, and short-term market activity around the featured company. This material is not impartial. All readers should interpret our content as a paid commercial advertisement and not as an editorial, research article, or independent commentary. We create advertisements, not analysis. These communications are not intended to be factual evaluations of the {`company’s`} operations or investment merit.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">2. COMPENSATION FOR IQSTEL, INC. (IQST)</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC has been retained by CorporateAds, LLC to provide promotional media services for iQSTEL, Inc. (NASDAQ: IQST). As of the effective date:
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter pl-8">
          <li>Relqo Media LLC is receiving cash compensation for digital investor awareness campaigns.</li>
          <li>The total compensation paid for these services is $20,000 for the period beginning June 15, 2025, through June 18, 2025.</li>
          <li>CorporateAds, LLC may own, acquire, or dispose of shares in IQST during or after the campaign period.</li>
        </ul>
        <p className="text-base text-primaryText font-inter">
          This relationship creates a material conflict of interest. Relqo {`Media’s`} content regarding IQST should be considered promotional, biased, and financially motivated.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">3. INTENDED AUDIENCE</h4>
        <p className="text-base text-primaryText font-inter">
          These Communications are directed solely to U.S.-based, self-directed investors who understand the risks of investing in microcap and Nasdaq-listed securities. The content is not intended for children, seniors, retirement accounts, or individuals with limited experience in securities trading. These Communications are not intended to guide investment for long-term portfolio management or financial planning purposes.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">4. NO ENDORSEMENT OR VERIFICATION OF COMPANY CLAIMS</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC does not independently verify, investigate, or audit any statements made by the company being promoted, its officers, its press releases, or any third-party sources. Any claims, projections, customer announcements, or product statements made in connection with IQST should be assumed to be unverified and potentially inaccurate unless independently confirmed.
          You should not rely on any statements regarding future performance, partnerships, revenue projections, or corporate plans.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">5. MARKET INFLUENCE AND TRADING PATTERN EXPECTATION</h4>
        <p className="text-base text-primaryText font-inter">
          Promotional campaigns commonly result in short-lived spikes in stock price and volume, followed by rapid declines. These spikes are typically driven by retail speculation, promotional circulation, and momentary investor interest—not fundamentals. You should expect that:
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>{`IQST’s`} stock may increase temporarily during this promotion,</li>
          <li>Trading volume may rise sharply, and</li>
          <li>The price may fall after the campaign ends or selling begins.</li>
        </ul>
        <p className="text-base text-primaryText font-inter">
          These patterns are typical of stock promotions, and you should proceed accordingly.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">6. NO RELIANCE – INVESTOR RESPONSIBILITY</h4>
        <p className="text-base text-primaryText font-inter">
          The burden of research, investigation, and risk assessment rests solely with you. Relqo Media LLC is not responsible for your investment decisions. You are strongly urged to:
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Read public filings from the SEC,</li>
          <li>Consult a licensed financial adviser,</li>
          <li>Understand risks such as dilution, insider selling, and volatility, and</li>
          <li>Recognize that speculative stocks often lack financial transparency.</li>
        </ul>
        <p className="text-base text-primaryText font-inter">
          We accept no responsibility for losses incurred due to actions taken based on our Communications.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">7. FORWARD-LOOKING STATEMENTS AND SAFE HARBOR</h4>
        <p className="text-base text-primaryText font-inter">
          Our materials may include “forward-looking statements” within the meaning of the Private Securities Litigation Reform Act of 1995. These include statements about potential growth, revenue forecasts, market opportunity, strategic partnerships, or technological development.
          Such statements are speculative and based on assumptions that may never occur. Actual results may differ materially. These statements are made under the safe harbor protections of Sections 27A and 21E of the Securities Acts. Relqo Media disclaims any duty to update them.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">8. INFORMATION SOURCING, BIAS, AND ACCURACY</h4>
        <p className="text-base text-primaryText font-inter">
          We use publicly available information including company websites, press releases, and promotional materials supplied by paying clients or related parties. We do not verify or validate this data.
        </p>
        <p className="text-base text-primaryText font-inter">Assume all information presented by Relqo Media is:</p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Subjective,</li>
          <li>Not independently verified,</li>
          <li>Created to highlight potential upside and omit downsides,</li>
          <li>Not suitable as the basis for any investment decision.</li>
        </ul>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">9. OWNERSHIP AND TRADING CONFLICTS</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC, its contractors, members, and affiliates may hold or acquire shares in the companies we promote, including IQST. We may buy or sell such shares without prior notice. These transactions may occur before, during, or after a promotional campaign and may affect market pricing.
          We are not obligated to update readers on our trading activity or affiliate holdings.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">10. MARKETING TOOLS, DATA COLLECTION, AND USER CONSENT</h4>
        <p className="text-base text-primaryText font-inter">We use a range of outreach and promotional tools, including:</p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Email and newsletter distributions,</li>
          <li>SMS/MMS text campaigns,</li>
          <li>Social media posts and influencers,</li>
          <li>Google and native display ads,</li>
          <li>Press releases, video marketing, and paid content distribution.</li>
        </ul>
        <p className="text-base text-primaryText font-inter">
          By engaging with our content, you consent to receive ongoing marketing communications. You may unsubscribe, but your data may be retained for audit or compliance purposes. Please refer to our Privacy Policy for further details.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">11. ADVERTISING LAW COMPLIANCE</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC produces promotional content in accordance with the advertising disclosure standards set forth by the Federal Trade Commission (FTC) and the SEC’s interpretations of sponsored investment-related communications.
        </p>
        <p className="text-base text-primaryText font-inter">We make good-faith efforts to disclose all:</p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Compensation arrangements,</li>
          <li>Conflicts of interest,</li>
          <li>Risks,</li>
          <li>Limitations of our role, and</li>
          <li>The promotional nature of this content.</li>
        </ul>
        <p className="text-base text-primaryText font-inter">
          We do not provide investment recommendations under any regulatory framework including, but not limited to, SEC Regulation Analyst Certification, FINRA Rule 2210, or Regulation Best Interest.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">12. NON-U.S. USERS</h4>
        <p className="text-base text-primaryText font-inter">
          This material is intended solely for distribution within the United States. If you are accessing this site from outside the U.S., you are responsible for complying with your country’s laws. Relqo Media disclaims liability for access from non-U.S. jurisdictions where investor promotion, marketing, or solicitation of securities is restricted or prohibited.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">13. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY</h4>
        <p className="text-base text-primaryText font-inter">All content is provided “as-is” and without warranties of any kind, either express or implied. Relqo Media LLC disclaims any and all liability for:</p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Investment losses,</li>
          <li>Inaccuracies,</li>
          <li>Technical delays,</li>
          <li>User misunderstandings,</li>
          <li>Omissions or errors in content.</li>
        </ul>
        <p className="text-base text-primaryText font-inter">Total liability for any claim shall not exceed one hundred dollars ($100).</p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">14. LEGAL GOVERNANCE AND DISPUTE RESOLUTION</h4>
        <p className="text-base text-primaryText font-inter">
          All matters arising out of this disclaimer shall be governed by the laws of the State of Wyoming. You agree that any dispute shall be resolved exclusively through binding arbitration under the rules of the American Arbitration Association, to be held in Sheridan County, Wyoming. Class action claims and group arbitration are expressly prohibited.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">15. NON-SOLICITATION AND GEOGRAPHIC LIMITATIONS</h4>
        <p className="text-base text-primaryText font-inter">
          Nothing in our content constitutes a general solicitation or a personal securities recommendation. If you reside in a jurisdiction where such communications are unlawful, you must exit this site and discontinue engagement with our content.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">16. FINAL NOTICE – ACCEPTANCE OF TERMS</h4>
        <p className="text-base text-primaryText font-inter">
          We reserve the right to update this Disclaimer at any time without notice. Your continued use of our services or content constitutes acceptance of the most recent version.
        </p>
        <p className="text-base text-primaryText font-inter">If you do not accept all terms of this disclaimer in full, you must:</p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Exit our websites,</li>
          <li>Unsubscribe from our communications,</li>
          <li>Discontinue viewing all Relqo Media promotional content.</li>
        </ul>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">17. NO RELIANCE</h4>
        <p className="text-base text-primaryText font-inter">By viewing or engaging with this content, you agree that:</p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>You will not rely on any statements made by Relqo Media for investment purposes,</li>
          <li>You waive any claim that our content was a material factor in your investment decision,</li>
          <li>You have read, understood, and accepted this disclaimer in full.</li>
        </ul>

        <p className="text-base text-primaryText font-inter">© 2024 Relqo Media LLC. All Rights Reserved.</p>
        <p className="text-base text-primaryText font-inter">Legal Contact: <Link href="mailto:support@stockverse.com" className="underline text-[#190DF4]">📧 support@stockverse.com</Link></p>
        <p className="text-base text-primaryText font-inter">Mailing Address: 1309 Coffeen Ave Ste 1200, Sheridan, WY 82801</p>
        <p className="text-base text-primaryText font-inter">Affiliate Disclosure: Relqo Media LLC owns and operates <Link href="/" className="underline text-[#190DF4]">Stockverse.com</Link> and all affiliated digital properties.</p>
      </div>
    </div>
    </>
  )
}

export default IQSTPage;