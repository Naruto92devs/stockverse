'use client';
import { useState, useEffect, useRef } from 'react';

export default function SearchBar() {
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
const [noResults, setNoResults] = useState(false);
const [showResults, setShowResults] = useState(false); // State to control visibility of the results
const searchBarRef = useRef(null); // Reference for the search bar

useEffect(() => {
const fetchData = async () => {
    if (query.length > 0) {
    setLoading(true);
    try {
        const response = await fetch(`/api/search?keyword=${query}`);
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the data to check the structure
        if (data.bestMatches) {
        setResults(data.bestMatches);
        setNoResults(data.bestMatches.length === 0);
        } else {
        setResults([]);
        setNoResults(true);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        setNoResults(true);
    } finally {
        setLoading(false);
        setShowResults(true); // Show results after fetching data
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

return (
<div ref={searchBarRef} className="relative w-full max-w-md mx-auto">
    <input
    type="text"
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
    placeholder="Search stocks..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onFocus={handleFocus} // Handle focus to show results
    />
    {loading && <div className="absolute top-full left-0 w-full p-2 text-gray-500">Loading...</div>}
    {noResults && !loading && (
    <div className="absolute top-full left-0 w-full p-2 text-gray-500">No results found</div>
    )}
    {showResults && results.length > 0 && (
    <ul className="absolute top-full left-0 w-[50vw] bg-background rounded-md shadow-lg">
        {results.map((result, index) => (
        <li key={index} className="flex items-center justify-between w-[100%] px-4 py-2 cursor-pointer hover:bg-gray-100">
            <div className="w-[10%]">{index + 1}</div>
            <div className="w-[50%]">{result['1. symbol']}</div> 
            <div className="w-[50%]">{result['2. name']}</div>
        </li>
        ))}
    </ul>
    )}
</div>
);
}
