'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [userVisible, setUserVisible] = useState(false);
    const [loading, setLoading] = useState(true); // Added loading state
    const token = Cookies.get('authToken');

    useEffect(() => {
        if (token) {
            setUserVisible(true); // User is logged in, show user data
        } else {
            setUserVisible(false); // No token, hide user data
            localStorage.removeItem('UserInfo');
        }
        setLoading(false); // Set loading to false after checking token
    }, [token]);

    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
    const [isNavbarVisible, setisNavbarVisible] = useState(false); // State for navbar visibility
    const NavRef = useRef(null); // Ref to track dropdown container
    const dropdownRef = useRef(null); // Ref to track dropdown container
    const toggleButtonRef = useRef(null); // Ref for the toggle button

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible); // Toggle the dropdown
    };

    const toggleNav = () => {
        setisNavbarVisible(!isNavbarVisible); // Toggle the dropdown
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
            if (
                NavRef.current &&
                !NavRef.current.contains(event.target) &&
                toggleButtonRef.current &&
                !toggleButtonRef.current.contains(event.target)
            ) {
                setisNavbarVisible(false);
                // setIsDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Render the navbar only when loading is false
    if (loading) {
        return null; // or a loading spinner if preferred
    }

return (
    <nav className="w-full">
        <div className=' w-full mx-auto px-3 xl:container max-xl:px-1 flex items-center justify-between py-2 relative select-none'>
            <Link href='/' className="relative z-20 flex w-max mr-2">
                <Image className='' src="/images/StockverseLogo.png" width={180} height={48} alt='Stockverse Logo' />
            </Link>
            {/* nav mob start */}
            <div className={`${isNavbarVisible? 'max-md:translate-y-[0px]' : 'max-md:translate-y-[-900px]'} transition duration-300 ease-in-out max-md:overflow-hidden z-10 min-w-max flex items-center gap-0.5  max-md:absolute max-md:top-0 max-md:left-0 max-md:w-full max-md:flex-col max-md:gap-2 max-md:bg-primaryBg max-md:items-start max-md:p-4 max-md:pt-20 max-md:rounded-b-3xl max-md:shadow-2xl`} aria-expanded="true" aria-haspopup="true" ref={NavRef}>
                {/* nav dropdown start */}
                <div className={`max-md:w-full cursor-pointer relative group`} onClick={toggleDropdown} id="menu-button" aria-expanded="true" aria-haspopup="true" ref={dropdownRef}>
                        <span className={`max-md:w-full px-4 max-xl:px-2 py-2 rounded-lg cursor-pointer relative group flex items-center gap-0.5 hover:bg-primaryMain/10 ${isDropdownVisible? 'bg-primaryMain/10' : ''}`}>
                            Market
                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="black" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <div onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} className={`relative md:absolute md:top-[100%] md:left-0 md:p-2 py-2 mt-2 max-md:shadow-none max-md:w-full w-48 bg-primaryBg rounded-lg shadow-xl max-md:gap-y-4 max-lg:mt-0 transition duration-300 ease-in-out overflow-hidden ${isDropdownVisible ? 'md:opacity-100 visible' : 'md:opacity-0 md:invisible hidden'}`}>
                            <Link href="/dashboard?view=gainers_losers">
                                <span className="w-full font-sansMedium rounded-lg text-sm block px-4 py-2 text-primaryTextColor hover:bg-primaryMain/10">Gainers / Losers</span>
                            </Link>
                            <Link href="/dashboard?view=ipo_calendar">
                                <span className="w-full font-sansMedium rounded-lg text-sm block px-4 py-2 text-primaryTextColor hover:bg-primaryMain/10">IPO Calender</span>
                            </Link>
                            <Link href="/dashboard?view=historical">
                                <span className="w-full font-sansMedium rounded-lg text-sm block px-4 py-2 text-primaryTextColor hover:bg-primaryMain/10">Historical</span>
                            </Link>
                            <Link href="/alerts" className="">
                                <span className="w-full font-sansMedium rounded-lg text-sm block px-4 py-2 text-primaryTextColor hover:bg-primaryMain/10">Alerts</span>
                            </Link>
                        </div>
                </div>
                {/* nav dropdown end*/}
                
                <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href='/cvkd' className="max-md:w-full flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
                    Stock Picks
                </Link>
                <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href='/dashboard?view=news' className="max-md:w-full flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
                    News
                </Link>
                <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href='/stockverse-gpt' className="max-md:w-full flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
                    StockVerse GPT
                </Link>
                <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href='/pricing' className="max-md:w-full flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
                    Pricing
                </Link>
                <div className='pt-6 md:hidden flex flex-wrap gap-4 w-full text-center'>
                    <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href="/login" className={` ${userVisible? 'hidden' : 'visible w-[47%] px-4 py-2 max-sm:px-[4vw] max-sm:text-[3.5vw] text-sm text-primaryTextColorColor font-sansMedium bg-black/10 hover:bg-primaryMain/10 rounded-lg'} `}>
                        Login
                    </Link> 
                    <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href="/register" className={` ${userVisible? 'hidden' : 'visible w-[47%] px-4 py-2 max-sm:px-[4vw] max-sm:text-[3vw] text-sm text-white font-sansMedium bg-darkBlue hover:bg-primaryMain rounded-lg transition duration-300'}`}>
                        Create Account
                    </Link>
                    <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href="/dashboard" className={` ${userVisible? 'visible w-full px-4 py-2 max-sm:px-[4vw] max-sm:text-[3vw] text-sm text-white font-sansMedium bg-darkBlue hover:bg-primaryMain rounded-lg transition duration-300' : 'hidden'}`}>
                        DashBoard
                    </Link>
                </div>
            </div>
            {/* nav mob end */}
            <div className="max-md:hidden w-max relative flex items-center gap-1">
                <Link href="/login" className={` ${userVisible? 'hidden' : 'visible px-4 py-2 max-sm:px-[4vw] max-sm:text-[3.5vw] text-sm text-primaryTextColorColor font-sansMedium bg-white hover:bg-primaryMain/10 rounded-lg'} `}>
                    Login
                </Link> 
                <Link href="/register" className={` ${userVisible? 'hidden' : 'visible px-4 py-2 max-sm:px-[4vw] max-sm:text-[3vw] text-sm text-white font-sansMedium bg-darkBlue hover:bg-primaryMain rounded-lg transition duration-300'}`}>
                    Create Account
                </Link>
                <div className={`${userVisible ? 'visible' : 'hidden'} flex flex-col ga-y-4 items-center`}>
                    <Link href="/dashboard" className='visible px-4 py-2 max-sm:px-[4vw] max-sm:text-[3vw] text-sm text-white font-sansMedium bg-darkBlue hover:bg-primaryMain rounded-lg transition duration-300'>
                        Dashboard
                    </Link>
                </div>
            </div>
            {/* nav toggle buton */}
            <div onClick={toggleNav} ref={toggleButtonRef} className="cursor-pointer md:hidden relative z-20 flex w-max mr-2">
                <Image className={`${isNavbarVisible? 'hidden' : 'visible'}`} src="/images/nav_close.png" width={32} height={32} alt='Stockverse Logo' />
                <Image className={`${isNavbarVisible? 'visible' : 'hidden'}`} src="/images/nav_open.png" width={32} height={32} alt='Stockverse Logo' />
            </div>
        </div>
    </nav>
);
};

export default Navbar;