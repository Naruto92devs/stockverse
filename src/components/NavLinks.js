// src/components/Navbar.js
'use client';
import Link from "next/link";
import SearchBar from "./SearchBar";
import { usePathname } from 'next/navigation';
import { useThemeContext } from '../context/ThemeContext';
// import { useTheme } from 'next-themes';
// import { useState, useEffect } from 'react';

const NavLinks = () => {

    const { svgColor } = useThemeContext();

    const pathname = usePathname();
    const isActive = (path) => pathname === path;


return (
        <div className="w-[60%] max-lg:w-[100%] max-lg:items-end max-lg:shadow-xl max-lg:px-1 max-lg:py-2 max-lg:bg-primaryColor/50 max-lg:justify-between flex items-center gap-1.5 max-xl:gap-0.5 max-lg:fixed max-lg:bottom-0 max-lg:left-0">
            <Link href='/' className="flex flex-col max-lg:gap-1.5 items-center max-lg:p-0 lg:hidden px-4 py-2 text-base max-xl:text-sm text-primaryText rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714" stroke={svgColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={`rounded-full max-lg:py-.2 max-lg:px-2 ${isActive('/') ? 'max-lg:bg-primaryText max-lg:text-primaryTextHover' : ''}`}>Home</span>
            </Link>
            <SearchBar/>
            <Link href='/stockverse-gpt' className="flex flex-col items-center max-lg:gap-1.5 max-lg:p-0 px-4 py-2 text-base max-xl:text-sm text-primaryText lg:hover:bg-primaryText/10 rounded">
                <svg className="absolute -top-5 hidden max-lg:flex" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_374_32)">
                <path d="M39.0665 0H8.93353C3.99968 0 0 3.99968 0 8.93353V39.0665C0 44.0003 3.99968 48 8.93353 48H39.0665C44.0003 48 48 44.0003 48 39.0665V8.93353C48 3.99968 44.0003 0 39.0665 0Z" fill="url(#paint0_linear_374_32)"/>
                <path d="M26.3983 25.5894L26.2217 25.69L26.3983 25.5894Z" fill="black"/>
                <path d="M32.9316 19.6576V13.8901L24.0001 8.73242L15.0686 13.8901V19.251L25.5174 25.2834L24.0021 26.158L15.0707 21.0004V26.7678L24.0021 31.9255L32.9336 26.7678V21.4069L22.4848 15.3746L24.0001 14.4999L32.9316 19.6576ZM15.7749 14.2987L24.0001 9.5496L32.2252 14.2987V16.0501L24.0001 11.3174L15.7749 16.0501V14.2987ZM15.7749 18.8424V17.2697L27.585 24.0884L26.2237 24.8748L15.7749 18.8424ZM32.2273 26.3613L24.0021 31.1104L15.777 26.3613V24.612L24.0021 29.361L32.2273 24.612V26.3613ZM32.2273 21.8155V23.3883L20.4172 16.5695L21.7785 15.7832L32.2273 21.8155ZM21.7785 14.9701L21.6019 15.0727L19.0046 16.5716L31.8741 24.0022L24.0001 28.548L15.7749 23.7989V22.2261L24.0001 26.9752L26.2217 25.692L26.3982 25.5893L28.9955 24.0905L16.1281 16.6619L24.0001 12.1346L32.2252 16.8672V18.44L24.0001 13.6909L21.7785 14.9742V14.9701Z" fill="black"/>
                <path d="M21.7784 14.9702L21.6018 15.0708L21.7784 14.9702Z" fill="black"/>
                <path d="M24.0001 33.4985L15.0686 28.3408V34.1083L24.0001 39.266L32.9316 34.1083V28.3408L24.0001 33.4985ZM32.2273 33.7038L24.0021 38.4529L15.777 33.7038V31.9545L24.0021 36.7036L32.2273 31.9545V33.7038ZM32.2273 31.1373L24.0021 35.8864L15.777 31.1373V29.5645L24.0021 34.3136L32.2273 29.5645V31.1373Z" fill="black"/>
                </g>
                <defs>
                <linearGradient id="paint0_linear_374_32" x1="9.76303" y1="3.30567" x2="41.6289" y2="49.6261" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FAFF"/>
                <stop offset="0.52" stopColor="#8D80C5"/>
                <stop offset="1" stopColor="#CB3596"/>
                </linearGradient>
                <clipPath id="clip0_374_32">
                <rect width="48" height="48" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <span className={`rounded-full max-lg:py-.2 max-lg:px-2 ${isActive('/stockverse-gpt') ? 'max-lg:bg-primaryText max-lg:text-primaryTextHover' : ''}`}>Stocks GPT</span>
            </Link>
            <Link href='/ai-news' className="flex flex-col max-lg:gap-1.5 items-center max-lg:p-0 px-4 py-2 text-base max-xl:text-sm text-primaryText lg:hover:bg-primaryText/10 rounded">
                <svg className="hidden max-lg:flex" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7 9C7 8.44772 7.44772 8 8 8H16C16.5523 8 17 8.44772 17 9C17 9.55228 16.5523 10 16 10H8C7.44772 10 7 9.55228 7 9Z" fill={svgColor}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7 13C7 12.4477 7.44772 12 8 12H12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14H8C7.44772 14 7 13.5523 7 13Z" fill={svgColor}/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6.71963 17.4636C7.07906 17.164 7.53213 17 8 17H19C19.5523 17 20 16.5523 20 16V6C20 5.44771 19.5523 5 19 5H5C4.44772 5 4 5.44772 4 6V19.7299L6.71963 17.4636ZM8 19H19C20.6569 19 22 17.6569 22 16V6C22 4.34315 20.6569 3 19 3H5C3.34315 3 2 4.34315 2 6V19.7299C2 21.4256 3.97771 22.3519 5.28037 21.2664L8 19Z" fill={svgColor}/>
                </svg>
                <span className={`rounded-full max-lg:py-.2 max-lg:px-2 ${isActive('/ai-news') ? 'max-lg:text-primaryTextHover max-lg:bg-primaryText' : ''}`}>News</span>
            </Link>
            <div className="cursor-pointer relative group max-lg:gap-1.5 flex max-lg:p-0 max-lg:flex-col max-lg:items-center items-end px-4 py-2 text-base max-xl:text-sm text-primaryText lg:hover:bg-primaryText/10 rounded group" id="menu-button" aria-expanded="true" aria-haspopup="true">
                <svg className="hidden max-lg:flex" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={svgColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke={svgColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke={svgColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="rounded-full max-lg:py-.2 max-lg:px-2 group-hover:max-lg:bg-primaryText group-hover:max-lg:text-primaryTextHover">Market</span>
                <svg className="-mr-1 h-5 w-5 text-gray-400 max-lg:hidden" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
                <div className="absolute p-2 overflow-hidden top-[80%] left-0 mt-2 w-48 bg-background rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                    <Link href="/gainers&losers">
                        <span className="w-full h-full rounded text-base block px-4 py-2 text-primaryText hover:bg-primaryText/10">Gainers / Losers</span>
                    </Link>
                    <Link href="/level2">
                        <span className="block px-4 py-2 rounded text-base text-primaryText hover:bg-primaryText/10">Level 2</span>
                    </Link>
                    <Link href="/ipo">
                        <span className="block px-4 py-2 rounded text-base text-primaryText hover:bg-primaryText/10">IPO Calender</span>
                    </Link>
                </div>
            </div>
            <Link href='/stockpicks' className="max-lg:hidden flex flex-col items-center max-lg:p-0 px-4 py-2 text-base max-xl:text-sm text-primaryText hover:bg-primaryText/10 rounded">
                <svg className="hidden max-lg:flex" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.97 10H3.97V18C3.97 21 4.97 22 7.97 22H15.97C18.97 22 19.97 21 19.97 18V10Z" stroke={svgColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.5 7V8C21.5 9.1 20.97 10 19.5 10H4.5C2.97 10 2.5 9.1 2.5 8V7C2.5 5.9 2.97 5 4.5 5H19.5C20.97 5 21.5 5.9 21.5 7Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.64 5H6.12C5.78 4.63 5.79 4.06 6.15 3.7L7.57 2.28C7.94 1.91 8.55 1.91 8.92 2.28L11.64 5Z" stroke={svgColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.87 5H12.35L15.07 2.28C15.44 1.91 16.05 1.91 16.42 2.28L17.84 3.7C18.2 4.06 18.21 4.63 17.87 5Z" stroke={svgColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.94 10V15.14C8.94 15.94 9.82 16.41 10.49 15.98L11.43 15.36C11.77 15.14 12.2 15.14 12.53 15.36L13.42 15.96C14.08 16.4 14.97 15.93 14.97 15.13V10H8.94Z" stroke={svgColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Stock Picks</span>
            </Link>
        </div>
);
};

export default NavLinks;