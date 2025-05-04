'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import HeroSlider from './components/HeroSilder';
import InvestorSlider from './components/InvestorSlider';
import CvkdForm from './components/cvkdForm';

const Cadrenal = () => {

  const [userVisible, setUserVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state
  const token = Cookies.get('authToken');

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
        "Current therapies result in uncontrolled bleeding, stroke, and death — and the issue remains unaddressed",
    },
    {
      question: "Why is Tecarfarin different from warfarin or Eliquis?",
      answer:
        "Tecarfarin is different from warfarin and Eliquis because it's designed to be more predictable and safer, with fewer drug and food interactions, and is metabolized differently—potentially making it a better option for patients with variable responses to traditional anticoagulants.",
    },
    {
      question: "How is Abbott involved?",
      answer:
        "Abbott is involved by providing the anticoagulation monitoring technology used in the clinical trials of Tecarfarin, helping ensure accurate and consistent dosing.",
    },
    {
      question: "Why is the unmet need so large?",
      answer:
        "The unmet need is so large because millions of patients can't safely or effectively use current anticoagulants like warfarin or Eliquis due to risks of bleeding, drug interactions, or inconsistent response—leaving them without optimal treatment options.",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='w-full'>
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
      <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container flex md:flex-row flex-col justify-between sm:py-16 py-8 relative'>
        <div className='md:w-[60%] w-full'>
          <h1 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
            Meet the Company Solving the Anticoagulation Crisis in Rare
            <span className='font-RomanItalic'> Heart Conditions</span>
          </h1>
        </div>
        <div className='lg:w-[32.5%] md:w-[35%] sm:w-[60%] w-full pt-4 flex flex-col items-start xl:gap-12 gap-6'>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[130%]'>Cadrenal Therapeutics <span className='font-medium italic text-[#383838]'> (NASDAQ: CVKD) </span> Is Redefining Cardiovascular Safety With The Only Drug Designed Specifically For Patients With LVAD, ESKD + AFib, And MHV.</p>
          <Link href='/' className='px-5 py-3 rounded-full flex items-center gap-2 font-inter text-white bg-cvkdButton font-medium text-base'>
            Why CVKD
            <Image width={24} height={24} src='/images/arrow-up-right.svg' alt='arrow' />
          </Link>
        </div>
      </div>

      {/* HeroSlider */}
      <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container sm:py-16 py-8 relative'>
        <HeroSlider />
      </div>

      {/* CVKD Leader */}
      <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-2 pb-16 flex md:flex-row flex-col items-start justify-between max-md:gap-18 relative'>
        <div className='md:w-[49%]'>
          <h2 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
            From Refugee to Nasdaq: Meet the <span className='font-RomanItalic'> Leader </span> Behind <span className='font-RomanItalic'> CVKD </span>
          </h2>
          <p className='pt-14 font-inter font-normal text-lg text-[#606060] leading-[130%] capitalize'>{`Quang X. Pham’s Journey Fuels Cadrenal’s Mission to Serve the Most Overlooked Patients in Cardiology`}</p>
        </div>

        <div className='md:w-[49%]'>
          <div className='flex flex-wrap items-center gap-4 pt-5'>
            <Link href='/' className='px-5 py-3 rounded-full flex items-center gap-2 font-inter text-white bg-cvkdButton font-medium text-base'>
              Learn About Quang X. Pham
              <Image width={24} height={24} src='/images/arrow-up-right.svg' alt='arrow' />
            </Link>
            <Link href='/' className='px-5 py-3 rounded-full flex items-center gap-2 font-inter text-black bg-white font-medium border border-[#D0D5DD] text-base'>
              {`Get the Book – Underdog Nation`}
              <Image className='invert' width={24} height={24} src='/images/arrow-up-right.svg' alt='arrow' />
            </Link>
          </div>
          <h3 className='font-RomanRegular text-[#1B1B1B] text-3xl pt-14'>Meet Our Founder</h3>
          <p className='pt-4 font-inter font-normal text-lg text-[#606060] leading-[150%] capitalize'>{`Quang X. Pham didn’t take the conventional route to Wall Street. He fled Vietnam as a war refugee, became the first Vietnamese American aviator in the U.S. Marine Corps, broke records in biotech sales, and took Cadrenal Therapeutics public on Nasdaq.`}</p>
          <p className='pt-6 font-inter font-normal text-lg text-[#606060] leading-[150%] capitalize'>{`Now, with Underdog Nation (published by Forbes Books), Pham shares the ER Approach™ — Effort + Results — that powers his leadership and Cadrenal’s bold mission to transform cardiovascular safety for neglected patient groups.`}</p>
          <p className='pt-12 font-interItalic font-normal text-2xl text-[#606060] leading-[150%] capitalize'>“Success {`isn’t`} reserved for the privileged — it <span className='font-medium text-[#383838]'> belongs </span> to those who <span className='font-medium text-[#383838]'> fight </span> for it.”</p>
          <p className='pt-6 font-inter font-normal text-lg text-[#606060] leading-[150%] capitalize'> — <span className='font-interItalic font-medium text-[#383838]'> Quang X. Pham, </span> CEO, Cadrenal Therapeutics (CVKD)</p>
        </div>
      </div>

      {/* Investors */}
      <div className='w-full bg-[#111111]'>
        <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-24 relative'>
          <div className='w-full flex md:flex-row flex-col items-start justify-between gap-4'>
            <p className='font-inter font-normal md:text-2xl text-lg text-white leading-[150%]'>Why Investors Are Watching</p>
            <h4 className='md:w-[55%] w-full font-RomanRegular text-white xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[120%]'>Investors are closely watching CVKD for several reasons</h4>
          </div>
          <InvestorSlider />
        </div>
      </div>

      {/* Key Info */}
      <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container flex flex-col items-center gap-12 py-24 relative'>
        <h2 className='text-center font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
          Key information about CVKD
        </h2>
        <div className='w-full flex flex-wrap justify-between gap-y-4'>
          <div className='lg:w-[24%] md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info1.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Ticker</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>NASDAQ: CVKD</p>
          </div>
          <div className='lg:w-[24%] md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info2.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Lead Asset</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Tecarfarin (oral VKA)</p>
          </div>
          <div className='lg:w-[24%] md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info3.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Primary Indication</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>LVAD Anticoagulation</p>
          </div>
          <div className='lg:w-[24%] md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info4.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>FDA Status</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Fast Track and Orphan Drug (2x)</p>
          </div>
          <div className='md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info5.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Market Size</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>More than $2 billion combined peak potential across three indications</p>
          </div>
          <div className='md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info6.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Clinical Stage</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'> Late-stage, Phase 3-ready</p>
          </div>
          <div className='md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info7.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Strategic Partner</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Abbott, contributing to trial design, site access, and awareness</p>
          </div>
        </div>
      </div>

      {/* Why CVKD */}
      <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container flex flex-col items-center gap-12 py-12 relative'>
        <h2 className='text-center font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
          Why CVKD is Different
        </h2>
        <div className='w-full flex flex-wrap justify-between gap-y-4'>
          <div className='lg:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info1.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Fewer Drug Interactions</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Better metabolism by bypassing the CYP450 pathway, resulting in fewer drug interactions</p>
          </div>
          <div className='lg:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info2.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Renal-Friendly Solution</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Safer use in patients with renal failure</p>
          </div>
          <div className='lg:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info4.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Tailored for Rare Needs</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>It is the only late-stage anticoagulant in development for LVADs and rare cardiovascular indications</p>
          </div>
        </div>
      </div>

      {/* Big Pharma */}
      <div className='w-full bg-[#FAFAFA]'>
        <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-24 flex lg:flex-row flex-col items-start justify-between lg:gap-0 gap-16 relative'>
          <div className='lg:w-[49%]'>
            <h2 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
              Patients With Implanted Cardiac Devices Are Left Behind by <span className='font-RomanItalic'> Big Pharma </span>
            </h2>
            <p className='pt-14 font-inter font-normal text-lg text-[#606060] leading-[130%] capitalize'>{`Challenges faced by patients include:`}</p>
          </div>

          <div className='lg:w-[49%] '>
            <div className="flex max-sm:flex-col items-start justify-between gap-2 gap-6 px-6 py-6 border-b border-[#111111]/15">
              <div className='sm:w-[48%] flex items-center gap-6'>
                <p className='font-inter font-normal text-[#8D8D8D] text-base leading-[150%]'>(01)</p>
                <h4 className='font-inter font-medium text-2xl text-[#111111] leading-[150%]'>{`DOACs Don’t Work`}</h4>
              </div>
              <h4 className='sm:w-[48%] font-inter font-normal text-lg text-[#606060] leading-[150%]'>{`LVAD patients are not covered by DOACs, and warfarin is ineffective`}</h4>
            </div>
            <div className="flex max-sm:flex-col items-start justify-between gap-2 gap-6 px-6 py-6 border-b border-[#111111]/15">
              <div className='sm:w-[48%] flex items-center gap-6'>
                <p className='font-inter font-normal text-[#8D8D8D] text-base leading-[150%]'>(02)</p>
                <h4 className='font-inter font-medium text-2xl text-[#111111] leading-[150%]'>{`Kidney Patients Left Out`}</h4>
              </div>
              <h4 className='sm:w-[48%] font-inter font-normal text-lg text-[#606060] leading-[150%]'>{`Over 70% of kidney failure patients with AFib receive no anticoagulation due to safety concerns`}</h4>
            </div>
            <div className="flex max-sm:flex-col items-start justify-between gap-2 gap-6 px-6 py-6 border-b border-[#111111]/15">
              <div className='sm:w-[48%] flex items-center gap-6'>
                <p className='font-inter font-normal text-[#8D8D8D] text-base leading-[150%]'>(03)</p>
                <h4 className='font-inter font-medium text-2xl text-[#111111] leading-[150%]'>{`No Options for MHV`}</h4>
              </div>
              <h4 className='sm:w-[48%] font-inter font-normal text-lg text-[#606060] leading-[150%]'>{`There are no approved therapies beyond warfarin for mechanical heart valves`}</h4>
            </div>
            <div className="flex max-sm:flex-col items-start justify-between gap-2 gap-6 px-6 py-6 border-b border-[#111111]/15">
              <div className='sm:w-[48%] flex items-center gap-6'>
                <p className='font-inter font-normal text-[#8D8D8D] text-base leading-[150%]'>(04)</p>
                <h4 className='font-inter font-medium text-2xl text-[#111111] leading-[150%]'>{`Bleeding Still Unsolved`}</h4>
              </div>
              <h4 className='sm:w-[48%] font-inter font-normal text-lg text-[#606060] leading-[150%]'>{`Current therapies result in uncontrolled bleeding, stroke, and death — and the issue remains unaddressed`}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Unlocking Safety */}
      <div className='w-full bg-cvkdBg bg-no-repeat bg-cover bg-bottom-left'>
        <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-24 flex lg:flex-row flex-col justify-between lg:gap-0 gap-16 relative'>
          <div className='lg:min-w-[50%] flex flex-col justify-between'>
            <h2 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
              Unlocking Untapped Markets in Cardiovascular Safety
            </h2>
            <p className='lg:w-[63%] pt-14 font-inter font-normal text-lg text-[#606060] leading-[130%] capitalize'>{`The market potential for each of these indications exceeds $500 million. Supporting visuals include a comparison chart of Tecarfarin versus warfarin, and a bar graph illustrating TTR performance.`}</p>
          </div>

          <div className='lg:min-w-[58%] relative lg:right-[8%] flex flex-wrap gap-8 justify-end items-start'>
            <div className='sm:w-[48%] bg-white w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-7 border border-black/5 rounded-lg'>
              <Image width={45} height={45} src='/images/cvkd/info8.svg' alt='logo' />
              <h4 className='font-inter font-medium text-2xl text-black'>LAVD</h4>
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
            <Image className='w-full' width={720} height={688} src='/images/cvkd/partners_img.jpg' alt='logo'/>
          </div>

          <div className='lg:w-[50%] flex flex-col gap-2 p-8 items-start'>
            <h4 className='font-RomanRegular text-white leading-[130%] 2xl:text-[2.4rem] sm:text-4xl text-3xl'>Cadrenal Therapeutics has been featured on prominent platforms including NASDAQ, BusinessWire, Yahoo Finance, and Seeking Alpha.</h4>
            <p className='text-[#9F9F9F] font-inter text-lg pt-10 font-normal 2xl:pr-9'>“With <span className='font-interItalic font-[500] text-[#CFCFCF]'> {`Abbott’s Backing`} </span>  And <span className='font-interItalic font-[500] text-[#CFCFCF]'> A $2B Addressable Market</span>, CVKD Could Become The Go-To Anticoagulant For Thousands Of Ignored Patients.”</p>
            <Image className='mt-auto max-lg:pt-12 w-full' width={894} height={39} src='/images/cvkd/partners.png' alt='logo'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadrenal;