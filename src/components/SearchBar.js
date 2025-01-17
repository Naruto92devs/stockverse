'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function SearchBar({isVisible}) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchBarRef = useRef(null);
    const requestIdRef = useRef(0);

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

    const handleSubmitHistory = async (symbol, name) => {
        try {
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
        <div className={`fixed top-0 left-0 w-full h-full backdrop-blur-sm bg-black/50 z-20 ${isVisible ? 'visible' : 'hidden'}`}>
            <div ref={searchBarRef} className="relative w-[100%] flex flex-col xl:container mx-auto">
                <div className="w-full max-lg:flex max-lg:flex-col max-lg:items-center">
                    <Image className="absolute top-2.5 left-3" src='/images/search.svg' width={18} height={18} alt="search logo"></Image>
                    <input
                        name="search_Symbols"
                        type="text"
                        placeholder="Search stocks, symbols & companies here..."
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        className="w-full text-sm px-2 pl-10 py-2 border bg-primaryBg text-primaryTextColor border-primaryTextColor/10 rounded-lg focus:outline-none"
                    />
                </div>
                {loading && <div>Loading...</div>}
                {noResults && !loading && (
                    <div>No results found</div>
                )}
                {showResults && results.length > 0 && (
                    <ul className="select-none absolute max-lg:relative max-lg:max-h-[75vh] max-lg:overflow-y-scroll max-lg:w-[100%] top-[120%] max-lg:p-0 p-1 pb-0.5 left-0 w-[300%] max-xl:w-[400%] bg-primaryColor max-lg:bg-primaryColor/0 max-lg:mt-2 rounded shadow-xl">
                        {results.map((result, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between text-base text-primaryText max-lg:border-b max-lg:text-mobNavLink w-[100%] px-4 py-2 mb-0.5 max-lg:mb-0 rounded max-lg:rounded-none cursor-pointer max-lg:bg-secondaryColor/0 bg-secondaryColor/10 hover:bg-secondaryColor hover:text-primaryTextHover"
                                onClick={() => handleSubmitHistory(result['1. symbol'], result['2. name'])}
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