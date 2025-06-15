'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import StockpicksFooter from "@/components/stockpicks_footer";

const calculateNextTarget = () => {
  // 8:00 PM ET is UTC-4 during DST, so 20:00 ET = 00:00 UTC next day
  const targetDate = new Date("2025-06-15T20:00:00-04:00"); // ISO with ET offset
  return targetDate.getTime();
};

const NewsletterAlerts = () => {

  const [isOut, setIsOut] = useState(false);
  const [targetTime, setTargetTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const target = calculateNextTarget();
      const remaining = target - now;

      if (remaining <= 0) {
        setIsOut(true);
        setTimeLeft(0);
        return;
      }

      setIsOut(false);
      setTargetTime(target);
      setTimeLeft(remaining);
    };

    updateCountdown();

    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert milliseconds to days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);


  return (
    <>
      {/* Logo */}
      <section className="bg-skyBlue py-12">
        <div className="xl:container mx-auto flex flex-col items-center">
          <h1 className="font-OpenSans md:text-7xl text-5xl font-[600] text-[#181851]">StockVerse</h1>
        </div>
      </section>
      <section className="w-full xl:container mx-auto py-8 flex flex-col items-center gap-y-4">
        <div className="max-w-[650px] w-[95%] flex flex-col items-center gap-y-8">
          <h1 className="text-primaryText font-OpenSans sm:text-[2.33rem] text-2xl font-semibold text-center leading-[130%]">🚨 SUNDAY 8PM ET — THE TECH TICKER DROPS</h1>
          <div className="max-w-[570px] w-[97%] sm:p-6 p-4 space-y-6 bg-white shadow rounded-xl border border-black/10">
            <h2 className="text-primaryText font-OpenSans font-bold sm:text-[1.7rem] text-xl text-center leading-[130%]">Be First. Move Early. Strike Before the Crowd.</h2>
            <ul className="list-disc pl-4 font-OpenSans text-lg space-y-2">
              <li>🔥 {`It’s`} a brand-new tech stock setup</li>
              <li>📈 Fresh chart. Real momentum.</li>
              <li>✅ You get it first — before social, before scanners, before the market reacts.</li>
              <li>🧠 The kind of setup traders dream about.</li>
            </ul>
            <h2 className="text-skyBlue font-OpenSans font-bold text-xl text-center leading-[130%]">And {`you’re`} already on the VIP list.</h2>
            {isOut ? (
              <div className="text-center">
                <Link href='/iqst' className="text-white text-xl font-OpenSans font-bold animate-heartbeat bg-skyBlue px-6 py-4 rounded-full shadow-lg transition">🚨 The Stock Pick is Out Now!</Link>
              </div>
            ) : (
              <div className="w-full flex flex-wrap items-center justify-center md:gap-8 gap-4">
                {/* Days */}
                <div className="flex flex-col items-center gap-y-2">
                  <p className="text-black text-6xl max-md:text-5xl font-grotesqueExtrabold">{days}</p>
                  <p className="text-black font-poppinsRegular text-base xl:text-xl">Days</p>
                </div>
                {/* Hours */}
                <div className="flex flex-col items-center gap-y-2">
                  <p className="text-black text-6xl max-md:text-5xl font-grotesqueExtrabold">{hours}</p>
                  <p className="text-black font-poppinsRegular text-base xl:text-xl">Hours</p>
                </div>
                {/* Minutes */}
                <div className="flex flex-col items-center gap-y-2">
                  <p className="text-black text-6xl max-md:text-5xl font-grotesqueExtrabold">{minutes}</p>
                  <p className="text-black font-poppinsRegular text-base xl:text-xl">Minutes</p>
                </div>
                {/* Seconds */}
                <div className="flex flex-col items-center gap-y-2">
                  <p className="text-black text-6xl max-md:text-5xl font-grotesqueExtrabold">{seconds}</p>
                  <p className="text-black font-poppinsRegular text-base xl:text-xl">Seconds</p>
                </div>
              </div>
            )}
          </div>
          <h3 className="text-skyBlue uppercase font-OpenSans sm:text-[2.6rem] text-2xl font-semibold text-center leading-[130%]">💥 Want to be the hero in your group chat?</h3>
          <ul className="max-w-[570px] w-[97%] list-disc sm:pl-10 pl-8 font-OpenSans text-lg space-y-2">
            <li>👀 Send this to your crew.</li>
            <li>👊 Put real traders on this drop.</li>
            <li>🔗 <Link className='text-skyBlue' href='/newsletter'> stockverse.com/newsletter</Link></li>
          </ul>
          <p className='text-black font-OpenSans font-bold text-xl text-center leading-[130%]'>The more eyes on this before Monday… the louder the move.</p>
          <p className='text-skyBlue uppercase font-OpenSans sm:text-[2.6rem] text-2xl font-semibold text-center leading-[130%]'>THIS TECH PLAY COULD BE THE MONDAY STORY AND YOU SAW IT FIRST.</p>
        </div>
      </section>
      <section className="w-full xl:container mx-auto border-b border-b-[#000] max-lg:px-4">

      </section>
      <StockpicksFooter />
    </>
  )
}

export default NewsletterAlerts;