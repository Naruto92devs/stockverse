'use client';
import React, { useState,useEffect } from 'react';
import NewsLetterPopup from "@/components/NewsLetterPopup";
import { useMetadata } from "@/context/MetadataContext";
import Disclaimer from '@/components/Cvkd_disclaimer';
const CVKD = () => {
  const { setMetadata } = useMetadata();

  const [newsletter, setNewsletter] = useState(true);

  useEffect(() => {
    setMetadata({
      title: "Cadrenal Therapeutics, (CVKD) Stock Price & Analysis - Stockverse",
      description: "Get the latest Cadrenal Therapeutics (CVKD) stock price and detailed analysis on Stockverse. Stay updated with key metrics, trends and expert insights!",
      schema :``
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  const handleMessage = (event) => {
    if (event.data.iframeHeight) {
      const iframe = document.getElementById("cvkd-iframe");
      iframe.style.height = `${event.data.iframeHeight}px`;
    }
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);


  
  return (
    <div>
      <div className='w-full h-[100vh] '>
        {/* <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter} id={"YizWSN"} baseId={"VSwpYs"}/> */}
        <iframe
          src="https://cvkd.netlify.app/" // Replace with the URL you want to embed
          className='w-full h-full border-none'
          title="Embedded Website"
        />
      </div>
      <div className='xl:container mx-auto'>
        <div className='2xl:px-48 xl:px-16 md:px-8'>
        <Disclaimer/>

        </div>

      </div>
    </div>
  );
};

export default CVKD;