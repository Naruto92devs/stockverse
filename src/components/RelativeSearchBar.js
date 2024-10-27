'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';

export default function RelativeSearchBar ({ isVisible, onClose, symbol, setSymbol }) {
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
                    const response = await fetch(`/api/search?keyword=${query}`);
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
                                    !(result['1. symbol'].endsWith('X')) // Remove symbols where "X" is the fifth letter
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
    }, [pathname, onClose]); // Add onClose to dependency array

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
        setSymbol(symbol); // Updates the symbol state in Level_2
    };

    const handleSubmitHistory = async (symbol) => {
        try {
            handleResultClick(symbol);
            const response = await axios.post('https://devsalman.tech/search-history', {
                symbol,
            }, {
                withCredentials: true,
            });
    
            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                console.log(response.data.symbol);
            } else {
                console.log(data.message)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data.message)
            } else {
                console.log('An error occurred. Please try again.');
            }
            console.error('Error during watchlist submission:', error);
        }
    };

    return (
        <div className={`relative w-[40%] z-10 max-md:w-full`}>
            <div ref={searchBarRef} className="relative w-[100%]">
                <div className="w-full">
                    <svg
                        className="absolute left-1 top-[18%]"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                            stroke="gray" // Use strokeColor state here
                            strokeWidth="2.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M20.9999 20.9999L16.6499 16.6499"
                            stroke="gray" // Use strokeColor state here
                            strokeWidth="2.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input
                        name="search_Symbols"
                        type="text"
                        className="w-full p-2 pl-8 rounded-lg text-base max-lg:text-xl bg-background rounded outline outline-1 outline-primaryText/10 focus:outline-primaryText/30"
                        placeholder="Search stocks, symbols & companies here..."
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                    />
                </div>
                {loading && <div className="absolute top-full w-full p-2 text-gray-500 text-center">Loading...</div>}
                {noResults && !loading && (
                    <div className="absolute top-full w-full p-2 text-gray-500 text-center">No results found</div>
                )}
                {showResults && results.length > 0 && (
                    <ul className="select-none absolute top-[120%] p-1 pb-0.5 w-[100%] bg-primaryColor rounded shadow-xl">
                        {results.map((result, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between text-base text-primaryText w-[100%] px-4 py-2 mb-0.5 rounded cursor-pointer bg-secondaryColor/10 hover:bg-secondaryColor hover:text-primaryTextHover"
                                onClick={() => handleSubmitHistory(result['1. symbol'])}
                            >
                                <div className="w-[20%]">{result['1. symbol']}</div>
                                <div className="w-[80%]">{result['2. name']}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}