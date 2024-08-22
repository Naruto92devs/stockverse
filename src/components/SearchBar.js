'use client';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function SearchBar() {
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
const [noResults, setNoResults] = useState(false);
const [showResults, setShowResults] = useState(false);
const [strokeColor, setStrokeColor] = useState('black'); // Default to black
const searchBarRef = useRef(null);
const requestIdRef = useRef(0);
const { resolvedTheme } = useTheme();

useEffect(() => {
// Use resolvedTheme to ensure the theme is ready and apply the correct stroke color
setStrokeColor(resolvedTheme === 'dark' ? 'white' : 'black');
}, [resolvedTheme]); // Dependency on resolvedTheme to update the stroke color whenever theme changes

useEffect(() => {
const fetchData = async () => {
    if (query.length > 0) {
    const currentRequestId = ++requestIdRef.current;
    setLoading(true);
    try {
        const response = await fetch(`/api/search?keyword=${query}`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (currentRequestId === requestIdRef.current) {
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
        setShowResults(true);
        }
    }
    } else {
    setResults([]);
    setNoResults(false);
    setShowResults(false);
    }
};

fetchData();
}, [query]);

useEffect(() => {
const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
    setShowResults(false);
    }
};

document.addEventListener('mousedown', handleClickOutside);
return () => {
    document.removeEventListener('mousedown', handleClickOutside);
};
}, []);

const handleFocus = () => {
if (results.length > 0) {
    setShowResults(true);
}
};

const handleInputChange = (e) => {
const value = e.target.value;
setQuery(value);
if (value.length < 1) {
    setResults([]);
    setNoResults(false);
    setShowResults(false);
}
};

return (
<div ref={searchBarRef} className="relative w-[25%]">
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
        stroke={strokeColor} // Use strokeColor state here
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <path
        d="M20.9999 20.9999L16.6499 16.6499"
        stroke={strokeColor} // Use strokeColor state here
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
    onChange={handleInputChange}
    onFocus={handleFocus}
    />
    {loading && <div className="absolute top-full left-0 w-full p-2 text-gray-500">Loading...</div>}
    {noResults && !loading && (
    <div className="absolute top-full left-0 w-full p-2 text-gray-500">No results found</div>
    )}
    {showResults && results.length > 0 && (
    <ul className="absolute top-[120%] p-1 left-0 w-[400%] bg-background rounded shadow-xl">
        {results.map((result, index) => (
        <li
            key={index}
            className="flex items-center justify-between text-base text-primaryText w-[100%] px-4 py-2 mb-0.5 rounded cursor-pointer bg-secondaryColor/10 hover:bg-secondaryColor hover:text-primaryTextHover"
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
