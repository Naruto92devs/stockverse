'use client';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function SearchBar() {
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
const [noResults, setNoResults] = useState(false);
const [showResults, setShowResults] = useState(false); // State to control visibility of the results
const searchBarRef = useRef(null); // Reference for the search bar
const requestIdRef = useRef(0); // Ref to keep track of request IDs
const { theme } = useTheme(); // Access the current theme

useEffect(() => {
const fetchData = async () => {
    if (query.length > 0) {
    const currentRequestId = ++requestIdRef.current; // Increment and store the current requestId
    setLoading(true);
    try {
        const response = await fetch(`/api/search?keyword=${query}`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (currentRequestId === requestIdRef.current) { // Check if this is the latest request
        if (data.bestMatches) {
            const filteredResults = data.bestMatches.filter(
            result => !result['1. symbol'].includes('.')
            );
            setResults(filteredResults);
            setNoResults(filteredResults.length === 0);
        } else {
            setResults([]);
            setNoResults(true);
        }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        if (currentRequestId === requestIdRef.current) {
        setNoResults(true);
        }
    } finally {
        if (currentRequestId === requestIdRef.current) {
        setLoading(false);
        setShowResults(true); // Show results after fetching data
        }
    }
    } else {
    setResults([]);
    setNoResults(false);
    setShowResults(false); // Hide the results if the query is empty
    }
};

fetchData();
}, [query]);

useEffect(() => {
const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
    setShowResults(false); // Hide the results when clicking outside the search bar
    }
};

document.addEventListener('mousedown', handleClickOutside);
return () => {
    document.removeEventListener('mousedown', handleClickOutside);
};
}, []);

const handleFocus = () => {
if (results.length > 0) {
    setShowResults(true); // Show results again when the search bar is focused
}
};

// Handle input change
const handleInputChange = (e) => {
const value = e.target.value;
setQuery(value);
if (value.length < 1) {
    setResults([]); // Clear results when query length is less than 1
    setNoResults(false);
    setShowResults(false); // Hide results when input is cleared
}
};

return (
<div ref={searchBarRef} className="relative w-[30%]">
    <svg
    className="absolute"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke={theme === 'dark' ? 'white' : 'black'}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <path
        d="M20.9999 20.9999L16.6499 16.6499"
        stroke={theme === 'dark' ? 'white' : 'black'}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    </svg>
    <input
    type="text"
    className="w-full pl-8 text-base bg-background rounded focus:outline-none"
    placeholder="Search stocks..."
    value={query}
    onChange={handleInputChange} // Handle input change to clear results if necessary
    onFocus={handleFocus} // Handle focus to show results
    />
    {loading && <div className="absolute top-full left-0 w-full p-2 text-gray-500">Loading...</div>}
    {noResults && !loading && (
    <div className="absolute top-full left-0 w-full p-2 text-gray-500">No results found</div>
    )}
    {showResults && results.length > 0 && (
    <ul className="absolute top-full left-0 w-[50vw] bg-background rounded-md shadow-lg">
        {results.map((result, index) => (
        <li
            key={index}
            className="flex items-center justify-between w-[100%] px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
            {/* <div className="w-[10%]">{index + 1}</div> */}
            <div className="w-[50%]">{result['1. symbol']}</div>
            <div className="w-[50%]">{result['2. name']}</div>
        </li>
        ))}
    </ul>
    )}
</div>
);
}
