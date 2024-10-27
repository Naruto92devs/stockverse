'use client';
import React, { useState } from 'react';
import Level2 from '@/components/Level2';
import RelativeSearchBar from '@/components/RelativeSearchBar';

export default function Level_2() {

    // Step 1: Create a state for the symbol
    const [symbol, setSymbol] = useState('aapl');

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="py-16 max-sm:py-10 w-full bg-newsBg bg-no-repeat bg-cover bg-right-bottom">
        <div className="lg:px-[15%] text-center max-md:py-0 py-10 px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center">
          <h1 className="text-secondaryHeading max-sm:text-3xl text-4xl font-sansSemibold">Real-Time Market Depth for Informed Trading Decisions</h1>
          <p className="text-base max-sm:text-sm text-secondaryHeading">Unlock a new level of insight with real-time Level 2 data, offering a detailed view of market activity beyond standard quotes. Track bid and ask prices, order book volumes, and identify patterns that reveal buyer and seller interest. Stay ahead with in-depth market transparency and make more informed trading decisions with the granular data trusted by experienced investors.</p>
        </div>
      </div>
      <div className="w-full p-6 max-sm:px-3 xl:container mx-auto flex flex-col items-center max-lg:items-start gap-4">
        {/* Step 2: Pass symbol and setSymbol to RelativeSearchBar */}
        <RelativeSearchBar symbol={symbol} setSymbol={setSymbol} />
        
        {/* Step 4: Pass symbol to Level2 */}
        <Level2 symbol={symbol} />
      </div>
    </div>
  );
}