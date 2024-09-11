'use client';
import React, { useState, useEffect } from 'react';
import ArticleFallbackUI from './ArticleFallbackUI';
import Link from 'next/link';

// Define available topics for filters
const topics = [
{ label: 'Blockchain', value: 'blockchain' },
{ label: 'Earnings', value: 'earnings' },
{ label: 'IPO', value: 'ipo' },
{ label: 'Mergers & Acquisitions', value: 'mergers_and_acquisitions' },
{ label: 'Financial Markets', value: 'financial_markets' },
{ label: 'Economy - Fiscal Policy', value: 'economy_fiscal' },
{ label: 'Economy - Monetary Policy', value: 'economy_monetary' },
{ label: 'Economy - Macro/Overall', value: 'economy_macro' },
{ label: 'Energy & Transportation', value: 'energy_transportation' },
{ label: 'Finance', value: 'finance' },
{ label: 'Life Sciences', value: 'life_sciences' },
{ label: 'Manufacturing', value: 'manufacturing' },
{ label: 'Real Estate & Construction', value: 'real_estate' },
{ label: 'Retail & Wholesale', value: 'retail_wholesale' },
{ label: 'Technology', value: 'technology' },
];

// Define available sort options
const sortOptions = [
{ label: 'Latest', value: 'LATEST' },
{ label: 'Earliest', value: 'EARLIEST' },
{ label: 'Relevance', value: 'RELEVANCE' },
];

// Define available limit options
const limitOptions = [
{ label: '50', value: 50 },
{ label: '1000', value: 1000 },
];

export default function StockNews() {
const [news, setNews] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [topic, setTopic] = useState(''); // Unset by default
const [sort, setSort] = useState(''); // Unset by default
const [limit, setLimit] = useState(''); // Unset by default
const [visibleNewsCount, setVisibleNewsCount] = useState(20); // To control "Show More"

// Fetch news data based on selected topic, sort, and limit
const fetchNews = async (selectedTopic = '', selectedSort = '', selectedLimit = '') => {
setLoading(true);
setError(null);
try {
    const url = `https://api.stockverse.ai/stock-news?${
    selectedLimit ? `limit=${selectedLimit}` : ''
    }${selectedSort ? `&sort=${selectedSort}` : ''}${selectedTopic ? `&topics=${selectedTopic}` : ''}`;

    const response = await fetch(url);
    const data = await response.json();
    setNews(data.feed); // Set the news feed from the response
    setLoading(false);
} catch (err) {
    setError(
    <section className="w-[100%] h-[50dvh] flex flex-col gap-1 items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-primaryButtonBg">Oops, something went wrong!</h1>
        <p className="text-base text-primaryText">we were not able to find what you were looking for.</p>
        <p className="text-base text-primaryText">Please try again!</p>
    </section>);
    setLoading(false);
}
};

// Fetch news when the component mounts or when the filters change
useEffect(() => {
fetchNews(topic, sort, limit);
}, [topic, sort, limit]);

// Handle filter changes
const handleTopicChange = (newTopic) => {
setTopic(newTopic);
setVisibleNewsCount(50); // Reset visible news count on topic change
};

const handleSortChange = (newSort) => {
setSort(newSort);
};

const handleLimitChange = (newLimit) => {
setLimit(newLimit);
};

// Handle "Show More" button click
const handleShowMore = () => {
setVisibleNewsCount((prevCount) => prevCount + 50); // Show 50 more articles
};

return (
<div className="mx-auto p-6 max-sm:px-3 xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center">
    <div className="filter-dropdowns w-full flex max-sm:flex-col max-sm:items-start items-center gap-4 justify-between mb-6">
        {/* Heading Filter */}
        <div className="flex items-start gap-2">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.23564 8.92736C8.71822 9.30653 9 9.88628 9 10.5V17.1761L11 16.4724V10.5C11 9.88628 11.2818 9.30653 11.7644 8.92736L17.6178 4.32821C17.8591 4.13863 18 3.84875 18 3.54189V2H2V3.54189C2 3.84876 2.14089 4.13863 2.38218 4.32821L8.23564 8.92736ZM18.8535 5.90085L13 10.5V17.1806C13 17.605 12.7322 17.9831 12.3319 18.124L8.33191 19.5314C7.68145 19.7602 7 19.2776 7 18.5881V10.5L1.14654 5.90085C0.422664 5.33209 0 4.46248 0 3.54189V2C0 0.89543 0.895431 0 2 0H18C19.1046 0 20 0.895431 20 2V3.54189C20 4.46248 19.5773 5.33209 18.8535 5.90085Z" fill="currentColor"/>
            </svg>
            <p className="text-lg text-primaryText font-sansMedium">Filters:</p>
        </div>
    {/* Filter dropdowns */}
        <div className="flex item-center gap-x-4 max-sm:gap-0 max-sm:justify-between max-sm:w-[100%]">
            {/* Topic Filter */}
            <div className="cursor-pointer max-sm:w-[36%] rounded-full px-4 bg-primaryText/10 flex gap-x-2 items-center w-[140px]">
                <select
                className="cursor-pointer max-sm:text-sm border-none outline-none bg-background/0 text-base appearance-none w-full"
                value={topic}
                onChange={(e) => handleTopicChange(e.target.value)}
                >
                <option value="">All Topics</option>
                {topics.map((t) => (
                    <option key={t.value} value={t.value}>
                    {t.label}
                    </option>
                ))}
                </select>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.0252 5.18697C12.363 4.94614 11.637 4.94614 10.9748 5.18697L3.92618 7.75009L10.9748 10.3132C11.637 10.554 12.363 10.554 13.0252 10.3132L20.0738 7.7501L13.0252 5.18697ZM10.2913 3.30738C11.3951 2.906 12.6049 2.906 13.7087 3.30738L20.7573 5.87051C22.5127 6.50882 22.5127 8.99137 20.7573 9.62968L13.7087 12.1928C12.6049 12.5942 11.3951 12.5942 10.2913 12.1928L3.24269 9.62968C1.48733 8.99137 1.48734 6.50882 3.24269 5.87051L10.2913 3.30738Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.05779 12.3948C2.24281 11.8744 2.81464 11.6025 3.33501 11.7876L11.33 14.6302C11.7634 14.7843 12.2366 14.7843 12.67 14.6302L20.665 11.7876C21.1854 11.6025 21.7572 11.8744 21.9422 12.3948C22.1272 12.9151 21.8554 13.487 21.335 13.672L13.34 16.5146C12.4733 16.8228 11.5267 16.8228 10.66 16.5146L2.66499 13.672C2.14462 13.487 1.87277 12.9151 2.05779 12.3948Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.05779 16.6448C2.24281 16.1244 2.81464 15.8525 3.33501 16.0376L11.33 18.8802C11.7634 19.0343 12.2366 19.0343 12.67 18.8802L20.665 16.0376C21.1854 15.8525 21.7572 16.1244 21.9422 16.6448C22.1272 17.1651 21.8554 17.737 21.335 17.922L13.34 20.7646C12.4733 21.0728 11.5267 21.0728 10.66 20.7646L2.66499 17.922C2.14462 17.737 1.87277 17.1651 2.05779 16.6448Z" fill="currentColor"/>
                </svg>
            </div>

            {/* Sort Filter */}
            <div className="cursor-pointer max-sm:w-[31%] rounded-full px-4 bg-primaryText/10 flex gap-x-2 items-center w-[115px]">
                <select
                className="cursor-pointer max-sm:text-sm border-none outline-none bg-background/0 text-base appearance-none w-full"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                >
                <option value="">Sort by</option>
                {sortOptions.map((s) => (
                    <option key={s.value} value={s.value}>
                    {s.label}
                    </option>
                ))}
                </select>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.70711 9.20696C3.31658 9.59748 2.68342 9.59748 2.29289 9.20696C1.90237 8.81643 1.90237 8.18327 2.29289 7.79274L5.58579 4.49985C6.36684 3.7188 7.63317 3.7188 8.41421 4.49985L11.7071 7.79274C12.0976 8.18327 12.0976 8.81643 11.7071 9.20696C11.3166 9.59748 10.6834 9.59748 10.2929 9.20696L8 6.91406V18.9998C8 19.5521 7.55228 19.9998 7 19.9998C6.44772 19.9998 6 19.5521 6 18.9998V6.91406L3.70711 9.20696Z" fill="currentColor"/>
                <path d="M18 5C18 4.44772 17.5523 4 17 4C16.4477 4 16 4.44772 16 5V17.0858L13.7071 14.7929C13.3166 14.4024 12.6834 14.4024 12.2929 14.7929C11.9024 15.1834 11.9024 15.8166 12.2929 16.2071L15.5858 19.5C16.3668 20.281 17.6332 20.281 18.4142 19.5L21.7071 16.2071C22.0976 15.8166 22.0976 15.1834 21.7071 14.7929C21.3166 14.4024 20.6834 14.4024 20.2929 14.7929L18 17.0858V5Z" fill="currentColor"/>
                </svg>
            </div>

            {/* Limit Filter */}
            <div className="cursor-pointer max-sm:w-[27%] rounded-full px-4 bg-primaryText/10 flex gap-x-2 items-center w-[95px]">
                <select
                className="cursor-pointer max-sm:text-sm border-none outline-none bg-background/0 text-base appearance-none w-full"
                value={limit}
                onChange={(e) => handleLimitChange(e.target.value)}
                >
                <option value="">Limit</option>
                {limitOptions.map((l) => (
                    <option key={l.value} value={l.value}>
                    {l.label}
                    </option>
                ))}
                </select>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.4234 9.44756V7.30056C16.4234 4.78756 14.3854 2.74956 11.8724 2.74956C9.35944 2.73856 7.31344 4.76656 7.30244 7.28056V7.30056V9.44756" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.6832 21.2495H8.04224C5.94824 21.2495 4.25024 19.5525 4.25024 17.4575V13.1685C4.25024 11.0735 5.94824 9.37646 8.04224 9.37646H15.6832C17.7772 9.37646 19.4752 11.0735 19.4752 13.1685V17.4575C19.4752 19.5525 17.7772 21.2495 15.6832 21.2495Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.863 14.2026V16.4236" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    </div>

    {/* Display loader, error message, or news items */}
    {loading && (
    <div className="w-full">
        <ArticleFallbackUI />
    </div>
    )}
    {error && <p>{error}</p>}

    {!loading && !error && (
    <>
        <div className="news-list flex flex-wrap max-lg:flex-col justify-between gap-y-4">
            {news.slice(0, visibleNewsCount).map((item, index) => {
              // Parse and format the date from "time_published"
            const formattedDate = new Date(
                item.time_published.slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
            )
                .toISOString()
                .split('T')[0];

            return (
                <div key={index} className="news-item shadow-lg p-6 max-md:p-4 bg-primaryText/10 rounded-2xl w-[49%] max-lg:w-full mb-4 flex flex-col gap-y-4 items-start">
                    {/* Source, Sentiment, Category */}
                    <div className="flex w-full items-center justify-end gap-x-3">
                        {/* <a
                        className="max-sm:text-[3.3vw] mr-auto text-primaryText text-base max-xl:text-sm"
                        href={`https://${item.source_domain}`}
                        >
                        <p>Source: {item.source}</p>
                        </a> */}

                        <p
                        className={`px-6 py-2 font-sansMedium max-sm:px-[6vw] max-sm:text-[4vw] text-base max-xl:text-sm text-mobNavLink rounded-full ${
                            item.overall_sentiment_label === 'Bullish'
                            ? 'bg-buy'
                            : item.overall_sentiment_label === 'Bearish'
                            ? 'bg-sell'
                            : item.overall_sentiment_label === 'Neutral'
                            ? 'bg-articleNeutral'
                            : 'bg-article'
                        }`}
                        >
                        {item.overall_sentiment_label}
                        </p>
                        <p
                        className={`px-6 py-2 font-sansMedium max-sm:px-[6vw] max-sm:text-[4vw] text-base max-xl:text-sm text-mobNavLink rounded-full ${
                            item.category_within_source === 'General'
                            ? 'bg-buy'
                            : item.category_within_source === 'Trading'
                            ? 'bg-sell'
                            : item.category_within_source === 'News'
                            ? 'bg-articleNeutral'
                            : 'bg-article'
                        }`}
                        >
                        {item.category_within_source}
                        </p>
                    </div>

                    {/* Banner image */}
                    <div
                        className={`w-full h-[350px] max-2xl:h-[300px] max-md:h-[250px] max-sm:h-[200px] bg-primaryText/10 rounded-xl bg-[length:100%_100%] bg-center bg-no-repeat ${
                        item.banner_image ? '' : 'bg-ArticleBg bg-[length:70%_auto]'
                        }`}
                        style={{ backgroundImage: item.banner_image ? `url(${item.banner_image})` : '' }}
                    ></div>

                    {/* Title and Summary */}
                    <h3 className="text-xl font-sansSemibold text-primaryText">Title: {item.title}</h3>
                    <p className="text-base font-sansRegular text-primaryText/60">{item.summary}</p>

                    {/* Author, Date, and Full Article Link */}
                    <div className="flex mt-auto max-sm:flex-col max-sm:items-end w-full items-center justify-between">
                        <div className="max-sm:w-full">
                            <p className="max-sm:text-[3.5vw] text-base max-xl:text-sm">Author: ({item.authors.join(', ')})</p>
                            {/* Display the formatted date */}
                            <p className="text-sm text-primaryText/60">Published on: {formattedDate}</p>
                        </div>
                        <a
                        className="px-6 py-2 font-sansMedium max-sm:px-[6vw] max-sm:text-[3.5vw] text-base max-xl:text-sm text-primaryButtonText bg-primaryButtonBg hover:bg-primaryButtonBg/90 rounded-full"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Full Article &#8599;
                        </a>
                    </div>
                </div>
            );
            })}
        </div>

        {/* "Show More" button */}
        {visibleNewsCount < news.length && (
        <button
            className="px-6 py-2 max-sm:px-[6vw] max-sm:text-[3.5vw] text-base max-xl:text-sm text-primaryButtonText bg-primaryButtonBg hover:bg-primaryButtonBg/90 rounded-full transition duration-300"
            onClick={handleShowMore}
        >
            Show More
        </button>
        )}
    </>
    )}
</div>
);
}