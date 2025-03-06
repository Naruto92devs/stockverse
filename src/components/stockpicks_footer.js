import Image from "next/image";
import Link from "next/link";

const Footer = ()=>{
    return(
        <footer className="bg-[#000] rounded-tl-3xl rounded-tr-3xl py-8 max-xl:px-4">
            <div className="w-full xl:container mx-auto">
                <div className="flex items-center max-md:flex-col max-md:items-start gap-[25%] max-md:gap-6 mb-4">
                <Link href='/' className="z-20 flex w-max mr-2">
                <Image className='' src="/images/stockverselogo2.png" width={180} height={48} alt='Stockverse Logo' />
                </Link>
                <h2 className="text-[#fff] text-2xl max-lg:text-xl">Disclaimer  &#160;&#160;   |   &#160;&#160;  Privacy</h2>
                </div>
                <p className="text-[#A5A4A1] text-center text-[0.9rem] border-b border-[#fff] pb-8 max-md:text-justify">
                    Disclaimer: Penny stock trading involves substantial risk, so always research every 
                    alert before trading, consult with a licensed professional before trading, only invest 
                    what you can afford to lose, and always trade with caution. Readers should independently 
                    investigate and fully understand all risks before investing. Results listed above are NOT 
                    typical and individual results may and most likely will vary. Beatpennystocks.com and 
                    its staff are NOT licensed investment advisors or broker/dealers of any kind.
                    Alerts are not a solicitation or recommendation to buy/sell/hold securities but 
                    merely investment ideas that should NEVER serve as the basis of your trading decisions.
                    Beatpennystocks.com and its newsletter are for entertainment purposes only. This website 
                    and its reports are for general information purposes as we are engaged in the business of 
                    marketing and advertising companies for monetary compensation. Any investment decision 
                    should be discussed with a financial adviser before taking place. Please invest carefully and 
                    read investment information available at the website of the SEC at http://www.sec.gov.</p>
                    <p className="text-[#fff] font-poppinsRegular text-base text-center pt-8 max-md:text-xs">©2025 beatpennystocks.com    &#160;&#160;  |  &#160;&#160;   ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    )
}
export default Footer;