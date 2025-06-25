'use client';
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { useMetadata } from "@/context/MetadataContext";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope } from "react-icons/fa";
import formatNumber from "@/components/FormatNumber";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap', // << crucial
});


import 'react-phone-input-2/lib/style.css'; // Optional default styles
import Link from "next/link";

const IQSTPage = () => {
  const { setMetadata } = useMetadata();
  const [stockdata, setstockData] = useState([]); // State to store API data

  useEffect(() => {
    setMetadata({
      title: "Avalon GloboCare Corp. (NASDAQ: ALBT): 5 Reasons This Company Belongs On Your Radar",
      description: "Avalon GloboCare (NASDAQ: ALBT) is rapidly transforming its business through a high-profile merger with YOOV Group, setting the stage to become a major player in the booming AI-as-a-Service (AIaaS) market. With new medical device partnerships, fresh intellectual property wins in cellular therapy, and a cleaner share structure after regaining Nasdaq compliance, ALBT is attracting significant investor attention. Add ALBT to Your Watchlist Immediately.",
      schema: ``
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${STOCKVERSE_BACK_END}/stocks-list?symbols=albt`);
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
      <section className="bg-[#010e140d] 2xl:py-20 xl:py-24 py-6 ">
        <div className="w-full xl:container mx-auto px-3 flex justify-between max-lg:flex-col max-lg:gap-y-8">
          <div className="w-[64%] max-lg:w-[100%] lg:space-y-10 space-y-6">
            <div>
            <h1 className="text-black 2xl:text-6xl sm:text-[3.5rem] text-[3rem] !leading-[1.2] font-DM font-sansMedium">Hot Stock Alert:</h1>
            <h2 className="text-black 2xl:text-6xl sm:text-[3.5rem] text-[3rem] !leading-[1.2] font-DM font-sansMedium">(NASDAQ: <Link href='/dashboard?symbol=ALBT' className=" text-darkGreen"> ALBT</Link>)</h2>
            </div>
            <div className="space-y-4">
              <p className={`text-gray/60 2xl:text-xl text-lg font-MontserratBold w-full`}>Add This Stock to Your Watchlist Immediately — {`Here’`}s Why</p>
              <p className={`text-gray/60 ${montserrat.className} 2xl:text-xl text-lg w-full`}>Avalon GloboCare (NASDAQ: ALBT) is executing a transformation that includes a pending AI merger, a commercial FDA-cleared device, and a newly issued immunotherapy patent — all while trading below a $6M market cap with just 1.5M shares in the float.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=ALBT' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/fedelity.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.schwab.com/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/charles.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=ALBT&rsO=new' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/article-link.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://robinhood.com/stocks/albt/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/robinhood_logo.png' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.webull.com/quote/nasdaq-albt' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg bg-[#fff]" width={60} height={60} src='/images/webull.png' alt="logo" loading="eager" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* main */}
      <section className="w-full xl:container mx-auto md:py-24 py-12 px-3">
        <div className="flex lg:items-start justify-between flex-wrap max-lg:gap-y-8">
          <div className="w-[23%] max-lg:w-[48%] max-md:w-full border border-[#DDE9EF] p-2 shadow-md rounded-md 2xl:rounded-xl sticky top-12 max-lg:relative max-lg:top-0 max-lg:order-2 max-md:order-3">
            <p className="bg-[#F2F3F3] text-[#1D3045] font-MontserratSemibold text-base px-4 py-4 rounded 2xl:rounded-lg">
              Latest News
            </p>
            <div className="flex flex-col gap-2">
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-sm p-2 py-4 border-b border-[#F2F3F3] text-[#343D48] hover:underline"
                href="https://finance.yahoo.com/news/avalon-globocare-advances-proposed-merger-120000710.html" target="_blank" rel="noopener noreferrer">
                    Avalon GloboCare Advances Proposed Merger with YOOV with Filing of Registration Statement
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 border-b border-[#F2F3F3] text-[#343D48] hover:underline"
                href="https://finance.yahoo.com/news/avalon-globocare-partners-specialtyhealth-inc-120000986.html" target="_blank" rel="noopener noreferrer">
                Avalon GloboCare Partners with SpecialtyHealth, Inc. to Power Police {`Chiefs’`} Fitness Challenge with KetoAir
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 text-[#343D48] hover:underline"
                href="https://finance.yahoo.com/news/avalon-globocare-announces-issuance-patent-120000174.html"
                target="_blank" rel="noopener noreferrer">
                Avalon GloboCare Announces Issuance of Patent for Novel CAR-T and CAR-NK Cell Technology in China
              </Link>
            </div>
          </div>
          <div className="w-[50%] max-md:w-[100%] max-lg:w-[100%] max-lg:order-3 max-md:order-2">
            <p className="text-gray/60 font-MontserratMedium text-right pb-4">*Sponsored</p>
            <h3 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl text-2xl !leading-[1.5] mb-4 max-md:text-left">
              Just 1.5M Shares in the Float — and a Real FDA Device in Use: Why ALBT May Be the Microcap to Watch
            </h3>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li><span className="font-MontserratSemibold">Ticker:</span> NASDAQ: ALBT</li>
              <li><span className="font-MontserratSemibold">Price:</span> $3.00</li>
              <li><span className="font-MontserratSemibold">Market Cap:</span> ~$5.7 million</li>
              <li><span className="font-MontserratSemibold">Float:</span> 1.52M shares</li>
              <li><span className="font-MontserratSemibold">Shares Outstanding:</span> 1.89M</li>
              <li><span className="font-MontserratSemibold">Reverse Split:</span> 1-for-15 completed in 2024</li>
            </ul>
            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12  text-center text-[#343D48]">
              A Microcap With Real Products, IP, and a Pending AI Merger
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              Avalon GloboCare <span className="font-MontserratSemibold">(NASDAQ: ALBT)</span> might be one of the smallest companies listed on the Nasdaq by market cap — but recent developments suggest {`it’s`} not one to overlook. With an <span className="font-MontserratSemibold">FDA-registered product in hand</span>, a proposed acquisition of an AI automation firm, and newly issued global patents in cell therapy, Avalon is in motion across several fronts.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              The company is structured lean, with under <span className="font-MontserratSemibold">2 million</span> shares outstanding and just 1.5 million in the public float. Insider ownership stands at roughly 57%, according to company disclosures. At current prices, the entire business is valued at less than <span className="font-MontserratSemibold">$6 million</span>.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              {`Let’s`} take a look at {`what’s`} unfolded over the last few months.
            </p>
            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48] text-center">1. Real Device, Real Use: KetoAir™ Breathalyzer</h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              On April 15, Avalon announced a partnership with SpecialtyHealth and Pounds Transformation (PT) to deploy its handheld <span className="font-MontserratSemibold">KetoAir™ breathalyzer</span> across multiple state police departments. The device, which detects acetone levels in breath to monitor fat metabolism, is being used in a first responder wellness initiative called the BrAce 4 Impact Challenge.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              Key facts:
            </p>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>FDA-registered Class I medical device (Registration #3026284320)</li>
              <li>Available for purchase and use today</li>
              <li>Integrated into public health programs for law enforcement</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              The product is currently live on the <span className="font-MontserratSemibold">Apple App Store</span> and <span className="font-MontserratSemibold">Google Play</span>, and supports users in tracking their daily ketone levels in real time.
            </p>

            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12  text-center text-[#343D48]">
              2. Patented Immunotherapy Platform in China
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              On April 10, Avalon announced the issuance of a new patent in China for its <span className="font-MontserratSemibold">CAR-T and CAR-NK immunotherapy platform</span>. The patent, co-developed with Arbele Limited, covers a bispecific CAR design that targets CD19 and CD22 antigens, along with a novel localized cytokine release mechanism.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              This new IP strengthens {`Avalon’s`} portfolio in the growing field of cell therapy and adds 20 years of protection in one of the world’s most significant healthcare markets.
            </p>
            
            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              3. AI Merger in Progress: YOOV Group
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              On April 29, Avalon filed a registration statement with the SEC related to its planned acquisition of <span className="font-MontserratSemibold">YOOV Group Holding Limited</span>, a provider of AI-powered workflow automation and business services.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              If approved, the merger would transform Avalon into a hybrid of health technology and artificial intelligence. YOOV’s no-code platform is designed for business automation, and its subsidiaries offer services in credit evaluation and insurance brokerage.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              The transaction remains subject to standard closing conditions and regulatory approval.
            </p>

            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              What Makes ALBT Stand Out?
            </h6>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Commercial-stage product with FDA registration</li>
              <li>IP portfolio spanning diagnostics and cell therapy</li>
              <li>Proposed acquisition of a functional AI business</li>
              <li>Micro float and tightly held cap table</li>
              <li>Nasdaq-listed with low current valuation</li>
            </ul>

            <h6 className="font-MontserratBold text-center text-lg 2xl:text-xl pt-12 text-[#343D48]">
              Final Note
            </h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Avalon GloboCare is an early-stage company in transition. {`It’s`} not risk-free, and like any microcap, it carries volatility. But it also checks off several boxes that retail investors often look for: a real product on the market, regulatory milestones, and a pending shift into AI. 
              If {`you're`} tracking low-float names with current products and active corporate events, this is one you may want to start following now — not after the chart moves.
            </p>

            <p className="font-MontserratSemibold text-base 2xl:text-xl pt-12 text-[#343D48]">
              📌 Set a watchlist alert for ALBT.
            </p>
            <p className="font-MontserratSemibold text-base 2xl:text-xl pt-12 text-[#343D48]">
              🔎 Read the filings. Follow the updates. Do your research
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              This {`isn’t`} a recommendation — just a reminder to pay attention.
            </p>
          </div>
          <div className="w-[23%] max-lg:w-[48%] max-md:w-[48%] max-md:w-full border border-[#DDE9EF] p-2 shadow-md rounded-md 2xl:rounded-xl sticky top-12 max-lg:order-1 max-lg:relative max-lg:top-0">
            <p className="bg-[#F2F3F3] text-[#1D3045] font-MontserratSemibold text-base px-4 py-4 rounded 2xl:rounded-lg">
              STOCK INFORMATION
            </p>
            <div className="flex flex-wrap items-center gap-2 p-2 mt-4">
              <Image className="w-[15%]" src="/images/albt.webp" alt="neov" width={52} height={52} loading="lazy" />
              <div className="">
                <p className="text-base font-MontserratBold">Avalon GloboCare Corp.</p>
                <p className="flex items-center gap-2 font-MontserratMedium text-xs 2xl:text-sm text-[#747474]">ALBT <Image src="/images/nasdaq.svg" alt="neov" width={24} height={24} loading="lazy" /> Nasdaq Stock Market</p>
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
          Add <Link href='/albt' className="font-MontserratBold underline"> ALBT</Link> to your watchlist today
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
          <Link href='https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=ALBT&rsO=new' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem]  flex items-center justify-center border-x-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/6.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.schwab.com/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/7.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.tradingview.com/symbols/NASDAQ-ALBT/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/8.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=albt' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
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
      {/* disclaimer */}
      <div className="hero py-16 max-md:py-6 w-full border-t-[1.2px] border-[#404040]">
      <div className="mx-auto xl:container gap-y-4 px-8 xl:px-3 max-sm:gap-y-3 flex flex-col items-start">
        <h4 className="text-3xl font-inter font-bold text-primaryText">MASTER LEGAL DISCLAIMER</h4>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Effective Date</span>: August 2024</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Last Updated</span>: June 15, 2025</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Publisher</span>: Relqo Media LLC (Wyoming, United States)</p>
        <p className="text-lg font-inter text-primaryText"><span className="font-inter">Subject Company</span>: Avalon GloboCare Corp. (ALBT)</p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">IMPORTANT SUMMARY — PLEASE READ FIRST</h4>
        <p className="text-base text-primaryText font-inter">
          This website and any affiliated digital materials are published by Relqo Media LLC, a Wyoming marketing agency that has been compensated in cash by CorporateAds, LLC to produce and distribute promotional content regarding Avalon GloboCare Corp. (NASDAQ: ALBT). This communication is a paid advertisement, not a research report, not investment advice, and not an independent publication. Relqo Media is not a broker-dealer, investment adviser, or securities analyst. Investing in small-cap or microcap securities is extremely speculative and may result in the total loss of your investment. We strongly urge all viewers to consult a licensed investment professional and perform their own due diligence.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">1. NATURE AND INTENT OF THIS COMMUNICATION</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC is a for-profit marketing agency engaged in paid promotions of public companies. The content we produce is strictly commercial and intended to create temporary public awareness, visibility, and short-term market activity around the featured company. This material is not impartial. All readers should interpret our content as a paid commercial advertisement and not as an editorial, research article, or independent commentary. We create advertisements, not analysis. These communications are not intended to be factual evaluations of the {`company’s`} operations or investment merit.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">2. COMPENSATION FOR Avalon GloboCare Corp. (ALBT)</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC has been retained by CorporateAds, LLC to provide promotional media services for Avalon GloboCare Corp. (NASDAQ: ALBT). As of the effective date: June 15, 2025
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter pl-8">
          <li>Relqo Media LLC is receiving cash compensation for digital investor awareness campaigns.</li>
          <li>The total compensation paid for these services is $20,000 for the period beginning June 15, 2025, through June 18, 2025.</li>
          <li>CorporateAds, LLC may own, acquire, or dispose of shares in ALBT during or after the campaign period.</li>
        </ul>
        <p className="text-base text-primaryText font-inter">
          This relationship creates a material conflict of interest. Relqo {`Media’s`} content regarding ALBT should be considered promotional, biased, and financially motivated.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">3. INTENDED AUDIENCE</h4>
        <p className="text-base text-primaryText font-inter">
          These Communications are directed solely to U.S.-based, self-directed investors who understand the risks of investing in microcap and Nasdaq-listed securities. The content is not intended for children, seniors, retirement accounts, or individuals with limited experience in securities trading. These Communications are not intended to guide investment for long-term portfolio management or financial planning purposes.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">4. NO ENDORSEMENT OR VERIFICATION OF COMPANY CLAIMS</h4>
        <p className="text-base text-primaryText font-inter">
          Relqo Media LLC does not independently verify, investigate, or audit any statements made by the company being promoted, its officers, its press releases, or any third-party sources. Any claims, projections, customer announcements, or product statements made in connection with ALBT should be assumed to be unverified and potentially inaccurate unless independently confirmed.
          You should not rely on any statements regarding future performance, partnerships, revenue projections, or corporate plans.
        </p>

        <h4 className="mt-8 text-primaryText text-xl font-inter font-medium">5. MARKET INFLUENCE AND TRADING PATTERN EXPECTATION</h4>
        <p className="text-base text-primaryText font-inter">
          Promotional campaigns commonly result in short-lived spikes in stock price and volume, followed by rapid declines. These spikes are typically driven by retail speculation, promotional circulation, and momentary investor interest—not fundamentals. You should expect that:
        </p>
        <ul className="list-disc text-base text-primaryText space-y-3 font-inter">
          <li>{`ALBT’s`} stock may increase temporarily during this promotion,</li>
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
          Relqo Media LLC, its contractors, members, and affiliates may hold or acquire shares in the companies we promote, including ALBT. We may buy or sell such shares without prior notice. These transactions may occur before, during, or after a promotional campaign and may affect market pricing.
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