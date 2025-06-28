'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const CBRA = () => {

      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [loading, setLoading] = useState(null);
      const [done, setDone] = useState(null);
      const [error, setError] = useState(null); // Error state
      const [message, setMessage] = useState(null);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const isValidPhone = phone && phone.replace(/\D/g, '').length >= 10;
      const isFormValid = email && isValidPhone && !loading;
      const [ytid , Setytid] = useState("");


    useEffect(() => {
  Setytid("FryCzL17YRs");
}, []);



      
    

      const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

  const handleSubscribeEmailPhone = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const requestData = {
        email,
        tag: 'CBRA subscriber'
      };

      // Only add the phone number if it is provided
      if (phone) {
        requestData.phone = `${phone}`;
      }

      const response = await axios.post(`${STOCKVERSE_BACK_END}/stockpicks/create-contact`, requestData);

      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        setMessage(data.message);
        setLoading(false);
        setError(false);
        setEmail('');
        setPhone('');
        setDone(true);
      } else {
        setDone(true);
        setError(true);
        setEmail('');
        setPhone('');
        setMessage(data.message || 'Something went wrong');
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(true);
        setDone(true);
        setEmail('');
        setPhone('');
        setMessage(error.response.data.message || 'Something went wrong');
        // setMessage('An error occurred. Please try again.');
        setLoading(false);
      } else {
        setDone(true);
        setError(true);
        setEmail('');
        setPhone('');
        setMessage('An error occurred. Please try again.');
        setLoading(false);
      }
      console.error('Error during subscribing:', error);
    }
  };

    return(
        <>
        {/* ----------hero-section------- */}
        <div className="bg-cbrabannergradient">
            <div className="w-full xl:container mx-auto px-4 xl:px-6 2xl:px-36 py-10 md:py-20 flex flex-col items-center">
            <p className="text-center font-inter font-medium text-sm lg:text-xl !leading-[130%] px-4 py-2 shadow-[0px_4px_4px_-4px_#00000040] border border-[#EFEFEF] border-solid rounded-full flex items-center gap-2 mb-6 lg:mb-10">
                <span className="w-3 h-3 bg-[#EB1F1F] rounded-full inline-block"></span> 
                IPO Now Live – April 11, 2025
            </p>
            <h1 className="font-RomanRegular text-center lg:px-12 !leading-[140%] text-4xl md:text-5xl lg:text-6xl mb-8 lg:mb-12">
                Caring Brands, Inc. (CABR){' '} 
                <span className="font-RomanItalic">
                    Just Launched Its IPO Now Trading on NASDAQ 
                </span>
            </h1>
            <p className="text-center font-inter font-normal text-base xl:text-xl leading-[130%] mb-8 md:px-0 px-12">
                Learn Why This OTC Health Innovator is Turning Heads
            </p>
            <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
                <p className="text-center font-inter font-normal text-base xl:text-xl leading-[130%] flex items-center gap-2 bg-cbraBg rounded-full px-4 py-2">
                    <span>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.36171 3.77989C7.49694 3.76437 7.78689 3.7311 8.06438 3.84883C8.29254 3.94563 8.49252 4.12655 8.61162 4.34391C8.70215 4.50914 8.73009 4.66809 8.74106 4.78692C8.75011 4.88496 8.75006 4.99466 8.75001 5.08219C8.75001 5.08827 8.75 5.09425 8.75 5.1001V8.5501C8.75 8.97014 8.75 9.18016 8.83175 9.3406C8.90365 9.48172 9.01839 9.59645 9.15951 9.66836C9.31994 9.7501 9.52996 9.7501 9.95 9.7501H13.4C13.4059 9.7501 13.4118 9.7501 13.4179 9.7501C13.5054 9.75005 13.6151 9.74999 13.7132 9.75904C13.832 9.77001 13.991 9.79796 14.1562 9.88849C14.3736 10.0076 14.5545 10.2076 14.6513 10.4357C14.769 10.7132 14.7357 11.0032 14.7202 11.1384C14.7187 11.1519 14.7173 11.1638 14.7163 11.174C14.6062 12.2709 14.2287 13.3279 13.6124 14.2502C12.8707 15.3602 11.8165 16.2254 10.5831 16.7363C9.34972 17.2472 7.99252 17.3809 6.68314 17.1204C5.37377 16.86 4.17104 16.2171 3.22703 15.2731C2.28303 14.3291 1.64015 13.1263 1.3797 11.817C1.11925 10.5076 1.25292 9.15039 1.76382 7.91699C2.27471 6.68359 3.13987 5.62938 4.2499 4.88768C5.17223 4.2714 6.22919 3.89388 7.32611 3.78382C7.33633 3.7828 7.34826 3.78143 7.36171 3.77989Z" fill="url(#paint0_linear_16591_1634)"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6383 0.779869C11.6517 0.781412 11.6637 0.78278 11.6739 0.783806C13.2166 0.93855 14.6669 1.62109 15.773 2.72713C16.879 3.83317 17.5616 5.28349 17.7163 6.82623C17.7173 6.83645 17.7187 6.84838 17.7202 6.86183C17.7357 6.99707 17.769 7.28701 17.6513 7.5645C17.5545 7.79266 17.3736 7.99263 17.1562 8.11172C16.991 8.20225 16.832 8.23019 16.7132 8.24116C16.6151 8.25021 16.5054 8.25015 16.4179 8.25011C16.4118 8.2501 16.4059 8.2501 16.4 8.2501L11.6 8.2501C11.5943 8.2501 11.5885 8.2501 11.5827 8.25011C11.4933 8.25014 11.3866 8.25018 11.2926 8.2425C11.1837 8.2336 11.0277 8.21077 10.8643 8.12748C10.6526 8.01963 10.4805 7.84752 10.3726 7.63584C10.2893 7.47238 10.2665 7.31639 10.2576 7.20748C10.2499 7.11349 10.25 7.00679 10.25 6.91746C10.25 6.91159 10.25 6.90581 10.25 6.9001V2.1001C10.25 2.09425 10.25 2.08827 10.25 2.08219C10.25 1.99466 10.2499 1.88496 10.2589 1.78692C10.2699 1.66809 10.2979 1.50914 10.3884 1.3439C10.5075 1.12655 10.7074 0.945633 10.9356 0.848831C11.2131 0.731098 11.503 0.764357 11.6383 0.779869Z" fill="url(#paint1_linear_16591_1634)"/>
                        <defs>
                        <linearGradient id="paint0_linear_16591_1634" x1="9.49334" y1="0.763428" x2="9.49334" y2="17.2501" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#634FF7"/>
                        <stop offset="1" stop-color="#A18BFF"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_16591_1634" x1="9.49334" y1="0.763428" x2="9.49334" y2="17.2501" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#634FF7"/>
                        <stop offset="1" stop-color="#A18BFF"/>
                        </linearGradient>
                        </defs>
                        </svg>
                    </span>
                    Emerging Growth Company 
               </p>
               <p className="text-center font-inter font-normal text-base xl:text-xl leading-[130%] flex items-center gap-2 bg-cbraBg rounded-full px-4 py-2">
                    <span>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.36171 3.77989C7.49694 3.76437 7.78689 3.7311 8.06438 3.84883C8.29254 3.94563 8.49252 4.12655 8.61162 4.34391C8.70215 4.50914 8.73009 4.66809 8.74106 4.78692C8.75011 4.88496 8.75006 4.99466 8.75001 5.08219C8.75001 5.08827 8.75 5.09425 8.75 5.1001V8.5501C8.75 8.97014 8.75 9.18016 8.83175 9.3406C8.90365 9.48172 9.01839 9.59645 9.15951 9.66836C9.31994 9.7501 9.52996 9.7501 9.95 9.7501H13.4C13.4059 9.7501 13.4118 9.7501 13.4179 9.7501C13.5054 9.75005 13.6151 9.74999 13.7132 9.75904C13.832 9.77001 13.991 9.79796 14.1562 9.88849C14.3736 10.0076 14.5545 10.2076 14.6513 10.4357C14.769 10.7132 14.7357 11.0032 14.7202 11.1384C14.7187 11.1519 14.7173 11.1638 14.7163 11.174C14.6062 12.2709 14.2287 13.3279 13.6124 14.2502C12.8707 15.3602 11.8165 16.2254 10.5831 16.7363C9.34972 17.2472 7.99252 17.3809 6.68314 17.1204C5.37377 16.86 4.17104 16.2171 3.22703 15.2731C2.28303 14.3291 1.64015 13.1263 1.3797 11.817C1.11925 10.5076 1.25292 9.15039 1.76382 7.91699C2.27471 6.68359 3.13987 5.62938 4.2499 4.88768C5.17223 4.2714 6.22919 3.89388 7.32611 3.78382C7.33633 3.7828 7.34826 3.78143 7.36171 3.77989Z" fill="url(#paint0_linear_16591_1634)"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6383 0.779869C11.6517 0.781412 11.6637 0.78278 11.6739 0.783806C13.2166 0.93855 14.6669 1.62109 15.773 2.72713C16.879 3.83317 17.5616 5.28349 17.7163 6.82623C17.7173 6.83645 17.7187 6.84838 17.7202 6.86183C17.7357 6.99707 17.769 7.28701 17.6513 7.5645C17.5545 7.79266 17.3736 7.99263 17.1562 8.11172C16.991 8.20225 16.832 8.23019 16.7132 8.24116C16.6151 8.25021 16.5054 8.25015 16.4179 8.25011C16.4118 8.2501 16.4059 8.2501 16.4 8.2501L11.6 8.2501C11.5943 8.2501 11.5885 8.2501 11.5827 8.25011C11.4933 8.25014 11.3866 8.25018 11.2926 8.2425C11.1837 8.2336 11.0277 8.21077 10.8643 8.12748C10.6526 8.01963 10.4805 7.84752 10.3726 7.63584C10.2893 7.47238 10.2665 7.31639 10.2576 7.20748C10.2499 7.11349 10.25 7.00679 10.25 6.91746C10.25 6.91159 10.25 6.90581 10.25 6.9001V2.1001C10.25 2.09425 10.25 2.08827 10.25 2.08219C10.25 1.99466 10.2499 1.88496 10.2589 1.78692C10.2699 1.66809 10.2979 1.50914 10.3884 1.3439C10.5075 1.12655 10.7074 0.945633 10.9356 0.848831C11.2131 0.731098 11.503 0.764357 11.6383 0.779869Z" fill="url(#paint1_linear_16591_1634)"/>
                        <defs>
                        <linearGradient id="paint0_linear_16591_1634" x1="9.49334" y1="0.763428" x2="9.49334" y2="17.2501" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#634FF7"/>
                        <stop offset="1" stop-color="#A18BFF"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_16591_1634" x1="9.49334" y1="0.763428" x2="9.49334" y2="17.2501" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#634FF7"/>
                        <stop offset="1" stop-color="#A18BFF"/>
                        </linearGradient>
                        </defs>
                        </svg>
                    </span>
                    High-Potential Pipeline 
               </p>
               <p className="text-center font-inter font-normal text-base xl:text-xl leading-[130%] flex items-center gap-2 bg-cbraBg rounded-full px-4 py-2">
                    <span>
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.36171 3.77989C7.49694 3.76437 7.78689 3.7311 8.06438 3.84883C8.29254 3.94563 8.49252 4.12655 8.61162 4.34391C8.70215 4.50914 8.73009 4.66809 8.74106 4.78692C8.75011 4.88496 8.75006 4.99466 8.75001 5.08219C8.75001 5.08827 8.75 5.09425 8.75 5.1001V8.5501C8.75 8.97014 8.75 9.18016 8.83175 9.3406C8.90365 9.48172 9.01839 9.59645 9.15951 9.66836C9.31994 9.7501 9.52996 9.7501 9.95 9.7501H13.4C13.4059 9.7501 13.4118 9.7501 13.4179 9.7501C13.5054 9.75005 13.6151 9.74999 13.7132 9.75904C13.832 9.77001 13.991 9.79796 14.1562 9.88849C14.3736 10.0076 14.5545 10.2076 14.6513 10.4357C14.769 10.7132 14.7357 11.0032 14.7202 11.1384C14.7187 11.1519 14.7173 11.1638 14.7163 11.174C14.6062 12.2709 14.2287 13.3279 13.6124 14.2502C12.8707 15.3602 11.8165 16.2254 10.5831 16.7363C9.34972 17.2472 7.99252 17.3809 6.68314 17.1204C5.37377 16.86 4.17104 16.2171 3.22703 15.2731C2.28303 14.3291 1.64015 13.1263 1.3797 11.817C1.11925 10.5076 1.25292 9.15039 1.76382 7.91699C2.27471 6.68359 3.13987 5.62938 4.2499 4.88768C5.17223 4.2714 6.22919 3.89388 7.32611 3.78382C7.33633 3.7828 7.34826 3.78143 7.36171 3.77989Z" fill="url(#paint0_linear_16591_1634)"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6383 0.779869C11.6517 0.781412 11.6637 0.78278 11.6739 0.783806C13.2166 0.93855 14.6669 1.62109 15.773 2.72713C16.879 3.83317 17.5616 5.28349 17.7163 6.82623C17.7173 6.83645 17.7187 6.84838 17.7202 6.86183C17.7357 6.99707 17.769 7.28701 17.6513 7.5645C17.5545 7.79266 17.3736 7.99263 17.1562 8.11172C16.991 8.20225 16.832 8.23019 16.7132 8.24116C16.6151 8.25021 16.5054 8.25015 16.4179 8.25011C16.4118 8.2501 16.4059 8.2501 16.4 8.2501L11.6 8.2501C11.5943 8.2501 11.5885 8.2501 11.5827 8.25011C11.4933 8.25014 11.3866 8.25018 11.2926 8.2425C11.1837 8.2336 11.0277 8.21077 10.8643 8.12748C10.6526 8.01963 10.4805 7.84752 10.3726 7.63584C10.2893 7.47238 10.2665 7.31639 10.2576 7.20748C10.2499 7.11349 10.25 7.00679 10.25 6.91746C10.25 6.91159 10.25 6.90581 10.25 6.9001V2.1001C10.25 2.09425 10.25 2.08827 10.25 2.08219C10.25 1.99466 10.2499 1.88496 10.2589 1.78692C10.2699 1.66809 10.2979 1.50914 10.3884 1.3439C10.5075 1.12655 10.7074 0.945633 10.9356 0.848831C11.2131 0.731098 11.503 0.764357 11.6383 0.779869Z" fill="url(#paint1_linear_16591_1634)"/>
                        <defs>
                        <linearGradient id="paint0_linear_16591_1634" x1="9.49334" y1="0.763428" x2="9.49334" y2="17.2501" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#634FF7"/>
                        <stop offset="1" stop-color="#A18BFF"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_16591_1634" x1="9.49334" y1="0.763428" x2="9.49334" y2="17.2501" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#634FF7"/>
                        <stop offset="1" stop-color="#A18BFF"/>
                        </linearGradient>
                        </defs>
                        </svg>
                    </span>
                    Backed by Patents & Sales 
               </p>
            </div>
             <div className="flex flex-wrap items-center justify-center gap-2">
               <Link className="text-center max-sm:w-full text-white font-sansMedium text-base xl:text-xl leading-[130%] flex items-center justify-center gap-2 bg-cbrablueBg hover:bg-cbrablueBg/85 duration-200 ease-in-out rounded-full px-4 md:py-2 py-4" href="/">
                    <span>Get Stock Alerts on CABR </span>
               </Link>
               <Link className="text-center max-sm:w-full font-sansMedium text-base xl:text-xl leading-[130%] flex items-center justify-center gap-2 border border-solid border-cbraBorder hover:text-white hover:bg-cbrablueBg/85 duration-200 ease-in-out rounded-full px-4 md:py-2 py-3" href="/">
                    View Ticker: NASDAQ: CABR
               </Link>
            </div>
            <div className="flex items-center justify-between mt-6 md:mt-20">
                <Image className="w-[65%]" width={892} height={498} src="/images/neovolta-energy-house.png" alt="img"/>
                <Image className="w-[33%]" width={652} height={714} src="/images/press-release.png" alt="img"/>
            </div>
            </div>
        </div>
        {/* ----------about---------------*/}
        <div className="w-full xl:container mx-auto px-4 xl:px-6 2xl:px-36 py-10 md:py-20">
            <div className="flex flex-col items-center">
                <h2 className="font-RomanRegular !leading-[140%] text-center text-[#111111] text-3xl md:text-4xl lg:text-cbraH2 mb-4 md:mb-10">What is Caring Brands (CABR)?</h2>
                <p className="text-center text-[#111111] font-inter !leading-[150%] tracking[-1%] text-base md:text-xl lg:text-2xl mb-4">
                    Caring Brands is a consumer wellness company offering science-backed, over-the-counter (OTC) products that address everyday health concerns—from hair loss and eczema to sexual wellness and jellyfish stings.
                </p>
                <p className="text-center text-[#606060] font-inter !leading-[150%] tracking[-1%] text-base md:text-xl lg:text-2xl md:px-40">
                    Their business model blends direct sales and global licensing royalties, with U.S. launches for 5 products rolling out in 2024–2025
                </p>
            </div>
            <div className="flex flex-wrap justify-between mt-10">
                <div className="w-[50%] lg:w-[25%] border-l border-[#000]/10 px-6 py-6 lg:py-4">
                <Image className="mb-6" width={42} height={45} src="/images/cbra-arrow.png" alt="arrow"/>
                    <p className="font-inter text-base md:text-xl lg:text-2xl !leading-[150%] tracking-[-0.4px] text-[#111]">
                        5 New Product Launches (2024-2025)
                    </p>
                </div>
                <div className="w-[50%] lg:w-[25%] border-l border-[#000]/10 px-6 py-6 lg:py-4">
                <Image className="mb-6" width={42} height={45} src="/images/cbra-arrow2.png" alt="arrow"/>
                    <p className="font-inter text-base md:text-xl lg:text-2xl !leading-[150%] tracking-[-0.4px] text-[#111]">
                        Revenue from India & Japan already flowing
                    </p>
                </div>
                <div className="w-[50%] lg:w-[25%] border-l border-[#000]/10 px-6 py-6 lg:py-4">
                <Image className="mb-6" width={42} height={45} src="/images/cbra-tick.png" alt="arrow"/>
                    <p className="font-inter text-base md:text-xl lg:text-2xl !leading-[150%] tracking-[-0.4px] text-[#111]">
                        16 Patents (Issued & Pending)
                    </p>
                </div>
                <div className="w-[50%] lg:w-[25%] border-l border-[#000]/10 px-6 py-6 lg:py-4">
                <Image className="mb-6" width={42} height={45} src="/images/cbra-target.png" alt="arrow"/>
                    <p className="font-inter text-base md:text-xl lg:text-2xl !leading-[150%] tracking-[-0.4px] text-[#111]">
                        Targeting $65 Billion+ Global Wellness Market
                    </p>
                </div>
            </div>
        </div>
        {/* -------quick facts------------- */}
        <div className="bg-[#010101]">
            <div className="bg-factsbg bg-cover bg-top-left">
                <div className="w-full xl:container mx-auto px-0 xl:px-6 2xl:px-36 py-14 md:py-28">
                    <h2 className="font-RomanRegular !leading-[140%] text-center text-white text-[2.2rem] md:text-4xl lg:text-cbraH2 mb-4 md:mb-10 max-sm:px-20">
                        Caring Brands, Inc. (CABR)<br/>
                        <span className="font-RomanItalic">Quick Facts</span>
                    </h2>
                    <div className="flex flex-wrap gap-y-2 lg:gap-y-6 px-4 justify-between">
                        <div className="w-full sm:w-[49.4%] md:w-[32.8%] px-6 md:px-12 py-6 shadow-[inset_0px_11px_70px_100px_#FFFFFF0F] backdrop-blur-xl rounded-xl border border-[#fff]/20">
                            <h3 style={{WebkitTextFillColor : "transparent",}} className="font-inter font-medium bg-cbratextgradient bg-clip-text !leading-[140%] text-[2.5rem] md:text-5xl lg:text-6xl mb-2">
                                750k
                            </h3>
                            <p className="text-white font-inter font-semibold !leading-[150%] tracking[-0.2px] text-xl lg:text-2xl mb-2">
                                Shares Offered
                            </p>
                            <p className="font-inter text-base !leading-[150%] text-[#9f9f9f]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            </p>
                        </div>
                        <div className="w-full sm:w-[49.4%] md:w-[32.8%] px-6 md:px-12 py-6 shadow-[inset_0px_11px_70px_100px_#FFFFFF0F] backdrop-blur-lg rounded-xl border border-[#fff]/20">
                            <h3 style={{WebkitTextFillColor : "transparent",}} className="font-inter font-medium bg-cbratextgradient bg-clip-text !leading-[140%] text-[2.5rem] md:text-5xl lg:text-6xl mb-2">
                                $4
                            </h3>
                            <p className="text-white font-inter font-semibold !leading-[150%] tracking[-0.2px] text-xl lg:text-2xl mb-2">
                                Price Per Share
                            </p>
                            <p className="font-inter text-base !leading-[150%] text-[#9f9f9f]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            </p>
                        </div>
                        <div className="w-full sm:w-[49.4%] md:w-[32.8%] px-6 md:px-12 py-6 shadow-[inset_0px_11px_70px_100px_#FFFFFF0F] backdrop-blur-lg rounded-xl border border-[#fff]/20">
                            <h3 style={{WebkitTextFillColor : "transparent",}} className="font-inter font-medium bg-cbratextgradient bg-clip-text !leading-[140%] text-[2.5rem] md:text-5xl lg:text-6xl mb-2">
                                $3m
                            </h3>
                            <p className="text-white font-inter font-semibold !leading-[150%] tracking[-0.2px] text-xl lg:text-2xl mb-2">
                                Total Raise
                            </p>
                            <p className="font-inter text-base !leading-[150%] text-[#9f9f9f]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            </p>
                        </div>
                        <div className="w-full sm:w-[49.4%] md:w-[32.8%] px-6 md:px-12 py-6">
                            <p className="text-white font-inter font-semibold !leading-[150%] tracking[-0.3px] text-xl lg:text-2xl mb-2">
                                Exchange NASDAQ Capital<br/>Market
                            </p>
                            <p className="font-inter text-base !leading-[150%] text-[#9f9f9f]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            </p>
                        </div>
                        <div className="w-full sm:w-[49.4%] md:w-[32.8%] px-6 md:px-12 py-6">
                            <p className="text-white font-inter font-semibold !leading-[150%] tracking[-0.3px] text-xl lg:text-2xl mb-2">
                                Ticker	CABR
                            </p>
                            <p className="font-inter text-base !leading-[150%] text-[#9f9f9f]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            </p>
                        </div>
                        <div className="w-full sm:w-[49.4%] md:w-[32.8%] px-6 md:px-12 py-6">
                            <p className="text-white font-inter font-semibold !leading-[150%] tracking[-0.3px] text-xl lg:text-2xl mb-2">
                                IPO Date April 11, 2025
                            </p>
                            <p className="font-inter text-base !leading-[150%] text-[#9f9f9f]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            </p>
                        </div>
                        <div className="w-full sm:w-[49.4%] md:w-[32.8%] px-6 md:px-12 py-6">
                            <p className="text-white font-inter font-semibold !leading-[150%] tracking[-0.3px] text-xl lg:text-2xl mb-2">
                                Spin-Off From Safety Shot<br/>100% ownership
                            </p>
                            <p className="font-inter text-base !leading-[150%] text-[#9f9f9f]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            </p>
                        </div>
                        <div className="w-full sm:w-[49.4%] md:w-[32.8%] px-6 md:px-12 py-6">
                            <p className="text-white font-inter font-semibold !leading-[150%] tracking[-0.3px] text-xl lg:text-2xl mb-2">
                                Filing Date<br/>March 20, 2025
                            </p>
                            <p className="font-inter text-base !leading-[150%] text-[#9f9f9f]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            </p>
                        </div>
                        <div className="w-full sm:w-[49.4%] md:w-[32.8%] px-6 md:px-12 py-6">
                            <p className="text-white font-inter font-semibold !leading-[150%] tracking[-0.3px] text-xl lg:text-2xl mb-2">
                                Status	Emerging Growth<br/>Company (JOBS Act)
                            </p>
                            <p className="font-inter text-base !tracking-[150%] text-[#9f9f9f]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-40 px-4 lg:px-20">
                        <h2 className="font-RomanRegular !leading-[140%] text-center text-white text-[2.2rem] md:text-4xl lg:text-cbraH2 mb-6 max-sm:px-8">
                        Innovative Product Pipeline
                        </h2>
                        <p className="font-inter text-base text-center md:text-2xl !leading-[150%] capitalize text-white mb-10">
                            Caring Brands is developing and launching science-driven, FDA-compliant OTC products including:
                        </p>
                        <iframe className="w-full h-[30rem] rounded-lg border border-[#3A3A3A]" src={`https://www.youtube.com/embed/${ytid}`} title="YouTube video player" frameborder="5" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>
                    </div>
                    <div style={{scrollbarWidth: "none",}} className="flex items-center md:justify-center gap-4 px-4 mt-6 overflow-x-auto whitespace-nowrap">
                        <div  className="relative">
                            <iframe className="w-[14rem] h-[7rem] rounded-lg border border-[#3A3A3A]" src="https://www.youtube.com/embed/FryCzL17YRs" title="YouTube video player" frameborder="5" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>
                            <div className="absolute w-full h-full top-0 left-0 cursor-pointer" onClick={ ()=> Setytid("FryCzL17YRs")}></div>
                        </div>
                        <div  className="relative">
                            <iframe className="w-[14rem] h-[7rem] rounded-lg border border-[#3A3A3A]" src="https://www.youtube.com/embed/jLoGBDGMdy4" title="YouTube video player" frameborder="5" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>
                            <div className="absolute w-full h-full top-0 left-0 cursor-pointer" onClick={()=> Setytid("jLoGBDGMdy4")}></div>
                        </div>
                        <div  className="relative">
                            <iframe className="w-[14rem] h-[7rem] rounded-lg border border-[#3A3A3A]" src="https://www.youtube.com/embed/yiFp5vMa9T0" title="YouTube video player" frameborder="5" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                            </iframe>
                            <div className="absolute w-full h-full top-0 left-0 cursor-pointer" onClick={()=> Setytid("yiFp5vMa9T0")}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* ------------top-reasons------- */}
        <div className="w-full xl:container mx-auto px-4 xl:px-6 2xl:px-36 py-10 md:py-20 lg:py-28 flex flex-wrap gap-y-10 justify-between">
            <div className="w-full md:w-[56%]">
                <p className="font-inter font-medium text-sm md:text-xl !leading-[130%] mb-2 md:mb-6">WHY INVESTORS ARE WATCHING</p>
                <h3 className="font-RomanRegular !leading-[140%] text-4xl md:text-5xl lg:text-6xl mb-3 lg:mb-12">
                    Top Reasons Investors<br/>
                   <span className="font-RomanItalic">Are Paying Attention</span>
                </h3>
                <div className="flex flex-wrap justify-between mt-10">
                    <div className="w-[42%] lg:w-[32%] md:px-6 py-6 lg:py-4">
                    <Image className="w-5 mb-6" width={42} height={42} src="/images/cbra-img1.png" alt="arrow"/>
                        <p className="font-inter text-xl !leading-[150%] mb-4 tracking-[-0.5px] text-[#111]">
                            Revenue Already Flowing
                        </p>
                        <p className="font-inter text-base text-base text-[#606060] !leading-[150%]">
                            Licensing deals in India & Japan
                        </p>
                    </div>
                    <div className="w-[46%] lg:w-[32%] md:px-6 py-6 lg:py-4">
                    <Image className="w-5 mb-6" width={44} height={44} src="/images/cbra-img2.png" alt="arrow"/>
                        <p className="font-inter text-xl !leading-[150%] mb-4 tracking-[-0.5px] text-[#111]">
                            Strong IP Positioning
                        </p>
                        <p className="font-inter text-base text-base text-[#606060] !leading-[150%]">
                            16 patents across products & diagnostics
                        </p>
                    </div>
                    <div className="w-[42%] lg:w-[32%] md:px-6 py-6 lg:py-4">
                    <Image className="w-5 mb-6" width={42} height={42} src="/images/cbra-img3.png" alt="arrow"/>
                        <p className="font-inter text-xl !leading-[150%] mb-4 tracking-[-0.5px] text-[#111]">
                            Scalable Model
                        </p>
                        <p className="font-inter text-base text-base text-[#606060] !leading-[150%]">
                            D2C & B2B strategies in play
                        </p>
                    </div>
                    <div className="w-[46%] lg:w-[32%] md:px-6 py-6 lg:py-4">
                        <Image className="w-4 mb-6" width={45} height={44} src="/images/cbra-img4.png" alt="arrow"/>
                            <p className="font-inter text-xl !leading-[150%] mb-4 tracking-[-0.5px] text-[#111]">
                                Breakthrough Science
                            </p>
                            <p className="font-inter text-base text-base text-[#606060] !leading-[150%]">
                            Validated treatments for massive markets
                            </p>
                    </div>
                    <div className="w-[42%] lg:w-[32%] md:px-6 py-6 lg:py-4">
                        <Image className="w-5 mb-6" width={35} height={45} src="/images/cbra-img5.png" alt="arrow"/>
                            <p className="font-inter text-xl !leading-[150%] mb-4 tracking-[-0.5px] text-[#111]">
                                Strategic Acquisition
                                in Motion
                            </p>
                            <p className="font-inter text-base text-base text-[#606060] !leading-[150%]">
                            LOI with GoldN™ platform for at-home diagnostics
                            </p>
                    </div>
                    <div className="w-[46%] lg:w-[32%] md:px-6 py-6 lg:py-4">
                        <Image className="w-5 mb-6" width={42} height={242} src="/images/cbra-img6.png" alt="arrow"/>
                            <p className="font-inter text-xl !leading-[150%] mb-4 tracking-[-0.5px] text-[#111]">
                               World-Class Team
                            </p>
                            <p className="font-inter text-base text-base text-[#606060] !leading-[150%]">
                               Ex-Jupiter Wellness, SmithKline, TapImmune leadership
                            </p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[40%] relative">
                <Image className="w-full h-full" width={513} height={674} alt="img" src="/images/dummy.png" />
                <div className="w-full absolute bottom-4 px-4 lg:px-6">
                    <div className="bg-white rounded-lg lg:rounded-full flex flex-wrap gap-y-2 md:justify-center gap-4 py-2 px-4">
                        <Link className="font-inter !leading-[150%] text-base md:text-xl text-[#111111] flex items-center gap-1" href="mailto:stockverse@email.com">
                        <Image width={24} height={24} src='/images/cvkd/sms.svg' alt="sms" className="w-5" loading="eager"/>
                         stockverse@email.com
                        </Link>
                        <Link className="font-inter !leading-[150%] text-base md:text-xl text-[#111111] flex items-center gap-1" href="tel:+1 (219) 555-0112">
                        <Image width={24} height={24} src='/images/cvkd/phone.svg' alt="sms" className="w-5" loading="eager" />
                        (219) 555-0114
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        {/* ---------Market--------------- */}
        <div className="bg-[#f5f5f5]">
            <div className="w-full xl:container mx-auto px-4 xl:px-6 2xl:px-36 py-14 lg:py-24 flex flex-wrap gap-y-8 items-end justify-between">
                <div className="w-full md:w-[53%]">
                    <h3 className="font-RomanRegular !leading-[140%] text-4xl md:text-5xl lg:text-6xl mb-8 lg:mb-16">
                    Stay Ahead of<span className="font-RomanItalic"> the Market</span>
                    </h3>
                    <p className="font-inter text-base lg:text-xl !leading-[150%] text-[#111] mb-8 lg:mb-20 pr-0 lg:pr-[12rem] capitalize">
                        Get real-time CABR updates, press releases, and investor alerts straight to your inbox or phone.
                    </p>
                    <p className="font-inter text-xl lg:text-2xl !leading-[160%] -tracking-[0.5px] mb-6">
                        Contact Details:
                    </p>
                    <p className="font-inter text-xl lg:text-2xl !leading-[160%] -tracking-[0.5px] text-[#9f9f9f]">
                        Location Address:
                    </p>
                    <p className="font-inter text-xl lg:text-2xl !leading-[160%] -tracking-[0.5px] text-[#9f9f9f]">
                        2464 Royal Ln. Mesa
                    </p>
                    <p className="font-inter text-xl lg:text-2xl !leading-[160%] -tracking-[0.5px] text-[#9f9f9f]">
                        New Jersey
                    </p>
                    <p className="font-inter text-xl lg:text-2xl !leading-[160%] -tracking-[0.5px] text-[#9f9f9f]">
                        45463
                    </p>
                    <p className="font-inter text-xl lg:text-2xl !leading-[160%] -tracking-[0.5px] text-[#111111] mt-6">
                        <Link href="tel: +1 (219) 555-0114">Tel: (219) 555-0114</Link>
                    </p>
                    <p className="font-inter text-xl lg:text-2xl !leading-[160%] -tracking-[0.5px] text-[#111111]">
                        <Link href="mailto:stockverse@email.com">Email: stockverse@email.com</Link>
                    </p>
                </div>
                <div className="w-full md:w-[47%]">
                     <form className="flex flex-col gap-4 justify-between w-full relative bg-white rounded-md px-4 md:px-16 py-4 md:py-16" onSubmit={handleSubscribeEmailPhone}>
                    <div className="w-full relative">
                        <Image width={16} height={16} src='/images/q-mark.svg' alt="sms" className="absolute top-[3.8rem] md:top-[4.2rem] right-4 cursor-pointer" title="Fill Email address" loading="eager" />
                        <label className="font-inter !leading-[150%] text-xl flex items-center gap-3 mb-4">
                            Email Address  
                            <span className="text-base text-[#9f9f9f]"> (required)</span>
                        </label>
                        <input
                            autoComplete="email"
                            name="search_Symbols"
                            type="email"
                            className="w-[100%] max-lg:w-[100%] p-2 md:p-4 font-MontserratMedium placeholder:text-sm text-base max-lg:text-xl bg-white rounded-lg outline outline-1 outline-[#E6E6E6]"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full relative">
                        <Image width={16} height={16} src='/images/q-mark.svg' alt="sms" className="absolute top-[3.8rem] md:top-[4.2rem] right-4 cursor-pointer" title="Mobile Number" loading="eager"/>
                        <label className="font-inter !leading-[150%] text-xl flex items-center gap-3 mb-4">
                        Mobile Number  
                        <span className="text-base text-[#9f9f9f]"> (required)</span>
                        </label>
                        <input
                        name="search_Symbols"
                        type="tel"
                        className="w-[100%] max-lg:w-[100%] p-2 md:p-4 font-MontserratMedium rounded-lg placeholder:text-sm  text-base max-lg:text-xl bg-white outline outline-1 outline-[#E6E6E6]"
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        />
                        {/* Custom floating placeholder */}
                        {phone === '+1' && (
                        <span className="font-MontserratMedium absolute left-20 top-1/2 -translate-y-1/2 text-sm transition-all pointer-events-none text-[#9CA3AF] peer-focus:hidden">
                            Enter your phone number
                        </span>
                        )}
                    </div>
                       <button 
                        disabled={!isFormValid}
                        type="submit" 
                        className={`bg-[#0429BB] text-base text-[#fff] font-sansMedium px-6 py-3 rounded-full shadow-lg transition mt-3 md:mt-10 ${isFormValid ? '' : 'cursor-not-allowed'}  ${isSubmitting ? "cursor-not-allowed bg-[#649f6f]" : "bg-[#0429BB]"}`}>
    
                        {isSubmitting ? "Subscribing..." : <>
                        Get CABR Investor Alerts Now
                        </>}
                    </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default CBRA;