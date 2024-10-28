'use client';
import React, { useState } from 'react';
import Financials from '@/components/Financials';
import RelativeSearchBar from '@/components/RelativeSearchBar';

export default function Financials_page() {

    // Step 1: Create a state for the symbol
    const [symbol, setSymbol] = useState('AAPL');

return (
<div className="w-full h-full flex flex-col items-center">
    <div className="py-16 max-sm:py-10 w-full bg-newsBg bg-no-repeat bg-cover bg-right-bottom">
    <div className="lg:px-[15%] text-center max-md:py-0 py-10 px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center">
        <h1 className="text-secondaryHeading max-sm:text-3xl text-4xl font-sansSemibold">Latest Financial Performance Overview</h1>
        <p className="text-base max-sm:text-sm text-secondaryHeading">Explore key financial indicators and comprehensive metrics that showcase the company’s financial health and growth trajectory. From revenue streams and profitability to operating expenses and cash flows, this section provides a detailed view of essential financial statements, enabling investors and stakeholders to gain insights into the company’s fiscal strength and future outlook.</p>
    </div>
    </div>
    <div className="w-full p-6 max-sm:px-0 xl:container mx-auto flex flex-col items-center max-lg:items-start gap-4">
    {/* Step 2: Pass symbol and setSymbol to RelativeSearchBar */}
    <RelativeSearchBar symbol={symbol} setSymbol={setSymbol} />
    
    {/* Step 4: Pass symbol to Level2 */}
    <Financials symbol={symbol} />
    </div>
</div>
);
}