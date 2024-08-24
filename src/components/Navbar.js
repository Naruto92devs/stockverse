// src/components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {

return (
    
    <nav className="w-[100%] h-[100%] flex items-center justify-between py-2 max-lg:py-4 relative select-none">
        <Link href='/' className="w-max nav-logo flex items-center mr-4 gap-2">
            <Image width={1} height={1} className="w-[48px] h-[48px] max-xl:w-[42px] max-xl:h-[42px]" src='/images/stockverse_logo.svg' alt='Stockverse_logo'/>
            <span className="text-2xl max-lg:hidden max-xl:text-xl text-primaryText font-serif font-bold">StockVerse</span>
        </Link>
        <NavLinks/>
        <div className="w-max flex items-center gap-2">
            <Link href="/login" className="px-4 py-2 text-base max-xl:text-sm text-primaryButton hover:bg-primaryText/10 rounded">
                <span>Login</span>
            </Link> 
            <Link href="/register" className="px-6 py-2 text-base max-xl:text-sm text-primaryButtonText bg-primaryButtonBg hover:bg-primaryButtonBg/90 rounded-full">
                <span>Register</span>
            </Link>
            <ThemeSwitch/>
        </div>
    </nav>
);
};

export default Navbar;
