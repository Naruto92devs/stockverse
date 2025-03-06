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
    <nav className="w-full relative z-100">
        <div className=' w-full mx-auto px-3 xl:container max-xl:px-1 z-100 flex items-center justify-between py-2 relative top-4 max-md:top-0 select-none bg-[#fff] shadow-[0px_20px_100px_10px_#0000001A] rounded-xl'>
            <Link href='/' className="relative z-20 flex w-max mr-2">
                <Image className='' src="/images/StockverseLogo.png" width={180} height={48} alt='Stockverse Logo' />
            </Link>
            {/* nav mob start */}
            <div className={`${isNavbarVisible? 'max-md:translate-y-[0px]' : 'max-md:translate-y-[-900px]'} transition duration-300 ease-in-out max-md:overflow-hidden relative z-10 min-w-max flex items-center lg:gap-12 max-md:gap-6 md:gap-4  max-md:absolute max-md:top-0 max-md:left-0 max-md:w-full max-md:flex-col max-md:gap-2 max-md:bg-primaryBg max-md:items-start max-md:p-4 max-md:pt-20 max-md:rounded-b-3xl max-md:shadow-2xl`} aria-expanded="true" aria-haspopup="true" ref={NavRef}>
                {/* nav dropdown start */}
                <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href='/' className="flex flex-col items-start text-base font-poppinsRegular text-primaryTextColor border-bottom">
                    Home
                </Link>
                {/* nav dropdown end*/}
                
                <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href='#about' className="flex flex-col items-start text-base font-poppinsRegular text-primaryTextColor border-bottom">
                    About Us
                </Link>
                <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href='#contact' className="flex flex-col items-start text-base font-poppinsRegular text-primaryTextColor border-bottom">
                    Contact Us
                </Link>
                <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href='#alert' className="flex flex-col items-start text-base font-poppinsRegular text-primaryTextColor border-bottom">
                    {`Today's Alert`}
                </Link>
                <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href='#faq' className="flex flex-col items-start text-base font-poppinsRegular text-primaryTextColor rounded-lg border-bottom">
                    FAQ
                </Link>
                <div className='pt-6 md:hidden flex flex-wrap gap-4 w-full text-center relative z-10'>
                    <Link onClick={(e) => {if (window.innerWidth <= 768) {toggleNav();}}} href="/register" className={` ${userVisible? 'hidden' : 'visible w-[47%] px-4 py-2 max-sm:px-[4vw] max-sm:text-[4vw] text-base text-white font-grotesqueSemi bg-[#2C2C2C] hover:bg-[#2c2c2cd9] rounded-xl transition duration-300'}`}>
                        Get Started
                    </Link>
                </div>
            </div>
            {/* nav mob end */}
            <div className="max-md:hidden w-max relative flex items-center gap-1 z-10">
                <Link href="/register" className={` ${userVisible? 'hidden' : 'visible px-4 py-2 max-sm:px-[4vw] max-sm:text-[4vw] text-lg text-[#2C2C2C] border border-[#2C2C2C] hover:text-[#fff] font-grotesqueSemi hover:bg-[#2C2C2C] rounded-xl transition duration-300'}`}>
                    Get Started
                </Link>
                <div className={`${userVisible ? 'visible' : 'hidden'} flex flex-col ga-y-4 items-center`}>
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