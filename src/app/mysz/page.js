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

const MYSZ = () => {
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
        tag: 'MYSZ subscriber'
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
        const response = await fetch(`${STOCKVERSE_BACK_END}/stocks-list?symbols=mysz`);
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
            <h1 className="text-black 2xl:text-6xl sm:text-[3.5rem] text-[3rem] !leading-[1.2] font-DM font-sansMedium">Hot Stock Alert:</h1>
            <h2 className="text-black 2xl:text-6xl sm:text-[3.5rem] text-[3rem] !leading-[1.2] font-DM font-sansMedium">(NASDAQ: <Link href='/dashboard?symbol=MYSZ' className=" text-darkGreen"> MYSZ</Link>)</h2>
            </div>
            <div className="space-y-4">
              <p className={`text-gray/60 2xl:text-xl text-lg font-MontserratBold w-full`}> Disruptive Tech Play Set for a Breakout — {`Here’s What’s`} Driving It</p>
              <p className={`text-gray/60 ${montserrat.className} 2xl:text-xl text-lg w-full`}>My Size, Inc. (NASDAQ: MYSZ) uses AI-powered measurement apps to help shoppers find the right fit, driving strong growth as major retailers adopt its technology worldwide. With expanding markets, new acquisitions, and rising subscription revenue, MYSZ stands out as a high-upside play in e-commerce.<span className="font-MontserratBold"> Add MYSZ to Your Watchlist Immediately.</span></p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=MYSZ' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/fedelity.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.schwab.com/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/charles.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=MYSZ' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/article-link.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://robinhood.com/stocks/mysz/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/robinhood_logo.png' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.webull.com/quote/nasdaq-mysz' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg bg-[#fff]" width={60} height={60} src='/images/webull.png' alt="logo" loading="eager" />
              </Link>
            </div>
          </div>
          <div className="w-[35%] max-md:w-[75%] max-sm:w-[100%] max-lg:w-[60%] lg:mt-12">
            <div>
              {done && (
                <div className={`${er ? 'text-sell' : 'text-[#fff]'} w-full bg-[#12a72e] absolute left-0 top-16 p-2 px-4 text-center text-base font-sansMedium`}>
                  {er ? `${message}` : 'Thanks For Subscribing.'}
                </div>
              )}
              <form className="flex flex-col gap-4 items-center justify-between w-full relative" onSubmit={handleSubscribeEmailPhone}>
                <Image width={24} height={24} src='/images/cvkd/sms.svg' alt="sms" className="absolute top-6 left-6" loading="eager" />
                <input
                  autoComplete="email"
                  name="search_Symbols"
                  type="email"
                  className="w-[100%] max-lg:w-[100%] pl-14 p-6 font-MontserratMedium rounded-full placeholder:text-sm  text-base max-lg:text-xl bg-white rounded outline outline-1 outline-[#DDE9EF]"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="w-full relative">
                  <Image width={24} height={24} src='/images/cvkd/phone.svg' alt="sms" className="absolute top-6 left-6" loading="eager" />
                  <input
                    name="search_Symbols"
                    type="tel"
                    className="w-[100%] max-lg:w-[100%] pl-14 p-6 font-MontserratMedium rounded-full placeholder:text-sm  text-base max-lg:text-xl bg-white rounded outline outline-1 outline-[#DDE9EF]"
                    placeholder="Enter your phone number"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                  {/* Custom floating placeholder */}
                  {phone === '+1' && (
                    <span className="font-MontserratMedium absolute left-20 top-1/2 -translate-y-1/2 text-sm transition-all pointer-events-none text-[#9CA3AF] peer-focus:hidden">
                      Enter your phone number
                    </span>
                  )}
                </div>
                <button 
                disabled={!isFormValid}
                type="submit" 
                className={`animate-heartbeat bg-darkGreen text-sm text-[#fff] font-MontserratSemibold px-6 py-4 rounded-full shadow-lg transition ${isFormValid ? '' : 'cursor-not-allowed'}  ${isSubmitting ? "cursor-not-allowed bg-[#649f6f]" : "bg-[#12A72E]"}`}>

                  {isSubmitting ? "Subscribing..." : <>
                    Get Winning Stock Picks <span className="font-MontserratBold max-md:hidden">&#8212; FREE</span>
                  </>}
                </button>
              </form>
              <div className="flex items-center gap-2 2xl:w-[70%] w-[80%] mt-8 2xl:mt-12 relative">
                <Image src="/images/investors.svg" alt="investors" width={102} height={49} loading="eager" />
                <p className="text-gray/60 font-MontserratMedium text-base">
                  Join 128,000 smart investors. Subscribe today.
                </p>
                <Image className="absolute -right-24 2xl:w-[8rem] w-[7rem] max-lg:-right-20 2xl:-right-38 2xl:-top-12" src="/images/arrow.png" alt="arrow" width={112} height={111} loading="eager" />
              </div>
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
                href="https://www.prnewswire.com/news-releases/mysize-present-year-over-year-growth--2025-targets-15m-revenue--anticipates-strong-2024-finish-close-to-100-growth-from-2022-302339582.html" target="_blank" rel="noopener noreferrer">
                    MySize present year over year growth, 2025 targets $15M Revenue, Anticipates Strong 2024 Finish close to 100% Growth from 2022
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 border-b border-[#F2F3F3] text-[#343D48] hover:underline"
                href="https://www.prnewswire.com/news-releases/my-size-launches-online-store-modelista-to-showcase-mysizeid-mobile-measurement-technology-for-online-retailers-300768815.html" target="_blank" rel="noopener noreferrer">
                My Size Launches Online Store {`'Modelista'`} to Showcase MySizeID™ Mobile Measurement Technology for Online Retailers
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 text-[#343D48] hover:underline"
                href="https://www.prnewswire.com/news-releases/my-size-joins-international-apparel-federation-300619252.html"
                target="_blank" rel="noopener noreferrer">
                My Size Joins International Apparel Federation
              </Link>
            </div>
          </div>
          <div className="w-[50%] max-md:w-[100%] max-lg:w-[100%] max-lg:order-3 max-md:order-2">
            <p className="text-gray/60 font-MontserratMedium text-right pb-4">*Sponsored</p>
            <h3 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-3xl text-2xl !leading-[1.5] mb-4 max-md:text-left">
              My Size, Inc. (NASDAQ: MYSZ): 5 Reasons This Stock Should Be on Your Radar
            </h3>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              My Size, Inc. is a U.S. tech company that makes smartphone apps and cloud software to help shoppers accurately measure themselves for online clothing purchases, reducing returns and improving fit, with revenue from product sales and software subscriptions.
            </p>
            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48] text-center">1. Consistent Revenue Growth and Improving Margins</h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              According to recent company filings and press releases:
            </p>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li><span className="font-MontserratBold"> My Size, Inc. (NASDAQ: MYSZ)</span> reported $8.26 million in revenue for 2024, representing an 18% increase year-over-year.</li>
              <li>Net loss narrowed to <span className="font-MontserratBold"> $3.99 million</span>, a 37% improvement over the prior year, with management targeting further cost reductions.</li>
              <li>The company ended 2024 with <span className="font-MontserratBold"> $4.88 million</span> in cash and cash equivalents, more than doubling its cash position from the previous year.</li>
              <li>My Size reaffirmed a strong growth outlook for 2025, focusing on international expansion, strategic acquisitions, and enhanced AI technology solutions.</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              These metrics indicate solid top-line momentum and clear progress toward profitability. However, forward-looking statements are inherently subject to execution and market risks.
            </p>

            {/* <Image className="w-full my-6 xl:my-12 mb-[8] xl:mb-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498} /> */}

            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12  text-center text-[#343D48]">
              2. Lean Share Structure and Strong Per-Share Fundamentals
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Based on public disclosures:
            </p>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li><span className="font-MontserratBold">My Size currently has approximately 3.1 million shares outstanding </span> (as of June 2025), resulting in a compact float for a Nasdaq-listed tech company.</li>
              <li><span className="font-MontserratBold">Equity per share (2024):</span>  ~$2.67</li>
              <li><span className="font-MontserratBold">{`Shareholders’`} equity per share:</span> ~$2.23</li>
              <li><span className="font-MontserratBold">Market capitalization:</span> About $3.6 million</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              This lean structure means each share is backed by solid assets and revenue, making MYSZ particularly sensitive to news, growth, and trading activity—though volatility is also higher in low-float stocks.
            </p>
            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              3. Rapid Growth in AI-Powered Sizing and E-commerce Platforms
            </h6>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li><span className="font-MontserratBold">{`My Size’s`}</span> flagship solutions, <span className="font-MontserratBold">MySizeID</span> and <span className="font-MontserratBold">Naiz Fit</span>, use AI and computer vision to help online shoppers accurately measure for clothing, boosting conversions and reducing costly returns.</li>
              <li>In 2024, <span className="font-MontserratBold"> Naiz Fit delivered over 42 million size recommendations</span> and helped clients increase average order values by 27%, while reducing return rates by 14%.</li>
              <li>The {`company’s`} e-commerce business, Orgad, is rapidly expanding in both North America and Europe, now certified by a major European retailer.</li>
              <li>Integration with leading platforms (Shopify, Magento, Salesforce) has positioned My Size as a go-to solution for over 100 fashion brands.</li>
            </ul>
            <h6 className="font-MontserratBold text-center  text-lg 2xl:text-xl pt-12 text-[#343D48]">
              4. Strategic Acquisitions and Expansion Initiatives
            </h6>

            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>My Size continues to pursue a growth-by-acquisition strategy, recently acquiring Percentil’s assets and expanding into second-hand apparel and circular fashion—a sector benefiting from new EU sustainability regulations.</li>
              <li>The company signed Letters of Intent for further acquisitions in AI-powered shoe tech and adjacent sectors.</li>
              <li>Board additions include executives with IPO and M&A experience, aligning with stated ambitions for long-term scale.</li>
            </ul>

            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              5. Retail Investor Takeaways
            </h6>
            <div className="overflow-x-auto w-full pt-4">
              <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 pb-4 text-[#343D48]">
                MYSZ currently trades at a price-to-sales (P/S) ratio of around 0.16x–0.34x, well below other SaaS and retail tech peers, which typically trade at higher multiples.
              </p>
              <div className="min-w-max flex">
                <div className="min-w-max">
                  <p className="w-full font-MontserratMedium text-base py-2 border-b-2 border-black pr-8">Factor</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Growth Trend</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Upside Potential</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Financial Health</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Strategic Moves</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Valuation</p>
                </div>
                <div className="min-w-max">
                  <p className="w-full font-MontserratMedium text-base py-2 border-b-2 border-black pr-8">Revenue</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">	Revenue up 18% with strong cash growth</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">	Analyst target ~3x current price</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Low debt, strong liquidity</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">Board upgrades, tech expansion, sustainable focus</p>
                  <p className="w-full font-MontserratRegular text-base py-2 border-b border-black pr-8">	Appears undervalued if growth sustains</p>
                </div>
              </div>
            </div>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Comparable companies in e-commerce enablement or SaaS often command much higher P/S ratios, reflecting sector enthusiasm for recurring revenue and scalable platforms.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              This relative undervaluation may present a re-rating opportunity if My Size continues to deliver growth and margin improvements.
            </p>

            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              What My Size, Inc. Does: A Business Overview
            </h6>
            <p className="font-MontserratSemibold text-base 2xl:text-xl pt-12 text-[#343D48]">
              AI-Driven Retail Tech:
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-2 text-[#343D48]">
              My Size develops mobile and cloud-based tools that use AI and machine learning to deliver accurate sizing for online apparel shoppers, improving the online shopping experience and reducing costly returns for retailers.
            </p>
            <p className="font-MontserratSemibold text-base 2xl:text-xl pt-12 text-[#343D48]">
              E-commerce Operations:
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-2 text-[#343D48]">
              Through Orgad and other platforms, My Size runs its own online retail and B2B channels, expanding its geographic reach and diversifying revenue streams.
            </p>
            <p className="font-MontserratSemibold text-base 2xl:text-xl pt-12 text-[#343D48]">
              SaaS Revenue Model:
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-2 text-[#343D48]">
              The company generates income through direct product sales, software licensing, cloud-enabled subscriptions, and associated support services.
            </p>
            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              Final Considerations
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              My Size, Inc. (NASDAQ: MYSZ) is an innovative micro-cap technology company focused on solving a real-world e-commerce challenge. Its improving revenue, tight share structure, deepening SaaS adoption, and recent expansion moves make it a stock worth watching. As always, investors should conduct thorough research, review the latest filings, and consider both the potential rewards and risks associated with smaller, high-growth companies in the tech sector.
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
              <Image className="w-[15%]" src="/images/mysz.webp" alt="neov" width={52} height={52} loading="lazy" />
              <div className="">
                <p className="text-base font-MontserratBold">My Size, Inc.</p>
                <p className="flex items-center gap-2 font-MontserratMedium text-xs 2xl:text-sm text-[#747474]">MYSZ <Image src="/images/nasdaq.svg" alt="neov" width={24} height={24} loading="lazy" /> Nasdaq Stock Market</p>
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
          Add <Link href='/dashboard?symbol=MYSZ' className="font-MontserratBold underline"> MYSZ</Link> to your watchlist today
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
          <Link href='https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=MYSZ' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem]  flex items-center justify-center border-x-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/6.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.schwab.com/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/7.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.tradingview.com/symbols/NASDAQ-MYSZ/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/8.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=mysz' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
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
          <div className="w-full xl:w-[40%] lg:w-[48%] md:w-[70%]">
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
          </div>

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
      <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter} tag={"MYSZ subscriber popup"} heading={heading} subHeading={subHeading}/>
      {/* disclaimer */}
      <div className="hero py-16 max-md:py-6 w-full border-t-[1.2px] border-[#404040]">
      <div className="mx-auto xl:container gap-y-4 px-8 xl:px-3 max-sm:gap-y-3 flex flex-col items-start">
        <h4 className="text-3xl font-inter font-bold text-primaryText">MASTER LEGAL DISCLAIMER</h4>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Effective Date</span>: August 2024</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Last Updated</span>: June 15, 2025</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Publisher</span>: Relqo Media LLC (Wyoming, United States)</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Subject Company</span>: My Size, Inc. (MYSZ)</p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">IMPORTANT SUMMARY — PLEASE READ FIRST</h4>
        <p className="text-base text-primaryText font-inter">
          This website and any affiliated digital materials are published by Relqo Media LLC, a Wyoming marketing agency that has been compensated in cash by CorporateAds, LLC to produce and distribute promotional content regarding My Size, Inc. (NASDAQ: MYSZ). This communication is a paid advertisement, not a research report, not investment advice, and not an independent publication. Relqo Media is not a broker-dealer, investment adviser, or securities analyst. Investing in small-cap or microcap securities is extremely speculative and may result in the total loss of your investment. We strongly urge all viewers to consult a licensed investment professional and perform their own due diligence.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">1. NATURE AND INTENT OF THIS COMMUNICATION</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC is a for-profit marketing agency engaged in paid promotions of public companies. The content we produce is strictly commercial and intended to create temporary public awareness, visibility, and short-term market activity around the featured company. This material is not impartial. All readers should interpret our content as a paid commercial advertisement and not as an editorial, research article, or independent commentary. We create advertisements, not analysis. These communications are not intended to be factual evaluations of the {`company’s`} operations or investment merit.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">2. COMPENSATION FOR My Size, Inc. (MYSZ)</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC has been retained by CorporateAds, LLC to provide promotional media services for My Size, Inc. (NASDAQ: MYSZ). As of the effective date: June 15, 2025
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter pl-8">
          <li>Relqo Media LLC is receiving cash compensation for digital investor awareness campaigns.</li>
          <li>The total compensation paid for these services is $20,000 for the period beginning June 15, 2025, through June 18, 2025.</li>
          <li>CorporateAds, LLC may own, acquire, or dispose of shares in MYSZ during or after the campaign period.</li>
        </ul>
        <p className="text-base text-primaryText font-inter">
          This relationship creates a material conflict of interest. Relqo {`Media’s`} content regarding MYSZ should be considered promotional, biased, and financially motivated.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">3. INTENDED AUDIENCE</h4>
        <p className="text-base text-primaryText font-inter">
          These Communications are directed solely to U.S.-based, self-directed investors who understand the risks of investing in microcap and Nasdaq-listed securities. The content is not intended for children, seniors, retirement accounts, or individuals with limited experience in securities trading. These Communications are not intended to guide investment for long-term portfolio management or financial planning purposes.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">4. NO ENDORSEMENT OR VERIFICATION OF COMPANY CLAIMS</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC does not independently verify, investigate, or audit any statements made by the company being promoted, its officers, its press releases, or any third-party sources. Any claims, projections, customer announcements, or product statements made in connection with MYSZ should be assumed to be unverified and potentially inaccurate unless independently confirmed.
          You should not rely on any statements regarding future performance, partnerships, revenue projections, or corporate plans.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">5. MARKET INFLUENCE AND TRADING PATTERN EXPECTATION</h4>
        <p className="text-base text-primaryText font-inter">
          Promotional campaigns commonly result in short-lived spikes in stock price and volume, followed by rapid declines. These spikes are typically driven by retail speculation, promotional circulation, and momentary investor interest—not fundamentals. You should expect that:
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>{`MYSZ’s`} stock may increase temporarily during this promotion,</li>
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
          Relqo Media LLC, its contractors, members, and affiliates may hold or acquire shares in the companies we promote, including MYSZ. We may buy or sell such shares without prior notice. These transactions may occur before, during, or after a promotional campaign and may affect market pricing.
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

export default MYSZ;