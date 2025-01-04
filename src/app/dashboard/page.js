'use client';
import { useState, useEffect } from "react";
import ProfileLogo from "@/components/ProfileLogo"
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

export default function DashBoard() {

    const [sidebarHide, setSidebarHide] = useState(false);

    const token = Cookies.get("authToken");
    
    const toggleSidebar = () => {
        setSidebarHide(!sidebarHide);
    };

    return (
        <section className="w-full flex flex-col h-[100dvh] overflow-hidden relative scrollbar-hide">
            {/* Nav bar start */}
            <nav className="flex-shrink-0 w-full flex items-center lg:gap-1 gap-2 bg-primaryBg p-3 border-b border-black/5">
              <div onClick={toggleSidebar} className={`flex-shrink-0 relative flex items-center justify-between ${sidebarHide? 'md:w-[5.5rem] w-max' : 'md:w-[15rem] w-max'}`}>
                <div className="cursor-pointer flex items-center gap-2">
                    <Image src="/images/favicon.png" width={48} height={48} alt='Stockverse Logo' />
                    <p className={`max-md:hidden font-sansMedium text-primaryTextColor text-xl ${sidebarHide? 'hidden' : 'visible'}`}>StockVerse</p>
                </div>
                <Image className={`cursor-pointer transition-transform duration-300 ${sidebarHide ? 'md:rotate-180 rotate-0' : 'md:rotate-0 rotate-180'}`} src="/images/sidebar_toggle.png" width={36} height={36} alt='Stockverse Logo' />
              </div>
              <div className="flex-grow xl:ml-4 lg:max-w-[20rem] relative">
                <Image className="absolute top-2.5 left-3" src='/images/search.svg' width={18} height={18} alt="search logo"></Image>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  readOnly
                  placeholder="Search Stocks"
                  required
                  className="w-full text-sm px-2 pl-10 py-2 border bg-primaryBg text-primaryTextColor border-primaryTextColor/10 rounded-lg focus:outline-none"
                />
              </div>
              <Link href='/pricing' className="max-lg:hidden flex items-center gap-2 px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
                StockVerse Gpt 
                {/* <span className="-rotate-45">&rarr;</span> */}
              </Link>
              <Link href='/pricing' className="max-lg:hidden flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
                Stock Picks
              </Link>
              <Link href='/pricing' className="max-lg:hidden flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
                Newsletter
              </Link>
              <Link href='/pricing' className="max-lg:hidden flex flex-col items-start px-4 max-xl:px-2 py-2 text-sm font-sansMedium text-primaryTextColor hover:bg-primaryMain/10 rounded-lg">
                Pricing
              </Link>
              <div className="ml-auto">
                <ProfileLogo/>
              </div>
            </nav>
            {/* Nav bar end */}
            <div className="w-full h-full flex-grow flex items-start">
              {/* side bar start */}
                <div className={`transition-width flex-shrink-0 overflow-x-hidden py-4 pb-20 flex flex-col h-full border-r border-black/5 bg-primaryBg z-10 overflow-y-scroll scrollbar-thin max-md:absolute transition duration-300 ease-in-out ${sidebarHide? 'w-[4rem] max-md:w-max max-md:translate-x-[0]' : 'md:w-[16rem] max-md:w-max max-md:translate-x-[-900px]'}`}>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_19260_6154)">
                      <path d="M11.625 2.625V1.5M14.5795 3.4205L15.375 2.625M15.3827 6.375H16.5077M16.463 9.75C16.0867 13.54 12.889 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 5.11099 4.46001 1.91332 8.25 1.53703M9 6H12V9M11.7148 6C9.949 8.49569 7.03977 10.125 3.75 10.125C2.99782 10.125 2.26554 10.0398 1.56227 9.87859" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_19260_6154">
                      <rect width="18" height="18" fill="white"/>
                      </clipPath>
                      </defs>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md `}>Chart</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 5.25L10.5985 11.1515C10.3015 11.4485 10.153 11.597 9.98176 11.6526C9.83113 11.7016 9.66887 11.7016 9.51824 11.6526C9.34699 11.597 9.19848 11.4485 8.90147 11.1515L6.84853 9.09853C6.55152 8.80152 6.40301 8.65301 6.23176 8.59737C6.08113 8.54842 5.91887 8.54842 5.76824 8.59737C5.59699 8.65301 5.44848 8.80152 5.15147 9.09853L1.5 12.75M16.5 5.25H11.25M16.5 5.25V10.5" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>Top Gainers & Losers</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.75014 1.5L3.07023 9.51589C2.80863 9.82982 2.67782 9.98678 2.67582 10.1193C2.67409 10.2346 2.72544 10.3442 2.81508 10.4167C2.9182 10.5 3.12252 10.5 3.53117 10.5H9.00014L8.25014 16.5L14.93 8.48411C15.1917 8.17018 15.3225 8.01322 15.3245 7.88065C15.3262 7.76541 15.2748 7.65577 15.1852 7.58333C15.0821 7.5 14.8778 7.5 14.4691 7.5H9.00014L9.75014 1.5Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>News</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.5 6.75C13.9142 6.75 14.25 7.08579 14.25 7.5V15C14.25 15.4142 13.9142 15.75 13.5 15.75C13.0858 15.75 12.75 15.4142 12.75 15V7.5C12.75 7.08579 13.0858 6.75 13.5 6.75Z" fill="black"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.5 9.75C4.91421 9.75 5.25 10.0858 5.25 10.5V15C5.25 15.4142 4.91421 15.75 4.5 15.75C4.08579 15.75 3.75 15.4142 3.75 15V10.5C3.75 10.0858 4.08579 9.75 4.5 9.75Z" fill="black"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M9 2.25C9.41421 2.25 9.75 2.58579 9.75 3V15C9.75 15.4142 9.41421 15.75 9 15.75C8.58579 15.75 8.25 15.4142 8.25 15V3C8.25 2.58579 8.58579 2.25 9 2.25Z" fill="black"/>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>Technical Analysis</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.75 7.5H2.25M12 1.5V4.5M6 1.5V4.5M5.85 16.5H12.15C13.4101 16.5 14.0402 16.5 14.5215 16.2548C14.9448 16.039 15.289 15.6948 15.5048 15.2715C15.75 14.7902 15.75 14.1601 15.75 12.9V6.6C15.75 5.33988 15.75 4.70982 15.5048 4.22852C15.289 3.80516 14.9448 3.46095 14.5215 3.24524C14.0402 3 13.4101 3 12.15 3H5.85C4.58988 3 3.95982 3 3.47852 3.24524C3.05516 3.46095 2.71095 3.80516 2.49524 4.22852C2.25 4.70982 2.25 5.33988 2.25 6.6V12.9C2.25 14.1601 2.25 14.7902 2.49524 15.2715C2.71095 15.6948 3.05516 16.039 3.47852 16.2548C3.95982 16.5 4.58988 16.5 5.85 16.5Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>Earnings Calendar</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 8.65104C8.42515 8.11632 9.57476 8.11632 10.4999 8.65104M6.62132 6.87868C7.79289 8.05025 7.79289 9.94974 6.62132 11.1213C5.44975 12.2929 3.55026 12.2929 2.37868 11.1213C1.20711 9.94975 1.20711 8.05026 2.37868 6.87868C3.55025 5.70711 5.44974 5.70711 6.62132 6.87868ZM15.6213 6.87868C16.7929 8.05025 16.7929 9.94974 15.6213 11.1213C14.4498 12.2929 12.5503 12.2929 11.3787 11.1213C10.2071 9.94975 10.2071 8.05026 11.3787 6.87868C12.5502 5.70711 14.4497 5.70711 15.6213 6.87868Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>Insider Transactions</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 1.70215V4.80005C10.5 5.22009 10.5 5.43011 10.5817 5.59055C10.6537 5.73167 10.7684 5.8464 10.9095 5.91831C11.0699 6.00005 11.28 6.00005 11.7 6.00005H14.7979M6 11.25V13.5M12 9.75V13.5M9 7.875V13.5M15 7.49117V12.9C15 14.1601 15 14.7902 14.7548 15.2715C14.539 15.6948 14.1948 16.039 13.7715 16.2548C13.2902 16.5 12.6601 16.5 11.4 16.5H6.6C5.33988 16.5 4.70982 16.5 4.22852 16.2548C3.80516 16.039 3.46095 15.6948 3.24524 15.2715C3 14.7902 3 14.1601 3 12.9V5.1C3 3.83988 3 3.20982 3.24524 2.72852C3.46095 2.30516 3.80516 1.96095 4.22852 1.74524C4.70982 1.5 5.33988 1.5 6.6 1.5H9.00883C9.55916 1.5 9.83432 1.5 10.0933 1.56217C10.3229 1.61729 10.5423 1.7082 10.7436 1.83156C10.9707 1.9707 11.1653 2.16527 11.5544 2.55442L13.9456 4.94558C14.3347 5.33473 14.5293 5.5293 14.6684 5.75636C14.7918 5.95767 14.8827 6.17715 14.9378 6.40673C15 6.66568 15 6.94084 15 7.49117Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>Historical</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.46199 2.58993C8.63485 2.23972 8.72128 2.06462 8.83862 2.00867C8.94071 1.96 9.05931 1.96 9.1614 2.00867C9.27874 2.06462 9.36517 2.23972 9.53804 2.58993L11.178 5.9124C11.2291 6.01579 11.2546 6.06748 11.2919 6.10762C11.3249 6.14316 11.3645 6.17195 11.4085 6.1924C11.4582 6.21551 11.5152 6.22384 11.6293 6.24052L15.2977 6.77672C15.684 6.83318 15.8772 6.86141 15.9666 6.95577C16.0444 7.03786 16.0809 7.15066 16.0661 7.26277C16.0491 7.39162 15.9093 7.52782 15.6296 7.80022L12.9761 10.3848C12.8934 10.4653 12.852 10.5056 12.8253 10.5535C12.8017 10.596 12.7865 10.6426 12.7807 10.6908C12.7741 10.7453 12.7838 10.8022 12.8034 10.916L13.4295 14.5665C13.4955 14.9516 13.5285 15.1441 13.4665 15.2583C13.4125 15.3577 13.3165 15.4274 13.2053 15.448C13.0775 15.4717 12.9046 15.3808 12.5588 15.199L9.27928 13.4743C9.1771 13.4206 9.12601 13.3937 9.07218 13.3832C9.02452 13.3738 8.9755 13.3738 8.92784 13.3832C8.87402 13.3937 8.82293 13.4206 8.72074 13.4743L5.44119 15.199C5.09544 15.3808 4.92256 15.4717 4.79473 15.448C4.68351 15.4274 4.58754 15.3577 4.53355 15.2583C4.4715 15.1441 4.50452 14.9516 4.57056 14.5665L5.19666 10.916C5.21618 10.8022 5.22594 10.7453 5.21934 10.6908C5.21349 10.6426 5.19833 10.596 5.1747 10.5535C5.14802 10.5056 5.10666 10.4653 5.02394 10.3848L2.37042 7.80022C2.09075 7.52782 1.95091 7.39162 1.93389 7.26277C1.91909 7.15066 1.95567 7.03786 2.03344 6.95577C2.12283 6.86141 2.31598 6.83318 2.70228 6.77672L6.37073 6.24052C6.48482 6.22384 6.54186 6.21551 6.59154 6.1924C6.63552 6.17195 6.67512 6.14316 6.70814 6.10762C6.74543 6.06748 6.77095 6.01579 6.82198 5.9124L8.46199 2.58993Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>Watch List</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_19251_325)">
                      <path d="M4.5 4.5L6 3M6 3L4.5 1.5M6 3H4.5C2.84315 3 1.5 4.34315 1.5 6M13.5 13.5L12 15M12 15L13.5 16.5M12 15H13.5C15.1569 15 16.5 13.6569 16.5 12M10.0629 10.0629C10.6496 10.3431 11.3065 10.5 12 10.5C14.4853 10.5 16.5 8.48528 16.5 6C16.5 3.51472 14.4853 1.5 12 1.5C9.51472 1.5 7.5 3.51472 7.5 6C7.5 6.69354 7.65689 7.35043 7.93712 7.93712M10.5 12C10.5 14.4853 8.48528 16.5 6 16.5C3.51472 16.5 1.5 14.4853 1.5 12C1.5 9.51472 3.51472 7.5 6 7.5C8.48528 7.5 10.5 9.51472 10.5 12Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_19251_325">
                      <rect width="18" height="18" fill="white"/>
                      </clipPath>
                      </defs>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>Trades</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.5 6.75C13.9142 6.75 14.25 7.08579 14.25 7.5V15C14.25 15.4142 13.9142 15.75 13.5 15.75C13.0858 15.75 12.75 15.4142 12.75 15V7.5C12.75 7.08579 13.0858 6.75 13.5 6.75Z" fill="black"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.5 9.75C4.91421 9.75 5.25 10.0858 5.25 10.5V15C5.25 15.4142 4.91421 15.75 4.5 15.75C4.08579 15.75 3.75 15.4142 3.75 15V10.5C3.75 10.0858 4.08579 9.75 4.5 9.75Z" fill="black"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M9 2.25C9.41421 2.25 9.75 2.58579 9.75 3V15C9.75 15.4142 9.41421 15.75 9 15.75C8.58579 15.75 8.25 15.4142 8.25 15V3C8.25 2.58579 8.58579 2.25 9 2.25Z" fill="black"/>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>Level 2</p>
                    </div>
                    <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                      <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.75014 1.5L3.07023 9.51589C2.80863 9.82982 2.67782 9.98678 2.67582 10.1193C2.67409 10.2346 2.72544 10.3442 2.81508 10.4167C2.9182 10.5 3.12252 10.5 3.53117 10.5H9.00014L8.25014 16.5L14.93 8.48411C15.1917 8.17018 15.3225 8.01322 15.3245 7.88065C15.3262 7.76541 15.2748 7.65577 15.1852 7.58333C15.0821 7.5 14.8778 7.5 14.4691 7.5H9.00014L9.75014 1.5Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className={`font-sansMedium text-primaryTextColor text-md`}>Stockverse Gpt</p>
                    </div>
                    {/* user profile related links */}
                    <div className="mt-auto flex flex-col">
                      <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                        <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.04677 14.5283L7.4851 15.5142C7.61541 15.8076 7.82806 16.057 8.09727 16.232C8.36648 16.4069 8.68069 16.5001 9.00177 16.5C9.32285 16.5001 9.63706 16.4069 9.90627 16.232C10.1755 16.057 10.3881 15.8076 10.5184 15.5142L10.9568 14.5283C11.1128 14.1785 11.3753 13.8869 11.7068 13.695C12.0404 13.5026 12.4263 13.4206 12.8093 13.4608L13.8818 13.575C14.201 13.6088 14.5232 13.5492 14.8093 13.4035C15.0954 13.2578 15.333 13.0322 15.4934 12.7542C15.6541 12.4763 15.7306 12.1577 15.7137 11.8372C15.6969 11.5166 15.5873 11.2079 15.3984 10.9483L14.7634 10.0758C14.5373 9.76285 14.4165 9.38611 14.4184 9C14.4184 8.61494 14.5403 8.23976 14.7668 7.92833L15.4018 7.05583C15.5907 6.79632 15.7002 6.48755 15.7171 6.16701C15.7339 5.84646 15.6574 5.52791 15.4968 5.25C15.3363 4.97193 15.0987 4.74637 14.8126 4.60067C14.5265 4.45497 14.2044 4.3954 13.8851 4.42917L12.8126 4.54333C12.4296 4.58356 12.0437 4.50159 11.7101 4.30917C11.3779 4.11619 11.1154 3.82302 10.9601 3.47167L10.5184 2.48583C10.3881 2.19238 10.1755 1.94304 9.90627 1.76805C9.63706 1.59306 9.32285 1.49995 9.00177 1.5C8.68069 1.49995 8.36648 1.59306 8.09727 1.76805C7.82806 1.94304 7.61541 2.19238 7.4851 2.48583L7.04677 3.47167C6.89147 3.82302 6.62892 4.11619 6.29677 4.30917C5.96318 4.50159 5.57727 4.58356 5.19427 4.54333L4.11844 4.42917C3.79918 4.3954 3.47699 4.45497 3.19092 4.60067C2.90485 4.74637 2.6672 4.97193 2.50677 5.25C2.34614 5.52791 2.26961 5.84646 2.28647 6.16701C2.30333 6.48755 2.41286 6.79632 2.60177 7.05583L3.23677 7.92833C3.46323 8.23976 3.58517 8.61494 3.5851 9C3.58517 9.38506 3.46323 9.76024 3.23677 10.0717L2.60177 10.9442C2.41286 11.2037 2.30333 11.5124 2.28647 11.833C2.26961 12.1535 2.34614 12.4721 2.50677 12.75C2.66736 13.0279 2.90504 13.2534 3.19107 13.399C3.4771 13.5447 3.79921 13.6044 4.11844 13.5708L5.19094 13.4567C5.57394 13.4164 5.95985 13.4984 6.29344 13.6908C6.62683 13.8833 6.89059 14.1765 7.04677 14.5283Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.00043 11.25C10.2431 11.25 11.2504 10.2426 11.2504 9C11.2504 7.75736 10.2431 6.75 9.00043 6.75C7.75779 6.75 6.75043 7.75736 6.75043 9C6.75043 10.2426 7.75779 11.25 9.00043 11.25Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`font-sansMedium text-primaryTextColor text-md`}>Settings</p>
                      </div>
                      <div className={`w-max p-3 pl-6 cursor-pointer flex items-center gap-4`}>
                        <svg className="w-6 h-6" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 13.5V9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9V13.5M4.125 15.75C3.08947 15.75 2.25 14.9105 2.25 13.875V12.375C2.25 11.3395 3.08947 10.5 4.125 10.5C5.16053 10.5 6 11.3395 6 12.375V13.875C6 14.9105 5.16053 15.75 4.125 15.75ZM13.875 15.75C12.8395 15.75 12 14.9105 12 13.875V12.375C12 11.3395 12.8395 10.5 13.875 10.5C14.9105 10.5 15.75 11.3395 15.75 12.375V13.875C15.75 14.9105 14.9105 15.75 13.875 15.75Z" stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className={`font-sansMedium text-primaryTextColor text-md`}>Help Center</p>
                      </div>
                      <div className={`w-full px-3 pt-4 ${sidebarHide? 'md:hidden' : 'md:visible'}`}>
                        <div className="w-full bg-primaryMain/10 p-2 rounded-xl">
                          <div className="w-full flex flex-col gap-4 justify-center bg-upgradeBg px-2 py-4 rounded-lg">
                            <div className="w-full flex items-center gap-2">
                              <Image src='/images/upgrade.svg' width={40} height={40} alt="upgrade"></Image>
                              <p className="text-white font-sansMedium text-lg">Upgrade Plan</p>
                            </div>
                            <Link className='w-full text-center py-2 px-4 bg-primaryBg hover:bg-primaryBg/90 rounded-lg text-black text-md font-sansMedium' href='/pricing'>Click Here</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              {/* side bar end */}

              {/* Dashboard Area */}
                <div className="p-3 relative flex flex-col items-start justify-start gap-y-4 max-w-full flex-grow h-[100%] overflow-y-scroll scrollbar-thin">
                  <h1 onClick={toggleSidebar}>Toggel</h1>
                </div>
              {/* Dashboard Area */}
            </div>
        </section>
    );
}