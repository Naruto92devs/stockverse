"use client";
import Link from "next/link";
import React, { useEffect } from 'react';
import Disclaimer from "@/components/Cvkd_disclaimer";
import { useMetadata } from "@/context/MetadataContext";

const PRESSRELEASEIQST = () => {

    const { setMetadata } = useMetadata();

    useEffect(() => {
    setMetadata({
        title: "Exclusive Interview with Leandro Iglesias, CEO of IQSTEL, Inc. (Nasdaq: IQST); Acquiring Majority Interest in Fintech Innovator GlobeTopper",
        description: "NEW YORK, June 3, 2025 /PRNewswire/ -- IQSTEL Inc. (NASDAQ: IQST) is a U.S.-based, publicly listed multinational technology company with operations spanning 21 countries and a commercial platform that reaches over 600 of the world's largest telecom operators. Recently uplisted to Nasdaq, IQSTEL is accelerating its mission to deliver essential, technology-driven solutions that empower people and businesses in today's digital economy.",
        schema: ``
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const pressReleaseUrl = `https://stockverse.com/news/iqstel-exclusive-interview`; // The current URL

    const handleFacebookShare = () => {
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            pressReleaseUrl
        )}`;
        window.open(
            facebookShareUrl,
            "facebook-share-dialog",
            "width=626,height=436"
        );
    };

    // Function to share on Twitter
    const handleTwitterShare = () => {
        const twitterShareUrl = `https://twitter.com/share?url=${encodeURIComponent(
            pressReleaseUrl
        )}&text=Check%20out%20this%20press%20release!`;
        window.open(
            twitterShareUrl,
            "twitter-share-dialog",
            "width=626,height=436"
        );
    };

    // Function to share on LinkedIn
    const handleLinkedInShare = () => {
        const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            pressReleaseUrl
        )}`;
        window.open(
            linkedInShareUrl,
            "linkedin-share-dialog",
            "width=626,height=436"
        );
    };

    // Function to share via Email
    const handleEmailShare = () => {
        const subject = "Check out this Press Release";
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
            <div className="xl:container mx-auto sticky top-24 xl:px-10 px-3 py-4 w-full">
                <a
                    href="/dashboard?view=news"
                    className="font-MontserratMedium text-base 2xl:text-xl flex items-center w-max justify-start gap-4"
                >
                    <svg
                        className="w-5 h-5 text-gray-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to news
                </a>
            </div>
            <div className="w-full h-full mx-auto xl:container lg:px-[15%] max-xl:px-3">
                <div className="py-8 gap-y-6">
                    <h1 className="text-[#1D3045] font-MontserratSemibold md:text-4xl text-2xl !leading-[1.4]">
                    Exclusive Interview with Leandro Iglesias, CEO of IQSTEL, Inc. (Nasdaq: IQST); Acquiring Majority Interest in Fintech Innovator GlobeTopper
                    </h1>
                </div>
                <div className="pt-8 lg:pt-4 flex flex-col sm:flex-row gap-y-6 justify-between items-start sm:items-center border-t border-[#404040]">
                    <Link
                        href="/dashboard?view=news"
                        className=" leading-[110%] text-base font-MontserratMedium text-[#634FF7]"
                    >
                        June, 2025 by Stockverse
                    </Link>
                    <div className="">
                        <p className="text-sm font-MontserratMedium  text-primaryText leading-[110%]">
                            SHARE THIS ARTICLE
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-2">
                            <svg
                                onClick={handleFacebookShare}
                                className="cursor-pointer"
                                width="28"
                                height="28"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M29.3334 21.5866C29.3334 26.44 26.4401 29.3333 21.5868 29.3333H20.0001C19.2667 29.3333 18.6667 28.7333 18.6667 28V20.3066C18.6667 19.9466 18.9601 19.64 19.3201 19.64L21.6667 19.6C21.8534 19.5866 22.0134 19.4533 22.0534 19.2666L22.5201 16.72C22.5601 16.48 22.3734 16.2533 22.1201 16.2533L19.2801 16.2933C18.9067 16.2933 18.6134 16 18.6001 15.64L18.5468 12.3733C18.5468 12.16 18.7201 11.9733 18.9467 11.9733L22.1467 11.92C22.3734 11.92 22.5468 11.7466 22.5468 11.52L22.4934 8.31995C22.4934 8.09328 22.3201 7.91996 22.0934 7.91996L18.4934 7.97331C16.2801 8.01331 14.5201 9.82662 14.5601 12.04L14.6268 15.7066C14.6401 16.08 14.3468 16.3733 13.9734 16.3866L12.3734 16.4133C12.1467 16.4133 11.9734 16.5866 11.9734 16.8133L12.0134 19.3466C12.0134 19.5733 12.1867 19.7466 12.4134 19.7466L14.0134 19.72C14.3868 19.72 14.6801 20.0133 14.6934 20.3733L14.8134 27.9733C14.8267 28.72 14.2267 29.3333 13.4801 29.3333H10.4134C5.56008 29.3333 2.66675 26.44 2.66675 21.5733V10.4133C2.66675 5.55996 5.56008 2.66663 10.4134 2.66663H21.5868C26.4401 2.66663 29.3334 5.55996 29.3334 10.4133V21.5866V21.5866Z"
                                    fill="black"
                                />
                            </svg>
                            <svg
                                onClick={handleLinkedInShare}
                                className="cursor-pointer"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18.6667 9.33331C20.5233 9.33331 22.3037 10.0708 23.6165 11.3836C24.9293 12.6963 25.6667 14.4768 25.6667 16.3333V24.5H21.0001V16.3333C21.0001 15.7145 20.7542 15.121 20.3167 14.6834C19.8791 14.2458 19.2856 14 18.6667 14C18.0479 14 17.4544 14.2458 17.0168 14.6834C16.5792 15.121 16.3334 15.7145 16.3334 16.3333V24.5H11.6667V16.3333C11.6667 14.4768 12.4042 12.6963 13.717 11.3836C15.0298 10.0708 16.8102 9.33331 18.6667 9.33331V9.33331Z"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6.99992 10.5H2.33325V24.5H6.99992V10.5Z"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M4.66659 6.99998C5.95525 6.99998 6.99992 5.95531 6.99992 4.66665C6.99992 3.37798 5.95525 2.33331 4.66659 2.33331C3.37792 2.33331 2.33325 3.37798 2.33325 4.66665C2.33325 5.95531 3.37792 6.99998 4.66659 6.99998Z"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <svg
                                onClick={handleTwitterShare}
                                className="cursor-pointer"
                                width="28"
                                height="28"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M26.8088 11.5123C26.7769 11.2143 26.7396 10.9755 26.7089 10.8054L29.2215 7.03643C29.3795 6.79946 29.3695 6.4883 29.1966 6.26196C29.0237 6.03563 28.7262 5.94411 28.456 6.03417L24.9617 7.19891C24.7771 6.9235 24.5032 6.56022 24.1382 6.19522C23.3989 5.45589 22.2393 4.66663 20.6668 4.66663C19.0367 4.66663 17.8303 5.12287 16.9689 5.87189C16.1164 6.61322 15.6667 7.58488 15.4367 8.50494C15.207 9.42381 15.1865 10.3281 15.2197 10.9916C15.2294 11.1851 15.2437 11.3602 15.2593 11.5117C13.5858 11.8676 11.8346 11.3225 10.1192 10.3044C8.2276 9.18184 6.49361 7.55064 5.13819 6.19522C4.9502 6.00723 4.66849 5.94891 4.42132 6.0468C4.17414 6.14469 4.00875 6.38008 4.00045 6.6458C3.83058 12.0816 4.95125 18.661 10.015 21.9973C7.88515 23.1495 5.79696 23.6868 3.25076 24.0051C2.95925 24.0415 2.72596 24.2645 2.67636 24.5541C2.62676 24.8436 2.77255 25.1315 3.03531 25.2629C9.91358 28.702 18.8267 28.4535 23.8668 21.7333C25.9561 18.9475 26.6562 16.1545 26.8312 14.0553C26.9185 13.0069 26.8751 12.1307 26.8088 11.5123Z"
                                    fill="black"
                                />
                            </svg>
                            <svg
                                onClick={handleEmailShare}
                                className="cursor-pointer"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.8292 6.36964C2.70097 6.58354 2.78709 6.85335 2.99914 6.98462L13.3857 13.4144C13.762 13.6473 14.2376 13.6473 14.6139 13.4144L25.0006 6.98451C25.2127 6.85323 25.2988 6.58341 25.1706 6.36951C24.559 5.34943 23.4425 4.66669 22.1666 4.66669H5.83325C4.55727 4.66669 3.44077 5.34949 2.8292 6.36964Z"
                                    fill="black"
                                />
                                <path
                                    d="M25.6666 10.2141C25.6666 9.82231 25.2365 9.58273 24.9034 9.78893L15.842 15.3984C14.7133 16.0971 13.2863 16.0971 12.1576 15.3984L3.09643 9.78909C2.76333 9.58289 2.33325 9.82247 2.33325 10.2142V19.8334C2.33325 21.7664 3.90025 23.3334 5.83325 23.3334H22.1666C24.0996 23.3334 25.6666 21.7664 25.6666 19.8334V10.2141Z"
                                    fill="black"
                                />
                            </svg>
                            <svg
                                onClick={handlePrint}
                                className="cursor-pointer"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M23.9167 11.8883H20.5451C17.7801 11.8883 15.5284 9.63665 15.5284 6.87165V3.49998C15.5284 2.85831 15.0034 2.33331 14.3617 2.33331H9.41508C5.82175 2.33331 2.91675 4.66665 2.91675 8.83165V19.1683C2.91675 23.3333 5.82175 25.6666 9.41508 25.6666H18.5851C22.1784 25.6666 25.0834 23.3333 25.0834 19.1683V13.055C25.0834 12.4133 24.5584 11.8883 23.9167 11.8883Z"
                                    fill="black"
                                />
                                <path
                                    d="M6.41992 19V14.1H8.16992C8.43592 14.1 8.67626 14.1665 8.89092 14.2995C9.10792 14.4325 9.27942 14.611 9.40542 14.835C9.53142 15.059 9.59442 15.3051 9.59442 15.5735C9.59442 15.8488 9.52909 16.0985 9.39842 16.3225C9.27009 16.5441 9.09742 16.7215 8.88042 16.8545C8.66342 16.9851 8.42659 17.0505 8.16992 17.0505H7.27392V19H6.41992ZM7.27392 16.1965H8.07892C8.20026 16.1965 8.31109 16.1661 8.41142 16.1055C8.51176 16.0448 8.59109 15.9631 8.64942 15.8605C8.71009 15.7578 8.74042 15.6435 8.74042 15.5175C8.74042 15.3891 8.71009 15.2736 8.64942 15.171C8.59109 15.0683 8.51176 14.9866 8.41142 14.926C8.31109 14.8653 8.20026 14.835 8.07892 14.835H7.27392V16.1965Z"
                                    fill="white"
                                />
                                <path
                                    d="M10.2344 19V14.1H11.8584C12.1967 14.1 12.5129 14.1641 12.8069 14.2925C13.1032 14.4185 13.3634 14.5946 13.5874 14.821C13.8137 15.045 13.9899 15.3051 14.1159 15.6015C14.2442 15.8955 14.3084 16.2116 14.3084 16.55C14.3084 16.8883 14.2442 17.2056 14.1159 17.502C13.9899 17.796 13.8137 18.0561 13.5874 18.2825C13.3634 18.5065 13.1032 18.6826 12.8069 18.811C12.5129 18.937 12.1967 19 11.8584 19H10.2344ZM11.0884 18.146H11.8584C12.0754 18.146 12.2795 18.1051 12.4709 18.0235C12.6645 17.9395 12.8349 17.8251 12.9819 17.6805C13.1289 17.5335 13.2444 17.3643 13.3284 17.173C13.4124 16.9793 13.4544 16.7716 13.4544 16.55C13.4544 16.3283 13.4124 16.1218 13.3284 15.9305C13.2444 15.7391 13.1289 15.57 12.9819 15.423C12.8349 15.276 12.6657 15.1616 12.4744 15.08C12.283 14.996 12.0777 14.954 11.8584 14.954H11.0884V18.146Z"
                                    fill="white"
                                />
                                <path
                                    d="M14.876 19V14.1H17.7705V14.954H15.73V15.948H17.4345V16.802H15.73V19H14.876Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 py-4 2xl:pb-16 lg:pb-16 pb-8">
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Completed NASDAQ Listing with Small Share Structure and Strong Revenue Growth, On Track to $1 Billion by 2027 </h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      NEW YORK, June 3, 2025 /PRNewswire/ -- IQSTEL Inc. (NASDAQ: <Link className="font-MontserratBold underline" href="https://www.prnewswire.com/news-releases/exclusive-interview-with-leandro-iglesias-ceo-of-iqstel-inc-nasdaq-iqst-acquiring-majority-interest-in-fintech-innovator-globetopper-302471410.html#financial-modal">IQST</Link>) is a U.S.-based, publicly listed multinational technology company with operations spanning 21 countries and a commercial platform that reaches over 600 of the {`world's`} largest telecom operators. Recently uplisted to Nasdaq, IQSTEL is accelerating its mission to deliver essential, technology-driven solutions that empower people and businesses in {`today's`} digital economy.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      IQSTEL believes that core human aspirations—security, connectivity, economic opportunity, and mobility—are fundamentally linked to access to advanced infrastructure and services. With a rapidly expanding portfolio across <span className="font-MontserratBold">telecommunications, fintech, cybersecurity, and artificial intelligence,</span> IQSTEL is building a powerful platform that combines innovation with inclusion, enabling individuals and enterprises across emerging and developed markets to thrive.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      The company operates from six strategic office locations around the world — <span className="font-MontserratBold">USA, Venezuela, Argentina, Turkey, United Kingdom</span>, and the <span className="font-MontserratBold">United Arab Emirates (Dubai)</span> — supporting its mission to deliver global solutions with local expertise.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      IQSTEL is on a strategic path to reach <span className="font-MontserratBold">$1 billion in annual revenue by 2027</span>, driven by a blend of <span className="font-MontserratBold">organic growth, targeted acquisitions</span>, and the <span className="font-MontserratBold">scaling of high-margin, next-generation technologies</span> that meet the needs of a connected and intelligent world.
                    </p>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">IQSTEL Divisions and Offerings</h4>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Telecommunications Services Division (Communications):</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      Delivers robust solutions including <span className="font-MontserratBold">VoIP, SMS, International Fiber-Optic Connectivity, DID, eSIM, and Roaming Services.</span>
                    </p>
                    <p className="font-MontserratBold text-base 2xl:text-xl pt-12 text-[#343D48]">
                      Fintech Division: GlobeTopper.com + GlobalMoneyOne.com: Powering Inclusive Fintech Innovation
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      {`IQSTEL's`} fintech division brings together <span className="font-MontserratBold">GlobeTopper</span>, a global B2B provider of digital gift cards and prepaid services, with <span className="font-MontserratBold">GlobalMoneyOne</span>, a platform focused on inclusive financial tools for the unbanked and underbanked.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      Together, they offer:
                    </p>
                    <ul className="pl-8 list-disc space-y-3 font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      <li><span className="font-MontserratBold">Consumer Solutions:</span> U.S. bank accounts without SSN, MasterCard debit cards, remittances, and mobile top-ups via a secure app.</li>
                      <li><span className="font-MontserratBold">Business Solutions:</span> Access to 3,000+ digital gift card brands in 65+ countries, multi-currency and crypto payments, and robust API integration.</li>
                    </ul>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]"> Artificial Intelligence (AI) Services Division (Information and Content):</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      Provides next-generation <span className="font-MontserratBold">AI engagement telecommunications tools and AI agents (airweb.ai)</span>, including a <span className="font-MontserratBold">phone call and white-label 3D virtual assistant interface</span> that supports customer service, entertainment, and transactional experiences across web and voice platforms.
                    </p>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Cybersecurity Services:</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      In partnership with <span className="font-MontserratBold">Cycurion</span>, IQSTEL now offers <span className="font-MontserratBold">enterprise-grade cybersecurity</span>, including <span className="font-MontserratBold">24/7 monitoring, threat detection, incident response, vulnerability assessments</span>, and <span className="font-MontserratBold">regulatory compliance solutions</span>—supporting telecom and enterprise customers alike.
                    </p>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Strategic Developments:</h4>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">GlobeTopper Acquisition – Fintech Expansion</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                    On <span className="font-MontserratBold">May 29, 2025</span>, IQSTEL officially closed the acquisition of a <span className="font-MontserratBold">51% stake in GlobeTopper</span>, a profitable fintech company specializing in enhanced B2B top-up and digital prepaid services. The transaction follows the initial Memorandum of Understanding (MOU) signed in March 2025 and marks a strategic milestone in {`IQSTEL's`} transition toward high-margin technology services. This acquisition is expected to accelerate {`IQSTEL's`} trajectory toward a <span className="font-MontserratBold">$400 million revenue run rate</span> and support the {`company's`} goal of achieving an <span className="font-MontserratBold">80/20 Telecom-Fintech/Tech revenue mix</span>, driving long-term growth and profitability.
                    </p>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">ItsBchain MOU – Value Creation for Shareholders:</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      IQSTEL also signed an MOU to <span className="font-MontserratBold">sell its blockchain-focused subsidiary ItsBchain to Accredited Solutions, Inc. (ASII)</span>. As part of this transaction, <span className="font-MontserratBold">$500,000 worth of ASII shares will be distributed directly to IQSTEL shareholders</span>, reinforcing the {`company's`} commitment to delivering <span className="font-MontserratBold">tangible value and strategic returns</span> to its investor base.
                    </p>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Strong Financial Results & Shareholder Value Growth:</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      IQSTEL (NASDAQ: <Link className="font-MontserratBold underline" href="https://www.prnewswire.com/news-releases/exclusive-interview-with-leandro-iglesias-ceo-of-iqstel-inc-nasdaq-iqst-acquiring-majority-interest-in-fintech-innovator-globetopper-302471410.html#financial-modal">IQST</Link>) continues to deliver outstanding growth as it accelerates toward its $1 billion revenue target by 2027.
                    </p>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">2024 Highlights:</h4>
                    <ul className="pl-8 space-y-3 list-disc font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      <li>Revenue: $283.2M (+95.9% YoY)</li>
                      <li>Assets: $79M (+257%)</li>
                      <li>{`Stockholders'`} Equity: $11.9M (+48%)</li>
                    </ul>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Q1 2025 Snapshot:</h4>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">2024 Highlights:</h4>
                    <ul className="pl-8 space-y-3 list-disc font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      <li>Revenue: $57.6M</li>
                      <li>Revenue per Share: Over $100</li>
                      <li>Assets per Share: $14.58</li>
                      <li>Equity per Share: $4.38</li>
                      <li>Outstanding Shares: 2.9M</li>
                      <li>Market Cap: ~0.10x 2024 Revenue</li>
                    </ul>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">2025 Forecast & Strategic Goals:</h4>
                    <ul className="pl-8 space-y-3 list-disc font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        <li>FY Revenue Forecast: $340M</li>
                        <li>Year-End Run Rate Goal: $400M</li>
                        <li>Run Rate Target Mix: 80% Telecom / 20% Tech</li>
                    </ul>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Global Footprint:</h4>
                    <ul className="pl-8 space-y-3 list-disc font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        <li>Operating in 21 countries</li>
                        <li>100+ employees</li>
                        <li>600+ global interconnections</li>
                    </ul>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        <span className="font-MontserratBold">Investor Access:</span> IQSTEL is now available on <span className="font-MontserratBold">Trading212</span> for European investors.
                    </p>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">INTERVIEW:</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        On June 2nd, 2025 IQSTEL CEO Leandro Iglesias sat down with Corporate Ads to conduct the following detailed interview for the benefit of <span className="font-MontserratBold">IQST</span> shareholders and other investors. This transcript is exclusive to the distribution of the Corporate Ads awareness program.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Corporate Ads:   <span className="font-MontserratBold">IQST</span> has now announced the execution of a definitive agreement to acquire 51% of GlobeTopper, a fintech innovator with operations across America, Europe, and Africa.  How important a milestone is the closing of this agreement and now and can you reaffirm your revenue growth projections as a result of the GlobeTopper acquisition for 2025 and beyond?
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Leandro Iglesias:  The closing of our definitive agreement to acquire 51% of GlobeTopper is a major strategic milestone for IQSTEL — and a clear signal that {`we're`} building something big.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        IQSTEL is already a <span className="font-MontserratBold">telecom powerhouse with operations in 21 countries</span>, serving over 600 global telecom partners. With the addition of GlobeTopper, {`we're`} taking the right steps to become a <span className="font-MontserratBold">fintech powerhouse</span> as well. Combining telecom and fintech services through one commercial platform {`doesn't`} just add value — it creates exponential synergy.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        This acquisition is <span className="font-MontserratBold">fully aligned with our plan to achieve a $400 million revenue run rate by the end of 2025</span>, while moving toward a <span className="font-MontserratBold">targeted revenue mix of 80% telecom and 20% fintech/tech services</span>. {`GlobeTopper's`} presence across America, Europe, and Africa adds immediate scale, strengthens our international footprint, and enables us to <span className="font-MontserratBold">cross-sell fintech offerings</span> through our robust, established network.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        We remain <span className="font-MontserratBold">confident in our 2025 forecast of $340 million in full-year revenue</span>, with a <span className="font-MontserratBold">year-end run rate goal of $400 million</span>, and are firmly on track to reach our long-term vision of becoming a <span className="font-MontserratBold">$1 billion revenue company by 2027</span>.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Corporate Ads:   {`GlobeTopper's`} fintech products and services can be marketed through {`IQSTEL's`} existing commercial platform which currently reaches the largest telecom operators around the world. So with the acquisition of GlobeTopper how much broader of a client base increase do you see developing?
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Leandro Iglesias: The acquisition of <span className="font-MontserratBold">GlobeTopper</span>, which is expected to report <span className="font-MontserratBold">$65 million in profitable revenue prior to joining IQSTEL</span>, significantly enhances the breadth and depth of our client base—not just by adding new customers, but by unlocking powerful cross-selling opportunities
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Our strong commercial platform already reaches <span className="font-MontserratBold">over 600 telecom operators around the world</span>, forming a robust foundation for deploying {`GlobeTopper's`} fintech products and services at global scale. By integrating their offerings—including <span className="font-MontserratBold">digital financial services, prepaid solutions, mobile wallets, and digital gift cards</span>—we can immediately expand the value proposition we deliver to our telecom partners.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        At the same time, GlobeTopper brings a <span className="font-MontserratBold">complementary client portfolio</span> of its own, including corporate clients and fintech distributors across <span className="font-MontserratBold">America, Europe, and Africa</span>. This expansion grants IQSTEL direct access to <span className="font-MontserratBold">non-telecom sectors and broader consumer markets</span>, helping accelerate our diversification strategy and enhancing resilience in an ever-changing global landscape.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        In short, this acquisition empowers us to not only <span className="font-MontserratBold">grow our client base—potentially by hundreds of institutional and enterprise relationships—but to deepen engagement and increase average revenue per customer</span> through bundled telecom-fintech solutions.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        This is a <span className="font-MontserratBold">strategic multiplier</span>, and we see it as a <span className="font-MontserratBold">key driver</span> in achieving our <span className="font-MontserratBold">$400 million revenue run rate by year-end 2025</span> and realizing our <span className="font-MontserratBold">$1 billion revenue vision by 2027</span>.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Corporate Ads:  As part of the acquisition, <span className="font-MontserratBold">IQST</span> announced that Craig Span will continue in his role as CEO of GlobeTopper.  How valuable is it to retain Craig with his experience and proven business success running the GlobeTopper operation? 
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Leandro Iglesias: Retaining Craig Span as CEO of GlobeTopper is not only valuable — {`it's`} essential to our strategy.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Craig brings deep experience, industry knowledge, and a proven track record of building and scaling fintech operations. His leadership has been instrumental in positioning GlobeTopper as a high-growth, profitable company with global reach. More importantly, we share a common vision with Craig: to take GlobeTopper — and our entire fintech division — to the next level.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        With this acquisition, we are not simply maintaining business as usual; we are stepping up. Together with Craig, we plan to scale {`GlobeTopper's`} services at an <span className="font-MontserratBold">explosive growth rate</span>, leveraging both his entrepreneurial drive and {`IQSTEL's`} global platform.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        This partnership is about <span className="font-MontserratBold">doubling down on fintech</span>, going deeper into the sector, and accelerating {`IQSTEL's`} transformation into a <span className="font-MontserratBold">telecom and fintech powerhouse</span>. {`We're`} building something big — and {`Craig's`} continued leadership ensures {`we're`} doing it with experience, continuity, and bold ambition.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Corporate Ads:   IQSTEL also announced plans to invest up to $1.2 million over the next 2 years to accelerate {`GlobeTopper's`} growth and product roadmap.  So, what plans do you have to accelerate the growth of GlobeTopper via this investment?
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Leandro Iglesias: Our planned investment of up to $1.2 million over the next two years is laser-focused on accelerating {`GlobeTopper's`} growth and expanding its product roadmap. These funds will be deployed strategically across three core areas:
                    </p>
                    <ol className="pl-8 space-y-3 list-decimal font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        <li><span className="font-MontserratBold">Technology Development:</span> Enhancing {`GlobeTopper's`} digital infrastructure, expanding its API integrations, and adding new fintech functionalities — including improved user experience, security layers, and global scalability.</li>
                        <li><span className="font-MontserratBold">Market Expansion:</span> Supporting targeted go-to-market initiatives in high-growth regions like Africa, Latin America, and Southeast Asia, where demand for inclusive digital financial services is surging.</li>
                        <li><span className="font-MontserratBold">Cross-Selling and Integration</span>: Leveraging {`IQSTEL's`} existing relationships with over 600 telecom operators worldwide to cross-sell {`GlobeTopper's`} solutions, creating a powerful distribution engine for growth.</li>
                    </ol>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        This investment is also <span className="font-MontserratBold">performance-based</span>, {`ensuring that each phase of funding is aligned with measurable financial milestones. We're not just funding growth — we're engineering it.`}
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Corporate Ads:   On May 15th <span className="font-MontserratBold">IQST</span> released its Q1 2025 Shareholder Letter—its first since being uplisted to the NASDAQ Capital Market the previous day. 
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        This letter from you, Mr. Iglesias, covered the {`company's`} performance including the following highlights:  
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        $57.6 million in revenue, up 12% YoY
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        $0.59 million in Adjusted EBITDA (Telecom Division)
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        $0.25 million in Net Income (Telecom Division)
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        $1.93 million in Gross Profit, up 40% YoY
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        3.36% Gross Margin, up 25% from 2.68% in Q1 2024
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        $11.6 million in {`Stockholders'`} Equity or $4.38 per common share
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Can you expand on the significance of these financial results for IQST now?
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Leandro Iglesias: The Q1 2025 financial results mark a pivotal moment for IQSTEL, especially as they were our first report following our uplisting to the NASDAQ Capital Market. These results show that we have already reached critical mass — and {`that's`} the turning point.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        With $57.6 million in revenue and strong improvements in gross profit and margins, {`we're`} now in a position where every additional dollar of revenue has a meaningful, compounding impact on our bottom line. {`That's`} exactly what investors want to see: scale starting to deliver profitability.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        These indicators must be viewed not as a peak, but as a <span className="font-MontserratMedium">starting point</span>. {`We're`} focused on accelerating both top-line and bottom-line growth, increasing shareholder value through sustained profitability and business expansion. Importantly, our telecom division already delivered <span className="font-MontserratBold"> positive Adjusted EBITDA and Net Income</span>, reinforcing the health and efficiency of our core operations.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        We also take pride in our solid balance sheet — with $11.6 million in {`stockholders'`} equity, equating to <span className="font-MontserratBold">$4.38 per share</span> , and a gross margin that has grown <span className="font-MontserratBold">25% year-over-year</span>. Despite this strong foundation and ongoing growth trajectory, our market cap today is only about , <span className="font-MontserratBold">10% of our 2024 revenue</span>. That represents a significant undervaluation in the market.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Going forward, we are committed to working diligently to correct this disconnect. By consistently improving our financials, expanding into fintech, and reinforcing our corporate structure, we aim to achieve a valuation that more accurately reflects the true value, stability, and potential of IQSTEL.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                       In short: {`we're`} just getting started, and the best is yet to come.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                       Corporate Ads: IQSTEL just completed and released a new {`Investor's`} Deck detailing the {`company's`} transformation from a telecom operator into a high-margin, scalable technology platform. In addition to the {`company's`} regular reporting and continued news updates, this {`Investor's`} Deck should be a valuable introduction to higher levels of new investors.  Are you planning to make a bigger effort to attract Family Office or Institutional interest in IQST now?
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Leandro Iglesias: Absolutely. {`We're`} incredibly proud to have over <span className="font-MontserratBold">20,000 retail shareholders </span> who have supported IQSTEL throughout our journey, and they remain a <span className="font-MontserratBold">vital part of our success story.</span> However, as we continue transforming from a traditional telecom operator into a <span className="font-MontserratBold">high-margin, scalable technology</span> platform, {`it's`} time to expand our outreach to include <span className="font-MontserratBold">Family Offices and Institutional investors.</span>
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        These groups typically manage diversified portfolios and are actively seeking companies with <span className="font-MontserratBold">explosive growth potential,</span> <span className="font-MontserratBold">a clear strategic roadmap</span>, and <span className="font-MontserratBold">strong fundamentals</span>. IQSTEL checks all those boxes — and more.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Our newly released <span className="font-MontserratBold">Investor Deck</span> is designed to speak directly to that audience. It lays out our evolution, our vision to reach <span className="font-MontserratBold">$1 billion in revenue by 2027</span>, our <span className="font-MontserratBold">profitable foundation</span>, and the <span className="font-MontserratBold">massive opportunity</span> we are unlocking through our <span className="font-MontserratBold">fintech expansion and high-tech services.</span>
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        {`We've`} received consistent feedback that institutional investors <span className="font-MontserratBold">love our story</span> — particularly the fact that we <span className="font-MontserratBold">uplisted to NASDAQ via a direct listing, without raising capital</span>, which means our stock has <span className="font-MontserratBold">no technical selling pressure</span>. <span className="font-MontserratBold">{`That's a unique strength`} </span>in {`today's`} market and adds significant confidence in our long-term trajectory.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        We now expect that <span className="font-MontserratBold">Family Offices and Institutional investors will begin taking positions in our company in the open market</span>, attracted by our financial performance, strategic clarity, and upside potential.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        So yes, we are now <span className="'font-MontserratBold">doubling down</span> on efforts to engage these sophisticated investor groups — and we are doing so <span className="font-MontserratBold">with a powerful story to tell</span>, backed by <span className="font-MontserratBold">real results and a compelling vision for the future.</span>
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Corporate Ads:   An important part of the <span className="font-MontserratBold">IQST</span> long term growth plan is your acquisition strategy, which has already contributed greatly to the {`company's`} success story.  Can you tell us what business sectors your are focused on for the next acquisition targets?
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Leandro Iglesias: Of course — acquisitions are a key part of {`IQSTEL's`} long-term growth strategy and have already played a major role in our success. But{` it's`} not just about buying companies —{` it's `}about what we do with them.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Our <span className="font-MontserratBold">proven capabilities in generating organic growth and catalyzing the growth of our subsidiaries</span> are at the core of our strategy. We {`don't`} just acquire; we integrate, optimize, and scale. {`That's`} why every acquisition we make is carefully selected to fit into our long-term vision.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Looking ahead, we plan to continue expanding in our core <span className="font-MontserratBold">telecom business</span>, especially in <span className="font-MontserratBold">high-tech telecom services</span> where we can increase profitability and leverage our global commercial platform. {`We're`} also <span className="font-MontserratBold">accelerating our expansion in fintech</span>, especially after the recent acquisition of GlobeTopper. Fintech is a high-margin sector that aligns perfectly with our shift toward a <span className="font-MontserratBold">targeted 80% telecom / 20% tech revenue mix</span>. In addition, we see great potential in <span className="font-MontserratBold">managed services and cybersecurity</span> — both of which are becoming mission-critical for businesses and governments alike in an increasingly digital world.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Our acquisitions will continue to be strategic, targeted, and synergistic. Each one must not only deliver revenue but also contribute to our goal of becoming a <span className="font-MontserratBold">$1 billion revenue company by 2027</span>, with a stronger bottom line and long-term value creation for shareholders.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Corporate Ads:   IQSTEL is already operating in a broad range of countries to achieve a global presence. Is there a geographic region where you feel <span className="font-MontserratBold">IQST</span> has more room to grow in the upcoming years or any specific countries that you would like to enter next?
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Leandro Iglesias: Yes, while IQSTEL already operates in over 21 countries, we see <span className="font-MontserratBold">tremendous growth potential in Africa,</span> and {`that's where we're`} setting our sights for the next major geographic expansion.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        {`We've`} already taken the first step by hiring a <span className="font-MontserratBold">Senior Business Manager in Kenya</span>, which we consider a strategic gateway into the African market. We believe that <span className="font-MontserratBold">being local is essential</span> — {`it's `}the only way to truly understand the market, the culture, and the daily needs of the people. That local knowledge is what will allow us to <span className="font-MontserratBold">develop tailored products and services</span> that truly fit into their lives.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Africa presents a compelling opportunity, especially in areas like <span className="font-MontserratBold">fintech, telecom infrastructure, mobile payments, and financial inclusion.</span> The demand for innovative, accessible technology is enormous — and we believe IQSTEL can play a meaningful role in accelerating digital transformation across the continent.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Our goal is not just to enter these markets, but to <span className="font-MontserratBold">build a telecom and fintech powerhouse in Africa</span>, just as {`we've`} done in other regions. And we plan to do it by combining global experience with local execution.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Corporate Ads:   With IQSTEL now officially listed on the NASDAQ Capital Market, what changes or new opportunities should shareholders expect in terms of growth, visibility, and long-term value creation?
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Leandro Iglesias: Absolutely—our uplisting to NASDAQ is more than just a milestone; {`it's`} a transformational moment for the company.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        First, <span className="font-MontserratBold">it significantly increases our visibility and credibility </span>in the global investment community. {`We're`} now on the radar of institutional investors, family offices, and funds that only consider NASDAQ-listed companies. This expanded exposure can lead to greater demand for our stock and increased liquidity.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Second, being on NASDAQ allows us to <span className="font-MontserratBold">leverage our proven growth story more effectively</span>. {`We've`} already demonstrated our ability to scale organically and through strategic acquisitions. Our investors can now expect us to accelerate that momentum, especially in high-margin areas like fintech, managed services, and cybersecurity.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Third, we now have access to more strategic opportunities, including partnerships, M&A activity, and even new sources of non-dilutive capital—opportunities that {`weren't`} as accessible when we were on the OTC.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Fourth, Being listed on NASDAQ, combined with our explosive growth trajectory, <span className="font-MontserratBold">positions IQSTEL as a highly attractive acquisition target</span>. {`We've`} built a scalable, high-margin business with global reach and diversified services in telecom, fintech, and tech. It {`wouldn't`} be surprising if larger companies seeking rapid entry into these verticals—or those looking to accelerate their own digital transformation—consider IQSTEL as a strategic acquisition opportunity.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Finally, our shareholders can expect a <span className="font-MontserratBold">relentless focus on bottom-line growth</span>. {`We've`} reached critical mass—so every additional dollar of revenue has a more powerful impact on EBITDA and net income. With more than 600 telecom clients globally and a strong fintech roadmap, {`we're`} building a scalable platform that creates long-term value.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        {`We're not just uplisted—we're uplifted, and we're just getting started.`}
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Corporate Ads: Thank you, Leandro Iglesias, President and CEO of IQSTEL. We look forward to speaking with you again in the future as all of your progress and plans move forward towards the goal of becoming a $1 billion company by 2027.   
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Website: <Link className="font-MontserratBold underline" href="https://c212.net/c/link/?t=0&l=en&o=4440834-1&h=2264965732&u=https%3A%2F%2Fwww.iQSTEL.com&a=www.iQSTEL.com">www.iQSTEL.com</Link>
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        DISCLAIMER: <Link className="font-MontserratBold underline" href="https://c212.net/c/link/?t=0&l=en&o=4440834-1&h=3400539216&u=https%3A%2F%2Fcorporateads.com%2Fdisclaimer%2F&a=https%3A%2F%2Fcorporateads.com%2Fdisclaimer%2F">https://corporateads.com/disclaimer/</Link>
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Disclosure listed on the CorporateAds website
                    </p>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">About IQSTEL Inc.</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        IQSTEL Inc. (OTCQX: <span className="font-MontserratBold">IQST</span>) is a multinational technology company offering cutting-edge solutions in <span className="font-MontserratBold">Telecom, Fintech, Blockchain, Artificial Intelligence (AI), and Cybersecurity</span>. Operating in 21 countries, IQSTEL delivers high-value, high-margin services to its extensive global customer base. IQSTEL projects $340 million in revenue for FY-2025, building on its strong business platform.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        <span className="font-MontserratBold">Use of Non-GAAP Financial Measures</span>: The Company uses certain financial calculations such as Adjusted EBITDA, Return on Assets and Return on  Equity as factors in the measurement and evaluation of the {`Company's`} operating performance and period-over-period growth. The Company derives these financial calculations on the basis of methodologies other than generally accepted accounting principles {`("GAAP")`}, primarily by excluding from a comparable GAAP measure certain items the Company does not consider to be representative of its actual operating performance. These financial calculations are {`"non-GAAP financial measures"`} as defined under the SEC rules. The Company uses these non-GAAP financial measures in operating its business because management believes they are less susceptible to variances in actual operating performance that can result from the excluded items, other infrequent charges and currency fluctuations. The Company presents these financial measures to investors because management believes they are useful to investors in evaluating the primary factors that drive the {`Company's`} core operating performance and provide greater transparency into the {`Company's`} results of operations. However, items that are excluded and other adjustments and assumptions that are made in calculating these non-GAAP financial measures are significant components in understanding and assessing the {`Company's`} financial performance. These non-GAAP financial measures should be evaluated in conjunction with, and are not a substitute for, the {`Company's`} GAAP financial measures. Further, because these non-GAAP financial measures are not determined in accordance with GAAP, and are thus susceptible to varying calculations, the non-GAAP financial measures, as presented, may not be comparable to other similarly-titled measures of other companies.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Adjusted EBITDA is not a recognized accounting measurement under GAAP; it should not be considered as an alternative to net income, as a measure of operating results, or as an alternative to cash flow as a measure of liquidity. It is presented here not as an alternative to net income, but rather as a measure of the {`Company's`} operating performance. Adjusted EBITDA excludes, in addition to non-operational expenses like interest expenses, taxes, depreciation and amortization; items that we believe are not indicative of our operating performance, such as:
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Change in Fair Value of Derivative Liabilities: These adjustments reflect unrealized gains or losses that are non-operational and subject to market volatility.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Loss on Settlement of Debt: This represents non-recurring expenses associated with specific financing activities and does not impact ongoing business operations.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        Stock-Based Compensation: As a non-cash expense, this adjustment eliminates variability caused by equity-based incentives.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        The Company believes Adjusted EBITDA offers a clearer view of the cash-generating potential of its business, excluding non-recurring, non-cash, and non-operational impacts. Management believes that Adjusted EBITDA is useful in evaluating the {`Company's`} operating performance compared to that of other companies in its industry because the calculation of Adjusted EBITDA generally eliminates the effects of financing, income taxes, non-cash and certain other items that may vary for different companies for reasons unrelated to overall operating performance and also believes this information is useful to investors.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        <span className="font-MontserratBold">Safe Harbor Statement</span>: {`Statements in this news release may be "forward-looking statements". Forward-looking statements include, but are not limited to, statements that express our intentions, beliefs, expectations, strategies, predictions, or any other information relating to our future activities or other future events or conditions. Words such as "anticipate," "believe," "estimate," "expect," "intend", "could" and similar expressions, as they relate to the company or its management, identify forward-looking statements. These statements are based on current expectations, estimates, and projections about our business based partly on assumptions made by management. Important factors that could cause our actual results and financial condition to differ materially from those indicated in the forward-looking statements include, among others, the following: our ability to successfully market our products and services; our continued ability to pay operating costs and ability to meet demand for our products and services; the amount and nature of competition from other telecom products and services; the effects of changes in the cybersecurity and telecom markets; our ability to successfully develop new products and services; our ability to complete complementary acquisitions and dispositions that benefit our company; our success establishing and maintaining collaborative, strategic alliance agreements with our industry partners; our ability to comply with applicable regulations; our ability to secure capital when needed; and the other risks and uncertainties described in our prior filings with the Securities and Exchange Commission.`}
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                        These statements are not guarantees of future performance and involve risks, uncertainties, and assumptions that are difficult to predict. Therefore, actual outcomes and results may and are likely to differ materially from what is expressed or forecasted in forward-looking statements due to numerous factors. Any forward-looking statements speak only as of the date of this news release, and iQSTEL Inc. undertakes no obligation to update any forward-looking statement to reflect events or circumstances after the date of this news release.
                    </p>
                    <p className="font-MontserratMedium text-base pt-12 text-[#343D48]">
                    For more information, please visit  
                    <Link className="text-primaryMain" href="https://c212.net/c/link/?t=0&l=en&o=4446671-1&h=2863809633&u=http%3A%2F%2Fwww.iqstel.com%2F&a=www.IQSTEL.com"> www.IQSTEL.com.</Link>
                    </p>
                </div>
                <Disclaimer />
            </div>
        </>
    );
};

export default PRESSRELEASEIQST;