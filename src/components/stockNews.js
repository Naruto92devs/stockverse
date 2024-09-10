'use client';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';

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
  const [timeFrom, setTimeFrom] = useState(''); // New state for time_from
  const [timeTo, setTimeTo] = useState(''); // New state for time_to
  const [visibleNewsCount, setVisibleNewsCount] = useState(10); // To control "Show More"

  // Fetch news data based on selected topic, sort, limit, time_from, and time_to
  const fetchNews = async (
    selectedTopic = '',
    selectedSort = '',
    selectedLimit = '',
    selectedTimeFrom = '',
    selectedTimeTo = ''
  ) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.stockverse.ai/stock-news?${
        selectedLimit ? `limit=${selectedLimit}` : ''
      }${selectedSort ? `&sort=${selectedSort}` : ''}${
        selectedTopic ? `&topics=${selectedTopic}` : ''
      }${selectedTimeFrom ? `&time_from=${selectedTimeFrom}` : ''}${
        selectedTimeTo ? `&time_to=${selectedTimeTo}` : ''
      }`;

      const response = await fetch(url);
      const data = await response.json();
      setNews(data.feed); // Set the news feed from the response
    } catch (err) {
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch news when the component mounts or when the filters change
  useEffect(() => {
    fetchNews(topic, sort, limit, timeFrom, timeTo);
  }, [topic, sort, limit, timeFrom, timeTo]);

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

  const handleTimeFromChange = (e) => {
    setTimeFrom(e.target.value.replace('T', '')); // Format to YYYYMMDDTHHMM
  };

  const handleTimeToChange = (e) => {
    setTimeTo(e.target.value.replace('T', '')); // Format to YYYYMMDDTHHMM
  };

  // Handle "Show More" button click
  const handleShowMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 50); // Show 50 more articles
  };

  return (
    <div className="mx-auto px-6 max-sm:px-3 xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center">
      {/* Filter dropdowns */}
      <div className="filter-dropdowns flex flex-wrap gap-4 justify-center mb-6">
        {/* Topic Filter */}
        <select
          className="p-2 border rounded-lg text-base"
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

        {/* Sort Filter */}
        <select
          className="p-2 border rounded-lg text-base"
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

        {/* Limit Filter */}
        <select
          className="p-2 border rounded-lg text-base"
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

        {/* Time From Filter */}
        <input
          type="datetime-local"
          className="p-2 border rounded-lg text-base"
          onChange={handleTimeFromChange}
        />

        {/* Time To Filter */}
        <input
          type="datetime-local"
          className="p-2 border rounded-lg text-base"
          onChange={handleTimeToChange}
        />
      </div>

      {/* Display loader, error message, or news items */}
      {loading && (
        <div>
          <Loader />
          <p className="text-base">One moment please...</p>
        </div>
      )}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="news-list">
            {news.slice(0, visibleNewsCount).map((item, index) => (
              <div key={index} className="news-item mb-4">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))}
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