'use client';
import React, { useState,useEffect } from 'react';
import NewsLetterPopup from "@/components/NewsLetterPopup";
import { useMetadata } from "@/context/MetadataContext";
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


  
  return (
    <div className='w-full h-[100vh]'>
      {/* <NewsLetterPopup newsletter={newsletter} setNewsletter={setNewsletter} id={"YizWSN"} baseId={"VSwpYs"}/> */}
      <iframe
        src="https://cvkd.netlify.app/" // Replace with the URL you want to embed
        className='w-full h-full border-none'
        title="Embedded Website"
      />
    </div>
  );
};

export default CVKD;