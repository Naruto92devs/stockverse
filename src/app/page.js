import StocksList from '../components/StocksList.js';
import React from 'react';
import User from '@/components/User.js';

export default function Home() {
  return (
    <div className="hero pt-16 max-sm:pt-6 pb-0 w-full bg-heroBg bg-no-repeat bg-cover bg-left-bottom mb-[-20px]">
      <div className="content px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center">
        <h1 className="w-[70%] max-2xl:w-[80%] font-sansBold max-sm:w-[100%] text-[70px] max-xl:text-[5.2vw] max-sm:text-[10vw] leading-[120%] font-bold text-primaryHeading text-center">One Stop Shop Everything Stocks<span className="text-secondaryHeading">  - Stockverse</span></h1>
        <p className="text-2xl w-[50%] max-xl:w-[70%] max-sm:w-[90%] leading-[120%] max-xl:text-[2vw] max-sm:text-[4vw] text-center text-secondaryHeading">Discover real-time stock data, personalized insights, and AI-driven recommendations tailored to your trading style.</p>
          <StocksList/> 
          <User/> 
      </div>
    </div>
  );
}