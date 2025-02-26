'use client';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import Disclaimer from "@/components/Article_disclaimer";

const BARCHATNEOV = () => {

    const pressReleaseUrl = `https://stockverse.com/news/neov-barchat`; // The current URL

    const handleFacebookShare = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pressReleaseUrl)}`;
        window.open(
        facebookShareUrl,
        'facebook-share-dialog',
        'width=626,height=436'
        );
    };

      // Function to share on Twitter
    const handleTwitterShare = () => {
        const twitterShareUrl = `https://twitter.com/share?url=${encodeURIComponent(
        pressReleaseUrl
        )}&text=Check%20out%20this%20press%20release!`;
        window.open(twitterShareUrl, 'twitter-share-dialog', 'width=626,height=436');
    };

    // Function to share on LinkedIn
    const handleLinkedInShare = () => {
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        pressReleaseUrl
        )}`;
        window.open(linkedInShareUrl, 'linkedin-share-dialog', 'width=626,height=436');
    };

    // Function to share via Email
    const handleEmailShare = () => {
        const subject = 'Check out this Press Release';
        const body = `I thought you might find this press release interesting: ${pressReleaseUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(
        subject
        )}&body=${encodeURIComponent(body)}`;
    };

     // Function to print the page
    const handlePrint = () => {
        window.print();
    };

    return (
        <>
          <div className="xl:container mx-auto sticky top-24 xl:px-10 xl:py-4 max-sm:hidden">
                <a href="/dashboard?view=news" className="font-sansMedium text-base 2xl:text-xl flex items-center w-max justify-start gap-4">
                    <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to news
                </a>
            </div>
          <div className="w-full h-full mx-auto xl:container lg:px-[15%] max-xl:px-3">
            <div className="py-8 gap-y-6">
                <h1 className="text-4xl 2xl:text-5xl font-sansMedium max-sm:text-[1.6rem]  text-left text-primaryText  leading-[140%] 2xl:leading-[140%]">NeoVolta - Small Cap Making Big Promises</h1>
            </div>
            <div className="pt-8 lg:pt-4 flex flex-col sm:flex-row gap-y-6 justify-between items-start sm:items-center border-t border-[#404040]">
                <Link href='/dashboard?view=news' className=" leading-[110%] 2xl:text-xl text-sm font-sansMedium text-[#634FF7]">Nov 13, 2024 by Stockverse</Link>
                <div className="">
                    <p className="text-base  text-primaryText leading-[110%]">SHARE THIS ARTICLE</p>
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        <svg onClick={handleFacebookShare} className="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.3334 21.5866C29.3334 26.44 26.4401 29.3333 21.5868 29.3333H20.0001C19.2667 29.3333 18.6667 28.7333 18.6667 28V20.3066C18.6667 19.9466 18.9601 19.64 19.3201 19.64L21.6667 19.6C21.8534 19.5866 22.0134 19.4533 22.0534 19.2666L22.5201 16.72C22.5601 16.48 22.3734 16.2533 22.1201 16.2533L19.2801 16.2933C18.9067 16.2933 18.6134 16 18.6001 15.64L18.5468 12.3733C18.5468 12.16 18.7201 11.9733 18.9467 11.9733L22.1467 11.92C22.3734 11.92 22.5468 11.7466 22.5468 11.52L22.4934 8.31995C22.4934 8.09328 22.3201 7.91996 22.0934 7.91996L18.4934 7.97331C16.2801 8.01331 14.5201 9.82662 14.5601 12.04L14.6268 15.7066C14.6401 16.08 14.3468 16.3733 13.9734 16.3866L12.3734 16.4133C12.1467 16.4133 11.9734 16.5866 11.9734 16.8133L12.0134 19.3466C12.0134 19.5733 12.1867 19.7466 12.4134 19.7466L14.0134 19.72C14.3868 19.72 14.6801 20.0133 14.6934 20.3733L14.8134 27.9733C14.8267 28.72 14.2267 29.3333 13.4801 29.3333H10.4134C5.56008 29.3333 2.66675 26.44 2.66675 21.5733V10.4133C2.66675 5.55996 5.56008 2.66663 10.4134 2.66663H21.5868C26.4401 2.66663 29.3334 5.55996 29.3334 10.4133V21.5866V21.5866Z" fill="black"/>
                        </svg>
                        <svg onClick={handleLinkedInShare} className="cursor-pointer" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.6667 9.33331C20.5233 9.33331 22.3037 10.0708 23.6165 11.3836C24.9293 12.6963 25.6667 14.4768 25.6667 16.3333V24.5H21.0001V16.3333C21.0001 15.7145 20.7542 15.121 20.3167 14.6834C19.8791 14.2458 19.2856 14 18.6667 14C18.0479 14 17.4544 14.2458 17.0168 14.6834C16.5792 15.121 16.3334 15.7145 16.3334 16.3333V24.5H11.6667V16.3333C11.6667 14.4768 12.4042 12.6963 13.717 11.3836C15.0298 10.0708 16.8102 9.33331 18.6667 9.33331V9.33331Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.99992 10.5H2.33325V24.5H6.99992V10.5Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.66659 6.99998C5.95525 6.99998 6.99992 5.95531 6.99992 4.66665C6.99992 3.37798 5.95525 2.33331 4.66659 2.33331C3.37792 2.33331 2.33325 3.37798 2.33325 4.66665C2.33325 5.95531 3.37792 6.99998 4.66659 6.99998Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <svg onClick={handleTwitterShare} className="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.8088 11.5123C26.7769 11.2143 26.7396 10.9755 26.7089 10.8054L29.2215 7.03643C29.3795 6.79946 29.3695 6.4883 29.1966 6.26196C29.0237 6.03563 28.7262 5.94411 28.456 6.03417L24.9617 7.19891C24.7771 6.9235 24.5032 6.56022 24.1382 6.19522C23.3989 5.45589 22.2393 4.66663 20.6668 4.66663C19.0367 4.66663 17.8303 5.12287 16.9689 5.87189C16.1164 6.61322 15.6667 7.58488 15.4367 8.50494C15.207 9.42381 15.1865 10.3281 15.2197 10.9916C15.2294 11.1851 15.2437 11.3602 15.2593 11.5117C13.5858 11.8676 11.8346 11.3225 10.1192 10.3044C8.2276 9.18184 6.49361 7.55064 5.13819 6.19522C4.9502 6.00723 4.66849 5.94891 4.42132 6.0468C4.17414 6.14469 4.00875 6.38008 4.00045 6.6458C3.83058 12.0816 4.95125 18.661 10.015 21.9973C7.88515 23.1495 5.79696 23.6868 3.25076 24.0051C2.95925 24.0415 2.72596 24.2645 2.67636 24.5541C2.62676 24.8436 2.77255 25.1315 3.03531 25.2629C9.91358 28.702 18.8267 28.4535 23.8668 21.7333C25.9561 18.9475 26.6562 16.1545 26.8312 14.0553C26.9185 13.0069 26.8751 12.1307 26.8088 11.5123Z" fill="black"/>
                        </svg>
                        <svg onClick={handleEmailShare} className="cursor-pointer" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.8292 6.36964C2.70097 6.58354 2.78709 6.85335 2.99914 6.98462L13.3857 13.4144C13.762 13.6473 14.2376 13.6473 14.6139 13.4144L25.0006 6.98451C25.2127 6.85323 25.2988 6.58341 25.1706 6.36951C24.559 5.34943 23.4425 4.66669 22.1666 4.66669H5.83325C4.55727 4.66669 3.44077 5.34949 2.8292 6.36964Z" fill="black"/>
                        <path d="M25.6666 10.2141C25.6666 9.82231 25.2365 9.58273 24.9034 9.78893L15.842 15.3984C14.7133 16.0971 13.2863 16.0971 12.1576 15.3984L3.09643 9.78909C2.76333 9.58289 2.33325 9.82247 2.33325 10.2142V19.8334C2.33325 21.7664 3.90025 23.3334 5.83325 23.3334H22.1666C24.0996 23.3334 25.6666 21.7664 25.6666 19.8334V10.2141Z" fill="black"/>
                        </svg>
                        <svg onClick={handlePrint} className="cursor-pointer" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.9167 11.8883H20.5451C17.7801 11.8883 15.5284 9.63665 15.5284 6.87165V3.49998C15.5284 2.85831 15.0034 2.33331 14.3617 2.33331H9.41508C5.82175 2.33331 2.91675 4.66665 2.91675 8.83165V19.1683C2.91675 23.3333 5.82175 25.6666 9.41508 25.6666H18.5851C22.1784 25.6666 25.0834 23.3333 25.0834 19.1683V13.055C25.0834 12.4133 24.5584 11.8883 23.9167 11.8883Z" fill="black"/>
                        <path d="M6.41992 19V14.1H8.16992C8.43592 14.1 8.67626 14.1665 8.89092 14.2995C9.10792 14.4325 9.27942 14.611 9.40542 14.835C9.53142 15.059 9.59442 15.3051 9.59442 15.5735C9.59442 15.8488 9.52909 16.0985 9.39842 16.3225C9.27009 16.5441 9.09742 16.7215 8.88042 16.8545C8.66342 16.9851 8.42659 17.0505 8.16992 17.0505H7.27392V19H6.41992ZM7.27392 16.1965H8.07892C8.20026 16.1965 8.31109 16.1661 8.41142 16.1055C8.51176 16.0448 8.59109 15.9631 8.64942 15.8605C8.71009 15.7578 8.74042 15.6435 8.74042 15.5175C8.74042 15.3891 8.71009 15.2736 8.64942 15.171C8.59109 15.0683 8.51176 14.9866 8.41142 14.926C8.31109 14.8653 8.20026 14.835 8.07892 14.835H7.27392V16.1965Z" fill="white"/>
                        <path d="M10.2344 19V14.1H11.8584C12.1967 14.1 12.5129 14.1641 12.8069 14.2925C13.1032 14.4185 13.3634 14.5946 13.5874 14.821C13.8137 15.045 13.9899 15.3051 14.1159 15.6015C14.2442 15.8955 14.3084 16.2116 14.3084 16.55C14.3084 16.8883 14.2442 17.2056 14.1159 17.502C13.9899 17.796 13.8137 18.0561 13.5874 18.2825C13.3634 18.5065 13.1032 18.6826 12.8069 18.811C12.5129 18.937 12.1967 19 11.8584 19H10.2344ZM11.0884 18.146H11.8584C12.0754 18.146 12.2795 18.1051 12.4709 18.0235C12.6645 17.9395 12.8349 17.8251 12.9819 17.6805C13.1289 17.5335 13.2444 17.3643 13.3284 17.173C13.4124 16.9793 13.4544 16.7716 13.4544 16.55C13.4544 16.3283 13.4124 16.1218 13.3284 15.9305C13.2444 15.7391 13.1289 15.57 12.9819 15.423C12.8349 15.276 12.6657 15.1616 12.4744 15.08C12.283 14.996 12.0777 14.954 11.8584 14.954H11.0884V18.146Z" fill="white"/>
                        <path d="M14.876 19V14.1H17.7705V14.954H15.73V15.948H17.4345V16.802H15.73V19H14.876Z" fill="white"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 py-4 2xl:pb-16 lg:pb-16 pb-8">
                <h2 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium pt-2">Summary</h2>

                <ul className="list-disc pl-8 flex flex-col gap-y-4 font-sansRegular">
                    <li className="text-base 2xl:text-xl text-primaryText">NeoVolta NEOV has shown exceptional price appreciation, gaining 48.79% since the Trend Seeker buy signal on 11/4, and 87.67% in the last month.</li>
                    <li className="text-base 2xl:text-xl text-primaryText">The company designs and sells energy storage systems, with expected revenue growth of 244% this year and 72.60% next year.</li>
                    <li className="text-base 2xl:text-xl text-primaryText">{`Barchart's technical indicators are highly favorable, showing 100% technical buy signals, a 160.95% gain in the last year, and a Relative Strength Index of 84.62%.`}</li>
                    <li className="text-base 2xl:text-xl text-primaryText">Despite its volatility, NeoVolta is considered undervalued by MorningStar, with a fair value of $8.72, and has a strong buy rating from one Wall Street analyst.</li>
                </ul>
                <p className="text-base 2xl:text-xl text-primaryText font-sansRegular leading-[140%]">{`The Chart of the Day belongs to the energy storage company NeoVolta NEOV. I found the stock by using Barchart's powerful screening functions to find stocks with the highest technical buy signals, highest Weighted Alpha, superior current momentum and having a Trend Seeker buy signal then used the Flipchart feature to review the charts for consistent price appreciation. Since the Trend Seeker signaled a buy on 11/4 the stock gained 48.79%.`}</p>

                <h3 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium pt-2">NEOV Price vs Daily Moving Averages</h3>
                <Image className="w-[100%] h-[100%]" width={1171} height={465} src='/images/neov-chart.jpeg' alt="NEOV"/>
                <p className="text-base 2xl:text-xl text-primaryText font-sansRegular leading-[140%]">NeoVolta Inc. designs, manufactures, and sells energy storage systems in the United States. The company provides NV14, NV14-K, and NV 24 energy storage systems, which stores and uses energy through batteries and an inverter at residential or commercial sites. NeoVolta Inc. markets and sells its products directly to certified solar installers and solar equipment distributors. The company was founded in 2018 and is headquartered in Poway, California.</p>
                <p className="text-base 2xl:text-xl text-primaryText font-sansRegular leading-[140%]">Barchart&#39;s Opinion Trading systems are listed below. Please note that the Barchart Opinion indicators are updated live during the session every 20 minutes and can therefore change during the day as the market fluctuates. The indicator numbers shown below therefore may not match what you see live on the <Link href='https://www.barchart.com/news/chart-of-the-day?source=content_type:react%7Cfirst_level_url:article%7Csection:main_content%7Cbutton:body_link' className="text-primaryHeading font-bold"> Barchart.com</Link> website when you read this report.</p>

                <h4 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium pt-2">Barchart Technical Indicators:</h4>
                <ul className="list-disc pl-8 flex flex-col gap-y-4 font-sansRegular">
                    <li className="text-base 2xl:text-xl text-primaryText">100% technical buy signals</li>
                    <li className="text-base 2xl:text-xl text-primaryText">The company designs and sells energy storage systems, with expected revenue growth of 244% this year and 72.60% next year.</li>
                    <li className="text-base 2xl:text-xl text-primaryText">116.02+ Weighted Alpha</li>
                    <li className="text-base 2xl:text-xl text-primaryText">160.95% gain in the last year</li>
                    <li className="text-base 2xl:text-xl text-primaryText">Trend Seeker buy signal</li>
                    <li className="text-base 2xl:text-xl text-primaryText">1.99 - 60 month Beta</li>
                    <li className="text-base 2xl:text-xl text-primaryText">Above its 20, 50 and 100 day moving averages</li>
                    <li className="text-base 2xl:text-xl text-primaryText">15 new highs and up 87.67% in the last month</li>
                    <li className="text-base 2xl:text-xl text-primaryText">Relative Strength Index 84.62%</li>
                    <li className="text-base 2xl:text-xl text-primaryText">Technical support level at $4.59</li>
                    <li className="text-base 2xl:text-xl text-primaryText">Recently traded at $5.41 with 50 day moving average of $3.29</li>
                </ul>

                <h4 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium pt-2">Fundamental Factors:</h4>
                <ul className="list-disc pl-8 flex flex-col gap-y-4 font-sansRegular">
                    <li className="text-base 2xl:text-xl text-primaryText">Market Cap $164 million</li>
                    <li className="text-base 2xl:text-xl text-primaryText">Revenue expected to grow 244.00% this year and another 72.60% next year</li>
                    <li className="text-base 2xl:text-xl text-primaryText">Earnings are estimated to increase 28.60% this year, and an additional 120.00% next year </li>
                </ul>
                <h4 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium pt-2">Analysts and Investor Sentiment -- I don&#39;t buy stocks because everyone else is buying but I do realize that if major firms and investors are dumping a stock it&#39;s hard to make money swimming against the tide:</h4>
                <ul className="list-disc pl-8 flex flex-col gap-y-4 font-sansRegular">
                    <li className="text-base 2xl:text-xl text-primaryText">Wall Street analyst gave 1 strong buy</li>
                    <li className="text-base 2xl:text-xl text-primaryText">MorningStar gives the stock its average rating of 3 with a fair value of $8.72 or 43% under valued</li>
                    <li className="text-base 2xl:text-xl text-primaryText">Only 437 investors monitor the stock on Seeking Alpha</li>
                </ul>
                <p className="text-base 2xl:text-xl text-primaryText font-sansRegular leading-[140%]">Additional disclosure: The Barchart Chart of the Day highlights stocks that are experiencing exceptional current price appreciation. They are not intended to be buy recommendations as these stocks are extremely volatile and speculative. Should you decide to add one of these stocks to your investment portfolio it is highly suggested you follow a predetermined diversification and moving stop loss discipline that is consistent with your personal investment risk tolerance and reevaluate your stop losses at least on a weekly basis.</p>
                <p className="text-base 2xl:text-xl text-primaryText font-sansRegular leading-[140%]">On the date of publication, <Link className="text-primaryHeading font-bold underline" href='https://www.barchart.com/news/authors/46/jim-van-meerten'> Jim Van Meerten </Link> did not have (either directly or indirectly) positions in any of the securities mentioned in this article. All information and data in this article is solely for informational purposes. For more information please view the Barchart Disclosure Policy <Link className="text-primaryHeading font-bold underline" href='/policy'> here.</Link></p>
            </div>
            <Disclaimer/>
        </div>
        </>
    );
}

export default BARCHATNEOV;