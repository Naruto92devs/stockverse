'use client';
import React, { useState } from 'react';
import Gainers_Losers from "@/components/Gainers_Losers";
import Gainers_Losers1 from '@/components/newgainer';

export default function GainersLosersPage() {
    const [filter, setFilter] = useState('gainer-stocks'); // Default filter

    return (
        <section className="w-full">
            <div className="py-16 max-sm:py-10 w-full bg-newsBg bg-no-repeat bg-cover bg-right-bottom">
                <div className="lg:pr-[25%] max-md:py-0 py-10 px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-start">
                <h1 className="text-secondaryHeading max-sm:text-3xl text-4xl font-sansSemibold"><span className="text-article">Market Movers:</span> Gainers, Losers & Actives Stocks</h1>
                <p className="text-base max-sm:text-sm text-secondaryHeading">Track the stocks making headlines today. Discover the top gainers and losers, and see which stocks are trading at the highest volumes. Stay ahead with quick insights on the market’s biggest movers, all in one place.</p>
                </div>
            </div>
            <div className="py-6 px-6 max-lg:px-0 mx-auto xl:container gap-y-4 flex flex-wrap items-start justify-between">
                <p className="text-xl max-lg:pl-3 text-primaryText font-sansSemibold">Filters:</p>
                {/* Buttons for selecting stock type */}
                <div className="w-full flex justify-start max-lg:px-3 gap-2 overflow-x-auto">
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'gainer-stocks' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => setFilter('gainer-stocks')}
                    >
                        Top Gainers
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'loser-stocks' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => setFilter('loser-stocks')}
                    >
                        Top Losers
                    </button>
                    <button
                        className={`min-w-max px-3 py-1.5 rounded hover:bg-article hover:text-mobNavLink ${filter === 'active-stocks' ? 'bg-article hover:bg-article text-mobNavLink' : 'text-primaryText bg-primaryText/10'}`}
                        onClick={() => setFilter('active-stocks')}
                    >
                        Most Active
                    </button>
                </div>

                {/* Display stock data based on selected filter */}
                <div className="w-full flex flex-col gap-y-4">
                    {/* <Gainers_Losers stocksType={filter} /> */}
                    <Gainers_Losers1 stocksType={filter} />
                </div>
            </div>
        </section>
    );
}