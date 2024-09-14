'use client';
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchBar from "./SearchBar";



const Navbar = () => {

const pathname = usePathname();
const isActive = (path) => pathname === path;

const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

const toggleSearchBar = () => {
setIsSearchBarVisible(!isSearchBarVisible);
};

const toggleDropdown = () => {
setIsDropdownVisible(!isDropdownVisible); // Toggle the dropdown
};

// Function to close the search bar
const closeSearchBar = () => {
setIsSearchBarVisible(false);
};

return (
    <nav className="w-[100%]  mx-auto px-6 xl:container max-xl:px-1 flex items-center justify-between py-2 relative select-none">
        <Link href='/' className="w-max nav-logo flex items-center mr-4 gap-2">
            <svg className="max-sm:w-[45vw]" width="170" height="39" viewBox="0 0 170 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2291_2706)">
            <path d="M31.6794 0H7.24428C3.24337 0 0 3.24337 0 7.24428V31.6794C0 35.6803 3.24337 38.9236 7.24428 38.9236H31.6794C35.6803 38.9236 38.9236 35.6803 38.9236 31.6794V7.24428C38.9236 3.24337 35.6803 0 31.6794 0Z" fill="var(--svg-color)"/>
            <path d="M22.0858 21.2001L21.8927 21.3099L22.0858 21.2001Z" fill="var(--svg-color)"/>
            <path d="M29.2319 14.7133V8.4031L19.4618 2.76218L9.69179 8.4031V14.2671L21.1201 20.8654L19.4618 21.8228L9.69179 16.1818V22.4921L19.4618 28.133L29.2319 22.4921V16.628L17.8035 10.0298L19.4618 9.07242L29.2319 14.7133ZM10.4643 8.84931L19.4618 3.65294L28.4593 8.84931V10.764L19.4618 5.58764L10.4643 10.764V8.84931ZM10.4643 13.8209V12.101L23.3828 19.5601L21.8927 20.4208L10.4643 13.8226V13.8209ZM28.461 22.0442L19.4635 27.2406L10.466 22.0442V20.1295L19.4635 25.3242L28.461 20.1295V22.0442ZM28.461 17.0726V18.7925L15.5425 11.3334L17.0326 10.4727L28.461 17.0709V17.0726ZM17.031 9.58356L16.8378 9.69512L13.9974 11.3351L28.0747 19.4618L19.4618 24.4351L10.4643 19.2387V17.5188L19.4618 22.7135L21.8927 21.3099L22.0858 21.1984L24.9263 19.5584L10.8506 11.4317L19.4618 6.4784L28.4593 11.6548V13.3747L19.4618 8.17999L17.031 9.58356Z" fill="var(--opposite-svg-color)"/>
            <path d="M17.031 9.58356L16.8378 9.69512L17.031 9.58356Z" fill="var(--svg-color)"/>
            <path d="M19.4618 29.8529L9.69179 24.212V30.5222L19.4618 36.1631L29.2319 30.5222V24.212L19.4618 29.8529ZM28.461 30.076L19.4635 35.2707L10.466 30.076V28.1613L19.4635 33.356L28.461 28.1613V30.076ZM28.461 27.2689L19.4635 32.4636L10.466 27.2689V25.549L19.4635 30.7437L28.461 25.549V27.2689Z" fill="var(--opposite-svg-color)"/>
            </g>
            <g clipPath="url(#clip1_2291_2706)">
            <path d="M52.0669 28.5292C50.7832 28.5292 49.5578 28.3328 48.3873 27.9398C47.2169 27.5469 46.2945 27.0374 45.6218 26.4131L46.5126 24.5366C47.1536 25.0977 47.9711 25.5623 48.9667 25.9319C49.9607 26.3015 50.9947 26.4847 52.0702 26.4847C53.0476 26.4847 53.8418 26.3731 54.4511 26.1483C55.0605 25.9236 55.5101 25.6155 55.7981 25.2226C56.0861 24.8297 56.231 24.3851 56.231 23.8873C56.231 23.3096 56.0429 22.845 55.6666 22.4921C55.2903 22.1391 54.8008 21.8544 54.1997 21.6379C53.5987 21.4215 52.9377 21.2334 52.2151 21.0735C51.4942 20.9137 50.7682 20.7255 50.039 20.5091C49.3097 20.2926 48.6437 20.0163 48.0427 19.6799C47.4416 19.3436 46.9555 18.8907 46.5875 18.3213C46.2179 17.7519 46.0347 17.0193 46.0347 16.1202C46.0347 15.2211 46.2628 14.4569 46.7207 13.7277C47.1769 12.9984 47.8828 12.4123 48.8369 11.9711C49.7909 11.5299 51.0047 11.3101 52.4815 11.3101C53.4588 11.3101 54.4295 11.4383 55.3918 11.6947C56.3542 11.9511 57.1884 12.3208 57.8926 12.8019L57.0984 14.7267C56.3775 14.2455 55.615 13.8975 54.8141 13.6811C54.0116 13.4646 53.234 13.3564 52.4815 13.3564C51.5358 13.3564 50.7582 13.4763 50.1489 13.7177C49.5395 13.9574 49.0949 14.2788 48.8136 14.68C48.5322 15.0813 48.3923 15.5308 48.3923 16.027C48.3923 16.6197 48.5805 17.0942 48.9567 17.4455C49.333 17.7985 49.8225 18.0799 50.4236 18.288C51.0246 18.4961 51.6856 18.6843 52.4082 18.8524C53.1292 19.0206 53.8551 19.2087 54.5843 19.4169C55.3136 19.625 55.9796 19.898 56.5806 20.2344C57.1817 20.5707 57.6662 21.0202 58.0358 21.5813C58.4038 22.1424 58.5886 22.865 58.5886 23.7458C58.5886 24.6266 58.3555 25.3858 57.891 26.115C57.4264 26.8443 56.7088 27.4304 55.7382 27.8716C54.7675 28.3128 53.5454 28.5326 52.0702 28.5326L52.0669 28.5292Z" fill="var(--svg-color)"/>
            <path d="M67.2448 25.9319C66.7636 26.3315 66.1625 26.5329 65.4399 26.5329C64.7989 26.5329 64.3061 26.3481 63.9614 25.9802C63.6168 25.6106 63.4436 25.0811 63.4436 24.3918V12.7986H61.1343V24.4884C61.1343 25.7704 61.4873 26.7577 62.1932 27.447C62.8992 28.1363 63.8932 28.481 65.1752 28.481C65.7047 28.481 66.2141 28.4094 66.7036 28.2645C67.1931 28.1197 67.6127 27.8966 67.9657 27.5902L67.2448 25.9319ZM64.8122 15.5891L63.4436 17.4888H67.0999V15.5891H64.8122ZM58.9682 15.5891V17.4888H63.442V15.5891H58.9682Z" fill="var(--svg-color)"/>
            <path d="M74.8204 28.481C73.5367 28.481 72.3995 28.2012 71.4055 27.6385C70.4115 27.0774 69.6257 26.3032 69.0479 25.3175C68.4702 24.3319 68.1821 23.213 68.1821 21.9626C68.1821 20.7122 68.4702 19.5734 69.0479 18.5944C69.6257 17.617 70.4115 16.8511 71.4055 16.2967C72.3995 15.7439 73.5384 15.4676 74.8204 15.4676C76.1024 15.4676 77.2213 15.7439 78.2236 16.2967C79.2259 16.8495 80.0117 17.612 80.5812 18.5811C81.1506 19.5517 81.4353 20.6772 81.4353 21.9609C81.4353 23.2446 81.1506 24.3502 80.5812 25.3292C80.0117 26.3082 79.2259 27.0774 78.2236 27.6385C77.2213 28.1996 76.0874 28.481 74.8204 28.481ZM74.8204 26.4597C75.6379 26.4597 76.3721 26.2749 77.0215 25.9069C77.6708 25.539 78.1803 25.0128 78.5482 24.3319C78.9162 23.6509 79.101 22.86 79.101 21.9626C79.101 21.0652 78.9162 20.2593 78.5482 19.5934C78.1786 18.9274 77.6708 18.4112 77.0215 18.0416C76.3721 17.6736 75.6379 17.4888 74.8204 17.4888C74.0029 17.4888 73.272 17.6736 72.6309 18.0416C71.9899 18.4112 71.4771 18.9274 71.0908 19.5934C70.7062 20.2593 70.5131 21.0485 70.5131 21.9626C70.5131 22.8767 70.7062 23.6509 71.0908 24.3319C71.4755 25.0128 71.9883 25.539 72.6309 25.9069C73.272 26.2765 74.0012 26.4597 74.8204 26.4597Z" fill="var(--svg-color)"/>
            <path d="M89.229 28.481C87.9303 28.481 86.7715 28.2012 85.7526 27.6385C84.7336 27.0774 83.9361 26.3082 83.36 25.3292C82.7823 24.3518 82.4942 23.228 82.4942 21.9609C82.4942 20.6939 82.7823 19.5717 83.36 18.5927C83.9377 17.6154 84.7353 16.8495 85.7526 16.2951C86.7699 15.7423 87.9287 15.4659 89.229 15.4659C90.3828 15.4659 91.4135 15.694 92.3192 16.1519C93.2249 16.6081 93.9259 17.2857 94.4237 18.1848L92.6672 19.3153C92.2493 18.6893 91.7415 18.2297 91.1404 17.9317C90.5393 17.6354 89.8933 17.4872 89.204 17.4872C88.3699 17.4872 87.624 17.672 86.9663 18.0399C86.3087 18.4096 85.7875 18.9257 85.4029 19.5917C85.0183 20.2577 84.8252 21.0469 84.8252 21.9609C84.8252 22.875 85.0183 23.6692 85.4029 24.3418C85.7875 25.0145 86.3087 25.5373 86.9663 25.9053C87.624 26.2749 88.3699 26.458 89.204 26.458C89.8933 26.458 90.5393 26.3098 91.1404 26.0135C91.7415 25.7171 92.2509 25.2559 92.6672 24.6299L94.4237 25.7371C93.9259 26.6195 93.2249 27.2972 92.3192 27.77C91.4135 28.2429 90.3828 28.4793 89.229 28.4793V28.481Z" fill="var(--svg-color)"/>
            <path d="M108.328 15.5891L102.965 20.8587L101.223 22.3888L98.5845 24.853L98.5695 24.868L98.5845 28.3361H96.2768V10.4893H98.5845V21.9476L105.536 15.5891H108.328Z" fill="var(--svg-color)"/>
            <path d="M115.111 28.3361L107.702 11.4999H110.299L117.106 27.0391H115.614L122.47 11.4999H124.876L117.492 28.3378H115.111V28.3361Z" fill="var(--svg-color)"/>
            <path d="M130.432 28.481C129.068 28.481 127.87 28.2012 126.836 27.6385C125.802 27.0774 124.999 26.3082 124.43 25.3292C123.86 24.3518 123.576 23.228 123.576 21.9609C123.576 20.6939 123.852 19.5717 124.405 18.5927C124.958 17.6154 125.72 16.8495 126.689 16.2951C127.66 15.7423 128.754 15.4659 129.972 15.4659C131.191 15.4659 132.297 15.739 133.244 16.2834C134.19 16.8295 134.932 17.5937 135.469 18.5811C136.006 19.5667 136.274 20.7172 136.274 22.0325C136.274 22.1291 136.271 22.2407 136.263 22.3689C136.254 22.4971 136.243 22.6169 136.226 22.7302H125.379V21.0702H135.024L134.087 21.6479C134.103 20.8304 133.933 20.1012 133.582 19.4585C133.229 18.8175 132.745 18.3163 132.127 17.955C131.509 17.5937 130.792 17.4139 129.974 17.4139C129.157 17.4139 128.459 17.5937 127.833 17.955C127.207 18.3163 126.719 18.8208 126.366 19.4701C126.013 20.1195 125.837 20.8621 125.837 21.6945V22.0792C125.837 22.93 126.033 23.6875 126.426 24.3518C126.819 25.0178 127.368 25.534 128.074 25.9036C128.78 26.2732 129.59 26.4564 130.504 26.4564C131.258 26.4564 131.942 26.3282 132.56 26.0717C133.178 25.8153 133.719 25.4307 134.183 24.9179L135.459 26.4097C134.881 27.0824 134.163 27.5969 133.306 27.9498C132.448 28.3028 131.489 28.4793 130.432 28.4793V28.481Z" fill="var(--svg-color)"/>
            <path d="M138.514 28.3361V15.5891H140.727V19.0522L140.51 18.1865C140.863 17.304 141.456 16.6314 142.29 16.1668C143.124 15.7023 144.15 15.4692 145.368 15.4692V17.7069C145.272 17.6903 145.18 17.6836 145.092 17.6836H144.839C143.604 17.6836 142.626 18.0533 141.905 18.7892C141.184 19.5268 140.823 20.594 140.823 21.9876V28.3378H138.514V28.3361Z" fill="var(--svg-color)"/>
            <path d="M151.046 28.481C149.987 28.481 148.981 28.3361 148.027 28.0481C147.073 27.76 146.324 27.4071 145.778 26.9891L146.74 25.161C147.285 25.5306 147.959 25.842 148.76 26.0984C149.561 26.3548 150.38 26.483 151.214 26.483C152.288 26.483 153.062 26.3315 153.535 26.0268C154.008 25.7221 154.244 25.2975 154.244 24.7514C154.244 24.3502 154.1 24.0388 153.811 23.814C153.523 23.5893 153.142 23.4211 152.669 23.3096C152.196 23.198 151.67 23.0964 151.094 23.0082C150.517 22.92 149.94 22.8084 149.363 22.6719C148.785 22.5354 148.255 22.3439 147.776 22.0941C147.295 21.8461 146.91 21.5014 146.622 21.0602C146.334 20.619 146.189 20.0296 146.189 19.292C146.189 18.5544 146.406 17.8485 146.839 17.2724C147.271 16.6946 147.884 16.2501 148.678 15.9371C149.473 15.6241 150.413 15.4676 151.504 15.4676C152.338 15.4676 153.184 15.5675 154.041 15.7689C154.899 15.9704 155.601 16.2534 156.146 16.623L155.16 18.4512C154.582 18.0666 153.981 17.8018 153.357 17.657C152.731 17.5121 152.107 17.4405 151.481 17.4405C150.47 17.4405 149.716 17.6054 149.22 17.9334C148.722 18.2614 148.474 18.6826 148.474 19.1954C148.474 19.6283 148.622 19.9613 148.918 20.1944C149.215 20.4275 149.599 20.6073 150.072 20.7355C150.545 20.8637 151.071 20.9719 151.647 21.0602C152.225 21.1484 152.801 21.2617 153.379 21.3965C153.956 21.533 154.481 21.7212 154.954 21.9609C155.427 22.2007 155.811 22.5387 156.107 22.9716C156.404 23.4045 156.552 23.9822 156.552 24.7031C156.552 25.4724 156.327 26.1383 155.878 26.6994C155.428 27.2605 154.795 27.6984 153.978 28.0098C153.16 28.3228 152.181 28.4793 151.044 28.4793L151.046 28.481Z" fill="var(--svg-color)"/>
            <path d="M164.154 28.481C162.791 28.481 161.592 28.2012 160.558 27.6385C159.524 27.0774 158.721 26.3082 158.152 25.3292C157.583 24.3518 157.298 23.228 157.298 21.9609C157.298 20.6939 157.574 19.5717 158.127 18.5927C158.68 17.6154 159.442 16.8495 160.411 16.2951C161.382 15.7423 162.476 15.4659 163.695 15.4659C164.914 15.4659 166.019 15.739 166.966 16.2834C167.912 16.8295 168.655 17.5937 169.191 18.5811C169.729 19.5667 169.997 20.7172 169.997 22.0325C169.997 22.1291 169.993 22.2407 169.985 22.3689C169.977 22.4971 169.965 22.6169 169.948 22.7302H159.101V21.0702H168.746L167.809 21.6479C167.826 20.8304 167.656 20.1012 167.304 19.4585C166.951 18.8175 166.467 18.3163 165.849 17.955C165.232 17.5937 164.514 17.4139 163.696 17.4139C162.879 17.4139 162.181 17.5937 161.555 17.955C160.929 18.3163 160.441 18.8208 160.088 19.4701C159.735 20.1195 159.559 20.8621 159.559 21.6945V22.0792C159.559 22.93 159.755 23.6875 160.148 24.3518C160.541 25.0178 161.091 25.534 161.797 25.9036C162.503 26.2732 163.312 26.4564 164.226 26.4564C164.98 26.4564 165.664 26.3282 166.282 26.0717C166.9 25.8153 167.441 25.4307 167.905 24.9179L169.181 26.4097C168.603 27.0824 167.885 27.5969 167.028 27.9498C166.171 28.3028 165.212 28.4793 164.154 28.4793V28.481Z" fill="var(--svg-color)"/>
            <path d="M108.856 28.3361H106.017L101.841 23.1581L101.223 22.3888L104.18 22.4022L108.856 28.3361Z" fill="var(--svg-color)"/>
            </g>
            <defs>
            <clipPath id="clip0_2291_2706">
            <rect width="38.9236" height="38.9236" fill="var(--svg-color)"/>
            </clipPath>
            <clipPath id="clip1_2291_2706">
            <rect width="124.38" height="18.0399" fill="var(--svg-color)" transform="translate(45.6201 10.4893)"/>
            </clipPath>
            </defs>
            </svg>
        </Link>
        <SearchBar isVisible={isSearchBarVisible} onClose={closeSearchBar}/>
        <div className="lg:ml-4 z-20 w-[60%] max-lg:w-[100%] max-lg:items-end max-lg:shadow-xl max-lg:px-2 max-lg:py-2 max-lg:bg-mobNavBg max-lg:justify-between flex items-center gap-1.5 max-xl:gap-0.5 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0">
            <Link href='/' className="z-50 max-sm:text-[3.6vw] flex flex-col font-medium max-lg:gap-1.5 items-center max-lg:p-0 lg:hidden px-4 py-2 text-base max-xl:text-sm text-primaryText rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714" stroke="rgba(var(--mob-nav-link))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={`rounded-full max-lg:text-mobNavLink max-lg:py-.2 max-lg:px-2 ${isActive('/') ? 'max-lg:bg-mobNavLink max-lg:!text-mobNavBg' : ''}`}>Home</span>
            </Link>
            <Link href=''  onClick={toggleSearchBar} className="z-50 max-sm:text-[3.6vw] font-medium hidden max-lg:flex flex-col max-lg:gap-1.5 items-center max-lg:px-0 text-base max-xl:text-sm text-primaryText rounded group">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                        stroke="rgba(var(--mob-nav-link))" // Use strokeColor state here
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20.9999 20.9999L16.6499 16.6499"
                        stroke="rgba(var(--mob-nav-link))" // Use strokeColor state here
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <span className={`rounded-full max-lg:text-mobNavLink max-lg:py-.2 max-lg:px-2 ${isSearchBarVisible ? 'max-lg:bg-mobNavLink max-lg:!text-mobNavBg' : ''}`}>
                    Search
                </span>
            </Link>
            <Link href='/stockverse-gpt' className="z-50 flex flex-col max-sm:text-[3.6vw] font-medium items-center max-lg:gap-1.5 max-lg:p-0 px-4 py-2 text-base max-xl:text-sm text-primaryText lg:hover:bg-primaryText/10 rounded">
                <svg className="absolute -top-7 hidden max-lg:flex" width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_374_40)">
                <path d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24Z" fill="rgba(var(--mob-nav-bg))" fillOpacity="1"/>
                <path d="M26.3983 25.5894L26.2217 25.69L26.3983 25.5894Z" fill="url(#paint0_linear_374_40)"/>
                <path d="M32.9316 19.6576V13.8901L24.0001 8.73242L15.0686 13.8901V19.251L25.5174 25.2834L24.0021 26.158L15.0707 21.0004V26.7678L24.0021 31.9255L32.9336 26.7678V21.4069L22.4848 15.3746L24.0001 14.4999L32.9316 19.6576ZM15.7749 14.2987L24.0001 9.5496L32.2252 14.2987V16.0501L24.0001 11.3174L15.7749 16.0501V14.2987ZM15.7749 18.8424V17.2697L27.585 24.0884L26.2237 24.8748L15.7749 18.8424ZM32.2273 26.3613L24.0021 31.1104L15.777 26.3613V24.612L24.0021 29.361L32.2273 24.612V26.3613ZM32.2273 21.8155V23.3883L20.4172 16.5695L21.7785 15.7832L32.2273 21.8155ZM21.7785 14.9701L21.6019 15.0727L19.0046 16.5716L31.8741 24.0022L24.0001 28.548L15.7749 23.7989V22.2261L24.0001 26.9752L26.2217 25.692L26.3982 25.5893L28.9955 24.0905L16.1281 16.6619L24.0001 12.1346L32.2252 16.8672V18.44L24.0001 13.6909L21.7785 14.9742V14.9701Z" fill="url(#paint1_linear_374_40)"/>
                <path d="M21.7784 14.9702L21.6018 15.0708L21.7784 14.9702Z" fill="url(#paint2_linear_374_40)"/>
                <path d="M24.0001 33.4985L15.0686 28.3408V34.1083L24.0001 39.266L32.9316 34.1083V28.3408L24.0001 33.4985ZM32.2273 33.7038L24.0021 38.4529L15.777 33.7038V31.9545L24.0021 36.7036L32.2273 31.9545V33.7038ZM32.2273 31.1373L24.0021 35.8864L15.777 31.1373V29.5645L24.0021 34.3136L32.2273 29.5645V31.1373Z" fill="url(#paint3_linear_374_40)"/>
                </g>
                <defs>
                <linearGradient id="paint0_linear_374_40" x1="31.0057" y1="11.9169" x2="22.4642" y2="36.8842" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FAFF"/>
                <stop offset="0.52" stopColor="#8D80C5"/>
                <stop offset="1" stopColor="#CB3596"/>
                </linearGradient>
                <linearGradient id="paint1_linear_374_40" x1="27.3119" y1="10.6522" x2="18.7705" y2="35.6192" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FAFF"/>
                <stop offset="0.52" stopColor="#8D80C5"/>
                <stop offset="1" stopColor="#CB3596"/>
                </linearGradient>
                <linearGradient id="paint2_linear_374_40" x1="23.616" y1="9.38961" x2="15.0747" y2="34.3566" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FAFF"/>
                <stop offset="0.52" stopColor="#8D80C5"/>
                <stop offset="1" stopColor="#CB3596"/>
                </linearGradient>
                <linearGradient id="paint3_linear_374_40" x1="30.6484" y1="11.794" x2="22.107" y2="36.761" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00FAFF"/>
                <stop offset="0.52" stopColor="#8D80C5"/>
                <stop offset="1" stopColor="#CB3596"/>
                </linearGradient>
                <clipPath id="clip0_374_40">
                <rect width="48" height="48" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <span className={`rounded-full max-lg:text-mobNavLink max-lg:py-.2 max-lg:px-2 ${isActive('/stockverse-gpt') ? 'max-lg:bg-mobNavLink max-lg:!text-mobNavBg' : ''}`}>StockVerse GPT</span>
            </Link>
            <Link href='/news' className="z-50 flex flex-col max-sm:text-[3.6vw] font-medium max-lg:gap-1.5 items-center max-lg:p-0 px-4 py-2 text-base max-xl:text-sm text-primaryText lg:hover:bg-primaryText/10 rounded">
                <svg className="hidden max-lg:flex" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7 9C7 8.44772 7.44772 8 8 8H16C16.5523 8 17 8.44772 17 9C17 9.55228 16.5523 10 16 10H8C7.44772 10 7 9.55228 7 9Z" fill="rgba(var(--mob-nav-link))"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7 13C7 12.4477 7.44772 12 8 12H12C12.5523 12 13 12.4477 13 13C13 13.5523 12.5523 14 12 14H8C7.44772 14 7 13.5523 7 13Z" fill="rgba(var(--mob-nav-link))"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6.71963 17.4636C7.07906 17.164 7.53213 17 8 17H19C19.5523 17 20 16.5523 20 16V6C20 5.44771 19.5523 5 19 5H5C4.44772 5 4 5.44772 4 6V19.7299L6.71963 17.4636ZM8 19H19C20.6569 19 22 17.6569 22 16V6C22 4.34315 20.6569 3 19 3H5C3.34315 3 2 4.34315 2 6V19.7299C2 21.4256 3.97771 22.3519 5.28037 21.2664L8 19Z" fill="rgba(var(--mob-nav-link))"/>
                </svg>
                <span className={`rounded-full max-lg:text-mobNavLink max-lg:py-.2 max-lg:px-2 ${isActive('/news') ? 'max-lg:bg-mobNavLink max-lg:!text-mobNavBg' : ''}`}>News</span>
            </Link>
            <div className="cursor-pointer lg:relative group max-sm:text-[3.6vw] font-medium max-lg:gap-1.5 flex max-lg:p-0 max-lg:flex-col max-lg:items-center items-end px-4 py-2 text-base max-xl:text-sm text-primaryText lg:hover:bg-primaryText/10 rounded group" onClick={toggleDropdown} id="menu-button" aria-expanded="true" aria-haspopup="true">
                <svg className="z-50 hidden max-lg:flex" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="rgba(var(--mob-nav-link))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="rgba(var(--mob-nav-link))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="rgba(var(--mob-nav-link))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={`z-50 rounded-full max-lg:text-mobNavLink max-lg:py-.2 max-lg:px-2 ${isDropdownVisible ? 'max-lg:bg-mobNavLink max-lg:!text-mobNavBg' : ''}`}>Market</span>
                <svg className="z-50 -mr-1 h-5 w-5 text-gray-400 max-lg:hidden" viewBox="0 0 20 20" fill="var(--svg-color)" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
                <div className={`absolute p-2 max-lg:shadow-none max-lg:w-full max-lg:pb-8 max-lg:left-[0%] max-lg:bg-mobNavBg max-lg:rounded-2xl max-lg:z-10 max-lg:-top-[280%] overflow-hidden top-[80%] left-0 mt-2 w-48 bg-background rounded-md shadow-xl transition-opacity duration-0 ${isDropdownVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <Link href="/gainers&losers">
                        <span className="w-full h-full font-medium max-lg:text-mobNavLink rounded text-base block px-4 py-2 text-primaryText hover:bg-primaryText/10">Gainers / Losers</span>
                    </Link>
                    <Link href="/level2">
                        <span className="block px-4 py-2 font-medium max-lg:text-mobNavLink rounded text-base text-primaryText hover:bg-primaryText/10">Level 2</span>
                    </Link>
                    <Link href="/ipo">
                        <span className="block px-4 py-2 font-medium max-lg:text-mobNavLink rounded text-base text-primaryText hover:bg-primaryText/10">IPO Calender</span>
                    </Link>
                    <Link href="/stockpicks" className="hidden max-lg:flex">
                        <span className="block w-full font-medium px-4 py-2 max-lg:text-mobNavLink rounded text-base text-primaryText hover:bg-primaryText/10">Stock Picks</span>
                    </Link>
                </div>
            </div>
            <Link href='/stockpicks' className="max-lg:hidden flex flex-col items-center max-lg:p-0 px-4 py-2 text-base font-medium max-xl:text-sm text-primaryText hover:bg-primaryText/10 rounded">
                <svg className="hidden max-lg:flex" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.97 10H3.97V18C3.97 21 4.97 22 7.97 22H15.97C18.97 22 19.97 21 19.97 18V10Z" stroke="var(--svg-color)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.5 7V8C21.5 9.1 20.97 10 19.5 10H4.5C2.97 10 2.5 9.1 2.5 8V7C2.5 5.9 2.97 5 4.5 5H19.5C20.97 5 21.5 5.9 21.5 7Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.64 5H6.12C5.78 4.63 5.79 4.06 6.15 3.7L7.57 2.28C7.94 1.91 8.55 1.91 8.92 2.28L11.64 5Z" stroke="var(--svg-color)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.87 5H12.35L15.07 2.28C15.44 1.91 16.05 1.91 16.42 2.28L17.84 3.7C18.2 4.06 18.21 4.63 17.87 5Z" stroke="var(--svg-color)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.94 10V15.14C8.94 15.94 9.82 16.41 10.49 15.98L11.43 15.36C11.77 15.14 12.2 15.14 12.53 15.36L13.42 15.96C14.08 16.4 14.97 15.93 14.97 15.13V10H8.94Z" stroke="var(--svg-color)" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Stock Picks</span>
            </Link>
        </div>
        <div className="w-max flex items-center gap-2 max-lg:gap-1">
            <Link href="/login" className="px-4 py-2 max-sm:px-[4vw] max-sm:text-[3.5vw] text-base max-xl:text-sm text-primaryButton hover:bg-primaryText/10 rounded-full">
                <span>Login</span>
            </Link> 
            <Link href="/register" className="px-6 py-2 max-sm:px-[6vw] max-sm:text-[3.5vw] text-base max-xl:text-sm text-primaryButtonText bg-primaryButtonBg hover:bg-primaryButtonBg/90 rounded-full">
                <span>Register</span>
            </Link>
            <ThemeSwitch/>
        </div>
    </nav>
);
};

export default Navbar;
