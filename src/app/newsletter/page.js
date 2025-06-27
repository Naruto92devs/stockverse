'use client';
import Image from "next/image";
import React, { useState } from 'react';
import axios from "axios";
import StockpicksFooter from "@/components/stockpicks_footer";
import Link from "next/link";

const Newsletter = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [er, setEr] = useState(null);
  const isValidPhone = phone && phone.replace(/\D/g, '').length >= 10;
  const isFormValid = email && isValidPhone && !loading;


  const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

  const handleSubscribeEmailPhone = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const requestData = {
        email,
        tag: 'newsletter'
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
        setEr(false);
        setEmail('');
        setPhone('');
        setDone(true);
      } else {
        setDone(true);
        setEr(true);
        setEmail('');
        setPhone('');
        setMessage(data.message || 'Something went wrong');
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setEr(true);
        setDone(true);
        setEmail('');
        setPhone('');
        setMessage(error.response.data.message || 'Something went wrong');
        // setMessage('An error occurred. Please try again.');
        setLoading(false);
      } else {
        setDone(true);
        setEr(true);
        setEmail('');
        setPhone('');
        setMessage('An error occurred. Please try again.');
        setLoading(false);
      }
      console.error('Error during subscribing:', error);
    }
  };


  return (
    <>
      {/* Logo */}
      <section className="bg-skyBlue py-12">
        <div className="xl:container mx-auto flex flex-col items-center">
          <h1 className="font-OpenSans md:text-7xl text-5xl font-[600] text-[#181851]">StockVerse</h1>
        </div>
      </section>
        <section className="w-full xl:container mx-auto py-12 flex flex-col items-center gap-y-8">
          <div className="max-w-[650px] w-[95%] flex flex-col items-center gap-y-16">
            <h1 className="text-primaryText font-OpenSans sm:text-[2.33rem] text-2xl font-semibold text-center leading-[130%]">Every Day at 6:59am We Send Out Our #1 Trade Pick Of The Day.</h1>
            <div className="max-w-[570px] w-[97%] sm:p-6 p-4 space-y-4 bg-white shadow rounded-xl border border-black/10">
              <h2 className="text-primaryText font-OpenSans font-bold sm:text-[1.7rem] text-xl text-center">Enter your email address below to get {`tomorrow's`} pick. Free!</h2>
              <div>
                {done && (
                  <div className={`${er ? 'text-sell' : 'text-[#fff]'} w-full bg-[#12a72e] absolute left-0 top-36 p-2 px-4 text-center text-base font-sansMedium`}>
                    {er ? `${message}` : 'Thanks For Subscribing.'}
                  </div>
                )}
                <form className="flex flex-col gap-4 items-center justify-between w-full relative" onSubmit={handleSubscribeEmailPhone}>
                  <Image width={24} height={24} src='/images/cvkd/sms.svg' alt="sms" className="absolute top-6 left-6" loading="eager" />
                  <input
                    autoComplete="email"
                    name="search_Symbols"
                    type="email"
                    className="w-[100%] max-lg:w-[100%] pl-14 p-6 font-MontserratMedium rounded-full placeholder:text-sm  text-base max-lg:text-xl bg-white rounded outline outline-1 outline-[#DDE9EF]"
                    placeholder="Enter your email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="w-full relative">
                    <Image width={24} height={24} src='/images/cvkd/phone.svg' alt="sms" className="absolute top-6 left-6" loading="eager" />
                    <input
                      name="search_Symbols"
                      type="tel"
                      className="w-[100%] max-lg:w-[100%] pl-14 p-6 font-MontserratMedium rounded-full placeholder:text-sm  text-base max-lg:text-xl bg-white rounded outline outline-1 outline-[#DDE9EF]"
                      placeholder="Enter your phone number"
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
                  className={`animate-heartbeat bg-skyBlue text-sm text-[#fff] font-MontserratSemibold px-6 py-4 rounded-full shadow-lg transition ${isFormValid ? '' : 'cursor-not-allowed'}  ${isSubmitting ? "cursor-not-allowed bg-[#649f6f]" : "bg-[#12A72E]"}`}>

                    {loading ? "Subscribing..." : <>
                      Get Winning Stock Picks <span className="font-MontserratBold max-md:hidden">&#8212; FREE</span>
                    </>}
                  </button>
                  <Link className="text-blue underline text-center" href="/cadrenal-page">“Just want {`today’s`} stock pick? Click here to read the report.”</Link>
                </form>
              </div>
              <p className="text-primaryText font-OpenSans font-normal text-xs">*By submitting your email address, you give us permission to deliver access instructions to your email inbox and send free ongoing updates and marketing as well as one of our preferred partners. . You can unsubscribe at any time. See Privacy Policy here .</p>
            </div>
            <h3 className="text-skyBlue uppercase font-OpenSans sm:text-[2.6rem] text-2xl font-semibold text-center leading-[130%]">Hurry! What You Miss This Morning Could Affect Your Bottom Line This Afternoon</h3>
          </div>
        </section>
        <StockpicksFooter/>
    </>
  )
}

export default Newsletter;