'use client';
import Link from "next/link";
import React, { useEffect } from 'react';
import Disclaimer from "@/components/Cvkd_disclaimer";
import { useMetadata } from "@/context/MetadataContext";


const PRESSRELEASEIQST = () => {

  const { setMetadata } = useMetadata();

  useEffect(() => {
    setMetadata({
      title: "IQST - IQSTEL and Cycurion (CYCU) Advance Strategic Partnership to Deliver Cybersecurity and AI Solutions for the Global Telecom Market",
      description: "Cycurion Inc. (NASDAQ: CYCU) is a cybersecurity company specializing in data protection, threat management, and compliance solutions for corporate, government, and telecom clients. Cycurion’s mission is to empower organizations with intelligent, adaptive security that evolves with today’s digital landscape.",
      schema: ``
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
        <>
          <div className="xl:container mx-auto xl:sticky xl:top-24 xl:px-10 xl:py-4 max-sm:hidden">
                <a href="/dashboard?view=news" className="font-sansMedium text-base 2xl:text-xl flex items-center w-max justify-start gap-4">
                    <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to news
                </a>
            </div>
          <div className="w-full h-full mx-auto xl:container lg:px-[13%] max-xl:px-3">
            <div className="pt-8 flex flex-col sm:flex-row gap-y-6 justify-between items-start sm:items-center">
                <Link href='/cadrenal-page' className=" leading-[110%] text-base font-normal text-black">IQST</Link>
                <Link href='/dashboard?view=news' className=" leading-[110%] text-base font-light text-black">June 19, 2025 by Stockverse</Link>
            </div>
            <div className="py-10 gap-y-6">
                <h1 className={`text-4xl 2xl:text-[2.4rem] max-sm:text-[1.6rem] font-DM font-semibold text-left text-primaryText leading-[120%]`}>
                  IQST - IQSTEL and Cycurion (CYCU) Advance Strategic Partnership to Deliver Cybersecurity and AI Solutions for the Global Telecom Market
                </h1>
            </div>
            <div className="flex flex-col gap-6 py-4 2xl:pb-16 lg:pb-16 pb-8">
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    <span className="font-bold">New York, NY – June 17, 2025 – IQSTEL Inc. (NASDAQ: IQST)</span>, a leading provider of high-tech telecommunications and technology solutions, and <span className="font-bold">Cycurion Inc. (NASDAQ: CYCU)</span>, an innovative cybersecurity company, are pleased to announce the advancement of their <span className="font-bold">strategic partnership</span>, originally signed a few months ago.
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    Since entering the agreement, both companies have been working closely together to <span className="font-bold">define and design tailored cybersecurity solutions</span> that address the evolving needs of the global telecom market. This collaboration is now entering a new phase focused on the rollout of these offerings.
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    IQSTEL and Cycurion have identified <span className="font-bold">three key areas of collaboration</span>:
                </p>
                <h3 className="text-lg text-primaryText font-bold leading-[140%]">1. Cybersecurity for Telecom Carrier Infrastructure</h3>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    The two companies are jointly developing advanced cybersecurity services for <span className="font-bold">Telecom Carrier Services</span> to protect critical operational data such as:
                </p>
              <ul className="list-disc  text-lg pl-8">
                <li>Destination rates</li>
                <li>Routing engine rules</li>
                <li>Billing and accounting systems</li>
                <li>CRM and ERP platforms</li>
                <li>Customer and vendor financial information</li>
              </ul>
              <p className="text-lg text-primaryText font-normal leading-[150%]">
                These protections aim to strengthen telecom networks’ resilience against breaches and operational threats.
              </p>
              <h3 className="text-lg text-primaryText font-bold leading-[140%]">2. White-Label Cybersecurity Services for Telecom Operators</h3>
              <p className="text-lg text-primaryText font-normal leading-[150%]">
                The partnership includes the development of <span className="font-bold">“Cyber Shield,”</span> a white-label cybersecurity solution that major telecom carriers can offer to their own customers. This empowers them to deliver next-generation digital security to:
            </p>
              <ul className="list-disc font-normal text-lg pl-8">
                <li>Large enterprises</li>
                <li>Mid-size businesses</li>
                <li>Consumers</li>
              </ul>
              <p className="text-lg text-primaryText font-normal leading-[150%]">
                This initiative provides telecom operators with a <span className="font-bold">new, high-margin revenue stream</span> in the rapidly expanding cybersecurity market.
              </p>
              <h3 className="text-lg text-primaryText font-bold leading-[140%]">3. AI-Powered Operational Enhancement for Cycurion</h3>
              <p className="text-lg text-primaryText font-normal leading-[150%]">
                Cycurion is actively exploring the integration of <span className="font-bold">IQSTEL Intelligence</span>, the {`company’s`} proprietary AI platform, into its internal operations. The objective is to:
              </p>
              <ul className="list-disc font-normal text-lg pl-8">
                <li>Improve internal process efficiency</li>
                <li>Reduce operational costs</li>
                <li>Support execution of <span className="font-bold">large-scale contracts</span> currently under negotiation</li>
              </ul>
              <h3 className="text-lg text-primaryText font-bold leading-[140%]">4. Time-to-Market Planning for H2 2025</h3>
              <p className="text-lg text-primaryText font-normal leading-[150%]">
                IQSTEL and Cycurion are actively <span className="font-bold">planning the commercial launch of these joint cybersecurity and AI services in the second half of 2025</span>. The teams are currently coordinating product packaging, go-to-market strategies, and commercial outreach to ensure a <span className="font-bold">successful and timely rollout</span> across multiple telecom regions.
                </p>
                <h3 className="text-lg text-primaryText font-bold leading-[140%]">
                    5. Cybersecurity Market Size and Global Opportunity
                </h3>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    According to industry research, the <span className="font-bold">global cybersecurity market</span> is expected to exceed <span className="font-bold">$500 billion by 2030</span>, driven by increased digital transformation, cloud adoption, and the growing volume of cyber threats worldwide.
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    The telecom sector, which manages vast networks and sensitive data, is under mounting pressure to modernize its defenses. IQSTEL and Cycurion’s partnership is strategically positioned to <span className="font-bold">address this urgent demand</span>, offering a <span className="font-bold">scalable and globally deployable solution.</span>
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    With a presence across more than 17 time zones and relationships with over 600 telecom operators, IQSTEL provides a ready-made commercial platform to bring <span className="font-bold">world-class cybersecurity services to telecom carriers worldwide</span>—unlocking  <span className="font-bold">substantial revenue potential</span> and setting a new standard for digital trust in the telecom industry.
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    <span className="font-bold">Leandro Iglesias</span>, CEO of IQSTEL, stated:<br/>
                    “We are excited to move forward in this partnership with Cycurion. After months of joint work and planning, {`we’re`} confident that our combined cybersecurity and AI capabilities will drive real value for telecom carriers and their customers worldwide.”
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    <span className="font-bold">Kevin Kelly</span>, CEO of Cycurion, added:<br/>
                    “Partnering with IQSTEL has allowed us to strategically develop custom-tailored solutions for the telecom industry. Leveraging their AI expertise will also help Cycurion deliver more efficient and scalable security services.”
                </p>
                <h3 className="text-lg text-primaryText font-bold leading-[140%]">About Cycurion Inc.</h3>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    {`Cycurion Inc. (NASDAQ: CYCU) is a cybersecurity company specializing in data protection, threat management, and compliance solutions for corporate, government, and telecom clients. Cycurion’s mission is to empower organizations with intelligent, adaptive security that evolves with today’s digital landscape.`}
                </p>
                <h3 className="text-lg text-primaryText font-bold leading-[140%]">About IQSTEL Inc.</h3>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    <span className="font-bold">IQSTEL Inc. (NASDAQ: IQST)</span> is a multinational technology company providing advanced solutions across <span className="font-bold">Telecom, High-Tech Telecom Services, Fintech, AI-Powered Telecom Platforms</span>, and <span className="font-bold">Cybersecurity</span>. With operations in <span className="font-bold">21 countries</span> and a team of <span className="font-bold">100 employees</span>, IQSTEL serves a broad global customer base with high-value, high-margin services. Backed by a strong and scalable business platform, the company is forecasting <span className="font-bold">$340 million in revenue for FY-2025</span>, reinforcing its trajectory toward becoming a $1 billion tech-driven enterprise by 2027.
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    <span className="font-bold">Use of Non-GAAP Financial Measures:</span> The Company uses certain financial calculations such as Adjusted EBITDA, Return on Assets and Return on Equity as factors in the measurement and evaluation of the {`Company’s`} operating performance and period-over-period growth. The Company derives these financial calculations on the basis of methodologies other than generally accepted accounting principles (“GAAP”), primarily by excluding from a comparable GAAP measure certain items the Company does not consider to be representative of its actual operating performance. These financial calculations are “non-GAAP financial measures” as defined under the SEC rules. The Company uses these non-GAAP financial measures in operating its business because management believes they are less susceptible to variances in actual operating performance that can result from the excluded items, other infrequent charges and currency fluctuations. The Company presents these financial measures to investors because management believes they are useful to investors in evaluating the primary factors that drive the {`Company’s`} core operating performance and provide greater transparency into the {`Company’s`} results of operations. However, items that are excluded and other adjustments and assumptions that are made in calculating these non-GAAP financial measures are significant components in understanding and assessing the {`Company’s`} financial performance. These non-GAAP financial measures should be evaluated in conjunction with, and are not a substitute for, the {`Company’s`} GAAP financial measures. Further, because these non-GAAP financial measures are not determined in accordance with GAAP, and are thus susceptible to varying calculations, the non-GAAP financial measures, as presented, may not be comparable to other similarly-titled measures of other companies.
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    Adjusted EBITDA is not a recognized accounting measurement under GAAP; it should not be considered as an alternative to net income, as a measure of operating results, or as an alternative to cash flow as a measure of liquidity. It is presented here not as an alternative to net income, but rather as a measure of the {`Company's`} operating performance. Adjusted EBITDA excludes, in addition to non-operational expenses like interest expenses, taxes, depreciation and amortization; items that we believe are not indicative of our operating performance, such as:
                </p>
                <ul className="list-disc font-normal text-lg pl-8">
                    <li>Change in Fair Value of Derivative Liabilities: These adjustments reflect unrealized gains or losses that are non-operational and subject to market volatility.</li>
                    <li>Loss on Settlement of Debt: This represents non-recurring expenses associated with specific financing activities and does not impact ongoing business operations.</li>
                    <li>Stock-Based Compensation: As a non-cash expense, this adjustment eliminates variability caused by equity-based incentives.</li>
                </ul>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    The Company believes Adjusted EBITDA offers a clearer view of the cash-generating potential of its business, excluding non-recurring, non-cash, and non-operational impacts. Management believes that Adjusted EBITDA is useful in evaluating the {`Company's`} operating performance compared to that of other companies in its industry because the calculation of Adjusted EBITDA generally eliminates the effects of financing, income taxes, non-cash and certain other items that may vary for different companies for reasons unrelated to overall operating performance and also believes this information is useful to investors.
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    <span className="font-bold">Safe Harbor Statement: </span>{`Statements in this news release may be "forward-looking statements". `} Forward-looking statements include, but are not limited to, statements that express our intentions, beliefs, expectations, strategies, predictions, or any other information relating to our future activities or other future events or conditions. Words such as {`"anticipate," "believe," "estimate," "expect," "intend", "could"`} and similar expressions, as they relate to the company or its management, identify forward-looking statements. These statements are based on current expectations, estimates, and projections about our business based partly on assumptions made by management. Important factors that could cause our actual results and financial condition to differ materially from those indicated in the forward-looking statements include, among others, the following: our ability to successfully market our products and services; our continued ability to pay operating costs and ability to meet demand for our products and services; the amount and nature of competition from other telecom products and services; the effects of changes in the cybersecurity and telecom markets; our ability to successfully develop new products and services; our ability to complete complementary acquisitions and dispositions that benefit our company; our success establishing and maintaining collaborative, strategic alliance agreements with our industry partners; our ability to comply with applicable regulations; our ability to secure capital when needed; and the other risks and uncertainties described in our prior filings with the Securities and Exchange Commission. 
                </p>
                <p className="text-lg text-primaryText font-normal leading-[150%]">
                    These statements are not guarantees of future performance and involve risks, uncertainties, and assumptions that are difficult to predict. Therefore, actual outcomes and results may and are likely to differ materially from what is expressed or forecasted in forward-looking statements due to numerous factors. Any forward-looking statements speak only as of the date of this news release, and IQSTEL Inc. undertakes no obligation to update any forward-looking statement to reflect events or circumstances after the date of this news release. 
                </p>
              <div>
                <p className="text-lg text-primaryText font-normal leading-[150%]">For more information, please visit <Link className="text-blue" href="www.IQSTEL.com">www.IQSTEL.com</Link>.</p>              </div>
              <h3 className="text-lg text-primaryText font-bold leading-[140%]">Investor Relations Contact:</h3>
              <p className="text-lg text-primaryText font-normal leading-[150%]">IQSTEL Inc.</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">300 Aragon Avenue, Suite 375, Coral Gables, FL 33134</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">Email: <Link className="text-blue" href="mailto:investors@IQSTEL.com">investors@IQSTEL.com</Link></p>
            </div>
            <Disclaimer/>
        </div>
        </>
    );
}

export default PRESSRELEASEIQST;