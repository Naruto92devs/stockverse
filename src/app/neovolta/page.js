'use client';
import Image from "next/image";
import React, { useRef, useState,useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope,FaRegEnvelope } from "react-icons/fa";
import Disclaimer from "@/components/Article_disclaimer";
import formatNumber from "@/components/FormatNumber";
import NewsLetterPopup from "@/components/NewsLetterPopup";


import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Optional default styles
import axios from "axios";
import Link from "next/link";

import { Mousewheel, } from 'swiper/modules';

const Neov = ()=>{
      const [privacyChecked, setPrivacyChecked] = useState(false);
      const [phone, setPhone] = useState(null);
      const [email, setEmail] = useState('');
      const [message, setMessage] = useState(null);
      const [done, setDone] = useState(null);
      const [loading, setLoading] = useState(null);
      const [stockdata, setstockData] = useState([]); // State to store API data
      const [error, setError] = useState(null); // Error state
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [newsletter, setNewsletter] = useState(true);
      const scrollRef = useRef(null);
      let isDown = false;
      let startX;
      let scrollLeft;


    const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

    const handleSubscribeEmailPhone = async (e) => {
        setLoading(true);
        e.preventDefault();
        const id = "Y4nSkL";
        const baseId = "VSwpYs";

        try {
            const requestData = {
                id,
                baseId,
                email,
            };

            // Only add the phone number if it is provided
            if (phone) {
                requestData.phone = `+${phone}`;
            }

            const response = await axios.post(`${STOCKVERSE_BACK_END}/klaviyo-subscription`, requestData);

            const data = response.data;
            console.log(data);
            if (response.status === 200) {
                setMessage(data.message);
                setLoading(false);
                setDone(true);
            } else {
                setMessage(data.message || 'Something went wrong');
                setLoading(false);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                // setMessage(error.response.data.message || 'Something went wrong');
                setMessage('An error occurred. Please try again.');
                setLoading(false);
            } else {
                setMessage('An error occurred. Please try again.');
                setLoading(false);
            }
            console.error('Error during subscribing:', error);
        }
    };


      useEffect(() => {
        const fetchStockData = async () => {
          try {
            const response = await fetch(`${STOCKVERSE_BACK_END}/stocks-list?symbols=neov`);
            if (!response.ok) throw new Error("Failed to fetch data");
    
            const result = await response.json();
            const formatteddata = {
                symbol : result[0].symbol,
                name : result[0].overview.Name,
                siteUrl: result[0].overview.OfficialSite, 
                eps : result[0].overview.EPS,
                market_cap : formatNumber(Number(result[0].overview.MarketCapitalization)),
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



    return(
        <>
        {/* hero */}
        <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter} id={"Y4nSkL"} baseId={"VSwpYs"}/>
        <section className="bg-[#010e140d] 2xl:py-20 xl:py-24 py-12 max-md:px-3 px-3">
            <div className="w-full xl:container mx-auto flex justify-between max-lg:flex-col max-lg:gap-y-8">
                <div className="w-[60%] max-md:w-[100%] max-lg:w-[100%]">
                <h1 className="text-[#1D3045] 2xl:text-5xl lg:text-3xl text-[1.5rem] 2xl:leading-[150%] xl:leading-[150%] leading-[150%] font-sansSemibold">This  ${stockdata.price} Stock May SOAR 345.58%</h1>
                <h2 className="text-[#12A72E] 2xl:text-5xl lg:text-3xl text-[1.5rem] 2xl:leading-[150%] xl:leading-[150%] leading-[150%] font-sansSemibold pl-16 max-lg:pl-0">NEOV: The Better Energy Storage!</h2>
                <p className="text-[#343d4899] font-MontserratMedium 2xl:text-xl xl:text-base text-lg 2xl:w-full w-[80%] max-md:w-full pt-4">Breaking: Feb, 2025, Stockverse Reveals Top Energy Storage Stock Pick with Huge Potential! Subscribe Now For Updates!</p>
                </div>
                <div className="w-[35%] max-md:w-[100%] max-lg:w-[50%] md:mt-12">
                    <div>
                    {done && (
                    <div className="w-full bg-[#12a72e] absolute left-0 top-16 p-2 px-4 text-center text-base font-sansMedium text-[#fff]">
                      Thanks For Subscribing.
                    </div>
                  )}
                     <form className="flex items-center justify-between w-full relative" onSubmit={handleSubscribeEmailPhone}>
                        <FaRegEnvelope className="absolute left-4 text-[#424A5D]"/>
                     <input
                        name="search_Symbols"
                        type="text"
                        className="w-[100%] max-lg:w-[100%] px-2 pl-10 py-4 rounded-full max-md:placeholder:text-xs placeholder:text-sm  text-base max-lg:text-xl bg-background rounded outline outline-1 outline-primaryText/10 focus:outline-primaryText/30"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className={`bg-[#12A72E] text-xs text-[#fff] font-MontserratSemibold px-6 py-4 rounded-full shadow-md hover:bg-green-700 transition absolute right-1 ${isSubmitting ? "cursor-not-allowed bg-[#649f6f]" : "bg-[#12A72E]"}`}>

                     {isSubmitting ? "Subscribing..." :  <>
                     Subscribe now <span className="font-MontserratBold max-md:hidden">&#8212; FREE</span>
                     </>}
                    </button>
                     </form>
                     <div className="flex items-center gap-2 2xl:w-[62%] w-[80%] mt-8 2xl:mt-12 relative">
                        <Image src="/images/investors.svg" alt="investors" width={102} height={49}/>
                        <p className="text-[#4B698D] font-MontserratRegular">
                        Join 128,000 smart investors. Subscribe today.
                        </p>
                        <Image className="absolute -right-12 2xl:w-[8rem] w-[7rem] max-lg:-right-20 2xl:-right-32" src="/images/arrow.png" alt="arrow" width={144} height={144}/>
                     </div>
                    </div>
                </div>
            </div>
        </section>

        {/* main */}
        <section className="w-full xl:container mx-auto py-12 max-md:px-3 px-3">
            <div className="flex items-start justify-between max-lg:flex-wrap max-lg:gap-y-8">
                <div className="w-[22%] max-lg:w-[48%] max-md:w-full border-2 border-[#DDE9EF] p-2 rounded-md 2xl:rounded-xl sticky top-12 max-lg:relative max-lg:top-0 max-lg:order-2">
                    <p className="bg-[#F2F3F3] font-MontserratSemibold lg:text-sm 2xl:text-base text-base px-4 py-4 rounded 2xl:rounded-lg">
                    LATEST NEWS
                    </p>
                    <div className="flex flex-col gap-2">
                        <Link 
                        className="font-MontserratMedium 2xl:text-sm text-sm py-2 border-b border-[#F2F3F3] text-[#343D48] hover:underline" 
                        href="https://www.globenewswire.com/news-release/2024/12/11/2995423/0/en/NeoVolta-and-Expion360-Announce-LOI-to-Advance-Battery-Manufacturing-and-Product-Design.html">
                        NeoVolta and Expion360 Announce LOI to Advance Battery Manufacturing and Product Design
                        </Link>
                        <Link 
                        className="font-MontserratMedium 2xl:text-sm text-sm py-2 border-b border-[#F2F3F3] text-[#343D48] hover:underline" 
                        href="https://www.globenewswire.com/news-release/2024/11/13/2980449/0/en/NeoVolta-250M-Loan-Application-Part-One-Approved-by-the-U-S-Department-of-Energy-Loan-Program.html">
                        NeoVolta $250M Loan Application Part One Approved by the U.S. Department of Energy Loan Program
                        </Link>
                        <Link 
                        className="font-MontserratMedium 2xl:text-sm text-sm py-2 text-[#343D48] hover:underline" 
                        href="https://www.globenewswire.com/news-release/2024/10/29/2970827/0/en/NeoVolta-U-S-Department-of-Energy-and-Barrio-El%C3%A9ctrico-Celebrate-Successful-Installation-of-NeoVolta-s-NV24-Battery-Storage-Systems-in-Puerto-Rico.html">
                        {`NeoVolta, U.S. Department of Energy, and Barrio Eléctrico Celebrate Successful Installation of NeoVolta's NV24 Battery Storage Systems in Puerto Rico`}
                        </Link>
                    </div>
                </div>
                <div className="w-[54%] max-md:w-[100%] max-lg:w-[100%] max-lg:order-3">
                    <h3 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 max-md:text-left">Leading the Charge: New US Policies Add Spark to the Future of Solar</h3>
                    <h4 className="text-[#343D48] text-center 2xl:text-2xl lg:text-lg text-lg font-MontserratMedium md:px-28  max-md:text-left">And how one bright stock couldn’t have planned their surge at a better time.</h4>
                    <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-8 text-[#343D48]">Dear Investor,</h6>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-2 text-[#343D48]">
                      {`We’ve seen mind boggling innovations throughout the United States, and the world 
                      over the past few decades — to the point our day-to-day lives are completely different.`}
                      </p>

                    <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-12 text-[#343D48]">Today:</h6>
                    <ul className="list-disc font-MontserratRegular text-base 2xl:text-xl pl-8 leading-[170%] pt-2 2xl:leading-[170%] text-[#343D48]">
                        <li>We walk around with a world of information in our pockets</li>
                        <li>Big businesses are started in people’s homes</li>
                        <li>Artificial Intelligence is used regularly to improve our lives</li>
                    </ul>
                    <p className="font-MontserratRegular text-base 2xl:text-xl py-12 text-[#343D48]">
                        {`Today’s everyday life would be nearly unrecognizable just a few decades back. 
                        All thanks to cutting-edge technologies. And with a growing reliance on technology, 
                        has created a dependence for consistent, and affordable energy sourcing.`}
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl text-[#343D48]">
                    {`… and given shifts in impending climate change and other environmental variables, 
                    there’s been a long-standing push to evolve from conventional energy sourcing.`}
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    The once heavily contested industry has seen a US-based Solar Generation 
                    Growth of 723% (and climbing) since 2014, according to Climate Central. 
                    This jolt in growth has reshaped the national economy, as well as how we see renewable energy.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    American households once reliant on gas, oil, or expensive for-profit utility 
                    companies now have affordable, eco-friendly alternative methods for powering 
                    their homes and lifestyles.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    And according to the US Energy Information Administration, US-based power 
                    generation is projected to grow 75%, from 163 billion kilowatt hours in 2023, 
                    to 286 billion kilowatt hours in 2025.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    This has created a massive BOOM in solar sales, jobs and beyond.
                    </p>
                    <ul className="list-disc font-MontserratRegular text-base 2xl:text-xl pl-8 leading-[170%] pt-2 2xl:leading-[170%] text-[#343D48]">
                        <li>Solar deployments have seen an average annual growth rate of 25%</li>
                        <li>55% of all new electric capacity added to the grid in 2023, came from solar</li>
                        <li>And over 18% of the US’s solar capacity has a corporate offtaker.</li>
                    </ul>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                        {`That’s one reason why major US corporations like Meta, Amazon, Google, Apple and 
                        Walmart are investing in solar at record levels, according to SEIA reports.`}
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    In response to this high-in-demand use of alternative energy, companies around the country 
                    (and world) are racing to produce the best panels, inverters, mounting systems, trackers, 
                    batteries and more — all to be seen as the standard that powers-up the United States.
                    </p>
                    <Image className="w-full my-8 xl:my-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>

                    <h4 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4  max-md:text-left">Solar Living, Post-NEM 3.0</h4>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    NEM 3.0, or Net Energy Metering 3.0 was officially passed via an unanimous 
                    CPUC (California Public Utilities Commission) vote, as of December 15th, 2022.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As a result, California-based homeowners with solar <span className="underline font-MontserratBold">paid up to 75% less in monthly electric bills.</span>
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    NEM 3.0 also led to <span className="underline font-MontserratSemibold">decreasing export rates</span>, allowing for home solar systems to pay for 
                    themselves faster, despite increasing upfront costs, creating a boom in home installations.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    {`And thanks to 2022’s passing of the Inflation Reduction Act, and the millions in tax credits that 
                    came with it, we’ve seen significant improvements in baseline projections for the solar 
                    industry for the foreseeable future. `}
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    {`Based on SEIA’s projections, solar deployment will see a 46% boost over the next 5 years alone, 
                    relative to pre-IRA projections.`}
                    </p>
                    <p className="font-MontserratBold text-base 2xl:text-xl pt-12 text-[#343D48]">
                    But the big news is in the battery systems…
                    </p>
                    <Image className="w-full my-8 xl:my-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>

                    <h4 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 text-[#343D48]">
                        New Battery Systems Make or Break Solar Investments
                    </h4>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    With homeowners looking to <span className="underline">rely less on the grid</span>, more and more people are setting their 
                    sights on the best, more reliable battery systems. 
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    This comes down to direct savings, better coverage in the event of hazardous weather, 
                    and the option to sell-back excess energy to the grid.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    {`Between decreasing reliability from the grind and a growing trend of unprecedented 
                    storms along the US’ east coast have created an added sense of urgency for homeowners.`}
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    The urgency: to have backup systems in the event of brownouts, blackouts and 
                    weather-related power outages.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    That’s why manufacturers are racing to produce the <span className="underline"> most secure and durable battery systems with the highest nominal capacities.</span> 
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Yet, in a sea of competition, one company has clearly stood out as the brightest.
                    </p>

                    <h4 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    Introducing NeoVolta, Inc. <span className="text-[#12A72E]">(NEOV): </span>The Stock Leading the Charge in Solar Energy Storage
                    </h4>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    NeoVolta (NEOV) is a publicly-traded solar battery company leading the solar industry with best-in-class battery systems.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As the solar industry continues to gain traction around the nation, battery systems will be the main focus for consumers and investors alike. 
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Stronger, more reliable battery systems will define solar’s inherent value, in the eyes of coastal and mainland Ameicans.
                    </p>
                    <p className="font-MontserrRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    “Will I be able to store enough power for my home?”
                    </p>
                    <p className="font-MontserrRegular text-base 2xl:text-xl pt-2 text-[#343D48]">
                        “Will climate change impact the effectiveness of solar?”
                    </p>
                    <p className="font-MontserratSemibold text-base 2xl:text-xl pt-2 text-[#343D48]">
                    “Will solar equipment be able to withstand harsh storms?”
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    These are all questions consumers are, and will be asking, <span className="underline font-MontserratBold">when it comes time to invest</span> in the future of their home’s energy production.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    And the answer to these questions comes from the leader in solar batteries…
                    </p>
                    <Image className="w-full my-8 xl:my-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>

                    <h4 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    Led By Proven Experience
                    </h4>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    NeoVolta is led by CEO Ardes Johnson. 
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Johnson is known for his work at Tesla, Meyer Burger Americas, SolarWorld Americas, and General Electric.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Johnson launched the PowerWall and PowerPack partner channel programs, which secured 
                    an 80 MWh storage contract with southern California Edison during his time at Tesla.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As the President and General Manager at Meyer Burger Americas, Johnson oversaw a 
                    $1,000,000,000 backlog and <span className="underline"> scaled manufacturing to 2 gigawatts annually within just 90 days.</span>
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    With his experience with said solar giants, many believe Johnson will have a 
                    competitive edge, when it comes to forming lasting strategic partnerships that 
                    supercharge NeoVolta ahead of its competition. 
                    </p>
                    <p className="font-MontserratBold text-base 2xl:text-xl pt-12 text-[#343D48]">
                    In other words, there is no better man to steer the solar ship!
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]"> 
                    Said predictions have already begun to take shape…
                    </p>

                    <h4 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    An Ever-Expanding Dealer Network
                    </h4>
                    <p  className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Neovolta recently secured a $1,4000,000 purchase order from National Renewable Energy 
                    Partners (NREP) for 150 NV14 energy storage systems. 
                    </p>
                    <p  className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As part of this deal, NeoVolta’s dealer network is expected to expand to Ohio, Texas, 
                    Connecticut, Indiana, and Pennsylvania. 
                    </p>
                    <p  className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    And with this momentum, more can follow suit.
                    </p>
                    <p  className="font-MontserratRegular italic text-base 2xl:text-xl pt-12 text-[#343D48]">
                    “Today marks a significant milestone for NeoVolta as we secure a $1.4 million deal with 
                    National Renewable Energy Partners. This partnership not only expands our dealer network 
                    into key states like Ohio, Texas, and Connecticut but also reinforces our commitment to 
                    empowering homeowners with innovative solar energy storage solutions. 
                    Together, we are shaping a more sustainable future,”  — Ardes Johnson, NeoVolta CEO
                    </p>
                    <p  className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    {`As impressive as this strategic partnership was, investors are focusing on what’s 
                    coming next — because as solar’s popularity soars, its leaders’ value is expected to rise with it.`}
                    </p>
                    <Image className="w-full my-8 xl:my-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>

                    <h4 className="text-[#1D3045]  max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    Uncle Sam Approves: $250M Loan From The US Department of Energy
                    </h4>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As of November, 2024, NeoVolta successfully secured a $250,000,000 loan from 
                    the US Department of Energy (DOE), via the Title 17 Loan Program. 
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    These funds were immediately allocated towards establishing a state-of-the-art 
                    manufacturing facility, as well as regional deployment centers around the country.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    {`This low-interest loan will enable Neo-Volta to create 150+ high-paying jobs, and work in 
                    complete compliance with 2022’s Inflation Reduction Act (IRA), ensuring domestic codification.`}
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    <span className="font-MontserratSemibold underline">This initiative has received bipartisan support,</span> including cited optimism 
                    {` from President-Elect Trump’s pro-solar energy stance.`} 
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    The result: NeoVolta received economic development offers from 23 states — offers 
                    that are currently under review by their executive team.
                    </p>
                    <Image className="w-full my-8 xl:my-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>

                    <h4 className="text-[#1D3045]  max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    A Glance into the Future
                    </h4>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    At this point, the quest for renewable energy is inevitable. With a rise in solar, we’re seeing:
                    </p>
                    <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-2 2xl:leading-[170%] text-[#343D48]">
                        <li>an increase in jobs that experts project will only increase with time</li>
                        <li>more interest in green environmental initiatives</li>
                        <li>more interest in green environmental initiatives</li>
                    </ul>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Every investor knows solar is the future of home energy, but the question is, which 
                    company will lead the charge?
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    {`The truth is, there’s no single way to look at this.`}
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    The solar company(s) that go on to lead the industry will do so because of their cutting-edge 
                    batteries and technology, as well as support from local and national governmental institutions.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    {`And as investors, it’s our job to consider the odds, considering what we know, and what 
                    experts are projecting.`}
                    </p>

                    <h4 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    Expert Investors Are Closely Watching NeoVolta (<span className="#12A72E">NEOV</span>)
                    </h4>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As previously mentioned, there are a plethora of economic, governmental and environmental 
                    factors that will decide the future of solar.
                    </p>
                    <p className="font-MontserratBold text-base 2xl:text-xl pt-12 text-[#343D48]">
                    In the case of NeoVolta, the stars are beginning to align.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Over the last few years, we’ve seen one solar company make <span className="font-MontserratSemibold">massive strides</span> that have 
                    garnered bipartisan support, a commitment to clean energy and an industry-leading 
                    standard in growth and strategic partnerships.  
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    <span className="font-MontserratBold">Those accomplishments aside:</span>
                    {` Regardless of the direct trajectory of the solar industry, 
                    battery systems will be at the heart of every move. And we haven't found a more promising 
                    company or investment opportunity.`}
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    <span className="font-MontserratBold">As the solar industry spreads throughout the country, so will NeoVolta.</span> 
                    For those that see a bright future in solar and see how NeoVolta is leading 
                    the charge, now is the time to take a closer look.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As we’ve already detailed, the expansion of the solar industry is inevitable at this point. 
                    And based on trends and consumer reports, experts are looking at solar companies 
                    producing the best, more reliable batteries designed to keep households powered, 
                    regardless of climate.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Given their extensive industry leadership, current position and cutting-edge products —- 
                    we believe NeoVolta is, without a doubt, the solar stock to consider adding to your portfolio 
                    for 2025.
                    </p>
                    <Link href='/register' className="font-MontserratRegular text-base 2xl:text-xl pt-2 text-[#0000FF] underline">
                      Consider Registering to our platform.
                    </Link>
                    {/* <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Happy investing,
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-2 text-[#343D48]">
                    -Joe w/ Bigstocks
                    </p> */}
                </div>
                <div className="w-[22%] max-lg:w-[48%] max-md:w-[48%] max-md:w-full border-2 border-[#DDE9EF] p-2 rounded-md 2xl:rounded-xl sticky top-12 max-lg:order-1 max-lg:relative max-lg:top-0">
                    <p className="bg-[#F2F3F3] font-MontserratSemibold lg:text-sm 2xl:text-base text-base px-4 py-4 rounded 2xl:rounded-lg">
                    STOCK INFORMATION
                    </p>
                    <div className="flex items-center gap-2 mt-12">
                       <Image className="w-[15%]" src="/images/neov-logo.svg" alt="neov" width={52} height={52}/>
                    <div className="">
                    <p className="text-base 2xl:text-xl font-MontserratBold">NEOVOLTA INC.</p>
                    <p className="flex items-center gap-2 text-xs 2xl:text-base text-[#747474]">NEOV <Image src="/images/nasdaq.svg" alt="neov" width={24} height={24}/> Nasdaq Stock Market</p>
                    </div>
                    </div>
                    <div className="flex items-center justify-between border-y border-[#F2F3F3] py-4 mb-6 mt-6">
                        <div>
                            <p className="font-MontserratSemibold text-xs">February 26</p>
                            <p className="font-MontserratRegular text-[0.6rem]">Upcoming Earnings</p>
                        </div>
                        <div className="border-x border-[#DDDDDD] px-4 max-md:px-10 2xl:px-8">
                            <p className="font-MontserratSemibold text-xs">{stockdata.eps}</p>
                            <p className="font-MontserratRegular text-[0.6rem]">EPS</p>
                        </div>
                        <div>
                            <p className="font-MontserratSemibold text-xs">{stockdata.market_cap}</p>
                            <p className="font-MontserratRegular text-[0.6rem]">Market cap</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-MontserratBold text-xl">{stockdata.price} <span className="font-MontserratSemibold text-sm">USD</span><span className={`text-xs ml-2 font-MontserratMedium ${stockdata.price_change >= 0 ? "text-[#028506]" : "text-[#EE3B38]"}`}> {stockdata.price_change}</span>
                        <span className={`text-xs font-MontserratMedium ${stockdata.avgGrowth >0 ? "text-[#028506]" : "text-[#EE3B38]"}`}> ({stockdata.avgGrowth}%)</span></p>
                        <p className="font-MontserratMedium text-xs text-[#747474]">Market Closed (as of 06:29 GMT+5:30)</p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* add neov to watchlist */}
        <section className="py-10">
        <h4 className="text-[#1D3045]  font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-8">
        Add NEOV to your watchlist today
        </h4>
            <div className="flex items-center  justify-center border-y-2 border-[#3934341c]">
                <div className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem]  flex items-center justify-center border-x-2 border-[#3934341c]">
                    <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/6.png" alt="3" width={70} height={70}/>
                </div>
                <div className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
                   <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/7.png" alt="3" width={70} height={70}/>
                </div>
                <div className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
                   <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/8.png" alt="3" width={70} height={70}/>
                </div>
                <div className="w-[22%] h-[9rem] 2xl:h-[12rem] max-md:h-[5rem] flex items-center justify-center border-r-2 border-[#3934341c]">
                   <Image className="grayscale w-[37%] max-md:w-[60%]" src="/images/9.png" alt="3" width={70} height={70}/>
                </div>
            </div>
        </section>

        {/* Trusted members */}
        <section className="bg-[#010e140d] max-md:py-6 py-16">
            <h4 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-8">
            Proven Results, Trusted By 128,000 Members
            </h4>
            <div className="py-8">
            <div className="flex items-start gap-4 overflow-x-auto scroll-smooth scrollbar-hide whitespace-nowrap px-4"  
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
      
            >
                <div className="bg-[#fff] myslide rounded p-4 w-[100%] md:w-[48%] lg:w-[30%] xl:w-[22%] flex-shrink-0">
                    <p className="font-sansRegular text-base 2xl:text-2xl pt-2 text-[#343D48] whitespace-normal">
                    I would like to take this oppertunity to thank SA Places for the great service rendered to 
                    us and in particular Estelle. You got me the best place ever in just a few moments after 
                    I spoke to you.
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <Image className="w-[3rem]" src="/images/minnie horn.png" alt="user" width={45} height={45} />
                        <div>
                        <p className="font-sansMedium text-sm 2xl:text-xl text-[#343D48]">
                        Minnie Horn
                        </p>
                        <p className="font-sansMedium text-xs 2xl:text-lg pt-2 text-[#4F96FF]">
                        @hello.mimmie
                        </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] myslide rounded p-4 w-[100%] md:w-[48%] lg:w-[30%] xl:w-[22%] flex-shrink-0">
                    <p className="font-sansRegular text-base 2xl:text-2xl pt-2 text-[#343D48] whitespace-normal">
                    I would just like to compliment Estelle Pestana. She has been most professional 
                    and gone to great lengths to assist me. Her patience with me as I continuously 
                    changed my plans is to be commended. Her service re-affirms why I always choose 
                    to book through an agency instead of directly. Thank you
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <Image className="w-[3rem]" src="/images/veona watson.png" alt="user" width={70} height={70} />
                        <div>
                        <p className="font-sansMedium text-sm 2xl:text-xl text-[#343D48]">
                        Veona Watson
                        </p>
                        <p className="font-sansMedium text-xs 2xl:text-lg pt-2 text-[#4F96FF]">
                        @hi.veona
                        </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] myslide rounded p-4 w-[100%] md:w-[48%] lg:w-[30%] xl:w-[22%] flex-shrink-0">
                    <p className="font-sansRegular text-base 2xl:text-2xl pt-2 text-[#343D48] whitespace-normal">
                    Thank you for all your help. Your service was excellent and very FAST.
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <Image className="w-[3rem]" src="/images/justin.svg" alt="justin" width={45} height={45} />
                        <div>
                        <p className="font-sansMedium text-sm 2xl:text-xl text-[#343D48]">
                        Cherice Justin
                        </p>
                        <p className="font-sansMedium text-xs 2xl:text-lg pt-2 text-[#4F96FF]">
                        @cherice.me
                        </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] myslide rounded p-4 w-[100%] md:w-[48%] lg:w-[30%] xl:w-[22%] flex-shrink-0">
                    <p className="font-sansRegular text-base 2xl:text-2xl pt-2 text-[#343D48] whitespace-normal">
                    Many thanks for you kind and efficient service. I have already and will definitely continue to 
                    recommend your services to others in the future. Wishing you all a
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <Image className="w-[3rem]" src="/images/minnie horn.png" alt="user" width={70} height={70} />
                        <div>
                        <p className="font-sansMedium text-sm 2xl:text-xl text-[#343D48]">
                        Minnie Horn
                        </p>
                        <p className="font-sansMedium text-xs 2xl:text-lg pt-2 text-[#4F96FF]">
                        @hello.mimmie
                        </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] myslide rounded p-4 w-[100%] md:w-[48%] lg:w-[30%] xl:w-[22%] flex-shrink-0">
                <p className="font-sansRegular text-base 2xl:text-2xl pt-2 text-[#343D48] whitespace-normal">
                    I would like to take this oppertunity to thank SA Places for the great service rendered to 
                    us and in particular Estelle. You got me the best place ever in just a few moments after 
                    I spoke to you.
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <Image className="w-[3rem]" src="/images/veona watson.png" alt="user" width={70} height={70} />
                        <div>
                        <p className="font-sansMedium text-sm 2xl:text-xl text-[#343D48]">
                        Minnie Horn
                        </p>
                        <p className="font-sansMedium text-xs 2xl:text-lg pt-2 text-[#4F96FF]">
                        @hello.mimmie
                        </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] myslide rounded p-4 w-[100%] md:w-[48%] lg:w-[30%] xl:w-[22%] flex-shrink-0">
                <p className="font-sansRegular text-base 2xl:text-2xl pt-2 text-[#343D48] whitespace-normal">
                    I would just like to compliment Estelle Pestana. She has been most professional 
                    and gone to great lengths to assist me. Her patience with me as I continuously 
                    changed my plans is to be commended. Her service re-affirms why I always choose 
                    to book through an agency instead of directly. Thank you
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <Image className="w-[3rem]" src="/images/minnie horn.png" alt="user" width={70} height={70} />
                        <div>
                        <p className="font-sansMedium text-sm 2xl:text-xl text-[#343D48]">
                        Veona Watson
                        </p>
                        <p className="font-sansMedium text-xs 2xl:text-lg pt-2 text-[#4F96FF]">
                        @hi.veona
                        </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] myslide rounded p-4 w-[100%] md:w-[48%] lg:w-[30%] xl:w-[22%] flex-shrink-0">
                    <p className="font-sansRegular text-base 2xl:text-2xl pt-2 text-[#343D48] whitespace-normal">
                    I would just like to compliment Estelle Pestana. She has been most professional 
                    and gone to great lengths to assist me. Her patience with me as I continuously 
                    changed my plans is to be commended. Her service re-affirms why I always choose 
                    to book through an agency instead of directly. Thank you
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <Image className="w-[3rem]" src="/images/minnie horn.png" alt="user" width={70} height={70} />
                        <div>
                        <p className="font-sansMedium text-sm 2xl:text-xl text-[#343D48]">
                        Veona Watson
                        </p>
                        <p className="font-sansMedium text-xs 2xl:text-lg pt-2 text-[#4F96FF]">
                        @hi.veona
                        </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] myslide rounded p-4 w-[100%] md:w-[48%] lg:w-[30%] xl:w-[22%] flex-shrink-0">
                <p className="font-sansRegular text-base 2xl:text-2xl pt-2 text-[#343D48] whitespace-normal">
                    I would just like to compliment Estelle Pestana. She has been most professional 
                    and gone to great lengths to assist me. Her patience with me as I continuously 
                    changed my plans is to be commended. Her service re-affirms why I always choose 
                    to book through an agency instead of directly. Thank you
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <Image className="w-[3rem]" src="/images/justin.svg" alt="user" width={70} height={70} />
                        <div>
                        <p className="font-sansMedium text-sm 2xl:text-xl text-[#343D48]">
                        Veona Watson
                        </p>
                        <p className="font-sansMedium text-xs 2xl:text-lg pt-2 text-[#4F96FF]">
                        @hi.veona
                        </p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#fff] myslide rounded p-4 w-[100%] md:w-[48%] lg:w-[30%] xl:w-[22%] flex-shrink-0">
                <p className="font-sansRegular text-base 2xl:text-2xl pt-2 text-[#343D48] whitespace-normal">
                    I would just like to compliment Estelle Pestana. She has been most professional 
                    and gone to great lengths to assist me. Her patience with me as I continuously 
                    changed my plans is to be commended. Her service re-affirms why I always choose 
                    to book through an agency instead of directly. Thank you
                    </p>
                    <div className="flex items-center gap-2 mt-8">
                        <Image className="w-[3rem]" src="/images/minnie horn.png" alt="user" width={70} height={70} />
                        <div>
                        <p className="font-sansMedium text-sm 2xl:text-xl text-[#343D48]">
                        Veona Watson
                        </p>
                        <p className="font-sansMedium text-xs 2xl:text-lg pt-2 text-[#4F96FF]">
                        @hi.veona
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>

        {/* disclaimer */}
        <Disclaimer/>

        <section className="xl:container mx-auto px-8 xl:px-0 relative -z-1">
            <div className="bg-[#0A84EF] px-2 py-8 xl:py-16 lg:py-[2rem] rounded-3xl bg-cvkd-bg-6 bg-no-repeat bg-[100%_100%] bg-[length:100%_100%]">
              <p className="font-MontserrarMedium l text-center text-[#fff]">
                &#8213; Join StockVerse Alerts Today!
              </p>
              <h4 className="text-[1.5rem] lg:text-[3.2rem] font-MontserratSemibold leading-[130%] lg:leading-[120%] pb-4 lg:pb-6 text-center text-[#fff]">
                Winning Stock Picks Sent To Inbox
              </h4>
              <p className="font-MontserratRegular text-base md:text-xl xl:tetx-2xl text-[#fff] px-4 lg:px-[5rem] leading-[150%] lg:leading-[120%] text-center">
                Sign up for our newsletter to receive the latest updates, insights, and exclusive Winning Stock Picks. As of 2024, our alerts are up a total of 
                 873.22%.
              </p>
            </div>
          </section>

          <section className="w-full bg-[#000] pt-[4rem] xl:pt-[8rem] mt-[-5rem] xl:mt-[-7rem]">
            <div className="w-full xl:container py-28 xl:px-0 md:px-40 lg:px-20 px-8 mx-auto flex flex-col lg:flex-row lg:justify-between border-b border-solid border-[#404040] space-y-10 lg:space-y-0">
              {/* Left Section - Sign Up */}
              <div className="w-full lg:w-[48%]">
                <div className="bg-[#111111] border border-solid border-[#404040] p-6 sm:p-8 rounded-2xl shadow-lg">
                  <h4 className="text-center text-[#fff] font-MontserrarMedium text-xl sm:text-2xl italic mb-4">
                    — Your Next Winning Stock Awaits!
                  </h4>
                  <p className="text-center text-[#aaaaaa] MontserratRegular text-[1rem] sm:text-[1.3rem] mb-10 sm:mb-16 px-2 sm:px-4">
                    Grow Your Wealth by <span className="text-blue-500">+673.66%</span>! Sign Up Now for Exclusive Stock Picks and Alerts
                  </p>
                  {!done && (
                    <form onSubmit={handleSubscribeEmailPhone} className="space-y-4">
                      <input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="placeholder:text-[#1E1E1F] w-full p-[0.4rem] rounded bg-gray-800 text-primaryTextColor border border-gray-700 focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
                        <PhoneInput
                          country={"us"}
                          value={phone}
                          autoComplete="phone"
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
                      <p className="text-xs text-[#96A0B5] font-MontserratRegular">
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
                    <div className="bg-[#fff] p-2 px-4 rounded-lg text-base font-sansMedium">
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
                    <p className="text-[#aaa] font-MontserratRegular text-[1rem] pb-2">
                    1309 coffeen ave suite 1200
                    </p>
                    <p className="text-[#aaa] font-MontserratRegular text-[1rem]">
                    sheridan wyoming 84403
                    <br />
                      <a href="https://www.stockverse.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        www.stockverse.com
                      </a>
                    </p>
                  </div>
                  <div className="w-full lg:w-[48%]">
                    <h4 className="font-MontserratSemibold text-[1.5rem] text-[#fff] flex items-center gap-3 pb-2">Inquiries</h4>
                    <p className="text-gray-400 text-sm mb-6 flex item-center gap-2">
                    <FaEnvelope size={20} color="#c0c0c0" />
                      <a href="mailto:support@stockverse.com" className="text-[#aaa] font-MontserratRegular text-[1rem] pb-2 underline">
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
                    <Image src="/images/Logo.svg" width={100} height={100} alt="logo" className="w-[12rem] mb-8"/>
                    <p className="text-[#aaa] text-base md:text-xl font-MontserratRegular">
                        Your trusted platform for live Stock Data, Stock News, IPO Calendar, 
                        AI-driven insights, Stock Picks, Alerts, and personalized analysis tools.
                    </p>
                    </div>
                    {/* Quick Links */}
                    <div className="w-[45%] sm:w-[30%] lg:w-[15%]">
                    <h4 className="text-[#fff] text-xl md:text-2xl font-MontserratSemibold mb-8 relative after:content-[''] after:absolute after:left-0 after:top-[2.2rem] after:w-[3rem] after:h-[2px] after:bg-[#2175D9]">
                        Quick Links
                    </h4>
                    <ul className="text-[#aaa] text-base md:text-xl font-MontserratRegular flex flex-col gap-3">
                        <li><a href="/">Home</a></li>
                        <li><a href="/stockverse-gpt">Stockverse GPT</a></li>
                        {/* <li><a href="/stockpicks">Stock Picks</a></li> */}
                    </ul>
                    </div>
                    {/* Market */}
                    <div className="w-[45%] sm:w-[30%] lg:w-[15%]">
                    <h4 className="text-[#fff] text-xl md:text-2xl font-MontserratSemibold mb-8 relative after:content-[''] after:absolute after:left-0 after:top-[2.2rem] after:w-[3rem] after:h-[2px] after:bg-[#2175D9]">
                        Market
                    </h4>
                    <ul className="text-[#aaa] text-base md:text-xl font-MontserratRegular flex flex-col gap-3">
                        <li><a href="/gainers&losers">Gainers/Losers</a></li>
                        <li><a href="/news">News</a></li>
                        <li><a href="/ipo-calendar">IPO Calendar</a></li>
                    </ul>
                    </div>
                    {/* Contact */}
                    <div className="w-[45%] sm:w-[30%] lg:w-[15%]">
                    <h4 className="text-[#fff] text-xl md:text-2xl font-MontserratSemibold mb-8 relative after:content-[''] after:absolute after:left-0 after:top-[2.2rem] after:w-[3rem] after:h-[2px] after:bg-[#2175D9]">
                        Contact
                    </h4>
                    <ul className="text-[#aaa] text-base md:text-xl font-MontserratRegular flex flex-col gap-3">
                        <li><a href="mailto:support@stockverse.com">Email Us</a></li>
                        <li><a href="/feedback">Send Us Feedback</a></li>
                    </ul>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between justify-center mt-[4rem] border-t border-[#404040] pt-[2rem] gap-4">
                    <p className="text-[#aaa] text-base md:text-xl">
                    © 2024 Stockverse, All rights reserved.
                    </p>
                    <ul className="text-[#aaa] text-[0.9rem] md:text-xl font-MontserratRegular sm:flex-row flex items-center flex-wrap gap-4">
                    <li className="border-0 sm:border-r-2 border-[#fafafa] sm:pr-4 pr-0">
                        <a href="/disclaimer">Disclaimer</a>
                    </li>
                    <li className="border-0 sm:border-r-2 border-[#fafafa] px-0 sm:px-4">
                        <a href="/terms">Terms of Service</a>
                    </li>
                    <li className="border-0 sm:border-r-2 border-[#fafafa] px-0 sm:px-4">
                        <a href="/policy">Privacy Policy</a>
                    </li>
                    <li className="sm:pl-4 px-0 sm:px-4"><a href="refund-policy">Refund Policy</a></li>
                    </ul>
                </div>
                </div>
            </footer>
            
        </>
    )
}

export default Neov;


