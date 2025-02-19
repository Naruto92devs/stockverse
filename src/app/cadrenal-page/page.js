'use client';
import Image from "next/image";
import React, { useRef, useState,useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope,FaRegEnvelope } from "react-icons/fa";

import formatNumber from "@/components/FormatNumber";


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
      const scrollRef = useRef(null);
      let isDown = false;
      let startX;
      let scrollLeft;


    const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

    const handleSubscribeEmailPhone = async (e) => {
      setLoading(true);
      e.preventDefault();
      const id = "YizWSN";
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
              setMessage(error.response.data.message || 'Something went wrong');
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
            const response = await fetch(`${STOCKVERSE_BACK_END}/stocks-list?symbols=cvkd`);
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
        <section className="bg-[#010e140d] 2xl:py-20 xl:py-24 py-12 max-md:px-3 px-3">
            <div className="w-full xl:container mx-auto flex justify-between max-lg:flex-col max-lg:gap-y-8">
                <div className="w-[60%] max-md:w-[100%] max-lg:w-[100%]">
                <h1 className="text-[#1D3045] 2xl:text-6xl lg:text-5xl text-[2rem] 2xl:leading-[150%] xl:leading-[150%] leading-[150%] font-syneBold">Brand New Stock Pick:</h1>
                <h1 className="text-[#12A72E] 2xl:text-6xl lg:text-5xl text-[2rem] 2xl:leading-[150%] xl:leading-[150%] leading-[150%] font-syneBold pl-16 max-lg:pl-0">The better energy storage!</h1>
                <p className="text-[#343d4899] font-MontserratMedium 2xl:text-xl xl:text-base text-lg 2xl:w-full w-[80%] max-md:w-full pt-4">Breaking: Dec, 2nd 2024, BigStocks Reveals Top Energy Storage Stock Pick with Huge Potential! Subscribe Now For Updates!</p>
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
                        href="https://www.benzinga.com/news/24/09/40827755/why-champions-oncology-shares-are-trading-higher-by-over-13-here-are-20-stocks-moving-premarket">
                        Why Champions Oncology Shares Are Trading Higher By Over 13%; Here Are 20 Stocks
                         Moving Premarket - Champions Oncology ( NASDAQ:CSBR )
                        </Link>
                        <Link 
                        className="font-MontserratMedium 2xl:text-sm text-sm py-2 border-b border-[#F2F3F3] text-[#343D48] hover:underline" 
                        href="https://www.benzinga.com/pressreleases/24/08/g40481416/presenting-on-the-emerging-growth-conference-74-day-2-on-august-22-register-now">
                        Presenting on the Emerging Growth Conference 74 Day 2 on August 22 Register Now - 
                        BlockchainK2 ( OTC:BIDCF ) , Ascend Wellness Holdings ( OTC:AAWH )
                        </Link>
                        <Link 
                        className="font-MontserratMedium 2xl:text-sm text-sm py-2 text-[#343D48] hover:underline" 
                        href="https://www.benzinga.com/pressreleases/24/08/g40457701/presenting-on-the-emerging-growth-conference-74-day-1-on-august-21-register-now">
                        {`Presenting on the Emerging Growth Conference 74 Day 1 on August 21 Register Now - BlockchainK2 ( OTC:BIDCF ) , Ascend Wellness Holdings ( OTC:AAWH )`}
                        </Link>
                    </div>
                </div>
                <div className="w-[54%] max-md:w-[100%] max-lg:w-[100%] max-lg:order-3">
                    <h2 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 max-md:text-left">
                    Heart Disease: The $200 Billion Dollar Problem That’s Killing America in More Ways Than One
                    </h2>
                    <h4 className="text-[#343D48] text-center 2xl:text-2xl lg:text-lg text-lg font-MontserratMedium md:px-28  max-md:text-left">
                    And how a surprisingly lucrative company might be a life-changing solution
                      </h4>
                    <h6 className="font-MontserratBold  text-lg 2xl:text-xl pt-8 text-[#343D48]">Dear Investor,</h6>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-2 text-[#343D48]">
                    Heart disease has quickly become the leading cause of death in the United States. 
                    According to the American Heart Association, <span className="underline font-MontserratBold">nearly half of US-based adults live with 
                    some form of cardiovascular disease</span> — that’s about 121,000,000 people.
                      </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl py-12 text-[#343D48]">
                        {`Someone dies from cardiovascular disease in the United States every 36 seconds — 
                        which makes up for approximately 25% of total deaths.`}
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl text-[#343D48]">
                    As if the climbing death toll wasn’t horrible enough, the long-term effects are 
                    <span className="font-MontserratBold"> draining billions of dollars from the US’ economy.</span>
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    In fact, direct costs for treating heart disease exceeds $200,000,000,000 annually — 
                    this includes healthcare services, medications and lost productivity. When considering 
                    indirect costs, such as lost wages and decreased quality of life, the economic impact 
                    falls just short of $1,000,000,000,000 every year.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Heart disease is more than a health crisis. It’s an economic crisis, too.
                    </p>
                    <Image className="w-full my-6 xl:my-12 mb-[8] xl:mb-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>

                    <h2 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4  max-md:text-left">
                    The Trickling Devastation of Heart Disease
                      </h2>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As stated, approximately 121,000,000 Americans live with some form of cardiovascular 
                    disease. However, the devastation doesn’t end with them — it bleeds into their families 
                    and communities.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    When someone has a heart attack, loved ones can’t help but worry.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-4 text-[#343D48]">
                    “Will they survive”<br/>
                    “If they do, will they have a decent quality of life?”<br/>
                    “Will insurance help cover these costs?”<br/>
                    “Will I need a second job to cover these medical expenses?”
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    They’re left with fear, anxiety — and oftentimes, dread.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Then friends, neighbors and coworkers hear the news. Here, each person’s life is affected a little differently.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    In the short-term, people feel grief and sadness. In the long-term, <span className="underline font-MontserratBold">communities 
                    and businesses begin to suffer.</span> Eventually, there’s a long-lasting stress on local healthcare 
                    systems, leading to a snowball effect of economic strain.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    … and as the population ages, experts project this problem to worsen.
                    </p>
                    <h2 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 mt-24 max-md:mt-8  max-md:text-left">
                    Warfarin: Today’s Limited Treatment Option
                    </h2>
                    <Image className="w-full mt-8 xl:mt-20" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>

                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Americans have had to settle for Warfarin over the past few decades. 
                    The blood-thinning medication has been used to prevent strokes, heart attacks, 
                    and other blood clot-related complications.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As of 2022, <span className="underline font-MontserratBold">Warfarin was valued at $540.21M</span> globally and is on pace to reach upwards of $566.73M by 2028.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Millions of Americans with atrial fibrillation, deep vein thrombosis, and similar conditions — 
                    and those who have undergone heart valve replacement surgery have been prescribed Warfarin.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    And while it’s certainly true that Warfarin has saved countless lives — it’s far from a perfect solution.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Because while there have been upsides, Warfarin is notoriously known to: 
                    </p>
                    <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pl-8 leading-[170%] pt-2 2xl:leading-[170%] text-[#343D48]">
                        <li>Be difficult to manage</li>
                        <li>Require consistent monitoring and dose adjustments</li>
                        <li>Involve regular blood testing (to monitor blood thickness)</li>
                    </ul>

                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Taking Warfarin is a known balancing act, requiring careful management — yes, many patients still experience complications.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    For instance, Warfarin is known to not interact with other medications (and even certain foods) well. 
                    Even a simple kale salad for lunch (high in Vitamin K) can adversely affect how Warfarin works in the body.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Stronger, more reliable battery systems will define solar’s inherent value, in the eyes of coastal and mainland Ameicans.
                    </p>
                    <p className="font-MontserrRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As a result, patients must follow a strict diet and be constantly cautious about other medications they choose 
                    — regardless of their condition.
                    </p>
                    <p className="font-MontserrRegular text-base 2xl:text-xl pt-2 text-[#343D48]">
                    That’s because Warfarin’s associated risks are substantial. Some can include bleeding complications, 
                    ranging from minor bruising to life-threatening hemorrhages.
                    </p>
                    <p className="font-MontserratSemibold text-base 2xl:text-xl pt-2 text-[#343D48]">
                    In fact, <span className="underline font-MontserratBold">gastrointestinal bleeding is one of the most common causes</span> for hospital admissions among Warfarin patients 
                    — this can easily lead to prolonged hospital stays, blood transfusions, and in some cases, surgery.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Despite the risks, patients use Warfarin, not because they want to — but because it’s their best choice… for now.
                    </p>

                    <h2 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    The Unmet Need: Why We Desperately Need Better Treatments
                    </h2>


                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Warfarin’s limitations shed light on a broader issue in treating heart disease: 
                    the urgent need for a safer, more effective solution.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Patients with atrial fibrillation, heart failure, and those who require mechanical circulatory support devices like Left 
                    Ventricular Assist Devices (LVADs) are particularly vulnerable. And they’re often at high risk for thromboembolic 
                    events (such as strokes), as well as bleeding complications. Their stakes are incredibly high, and the need for 
                    improved anticoagulation therapy is critical.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    LVAD patients, for example, rely on these devices to keep their hearts pumping, but they also require 
                    lifelong anticoagulation therapy to prevent blood clots from forming in the device.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Warfarin is typically prescribed, but as mentioned earlier, it <span className="font-MontserratBold">
                      comes with very dangerous risks.</span> The bleeding 
                    complications associated with warfarin are especially problematic for LVAD patients, 
                    who already face numerous health challenges.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Then, the situation is further complicated — many heart disease patients are elderly and have other 
                    comorbidities, such as chronic kidney disease, that can make managing their condition even more difficult. 
                    These patients often take <span className="underline font-MontserratBold">multiple medications,</span> increasing the risk of drug interactions and adverse effects.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Between the direct adverse effects of taking Warfarin, and all of the restrictions 
                    that come with it, health-related problems are not uncommon.
                    </p>
                    
                    <h2 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    Introducing Cadrenal Therapeutics (<span className="text-[#37b80b]">CVKD</span>): The Future of Heart Disease Treatment?
                    </h2>
                    <Image className="w-full mt-8 xl:mt-12" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>
                    <p  className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Cadrenal Therapeutics (<span className="text-[#37b80b]">CVKD</span>) a publicly listed biopharmaceutical 
                    company is on the frontlines of developing a next-generation solution to one of the most pressing challenges 
                    in heart disease treatment.. 
                    </p>
                    <p  className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Their flagship product, Tecarfarin, is a novel anticoagulant with the potential to revolutionize 
                    how we manage patients in need of blood-thinning therapy.. 
                    </p>
                    <p  className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Tecarfarin is a Vitamin K Antagonist (VKA), like Warfarin, but with a crucial difference: it’s metabolized 
                    through a different pathway. Unlike Warfarin, which is processed by the liver’s cytochrome 
                    P450 system, Tecarfarin is metabolized by carboxyl esterase, an enzyme that’s not as susceptible 
                    to the same drug-drug interactions.
                    </p>
                    <p  className="font-MontserratRegular italic text-base 2xl:text-xl pt-12 text-[#343D48]">
                    So, Tecarfarin has the potential to provide more stable anticoagulation, with fewer dietary and medication restrictions.
                    </p>
                    <p  className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    This can be life-changing for patients.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    This could mean a world without worrying about what they can eat because of their medication. 
                    A world where they can take their anticoagulant <span className="font-MontserratBold">without fear of bleeding complications.</span>
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    This is Tecarfarin’s promise.
                    </p>

                    <h2 className="text-[#1D3045]  max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    The Tecarfarin Difference
                    </h2>

                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Cadrenal Therapeutics (CVKD) designed Tecarfarin to specifically address the challenges 
                    that make managing anticoagulation so difficult for patients with complex cardiovascular conditions.
                    </p>
                    <p className="font-MontserratSemibold text-base 2xl:text-xl pt-12 text-[#343D48]">
                    In clinical studies, Tecarfarin has demonstrated the ability to maintain a more consistent level of 
                    anticoagulation, reducing the risk of both clotting and bleeding events. 
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    This consistency is particularly important for patients with LVADs, who rely on their 
                    anticoagulant therapy to keep them alive. The potential for <span className="underline font-MontserratBold">fewer complications</span> 
                    means these patients can <span className="underline font-MontserratBold">spend less time in the hospital</span> and more time living their lives.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    But Tecarfarin’s benefits don’t stop there…
                    </p>

                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Due to its <span className="underline font-MontserratBold">unique metabolization propertie</span>s, Tecarfarin is less likely to be affected by changes 
                    in kidney function, which is a common issue among patients with chronic kidney disease.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    This gives a significant advantage to Tecarfarin, as many heart disease patients have impaired renal function, 
                    making it difficult to manage their anticoagulation therapy.
                    </p>

                    <h2 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    The Road Ahead: Cadrenal’s Vision for the Future
                    </h2>
                    <Image className="w-full mt-8 xl:mt-12" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>


                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Cadrenal Therapeutics (<span className="text-[#30c509]">CVKD</span>) is fully committed to bringing Tecarfarin to market as <span className="underline font-MontserratBold">the 
                    first and only oral anticoagulant</span> specifically approved for patients with implanted cardiac devices. 
                    They’re currently advancing through pivotal clinical trials, and the early results are promising.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    The FDA has already granted Tecarfarin Orphan Drug Designation, recognizing its potential 
                    to address a critical unmet need in a rare patient population. This designation not only 
                    accelerates the development process but also provides market exclusivity, positioning 
                    Cadrenal for long-term success.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    But Cadrenal’s vision goes beyond just one drug.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    They’re dedicated to transforming the landscape of cardiovascular care by developing 
                    innovative therapies that improve patient outcomes and reduce the burden of heart disease 
                    on families and communities.
                    </p>

                    <h2 className="text-[#1D3045] max-md:text-left font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-4 pt-8 xl:pt-20">
                    Why You Should Consider Taking a Closer Look at Cadrenal Therapeutics
                    </h2>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    As an investor, you have the chance to become part of something special.
                    </p>
                    <p className="font-MontserratBold text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Cadrenal Therapeutics isn’t just some biotech company — they’re on the verge of changing the way we treat heart disease. 
                    They could very well be a few steps-away from changing millions of lives for the better.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    So by considering Cadrenal, you could potentially become part of solving one of our nation’s 
                    biggest, and most devastating challenges — and of course, reaping the rewards of its success.  
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    With Tecarfarin, Cadrenal is addressing a massive unmet need with a drug that can potentially become 
                    <span className="font-MontserratBold">the new gold standard in anticoagulation therapy.</span>
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    This is a real chance to make a real difference in the lives of patients and their families. 
                    By paying close attention to Cadrenal, you might be investing in a healthy future for your family, 
                    friends, neighbors and beyond.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    Cadrenal Therapeutics is at a critical juncture, and the next few years could see them make a 
                    significant impact on the healthcare industry. For those who believe in the company’s 
                    mission and the potential of Tecarfarin, now is the time to take a much closer look.
                    </p>
                    <p className="font-MontserratRegular text-base 2xl:text-xl pt-12 text-[#343D48]">
                    If you’re ready to be part of a revolution in heart disease treatment – consider taking a 
                    closer look a Cadrenal Therapeutics (<span className="text-[#0d9503]">CVKD</span>).
                    </p>
                    <Image className="w-full my-8 xl:my-12" src="/images/neovolta-energy-house.png" alt="neovolta energy house" width={892} height={498}/>
                </div>
                <div className="w-[22%] max-lg:w-[48%] max-md:w-[48%] max-md:w-full border-2 border-[#DDE9EF] p-2 rounded-md 2xl:rounded-xl sticky top-12 max-lg:order-1 max-lg:relative max-lg:top-0">
                    <p className="bg-[#F2F3F3] font-MontserratSemibold lg:text-sm 2xl:text-base text-base px-4 py-4 rounded 2xl:rounded-lg">
                    STOCK INFORMATION
                    </p>
                    <div className="flex items-center gap-2 mt-12">
                       <Image className="w-[15%]" src="/images/cadrenal.jpeg" alt="neov" width={52} height={52}/>
                    <div className="">
                    <p className="text-sm 2xl:text-lg font-MontserratBold">Cadrenal Therapeutics, Inc.</p>
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
        <h2 className="text-[#1D3045]  font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-8">
        Add CVKD to your watchlist today
        </h2>
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
            <h2 className="text-[#1D3045] font-MontserratBold text-center 2xl:text-4xl lg:text-3xl text-2xl leading-[150%] xl:leading-[150%] 2xl:leading-[150%] mb-8">
            Proven Results, Trusted By 128,000 Members
            </h2>
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
        <section className="w-full xl:container mx-auto max-md:px-3 xl:pt-20 xl:pb-20 max-md:pb-12 px-3 text-[#343D48]">
            <p className="font-MontserratMedium max-md:font-MontserratRegular text-base 2xl:text-xl 2xl:leading-[185%] leading-[170%] pt-2">
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
           <p className="font-MontserratMedium max-md:font-MontserratRegular text-base 2xl:text-xl 2xl:leading-[185%] leading-[170%] pt-8">
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
           <p className="font-MontserratMedium max-md:font-MontserratRegular text-base 2xl:text-xl 2xl:leading-[185%] leading-[170%] pt-8">
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
        </section>

        <section className="xl:container mx-auto px-8 xl:px-0 relative -z-1">
            <div className="bg-[#0A84EF] px-2 py-8 xl:py-16 lg:py-[2rem] rounded-3xl bg-cvkd-bg-6 bg-no-repeat bg-[100%_100%] bg-[length:100%_100%]">
              <p className="font-MontserrarMedium l text-center text-[#fff]">
                &#8213; Join StockVerse Alerts Today!
              </p>
              <h1 className="text-[1.5rem] lg:text-[3.2rem] font-MontserratSemibold leading-[130%] lg:leading-[120%] pb-4 lg:pb-6 text-center text-[#fff]">
                Winning Stock Picks Sent To Inbox
              </h1>
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
                  <h3 className="text-center text-[#fff] font-MontserrarMedium text-xl sm:text-2xl italic mb-4">
                    — Your Next Winning Stock Awaits!
                  </h3>
                  <p className="text-center text-[#aaaaaa] MontserratRegular text-[1rem] sm:text-[1.3rem] mb-10 sm:mb-16 px-2 sm:px-4">
                    Grow Your Wealth by <span className="text-blue-500">+673.66%</span>! Sign Up Now for Exclusive Stock Picks and Alerts
                  </p>
                  {!done && (
                    <form onSubmit={handleSubscribeEmailPhone} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="placeholder:text-[#1E1E1F] w-full p-[0.4rem] rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2">
                        <PhoneInput
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
                    <h3 className="text-[#fff] text-xl md:text-2xl font-MontserratSemibold mb-8 relative after:content-[''] after:absolute after:left-0 after:top-[2.2rem] after:w-[3rem] after:h-[2px] after:bg-[#2175D9]">
                        Quick Links
                    </h3>
                    <ul className="text-[#aaa] text-base md:text-xl font-MontserratRegular flex flex-col gap-3">
                        <li><a href="/">Home</a></li>
                        <li><a href="/stockverse-gpt">Stockverse GPT</a></li>
                        {/* <li><a href="/stockpicks">Stock Picks</a></li> */}
                    </ul>
                    </div>
                    {/* Market */}
                    <div className="w-[45%] sm:w-[30%] lg:w-[15%]">
                    <h3 className="text-[#fff] text-xl md:text-2xl font-MontserratSemibold mb-8 relative after:content-[''] after:absolute after:left-0 after:top-[2.2rem] after:w-[3rem] after:h-[2px] after:bg-[#2175D9]">
                        Market
                    </h3>
                    <ul className="text-[#aaa] text-base md:text-xl font-MontserratRegular flex flex-col gap-3">
                        <li><a href="/gainers&losers">Gainers/Losers</a></li>
                        <li><a href="/news">News</a></li>
                        <li><a href="/ipo-calendar">IPO Calendar</a></li>
                    </ul>
                    </div>
                    {/* Contact */}
                    <div className="w-[45%] sm:w-[30%] lg:w-[15%]">
                    <h3 className="text-[#fff] text-xl md:text-2xl font-MontserratSemibold mb-8 relative after:content-[''] after:absolute after:left-0 after:top-[2.2rem] after:w-[3rem] after:h-[2px] after:bg-[#2175D9]">
                        Contact
                    </h3>
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


