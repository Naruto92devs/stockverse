'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function SearchBar({ isVisible, onClose }) {
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
const [noResults, setNoResults] = useState(false);
const [showResults, setShowResults] = useState(false);
const searchBarRef = useRef(null);
const requestIdRef = useRef(0);
const pathname = usePathname(); // Hook to detect route changes
const router = useRouter(); // Use `useRouter` to handle navigation

useEffect(() => {
const fetchData = async () => {
    if (query.length > 0) {
    const currentRequestId = ++requestIdRef.current;
    setLoading(true);
    try {
        const response = await fetch(`https://devsalman.tech/search?keyword=${query}`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (currentRequestId === requestIdRef.current) {
        if (data.bestMatches) {
            const filteredResults = data.bestMatches.filter(
            result =>
                !result['1. symbol'].includes('.') && // Remove symbols with periods
                !result['2. name'].toLowerCase().includes('warrant') && // Remove companies with "warrant" in their name
                !(result['1. symbol'].length === 5 && result['1. symbol'].endsWith('X')) // Remove symbols where "X" is the fifth letter
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

useEffect(() => {
// Close the search bar when the route changes
if (onClose) {
    onClose();
}
}, [pathname]); // Detects route change

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

const handleResultClick = (symbol) => {
setQuery('');
router.push(`/stocks/${symbol}`);
};

return (
<div className={`relative w-[25%] transform z-10 max-lg:h-[100%] max-lg:w-full max-lg:bg-mobNavBg max-lg:pt-4 max-lg:fixed max-lg:top-0 max-lg:left-0 transition duration-300 ease-in-out ${
    isVisible ? 'max-lg:translate-y-0' : 'max-lg:translate-y-full'
}`}>
    <div ref={searchBarRef} className="relative w-[100%] max-lg:flex max-lg:flex-col max-lg:items-center">
    <input
        name="search_Symbols"
        type="text"
        className="w-full max-lg:w-[95%] p-1 pl-8 rounded-full max-lg:rounded-xl text-base max-lg:text-xl bg-background border rounded focus:outline-none"
        placeholder="Search stocks..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
    />
    {loading && <div className="absolute top-full left-0 w-full p-2 text-gray-500 max-lg:text-mobNavLink text-center">Loading...</div>}
    {noResults && !loading && (
        <div className="absolute top-full left-0 w-full p-2 text-gray-500 max-lg:text-mobNavLink text-center">No results found</div>
    )}
    {showResults && results.length > 0 && (
        <ul className="select-none absolute max-lg:relative max-lg:max-h-[75vh] max-lg:overflow-y-scroll max-lg:w-[100%] top-[120%] max-lg:p-0 p-1 pb-0.5 left-0 w-[350%] bg-primaryColor max-lg:bg-primaryColor/0 max-lg:mt-2 rounded shadow-xl">
        {results.map((result, index) => (
            <li
            key={index}
            className="flex items-center justify-between text-base text-primaryText max-lg:border-b max-lg:text-mobNavLink w-[100%] px-4 py-2 mb-0.5 max-lg:mb-0 rounded max-lg:rounded-none cursor-pointer max-lg:bg-secondaryColor/0 bg-secondaryColor/10 hover:bg-secondaryColor hover:text-primaryTextHover"
            onClick={() => handleResultClick(result['1. symbol'])}
            >
            <div className="w-[20%]">{result['1. symbol']}</div>
            <div className="w-[75%]">{result['2. name']}</div>
            </li>
        ))}
        </ul>
    )}
    </div>
</div>
);
}
