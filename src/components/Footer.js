import Link from "next/link";
import Image from "next/image";

export default function Footer () {
    return (
        <footer className="w-full bg-primaryBg mt-auto max-lg:mb-[65px] max-lg:pb-5 rounded-t-3xl">
            <div className="w-full px-6 max-sm:px-3 mx-auto xl:container">
                <div className="flex justify-between py-16 items-start max-md:flex-col max-md:gap-y-3">
                    <div className="w-[45%] max-lg:w-[100%] flex flex-col items-start gap-3">
                        <Image className='' src="/images/StockverseLogo.png" width={180} height={48} alt='Stockverse Logo' />
                        <p className="text-lg max-sm:text-[3.2vw] font-sansRegular text-primaryTextColor">Your trusted platform for live Stock Data, Stock News, IPO Calendar, AI-driven insights, Stockpicks, Alerts and personalized analysis tools.</p>
                        <div className="flex items-center gap-2">
                            <Link href='/'>
                                <Image className='' src="/images/facebook.png" width={38} height={38} alt='Stockverse Logo' />
                            </Link>
                            <Link href='/'>
                                <Image className='' src="/images/instagram.png" width={38} height={38} alt='Stockverse Logo' />
                            </Link>
                            <Link href='/'>
                                <Image className='' src="/images/twitter.png" width={38} height={38} alt='Stockverse Logo' />
                            </Link>
                            <Link href='/'>
                                <Image className='' src="/images/tiktok.png" width={38} height={38} alt='Stockverse Logo' />
                            </Link>
                        </div>
                    </div>
                    <div className="max-lg:hidden flex flex-col items-start gap-y-2">
                        <h4 className="text-xl font-sansMedium text-primaryTextColor">Quick Links</h4>
                        <Link className="text-base max-sm:text-[3.5vw] font-sansRegular text-primaryTextColor/70 hover:underline hover:text-primaryTextColor" href='/'>Home</Link>
                        <Link className="text-base max-sm:text-[3.5vw] font-sansRegular text-primaryTextColor/70 hover:underline hover:text-primaryTextColor" href='/stockverse-gpt'>StockVerse GPT</Link>
                        <Link className="text-base max-sm:text-[3.5vw] font-sansRegular text-primaryTextColor/70 hover:underline hover:text-primaryTextColor" href='/stockpicks'>Stock Picks</Link>
                    </div>
                    <div className="max-lg:hidden flex flex-col items-start gap-y-2">
                        <h4 className="text-xl font-sansMeduim text-primaryTextColor">Market</h4>
                        <Link className="text-base max-sm:text-[3.5vw] font-sansRegular text-primaryTextColor/70 hover:underline hover:text-primaryTextColor" href='/dashboard?view=gainers_losers'>Gainers / Losers</Link>
                        <Link className="text-base max-sm:text-[3.5vw] font-sansRegular text-primaryTextColor/70 hover:underline hover:text-primaryTextColor" href='/dashboard?view=news'>News</Link>
                        <Link className="text-base max-sm:text-[3.5vw] font-sansRegular text-primaryTextColor/70 hover:underline hover:text-primaryTextColor" href='/dashboard?view=ipo_calendar'>IPO Calendar</Link>
                    </div>
                    <div className="max-lg:hidden flex flex-col items-start gap-y-2">
                        <h4 className="text-xl font-sansMedium text-primaryTextColor">Contact</h4>
                        <Link className="text-base max-sm:text-[3.5vw] font-sansRegular text-primaryTextColor/70 hover:underline hover:text-primaryTextColor" href='mailto:contact@stockverse.com'>Email Us</Link>
                        <Link className="text-base max-sm:text-[3.5vw] font-sansRegular text-primaryTextColor/70 hover:underline hover:text-primaryTextColor" href='/feedback'>Send us Feedback</Link>
                    </div>
                </div>
            </div>
            <Image className='w-full' src="/images/stockverse.png" width={1401} height={484} alt='Stockverse Logo' />
            <div className="relative bg-primaryBg sm:-mt-4 lg:-mt-8 xl:-mt-10 2xl:-mt-16">
                <div className="px-6 max-sm:px-3 mx-auto xl:container flex justify-between py-4 items-start max-md:flex-col max-md:gap-y-3">
                    <p className="text-base font-sansMedium text-primaryTextColor">© 2024 Stockverse, All right reserved.</p>
                    <div className="flex flex-wrap items-end gap-2 max-sm:gap-x-2">
                        <Link className="text-base font-sansMedium text-primaryTextColor/70 hover:underline hover:text-primaryTextColor/100" href='/disclaimer'>Disclaimer</Link>
                        <Link className="text-base font-sansMedium text-primaryTextColor/70" href='/disclaimer'>.</Link>
                        <Link className="text-base font-sansMedium text-primaryTextColor/70 hover:underline hover:text-primaryTextColor/100" href='/terms'>Terms of Service</Link>
                        <Link className="text-base font-sansMedium text-primaryTextColor/70" href='/terms'>.</Link>
                        <Link className="text-base font-sansMedium text-primaryTextColor/70 hover:underline hover:text-primaryTextColor/100" href='/policy'>Privacy Policy</Link>
                        <Link className="text-base font-sansMedium text-primaryTextColor/70" href='/refund-policy'>.</Link>
                        <Link className="text-base font-sansMedium text-primaryTextColor/70 hover:underline hover:text-primaryTextColor/100" href='/refund-policy'>Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}