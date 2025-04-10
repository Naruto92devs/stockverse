'use client';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function UpgradePopup ({upgrade, setUpgrade, updateUrl, currentView, fixed}) {

  const handleUpgradePopupClose = (symbol, view) => {
    if (currentView === 'trades' || currentView === 'financials') {
      updateUrl(symbol, view); // Example: Navigate with `symbol` and a specific view
      setUpgrade(false);
    } else {
      setUpgrade(false);
    }
  };

  return (
    <div className={`${upgrade ? 'visible' : 'hidden'} fixed z-20 top-0 left-0 bottom-0 right-0 p-4 w-full flex bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center h-full max-h-screen overflow-y-scroll scrollbar-hide`}>
      <div className={`md:w-[750px] relative w-full min-h-max flex sm:flex-row flex-col items-start bg-primaryBg rounded-xl overflow-hidden`}>
        <Image className='flex-none max-sm:hidden' width={266} height={500} src='/images/popup_side_image.jpg' alt='img' />
        <Image className='sm:hidden pt-4' src="/images/stockverseLogo.png" width={200} height={57.20} alt='Stockverse Logo' />
        <div className={`flex-grow h-full p-4 sm:gap-y-2 gap-y-2 flex flex-col`}>
          <Image className={`${fixed ? 'hidden' : 'visible'} cursor-pointer absolute top-2 right-2`} width={32} height={32} onClick={() => handleUpgradePopupClose(undefined, 'chart')} src='/images/cross.svg' alt='close' />
          <h4 className="text-4xl max-md:text-2xl font-sansMedium text-primaryTextColor">Upgrade Your Plan</h4>
          <p className="border-b border-black/5 py-3 text-lg leading-[120%] font-sansRegular max-xl:text-base max-sm:text-sm text-[#393939]">
            Unlock the full potential of our platform with an upgraded plan! Enjoy exclusive features
          </p>
          <p className='font-sansMedium text-xl py-4'><span className='text-primaryMain'>Everything</span> on Basic plan, plus</p>
          <p className='flex items-center gap-2 font-sansRegular text-lg'>
            <Image width={20} height={20} src='/images/check.svg'/>
            Add Unlimited Stocks to Watchlish
          </p>
          <p className='flex items-center gap-2 font-sansRegular text-lg'>
            <Image width={20} height={20} src='/images/check.svg'/>
            Unlimited Access to StockverseGPT
          </p>
          <p className='flex items-center gap-2 font-sansRegular text-lg'>
            <Image width={20} height={20} src='/images/check.svg'/>
            Unlimited Access to Trades
          </p>
          <p className='flex items-center gap-2 font-sansRegular text-lg'>
            <Image width={20} height={20} src='/images/check.svg'/>
            Unlimited Access to Financials
          </p>
          <Link href='/pricing' className="mt-auto w-full text-center bg-primaryMain text-base font-sansMedium text-white py-2 rounded-lg hover:bg-black transition duration-300">
            Upgrade my plan!
          </Link>
          <p className={`${fixed ? 'visible' : 'hidden'} text-black font-sansRegular text-sm`}>⚠️ You’ve reached the limit of your free trial on StockverseGPT. Your allowance of 5 questions will reset upon your next subscription renewal. To continue using StockverseGPT without interruption, please consider upgrading to our Premium plan.</p>
        </div>
      </div>
    </div>
  );
}