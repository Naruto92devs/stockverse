'use client';
import Link from "next/link";
import NavLinks from "./NavLinks";
import ThemeSwitch from "./ThemeSwitch";
import { useThemeContext } from '../context/ThemeContext';

const Navbar = () => {

const { svgColor } = useThemeContext();
const oppositeColor = svgColor === "black" ? "white" : "black";

return (
    
    <nav className="w-[100%] h-[100%] flex items-center justify-between py-2 max-lg:py-4 relative select-none">
        <Link href='/' className="w-max nav-logo flex items-center mr-4 gap-2">
            {/* <Image width={1} height={1} className="w-[48px] h-[48px] max-xl:w-[42px] max-xl:h-[42px]" src='/images/stockverse_logo.svg' alt='Stockverse_logo'/> */}
            <svg width="170" height="38.53" viewBox="0 0 180 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56.4 29.7053C55.0546 29.7053 53.7703 29.4994 52.5436 29.0876C51.3168 28.6758 50.3501 28.1418 49.6451 27.4874L50.5787 25.5208C51.2505 26.1089 52.1073 26.5957 53.1508 26.9831C54.1926 27.3705 55.2763 27.5625 56.4035 27.5625C57.4278 27.5625 58.2602 27.4456 58.8989 27.21C59.5375 26.9744 60.0087 26.6516 60.3106 26.2398C60.6125 25.8279 60.7643 25.362 60.7643 24.8403C60.7643 24.2348 60.5671 23.7479 60.1727 23.378C59.7783 23.008 59.2653 22.7096 58.6354 22.4828C58.0054 22.2559 57.3127 22.0588 56.5553 21.8912C55.7997 21.7237 55.0389 21.5265 54.2746 21.2997C53.5103 21.0728 52.8123 20.7832 52.1824 20.4307C51.5524 20.0782 51.0429 19.6035 50.6572 19.0068C50.2698 18.41 50.0779 17.6422 50.0779 16.6999C50.0779 15.7576 50.317 14.9566 50.7968 14.1923C51.275 13.428 52.0148 12.8138 53.0147 12.3513C54.0146 11.8889 55.2867 11.6586 56.8345 11.6586C57.8588 11.6586 58.8762 11.7929 59.8848 12.0617C60.8934 12.3304 61.7676 12.7178 62.5058 13.2221L61.6734 15.2393C60.9178 14.735 60.1186 14.3703 59.2793 14.1434C58.4382 13.9166 57.6233 13.8032 56.8345 13.8032C55.8434 13.8032 55.0285 13.9288 54.3898 14.1818C53.7511 14.4331 53.2852 14.7699 52.9903 15.1904C52.6954 15.611 52.5488 16.0821 52.5488 16.6021C52.5488 17.2234 52.746 17.7207 53.1404 18.0889C53.5347 18.4588 54.0478 18.7537 54.6777 18.9719C55.3077 19.19 56.0004 19.3872 56.7578 19.5634C57.5133 19.7397 58.2742 19.9368 59.0385 20.155C59.8028 20.3731 60.5008 20.6593 61.1307 21.0118C61.7607 21.3642 62.2685 21.8354 62.6558 22.4235C63.0415 23.0115 63.2352 23.7689 63.2352 24.692C63.2352 25.6151 62.9909 26.4108 62.504 27.1751C62.0172 27.9394 61.2651 28.5536 60.2477 29.0161C59.2304 29.4785 57.9496 29.7088 56.4035 29.7088L56.4 29.7053Z" fill={svgColor}/>
            <path d="M72.3075 26.9846C71.8032 27.4034 71.1733 27.6146 70.4159 27.6146C69.7441 27.6146 69.2276 27.4209 68.8664 27.0352C68.5052 26.6479 68.3237 26.0929 68.3237 25.3705V13.2201H65.9034V25.4717C65.9034 26.8154 66.2733 27.8502 67.0132 28.5726C67.7531 29.295 68.7948 29.6562 70.1385 29.6562C70.6934 29.6562 71.2274 29.5812 71.7404 29.4294C72.2534 29.2776 72.6932 29.0437 73.0631 28.7227L72.3075 26.9846ZM69.7581 16.1447L68.3237 18.1358H72.1557V16.1447H69.7581ZM63.6349 16.1447V18.1358H68.3237V16.1447H63.6349Z" fill={svgColor}/>
            <path d="M80.2489 29.6564C78.9035 29.6564 77.7117 29.3632 76.6699 28.7734C75.6282 28.1853 74.8045 27.3739 74.199 26.3409C73.5935 25.3078 73.2916 24.1352 73.2916 22.8247C73.2916 21.5142 73.5935 20.3206 74.199 19.2946C74.8045 18.2702 75.6282 17.4675 76.6699 16.8865C77.7117 16.3071 78.9053 16.0175 80.2489 16.0175C81.5926 16.0175 82.7652 16.3071 83.8157 16.8865C84.8662 17.4658 85.6898 18.265 86.2866 19.2806C86.8834 20.2979 87.1818 21.4776 87.1818 22.8229C87.1818 24.1683 86.8834 25.327 86.2866 26.3531C85.6898 27.3791 84.8662 28.1853 83.8157 28.7734C82.7652 29.3615 81.5769 29.6564 80.2489 29.6564ZM80.2489 27.5379C81.1057 27.5379 81.8753 27.3442 82.5558 26.9586C83.2364 26.5729 83.7703 26.0215 84.156 25.3078C84.5416 24.5941 84.7353 23.7652 84.7353 22.8247C84.7353 21.8841 84.5416 21.0396 84.156 20.3416C83.7686 19.6436 83.2364 19.1026 82.5558 18.7152C81.8753 18.3296 81.1057 18.1359 80.2489 18.1359C79.3921 18.1359 78.6261 18.3296 77.9543 18.7152C77.2824 19.1026 76.745 19.6436 76.3401 20.3416C75.937 21.0396 75.7346 21.8667 75.7346 22.8247C75.7346 23.7827 75.937 24.5941 76.3401 25.3078C76.7432 26.0215 77.2807 26.5729 77.9543 26.9586C78.6261 27.346 79.3904 27.5379 80.2489 27.5379Z" fill={svgColor}/>
            <path d="M95.3486 29.6564C93.9875 29.6564 92.7729 29.3632 91.705 28.7734C90.6371 28.1854 89.8012 27.3792 89.1974 26.3531C88.5919 25.3288 88.29 24.1509 88.29 22.823C88.29 21.495 88.5919 20.3189 89.1974 19.2929C89.803 18.2685 90.6388 17.4658 91.705 16.8848C92.7712 16.3054 93.9857 16.0157 95.3486 16.0157C96.5578 16.0157 97.638 16.2548 98.5873 16.7347C99.5365 17.2128 100.271 17.923 100.793 18.8653L98.952 20.0502C98.514 19.3941 97.9818 18.9124 97.3518 18.6001C96.7219 18.2895 96.0448 18.1342 95.3224 18.1342C94.4481 18.1342 93.6664 18.3279 92.9771 18.7135C92.2878 19.1009 91.7416 19.6419 91.3386 20.3399C90.9355 21.0379 90.733 21.865 90.733 22.823C90.733 23.781 90.9355 24.6134 91.3386 25.3183C91.7416 26.0233 92.2878 26.5712 92.9771 26.9569C93.6664 27.3443 94.4481 27.5362 95.3224 27.5362C96.0448 27.5362 96.7219 27.3809 97.3518 27.0703C97.9818 26.7597 98.5157 26.2763 98.952 25.6202L100.793 26.7806C100.271 27.7055 99.5365 28.4157 98.5873 28.9113C97.638 29.4069 96.5578 29.6547 95.3486 29.6547V29.6564Z" fill={svgColor}/>
            <path d="M115.365 16.1449L109.745 21.6678L107.919 23.2714L105.155 25.854L105.138 25.8697L105.155 29.5046H102.735V10.7999H105.155V22.809L112.441 16.1449H115.365Z" fill={svgColor}/>
            <path d="M122.474 29.5046L114.709 11.8574H117.431L124.565 28.1435H123.001L130.185 11.8574H132.707L124.968 29.5046H122.473H122.474Z" fill={svgColor}/>
            <path d="M138.534 29.6564C137.104 29.6564 135.848 29.3632 134.764 28.7734C133.681 28.1854 132.84 27.3792 132.243 26.3531C131.646 25.3288 131.348 24.1509 131.348 22.823C131.348 21.495 131.637 20.3189 132.217 19.2929C132.796 18.2685 133.595 17.4658 134.611 16.8848C135.628 16.3054 136.775 16.0157 138.052 16.0157C139.329 16.0157 140.488 16.3019 141.481 16.8725C142.472 17.4449 143.25 18.2459 143.812 19.2806C144.376 20.3137 144.657 21.5195 144.657 22.898C144.657 22.9992 144.653 23.1161 144.645 23.2505C144.636 23.3849 144.624 23.5105 144.606 23.6292H133.237V21.8894H143.346L142.364 22.4949C142.381 21.6381 142.203 20.8738 141.835 20.2003C141.465 19.5284 140.957 19.0032 140.31 18.6245C139.663 18.2459 138.91 18.0574 138.054 18.0574C137.197 18.0574 136.466 18.2459 135.81 18.6245C135.153 19.0032 134.642 19.5319 134.272 20.2125C133.902 20.893 133.717 21.6713 133.717 22.5438V22.9469C133.717 23.8386 133.923 24.6325 134.335 25.3288C134.747 26.0268 135.323 26.5677 136.063 26.9551C136.803 27.3425 137.651 27.5345 138.609 27.5345C139.399 27.5345 140.116 27.4001 140.764 27.1314C141.411 26.8627 141.978 26.4596 142.465 25.9221L143.802 27.4856C143.196 28.1906 142.444 28.7298 141.545 29.0997C140.647 29.4697 139.642 29.6547 138.534 29.6547V29.6564Z" fill={svgColor}/>
            <path d="M147.004 29.5045V16.1431H149.323V19.7727L149.096 18.8653C149.466 17.9404 150.087 17.2355 150.961 16.7486C151.836 16.2618 152.911 16.0175 154.188 16.0175V18.3627C154.087 18.3453 153.991 18.3383 153.898 18.3383H153.633C152.338 18.3383 151.314 18.7257 150.558 19.497C149.803 20.27 149.424 21.3886 149.424 22.8491V29.5045H147.004Z" fill={svgColor}/>
            <path d="M160.137 29.6564C159.027 29.6564 157.973 29.5045 156.973 29.2027C155.973 28.9008 155.188 28.5308 154.615 28.0928L155.624 26.1768C156.195 26.5642 156.901 26.8905 157.741 27.1593C158.58 27.428 159.439 27.5624 160.313 27.5624C161.438 27.5624 162.25 27.4036 162.745 27.0842C163.241 26.7649 163.489 26.3199 163.489 25.7476C163.489 25.327 163.337 25.0007 163.035 24.7651C162.733 24.5296 162.334 24.3533 161.838 24.2364C161.342 24.1195 160.791 24.013 160.187 23.9206C159.582 23.8281 158.978 23.7112 158.372 23.5681C157.767 23.425 157.212 23.2243 156.709 22.9625C156.205 22.7025 155.802 22.3413 155.5 21.8789C155.198 21.4165 155.046 20.7987 155.046 20.0257C155.046 19.2527 155.273 18.5128 155.727 17.909C156.181 17.3035 156.823 16.8376 157.655 16.5095C158.488 16.1815 159.474 16.0175 160.617 16.0175C161.491 16.0175 162.377 16.1222 163.276 16.3333C164.175 16.5444 164.911 16.8411 165.482 17.2285L164.449 19.1445C163.843 18.7414 163.213 18.4639 162.559 18.3121C161.903 18.1603 161.248 18.0853 160.592 18.0853C159.533 18.0853 158.742 18.258 158.222 18.6018C157.701 18.9456 157.441 19.387 157.441 19.9245C157.441 20.3782 157.596 20.7272 157.907 20.9715C158.217 21.2158 158.62 21.4043 159.116 21.5386C159.611 21.673 160.163 21.7864 160.767 21.8789C161.372 21.9714 161.976 22.09 162.581 22.2314C163.187 22.3745 163.737 22.5717 164.232 22.8229C164.728 23.0742 165.131 23.4285 165.441 23.8822C165.752 24.3359 165.907 24.9414 165.907 25.697C165.907 26.5031 165.672 27.2011 165.201 27.7892C164.729 28.3773 164.066 28.8362 163.21 29.1625C162.353 29.4906 161.327 29.6546 160.135 29.6546L160.137 29.6564Z" fill={svgColor}/>
            <path d="M173.877 29.6564C172.448 29.6564 171.191 29.3632 170.108 28.7734C169.024 28.1854 168.183 27.3792 167.586 26.3531C166.989 25.3288 166.691 24.1509 166.691 22.823C166.691 21.495 166.981 20.3189 167.56 19.2929C168.139 18.2685 168.938 17.4658 169.954 16.8848C170.971 16.3054 172.118 16.0157 173.395 16.0157C174.673 16.0157 175.831 16.3019 176.824 16.8725C177.815 17.4449 178.594 18.2459 179.155 19.2806C179.719 20.3137 180 21.5195 180 22.898C180 22.9992 179.997 23.1161 179.988 23.2505C179.979 23.3849 179.967 23.5105 179.949 23.6292H168.581V21.8894H178.69L177.707 22.4949C177.725 21.6381 177.547 20.8738 177.178 20.2003C176.808 19.5284 176.301 19.0032 175.653 18.6245C175.006 18.2459 174.254 18.0574 173.397 18.0574C172.54 18.0574 171.809 18.2459 171.153 18.6245C170.497 19.0032 169.985 19.5319 169.616 20.2125C169.246 20.893 169.061 21.6713 169.061 22.5438V22.9469C169.061 23.8386 169.267 24.6325 169.678 25.3288C170.09 26.0268 170.666 26.5677 171.406 26.9551C172.146 27.3425 172.994 27.5345 173.952 27.5345C174.742 27.5345 175.46 27.4001 176.107 27.1314C176.754 26.8627 177.321 26.4596 177.808 25.9221L179.145 27.4856C178.539 28.1906 177.787 28.7298 176.889 29.0997C175.99 29.4697 174.985 29.6547 173.877 29.6547V29.6564Z" fill={svgColor}/>
            <path d="M115.92 29.5046H112.945L108.568 24.0777L107.919 23.2715L111.02 23.2854L115.92 29.5046Z" fill={svgColor}/>
            <path d="M33.2021 0H7.59248C3.39927 0 0 3.39927 0 7.59248V33.2021C0 37.3953 3.39927 40.7946 7.59248 40.7946H33.2021C37.3953 40.7946 40.7946 37.3953 40.7946 33.2021V7.59248C40.7946 3.39927 37.3953 0 33.2021 0Z" fill={svgColor}/>
            <path d="M23.6377 27.5029L23.4004 27.6408L23.6377 27.5029Z" fill={svgColor}/>
            <path d="M32.4674 19.4899V11.6949L20.3972 4.72717L8.32706 11.6949V18.9384L22.4441 27.0893L20.3955 28.2724L8.32532 21.3047V29.0996L20.3955 36.0673L32.4656 29.0996V21.8561L18.3486 13.7052L20.3972 12.5221L32.4674 19.4899ZM9.28158 12.2464L20.3972 5.82827L31.5128 12.2464V14.6126L20.3972 8.21891L9.28158 14.6126V12.2464ZM9.28158 18.3888V16.2634L25.2396 25.4769L23.3986 26.5396L9.28158 18.3888ZM31.5128 28.5481L20.3972 34.9662L9.28158 28.5481V26.1837L20.3972 32.6018L31.5128 26.1837V28.5481ZM31.5128 22.4057V24.5312L15.5548 15.3176L17.3958 14.2549L31.5128 22.4057ZM17.3958 13.1538L17.1568 13.2916L13.6476 15.3176L31.0365 25.3565L20.3972 31.4989L9.28158 25.0808V22.9554L20.3972 29.3718L23.3986 27.639L23.6377 27.5011L27.1469 25.4752L9.75971 15.4362L20.3972 9.31826L31.5128 15.7119V17.8373L20.3972 11.421L17.3958 13.1538Z" fill={oppositeColor}/>
            <path d="M17.3958 13.1537L17.1567 13.2915L17.3958 13.1537Z" fill={svgColor}/>
            </svg>
        </Link>
        <NavLinks/>
        <div className="w-max flex items-center gap-2 max-lg:gap-0">
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
