'use client';
import React, { useState, useEffect } from 'react';
import { useMetadata } from "@/context/MetadataContext";
import Disclaimer from '@/components/Cvkd_disclaimer';
import SymbolInfoWidget from '@/components/SymbolInfoWidget';
import SimpleChartWidget from '@/components/SimpleChartWidget';
import FinancialsWidget from '@/components/FinancialsWidget';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Optional default styles
import axios from "axios";
import MobileNewsletterPopup from '@/components/mobileNewsLetterPopup';
const CVKD = () => {
  
  const { setMetadata } = useMetadata();
  const [userVisible, setUserVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state
  const token = Cookies.get('authToken');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [phone, setPhone] = useState('+1');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [done, setDone] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [er, setEr] = useState(null);
  const [newsletter, setNewsletter] = useState(true);
  

  useEffect(() => {
    if (token) {
      setUserVisible(true); // User is logged in, show user data
    } else {
      setUserVisible(false); // No token, hide user data
      localStorage.removeItem('UserInfo');
    }
    setLoading(false); // Set loading to false after checking token
  }, [token]);

  useEffect(() => {
    setMetadata({
      title: "Cadrenal Therapeutics, (CVKD) Stock Price & Analysis - Stockverse",
      description: "Get the latest Cadrenal Therapeutics (CVKD) stock price and detailed analysis on Stockverse. Stay updated with key metrics, trends and expert insights!",
      schema: ``
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div>
      {/* Navbar */}
      <nav className="w-full bg-white">
        <div className='w-full mx-auto px-3 md:px-8 2xl:px-28 xl:container flex items-center justify-between py-2 relative'>
          <Link href='/' className="relative z-20 flex w-max mr-2">
            <Image className='max-sm:w-[130px]' src="/images/StockverseLogo.png" width={180} height={48} alt='Stockverse Logo' />
          </Link>
          <div className="w-max relative flex items-center gap-1">
            <Link href="/login" className={` ${userVisible ? 'hidden' : 'visible px-4 py-2 max-sm:text-xs text-base text-primaryTextColorColor font-sansMedium bg-white hover:bg-primaryMain/10 rounded-lg'} `}>
              Login
            </Link>
            <Link href="/register" className={` ${userVisible ? 'hidden' : 'visible px-4 py-2 max-sm:text-xs text-base text-white font-sansMedium bg-darkBlue hover:bg-primaryMain rounded-lg transition duration-300'}`}>
              Create Account
            </Link>
            <div className={`${userVisible ? 'visible' : 'hidden'} flex flex-col ga-y-4 items-center`}>
              <Link href="/dashboard" className='visible px-6 py-2 max-sm:text-xs text-base text-white font-sansMedium bg-darkBlue hover:bg-primaryMain rounded-lg transition duration-300'>
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className='w-full bg-black flex flex-col items-start justify-center max-sm:min-h-screen'>
        <div className='w-full mx-auto px-3 md:px-8 2xl:px-28 xl:py-32 2xl:py-72 sm:py-20 xl:container flex flex-col md:gap-6 gap-4'>
          <h1 className='text-white lg:text-7xl sm:text-5xl text-3xl font-Roboto font-semibold flex items-center gap-2'>
            Hot Stock Alert:
            <span className='font-black lg:text-9xl sm:text-7xl text-4xl text-gold cvkd-gold-heading'> (CVKD)</span>
          </h1>
          <h2 className='pt-8 md:text-3xl text-2xl font-Roboto text-white font-semibold'>Nasdaq: Cadrenal Therapeutics (CVKD)</h2>
          <h3 className='lg:text-4xl text-lg px-2 border-l-[3px] border-gold font-Roboto text-white font-semibold'>This $14.75 Stock May SOAR 214.73%... Heres why..</h3>
          <ul className='lg:w-[60%] font-Roboto text-white lg:text-2xl text-base font-regular leading-[120%] md:space-y-6 space-y-4'>
            <li>⦿ New Blood Thinner Drug In Collaboration With Abbot</li>
            <li>⦿ Phase 3 Clinical Trials Underway, FDA Fast-Tracked Drug</li>
            <li>⦿ CVKD Named Anticoagulation Therapy Company Of the Year By Pharma Tech Outlook</li>
            <li>⦿ Targeting a $2 billion US market and addresses a critical unmet medical need in cardiovascular care during a global health crisis.</li>
          </ul>
            <div className="flex flex-wrap gap-2 max-md:pt-4">
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
        </div>
      </div>

      {/* About */}
      <div className='w-full bg-black/10 flex flex-col items-start justify-center'>
        {/* Symble Widget */}
        <div className='w-full mx-auto px-3 md:px-8 2xl:px-28 py-12 xl:container flex flex-col md:gap-6 gap-4'>
          <SymbolInfoWidget symbol="NASDAQ:CVKD" />
        </div>

        {/* About */}
        <div className='w-full mx-auto px-3 md:px-8 2xl:px-28 py-12 xl:container flex flex-col md:gap-12 gap-4 flex flex-col items-center'>
            <h3 className='md:text-5xl text-3xl font-Roboto text-black text-center pb-4 border-b-2 border-cvkdGreen font-bold'>CVKD: The Stock {`That’s`} About to Dominate</h3>
            <div className='w-full bg-white shadow-lg xl:p-16 lg:p-12 p-4'>
              <Image className='w-full' width={1024} height={416} src='/images/cvkd/chart.jpg' alt='logo' loading="lazy"/>
            </div>

            <div className='w-full bg-white flex flex-wrap gap-y-12 justify-between shadow-lg xl:p-16 md:p-12 p-4'>
              <div className='sm:w-[48%] w-full space-y-12'>
                <h3 className='lg:text-4xl text-2xl px-2 border-l-[3px] border-cvkdGreen font-Roboto text-black font-bold !leading-[120%]'>Strong Clinical Backing and Upcoming Catalysts</h3>
                <ol className='list-decimal md:pl-12 pl-6 font-Roboto text-black lg:text-xl text-base font-regular leading-[120%] md:space-y-6 space-y-4'>
                  <li><span className='font-semibold'>Phase 3 Trial Success:</span> {`CVKD’s`} Tecarfarin is heading to Phase 3, where positive results could validate its effectiveness.</li>
                  <li><span className='font-semibold'>Key Catalysts Ahead:</span> With upcoming trial results and potential FDA approval, CVKD is poised for strong gains.</li>
                </ol>
              </div>
              <div className='sm:w-[48%] w-full'>
                <Image className='w-full' width={1024} height={878} src='/images/cvkd/hot-company.jpg' alt='logo'/>
              </div>
            </div>

            <div className='w-full bg-white flex flex-wrap-reverse gap-y-12 justify-between shadow-lg xl:p-16 md:p-12 p-4'>
              <div className='sm:w-[48%] w-full'>
                <Image className='w-full' width={1024} height={576} src='/images/cvkd/unstoppable.png' alt='logo' loading="lazy"/>
              </div>
              <div className='sm:w-[48%] w-full space-y-12'>
                <h3 className='lg:text-4xl text-2xl px-2 border-l-[3px] border-cvkdGreen font-Roboto text-black font-bold !leading-[120%]'>Unstoppable Cardiovascular Revolution</h3>
                <ol className='list-decimal md:pl-12 pl-6 font-Roboto text-black lg:text-xl text-base font-regular leading-[120%] md:space-y-6 space-y-4'>
                  <li><span className='font-semibold'>Game-Changing Drug:</span> {`CVKD’s Tecarfarin isn’t just better—it’s`} the future, leaving competitors like warfarin in the dust.</li>
                  <li><span className='font-semibold'>Market Domination:</span> If approved, tecarfarin has the potential to be the only on-label drug for LVAD patients in the U.S.</li>
                </ol>
              </div>
            </div>

            <div className='w-full bg-white flex flex-wrap gap-y-12 justify-between shadow-lg xl:p-16 md:p-12 p-4'>
              <div className='sm:w-[48%] w-full space-y-12'>
                <h3 className='lg:text-4xl text-2xl px-2 border-l-[3px] border-cvkdGreen font-Roboto text-black font-bold !leading-[120%]'>Unrivaled Market Opportunity</h3>
                <ol className='list-decimal md:pl-12 pl-6 font-Roboto text-black lg:text-xl text-base font-regular leading-[120%] md:space-y-6 space-y-4'>
                  <li><span className='font-semibold'>$2 Billion Target:</span> Tecarfarin is gearing up to dominate a massive $2 billion market. This {`isn’t`} just another player.</li>
                  <li><span className='font-semibold'>FDA Fast-Track:</span> With the FDA fast-tracking approval, Tecarfarin is on the brink of exploding onto the scene.</li>
                </ol>
              </div>
              <div className='sm:w-[40%] w-full'>
                <Image className='w-full' width={387} height={387} src='/images/cvkd/unrivaled.png' alt='logo' loading="lazy"/>
              </div>
            </div>
        </div>
      </div>

      <div className='w-full flex flex-col items-start justify-center'>
        {/* Why Cadrenal */}
        <div className='w-full mx-auto px-3 md:px-8 2xl:px-28 py-20 xl:container flex flex-col md:gap-12 gap-4 items-center'>
          <h3 className='md:text-5xl text-3xl font-Roboto text-black text-center pb-4 border-b-2 border-cvkdGreen font-bold'>
            Why Cadrenal Therapeutics is a Must-Watch Opportunity
          </h3>
          <p className='text-lg font-Roboto text-black text-center pb-4 font-normal'>At Stockverse, we believe that CVKD is not just another player in the biotech industry—it is a game-changer. {`Here’s`} why:</p>
          
          <div className='w-full flex flex-wrap gap-y-8 justify-between pt-8'>
            
            <div className='md:w-[48%] space-y-8'>
              <div className='bg-white w-full space-y-4 shadow-lg md:p-8 p-6 border-l-4 border-cvkdGreen'>
                <h4 className='text-black font-Roboto text-2xl font-semibold'>Groundbreaking Drug (Tecarfarin)</h4>
                <p className='text-lg font-Roboto text-black font-normal'>
                  Tecarfarin is on track to dominate the massive long-term anticoagulation market. Set to become the go-to choice for patients with atrial fibrillation, prosthetic heart valves, and recurrent VTE, this game-changing drug is ready to capture a multi-billion-dollar industry and leave competitors in the dust
                </p>
              </div>
              <div className='bg-white w-full space-y-4 shadow-lg md:p-8 p-6 border-l-4 border-cvkdGreen'>
                <h4 className='text-black font-Roboto text-2xl font-semibold'>Innovative Drug Design</h4>
                <p className='text-lg font-Roboto text-black font-normal'>
                  Targeted Action: Tecarfarin is designed to be metabolized differently than traditional blood thinners, reducing the risk of drug-drug interactions and offering a potentially safer option for patients. This innovation could capture significant market share in the anticoagulant space.
                </p>
              </div>
              <div className='bg-white w-full space-y-4 shadow-lg md:p-8 p-6 border-l-4 border-cvkdGreen'>
                <h4 className='text-black font-Roboto text-2xl font-semibold'>Phase 3 Clinical Trials</h4>
                <p className='text-lg font-Roboto text-black font-normal'>
                  Proven Potential: Ongoing Phase 3 trials are critical for assessing {`Tecarfarin’s`} efficacy and safety on a larger scale. Positive results from these trials could serve as a strong catalyst.
                </p>
              </div>
            </div>
          
            <div className='md:w-[48%] space-y-8'>
              <div className='bg-white w-full space-y-4 shadow-lg md:p-8 p-6 border-l-4 border-cvkdGreen'>
                <h4 className='text-black font-Roboto text-2xl font-semibold'>FDA Fast-Track Designation</h4>
                <p className='text-lg font-Roboto text-black font-normal'>
                  Accelerated Path to Market: The {`FDA’s`} Fast Track designation highlights {`Tecarfarin’s`} potential to meet an unmet medical need. This status not only speeds up its development and review process but also underscores its importance in advancing cardiovascular care.
                </p>
              </div>
              <div className='bg-white w-full space-y-4 shadow-lg md:p-8 p-6 border-l-4 border-cvkdGreen'>
                <h4 className='text-black font-Roboto text-2xl font-semibold'>Reduced Patient Burden</h4>
                <p className='text-lg font-Roboto text-black font-normal'>
                  Consistent Anticoagulation with Less Monitoring: Tecarfarin’s ability to provide more consistent anticoagulation reduces the need for frequent blood monitoring, which could improve patient adherence and satisfaction. This advantage may lead to strong adoption rates, particularly in complex patient populations.
                </p>
              </div>
              <div className='bg-white w-full space-y-4 shadow-lg md:p-8 p-6 border-l-4 border-cvkdGreen'>
                <h4 className='text-black font-Roboto text-2xl font-semibold'>Strong Competitive Advantage</h4>
                <p className='text-lg font-Roboto text-black font-normal'>
                  Fewer Drug Interactions: {`Tecarfarin’s`} unique metabolism gives it a competitive edge over existing treatments like warfarin, especially for patients on multiple medications. This feature could drive preference among healthcare providers and patients, leading to robust sales growth.
                </p>
              </div>
            </div>
          
          </div>
        </div>

        {/* CEO */}
        <div className='w-full mx-auto px-3 md:px-8 xl:px-28 py-12 xl:container flex flex-col md:gap-12 gap-4 items-center'>
          <h3 className='md:text-5xl text-3xl font-Roboto text-black text-center pb-4 border-b-2 border-cvkdGreen font-bold !leading-[130%]'>
            CEO Discusses the Groundbreaking Potential of Tecarfarin for Cadrenal Therapeutics (CVKD)
          </h3>
          <iframe className='w-full md:h-[600px]' width="560" height="315" src="https://www.youtube.com/embed/MvQWFLvecho?si=fsSHDVPl8LqJr3hM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        
        {/* Chart and financials */}
        <div className='w-full mx-auto px-3 md:px-8 xl:px-28 py-12 xl:container flex flex-wrap gap-y-12 justify-between'>
          <div className='md:w-[48%] w-full'>
            <SimpleChartWidget symbol="NASDAQ:CVKD" />
          </div>
          <div className='md:w-[48%] w-full'>
            <FinancialsWidget symbol="NASDAQ:CVKD" />
          </div>
        </div>
        
        {/* Form */}
        <div className='w-full mx-auto px-3 md:px-8 xl:px-28 py-12 xl:container flex flex-wrap gap-y-12 justify-between'>
          <div className='lg:w-[45%] w-full space-y-4'>
            <h4 className='text-lg px-2 border-l-4 border-cvkdGreen font-Roboto text-black font-semibold'>Join StockVerse Alerts Today!</h4>
            <h4 className='text-black font-Roboto text-3xl font-semibold'>Winning Stock Picks Sent To Inbox</h4>
            <p className='text-lg font-Roboto text-black font-normal pb-4 border-b'>
              Sign up for our newsletter to receive the latest updates, insights, and exclusive Winning Stock Picks. As of 2024 our alerts are up a total of 873.22%
            </p>
            <h4 className='text-2xl px-2 border-l-4 border-cvkdGreen font-Roboto text-black font-semibold'>Follow us on Social Media:</h4>
            <div className="flex items-center gap-2">
                <Link href='https://www.facebook.com/profile.php?id=61556580840606#'>
                    <Image className='' src="/images/facebook.png" width={38} height={38} alt='Stockverse Logo' />
                </Link>
                <Link href='https://www.instagram.com/stockverse.ai?igsh=MWVuZXk4OHc0endyeA%3D%3D'>
                    <Image className='' src="/images/instagram.png" width={38} height={38} alt='Stockverse Logo' />
                </Link>
                <Link href='https://x.com/StockVerseAI'>
                    <Image className='' src="/images/twitter.png" width={38} height={38} alt='Stockverse Logo' />
                </Link>
                <Link href='https://www.tiktok.com/@stockverseai'>
                    <Image className='' src="/images/tiktok.png" width={38} height={38} alt='Stockverse Logo' />
                </Link>
            </div>
            <h4 className='text-2xl px-2 border-l-4 border-cvkdGreen font-Roboto text-black font-semibold'>Subscribe to Our Newsletter:</h4>
            <p className='text-lg font-Roboto text-black font-normal'>
              Stay updated with the latest stock picks and market insights from Stockverse.
            </p>
            <p className='text-lg font-Roboto text-black font-bold'>
              Stockverse - Your Trusted Source for Winning Stock Picks.
            </p>
          </div>
          <div className='lg:w-[48%] w-full'>
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
        </div>


      </div>

      {/* Disclaimer */}
      <div className='xl:container mx-auto px-0 2xl:px-28'>
        <Disclaimer />
      </div>
            <MobileNewsletterPopup newsletter={newsletter} setNewsletter={setNewsletter}/>
    </div>
  );
};

export default CVKD;