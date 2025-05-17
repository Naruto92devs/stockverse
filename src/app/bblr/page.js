'use client';
import Image from "next/image";
import React, { useRef, useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaRegEnvelope } from "react-icons/fa";
import formatNumber from "@/components/FormatNumber";
import NewsLetterPopup from "@/components/NewsLetterPopup";
import Chart from '@/components/TradingViewChart';


import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Optional default styles
import axios from "axios";
import Link from "next/link";

import { Mousewheel, } from 'swiper/modules';

const BBLR = () => {
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(null);
  const [stockdata, setstockData] = useState([]); // State to store API data
  const [error, setError] = useState(null); // Error state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [er, setEr] = useState(null);
  const [newsletter, setNewsletter] = useState(true);
  const scrollRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;


  const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

  const handleSubscribeEmailPhone = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const requestData = {
        email,
        tag: 'BBLR subscriber'
      };

      // Only add the phone number if it is provided
      if (phone) {
        requestData.phone = `+${phone}`;
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
        const response = await fetch(`${STOCKVERSE_BACK_END}/stocks-list?symbols=BBLR`);
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



  const handleMouseDown = (e) => {
    isDown = true;
    if (!scrollRef.current) return;
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };



  return (
    <>
      {/* <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter} id={"YizWSN"} baseId={"VSwpYs"}/> */}
      {/* hero */}
      <section className="bg-[#010e140d] 2xl:py-20 xl:py-24 py-12 ">
        <div className="w-full xl:container mx-auto px-3 flex justify-between max-lg:flex-col max-lg:gap-y-8">
          <div className="w-[64%] max-lg:w-[100%] flex flex-col">
            <h1 className="text-[#1D3045] 2xl:text-6xl sm:text-5xl text-[2rem] !leading-[1.2] font-syneBold">AI Penny Stock Alert: </h1>
            <h2 className="text-[#12A72E] 2xl:text-6xl sm:text-5xl text-[2rem] !leading-[1.2] font-syneBold pl-0 max-md:pl-0">Ticker: BBLR (OTCQB)</h2>
            <div className="flex flex-wrap gap-2 pt-8">
              <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=BBLR'>
                <Image className="rounded-lg" width={60} height={60} src='/images/fedelity.jpeg' alt="logo"/>
              </Link>
              <Link href='https://www.schwab.com/'>
                <Image className="rounded-lg" width={60} height={60} src='/images/charles.jpeg' alt="logo"/>
              </Link>
              <Link href='https://www.tradestation.com/'>
                <Image className="rounded-lg" width={60} height={60} src='/images/tradestation.jpg' alt="logo"/>
              </Link>
              <Link href='https://us.etrade.com/home'>
                <Image className="rounded-lg" width={60} height={60} src='/images/etrade.png' alt="logo"/>
              </Link>
              <Link href='https://www.interactivebrokers.com/'>
                <Image className="rounded-lg" width={60} height={60} src='/images/interactive.png' alt="logo"/>
              </Link>
            </div>
            <p className="text-[#343d4899] font-MontserratMedium 2xl:text-xl text-lg 2xl:w-full w-[80%] max-md:w-full pt-10">The Enterprise AI Company Now Listed on AWS Marketplace</p>
          </div>
          <div className="w-[35%] max-md:w-[75%] max-sm:w-[100%] max-lg:w-[60%] lg:mt-12">
            <div>
              {done && (
                <div className={`${er ? 'text-sell' : 'text-[#fff]'} w-full bg-[#12a72e] absolute left-0 top-16 p-2 px-4 text-center text-base font-sansMedium`}>
                  {er ? `${message}` : 'Thanks For Subscribing.'}
                </div>
              )}
              <form className="flex flex-col gap-4 items-center justify-between w-full relative" onSubmit={handleSubscribeEmailPhone}>
                <Image width={24} height={24} src='/images/cvkd/sms.svg' alt="sms" className="absolute top-6 left-6" />
                <Image width={24} height={24} src='/images/cvkd/phone.svg' alt="sms" className="absolute top-28 left-6" />
                <input
                  name="search_Symbols"
                  type="text"
                  className="w-[100%] max-lg:w-[100%] pl-14 p-6 font-MontserratMedium rounded-full placeholder:text-sm  text-base max-lg:text-xl bg-white rounded outline outline-1 outline-[#DDE9EF]"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  name="search_Symbols"
                  type="tel"
                  className="w-[100%] max-lg:w-[100%] pl-14 p-6 font-MontserratMedium rounded-full placeholder:text-sm  text-base max-lg:text-xl bg-white rounded outline outline-1 outline-[#DDE9EF]"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
                <button type="submit" className={`bg-[#12A72E] text-sm text-[#fff] font-MontserratSemibold px-6 py-4 rounded-full shadow-md transition  ${isSubmitting ? "cursor-not-allowed bg-[#649f6f]" : "bg-[#12A72E]"}`}>

                  {isSubmitting ? "Subscribing..." : <>
                    Subscribe now <span className="font-MontserratBold max-md:hidden">&#8212; FREE</span>
                  </>}
                </button>
              </form>
              <div className="flex items-center gap-2 2xl:w-[70%] w-[80%] mt-8 2xl:mt-12 relative">
                <Image src="/images/investors.svg" alt="investors" width={102} height={49} />
                <p className="text-[#4B698D] font-MontserratMedium text-base">
                  Join 128,000 smart investors. Subscribe today.
                </p>
                <Image className="absolute -right-24 2xl:w-[8rem] w-[7rem] max-lg:-right-20 2xl:-right-38 2xl:-top-12" src="/images/arrow.png" alt="arrow" width={112} height={111} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* main */}
      <section className="w-full xl:container mx-auto py-24 px-3">
        <div className="flex lg:items-start justify-between flex-wrap max-lg:gap-y-8">
          <div className="w-[23%] max-lg:w-[48%] max-md:w-full border border-[#DDE9EF] p-2 shadow-md rounded-md 2xl:rounded-xl sticky top-12 max-lg:relative max-lg:top-0 max-lg:order-2">
            <p className="bg-[#F2F3F3] text-[#1D3045] font-MontserratSemibold text-base px-4 py-4 rounded 2xl:rounded-lg">
              Latest News
            </p>
            <div className="flex flex-col gap-2">
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-sm p-2 py-4 border-b border-[#F2F3F3] text-[#343D48] hover:underline"
                href="https://www.benzinga.com/news/24/09/40827755/why-champions-oncology-shares-are-trading-higher-by-over-13-here-are-20-stocks-moving-premarket">
                Why Champions Oncology Shares Are Trading Higher By Over 13%; Here Are 20 Stocks
                Moving Premarket - Champions Oncology ( NASDAQ:CSBR )
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 border-b border-[#F2F3F3] text-[#343D48] hover:underline"
                href="https://www.benzinga.com/pressreleases/24/08/g40481416/presenting-on-the-emerging-growth-conference-74-day-2-on-august-22-register-now">
                Presenting on the Emerging Growth Conference 74 Day 2 on August 22 Register Now -
                BlockchainK2 ( OTC:BIDCF ) , Ascend Wellness Holdings ( OTC:AAWH )
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 text-[#343D48] hover:underline"
                href="https://www.benzinga.com/pressreleases/24/08/g40457701/presenting-on-the-emerging-growth-conference-74-day-1-on-august-21-register-now">
                {`Presenting on the Emerging Growth Conference 74 Day 1 on August 21 Register Now - BlockchainK2 ( OTC:BIDCF ) , Ascend Wellness Holdings ( OTC:AAWH )`}
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 text-[#343D48] hover:underline"
                href="/news/ethical-web-ai">
                {`Ethical Web AI submits AI Vault on AWS Marketplace for Enterprises to Purchase and Install`}
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 text-[#343D48] hover:underline"
                href="/news/ethical-web-ai-aws-partnership">
                {`Ethical Web AI (EWA) announces ground-breaking Software partnership with AWS and full AWS Marketplace Integration`}
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 text-[#343D48] hover:underline"
                href="/news/ethical-web-ai-launches-ai-vault">
                {`Ethical Web AI Launches "AI Vault," a Groundbreaking Enterprise SaaS Solution Designed to Protect Subscribers from Various AI Threats`}
              </Link>
            </div>
          </div>
          <div className="w-[50%] pt-6 max-md:w-[100%] max-lg:w-[100%] max-lg:order-3">
            
            <h3 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl text-2xl !leading-[1.5] mb-4 max-md:text-left">
              {`A Microcap You’ve Probably Never Heard Of — But Should`}
            </h3>
            <h4 className="text-[#343D48] text-center 2xl:text-2xl lg:text-lg text-lg font-MontserratMedium md:px-28 leading-[24px]  max-md:text-left">
              A Mobile-Tech Powerhouse Retail Investors Are Just Starting to Discover
            </h4>
            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48]">Dear Investor,</h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              Ethical Web AI (OTCQB: BBLR) has officially submitted its generative AI product, AI Vault, to the AWS Marketplace, putting its secure enterprise-first platform in front of thousands of global business buyers.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              {`AI Vault allows businesses to run private AI models without risking sensitive data or regulatory violations. It’s built specifically for companies in banking, healthcare, insurance, and government — sectors where data privacy and compliance are non-negotiable.`}
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              What separates BBLR from most AI names on the market is its three issued patents, including one that ensures no client data is ever sent to third parties.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Gaining AWS Marketplace approval required rigorous integration and security benchmarks. For a company at this stage to clear that bar is rare.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Now trading on the OTCQB, BBLR has full SEC-reporting transparency, a product with meaningful differentiation, and distribution access through Amazon — all while still being virtually unknown to most retail investors.
            </p>
            {/* <Image className="w-full my-6 xl:my-12 mb-[8] xl:mb-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498} /> */}

            <h4 className="text-[#1D3045] font-MontserratBold text-center pt-24 pb-12 2xl:text-4xl text-2xl !leading-[1.5] max-md:text-left">
              BBLR Chart
            </h4>
            <Chart symbol={'BBLR'}/>

            <h4 className="text-[#1D3045] font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5] max-md:text-left">
              AWS Marketplace Changes Everything
            </h4>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              BBLR, operating as Ethical Web AI, delivers secure and private generative AI designed for regulated industries. With recent listings on the AWS Marketplace and OTCQB Venture Market, BBLR is positioned for rapid growth and enterprise adoption. {`Here’s`} what makes it stand out:
            </p>

            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>{`BBLR’s product cleared Amazon’s technical & security requirements.`}</li>
              <li>AI Vault is now instantly deployable to global enterprise customers.</li>
              <li>Puts Ethical Web AI in front of real buyers — not hype chasers.</li>
              <li>This is rare for a company at this stage of market cap and visibility.</li>
            </ul>

            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              With its unique combination of patented technology, end-to-end privacy, and a clear focus on enterprise compliance, BBLR is not just another AI provider—it’s a purpose-built solution for organizations that demand trust, transparency, and performance. As adoption grows across critical sectors, BBLR is well-positioned to lead the next wave of secure, ethical AI innovation.
            </p>

            <h4 className="text-[#1D3045] font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5] max-md:text-left">
              What Makes BBLR Stand Out?
            </h4>

            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>{`3 issued patents for secure generative AI`}</li>
              <li>{`Fully private AI system — nothing leaves the client’s servers`}</li>
              <li>Built for regulated enterprise sectors (finance, health, gov)</li>
              <li>Now listed on AWS Marketplace for rapid adoption</li>
              <li>Trades under ticker BBLR on the OTCQB market</li>
            </ul>

            <h4 className="text-[#1D3045] font-MontserratBold text-center pt-24 pb-12 2xl:text-4xl text-2xl !leading-[1.5] max-md:text-left">
              See How AI Vault Works
            </h4>
            {/* <Image className="w-full mt-8 xl:mt-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498} /> */}
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://player.vimeo.com/video/1077605994"
                title="Vimeo Video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            <h4 className="text-[#1D3045] font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5] max-md:text-left">
              Ready to Add BBLR to Your Watchlist?
            </h4>

            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Now listed on AWS Marketplace and still flying under the radar — BBLR could be one of the most overlooked AI infrastructure plays of the year.
            </p>

            
          </div>
          <div className="w-[23%] max-lg:w-[48%] max-md:w-[48%] max-md:w-full border border-[#DDE9EF] p-2 shadow-md rounded-md 2xl:rounded-xl sticky top-12 max-lg:order-1 max-lg:relative max-lg:top-0">
            <p className="bg-[#F2F3F3] text-[#1D3045] font-MontserratSemibold text-base px-4 py-4 rounded 2xl:rounded-lg">
              STOCK INFORMATION
            </p>
            <div className="flex flex-wrap items-center gap-2 p-2 mt-4">
              <Image className="w-[15%]" src="/images/bblr.png" alt="neov" width={52} height={52} />
              <div className="">
                <p className="text-base font-MontserratBold">Bubblr Inc.</p>
                <p className="flex items-center gap-2 font-MontserratMedium text-xs 2xl:text-sm text-[#747474]">BBLR <Image src="/images/nasdaq.svg" alt="neov" width={24} height={24} /> OTCQB Venture Market</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-y-4 items-center border-y border-[#F2F3F3] py-4 p-2 mt-4">
              <div className="pr-4 border-r border-[#DDDDDD] mr-4">
                <p className="font-MontserratSemibold text-sm">Sector</p>
                <p className="font-MontserratMedium text-[#747474] text-xs">Artificial Intelligence</p>
              </div>
              <div className="pr-4 mr-4">
                <p className="font-MontserratSemibold text-sm">Product</p>
                <p className="font-MontserratMedium text-[#747474] text-xs">AI Vault</p>
              </div>
              <div className="border-r border-[#DDDDDD] pr-4 mr-4">
                <p className="font-MontserratSemibold text-sm">Patents</p>
                <p className="font-MontserratMedium text-[#747474] text-xs"> 3 issued U.S. patents</p>
              </div>
              <div className="pr-4 ">
                <p className="font-MontserratSemibold text-sm">6.336M</p>
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
          Add BBLR to your watchlist today
        </h4>
        <div className="flex items-center  justify-center border-y-2 border-[#3934341c]">
          <div className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem]  flex items-center justify-center border-x-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/6.png" alt="3" width={70} height={70} />
          </div>
          <div className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/7.png" alt="3" width={70} height={70} />
          </div>
          <div className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/8.png" alt="3" width={70} height={70} />
          </div>
          <div className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/9.png" alt="3" width={70} height={70} />
          </div>
        </div>
      </section>

      <section className="xl:container mx-auto px-8 xl:px-3 relative -z-1 flex flex-col gap-y-8">
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

      {/* disclaimer */}
      {/* <section className="w-full xl:container mx-auto max-md:px-3 py-20 px-3 text-[#343D48]">
        <p className="font-MontserratMedium text-base 2xl:text-xl 2xl:leading-[185%] leading-[170%] pt-2">
          {` Disclaimer: This website/newsletter is owned, operated and edited by Stellar Partners LLC.  
            Any wording found in this e-mail or disclaimer referencing to “I” or “we” or “our” or “Stellar 
            Partners” refers to Stellar Partners  LLC.  This webpage/newsletter is a paid advertisement, not a 
            recommendation nor an offer to buy or sell securities. Our business model is to be financially 
            compensated to market and promote small public companies.  By reading our newsletter and 
            our website you agree to the terms of our disclaimer, which are subject to change at any time. 
            We are not registered or licensed in any jurisdiction whatsoever to provide investing advice or 
            anything of an advisory or consultancy nature and are therefore are unqualified to give 
            investment recommendations. Always do your own research and consult with a licensed 
            investment professional before investing. This communication is never to be used as the basis 
            for making investment decisions and is for entertainment purposes only. At most, this 
            communication should serve only as a starting point to do your own research and consult 
            with a licensed professional regarding the companies profiled and discussed. Conduct your 
            own research. Companies with low price per share are speculative and carry a high degree of 
            risk, so only invest what you can afford to lose. By using our service you agree not to hold our 
            site, its editor’s, owners, or staff liable for any damages, financial or otherwise, that may occur 
            due to any action you may take based on the information contained within our newsletters or 
            on our website.`}
        </p>
        <p className="font-MontserratMedium text-base 2xl:text-xl 2xl:leading-[185%] leading-[170%] pt-12">
          {` We do not advise any reader take any specific action. Losses can be larger than expected 
            if the company experiences any problems with liquidity or wide spreads. Our website and newsletter 
            are for entertainment purposes only. Never invest purely based on our alerts. Gains mentioned in our 
            newsletter and on our website may be based on end-of-day or intraday data. This publication and 
            their owners and affiliates may hold positions in the securities mentioned in our alerts, which we may 
            sell at any time without notice to our subscribers, which may have a negative impact on share prices. 
            If we own any shares we will list the information relevant to the stock and number of shares here. 
            Stellar Partners business model is to receive financial compensation to promote public companies. 
            Pursuant to an agreement between Stellar Partners LLC. and Penzance LLC (a non affiliated 3rd party), 
            Stellar Partners has been hired for a period beginning on 11/09/24 and ending on 01/11/25 to 
            conduct investor relations advertising and marketing and publicly disseminate information about 
            (NEOV) via Website, Email and SMS. We have been paid two hundred thousand dollars via bank wire 
            transfer. We expect to receive additional compensation as the investor awareness continues. We will 
            disclose every amount we receive. We own zero shares of (NEOV). We expect to receive additional 
            compensation as the investor awareness continues. We own zero shares of (NEOV). compensation 
            is a major conflict of interest in our ability to be unbiased regarding. Therefore, this communication 
            should be viewed as a commercial advertisement only.  We have not investigated the background of 
            the hiring third party or parties. The third party, profiled company, or their affiliates likely wish to 
            liquidate shares of the profiled company at or near the time you receive this communication, which 
            has the potential to hurt share prices.  Any non-compensated alerts are purely for the purpose of 
            expanding our database for the benefit of our future financially compensated investor relations efforts. 
            Frequently companies profiled in our alerts may experience a large increase in volume and share 
            price during the course of investor relations marketing, which may end as soon as the investor 
            relations marketing ceases. Our emails may contain forward-looking statements, which are not 
            guaranteed to materialize due to a variety of factors.`}
        </p>
        <p className="font-MontserratMedium text-base 2xl:text-xl 2xl:leading-[185%] leading-[170%] pt-12">
          {`We do not guarantee the timeliness, accuracy, or completeness of the information on our site or in our 
          newsletters. The information in our email newsletters and on our website is believed to be accurate 
          and correct, but has not been independently verified and is not guaranteed to be correct. The 
          information is collected from public sources, such as the profiled company’s website and press releases, 
          but is not researched or verified in any way whatsoever to ensure the publicly available information is 
          correct. Furthermore, Delta Media often employs independent contractor writers who may make errors 
          when researching information and preparing these communications regarding profiled companies. 
          Independent writers’ works are double-checked and verified before publication, but it is certainly 
          possible for errors or omissions to take place during editing of independent contractor writer’s 
          communications regarding the profiled company(s). You should assume all information in all of our 
          communications is incorrect until you personally verify the information, and again are encouraged to 
          never invest based on the information contained in our written communications. The information in 
          our disclaimers is subject to change at any time without notice. `}
        </p>
      </section> */}

      <section>
        <div className="hero py-16 max-md:py-6 w-full border-t-[1.2px] mt-20 border-[#404040]">
                <div className="mx-auto xl:container gap-y-4 max-sm:gap-y-3 px-8 xl:px-3 flex flex-col items-start">
                  <h4 className="text-3xl font-inter font-bold text-primaryText">LEGAL DISCLAIMER</h4>
                  <p className="text-base font-inter text-primaryText">
                    <span className="font-inter">Effective Date</span> : [August, 2024]
                  </p>
                  <p className="text-base font-inter text-primaryText">
                    <span className="font-inter">Last Updated</span> : [May, 2025]
                  </p>
                  <p className="text-base font-inter text-primaryText">
                    <span className="font-inter">Publisher</span> : Relqo Media LLC (Wyoming, United States)
                  </p>
                  <p className="text-base font-inter text-primaryText">
                    <span className="font-inter">Subject Company : </span> Bubblr Inc. (BBLR)
                  </p>
                  <p className="text-base font-inter text-primaryText">
                    <span className="font-inter">Promoting Entity : </span> Genesis One Holdings LLC
                  </p>

                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">IMPORTANT SUMMARY — PLEASE READ FIRST</h4>
                  <p className="text-base text-primaryText font-inter">This website and any affiliated digital materials are published by Relqo Media LLC, a Wyoming marketing agency that has been compensated in cash by Genesis One Holdings LLC to produce and distribute promotional content regarding Bubblr Inc. (OTCQB: BBLR). This communication is a paid advertisement, not a research report, not investment advice, and not an independent publication. Relqo Media is not a broker-dealer, investment adviser, or securities analyst. Investing in small-cap, OTC, or microcap securities is extremely speculative and may result in the total loss of your investment. We strongly urge all viewers to consult a licensed investment professional and perform their own due diligence.</p>
                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">1. NATURE AND INTENT OF THIS COMMUNICATION</h4>
                  <p className="text-base text-primaryText font-inter">Relqo Media LLC is a for-profit marketing agency engaged in paid promotions of public companies. The content we produce is strictly commercial and intended to create temporary public awareness, visibility, and short-term market activity around the featured company. This material is not impartial. All readers should interpret our content as a paid commercial advertisement and not as an editorial, research article, or independent commentary. We create advertisements, not analysis. These Communications are not intended to be factual evaluations of the company’s operations or investment merit.</p>
                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">2. COMPENSATION FOR BUBBLR INC. (BBLR)</h4>
                  <p className="text-base text-primaryText font-inter">Relqo Media LLC has been retained by Genesis One Holdings LLC to provide promotional media services for Bubblr Inc. (OTCQB: BBLR). As of the effective date:</p>
                  <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
                    <li>Relqo Media LLC is receiving cash compensation for digital investor awareness campaigns.</li>
                    <li>The total compensation paid for these services is: [INSERT AMOUNT ONCE CONFIRMED].</li>
                    <li>Genesis One Holdings LLC may own, acquire, or dispose of shares in BBLR during or after the campaign period.</li>
                  </ul>
                  <p className="text-base text-primaryText font-inter">
                    This relationship creates a material conflict of interest. Relqo Media’s content regarding BBLR should be considered promotional, biased, and financially motivated.
                  </p>
                  
                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">3. INTENDED AUDIENCE</h4>

                  <p className="text-base text-primaryText font-inter">These Communications are directed solely to U.S.-based, self-directed investors who understand the risks of investing in microcap and OTC-listed securities. The content is not intended for children, seniors, retirement accounts, or individuals with limited experience in securities trading. These Communications are not intended to guide investment for long-term portfolio management or financial planning purposes.</p>
                  
                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">4. NO ENDORSEMENT OR VERIFICATION OF COMPANY CLAIMS</h4>
                  <p className="text-base text-primaryText font-inter">Relqo Media LLC does not independently verify, investigate, or audit any statements made by the company being promoted, its officers, its press releases, or any third-party sources. Any claims, projections, customer announcements, or product statements made in connection with BBLR should be assumed to be unverified and potentially inaccurate unless independently confirmed. You should not rely on any statements regarding future performance, partnerships, revenue projections, or corporate plans.</p>
                  
                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">5. MARKET INFLUENCE AND TRADING PATTERN EXPECTATION</h4>
                  <p className="text-base text-primaryText font-inter">Promotional campaigns commonly result in short-lived spikes in stock price and volume, followed by rapid declines. These spikes are typically driven by retail speculation, promotional circulation, and momentary investor interest—not fundamentals. You should expect that:</p>
                  <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
                    <li>BBLR’s stock may increase temporarily during this promotion,</li>
                    <li>Trading volume may rise sharply, and</li>
                    <li>The price may fall after the campaign ends or selling begins.</li>
                  </ul>
                  <p className="text-base text-primaryText font-inter">
                    These patterns are typical of OTC stock promotions, and you should proceed accordingly.
                  </p>
                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">6. NO RELIANCE – INVESTOR RESPONSIBILITY</h4>
                  <p className="text-base text-primaryText font-inter">The burden of research, investigation, and risk assessment rests solely with you. Relqo Media LLC is not responsible for your investment decisions. You are strongly urged to:</p>
                  <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
                    <li>Read public filings from the SEC (if available),</li>
                    <li>Understand risks such as dilution, insider selling, and volatility, and</li>
                    <li>Recognize that OTC stocks often lack financial transparency.</li>
                  </ul>
                  <p className="text-base text-primaryText font-inter">We accept no responsibility for losses incurred due to actions taken based on our Communications.</p>
                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">7. FORWARD-LOOKING STATEMENTS AND SAFE HARBOR</h4>
                  <p className="text-base text-primaryText font-inter">Our materials may include “forward-looking statements” within the meaning of the Private Securities Litigation Reform Act of 1995. These include statements about potential growth, revenue forecasts, market opportunity, strategic partnerships, or technological development. Such statements are speculative and based on assumptions that may never occur. Actual results may differ materially. These statements are made under the safe harbor protections of Sections 27A and 21E of the Securities Acts. Relqo Media disclaims any duty to update them.</p>
                  <h4 className="mt-8 text-primaryText text-xl font-font-inter font-medium">8. INFORMATION SOURCING, BIAS, AND ACCURACY</h4>
                  <p className="text-base text-primaryText font-inter">We use publicly available information including company websites, press releases, and promotional materials supplied by paying clients or related parties. We do not verify or validate this data.</p>
                  <p className="text-base text-primaryText font-inter">Assume all information presented by Relqo Media is:</p>
                  <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
                    <li>Subjective</li>
                    <li>Not independently verified,</li>
                    <li>Created to highlight potential upside and omit downsides,</li>
                    <li>Not suitable as the basis for any investment decision.</li>
                  </ul>
                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">9. OWNERSHIP AND TRADING CONFLICTS</h4>
                  <p className="text-base text-primaryText font-inter">Relqo Media LLC, its contractors, members, and affiliates may hold or acquire shares in the companies we promote, including BBLR. We may buy or sell such shares without prior notice. These transactions may occur before, during, or after a promotional campaign and may affect market pricing. We are not obligated to update readers on our trading activity or affiliate holdings</p>

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
                  <p>Relqo Media LLC produces promotional content in accordance with the advertising disclosure standards set forth by the Federal Trade Commission (FTC) and the SEC’s interpretations of sponsored investment-related communications.</p>
                  <p className="text-base text-primaryText font-inter">We make good-faith efforts to disclose all:</p>
                  <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
                    <li>Compensation arrangements,</li>
                    <li>Conflicts of interest,</li>
                    <li>Risks</li>
                    <li>Limitations of our role, and</li>
                    <li>The promotional nature of this content.</li>
                  </ul>
                  <p className="text-base text-primaryText font-inter">We do not provide investment recommendations under any regulatory framework including, but not limited to, SEC Regulation Analyst Certification, FINRA Rule 2210, or Regulation Best Interest.</p>
                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">12. NON-U.S. USERS</h4>
                  <p className="text-base text-primaryText font-inter">This material is intended solely for distribution within the United States. If you are accessing this site from outside the U.S., you are responsible for complying with your country’s laws. Relqo Media disclaims liability for access from non-U.S. jurisdictions where investor promotion, marketing, or solicitation of securities is restricted or prohibited.</p>

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
                  <p className="text-base text-primaryText font-inter">All matters arising out of this disclaimer shall be governed by the laws of the State of Wyoming. You agree that any dispute shall be resolved exclusively through binding arbitration under the rules of the American Arbitration Association, to be held in Sheridan County, Wyoming. Class action claims and group arbitration are expressly prohibited.</p>

                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">15. NON-SOLICITATION AND GEOGRAPHIC LIMITATIONS</h4>
                  <p className="text-base text-primaryText font-inter">Nothing in our content constitutes a general solicitation or a personal securities recommendation. If you reside in a jurisdiction where such communications are unlawful, you must exit this site and discontinue engagement with our content.</p>

                  <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">16. FINAL NOTICE – ACCEPTANCE OF TERMS</h4>
                  <p className="text-base text-primaryText font-inter">We reserve the right to update this Disclaimer at any time without notice. Your continued use of our services or content constitutes acceptance of the most recent version.</p>
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
                      className="font-MontserratRegular"
                      country={"us"}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      inputProps={{
                        id: "phone",
                        required: true,
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
                  <button type="submit" className="w-full bg-[#0A84EF] font-MontserratMedium hover:bg-blue-700 text-[#fff] p-2 rounded">
                    Continue
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
              <Image src="/images/Logo.svg" width={100} height={100} alt="logo" className="w-[12rem] mb-8" />
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
    </>
  )
}

export default BBLR;