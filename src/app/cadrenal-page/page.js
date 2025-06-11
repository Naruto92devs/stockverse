'use client';
import Image from "next/image";
import React, { useRef, useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaRegEnvelope } from "react-icons/fa";
import formatNumber from "@/components/FormatNumber";
import NewsLetterPopup from "@/components/NewsLetterPopup";
import Disclaimer from "@/components/Cvkd_disclaimer";
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

const CadrenalPage = () => {
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
  const [newsletter, setNewsletter] = useState(true);
  const heading = "Winning Stock Picks"
  const subHeading = "Grow Your Wealth by +673.66%! Get Exclusive Stock Picks Sent To Your Inbox!"


  const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

  const handleSubscribeEmailPhone = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const requestData = {
        email,
        tag: 'CVKD subscriber'
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
        const response = await fetch(`${STOCKVERSE_BACK_END}/stocks-list?symbols=cvkd`);
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
      <section className="bg-[#010e140d] min-h-[600px] 2xl:py-20 xl:py-24 py-12 ">
        <div className="w-full xl:container mx-auto px-3 flex justify-between max-lg:flex-col max-lg:gap-y-8">
          <div className="w-[64%] max-lg:w-[100%] space-y-10">
            <div>
            <h1 className="text-black 2xl:text-6xl sm:text-[2.5rem] text-[2rem] !leading-[1.2] font-syneBold">Hot Stock Alert:</h1>
            <h2 className="text-darkGreen 2xl:text-6xl sm:text-[2.5rem] text-[2rem] !leading-[1.2] font-syneBold"><span className="text-black">Ticker: </span> <Link href='/cadrenal' className="underline"> CVKD</Link> <span className="text-black">(NASDAQ)</span></h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=CVKD' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/fedelity.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.schwab.com/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/charles.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=cvkd&rsO=new' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/article-link.jpeg' alt="logo" loading="eager" />
              </Link>
              <Link href='https://robinhood.com/stocks/cvkd/' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg" width={60} height={60} src='/images/robinhood_logo.png' alt="logo" loading="eager" />
              </Link>
              <Link href='https://www.webull.com/quote/nasdaq-cvkd' target="_blank" rel="noopener noreferrer">
                <Image className="rounded-lg bg-[#fff]" width={60} height={60} src='/images/webull.png' alt="logo" loading="eager" />
              </Link>
            </div>
            <div>
            <p className={`text-gray/60 ${montserrat.className} 2xl:text-xl text-lg w-full`}>Breaking: Stockverse Unveils <Link href='/cadrenal' className="font-bold underline"> CVKD</Link> — The Biotech Sleeper That Could Soar 354%+ </p>
            <p className={`text-gray/60 ${montserrat.className} 2xl:text-xl text-lg w-full`}>Wall {`Street’s`} Not Watching Yet — But You Can Be First.</p>
            <p className={`text-gray/60 ${montserrat.className} 2xl:text-xl text-lg w-full`}>Read Below Why <Link href='/cadrenal' className="font-bold underline"> CVKD</Link> May Be the Hottest NASDAQ Stock of the Year.</p>
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
                  name="search_Symbols"
                  type="text"
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
                <button type="submit" className={`animate-heartbeat bg-darkGreen text-sm text-[#fff] font-MontserratSemibold px-6 py-4 rounded-full shadow-lg transition  ${isSubmitting ? "cursor-not-allowed bg-[#649f6f]" : "bg-[#12A72E]"}`}>

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
                href="/cvkd-news" target="_blank" rel="noopener noreferrer">
                Cadrenal Therapeutics Announces Tecarfarin Manufacturing Progress in Support of Clinical Trial Readiness
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 border-b border-[#F2F3F3] text-[#343D48] hover:underline"
                href="/cvkd/news" target="_blank" rel="noopener noreferrer">
                Cadrenal Therapeutics Announces Collaboration Agreement with Abbott in Support of Pivotal Study of Tecarfarin in Patients with HeartMate 3™ LVAD
              </Link>
              <Link
                className="font-MontserratSemibold 2xl:text-base lg:text-sm text-base p-2 py-4 text-[#343D48] hover:underline"
                href="/news/cadrenal-therapeutics-jp-morgan-healthcare-conference-2024"
                target="_blank" rel="noopener noreferrer">
                {`Cadrenal Therapeutics Gears Up for the 43rd Annual J.P. Morgan Healthcare Conference Week with Event Participation and Investor/Partner Meetings`}
              </Link>
            </div>
          </div>
          <div className="w-[50%] pt-6 max-md:w-[100%] max-lg:w-[100%] max-lg:order-3 max-md:order-2">
            <h3 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl text-2xl !leading-[1.5] mb-4 max-md:text-left">
              Heart Disease: {`America’s`} Most Expensive Killer
            </h3>
            <h4 className="text-[#343D48] text-center 2xl:text-2xl lg:text-lg text-lg font-MontserratMedium md:px-28 leading-[24px]  max-md:text-left">
              And the Public Company <Link href='/cadrenal' className="underline font-MontserratBold"> CVKD</Link> Quietly Developing a Potential Game-Changer
            </h4>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">Every 36 seconds, someone in the United States dies from heart disease. That adds up to over 2,300 deaths every single day. More than 121 million Americans are living with cardiovascular disease. Annual direct medical costs have surpassed $200 billion, burdening patients, families, and the healthcare system. Yet the most widely used blood thinner, Warfarin, has remained unchanged for more than 60 years.</p>
            <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48]">The Reality of Today’s Blood Thinners</h6>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-3 text-[#343D48]">
              Warfarin has been prescribed for decades to reduce the risk of stroke, clotting, and other cardiovascular complications. But its limitations are widely known:
            </p>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Requires frequent blood testing and dose adjustments</li>
              <li>Interacts with common foods (especially those rich in Vitamin K)</li>
              <li>Has dangerous drug-to-drug interactions</li>
              <li>Carries a high risk of internal bleeding, including GI bleeds</li>
              <li>Complicates treatment in elderly and kidney-impaired patients</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Patients don’t choose Warfarin because it’s ideal — they choose it because it’s the only FDA-approved option in many cases.
            </p>

            {/* <Image className="w-full my-6 xl:my-12 mb-[8] xl:mb-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498} /> */}

            <h4 className="text-[#1D3045] font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5] max-md:text-left">
              The Unmet Medical Need
            </h4>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Patients with implanted cardiac devices like Left Ventricular Assist Devices (LVADs) are particularly vulnerable. They require lifelong anticoagulation therapy — yet Warfarin puts them at high risk of bleeding, especially when combined with chronic kidney disease.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              This population has no oral anticoagulant currently approved specifically for their needs. The medical gap is urgent and growing.
            </p>


            <h4 className="text-[#1D3045] font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5] max-md:text-left">
              Introducing Cadrenal Therapeutics <Link href='/cadrenal' className="font-MontserratBold underline"> (CVKD)</Link>
            </h4>
            {/* <Image className="w-full mt-8 xl:mt-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498} /> */}

            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              <Link href='/cadrenal' className="underline font-MontserratBold">Cadrenal Therapeutics (NASDAQ: CVKD)</Link> is a clinical-stage biopharmaceutical company developing Tecarfarin, a novel oral blood thinner designed to address the limitations of Warfarin.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              <span className="underline font-MontserratBold">Tecarfarin is a Vitamin K antagonist (VKA) like Warfarin</span> — but with a key distinction: it’s metabolized by carboxyl esterase, not the liver’s cytochrome P450 system. This alternative metabolic pathway is being explored for its potential to offer greater stability, fewer interactions, and better suitability for patients with kidney or liver issues.
            </p>
            <h4 className="text-[#1D3045] font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5] max-md:text-left">Tecarfarin’s Potential Advantages</h4>

            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Fewer food and drug interactions</li>
              <li>Not dependent on kidney or liver function</li>
              <li>More consistent therapeutic levels</li>
              <li>Lower bleeding risk profile (pending trial outcomes)</li>
              <li>Being developed for high-risk patients, including those with LVADs</li>
            </ul>

            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Tecarfarin is being developed to potentially deliver the benefits of anticoagulation therapy with fewer of the complications commonly associated with older treatments like Warfarin.
            </p>

            <h4 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5] mb-4 pt-8 xl:pt-20">
              Latest Developments: Manufacturing & Trial Readiness
            </h4>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              On May 15, 2025, <Link href='/cadrenal' className="font-MontserratBold underline"> Cadrenal Therapeutics (CVKD)</Link> announced the successful completion of the technical transfer and U.S.-based manufacturing of Tecarfarin’s active pharmaceutical ingredient (API). This milestone is intended to strengthen the company’s supply chain and support readiness for upcoming pivotal trials.
            </p>
            <p className="pt-4"><Link href="https://www.businesswire.com/news/home/20250515408603/en/Cadrenal-Therapeutics-Announces-Tecarfarin-Manufacturing-Progress-in-Support-of-Clinical-Trial-Readiness" className="font-MontserratMedium underline text-[#4f96ff]">Read the full press release on BusinessWire</Link></p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              The company is preparing Tecarfarin for a Phase 3 clinical study, initially targeting two high-risk patient groups:
            </p>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Patients with implanted cardiac devices (LVADs)</li>
              <li>Patients with end-stage kidney disease and atrial fibrillation</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              If approved, Tecarfarin could become the first oral anticoagulant specifically indicated for these populations.
            </p>

            <h4 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5]">
              Analyst Coverage: “Buy” Rating Reaffirmed
            </h4>

            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              In May 2025, H.C. Wainwright & Co. reiterated a Buy rating on <Link href='/cadrenal' className="font-MontserratBold underline"> CVKD</Link>, issuing a price target of $32, citing Tecarfarin’s differentiated profile, market potential, and advancing clinical pipeline.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              “We believe <Link href='/cadrenal' className="font-MontserratBold underline"> {`CVKD’s`}</Link> progress on manufacturing and trial planning, combined with Tecarfarin’s unique mechanism, supports a favorable risk-reward ratio for long-term investors.” — H.C. Wainwright Equity Research (May 2025)
            </p>
            <p className="pt-4"><Link href="https://www.gurufocus.com/news/2869695/cadrenal-therapeutics-cvkd-receives-buy-rating-from-hc-wainwright-co-cvkd-stock-news" className="font-MontserratMedium underline text-[#4f96ff]">📄 Read the full analyst coverage on GuruFocus</Link></p>

            <h4 className="text-[#1D3045]  max-md:text-left font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5]">
              Why Investors Are Watching <Link href='/cadrenal' className="font-MontserratBold underline"> CVKD </Link>
            </h4>
            <table className="text-left font-MontserratMedium text-sm mt-16 font-MontserratMedium">
              <tr className="border-b">
                <th>Strategic Factor</th>
                <th>Why It Matters</th>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-8">FDA Orphan Drug Status</td>
                <td className="py-3">Creates exclusive market rights and accelerates the process</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-8">Large, underserved market	</td>
                <td className="py-3">High-risk patients need alternatives now</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-8">Platform potential</td>
                <td className="py-3">Could extend beyond LVADs into other cardiac segments</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-8">First-mover advantage	</td>
                <td className="py-3">No oral blood thinner is currently approved for LVAD patients</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 pr-8">Public listing</td>
                <td className="py-3">Ticker: <Link href='/cadrenal' className="font-MontserratBold underline"> CVKD</Link> (accessible on the open market)</td>
              </tr>
            </table>

            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              <Link href='/cadrenal' className="font-MontserratBold underline"> CVKD</Link> is positioned at the intersection of medical innovation and patient need. For investors seeking early-stage exposure to potential breakthroughs in cardiovascular care, this is a company to watch closely.
            </p>


            <h4 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center pt-24 2xl:text-4xl text-2xl !leading-[1.5]">
              About the Company
            </h4>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li><span className="font-MontserratBold">Company:</span>  <Link href='/cadrenal' className="font-MontserratBold underline"> Cadrenal Therapeutics, Inc. </Link></li>
              <li><span className="font-MontserratBold">Ticker: </span> <Link href='/cadrenal' className="font-MontserratBold underline"> CVKD</Link></li>
              <li><span className="font-MontserratBold">Exchange:</span> NASDAQ</li>
              <li><span className="font-MontserratBold">Sector:</span> Biopharmaceuticals</li>
              <li><span className="font-MontserratBold">Focus:</span> Cardiovascular therapies, next-generation anticoagulation</li>
              <li className="font-MontserratBold">Website: <Link href="" className="underline">www.cadrenal.com</Link></li>
            </ul>

            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Sponsored Content Disclosure: This content is part of a paid awareness campaign. Please read the full disclaimer below.
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              Enjoyed This Article?
            </p>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              If you found this breakdown helpful, consider joining Stockverse — a platform designed for investors who value early access to thoughtful stock research and market insights.
              Your membership includes:
            </p>
            <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-12 2xl:leading-[170%] text-[#343D48]">
              <li>Alerts on emerging companies</li>
              <li>Real-time news, technical data, and market updates</li>
              <li>Access to <Link className="font-MontserratBold text-[#4f96ff]" href='/stockverse-gpt' > StockverseGPT</Link>, a research tool for exploring stock-related questions</li>
              <li>Tools to manage your watchlist and track your portfolio</li>
              <li>Independent research across a range of sectors</li>
            </ul>
            <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
              If you appreciate staying informed and organized in your investing, <Link className="font-MontserratBold text-[#4f96ff]" href='/' > Stockverse </Link> is built for you.
              Sign up at
              <Link href="/register" className="underline text-[#4f96ff] pl-2">Stockverse.com/register</Link><br />
              Informed decisions start with the right tools.
            </p>
          </div>
          <div className="w-[23%] max-lg:w-[48%] max-md:w-[48%] max-md:w-full border border-[#DDE9EF] p-2 shadow-md rounded-md 2xl:rounded-xl sticky top-12 max-lg:order-1 max-lg:relative max-lg:top-0">
            <p className="bg-[#F2F3F3] text-[#1D3045] font-MontserratSemibold text-base px-4 py-4 rounded 2xl:rounded-lg">
              STOCK INFORMATION
            </p>
            <div className="flex flex-wrap items-center gap-2 p-2 mt-4">
              <Image className="w-[15%]" src="/images/cadrenal.jpeg" alt="neov" width={52} height={52} loading="lazy" />
              <div className="">
                <p className="text-base font-MontserratBold">Cadrenal Therapeutics, Inc.</p>
                <p className="flex items-center gap-2 font-MontserratMedium text-xs 2xl:text-sm text-[#747474]">CVKD <Image src="/images/nasdaq.svg" alt="neov" width={24} height={24} loading="lazy" /> Nasdaq Stock Market</p>
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
          Add <Link href='/cadrenal' className="font-MontserratBold underline"> CVKD</Link> to your watchlist today
        </h4>
        <div className="flex items-center  justify-center border-y-2 border-[#3934341c]">
          <Link href='https://www.etrade.wallst.com/sso/saml2/requestAssertion.ashx?originalTarget=https%3A%2F%2Fwww%2Eetrade%2Ewallst%2Ecom%2Fv1%2Fstocks%2Fsnapshot%2Fsnapshot%2Easp%3Fsymbol%3Dcvkd%26rsO%3Dnew&authnContext=prospect&ChallengeUrl=https%3A%2F%2Fidp%2Eetrade%2Ecom%2Fidp%2FSSO%2Esaml2' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem]  flex items-center justify-center border-x-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/6.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.schwab.com/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/7.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://www.tradingview.com/symbols/NASDAQ-CVKD/' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
            <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/8.png" alt="3" width={70} height={70} loading="lazy" />
          </Link>
          <Link href='https://digital.fidelity.com/prgw/digital/research/quote/dashboard/summary?symbol=CVKD' className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
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
      <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter} tag={"cvkd subscriber popup"} heading={heading} subHeading={subHeading}/>
      {/* disclaimer */}
      <Disclaimer />
    </>
  )
}

export default CadrenalPage;


