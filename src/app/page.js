'use client';
import Link from 'next/link.js';
import Image from 'next/image.js';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Home() {

  const faqData = [
    {
      question: "What is Stockverse?",
      answer:
        "Stockverse is an innovative platform providing real-time stock data, expert insights, and AI-powered tools to help investors make informed decisions with ease.",
    },
    {
      question: "How does Stockverse GPT work?",
      answer:
        "Stockverse GPT is an AI-powered platform designed to assist users with stock-related insights. By leveraging advanced language models and real-time data sources, Stockverse GPT can provide stock prices, company details, news, market status, upcoming IPOs, and other essential financial information. Users simply ask a question, and Stockverse GPT uses integrated APIs to fetch accurate, up-to-date answers tailored to their query. Whether you're analyzing trends, exploring opportunities, or tracking stocks, Stockverse GPT makes complex financial data accessible and easy to understand.",
    },
    {
      question: "Is Stockverse suitable for beginners?",
      answer:
        "Stockverse is designed to be user-friendly and accessible for beginners. The platform provides clear, easy-to-understand insights and tools, such as real-time stock data, company details, market trends, and AI-powered assistance through Stockverse GPT. Beginners can easily navigate the platform to make informed decisions while learning about stocks and the market at their own pace.",
    },
    {
      question: "What is Level 2 Data, and why is it important?",
      answer:
        "Level 2 data, also known as market depth data, provides detailed information about the order book for a particular stock, showing the highest bids and lowest asks from traders. It includes the size of each order and the price levels, offering insights into the supply and demand dynamics for that stock. Stockverse provides Level 2 data in its Premium package, empowering users with advanced tools for informed trading.",
    },
    {
      question: "How often is stock data updated on Stockverse?",
      answer:
        "Stock data on Stockverse is updated in real-time for users with access to Level 2 data. For non-premium users, the data is updated continously to provide near real-time insights. This ensures that all users, regardless of their subscription level, have timely and accurate information to make informed decisions.",
    },
    {
      question: "Can I create custom watchlist on Stockverse?",
      answer:
        "Yes, Stockverse allows you to create and manage a custom watchlist. Users can add their favorite stocks to the watchlist, enabling easy tracking of stock performance, prices, and related news. This feature helps streamline your investment research by keeping all the stocks you’re interested in within quick reach on the platform.",
    },
    {
      question: "Is my data secure on Stockverse?",
      answer:
        "Yes, Stockverse prioritizes the security and privacy of user data. We use robust encryption protocols and secure servers to protect your personal and financial information. Additionally, we adhere to industry best practices and compliance standards to ensure your data remains safe. Stockverse never shares your data with third parties without your explicit consent.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <div className="hero pt-24 max-sm:pt-12 pb-0 w-full bg-heroBg bg-no-repeat bg-cover bg-top-left">
        {/* ----------hero section---------- */}
        <section className='w-full px-6 max-sm:px-3 mx-auto xl:container h-full flex max-md:flex-col items-center gap-y-4'>
          <div className='md:w-[50%] flex flex-col items-start w-full max-md:py-4 gap-y-4'>
            <h1 className='font-sansMedium xl:mb-4 2xl:text-8xl lg:text-6xl text-4xl text-primaryTextColor'>One Stop Shop <span className='hero_h1'>Everything</span> <span className='text-heading'> Stocks</span></h1>
            <p className='font-sansRegular text-lg text-primaryTextColor xl:w-[60%]'>Discover real-time stock data, personalized insights, and AI-driven recommendations tailored to your trading style</p>
            <Link className='py-2 px-4 bg-primaryMain hover:bg-primaryMain/80 rounded-lg text-white text-md font-sansMedium' href='/register'>Get started for free</Link>
          </div>
          <div className='md:w-[50%] w-full'>
            <Image className='w-full' src="/images/hero_img.png" width={660} height={493} alt='Stockverse Logo' />
          </div>
        </section>
        {/* ----------second section---------- */}
        <section className='w-full px-6 max-sm:px-3 mx-auto xl:container lg:pt-14 flex flex-col items-center gap-y-4 max-md:gap-y-8'>
          <h1 className='font-sansMedium xl:w-[50%] lg:w-[60%] md:w-[50%] w-full 2xl:text-6xl lg:text-5xl text-3xl text-center text-primaryTextColor'>Find the <span className='hero_h2'>Most Suitable</span> Stock for you to buy now</h1>
          <Image className='w-full' src="/images/hero_about_chart.png" width={2400} height={1550} alt='Stockverse Logo' />
          <h2 className="text-xl font-sansmedium mb-4">Payment Methods</h2>
          <div className="flex flex-wrap justify-center gap-14 max-md:gap-8">
            <svg width="44" height="28" viewBox="0 0 44 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.9513 24.7061H16.0488V3.32666H27.9513V24.7061Z" fill="#FF5F00"/>
            <path d="M16.8102 14.0162C16.8114 11.9541 17.2789 9.9189 18.1776 8.0629C19.0763 6.2069 20.383 4.5781 21.9999 3.2983C19.9943 1.7207 17.5853 0.739381 15.0482 0.466589C12.5111 0.193798 9.94848 0.640541 7.65338 1.75573C5.35827 2.87091 3.42335 4.60952 2.06991 6.7727C0.716471 8.93588 -0.000844622 11.4363 7.46349e-07 13.988C-0.000844622 16.5397 0.716471 19.0401 2.06991 21.2033C3.42335 23.3665 5.35827 25.1051 7.65338 26.2203C9.94848 27.3355 12.5111 27.7822 15.0482 27.5094C17.5853 27.2366 19.9943 26.2553 21.9999 24.6777C20.3867 23.4009 19.0823 21.7766 18.1837 19.9258C17.2852 18.075 16.8157 16.0454 16.8102 13.988" fill="#EB001B"/>
            <path d="M44 14.0162C44 17.6218 42.5677 21.0797 40.0182 23.6292C37.4687 26.1787 34.0108 27.611 30.4052 27.611C27.3552 27.6234 24.3915 26.599 22.0001 24.7059C23.6194 23.431 24.9284 21.8053 25.8284 19.9512C26.7284 18.0972 27.1961 16.0631 27.1961 14.0021C27.1961 11.9411 26.7284 9.90702 25.8284 8.05295C24.9284 6.19889 23.6194 4.57319 22.0001 3.2983C24.0057 1.7207 26.4147 0.739381 28.9518 0.466589C31.4889 0.193798 34.0515 0.640541 36.3466 1.75573C38.6417 2.87091 40.5767 4.60952 41.9301 6.7727C43.2835 8.93588 44.0008 11.4363 44 13.988" fill="#F79E1B"/>
            </svg>

            <svg width="78" height="26" viewBox="0 0 78 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.9019 8.51603C39.8519 11.9729 43.002 13.9269 45.3521 15.0792C47.7022 16.2315 48.6023 17.0331 48.5523 18.0852C48.5023 19.1373 46.6522 20.3898 44.8521 20.4399C42.6205 20.4857 40.4152 19.9505 38.4518 18.8868L37.3018 24.1974C39.5212 25.048 41.8759 25.4893 44.2521 25.5C50.8024 25.5 55.1026 22.2435 55.1026 17.2335C55.1026 10.8707 46.3022 10.52 46.3522 7.66433C46.4022 6.76252 47.2022 5.86072 49.0023 5.61022C51.1139 5.41977 53.2378 5.8004 55.1526 6.71243L56.2526 1.6022C54.3845 0.885679 52.4027 0.512314 50.4024 0.5C44.2521 0.5 39.9019 3.80661 39.9019 8.51603ZM66.8031 0.950903C66.2287 0.936461 65.6642 1.10265 65.1889 1.42614C64.7136 1.74963 64.3513 2.21416 64.153 2.75451L54.8026 25.0992H61.3029L62.6029 21.492H70.6033L71.3533 25.0992H77.1536L72.1034 0.950903H66.8031ZM67.7032 7.46393L69.6033 16.5321H64.403L67.7032 7.46393ZM31.9515 0.950903L26.8013 25.0992H33.0516L38.2018 0.950903H31.9515ZM22.7511 0.950903L16.2508 17.3838L13.6006 3.40581C13.4938 2.7242 13.1484 2.10293 12.6262 1.65315C12.104 1.20337 11.4391 0.954443 10.7505 0.950903H0.150009L0 1.6523C2.12303 2.09434 4.18716 2.78374 6.15029 3.70641C7.05033 4.20742 7.30034 4.65832 7.60036 5.86072L12.6006 25.0992H19.1509L29.2514 0.950903H22.7511Z" fill="rgba(var(--primary-button-bg))"/>
            </svg>

            <svg width="96" height="26" viewBox="0 0 96 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M93.7451 17.21L94.9594 14.8352H88.5969C85.9742 14.8352 84.42 16.2601 84.42 18.2031C84.42 20.146 85.877 21.355 88.1598 21.355H91.0253C91.1568 21.3432 91.2896 21.3553 91.4157 21.3906C91.5417 21.426 91.6583 21.4838 91.7583 21.5606C91.8584 21.6374 91.9397 21.7315 91.9974 21.8372C92.0551 21.943 92.0879 22.058 92.0938 22.1754V22.2618C92.0938 22.4908 91.9915 22.7104 91.8093 22.8724C91.6271 23.0343 91.3801 23.1253 91.1224 23.1253H84.8085V25.5001H90.9767C93.5994 25.5001 95.1536 24.1184 95.1536 22.0459C95.1536 19.9733 93.7937 18.9803 91.4138 18.9803H88.5483C88.4206 18.9922 88.2916 18.9815 88.1686 18.9488C88.0456 18.9161 87.9311 18.8621 87.8317 18.7898C87.7323 18.7175 87.6501 18.6284 87.5897 18.5277C87.5293 18.427 87.4919 18.3167 87.4798 18.2031V18.0735C87.4798 17.8445 87.5821 17.6248 87.7643 17.4629C87.9465 17.301 88.1935 17.21 88.4512 17.21H93.7451ZM76.4547 18.0735C76.4547 17.8445 76.557 17.6248 76.7392 17.4629C76.9214 17.301 77.1685 17.21 77.4261 17.21H82.7201L83.9343 14.8352H77.5718C74.9491 14.8352 73.3949 16.2601 73.3949 18.2031C73.3949 20.146 74.9005 21.355 77.1832 21.355H80.0002C80.1317 21.3432 80.2645 21.3553 80.3906 21.3906C80.5166 21.426 80.6332 21.4838 80.7332 21.5606C80.8333 21.6374 80.9146 21.7315 80.9723 21.8372C81.03 21.943 81.0628 22.058 81.0687 22.1754V22.2618C81.0757 22.3768 81.0554 22.4919 81.0091 22.5995C80.9627 22.707 80.8914 22.8048 80.7998 22.8862C80.7082 22.9677 80.5982 23.0311 80.4772 23.0723C80.3562 23.1135 80.2268 23.1315 80.0974 23.1253H73.7834V25.5001H80.0002C82.5744 25.5001 84.1285 24.1184 84.1285 22.0459C84.1285 19.9733 82.7686 18.9803 80.3888 18.9803H77.5232C77.3955 18.9922 77.2665 18.9815 77.1435 18.9488C77.0205 18.9161 76.906 18.8621 76.8066 18.7898C76.7073 18.7175 76.625 18.6284 76.5646 18.5277C76.5042 18.427 76.4668 18.3167 76.4547 18.2031V18.0735ZM62.6126 25.5001H72.4235V23.1253H65.6725V21.3118H72.2292V18.9803H65.6725V17.21H72.4235V14.8352H62.6126V25.5001ZM62.127 25.5001L58.2415 21.6141C59.1292 21.4896 59.9369 21.0851 60.5166 20.4746C61.0964 19.8641 61.4094 19.0883 61.3984 18.2894C61.3984 16.2169 59.7957 14.8352 57.2215 14.8352H50.519V25.5001H53.5789V21.7436H54.7445L58.3872 25.5001H62.127ZM56.8815 19.412H53.5789V17.21H56.8815C57.8529 17.21 58.29 17.7281 58.29 18.3326C58.29 18.9371 57.8043 19.412 56.8815 19.412ZM49.2077 18.4189C49.2077 16.3032 47.6049 14.8352 45.0308 14.8352H38.2797V25.5001H41.3396V22.0459H44.9336C47.6049 22.0459 49.2077 20.4915 49.2077 18.4189ZM46.1479 18.4621C46.1544 18.6131 46.1266 18.7638 46.066 18.905C46.0055 19.0462 45.9135 19.1751 45.7956 19.284C45.6777 19.3929 45.5363 19.4794 45.3798 19.5385C45.2233 19.5976 45.0551 19.628 44.8851 19.6279H41.3396V17.21H44.7394C44.9117 17.1982 45.0849 17.2168 45.2491 17.2648C45.4133 17.3127 45.5652 17.389 45.6961 17.4894C45.827 17.5897 45.9343 17.712 46.0118 17.8493C46.0893 17.9866 46.1356 18.1362 46.1479 18.2894V18.4621ZM38.0369 25.5001L33.18 20.146L37.9883 14.8352H34.2485L31.4316 18.1167L28.566 14.8352H24.7291L29.5859 20.1892L24.7776 25.5001H28.5174L31.3344 22.2186L34.2 25.5001H38.0369ZM14.7239 25.5001H24.5348V23.1253H17.7838V21.3118H24.3405V18.9803H17.7838V17.21H24.5348V14.8352H14.7239V25.5001Z" fill="#016FD0"/>
            <path d="M93.3569 11.208V0.5H90.3456V7.14935L85.5373 0.5H81.6518V11.208H84.7117V4.34281L89.6657 11.208H93.3569ZM77.912 11.208H81.3604L76.2121 0.5H72.2295L67.0812 11.208H70.4325L71.4524 9.00599H76.8921L77.912 11.208ZM75.8236 6.71758H72.5209L74.1723 3.04748L75.8236 6.71758ZM66.0127 3.0043H69.2183V0.5H65.7699C61.9815 0.5 59.9416 2.74524 59.9416 5.76767V5.94038C59.9416 9.22188 62.0787 11.208 65.527 11.208H65.7699L67.0327 8.7901H66.0613C64.1185 8.7901 63.0015 7.75384 63.0015 5.94038V5.76767C63.0015 4.1701 64.0214 3.0043 66.0127 3.0043ZM55.4248 11.208H58.4846V0.5H55.4248V11.208ZM54.9391 11.208L51.0536 7.32206C51.9454 7.18813 52.7538 6.77499 53.3329 6.15731C53.9119 5.53963 54.2232 4.75817 54.2105 3.95421C54.2105 1.92486 52.6078 0.5 50.0336 0.5H43.3312V11.208H46.391V7.40842H47.5566L51.1507 11.208H54.9391ZM49.6937 5.07683H46.391V2.91795H49.6937C50.6165 2.91795 51.1021 3.3929 51.1021 3.99739C51.1021 4.60187 50.6165 5.07683 49.6937 5.07683ZM31.8204 11.208H41.5827V8.7901H34.8316V6.97664H41.437V4.64505H34.8802V2.91795H41.6313V0.5H31.8204V11.208ZM26.7693 11.208H29.7805V0.5H24.9722L22.3009 7.32206L19.5811 0.5H14.7242V11.208H17.784V3.30654L20.941 11.208H23.6123L26.7693 3.30654V11.208ZM10.9844 11.208H14.4328L9.28453 0.5H5.3019L0.153625 11.208H3.55343L4.5248 9.00599H9.96449L10.9844 11.208ZM8.89598 6.71758H5.59331L7.24465 3.04748L8.89598 6.71758Z" fill="#016FD0"/>
            </svg>

            <svg width="51" height="32" viewBox="0 0 51 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_8_178)">
            <path d="M45.6759 0H4.63136C4.46041 0 4.28916 0 4.11852 0.000996555C3.97428 0.00202331 3.83037 0.00362383 3.68646 0.00754966C3.3726 0.0160355 3.05606 0.0345472 2.74613 0.0902335C2.43124 0.146886 2.13823 0.239294 1.85237 0.384791C1.57135 0.52766 1.31407 0.71453 1.09112 0.937516C0.868059 1.1605 0.681134 1.41728 0.538252 1.69852C0.392681 1.98429 0.300186 2.27731 0.243909 2.59234C0.187907 2.90227 0.169266 3.21866 0.160808 3.53209C0.156941 3.67596 0.155283 3.81982 0.154343 3.96366C0.153346 4.13461 0.153679 4.30545 0.153679 4.4767V27.5236C0.153679 27.6949 0.153346 27.8654 0.154343 28.0367C0.155283 28.1805 0.156941 28.3244 0.160808 28.4683C0.169266 28.7814 0.187907 29.0978 0.243909 29.4077C0.300186 29.7228 0.392681 30.0157 0.538252 30.3015C0.681134 30.5827 0.868059 30.8399 1.09112 31.0625C1.31407 31.2859 1.57135 31.4727 1.85237 31.6152C2.13823 31.7611 2.43124 31.8535 2.74613 31.9102C3.05606 31.9655 3.3726 31.9843 3.68646 31.9928C3.83037 31.9961 3.97428 31.998 4.11852 31.9987C4.28916 32 4.46041 32 4.63136 32H45.6759C45.8466 32 46.0178 32 46.1884 31.9987C46.3324 31.998 46.4763 31.9961 46.6208 31.9928C46.934 31.9843 47.2505 31.9655 47.5612 31.9102C47.8757 31.8535 48.1687 31.7611 48.4546 31.6152C48.736 31.4727 48.9925 31.2859 49.2159 31.0625C49.4386 30.8399 49.6255 30.5827 49.7688 30.3015C49.9146 30.0157 50.0071 29.7228 50.0631 29.4077C50.1191 29.0978 50.1373 28.7814 50.1458 28.4683C50.1497 28.3244 50.1516 28.1805 50.1523 28.0367C50.1536 27.8654 50.1536 27.6949 50.1536 27.5236V4.4767C50.1536 4.30545 50.1536 4.13461 50.1523 3.96366C50.1516 3.81982 50.1497 3.67596 50.1458 3.53209C50.1373 3.21866 50.1191 2.90227 50.0631 2.59234C50.0071 2.27731 49.9146 1.98429 49.7688 1.69852C49.6255 1.41728 49.4386 1.1605 49.2159 0.937516C48.9925 0.71453 48.736 0.52766 48.4546 0.384791C48.1687 0.239294 47.8757 0.146886 47.5612 0.0902335C47.2505 0.0345472 46.934 0.0160355 46.6208 0.00754966C46.4763 0.00362383 46.3324 0.00202331 46.1884 0.000996555C46.0178 0 45.8466 0 45.6759 0Z" fill="black"/>
            <path d="M45.6759 1.06665L46.1809 1.06762C46.3176 1.06858 46.4544 1.07006 46.592 1.07381C46.8312 1.08027 47.1111 1.09323 47.372 1.13997C47.5987 1.1808 47.7889 1.24289 47.9714 1.33578C48.1516 1.42731 48.3167 1.54726 48.4608 1.69116C48.6055 1.83602 48.7257 2.00133 48.8184 2.18346C48.9108 2.3645 48.9726 2.55372 49.0132 2.78208C49.0598 3.04004 49.0727 3.32058 49.0793 3.56124C49.0829 3.69707 49.0847 3.8329 49.0854 3.97197C49.0867 4.14015 49.0867 4.30823 49.0867 4.47674V27.5237C49.0867 27.6922 49.0867 27.86 49.0854 28.0317C49.0848 28.1675 49.0829 28.3034 49.0792 28.4394C49.0727 28.6797 49.0598 28.9601 49.0126 29.2211C48.9726 29.4463 48.9109 29.6356 48.818 29.8175C48.7255 29.9992 48.6055 30.1643 48.4614 30.3083C48.3165 30.4533 48.1519 30.5728 47.9696 30.6652C47.7885 30.7577 47.5986 30.8197 47.3741 30.8601C47.1079 30.9075 46.8163 30.9205 46.5967 30.9265C46.4585 30.9296 46.321 30.9315 46.1802 30.9321C46.0123 30.9334 45.8438 30.9334 45.6759 30.9334H4.63136C4.62912 30.9334 4.62694 30.9334 4.62468 30.9334C4.45872 30.9334 4.29243 30.9334 4.12344 30.9321C3.98567 30.9315 3.84819 30.9296 3.71528 30.9266C3.49065 30.9205 3.19888 30.9075 2.93489 30.8604C2.70843 30.8197 2.51857 30.7577 2.33503 30.664C2.15442 30.5725 1.99 30.453 1.84497 30.3078C1.70106 30.1641 1.58147 29.9995 1.48901 29.8176C1.39645 29.6358 1.33452 29.446 1.29381 29.2181C1.24674 28.9576 1.23381 28.6783 1.22735 28.4396C1.22366 28.303 1.22212 28.1664 1.22125 28.0305L1.22058 27.6295L1.22061 27.5237V4.47674L1.22058 4.37086L1.22122 3.9707C1.22212 3.83405 1.22366 3.69743 1.22735 3.56091C1.23381 3.322 1.24674 3.04261 1.2942 2.77994C1.33455 2.55408 1.39645 2.36425 1.48949 2.18158C1.58123 2.00103 1.70103 1.8362 1.8457 1.69161C1.98979 1.5475 2.15475 1.4277 2.33651 1.3353C2.51809 1.24286 2.70831 1.1808 2.93477 1.14006C3.19571 1.09319 3.47576 1.08027 3.71561 1.07378C3.85233 1.07006 3.98905 1.06858 4.12474 1.06765L4.63136 1.06665H45.6759Z" fill="white"/>
            <path d="M13.8033 10.763C14.2314 10.2277 14.522 9.50892 14.4453 8.77441C13.8186 8.80557 13.0539 9.18775 12.6111 9.72348C12.2136 10.1823 11.8617 10.9311 11.9534 11.6348C12.6569 11.6958 13.3598 11.2833 13.8033 10.763Z" fill="black"/>
            <path d="M14.4374 11.7721C13.4157 11.7113 12.5471 12.3518 12.0592 12.3518C11.571 12.3518 10.8239 11.8028 10.0158 11.8176C8.96407 11.833 7.98816 12.4275 7.45444 13.3731C6.35666 15.2646 7.16473 18.0704 8.23227 19.6109C8.75068 20.3731 9.37546 21.2122 10.1987 21.1821C10.9765 21.1516 11.2814 20.6786 12.2269 20.6786C13.1717 20.6786 13.4463 21.1821 14.2697 21.1668C15.1236 21.1516 15.6574 20.4043 16.1758 19.6414C16.7705 18.7726 17.014 17.9337 17.0293 17.8876C17.014 17.8724 15.3828 17.2468 15.3677 15.371C15.3523 13.8004 16.6483 13.0533 16.7093 13.007C15.9774 11.9248 14.8339 11.8028 14.4374 11.7721Z" fill="black"/>
            <path d="M23.3332 9.64673C25.5537 9.64673 27.1 11.1769 27.1 13.4048C27.1 15.6406 25.5219 17.1787 23.2775 17.1787H20.8189V21.0874H19.0426V9.64673H23.3332V9.64673ZM20.8189 15.6881H22.8571C24.4037 15.6881 25.2839 14.8557 25.2839 13.4127C25.2839 11.9698 24.4037 11.1453 22.8651 11.1453H20.8189V15.6881Z" fill="black"/>
            <path d="M27.5641 18.7169C27.5641 17.258 28.6823 16.3622 30.6652 16.2511L32.949 16.1164V15.4743C32.949 14.5466 32.3225 13.9917 31.2758 13.9917C30.2842 13.9917 29.6656 14.4673 29.5151 15.2126H27.8973C27.9924 13.7061 29.2771 12.5962 31.3391 12.5962C33.3614 12.5962 34.6541 13.6665 34.6541 15.3394V21.0875H33.0124V19.7159H32.9729C32.4892 20.6435 31.4343 21.2301 30.3399 21.2301C28.7062 21.2301 27.5641 20.2153 27.5641 18.7169ZM32.949 17.9638V17.3057L30.8949 17.4325C29.8718 17.5039 29.293 17.9558 29.293 18.6694C29.293 19.3987 29.8957 19.8744 30.8157 19.8744C32.0131 19.8744 32.949 19.0499 32.949 17.9638Z" fill="black"/>
            <path d="M36.204 24.1558V22.7683C36.3306 22.7999 36.6161 22.7999 36.759 22.7999C37.552 22.7999 37.9803 22.467 38.2419 21.6108C38.2419 21.5949 38.3927 21.1034 38.3927 21.0954L35.3792 12.7468H37.2347L39.3445 19.5336H39.376L41.4858 12.7468H43.294L40.169 21.5235C39.4556 23.5453 38.6307 24.1954 36.9018 24.1954C36.759 24.1954 36.3306 24.1795 36.204 24.1558Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_8_178">
            <rect width="50" height="32" fill="white" transform="translate(0.153625)"/>
            </clipPath>
            </defs>
            </svg>

            <svg width="71" height="28" viewBox="0 0 71 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.7739 13.6718V21.8828H31.1875V1.64281H38.0847C38.9077 1.61863 39.7273 1.75866 40.4957 2.05472C41.264 2.35077 41.9656 2.79692 42.5597 3.36711C43.6967 4.42918 44.3657 5.89918 44.4196 7.45416C44.4734 9.00915 43.9078 10.5219 42.847 11.6602L42.5597 11.9475C41.9656 12.5177 41.264 12.9639 40.4957 13.2599C39.7273 13.556 38.9077 13.696 38.0847 13.6718H33.7739ZM33.7739 4.10609V11.2086H38.1668C38.8613 11.2202 39.5438 11.0267 40.1288 10.6524C40.7139 10.2781 41.1756 9.73947 41.456 9.10404C41.7365 8.4686 41.8233 7.76455 41.7056 7.08002C41.5879 6.39549 41.2709 5.76088 40.7943 5.25563H40.7122C40.3895 4.90256 39.9961 4.62139 39.5575 4.4304C39.119 4.23942 38.6451 4.14291 38.1668 4.14715L33.7739 4.10609Z" fill="rgba(var(--primary-button-bg))"/>
            <path d="M50.4421 7.55493C52.3306 7.55493 53.8496 8.08864 54.9581 9.11501C56.0666 10.1414 56.6414 11.5372 56.6414 13.3436V21.883H54.137V19.9535H54.0549C53.6085 20.6937 52.9751 21.3034 52.2184 21.7213C51.4618 22.1393 50.6084 22.3508 49.7442 22.3346C48.348 22.3691 46.9883 21.8866 45.9261 20.9798C45.4263 20.5659 45.0265 20.0445 44.7564 19.4545C44.4862 18.8644 44.3528 18.2211 44.366 17.5723C44.3499 16.9148 44.4904 16.2628 44.7759 15.6704C45.0614 15.0779 45.4838 14.5618 46.0082 14.1647C47.0756 13.3026 48.5125 12.892 50.3189 12.892C51.6453 12.839 52.9622 13.1363 54.137 13.7542V13.1384C54.1531 12.6981 54.0648 12.2603 53.8793 11.8607C53.6938 11.4611 53.4163 11.1111 53.0696 10.8393C52.3843 10.2191 51.4894 9.88173 50.5653 9.89505C49.8787 9.87199 49.1981 10.0307 48.5926 10.3551C47.987 10.6795 47.4779 11.1581 47.1167 11.7425L44.8176 10.3056C46.0903 8.49919 47.9378 7.55493 50.4421 7.55493ZM47.0756 17.6544C47.0628 17.9854 47.1353 18.3141 47.2863 18.6089C47.4373 18.9037 47.6617 19.1547 47.9378 19.3376C48.5107 19.79 49.2194 20.0359 49.9494 20.0356C50.4926 20.0333 51.03 19.9233 51.5303 19.7119C52.0307 19.5005 52.4841 19.1918 52.8643 18.8039C53.2737 18.4447 53.6024 18.0029 53.8288 17.5076C54.0553 17.0123 54.1743 16.4747 54.1781 15.9301C53.1745 15.2545 51.9787 14.9231 50.7705 14.9858C49.8368 14.9318 48.9118 15.192 48.143 15.7248C47.8177 15.9312 47.5494 16.2161 47.3629 16.5533C47.1764 16.8904 47.0776 17.2691 47.0756 17.6544Z" fill="rgba(var(--primary-button-bg))"/>
            <path d="M70.9287 8.04736L62.2251 28H59.5566L62.7999 21.0207L57.0522 8.04736H59.885L64.0316 17.9826H64.0726L68.096 8.04736H70.9287Z" fill="rgba(var(--primary-button-bg))"/>
            <path d="M23.2638 11.9068C23.2769 11.1217 23.2081 10.3374 23.0585 9.56665H12.0969V14.0416H18.3783C18.257 14.7561 17.9904 15.4381 17.595 16.0454C17.1995 16.6527 16.6836 17.1724 16.0792 17.5723V20.4872H19.8152C22.0322 18.4345 23.2638 15.4375 23.2638 11.9068Z" fill="#4285F4"/>
            <path d="M12.0966 23.279C15.2578 23.279 17.8853 22.2526 19.8149 20.4873L16.0789 17.5724C14.4978 18.5769 12.5839 18.9163 10.7539 18.5164C8.92384 18.1166 7.32586 17.01 6.30785 15.4375C6.02043 14.938 5.77332 14.4163 5.56886 13.8774H1.70972V16.8744C2.67301 18.8032 4.15572 20.4247 5.99086 21.5562C7.82599 22.6878 9.94062 23.2844 12.0966 23.279Z" fill="#34A853"/>
            <path d="M5.56915 13.8774C5.07492 12.4408 5.07492 10.8802 5.56915 9.44353V6.44653H1.71C0.900623 8.06543 0.479248 9.85053 0.479248 11.6605C0.479248 13.4704 0.900623 15.2555 1.71 16.8744L5.56915 13.8774Z" fill="#FBBC04"/>
            <path d="M12.0966 4.6401C12.9196 4.61593 13.7392 4.75595 14.5075 5.05201C15.2759 5.34806 15.9775 5.79421 16.5715 6.3644L19.897 3.03897C17.7891 1.05314 14.9923 -0.0361599 12.0966 0.000916335C9.94261 0.00485619 7.83184 0.605384 5.9984 1.73589C4.16496 2.86639 2.68051 4.48267 1.70972 6.40546L5.56886 9.40245C6.01786 8.02302 6.89037 6.82028 8.0623 5.96529C9.23423 5.11029 10.6459 4.64658 12.0966 4.6401Z" fill="#EA4335"/>
            </svg>

          </div>
        </section>
      </div>
      {/* ----------about section---------- */}
      <section className='w-full px-6 max-sm:px-3 mx-auto xl:container flex flex-col gap-y-6 py-4'>
        <div className='w-full flex items-center gap-y-4 justify-between max-lg:flex-col py-8'>
          <div className='lg:w-[40%] w-full'>
            <h1 className='font-sansMedium w-full 2xl:text-5xl lg:text-5xl text-3xl text-primaryTextColor'>Our Dedication to Simplifying <span className='hero_h2'>Investments</span> for Everyone</h1>
          </div>
          <div className='lg:w-[50%]'>
            <p className='font-sansRegular text-lg text-primaryTextColor'>Stockverse was built on the vision that every investor, regardless of experience, should have access to reliable and simplified market insights. We know the stock market can be complex, so we’re here to decode it, providing you with real-time data, expert analysis, and intuitive tools to support confident decision-making.</p>
          </div>
        </div>
        <div className='w-full border border-primaryTextColor/10 sm:border-x-0 flex flex-wrap items-start'>
          <div className='lg:w-[25%] sm:w-[50%] md:p-8 px-4 pb-6 sm:border border-primaryTextColor/10 sm:border-y-0'>
            <Image className='w-[30%]' src="/images/about_logo1.png" width={96} height={96} alt='Stockverse Logo' />
            <h3 className='font-sansSemibold text-xl'>Realtime Market Data</h3>
            <p className='font-sansRegular text-base text-primaryTextColor'>Stay connected to the market in an instant. Stockverse provides real-time data to help you make quick and accurate decisions.</p>
          </div>
          <div className='lg:w-[25%] sm:w-[50%] md:p-8 px-4 pb-6 sm:border-r-[1px] border-primaryTextColor/10'>
            <Image className='w-[30%]' src="/images/about_logo1.png" width={96} height={96} alt='Stockverse Logo' />
            <h3 className='font-sansSemibold text-xl'>Realtime Market Data</h3>
            <p className='font-sansRegular text-base text-primaryTextColor'>Stay connected to the market in an instant. Stockverse provides real-time data to help you make quick and accurate decisions.</p>
          </div>
          <div className='lg:w-[25%] sm:w-[50%] md:p-8 px-4 pb-6 lg:border-r-[1px] lg:border-l-0 lg:border-t-0 sm:border border-primaryTextColor/10'>
            <Image className='w-[30%]' src="/images/about_logo1.png" width={96} height={96} alt='Stockverse Logo' />
            <h3 className='font-sansSemibold text-xl'>Realtime Market Data</h3>
            <p className='font-sansRegular text-base text-primaryTextColor'>Stay connected to the market in an instant. Stockverse provides real-time data to help you make quick and accurate decisions.</p>
          </div>
          <div className='lg:w-[25%] sm:w-[50%] md:p-8 px-4 pb-6 lg:border-r-[1px] lg:border-l-0 lg:border-t-0 sm:border sm:border-l-0 border-primaryTextColor/10'>
            <Image className='w-[30%]' src="/images/about_logo1.png" width={96} height={96} alt='Stockverse Logo' />
            <h3 className='font-sansSemibold text-xl'>Realtime Market Data</h3>
            <p className='font-sansRegular text-base text-primaryTextColor'>Stay connected to the market in an instant. Stockverse provides real-time data to help you make quick and accurate decisions.</p>
          </div>
        </div>
        <div className='w-full mt-8 flex flex-wrap md:justify-between justify-center gap-14 max-md:gap-8'>
          <Image className='max-sm:w-[40%]' src="/images/about_p1.png" width={178} height={48} alt='Stockverse Logo' />
          <Image className='max-sm:w-[40%]' src="/images/about_p2.png" width={178} height={48} alt='Stockverse Logo' />
          <Image className='max-sm:w-[40%]' src="/images/about_p3.png" width={178} height={48} alt='Stockverse Logo' />
          <Image className='max-sm:w-[40%]' src="/images/about_p4.png" width={178} height={48} alt='Stockverse Logo' />
          <Image className='max-sm:w-[40%]' src="/images/about_p5.png" width={178} height={48} alt='Stockverse Logo' />
        </div>
        <Image className='self-center' src="/images/about_divider.png" width={1128} height={15} alt='Stockverse Logo' />
      </section>
      {/* ----------features section---------- */}
      <section className='w-full flex flex-col bg-darkBlue py-16 relative'>
        <Image className='absolute top-0 w-full z-[1] self-center' src="/images/features_main_bg.png" width={1128} height={15} alt='Stockverse Logo' />
        <div className='z-[2] w-full px-6 max-sm:px-3 mx-auto xl:container flex flex-col items-center gap-y-8'>
          <h1 className='2xl:w-[50%] lg:w-[70%] font-sansMedium w-full 2xl:text-5xl lg:text-5xl text-center text-2xl text-white'>Tools and Resources Designed To Enhance Your Investments</h1>
          <p className='2xl:w-[40%] lg:w-[50%] w-full text-white font-sansRegular text-md text-center'>rom real-time stock data to tailored financial tools, Stockverse provides an array of services to help you maximize your portfolio.</p>
          {/* ----------features stockverse-gpt---------- */}
          <div className='w-full mt-8 lg:py-4 lg:px-8 p-8 gap-y-8 flex max-lg:flex-col items-center justify-between relative border border-white/5 rounded-2xl !overflow-hidden'>
            <Image className='absolute lg:top-0 lg:right-0 max-lg:left-0 max-lg:bottom-0 z-[2]' src="/images/features_gpt_bg.png" width={910} height={910} alt='Stockverse Logo' />
            <Image className='absolute lg:top-[-40%] lg:right-[-15%] max-lg:right-[-25%] max-lg:bottom-[-25%] max-lg:w-[150%] z-[1]' src="/images/features_gpt_color.png" width={734} height={401} alt='Stockverse Logo' />
            <div className='relative xl:w-[33%] lg:w-[40%] w-full flex flex-col items-start gap-y-2'>
              <h2 className='font-sansMedium w-full xl:text-4xl lg:text-3xl text-2xl text-white'>StockVerse GPT</h2>
              <p className='w-full text-white font-sansRegular text-lg'>Dive deeper with detailed market activity, including bid and ask prices, so you can see the true dynamics of stock movement.</p>
            </div>
            <div className='relative xl:w-[64%] lg:w-[55%] w-full flex flex-col items-end gap-y-4'>
              <Image className='lg:w-[70%] w-full relative z-[3]' src="/images/features_gpt.png" width={954} height={738} alt='Stockverse Logo' />
            </div>
          </div>
          {/* ----------features search & Realtime Row---------- */}
          <div className='w-full flex flex-wrap justify-between gap-y-8'>
            {/* ----------features search---------- */}
            <div className='lg:w-[49%] p-8 bg-searchBg bg-cover bg-center bg-no-repeat w-full flex flex-col gap-y-8 items-center relative border border-white/5 rounded-2xl !overflow-hidden'>
              <div className='flex flex-col items-start gap-y-2'>
                <h2 className='font-sansMedium w-full xl:text-4xl lg:text-3xl text-2xl text-white'>Search your stocks</h2>
                <p className='w-full pr-2 text-white font-sansRegular text-lg'>Your AI-powered investment assistant, ready to answer your questions, and guide you through the market with ease.</p>
              </div>
              <Image className='w-[80%] pt-6 max-lg:pb-14' src="/images/features_search.png" width={632} height={646} alt='Stockverse Logo' />
            </div>
            {/* ----------features Realtime---------- */}
            <div  className='lg:w-[49%] bg-realtimeBg bg-cover bg-center bg-no-repeat p-8 w-full flex flex-col gap-y-8 items-center relative border border-white/5 rounded-2xl !overflow-hidden'>
              <div className='flex flex-col items-start gap-y-2'>
                <h2 className='font-sansMedium w-full xl:text-4xl lg:text-3xl text-2xl text-white'>Search your stocks</h2>
                <p className='w-full pr-2 text-white font-sansRegular text-lg'>Your AI-powered investment assistant, ready to answer your questions, and guide you through the market with ease.</p>
              </div>
              <Image className='w-full' src="/images/features_realtime.png" width={632} height={646} alt='Stockverse Logo' />
            </div>
          </div>
          {/* ----------features level 2---------- */}
          <div className='w-full lg:pl-8 pt-8 gap-y-12 flex max-lg:flex-col items-center justify-between relative border border-white/5 rounded-2xl !overflow-hidden'>
            <Image className='absolute lg:top-[-100%] lg:self-center max-lg:left-[-30%] w-full z-[1]' src="/images/features_gpt_color.png" width={734} height={401} alt='Stockverse Logo' />
            <div className='max-lg:px-8 relative lg:w-[50%] w-full flex flex-col items-start gap-y-2'>
              <h2 className='font-sansMedium w-full xl:text-4xl lg:text-3xl text-2xl text-white'>Level 2 Data</h2>
              <p className='w-full text-white font-sansRegular text-lg'>Dive deeper with detailed market activity, including bid and ask prices, so you can see the true dynamics of stock movement.</p>
              <Image className='w-full relative z-[3]' src="/images/features_level2_stocks.png" width={954} height={738} alt='Stockverse Logo' />
            </div>
            <div className='relative xl:w-[50%] lg:w-[55%] w-full flex flex-col items-end gap-y-4'>
              <Image className=' w-full relative z-[3]' src="/images/features_level2.png" width={954} height={738} alt='Stockverse Logo' />
            </div>
          </div>
        </div>
      </section>
      {/* ----------FAQ section---------- */}
      <section className='w-full px-6 max-sm:px-3 mx-auto xl:container flex flex-col gap-y-12 py-16'>
        <div className='w-full flex items-center gap-y-4 justify-between max-lg:flex-col lg:pt-8'>
          <div className='lg:w-[40%] w-full'>
            <h1 className='font-sansMedium w-full 2xl:text-5xl lg:text-5xl text-3xl text-primaryTextColor'>Everything You Need To Know <span className='hero_h2'>About Stockverse</span></h1>
          </div>
          <div className='lg:w-[45%]'>
            <p className='font-sansRegular text-lg text-primaryTextColor'>ind quick answers to frequently asked questions about Stockverse’s tools, subscription options, and resources</p>
          </div>
        </div>
        <div className='flex flex-col gap-y-2'>
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-[#FAFAFB]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-toggle flex justify-between items-center w-full px-6 py-4 font-sansMedium xl:text-2xl md:text-xl text-lg text-left"
              >
                <span>{faq.question}</span>
                <span
                  className={`icon transition-transform duration-300 ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                >
                  {/* {activeIndex === index ? "–" : "+"} */}
                  <Image className='w-full' src="/images/star.png" width={22} height={22} alt='Stockverse Logo' />
                </span>
              </button>
              <div
                className={`faq-content px-6 text-primaryTextColor font-sansRegular text-base transition-all duration-600 overflow-hidden ${
                  activeIndex === index ? "max-h-screen pb-6" : "max-h-0"
                }`}
                style={{ maxHeight: activeIndex === index ? "600px" : "0" }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
        <p className='text-primaryTextColor font-sansMedium text-md flex flex-wrap items-center justify-center gap-4'>
          Have any more Questions? 
          <Link className='py-2 px-4 bg-primaryMain hover:bg-primaryMain/80 rounded-lg text-white text-md font-sansMedium' href='/feedback'>Let us know</Link>
        </p>
      </section>
      {/* ----------join section---------- */}
      <section className='w-full px-6 max-sm:px-3 py-8 mx-auto xl:container flex flex-col items-center gap-y-4'>
        <div className='w-full max-md:px-3 py-12 bg-joinBg bg-cover bg-center gap-y-6 flex flex-col items-center justify-center relative border border-white/5 rounded-3xl !overflow-hidden'>
          <h1 className='font-sansMedium xl:w-[46%] lg:w-[60%] md:w-[60%] w-full 2xl:text-6xl lg:text-5xl text-3xl text-center text-white'>Revolutionize Your Stock <span className='hero_h3'> Trading Journey</span></h1>
          <p className='2xl:w-[40%] md:w-[50%] w-full text-white font-sansRegular md:text-lg text-base text-center'>Join a platform trusted by investors looking to elevate their journey in the stock market.</p>
          <Image className='max-md:w-[90%]' src="/images/join_stocks.png" width={614} height={92} alt='Stockverse Logo' />
          <Link className='py-2 px-4 bg-primaryMain hover:bg-primaryMain/80 rounded-lg text-white text-md font-sansMedium' href='/register'>Get started for free</Link>
        </div>
      </section>
    </div>
  );
}