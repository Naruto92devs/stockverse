"use client";
import Link from "next/link";
import Disclaimer from "@/components/Bblr_disclaimer";

const WEBAI = () => {
    const pressReleaseUrl = `https://stockverse.com/news/ethical-web-ai-launches-ai-vault`; // The current URL

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
                    Ethical Web AI Launches "AI Vault," a Groundbreaking Enterprise SaaS Solution Designed to Protect Subscribers from Various AI Threats
                    </h1>
                </div>
                <div className="pt-8 lg:pt-4 flex flex-col sm:flex-row gap-y-6 justify-between items-start sm:items-center border-t border-[#404040]">
                    <Link
                        href="/dashboard?view=news"
                        className=" leading-[110%] text-base font-MontserratMedium text-[#634FF7]"
                    >
                        May, 2025 by Stockverse
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
                    <ul className="list-disc font-MontserratBold text-base 2xl:text-xl pt-12 text-[#343D48] space-y-6">
                      <li>Company Enters $1 Billion Marketplace Projected to Double by 2029</li>
                      <li>Advanced Beta Version is Being Demo'd to Major Prospective Partners</li>
                      <li>New Patent Filing, Company Infrastructure Build-out, Expected in 2Q-25</li>
                    </ul>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      NEW YORK, March 17, 2025 (GLOBE NEWSWIRE) -- Ethical Web AI (d/b/a Bubblr Inc.) (OTCQB: BBLR), a leader in Generative AI innovation, today announced that it has launched its groundbreaking Generative AI enterprise security product – AI VaultTM. AI Vault is a groundbreaking, generative AI-powered enterprise security software-as-a-service (SaaS) solution built upon Ethical Web AI's growing AI intellectual property estate, including 3 US patents that have been developed over the past two years.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      As a further enhancement of this product launch, Ethical Web AI has filed a new US patent (app.no. 19055968) titled Sensitive Data Protection for Generative AI. This patent describes a key process of dynamically detecting sensitive terms in Generative AI prompts.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      As was previously outlined in its February 5 <Link href="https://www.globenewswire.com/Tracker?data=baMFj_Yv-AuvZ8739Zo7JdWvrZ5a5rUqF09so0jzU_QclPmye8IpS3zZUB4EDATxCBKm-8mTc1kj80CikHFf3BeKC13t1844BW2Ta5mRuPw=" className="font-MontserratBold underline">news release</Link> as the Company's next strategic initiative, this enterprise-level SaaS product is designed to protect enterprises from emerging cyber threats posed by uncontrolled employee use of ChatGPT, DeepSeek, and their peers while ensuring clients' sensitive information remains protected and confidential.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      Leveraging advanced generative AI, AI Vault enhances threat detection, response, and prevention with real-time redaction of the subscribers' critical data. It has been designed specifically for AWS customers to become a seamless component of a scalable, secure Gen AI Marketplace enterprise proposition.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      Twenty-seven per cent of enterprises have banned generative AI applications such as ChatGPT, according to the <Link href="https://www.globenewswire.com/Tracker?data=cF3tfY3TTrvOt8HsJTcXOfbdqSdYAAwiNe75r3UzKFdrLD7xBaQQqv6JC517ATWd_KDaviro6nkP8Jco1u5WleDrb9_adK4xXTIUoyS6Quyxbg7tVhByrlGRUx9eLfLClgv2YFm7IdHVcLDndLxx9B2F0FmsZJgYROCsY31kyruZiHoRXQsAiMQ4tLwQzZOb">2024 Cisco Data Privacy Study</Link> published in January 2025. The productivity, process optimization, and customer service benefits expected from widespread, growing commercial and enterprise AI adoption are being lost or threatened by poorly understood and inadequately managed risks.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      Analysts at <Link href="https://www.globenewswire.com/Tracker?data=KWmVBDM1BfPNxsI0EA05U6tiDIvrOp5TwkjumA5niQDQ3fOo3qKlCPM2-mF3b-T5aaEMevZ-DvPSvAIwJS72m0MKqqmgBh9N93y89mDAAKtMDYPzCwJzJ5yYyNR1YtNqzZroF2cGT3u0m-C7XUDqRNXXuy9xZC-nDLF9um4QHHFeW2E1w60psrQVlR3WWpBsCffbEbv2aBBIhgw5U0yffyoxmD-9E5RhtFEHS2-lmlg=" className="underline font-MontserratBold">The Business Research Company</Link> project the Generative AI-in-security addressable market to see exponential growth in the next few years – from $0.8 billion in 2024 to $2.04 billion in 2029 at a compound annual growth rate (CAGR) of 20.6%. Its report states, "The growth in the historical period can be attributed to the rise in cyber threats, the big data explosion, the development of generative models, new security challenges due to the vast number of connected devices, and real-time threat detection and response."
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      According to <Link href="https://www.globenewswire.com/Tracker?data=n3jNmUxxgAp98cIE1-OcxWgUFdBLQnCVLSC7DcClyIq-0qOGQCh8-LZhcuJgKWNiDAJ5G28O77cPf4nYy6oGnNxghffqDqAmRv2mNImTKVXeNMdRQ_Q_2JNPzuBvYjUtaJruHHAYcMVM78lCqCHNv-gciC3NQn5p1s7Eu0KISJY=" className="underline font-MontserratBold">Fortune Business Insights</Link>, the broader, US generative AI market size was valued at $21.87 billion in 2023 and is projected to reach an estimated value of $220.27 billion by 2032, "driven by technological advancements, increased cloud adoption, demand for automation, and significant venture capital investments."
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      Commenting on the AI Vault launch, Chief Executive Officer Tom Symonds said, "We're thrilled to introduce a uniquely smart and feature-rich security solution for cloud-based enterprise users of generative AI. With 27 per cent of enterprises banning their employees' use of AI, we are offering a highly cost-effective, seamlessly integrated solution that we are confident will accelerate AI adoption globally by ensuring its privacy and safety.”
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      "We are privately demonstrating AI Vault in beta to highly prospective partners. Going forward, as we are approaching commercialization, we expect to publish our detailed demo program in the next few weeks," Mr. Symonds added. "We are making solid progress building out a deliberately lean but robust corporate infrastructure to include adding a Chief Revenue Officer, publishing a new investor presentation deck, and upgrading our website content for clients and shareholders."
                    </p>
                    
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">How AI Vault Works</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      AI Vault serves as a secure generative AI aggregator, ensuring that third-party content providers (such as OpenAI) cannot trace the origin of user prompts. This anonymization guarantees complete confidentiality for enterprise users. Further, its Automated Redaction Engine instantly redacts sensitive terms in communications and logs, ensuring compliance and confidentiality.
                    </p>

                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Key AI Vault Features</h4>
                    <ul className="list-disc font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48] space-y-6">
                      <li>AI-Driven Threat Intelligence: Uses generative AI to analyze vast datasets and identify patterns indicative of cyber threats.</li>
                      <li>Real-Time Anomaly Detection: Continuously monitors network activity to detect and neutralize threats before they cause harm.</li>
                      <li>Adaptive Security Framework: Evolves with emerging threats, ensuring long-term protection against AI-powered cyberattacks.</li>
                    </ul>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Key AI Vault Benefits</h4>
                    <ul className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48] space-y-6">
                      <li className="list-disc">Bundled AI Licenses with Secure Architecture</li>
                      <li>Unlike other solutions that require businesses to procure separate generative AI licenses, AI Vault provides cost-effective pre-integrated AI licenses as part of its turnkey package.</li>
                      <li className="list-disc">Fully Encrypted Enterprise Deployment</li>
                      <li>AI Vault operates within a dedicated AWS environment for each client, containerizing product components — including an AWS RDS instance that stores all AI-generated prompts and responses.</li>
                      <li className="list-disc">Advanced-Data Redaction & Contextual Sensitivity Detection</li>
                      <li>AI Vault uniquely identifies explicitly defined sensitive terms and suggests additional potentially sensitive terms through LLM-based Named Entity Recognition (NER).</li>
                      <li className="list-disc">Patent-Protected Secure Workflow</li>
                      <li>AI Vault executes a structured, end-to-end anonymized process.</li>
                      <li className="list-disc">Multimedia Integration and Real-Time Data Handling</li>
                      <li>AI Vault provides rapid, turnkey, effortless deployment requiring no bespoke integration into existing infrastructure.</li>
                      <li className="list-disc">Cost-Effective and Scalable</li>
                      <li>As an aggregated AI solution, AI Vault not only enhances security but also reduces generative AI costs by 25 per cent.</li>
                    </ul>
                   
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">
                      About Ethical Web AI
                    </h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      Ethical Web AI is an AI-based cybersecurity technology company currently commercializing its enterprise AI VaultTM solution. Built upon its powerful IP and patent estate, it is the first in a planned suite of SaaS products to champion a private, safe, and high-value AI experience.
                    </p>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      AI Vault initially targets the global enterprise marketplace with innovative solutions that protect businesses from advanced threats.
                    </p>

                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Media and investor contact – <Link href="" className="underline">tom.symonds@ethicalweb.ai</Link></h4>
                    <h4 className="text-[#1D3045] font-MontserratBold pt-24 2xl:text-4xl text-2xl !leading-[1.5]">Safe Harbor Statement</h4>
                    <p className="font-MontserratMedium text-base 2xl:text-xl pt-12 text-[#343D48]">
                      This press release contains forward-looking statements within the meaning of Section 27A of the Securities Act of 1933 and Section 21E of the Securities Exchange Act of 1934. These forward-looking statements are based on the current plans and expectations of management. They are subject to several uncertainties and risks that could significantly affect the Company's current plans and expectations, future operations, and financial condition. The Company reserves the right to update or alter its forward-looking statements, whether due to new information, future events or otherwise.
                    </p>

                    {/* <h4 className="text-[#1D3045] font-MontserratBold pt-12 text-2xl !leading-[1.5]">Corporate and Investor Relations</h4>
                    <p className="font-MontserratMedium text-base text-[#343D48]">{`Paul Sagan`}</p>
                    <p className="font-MontserratMedium text-base text-[#343D48]">{`LaVoieHealthScience`}</p>
                    <p className="font-MontserratMedium text-base text-[#343D48]">{`(617) 865-0041`}</p>
                    <Link href='mailto:psagan@lavoiehealthscience.com' className="font-MontserratMedium text-base text-[#343D48]">{`psagan@lavoiehealthscience.com`}</Link>

                    <h4 className="text-[#1D3045] font-MontserratBold pt-12 text-2xl !leading-[1.5]">Media</h4>
                    <p className="font-MontserratMedium text-base text-[#343D48]">{`Andrew Korda`}</p>
                    <p className="font-MontserratMedium text-base text-[#343D48]">{`LaVoieHealthScience`}</p>
                    <p className="font-MontserratMedium text-base text-[#343D48]">{`(617) 865-0043`}</p>
                    <Link href='mailto:akorda@lavoiehealthscience.com' className="font-MontserratMedium text-base text-[#343D48]">{`akorda@lavoiehealthscience.com`}</Link>
                    
                    <p className="text-base  text-primaryText leading-[200%] font-sansRegular">{`SOURCE Cadrenal Therapeutics, Inc.`}</p> */}
                </div>
                <Disclaimer />
            </div>
        </>
    );
};

export default WEBAI;