'use client';
import Link from "next/link";
import React, { useEffect } from 'react';
import Disclaimer from "@/components/Cvkd_disclaimer";
import { useMetadata } from "@/context/MetadataContext";


const PRESSRELEASECVKD = () => {

  const { setMetadata } = useMetadata();

  useEffect(() => {
    setMetadata({
      title: "Cadrenal Therapeutics Highlights New Research on Anticoagulation Burden for LVAD Patients",
      description: "Cadrenal Therapeutics, Inc. (Nasdaq: CVKD), a biopharmaceutical company developing novel therapeutics for patients with cardiovascular disease, today announced new findings from third-party research on the economic and medical burdens faced by advanced heart failure patients with left ventricular assist devices (LVAD) requiring chronic anticoagulation.",
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
                <Link href='/cadrenal-page' className=" leading-[110%] text-base font-normal text-black">CVKD</Link>
                <Link href='/dashboard?view=news' className=" leading-[110%] text-base font-light text-black">June 12, 2025 by Stockverse</Link>
            </div>
            <div className="py-10 gap-y-6">
                <h1 className={`text-4xl 2xl:text-[2.4rem] max-sm:text-[1.6rem] font-DM font-semibold text-left text-primaryText leading-[120%]`}>
                  Cadrenal Therapeutics Highlights New Research on Anticoagulation Burden for LVAD Patients
                </h1>
            </div>
            <div className="flex flex-col gap-6 py-4 2xl:pb-16 lg:pb-16 pb-8">
              <ul className="list-disc font-bold text-lg pl-8">
                <li>LVAD patients face a high risk of bleeding events associated with oral anticoagulation alongside increased risk of cardiovascular (CV) events such as stroke</li>
                <li>Hospitalization costs for patients following a major bleeding event associated with oral anticoagulation use averages $39,000 per event</li>
                <li>Tecarfarin, with its novel metabolic pathway, potentially may offer an alternative to warfarin in this vulnerable population</li>
              </ul>
              <p className="text-lg text-primaryText font-normal leading-[150%]">PONTE VEDRA, Fla. - Cadrenal Therapeutics, Inc. (Nasdaq: <Link className="text-blue" href='/cadrenal-page'> CVKD</Link>), a biopharmaceutical company developing novel therapeutics for patients with cardiovascular disease, today announced new findings from third-party research on the economic and medical burdens faced by advanced heart failure patients with left ventricular assist devices (LVAD) requiring chronic anticoagulation.</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">The research recently conducted by Guidehouse, an AI-led professional services firm delivering advisory, technology, and managed services to the commercial and government sectors, underscores the significant clinical and economic burden for LVAD patients who require chronic oral anticoagulation. Key findings include:</p>
              <ul className="list-disc font-normal text-lg pl-8">
                <li>Major bleeds remain a primary cost driver, with average hospitalization costs (per event) of $54,100 for intracranial hemorrhage, $26,900 for gastrointestinal bleeds, and $36,600 for other major bleeds.</li>
              </ul>
              <p className="text-lg text-primaryText font-normal leading-[150%]">{`Guidehouse’s`} analysis also identified tecarfarin – a novel, Phase 3-ready oral anticoagulant being developed by Cadrenal – as a potential alternative to warfarin to address the current unmet need in this patient population. Tecarfarin is designed to provide more consistent anticoagulation control by avoiding the multiple metabolic pathways associated with warfarin. Its unique metabolism via a single enzyme (CES2) may reduce the risk of drug interactions, dietary complications, and adverse bleeding or thrombotic events.</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">“Despite decades of use, warfarin has significant limitations – especially in complex patients with LVADs,” said Quang X. Pham, Chairman and CEO of Cadrenal Therapeutics. “This research reinforces our conviction that tecarfarin has the potential to transform anticoagulation management for this high-risk population who currently has no alternative options.”</p>
              <h3 className="text-lg text-primaryText font-bold leading-[140%]">About Cadrenal Therapeutics, Inc.</h3>
              <p className="text-lg text-primaryText font-normal leading-[150%]"><Link className="text-blue" href='/cadrenal-page'> Cadrenal Therapeutics, Inc.</Link> is a biopharmaceutical company developing therapeutics for patients with cardiovascular disease. {`Cadrenal’s`} lead investigational product is tecarfarin, a novel oral vitamin K antagonist anticoagulant that addresses unmet needs in anticoagulation therapy. Tecarfarin is a reversible anticoagulant (blood thinner) designed to prevent heart attacks, strokes, and deaths due to blood clots in patients requiring chronic anticoagulation. Although warfarin is widely used off-label for a number of indications, extensive clinical and real-world data have shown it can have significant, serious side effects. With tecarfarin, Cadrenal is advancing an innovative solution to address the unmet needs in anticoagulation therapy, aiming to reduce the clinical complexities of warfarin and capture value in a market with high demand for safer, more manageable treatment options.</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">Cadrenal is pursuing a pipeline-in-a-product approach with tecarfarin. Tecarfarin received Orphan Drug designation (ODD) for advanced heart failure patients with implanted mechanical circulatory support devices, including Left Ventricular Assisted Devices (LVADs). The Company also received ODD and fast-track status for tecarfarin in end-stage kidney disease and atrial fibrillation (ESKD+AFib).</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">Cadrenal is opportunistically pursuing business development initiatives with a longer-term focus on creating a pipeline of cardiovascular therapeutics. For more information, visit <Link className="text-blue" href='https://www.cadrenal.com/'> https://www.cadrenal.com/</Link> and connect with us on <Link className="text-blue" href='https://www.linkedin.com/company/cadrenal/'> LinkedIn</Link>.</p>
              <h3 className="text-lg text-primaryText font-bold leading-[140%]">Safe Harbor</h3>
              <p className="text-lg text-primaryText font-normal leading-[150%]">Any statements in this press release about future expectations, plans, and prospects, as well as any other statements regarding matters that are not historical facts, may constitute “forward-looking statements.” The words “anticipate,” “believe,” “continue,” “could,” “estimate,” “expect,” “intend,” “may,” “plan,” “potentially,” “predict,” “project,” “should,” “target,” “will,” “would” and similar expressions are intended to identify forward-looking statements, although not all forward-looking statements contain these identifying words. These statements include statements regarding Tecarfarin offering an alternative to warfarin for LVAD patients requiring chronic anticoagulation; providing more consistent anticoagulation control by avoiding the multiple metabolic pathways associated with warfarin; Tecarfarin’s metabolism via a single enzyme (CES2) reducing the risk of drug interactions, dietary complications, and adverse bleeding or thrombotic events; transforming anticoagulation management for LVAD patients who currently have no alternative options; preventing heart attacks, strokes, and deaths due to blood clots in patients requiring chronic anticoagulation; addressing the unmet needs in anticoagulation therapy; reducing the clinical complexities of warfarin; and capturing value in a market with high demand for safer, more manageable treatment options. Actual results may differ materially from those indicated by such forward-looking statements as a result of various important factors, including the ability of tecarfarin to provide clinical benefits for LVAD patients who require anticoagulation; the ability to successfully complete clinical trials on time and achieve desired results and benefits as expected; the ability of Cadrenal to build a pipeline of specialized cardiovascular therapeutics and other assets and the other risk factors described in the Company’s Annual Report on Form 10-K for the year ended December 31, 2024, and the Company’s subsequent filings with the Securities and Exchange Commission, including subsequent periodic reports on Quarterly Reports on Form 10-Q and Current Reports on Form 8-K. Any forward-looking statements contained in this press release speak only as of the date hereof and, except as required by federal securities laws, the Company specifically disclaims any obligation to update any forward-looking statement, whether as a result of new information, future events, or otherwise.</p>
              <div>
                <p className="text-lg text-primaryText font-normal leading-[150%]">View source version on businesswire.com:</p>
                <p className="text-lg text-primaryText font-normal leading-[150%]"><Link className="text-blue break-words" href='https://www.businesswire.com/news/home/20250612613022/en/'>https://www.businesswire.com/news/home/20250612613022/en/</Link></p>
              </div>
              <h3 className="text-lg text-primaryText font-bold leading-[140%]">Corporate and Investor Relations</h3>
              <p className="text-lg text-primaryText font-normal leading-[150%]">Paul Sagan</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">LaVoieHealthScience</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">(617) 865-0041</p>
              <Link className="text-blue text-lg font-normal leading-[150%] break-words" href='mailto:psagan@lavoiehealthscience.com'>psagan@lavoiehealthscience.com</Link>
              <h3 className="text-lg text-primaryText font-bold leading-[140%]">Media</h3>
              <p className="text-lg text-primaryText font-normal leading-[150%]">Andrew Korda</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">LaVoieHealthScience</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">(617) 865-0043</p>
              <Link className="text-blue text-lg font-normal leading-[150%] break-words" href='mailto:akorda@lavoiehealthscience.com'>akorda@lavoiehealthscience.com</Link>
              <h3 className="text-lg text-primaryText font-bold leading-[140%]">Consider joining our membership too.</h3>
              <p className="text-lg text-primaryText font-normal leading-[150%]">Happy investing,</p>
              <p className="text-lg text-primaryText font-normal leading-[150%]">Mark w/ StockVerse</p>
            </div>
            <Disclaimer/>
        </div>
        </>
    );
}

export default PRESSRELEASECVKD;