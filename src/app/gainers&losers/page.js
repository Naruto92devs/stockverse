'use client';
import React, { useState } from 'react';
import Gainers_Losers from "@/components/Gainers_Losers";

export default function GainersLosersPage() {
    const [filter, setFilter] = useState('gainer-stocks'); // Default filter

    return (
        <section className="w-full">
            <div className="px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-wrap gap-1 items-start justify-between">
                
                {/* Buttons for selecting stock type */}
                <div className="w-full flex justify-center gap-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded ${filter === 'gainer-stocks' ? 'bg-primaryText/10 text-white' : 'bg-gray-200'}`}
                        onClick={() => setFilter('gainer-stocks')}
                    >
                        Top Gainers
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${filter === 'loser-stocks' ? 'bg-primaryText/10 text-white' : 'bg-gray-200'}`}
                        onClick={() => setFilter('loser-stocks')}
                    >
                        Top Losers
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${filter === 'active-stocks' ? 'bg-primaryText/10 text-white' : 'bg-gray-200'}`}
                        onClick={() => setFilter('active-stocks')}
                    >
                        Most Active
                    </button>
                </div>

                {/* Display stock data based on selected filter */}
                <div className="w-[100%] max-lg:w-[48%] max-sm:w-full">
                    <Gainers_Losers stocksType={filter} />
                </div>
            </div>
        </section>
    );
}