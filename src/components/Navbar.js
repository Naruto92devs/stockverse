// src/components/Navbar.js
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

const Navbar = () => {

return (
    
    <nav className="w-[100%] h-[100%] flex items-center justify-between py-2">
        <Link href='/' className="nav-logo flex items-center gap-2">
            <Image width={1} height={1} className="w-[48px] h-[48px]" src='/images/stockverse_logo.svg' alt='Stockverse_logo'/>
            <span className="text-2xl text-primaryText font-serif font-bold">StockVerse</span>
        </Link>
        <div className="flex gap-2">
            <div className="cursor-pointer relative group flex items-end px-4 py-2 text-base text-primaryText hover:bg-primaryText/10 rounded" id="menu-button" aria-expanded="true" aria-haspopup="true">
                <span>Market</span>
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
                <div className="absolute p-2 overflow-hidden top-[80%] left-0 mt-2 w-48 bg-background rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                <Link href="/page1">
                    <span className="w-full h-full rounded text-base block px-4 py-2 text-primaryText hover:bg-primaryText/10">Gainers / Losers</span>
                </Link>
                <Link href="/page2">
                    <span className="block px-4 py-2 rounded text-base text-primaryText hover:bg-primaryText/10">Level 2</span>
                </Link>
                <Link href="/page3">
                    <span className="block px-4 py-2 rounded text-base text-primaryText hover:bg-primaryText/10">IPO Calender</span>
                </Link>
                </div>
            </div>
            <Link href='/ai-news' className="px-4 py-2 text-base text-primaryText hover:bg-primaryText/10 rounded">
                <svg className="icon hidden max-md:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>News</span>
            </Link>
            <Link href='/stockverse-gpt' className="px-4 py-2 text-base text-primaryText hover:bg-primaryText/10 rounded">
                <svg className="icon hidden max-md:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Stockverse GPT</span>
            </Link>
            <Link href='/membership' className="px-4 py-2 text-base text-primaryText hover:bg-primaryText/10 rounded">
                <svg className="icon hidden max-md:block" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Stock Picks</span>
            </Link>
            <SearchBar/>
        </div>
        <div className="flex items-center gap-4">
            <Link href="/login" className="px-4 py-2 text-base text-primaryButton rounded">
                <span>Login</span>
            </Link> 
            <Link href="/register" className="px-6 py-2 text-base text-primaryButtonText bg-primaryButtonBg hover:bg-primaryButtonBg/90 rounded">
                <span>Register</span>
            </Link>
            <ThemeSwitch/>
        </div>
    </nav>
);
};

export default Navbar;
