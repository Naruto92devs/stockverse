import Image from "next/image";
import Link from "next/link";

const StockpicksFooter = () => {
    return (
        <footer className="bg-[#000] rounded-tl-3xl rounded-tr-3xl py-8 max-xl:px-4">
            <div className="w-full xl:container mx-auto">
                <div className="flex items-center max-md:flex-col max-md:items-start gap-[25%] max-md:gap-6 mb-4">
                    <Link href='/' className="z-20 flex w-max mr-2">
                        <Image className='' src="/images/stockverselogo2.png" width={180} height={48} alt='Stockverse Logo' />
                    </Link>
                    <h2 className="text-[#fff] text-2xl max-lg:text-xl">Disclaimer  &#160;&#160;   |   &#160;&#160;  Privacy</h2>
                </div>

                <div className='flex flex-col pt-8 gap-6 pb-16 border-b border-white/15'>
                    <p className="text-base font-inter font-normal text-[#9F9F9F]">
                        Effective Date: [August, 2024]
                    </p>
                    <p className="text-base font-inter font-normal text-[#9F9F9F]">
                        Last Updated: May 17, 2025
                    </p>
                    <p className="text-base font-inter font-normal text-[#9F9F9F]">
                        Publisher: Relqo Media LLC (Wyoming, United States)
                    </p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">IMPORTANT SUMMARY — PLEASE READ FIRST</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">This website and any affiliated digital materials are published by Relqo Media LLC, a Wyoming marketing agency. This communication is a paid advertisement, not a research report, not investment advice, and not an independent publication. Relqo Media is not a broker-dealer, investment adviser, or securities analyst. Investing in small-cap or microcap securities is extremely speculative and may result in the total loss of your investment. We strongly urge all viewers to consult a licensed investment professional and perform their own due diligence.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">1. NATURE AND INTENT OF THIS COMMUNICATION</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Relqo Media LLC is a for-profit marketing agency engaged in paid promotions of public companies. The content we produce is strictly commercial and intended to create temporary public awareness, visibility, and short-term market activity around featured companies. This material is not impartial. All readers should interpret our content as a paid commercial advertisement and not as an editorial, research article, or independent commentary. We create advertisements, not analysis. These Communications are not intended to be factual evaluations of any {`company’s`} operations or investment merit.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">2. INTENDED AUDIENCE</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">These Communications are directed solely to U.S.-based, self-directed investors who understand the risks of investing in microcap and Nasdaq-listed securities. The content is not intended for children, seniors, retirement accounts, or individuals with limited experience in securities trading. These Communications are not intended to guide investment for long-term portfolio management or financial planning purposes.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">3. NO ENDORSEMENT OR VERIFICATION OF CLAIMS</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Relqo Media LLC does not independently verify, investigate, or audit any statements made by companies featured in our content, their officers, their press releases, or any third-party sources. Any claims, projections, customer announcements, or product statements should be assumed to be unverified and potentially inaccurate unless independently confirmed. You should not rely on any statements regarding future performance, partnerships, revenue projections, or corporate plans.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">3. NO ENDORSEMENT OR VERIFICATION OF CLAIMS</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Relqo Media LLC does not independently verify, investigate, or audit any statements made by companies featured in our content, their officers, their press releases, or any third-party sources. Any claims, projections, customer announcements, or product statements should be assumed to be unverified and potentially inaccurate unless independently confirmed. You should not rely on any statements regarding future performance, partnerships, revenue projections, or corporate plans.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">4. MARKET INFLUENCE AND TRADING PATTERN EXPECTATION</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Promotional campaigns commonly result in short-lived spikes in stock price and volume, followed by rapid declines. These spikes are typically driven by retail speculation, promotional circulation, and momentary investor interest—not fundamentals. You should expect that:</p>
                    <ul className="list-disc text-base font-inter font-normal text-[#CFCFCF]/85 capitalize pl-8">
                        <li>Stock prices may increase temporarily during a promotion.</li>
                        <li>Trading volume may rise sharply.</li>
                        <li>Prices may fall after the campaign ends or selling begins.</li>
                    </ul>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">These patterns are typical of stock promotions, and you should proceed accordingly.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">5. NO RELIANCE - INVESTOR RESPONSIBILITY</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">The burden of research, investigation, and risk assessment rests solely with you. Relqo Media LLC is not responsible for your investment decisions. You are strongly urged to:</p>
                    <ul className="list-disc text-base font-inter font-normal text-[#CFCFCF]/85 capitalize pl-8">
                        <li>Read public filings from the SEC,</li>
                        <li>Consult a licensed financial adviser,</li>
                        <li>Understand risks such as dilution, insider selling, and volatility, and</li>
                        <li>Recognize that speculative stocks often lack financial transparency.</li>
                    </ul>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We accept no responsibility for losses incurred due to actions taken based on our Communications.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">6. FORWARD-LOOKING STATEMENTS AND SAFE HARBOR</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Our materials may include “forward-looking statements” within the meaning of the Private Securities Litigation Reform Act of 1995. These include statements about potential growth, revenue forecasts, market opportunity, strategic partnerships, or technological development. Such statements are speculative and based on assumptions that may never occur. Actual results may differ materially. These statements are made under the safe harbor protections of Sections 27A and 21E of the Securities Acts. Relqo Media disclaims any duty to update them.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">7. INFORMATION SOURCING, BIAS, AND ACCURACY</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We use publicly available information including company websites, press releases, and promotional materials supplied by paying clients or related parties. We do not verify or validate this data.</p>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Assume all information presented by Relqo Media is:</p>
                    <ul className="list-disc text-base font-inter font-normal text-[#CFCFCF]/85 capitalize pl-8">
                        <li>Subjective,</li>
                        <li>Not independently verified,</li>
                        <li>Created to highlight potential upside and omit downsides,</li>
                        <li>Not suitable as the basis for any investment decision.</li>
                    </ul>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We accept no responsibility for losses incurred due to actions taken based on our Communications.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">8. OWNERSHIP AND TRADING CONFLICTS</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Relqo Media LLC, its contractors, members, and affiliates may hold or acquire shares in the companies we promote. We may buy or sell such shares without prior notice. These transactions may occur before, during, or after a promotional campaign and may affect market pricing. We are not obligated to update readers on our trading activity or affiliate holdings.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">9. MARKETING TOOLS, DATA COLLECTION, AND USER CONSENT</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We use a range of outreach and promotional tools, including:</p>
                    <ul className="list-disc text-base font-inter font-normal text-[#CFCFCF]/85 capitalize pl-8">
                        <li>Email and newsletter distributions,</li>
                        <li>SMS/MMS text campaigns,</li>
                        <li>Social media posts and influencers,</li>
                        <li>Google and native display ads,</li>
                        <li>Press releases, video marketing, and paid content distribution.</li>
                    </ul>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">By engaging with our content, you consent to receive ongoing marketing communications. You may unsubscribe, but your data may be retained for audit or compliance purposes. Please refer to our Privacy Policy for further details.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">10. ADVERTISING LAW COMPLIANCE</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Relqo Media LLC produces promotional content in accordance with the advertising disclosure standards set forth by the Federal Trade Commission (FTC) and the SEC’s interpretations of sponsored investment-related communications.</p>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We make good-faith efforts to disclose all:</p>
                    <ul className="list-disc text-base font-inter font-normal text-[#CFCFCF]/85 capitalize pl-8">
                        <li>Conflicts of interest,</li>
                        <li>Risks,</li>
                        <li>Limitations of our role, and</li>
                        <li>The promotional nature of this content.</li>
                    </ul>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We do not provide investment recommendations under any regulatory framework including, but not limited to, SEC Regulation Analyst Certification, FINRA Rule 2210, or Regulation Best Interest.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">11. NON-U.S. USERS</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">This material is intended solely for distribution within the United States. If you are accessing this site from outside the U.S., you are responsible for complying with your country’s laws. Relqo Media disclaims liability for access from non-U.S. jurisdictions where investor promotion, marketing, or solicitation of securities is restricted or prohibited.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">12. DISCLAIMER OF WARRANTIES AND LIMITATION OF LIABILITY</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">All content is provided “as-is” and without warranties of any kind, either express or implied. Relqo Media LLC disclaims any and all liability for:</p>
                    <ul className="list-disc text-base font-inter font-normal text-[#CFCFCF]/85 capitalize pl-8">
                        <li>Investment losses,</li>
                        <li>Inaccuracies,</li>
                        <li>Technical delays,</li>
                        <li>User misunderstandings,</li>
                        <li>Omissions or errors in content.</li>
                    </ul>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Total liability for any claim shall not exceed one hundred dollars ($100).</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">13. LEGAL GOVERNANCE AND DISPUTE RESOLUTION</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">All matters arising out of this disclaimer shall be governed by the laws of the State of Wyoming. You agree that any dispute shall be resolved exclusively through binding arbitration under the rules of the American Arbitration Association, to be held in Sheridan County, Wyoming. Class action claims and group arbitration are expressly prohibited.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">14. NON-SOLICITATION AND GEOGRAPHIC LIMITATIONSN</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Nothing in our content constitutes a general solicitation or a personal securities recommendation. If you reside in a jurisdiction where such communications are unlawful, you must exit this site and discontinue engagement with our content.</p>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">15. FINAL NOTICE - ACCEPTANCE OF TERMS</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">We reserve the right to update this Disclaimer at any time without notice. Your continued use of our services or content constitutes acceptance of the most recent version.</p>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">If you do not accept all terms of this disclaimer in full, you must:</p>
                    <ul className="list-disc text-base font-inter font-normal text-[#CFCFCF]/85 capitalize pl-8">
                        <li>Exit our websites,</li>
                        <li>Unsubscribe from our communications,</li>
                        <li>Discontinue viewing all Relqo Media promotional content.</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-6 pb-16 border-b border-white/15'>
                    <h4 className="mt-16 text-xl font-inter font-[400] text-white">16. NO RELIANCE</h4>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">By viewing or engaging with this content, you agree that:</p>
                    <ul className="list-disc text-base font-inter font-normal text-[#CFCFCF]/85 capitalize pl-8">
                        <li>You will not rely on any statements made by Relqo Media for investment purposes,</li>
                        <li>You waive any claim that our content was a material factor in your investment decision,</li>
                        <li>You have read, understood, and accepted this disclaimer in full.</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-6 py-16 border-b border-white/15'>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Legal Contact: <Link className="underline text-primaryMain" href='mailto:support@stockverse.com'> 📧 support@stockverse.com</Link></p>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Mailing Address: 1309 Coffeen Ave Ste 1200, Sheridan, WY 82801</p>
                    <p className="text-base font-inter font-normal text-[#CFCFCF]/85 capitalize">Affiliate Disclosure: Relqo Media LLC owns and operates <Link className="underline text-primaryMain" href='https://stockverse.com'> Stockverse.com</Link> and all affiliated digital properties.</p>
                </div>

                <p className="text-[#fff] font-poppinsRegular text-base text-center pt-8 max-md:text-xs">© 2024 Relqo Media LLC. All Rights Reserved.    &#160;&#160;  |  &#160;&#160;   ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    )
}
export default StockpicksFooter;