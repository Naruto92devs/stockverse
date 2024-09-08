'use client';
import React, { useState, useEffect } from 'react';

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

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState('');
  const [visibleNewsCount, setVisibleNewsCount] = useState(50); // To control "Show More"

  // Fetch news data based on selected topic
  const fetchNews = async (selectedTopic = '') => {
    setLoading(true);
    setError(null);
    try {
      const url = selectedTopic
        ? `https://api.stockverse.ai/stock-news?limit=1000&topics=${selectedTopic}`
        : 'https://api.stockverse.ai/stock-news?limit=1000';

      const response = await fetch(url);
      const data = await response.json();
      setNews(data.feed); // Set the news feed from the response
    } catch (err) {
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch news when the component mounts or when the topic changes
  useEffect(() => {
    fetchNews(topic);
  }, [topic]);

  // Handle topic change
  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
    setVisibleNewsCount(50); // Reset visible news count on topic change
  };

  // Handle "Show More" button click
  const handleShowMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 50); // Show 50 more articles
  };

  return (
    <div>
      <h2>Stock News</h2>

      {/* Display filter buttons */}
      <div className="filter-buttons">
        {topics.map((t) => (
          <button
            key={t.value}
            onClick={() => handleTopicChange(t.value)}
            className={`text-submit ${topic === t.value ? 'active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Display loader, error message, or news items */}
      {loading && <p>Loading news...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="news-list">
            {news.slice(0, visibleNewsCount).map((item, index) => (
              <div key={index} className="news-item">
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
            <button onClick={handleShowMore}>Show More</button>
          )}
        </>
      )}
    </div>
  );
};

export default News;