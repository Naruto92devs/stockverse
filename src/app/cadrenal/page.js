'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import HeroSlider from './components/HeroSilder';
import Investors from './components/Investors';
import CvkdForm from './components/cvkdForm';
import Hero from './components/Hero';
import Leader from './components/cvkdLeader';
import KeyInfo from './components/KeyInfo';
import WhyCVKD from './components/WhyCvkd';
import BigPharma from './components/BigPharma';
import Disclaimer from '@/components/Cvkd_disclaimer';
import NewsLetterPopup from '@/components/NewsLetterPopup';

const Cadrenal = () => {

  const [userVisible, setUserVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state
  const token = Cookies.get('authToken');
  const [newsletter, setNewsletter] = useState(true);
  const heading = "Winning Stock Picks"
  const subHeading = "Grow Your Wealth by +673.66%! Get Exclusive Stock Picks Sent To Your Inbox!"
  

  useEffect(() => {
    if (token) {
      setUserVisible(true); // User is logged in, show user data
    } else {
      setUserVisible(false); // No token, hide user data
      localStorage.removeItem('UserInfo');
    }
    setLoading(false); // Set loading to false after checking token
  }, [token]);

  const faqData = [
    {
      question: "What does Cadrenal do?",
      answer:
        "Cadrenal Therapeutics is developing a novel anticoagulant designed to reduce the risks associated with current blood thinners, such as bleeding and stroke, especially in high-risk patient populations where treatment options remain limited.",
    },
    {
      question: "How is Tecarfarin different from traditional blood thinners?",
      answer:
        "Tecarfarin is designed to offer more predictable effects and fewer interactions with certain medications and foods. Its unique metabolism may support more consistent results in patients who respond variably to conventional anticoagulants.",
    },
    {
      question: "How is Abbott involved?",
      answer:
        "Abbott is involved by providing the anticoagulation monitoring technology used in the clinical trials of Tecarfarin, helping ensure accurate and consistent dosing.",
    },
    {
      question: "Why is the unmet need so large?",
      answer:
        "The unmet need remains significant because millions of patients are unable to use existing anticoagulants effectively—often due to bleeding risks, drug interactions, or unpredictable response—leaving them without consistent or suitable treatment options.",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='w-full overflow-hidden'>
      {/* Navbar */}
      <nav className="w-full border-b-[1.5px] border-[#111111]/15 bg-white">
        <div className='w-full mx-auto px-3 xl:px-0 2xl:px-28 xl:container flex items-center justify-between py-2 relative'>
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

      {/* Hero Heading */}
      <Hero/>

      {/* HeroSlider */}
      <div 
      className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container sm:py-16 py-8 relative'>
        <HeroSlider />
      </div>

      {/* CVKD Leader */}
      <Leader/>

      {/* Investors */}
      <Investors/>

      {/* Key Info */}
      <KeyInfo/>

      {/* Why CVKD */}
      <WhyCVKD/>

      {/* Big Pharma */}
      <BigPharma/>

      {/* Unlocking Safety */}
      <div className='w-full bg-cvkdBg bg-no-repeat bg-cover bg-bottom-left'>
        <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-24 flex lg:flex-row flex-col justify-between lg:gap-0 gap-16 relative'>
          <div className='lg:min-w-[50%] flex flex-col justify-between'>
            <h2 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
              Unlocking Untapped Markets in Cardiovascular Safety
            </h2>
            <p className='lg:w-[63%] pt-14 font-inter font-normal text-lg text-[#606060] leading-[130%] capitalize'>{`Each of these heart-related conditions could be worth over $500 million in market potential. Tecarfarin is showing strong results compared to older drugs like warfarin, with data showing it keeps patients in the safe range more consistently.`}</p>
          </div>

          <div className='lg:min-w-[58%] relative lg:right-[8%] flex flex-wrap gap-8 justify-end items-start'>
            <div className='sm:w-[48%] bg-white w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-7 border border-black/5 rounded-lg'>
              <Image width={45} height={45} src='/images/cvkd/info8.svg' alt='logo' />
              <h4 className='font-inter font-medium text-2xl text-black'>LVAD</h4>
              <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Granted Orphan Drug designation and trial-ready</p>
            </div>
            <div className='w-full flex flex-wrap max-sm:gap-8 justify-between'>
              <div className='sm:w-[48%] bg-white w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-7 border border-black/5 rounded-lg'>
                <Image width={45} height={45} src='/images/cvkd/info8.svg' alt='logo' />
                <h4 className='font-inter font-medium text-2xl text-black'>MHV</h4>
                <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Application currently pending</p>
              </div>
              <div className='sm:w-[48%] bg-cvkdButton w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-7 border border-black/5 rounded-lg'>
                <Image width={45} height={45} src='/images/cvkd/info8.svg' alt='logo' />
                <h4 className='font-inter font-medium text-2xl text-white'>ESKD + AFib</h4>
                <p className='font-inter font-normal text-lg text-white leading-[150%]'>Granted Orphan Drug and Fast Track status</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='w-full '>
        <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-24 flex md:flex-row flex-col justify-between md:gap-0 gap-16 relative'>
          <div className='md:w-[43%] flex flex-col justify-between'>
            <h2 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
              {`Don’t Miss a Beat`}
            </h2>
            <p className='pt-14 font-inter font-normal text-lg text-[#606060] leading-[130%] capitalize'>{`Be the first to receive updates on CVKD’s clinical milestones, media coverage, and investor news. Alerts are sent directly to your inbox or phone.`}</p>
          </div>

          <div className='lg:w-[43%] md:w-[53%] lg:py-10 flex flex-wrap gap-8 justify-end items-start'>
            <CvkdForm />
          </div>
        </div>
      </div>

      {/* FAQ's */}
      <div className='w-full bg-[#FAFAFA]'>
        <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-20 flex md:flex-row flex-col justify-between md:gap-0 gap-16 relative'>
          <div className='md:w-[43%] flex flex-col justify-between'>
            <h2 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
              {`Investor Questions`}
            </h2>
          </div>

          <div className='md:w-[56%] flex flex-col gap-2 items-start'>
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-black/5"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="faq-toggle flex justify-between items-center w-full p-6 font-inter font-medium xl:text-2xl text-xl text-left leading-[130%]"
                >
                  <span className='w-[90%]'>{faq.question}</span>
                  <span
                    className={`icon transition-transform origin-center duration-300 ${activeIndex === index ? "rotate-180" : ""
                      }`}
                  >
                    {/* {activeIndex === index ? "–" : "+"} */}
                    <Image className='min-w-max flex-none' src="/images/cvkd/chevron-up.svg" width={24} height={24} alt='' />
                  </span>
                </button>
                <div
                  className={`faq-content px-6 text-[#606060] font-inter font-normal text-lg transition-all duration-600 overflow-hidden ${activeIndex === index ? "max-h-screen pb-6" : "max-h-0"
                    }`}
                  style={{ maxHeight: activeIndex === index ? "600px" : "0" }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className='w-full bg-[#111111]'>
        <div className='w-full mx-auto xl:px-0 2xl:px-16 xl:container flex lg:flex-row flex-col justify-between md:gap-0 gap-16 relative'>
          <div className='lg:w-[50%] flex flex-col justify-between'>
            <Image className='w-full' width={720} height={688} src='/images/cvkd/partners_img.jpg' alt='logo' />
          </div>

          <div className='lg:w-[50%] flex flex-col gap-2 p-8 items-start'>
            <h4 className='font-RomanRegular text-white leading-[130%] 2xl:text-[2.4rem] sm:text-4xl text-3xl'>Cadrenal Therapeutics has been featured on prominent platforms including NASDAQ, BusinessWire, Yahoo Finance, and Seeking Alpha.</h4>
            <p className='text-[#9F9F9F] font-inter text-lg pt-10 font-normal 2xl:pr-9'>“With <span className='font-interItalic font-[500] text-[#CFCFCF]'> {`Abbott’s Backing`} </span>  And <span className='font-interItalic font-[500] text-[#CFCFCF]'> A $2B Addressable Market</span>, CVKD Could Become The Go-To Anticoagulant For Thousands Of Ignored Patients.”</p>
            <Image className='mt-auto max-lg:pt-12 w-full' width={894} height={39} src='/images/cvkd/partners.png' alt='logo' />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='w-full bg-[#111111]'>
        <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container flex lg:flex-row flex-col justify-between md:gap-0 gap-16 relative'>
          <div className="w-full flex flex-wrap justify-between py-24 items-start max-lg:gap-y-8">
            <div className="flex flex-col items-start gap-3">
              <Image className='' src="/images/cvkd/Logo.svg" width={149} height={40} alt='Stockverse Logo' />
              <div className="flex items-center gap-2 pt-8">
                <Link href='https://www.facebook.com/profile.php?id=61556580840606#'>
                  <Image className='' src="/images/cvkd/Facebook.svg" width={32} height={32} alt='Stockverse Logo' />
                </Link>
                <Link href='https://www.instagram.com/stockverse.ai?igsh=MWVuZXk4OHc0endyeA%3D%3D'>
                  <Image className='' src="/images/cvkd/Instagram.svg" width={32} height={32} alt='Stockverse Logo' />
                </Link>
                <Link href='https://x.com/StockVerseAI'>
                  <Image className='' src="/images/cvkd/Twitter.svg" width={32} height={32} alt='Stockverse Logo' />
                </Link>
                <Link href='https://www.tiktok.com/@stockverseai'>
                  <Image className='' src="/images/cvkd/Linkedin.svg" width={32} height={32} alt='Stockverse Logo' />
                </Link>
              </div>
            </div>
            <div className="max-sm:w-[46%] flex flex-col items-start gap-y-2">
              <h4 className="text-xl font-inter font-medium text-white">Quick Links</h4>
              <Link className="text-base font-inter font-normal text-[#9F9F9F] hover:underline hover:text-white" href='/'>Home</Link>
              <Link className="text-base font-inter font-normal text-[#9F9F9F] hover:underline hover:text-white" href='/stockverse-gpt'>StockVerse GPT</Link>
              <Link className="text-base font-inter font-normal text-[#9F9F9F] hover:underline hover:text-white" href='/stockpicks'>Stock Picks</Link>
            </div>
            <div className="max-sm:w-[46%] flex flex-col items-start gap-y-2">
              <h4 className="text-xl font-inter font-medium text-white">Market</h4>
              <Link className="text-base font-inter font-normal text-[#9F9F9F] hover:underline hover:text-white" href='/dashboard?view=gainers_losers'>Gainers / Losers</Link>
              <Link className="text-base font-inter font-normal text-[#9F9F9F] hover:underline hover:text-white" href='/dashboard?view=news'>News</Link>
              <Link className="text-base font-inter font-normal text-[#9F9F9F] hover:underline hover:text-white" href='/dashboard?view=ipo_calendar'>IPO Calendar</Link>
            </div>
            <div className="max-sm:w-[46%] flex flex-col items-start gap-y-2">
              <h4 className="text-xl font-inter font-medium text-white">Contact</h4>
              <Link className="text-base font-inter font-normal text-[#9F9F9F] hover:underline hover:text-white" href='mailto:contact@stockverse.com'>Email Us</Link>
              <Link className="text-base font-inter font-normal text-[#9F9F9F] hover:underline hover:text-white" href='/help-center'>Send us Feedback</Link>
            </div>
            <div className='flex'>
              <p className="text-lg font-inter font-normal text-[#9F9F9F] hover:underline hover:text-white">© 2025 Stockverse Kit. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter} tag={"cvkd subscriber popup"} heading={heading} subHeading={subHeading}/>

      {/* Disclaimer */}
      {/* <div className='w-full bg-[#1B1B1B]'>
        <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 py-8 xl:container'>
          <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
            <h4 className="text-3xl font-inter font-medium text-white">Disclaimer</h4>
            <p className="text-base font-inter font-normal text-[#9F9F9F]">
              Effective Date: [August, 2024]
            </p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">{`This website/newsletter is owned, operated, and edited by Relqo Media LLC. Any wording found in this email or disclaimer referencing "I," "we," "our," or "Relqo Media" refers to Relqo Media LLC. This webpage/newsletter is a paid advertisement, not a recommendation or an offer to buy or sell securities. Our business model is to be financially compensated to market and promote small public companies. By reading our newsletter and our website, you agree to the terms of our disclaimer, which are subject to change at any time.`}</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We are not registered or licensed in any jurisdiction to provide investing advice or any advisory or consultancy services, and are therefore unqualified to give investment recommendations. Always conduct your own research and consult with a licensed investment professional before investing. This communication is never to be used as the basis for making investment decisions and is for entertainment purposes only. At most, this communication should serve as a starting point to conduct your own research and consult with a licensed professional regarding the companies profiled and discussed.</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Conduct your own research. Companies with a low price per share are speculative and carry a high degree of risk, so only invest what you can afford to lose. By using our service, you agree not to hold our site, its editors, owners, or staff liable for any damages, financial or otherwise, that may occur due to any action you may take based on the information contained within our newsletters or on our website.</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We do not advise any reader to take any specific action. Losses can be larger than expected if the company experiences issues with liquidity or wide spreads. Our website and newsletter are for entertainment purposes only. Never invest purely based on our alerts. Gains mentioned in our newsletter and on our website may be based on end-of-day or intraday data.</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">{`This publication, its owners, and affiliates may hold positions in the securities mentioned in our alerts, which we may sell at any time without notice to our subscribers, potentially impacting share prices. If we own any shares, we will list the relevant stock information and the number of shares here. Relqo Media LLC's business model is to receive financial compensation to promote public companies.`}</p>
          </div>

          <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
            <h4 className="mt-16 text-xl font-inter font-[400] text-white">Purpose</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">These websites, social media accounts, and all associated content are provided for informational and entertainment purposes only. Relqo Media LLC engages in marketing, advertising, and brand awareness for small-cap public companies. The content, including articles, emails, tweets, and other communications across our platforms, is classified as paid advertisements and should not be considered an offer, recommendation, or solicitation to buy or sell securities. Readers and users should not rely on the information provided as a basis for making investment decisions.</p>
          </div>

          <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
            <h4 className="mt-16 text-xl font-inter font-[400] text-white">Compensation Disclosure</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Relqo Media LLC is compensated for its promotional services by Penzance LLC, and this compensation may include cash payments, stock options, or other financial consideration from the companies we feature. The compensation received directly impacts the content presented on our platforms and creates a significant conflict of interest.</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize"><span className="font-medium text-white">Cadrenal Therapeutics:</span> Relqo Media LLC has been compensated $30,000 per week since August 8, 2024, to run a marketing campaign for Cadrenal Therapeutics. This payment will continue until June 1st, 2025, bringing the total compensation to seven hundred eighty thousand dollars.</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize"><span className="font-medium text-white">NeoVolta Inc:</span> Relqo Media LLC has been compensated four hundred thousand dollars starting November 11, 2024, to run a marketing campaign for NeoVolta Inc. This payment will continue until March 31, 2025. Compensation represents a major conflict of interest in our ability to remain unbiased. Therefore, this communication should be viewed as a commercial advertisement only.</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We have not investigated the background of the hiring third party or parties. The third party, profiled company, or their affiliates may wish to liquidate shares of the profiled company at or near the time you receive this communication, which could negatively impact share prices. Any non-compensated alerts are purely for the purpose of expanding our database for future financially compensated investor relations efforts. Frequently, companies profiled in our alerts may experience a significant increase in volume and share price during investor relations marketing, which may decline as soon as the marketing ceases.</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Our emails may contain forward-looking statements, which are not guaranteed to materialize due to a variety of factors. We do not guarantee the timeliness, accuracy, or completeness of the information on our site or in our newsletters. The information in our email newsletters and on our website is believed to be accurate and correct but has not been independently verified and is not guaranteed.</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">The information is collected from public sources, such as the profiled company’s website and press releases, but is not researched or verified in any way to ensure its accuracy. Furthermore, Relqo Media often employs independent contractor writers who may make errors when researching information and preparing these communications regarding profiled companies. While independent {`writers' `} works are reviewed and edited before publication, errors or omissions may occur. You should assume all information in our communications is incorrect until you verify it yourself and are encouraged never to invest based solely on the information contained in our communications.</p>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">The information in this disclaimer is subject to change at any time without notice.</p>
          </div>

          <div className='flex flex-col gap-2 pb-16 border-b border-white/15'>
            <h4 className="text-3xl font-inter font-medium text-white mt-16">Stockverse Legal Disclaimer</h4>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Earnings & Performance Disclaimer</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Stockverse provides stock market data, research tools, AI-generated insights, and other financial information strictly for educational and informational purposes.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">No Guarantee of Future Performance</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">The past performance of any stock, security, or investment strategy does not guarantee future results. Stock markets are inherently volatile, and returns are unpredictable.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Investment Risks</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Investing in stocks, securities, and financial markets carries substantial risk, including the risk of total loss of capital. Users should perform independent due diligence before making investment decisions.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">No Financial Advice</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Stockverse does not provide financial, investment, tax, or legal advice. Any information, data, or AI-generated insights should not be considered personalized financial advice. Users should consult a licensed financial professional before making any trading or investment decisions.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">AI & Data Disclaimer</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Stockverse integrates artificial intelligence (AI) technology (Stockverse GPT) and third-party financial data providers to generate stock insights and market analysis.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">AI Limitations & Potential Errors</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Stockverse GPT is powered by OpenAI and third-party data sources. While it provides AI-driven stock analysis, it can generate inaccurate, outdated, or misleading information. AI predictions and insights are not a substitute for professional financial analysis.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Delayed & Inaccurate Data</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Stock market data displayed on Stockverse may be delayed, incomplete, or inaccurate due to exchange rules, provider limitations, or data outages. Stockverse does not guarantee the accuracy, reliability, or completeness of any financial data provided.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">User Responsibility</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Users acknowledge that Stockverse GPT and AI-generated insights should not be relied upon for making investment decisions. All trading and financial actions are taken at the {`user's sole`} discretion and risk.</p>
          </div>

          <div className='flex flex-col gap-2 pb-16 border-b border-white/15'>
            <h4 className="mt-16 text-3xl font-inter font-medium text-white">Limitation of Liability</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">By using Stockverse, you acknowledge and agree that:</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">No Liability for Financial Losses</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Stockverse, its owners, affiliates, partners, and employees shall not be liable for any direct, indirect, incidental, consequential, or financial losses incurred due to reliance on data, AI-generated insights, stock recommendations, or market trends displayed on this platform.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">No Warranties</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">{`Stockverse makes no warranties or representations, express or implied, regarding the accuracy, reliability, or completeness of any content provided. All information is provided "as is" and "as available."`}</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Third-Party Data & External Links</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Stockverse may link to third-party content, stock exchanges, brokers, or news sources. We do not endorse, control, or assume responsibility for the accuracy or reliability of external websites or third-party data feeds.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Use at Your Own Risk</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">By using Stockverse, you acknowledge that all investment decisions are made solely at your own risk, and you release Stockverse from any and all liability associated with financial losses.</p>
          </div>

          <div className='flex flex-col gap-2 pb-16 border-b border-white/15'>
            <h4 className="mt-16 text-3xl font-inter font-medium text-white">Governing Law & Dispute Resolution</h4>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Jurisdiction & Applicable Law</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">This Agreement and any disputes arising out of or relating to Stockverse shall be governed by and construed under the laws of the State of Wyoming, without regard to conflict of law principles.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Binding Arbitration</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Any disputes, claims, or controversies arising out of or related to the use of Stockverse shall be exclusively resolved through binding arbitration in Wyoming, in accordance with the rules of the American Arbitration Association (AAA).</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Waiver of Class Action & Jury Trial</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">By using Stockverse, you agree to waive any right to participate in a class action lawsuit or jury trial against Stockverse, its owners, affiliates, and representatives.</p>
          </div>

          <div className='flex flex-col gap-2 pb-16 border-b border-white/15'>
            <h4 className="mt-16 text-3xl font-inter font-medium text-white">Intellectual Property Rights</h4>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Ownership of Content</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">All content, design elements, trademarks, stock analysis, AI-generated insights, and proprietary data displayed on Stockverse are owned by Stockverse Holdings LLC and protected under U.S. and international copyright and intellectual property laws.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">Restrictions on Use</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Users may not copy, modify, distribute, sell, or republish any Stockverse content, AI-generated insights, or proprietary tools without explicit written permission from Stockverse Holdings LLC.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">AI-Generated Content & Licensing</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">AI-generated insights, trade signals, and stock analysis provided by Stockverse GPT are proprietary and cannot be resold, republished, or distributed for commercial use without express authorization.</p>

            <h4 className="mt-8 text-xl font-inter font-[400] text-white">DMCA & Copyright Violations</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Any unauthorized reproduction or use of Stockverse content may result in legal action under the Digital Millennium Copyright Act (DMCA) or applicable intellectual property laws.</p>
          </div>

          <div className='flex flex-col gap-2 pb-16 border-b border-white/15'>
            <h4 className="mt-16 text-3xl font-inter font-medium text-white">Acceptance of Terms</h4>
            <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">By accessing and using Stockverse, you acknowledge that you have read, understood, and agreed to this disclaimer. If you do not agree with any part of this disclaimer, you must discontinue use of this platform immediately.</p>
          </div>

          <p className="mt-16 text-xl font-inter font-[400] text-white capitalize">For any legal inquiries or compliance concerns, please contact:</p>
          
          <div className='flex gap-6 pt-4 flex-wrap'>
            <a className="text-base flex gap-2 font-inter font-normal text-[#CFCFCF]/85 hover:underline" href="mailto:support@stockverse.com">
              <Image width={24} height={24} src='/images/cvkd/mail.svg' alt='logo'/>
              support@stockverse.com
            </a>
            <a className="text-base flex gap-2 font-inter font-normal text-[#CFCFCF]/85 hover:underline" href="https://stockverse.com">
              <Image width={24} height={24} src='/images/cvkd/globe.svg' alt='logo'/>
              Stockverse.com
            </a>
          </div>
        </div>
      </div> */}

      <Disclaimer/>
    </div>
  );
}

export default Cadrenal;