'use client';
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaRegEnvelope } from "react-icons/fa";
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

const CABR = () => {
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
  const [newsletter, setNewsletter] = useState(false);
  const heading = "Winning Stock Picks"
  const subHeading = "Grow Your Wealth by +673.66%! Get Exclusive Stock Picks Sent To Your Inbox!"


  const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

  const handleSubscribeEmailPhone = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const requestData = {
        email,
        tag: 'BBGI subscriber'
      };

      // Only add the phone number if it is provided
      if (phone) {
        requestData.phone = `${phone}`;
      }

      const response = await axios.post(`${STOCKVERSE_BACK_END}/stockpicks/create-contact`, requestData);

      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        setMessage(data.message);
        setLoading(false);
        setEr(false);
        setEmail('');
        setPhone('');
        setDone(true);
      } else {
        setDone(true);
        setEr(true);
        setEmail('');
        setPhone('');
        setMessage(data.message || 'Something went wrong');
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setEr(true);
        setDone(true);
        setEmail('');
        setPhone('');
        setMessage(error.response.data.message || 'Something went wrong');
        // setMessage('An error occurred. Please try again.');
        setLoading(false);
      } else {
        setDone(true);
        setEr(true);
        setEmail('');
        setPhone('');
        setMessage('An error occurred. Please try again.');
        setLoading(false);
      }
      console.error('Error during subscribing:', error);
    }
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${STOCKVERSE_BACK_END}/stocks-list?symbols=bbgi`);
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
          <div className="w-[70%] max-lg:w-[100%] lg:space-y-10 space-y-6">
            <div>
            <h1 className="text-black 2xl:text-6xl sm:text-[3.5rem] text-[3rem] !leading-[1.2] font-DM font-sansMedium">Hot Stock Alert:</h1>
            <h2 className="text-black 2xl:text-6xl sm:text-[3.5rem] text-[3rem] !leading-[1.2] font-DM font-sansMedium">(NASDAQ: <Link href='/dashboard?symbol=BBGI' className=" text-darkGreen"> BBGI</Link>)</h2>
            </div>
            <div className="space-y-4">
              <p className={`text-gray/60 2xl:text-xl text-lg font-MontserratBold w-full`}> Fast-Growing Wellness Rollup Primed for Expansion — Here’s Why BBGI Stands Out</p>
              <p className={`text-gray/60 ${montserrat.className} 2xl:text-xl text-lg w-full`}>BBGI (NASDAQ: BBGI) is building a diversified platform of high-potential wellness and consumer brands, focusing on innovation and rapid growth in health-related markets. Through strategic acquisitions, new product launches, and smart partnerships, BBGI is expanding its footprint and creating multiple revenue streams. With a tight share structure and experienced leadership, BBGI is positioned for outsized gains as wellness demand accelerates.<span className="font-MontserratBold"> Add BBGI to Your Watchlist Immediately.</span></p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=BBGI' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/fedelity.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.schwab.com/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/charles.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=BBGI' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/article-link.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://robinhood.com/stocks/bbgi/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/robinhood_logo.png' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.webull.com/quote/nasdaq-BBGI' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg bg-[#fff]" width={60} height={60} src='/images/webull.png' alt="logo" loading="eager" />
              </Link>
            </div>
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
                href="https://marketchameleon.com/Overview/BBGI/PressReleases/" target="_blank" rel="noopener noreferrer">
                BEASLEY BROADCAST GROUP REPORTS FIRST QUARTER REVENUE OF $48.9 MILLION
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 border-b border-[#F2F3F3] text-[#343D48] hover:underline"
                href="https://marketchameleon.com/PressReleases/i/2066468/BBGI/beasley-broadcast-group-reports-fourth-quarter-revenue" target="_blank" rel="noopener noreferrer">
                BEASLEY BROADCAST GROUP REPORTS FOURTH QUARTER REVENUE OF $67.3 MILLION
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 text-[#343D48] hover:underline"
                href="https://www.stocktitan.net/news/BBGI/beasley-broadcast-group-to-report-2025-first-quarter-financial-ypk3st9qjzrh.html"
                target="_blank" rel="noopener noreferrer">
                BEASLEY BROADCAST GROUP TO REPORT 2025 Q1 FINANCIAL RESULTS, HOST CONFERENCE CALL ON MAY 7
              </Link>
            </div>
          </div>
          <div className="w-[50%] max-md:w-[100%] max-lg:w-[100%] max-lg:order-3 max-md:order-2">
            <p className="text-gray/60 font-MontserratMedium text-right pb-4">*Sponsored</p>
            <h3 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-3xl text-2xl !leading-[1.5] mb-4 max-md:text-left">
              Beasley Broadcast Group (NASDAQ: BBGI): 5 Reasons Investors Should Take Notice
            </h3>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              Beasley Broadcast Group, Inc. (NASDAQ: BBGI) operates 57 U.S. radio stations and a growing digital & sports network. {`Here’s`} why the company could be gaining renewed investor attention:
            </p>
            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48] text-center">1. Q1 2025 Revenue Holds Despite Ad Market Challenges</h6>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Q1 net revenue was <span className="font-MontserratBold">$48.9 million</span>, declined 10.1% year-over-year—but adjusted EBITDA rose from <span className="font-MontserratBold">$0.9 million to $1.1 million</span>, a 28% increase</li>
              <li>Operating expenses fell approximately <span className="font-MontserratBold">$4 million</span>, reflecting broader cost-control initiatives . This demonstrates financial discipline helping to preserve margins amid top-line pressure.</li>
            </ul>
            {/* <Image className="w-full my-6 xl:my-12 mb-[8] xl:mb-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498} /> */}

            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12  text-center text-[#343D48]">
              2. Digital Segment Shows Strong Profitability Momentum
            </h6>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Digital revenue now accounts for ~22% of total revenue.</li>
              <li>Operating income from digital climbed from <span className="font-MontserratBold">$0.1 million</span> in Q1 2024 to <span className="font-MontserratBold">$1.9 million</span> in Q1 2025</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              The improved profitability in digital supports diversification beyond traditional broadcast.
            </p>
            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              3. Robust $20M in Annualized Cost Savings
            </h6>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Q4 2024 results highlighted <span className="font-MontserratBold">$20 million</span> annualized expense reductions via workforce and operational efficiencies</li>
              <li>These savings contributed to stronger EBITDA per indenture, which doubled in Q4 to <span className="font-MontserratBold">$12.5 million</span></li>
              <li>Ongoing efficiency should further enhance profitability.</li>
            </ul>
            <h6 className="font-MontserratBold text-center  text-lg 2xl:text-xl pt-12 text-[#343D48]">
              4. Revenue Boost from Election-Cycle Political Ads
            </h6>

            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Q4 net revenue rose 2.3% (to <span className="font-MontserratBold">$67.3 million</span>), driven by <span className="font-MontserratBold">$8.3 million</span> in political advertising </li>
              <li>For a cyclical boost, BBGI is capitalizing on political ad revenue opportunities to offset soft spots in core segments.</li>
            </ul>

            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              5. Strengthening Local Engagement and New Sports Rights
            </h6>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Local direct advertiser revenue increased slightly (0.3% YoY) and now makes up 55% of local business</li>
              <li>BBGI also expanded its sports vertical, securing a flagship agreement with University of Michigan Athletics</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 pb-4 text-[#343D48]">
              These moves help fortify community ties and build recurring advertiser partnerships.
            </p>
            <div className="overflow-x-auto w-full pt-4">
              <div className="min-w-max flex">
                <div className="min-w-max">
                  <p className="w-full font-MontserratMedium text-base py-2 border-b-2 border-black pr-8">Segment</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Digital</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Advertising</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Cost Control</p>
                </div>
                <div className="min-w-max">
                  <p className="w-full font-MontserratMedium text-base py-2 border-b-2 border-black pr-8">Highlights</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">	22% of total revenue; strong profit gains</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Political + Local growing, though national ad market remains weak </p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">$20M saved; better EBITDA and operating income</p>
                </div>
              </div>
            </div>
            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              Final Considerations
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              BBGI {`isn’t`} a perfect turnaround play—national ad revenue is under pressure, and Q4 showed a net loss. Still, the company is making solid strides:
            </p>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Margin expansion through cost efficiencies</li>
              <li>Digital and sports growth adding diversified revenue</li>
              <li>Tactical use of political ad cycles to improve results</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              For investors focused on broadcasting firms balancing legacy operations with digital transformation, BBGI may deserve a spot on the radar. As always, consider risks—cyclical revenue, continued investment needs, and debt levels—and conduct full due diligence with financial filings and earnings call details.
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
              <Image className="w-[15%] rounded-full" src="/images/bbgi.svg" alt="neov" width={52} height={52} loading="lazy" />
              <div className="">
                <p className="text-base font-MontserratBold">Beasley Broadcast Group Inc (NASDAQ: BBGI)</p>
                <p className="flex items-center gap-2 font-MontserratMedium text-xs 2xl:text-sm text-[#747474]">BBGI <Image src="/images/nasdaq.svg" alt="neov" width={24} height={24} loading="lazy" /> NASDAQ Stock Market</p>
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
          Add <Link href='/dashboard?symbol=BBGI' className="font-MontserratBold underline"> BBGI</Link> to your watchlist today
        </h4>
        <div className="w-full xl:container mx-auto pb-2 px-3 flex flex-col items-center">
          <div className="lg:w-[50%] w-full">
            <p className="font-MontserratMedium text-gray/60">Disclaimer</p>
            <p className="pb-4 font-MontserratMedium text-gray/60">This article is a paid advertisement and is for informational purposes only. It does not constitute investment advice, a solicitation, or an offer to buy or sell any securities. All information presented has been compiled from publicly available sources believed to be accurate as of the date of writing. However, no representation or warranty is made as to its accuracy or completeness.</p>
            <p className="pb-4 font-MontserratMedium text-gray/60">This communication includes forward-looking statements, which involve known and unknown risks, uncertainties, and other factors that may cause actual results to differ materially from those expressed or implied. Such statements reflect current expectations but are subject to change without notice.</p>
            <p className="pb-4 font-MontserratMedium text-gray/60">Investors are strongly encouraged to conduct their own due diligence and consult with a licensed financial advisor before making any investment decisions.</p>
            <p className="pb-4 font-MontserratMedium text-gray/60">For details regarding compensation and potential conflicts of interest, please refer to the full disclaimer below.</p>
          </div>
        </div>
        <div className="flex items-center  justify-center border-y-2 border-[#3934341c]">
          <Link href='https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=BBGI' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem]  flex items-center justify-center border-x-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/6.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.schwab.com/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/7.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.tradingview.com/symbols/NASDAQ-BBGI/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/8.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=bbgi' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
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
          {/* <div className="w-full xl:w-[40%] lg:w-[48%] md:w-[70%]">
            <div className="bg-[#111111] border border-solid border-[#404040] p-6 sm:p-8 rounded-2xl shadow-lg">
              <h4 className="text-center text-[#fff] font-MontserrarMedium text-xl sm:text-2xl italic mb-4">
                — Your Next Winning Stock Awaits!
              </h4>
              <p className="text-center text-[#aaaaaa] font-MontserratRegular text-[1rem] sm:text-[1.3rem] mb-10 sm:mb-16 px-2 sm:px-4">
                Grow Your Wealth by <span className="text-blue-500">+673.66%</span>! Sign Up Now for Exclusive Stock Picks and Alerts
              </p>
              {!done && (
                <form onSubmit={handleSubscribeEmailPhone} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="placeholder:text-[#1E1E1F] font-MontserratRegular text-black w-full p-1.5 px-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
                    <PhoneInput
                      className="!font-MontserratRegular"
                      country={"us"}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      inputProps={{
                        id: "phone",
                        name: "phone",
                        required: true, // HTML5 validation
                        autoFocus: false,
                      }}
                      inputStyle={{
                        width: "100%",
                        padding: "10px 10px 10px 50px",
                        fontSize: "16px",
                        border: "1px solid rgba(156, 163, 175, 0.4)",
                        borderRadius: "0.5rem",
                        backgroundColor: "#F7FAFC",
                        color: "#1A202C",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      dropdownStyle={{
                        borderRadius: "0.5rem",
                      }}
                      
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      checked={privacyChecked}
                      onChange={() => setPrivacyChecked(!privacyChecked)}
                      required
                      className="placeholder:text-[#1E1E1F] w-5 h-5 rounded bg-gray-800 border-gray-700 focus:ring-blue-500"
                    />
                    <label htmlFor="privacyPolicy" className="text-[1rem] font-MontserratRegular text-[#96A0B5]">
                      Privacy Policy
                    </label>
                  </div>
                  <p className="text-sm text-[#96A0B5] font-MontserratRegular">
                    By submitting this form and signing up for texts, you consent to receive marketing text messages (e.g., promos, cart reminders)
                    from Relqo Media at the number provided, including messages sent by autodialer. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Unsubscribe at any time by replying STOP or clicking the unsubscribe link (where available).{" "}
                    <a href="/policy" className="text-[#0A84EF] text-[0.8rem] underline font-MontserratSemibold">
                      Privacy Policy
                    </a>{" "}
                    &{" "}
                    <a href="/terms" className="text-[#0A84EF] text-[0.8rem] font-MontserratSemibold underline">
                      Terms
                    </a>
                    .
                  </p>
                  <button 
                  disabled={!isFormValid}
                  type="submit" 
                  className={`${isFormValid ? '' : 'cursor-not-allowed'} w-full bg-[#0A84EF] font-MontserratMedium hover:bg-blue-700 text-[#fff] p-2 rounded`}>
                    {isSubmitting ? "Subscribing..." : <>
                      Continue
                    </>}
                  </button>
                </form>
              )}
              {done && (
                <div className={`${er ? 'text-sell' : 'text-buy'} bg-[#fff] p-2 px-4 rounded-lg text-base font-sansMedium`}>
                  {message}
                </div>
              )}
            </div>
          </div> */}

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
      <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter} tag={"CABR subscriber popup"} heading={heading} subHeading={subHeading}/>
      {/* disclaimer */}
      <div className="hero py-16 max-md:py-6 w-full border-t-[1.2px] border-[#404040]">
      <div className="mx-auto xl:container gap-y-4 px-8 xl:px-3 max-sm:gap-y-3 flex flex-col items-start">
        <h4 className="text-3xl font-inter font-bold text-primaryText">MASTER LEGAL DISCLAIMER</h4>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Effective Date</span>: August 2024</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Last Updated</span>: June 15, 2025</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Publisher</span>: Relqo Media LLC (Wyoming, United States)</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Subject Company</span>: Beasley Broadcast Group, Inc. (NASDAQ: BBGI)</p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">IMPORTANT SUMMARY — PLEASE READ FIRST</h4>
        <p className="text-base text-primaryText font-inter">
          This communication is published by Relqo Media LLC, a Wyoming-based marketing and media firm. The content distributed regarding Beasley Broadcast Group, Inc. (NASDAQ: BBGI) is not part of a paid promotional campaign. No compensation has been received by Relqo Media LLC or its affiliates in connection with the dissemination of this material.        
        </p>
        <p className="text-base text-primaryText font-inter">
          This communication is not investment advice, not a research report, and not an offer to buy or sell any security. Relqo Media LLC is not a broker-dealer, investment adviser, or securities analyst.
        </p>
        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">1. NATURE AND INTENT OF THIS COMMUNICATION</h4>
        <p className="text-base text-primaryText font-inter">
          This message is intended to inform subscribers of Relqo Media LLC about the BBGI stock as a free stock pick based on editorial discretion. It is provided solely for informational purposes and should not be construed as investment guidance or an endorsement of the {`stock’s`} performance.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">2. No Compensation</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC and its affiliates have not received any form of compensation, including cash or stock, from BBGI, its shareholders, or any third parties in connection with this communication.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">3. INTENDED AUDIENCE</h4>
        <p className="text-base text-primaryText font-inter">
          This content is directed toward U.S.-based self-directed investors who understand the risks associated with investing in Nasdaq-listed and microcap stocks. This communication is not intended for retirement account management, senior investors, or individuals seeking long-term investment strategies.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">4. No Endorsement or Verification</h4>
        <p className="text-base text-primaryText font-inter">
          Any statements, projections, or forward-looking commentary related to BBGI have not been independently verified. This content is speculative in nature. Relqo Media LLC does not independently confirm or validate corporate claims made by the featured company.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">5. Market Behavior Disclaimer</h4>
        <p className="text-base text-primaryText font-inter">
          Stock picks shared freely with audiences may result in short-term volatility. Recipients should understand that:
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Stock price movements may reflect temporary speculation;</li>
          <li>Prices may rise and fall rapidly;</li>
          <li>Market behavior may not align with company fundamentals.</li>
        </ul>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">6. Investor Responsibility</h4>
        <p className="text-base text-primaryText font-inter">
          You are solely responsible for your investment decisions. We strongly encourage you to:
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Review {`BBGI’s filings on the SEC’s`} EDGAR database;</li>
          <li>Consult a licensed investment professional;</li>
          <li>Be aware of risks including volatility, liquidity, and limited analyst coverage.</li>
        </ul>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">7. Forward-Looking Statements</h4>
        <p className="text-base text-primaryText font-inter">
          Any forward-looking statements mentioned (e.g., growth prospects, partnerships, or revenue expectations) are subject to risks and uncertainties and are protected under the safe harbor provisions of Sections 27A and 21E of the Securities Act. Actual outcomes may differ materially.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">8. No Ownership Disclosure</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC, its contractors, or affiliates may buy, hold, or sell shares of BBGI at any time, without obligation to disclose such activity. However, as of the date of this communication, Relqo Media affirms it does not currently hold any shares in BBGI.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">9. Consent and Data Usage</h4>
        <p className="text-base text-primaryText font-inter">
          By engaging with our content (including emails and text messages), you agree to receive additional marketing materials from Relqo Media LLC. Data collected may be retained for compliance and audit purposes. You may opt out at any time.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">10. Legal Compliance</h4>
        <p className="text-base text-primaryText font-inter">This message complies with FTC and SEC disclosure standards for investment-related communications. It does not meet the regulatory requirements of FINRA Rule 2210, SEC Regulation Best Interest, or similar frameworks.</p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">11. No Solicitation – U.S. Only</h4>
        <p className="text-base text-primaryText font-inter">
          This content is not a general solicitation or a targeted recommendation. It is intended for U.S. audiences only. Access from other jurisdictions is not advised.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">12. Limitation of Liability</h4>
        <p className="text-base text-primaryText font-inter">Relqo Media LLC disclaims all liability for:</p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Investment losses,</li>
          <li>Technical delays,</li>
          <li>Errors or omissions.</li>
        </ul>
        <p className="text-base text-primaryText font-inter">
          Maximum aggregate liability shall not exceed $100.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">13. Jurisdiction</h4>
        <p className="text-base text-primaryText font-inter">This communication is governed by the laws of Wyoming. Any disputes must be resolved via binding arbitration in Sheridan County, Wyoming. No class actions or group arbitration permitted.</p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">14. Acceptance of Terms</h4>
        <p className="text-base text-primaryText font-inter">
          By reading, clicking, or engaging with this content, you agree to all terms of this disclaimer. If you do not accept, please:
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>Exit our websites,</li>
          <li>Unsubscribe from communications,</li>
          <li>Cease further engagement with our content.</li>
        </ul>

        <p className="text-base text-primaryText font-inter">© 2024 Relqo Media LLC. All Rights Reserved.</p>
        <p className="text-base text-primaryText font-inter">Contact: <Link href="mailto:support@stockverse.com" className="underline text-[#190DF4]">📧 support@stockverse.com</Link></p>
        <p className="text-base text-primaryText font-inter">Address: 1309 Coffeen Ave Ste 1200, Sheridan, WY 82801</p>
      </div>
    </div>
    </>
  )
}

export default CABR;