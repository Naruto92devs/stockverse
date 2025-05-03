'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import HeroSlider from './components/HeroSilder';

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

  return (
    <div className='w-full'>
      {/* Navbar */}
      <nav className="w-full border-b-[1.5px] border-[#111111]/15 bg-white">
        <div className='w-full mx-auto px-3 xl:px-0 2xl:px-28 xl:container flex items-center justify-between py-2 relative select-none'>
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
      <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container flex md:flex-row flex-col justify-between sm:py-16 py-8 relative select-none'>
        <div className='md:w-[60%] w-full'>
          <h1 className='font-RomanRegular text-black xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
            Meet the Company Solving the Anticoagulation Crisis in Rare
            <span className='italic'> Heart Conditions</span>
          </h1>
        </div>
        <div className='lg:w-[32.5%] md:w-[35%] sm:w-[60%] w-full pt-4 flex flex-col items-start xl:gap-12 gap-6'>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[130%]'>Cadrenal Therapeutics <span className='font-medium italic text-[#383838]'> (NASDAQ: CVKD) </span> Is Redefining Cardiovascular Safety With The Only Drug Designed Specifically For Patients With LVAD, ESKD + AFib, And MHV.</p>
          <Link href='/' className='px-5 py-3 rounded-full flex items-center gap-2 font-inter text-white bg-cvkdButton font-medium text-base'>
            Why CVKD 
            <Image width={24} height={24} src='/images/arrow-up-right.svg' alt='arrow'/>
          </Link>
        </div>
      </div>
      {/* HeroSlider */}
      <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container sm:py-16 py-8 relative select-none'>
        <HeroSlider/>
      </div>
    </div>
  );
}

export default Cadrenal;