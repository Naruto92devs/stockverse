'use client';
import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import Disclaimer from "@/components/Article_disclaimer";

const Noev = () => {

    const pressReleaseUrl = `https://stockverse.com/news/december-pick-neov`; // The current URL

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
                <Link href="/dashboard?view=news" className="font-sansMedium text-base 2xl:text-xl flex items-center w-max justify-start gap-4">
                    <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to news
                </Link>
            </div>
          <div className="w-full h-full mx-auto xl:container lg:px-[15%] max-xl:px-3">
            <div className="py-8 gap-y-6">
                <h1 className="text-4xl 2xl:text-5xl font-sansMedium max-sm:text-[1.6rem]  text-left text-primaryText  leading-[140%] 2xl:leading-[140%]">How One Bright Stock {`Couldn’t`} Have Planned Their Surge At A Better Time. NASDAQ: <span style={{fontWeight: 900}}>NEOV</span></h1>
            </div>
            <div className="pt-8 lg:pt-4 flex flex-col sm:flex-row gap-y-6 justify-between items-start sm:items-center border-t border-[#404040]">
                <Link href='/dashboard?view=news' className=" leading-[110%] 2xl:text-xl text-sm font-sansMedium text-[#634FF7]">Dec 12, 2024 by Stockverse</Link>
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
                <h2 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium pt-2">Dear Investor,</h2>
                <p className="text-base text-primaryText font-sansRegular leading-[150%]">{`We’ve seen mind boggling innovations throughout the United States, and the world over the past few decades — to the point our day-to-day lives are completely different. `}</p>
                <p className="text-base text-primaryText leading-[140%]">Today:</p>
                <ol className="list-disc pl-8 flex flex-col gap-y-4">
                    <li className="text-base text-primaryText font-sansRegular">We walk around with a world of information in our pockets</li>
                    <li className="text-base text-primaryText font-sansRegular">{`Big businesses are started in people’s homes`}</li>
                    <li className="text-base text-primaryText font-sansRegular">{`Artificial Intelligence is used regularly to improve our lives`}</li>
                </ol>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`Today’s everyday life would be nearly unrecognizable just a few decades back. All thanks to cutting-edge technologies. And with a growing reliance on technology, has created a dependence for consistent, and affordable energy sourcing.`}</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`… and given shifts in impending climate change and other environmental variables, there’s been a long-standing push to evolve from conventional energy sourcing.`}</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`The once heavily contested industry has seen a US-based Solar Generation Growth of 723% (and climbing) since 2014, according to Climate Central. This jolt in growth has reshaped the national economy, as well as how we see renewable energy.`}</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`American households once reliant on gas, oil, or expensive for-profit utility companies now have affordable, eco-friendly alternative methods for powering their homes and lifestyles.`}</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">And according to the US Energy Information Administration,<span className="underline"> US-based power generation is projected to grow 75%</span>, from 163 billion kilowatt hours in 2023, to 286 billion kilowatt hours in 2025.</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">This has created a massive BOOM in solar sales, jobs and beyond.</p>
                <ol className="list-disc pl-8 flex flex-col gap-y-4 font-sansRegular">
                    <li className="text-base text-primaryText">Solar deployments have seen an average annual growth rate of 25%</li>
                    <li className="text-base text-primaryText">{`55% of all new electric capacity added to the grid in 2023, came from solar`}</li>
                    <li className="text-base text-primaryText">{`And over 18% of the US’s solar capacity has a corporate offtaker.`}</li>
                </ol>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">That’s one reason why major US corporations like Meta, Amazon, Google, Apple and Walmart are investing in solar at record levels, according to SEIA reports.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">In response to this high-in-demand use of alternative energy, companies around the country (and world) are racing to produce the best panels, inverters, mounting systems, trackers, batteries and more — all to be seen as the standard that powers-up the United States.</p>

                <h3 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium">Solar Living, Post-NEM 3.0</h3>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">NEM 3.0, or Net Energy Metering 3.0 was officially passed via an unanimous CPUC (California Public Utilities Commission) vote, as of December 15th, 2022.</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">As a result, California-based homeowners with solar paid up to 75% less in monthly electric bills.</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">NEM 3.0 also led to decreasing export rates, allowing for home solar systems to pay for themselves faster, despite increasing upfront costs, creating a boom in home installations.</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">And thanks to 2022’s passing of the Inflation Reduction Act, and the millions in tax credits that came with it, we’ve seen significant improvements in baseline projections for the solar industry for the foreseeable future.</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">Based on SEIA’s projections, solar deployment will see a 46% boost over the next 5 years alone, relative to pre-IRA projections.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">But the big news is in the battery systems…</p>
                <h2 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium">New Battery Systems Make or Break Solar Investments</h2>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">With homeowners looking to rely less on the grid, more and more people are setting their sights on the best, more reliable battery systems.</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">This comes down to direct savings, better coverage in the event of hazardous weather, and the option to sell-back excess energy to the grid.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">Between decreasing reliability from the grid and a growing trend of unprecedented storms along the US’ east coast, there has been an added sense of urgency for homeowners to have backup systems in the event of brownouts, blackouts, and weather-related power outages.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">That’s why manufacturers are racing to produce the most secure and durable battery systems with the highest nominal capacities. Yet, in a sea of competition, one company has clearly stood out as the brightest.</p>

                <h4 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium">Introducing NeoVolta (NEOV): The Stock Leading the Charge in Solar Energy Storage</h4>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`NeoVolta (NEOV) is a publicly-traded solar battery company leading the solar industry with best-in-class battery systems.`}</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">As the solar industry continues to gain traction around the nation, battery systems will be the main focus for consumers and investors alike. Stronger, more reliable battery systems will define solar’s inherent value, in the eyes of coastal and mainland Americans.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">“Will I be able to store enough power for my home?”</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">“Will climate change impact the effectiveness of solar?”</p>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">“Will solar equipment be able to withstand harsh storms?”</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">These are all questions consumers are, and will be asking, when it comes time to invest in the future of their home’s energy production. And the answer to these questions comes from the leader in solar batteries…</p>

                <h4 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium">Led By Proven Experience</h4>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">NeoVolta is led by CEO Ardes Johnson. Johnson is known for his work at Tesla, Meyer Burger Americas, SolarWorld Americas, and General Electric. Johnson launched the PowerWall and PowerPack partner channel programs, which secured an 80 MWh storage contract with southern California Edison during his time at Tesla.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">As the President and General Manager at Meyer Burger Americas, Johnson oversaw a $1,000,000,000 backlog and scaled manufacturing to 2 gigawatts annually within just 90 days.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">With his experience with said solar giants, many believe Johnson will have a competitive edge, when it comes to forming lasting strategic partnerships that supercharge NeoVolta ahead of its competition. In other words, there is no better man to steer the solar ship!</p>

                <h4 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium">An Ever-Expanding Dealer Network</h4>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">NeoVolta recently secured a $1,400,000 purchase order from National Renewable Energy Partners (NREP) for 150 NV14 energy storage systems. As part of this deal, NeoVolta’s dealer network is expected to expand to Ohio, Texas, Connecticut, Indiana, and Pennsylvania. And with this momentum, more can follow suit.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">“Today marks a significant milestone for NeoVolta as we secure a $1.4 million deal with National Renewable Energy Partners. This partnership not only expands our dealer network into key states like Ohio, Texas, and Connecticut but also reinforces our commitment to empowering homeowners with innovative solar energy storage solutions. Together, we are shaping a more sustainable future,”  — Ardes Johnson, NeoVolta CEO</p>

                <h4 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium">Uncle Sam Approves: $250M Loan From The US Department of Energy</h4>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">As of November, 2024, NeoVolta successfully secured a $250,000,000 loan from the US Department of Energy (DOE), via the Title 17 Loan Program. These funds were immediately allocated towards establishing a state-of-the-art manufacturing facility, as well as regional deployment centers around the country.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">This low-interest loan will enable NeoVolta to create 150+ high-paying jobs, and work in complete compliance with 2022’s Inflation Reduction Act (IRA), ensuring domestic codification.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">This initiative has received bipartisan support, including cited optimism from President-Elect Trump’s pro-solar energy stance.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">The result: NeoVolta received economic development offers from 23 states — offers that are currently under review by their executive team.</p>

                <h4 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium">A Glance into the Future</h4>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">At this point, the quest for renewable energy is inevitable. With a rise in solar, we’re seeing:</p>
                <ul className="list-disc pl-8 font-sansRegular">
                    <li className="text-base text-primaryText leading-[140%]">an increase in jobs that experts project will only increase with time</li>
                    <li className="text-base text-primaryText leading-[140%]">more interest in green environmental initiatives</li>
                    <li className="text-base text-primaryText leading-[140%]">a conflict-free, bipartisan effort to invest in the future of energy production</li>
                </ul>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">Every investor knows solar is the future of home energy, but the question is, which company will lead the charge?</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`The truth is, there’s no single way to look at this.`}</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">The solar company(s) that go on to lead the industry will do so because of their cutting-edge batteries and technology, as well as support from local and national governmental institutions.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`And as investors, it’s our job to consider the odds, considering what we know, and what experts are projecting.`}</p>

                <h4 className="text-xl text-primaryText md:text-2xl 2xl:text-3xl font-sansMedium">Expert Investors Are Closely Watching NeoVolta (NEOV)</h4>
                <p className="text-base text-primaryText leading-[140%] font-sansRegular">As previously mentioned, there are a plethora of economic, governmental and environmental factors that will decide the future of solar.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">In the case of NeoVolta, the stars are beginning to align.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`Over the last few years, we’ve seen one solar company make massive strides that have garnered bipartisan support, a commitment to clean energy and an industry-leading standard in growth and strategic partnerships.`}</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`Those accomplishments aside: Regardless of the direct trajectory of the solar industry, battery systems will be at the heart of every move. And we haven't found a more promising company.`}</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">As the solar industry spreads throughout the country, so will NeoVolta. For those that see a bright future in solar and see how NeoVolta is leading the charge, now is the time to take a closer look.</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">{`As we’ve already detailed, the expansion of the solar industry is inevitable at this point. And based on trends and consumer reports, experts are looking at solar companies producing the best, more reliable batteries designed to keep households powered, regardless of climate.`}</p>

                <p className="text-base text-primaryText leading-[140%] font-sansRegular">Given their extensive industry leadership, current position and cutting-edge products — we believe NeoVolta is, without a doubt, the solar stock to consider adding to your watchlist for 2025.</p>
            </div>
            <Disclaimer/>
        </div>
        </>
    );
}

export default Noev;