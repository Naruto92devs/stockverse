'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useMembership } from "@/context/MembershipContext";
import axios from 'axios';
import Image from "next/image";

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function Membership() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { membership } = useMembership();
  const [priceId, setPriceId] = useState('');
  const [view, setView] = useState('FREE');
  const router = useRouter();

  const plans = {
    monthly: {
      free: { price: "0", priceId: "price_free", label: "FREE" },
      basic: { price: "30", priceId: "price_1QMSAIBi8ZwCbxPYXKZFxfFk", label: "PREMIUM" },
    },
    yearly: {
      free: { price: "0", priceId: "price_free", label: "FREE" },
      basic: { price: "300", priceId: "price_1QMSAPBi8ZwCbxPY5rlGmPjA", label: "PREMIUM" },
    },
  };

  const updatePlan = (plan, id) => {
    setView(plan);
    setPriceId(id);
  };

  // Update priceId when billingCycle changes
  useEffect(() => {
    setPriceId(plans[billingCycle][view.toLowerCase()].priceId);
  }, [billingCycle, view]);

  
  const handleCheckout = async () => {
    try {
      const response = await axios.post(`${STOCKVERSE_BACK_END}/create-checkout-session`, { priceId }, {withCredentials:true,});
      const data = response.data;
      if (data.clientSecret) {
        router.push(`/checkout?clientSecret=${data.clientSecret}`);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="w-full h-full sm:pt-24 pt-12 bg-pricingBg bg-no-repeat bg-cover bg-top-center">
      
      <div className="px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center">
        <h1 className="w-full md:w-[70%] xl:w-[50%] font-sansMedium text-5xl max-sm:text-[7vw] leading-[120%] text-center">
          Choose the plan that fits your business
        </h1>
        {/* Toggle Monthly/Yearly */}
        <div className="flex items-center justify-center my-8 bg-white p-1 rounded-full">
          <button
            className={`px-6 py-2 text-base font-sansMedium rounded-full ${billingCycle === "monthly" ? "bg-primaryMain text-white" : "bg-none text-primaryTextColor"}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={`flex items-center gap-2 pl-6 pr-1 py-1.5 text-base font-sansMedium rounded-full ${billingCycle === "yearly" ? "bg-primaryMain text-white" : "bg-none text-primaryTextColor"}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly <span className={`px-3 py-1 text-sm rounded-full ${billingCycle === "yearly" ? "bg-white/5 text-white" : "bg-black/5 text-primaryTextColor"}`}>save 15%</span>
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="mx-auto xl:container p-6 flex flex-wrap md:flex-row justify-between items-center max-md:gap-8">
        <div className="md:w-[48%] w-full flex flex-col items-start gap-2">
          <h2 className="py-1 px-3 bg-black text-white font-sansMedium rounded-full">{view} PLAN</h2>
          <h3 className="lg:text-4xl text-3xl mb-4 font-sansMedium text-black">Start Smart, Stay Informed, Absolutely Free!</h3>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src='/images/green_tick.svg' alt='logo'/>
            <p className="font-snasMedium text-base md:text-lg text-black">Realtime Stocks Data & Charts</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src='/images/green_tick.svg' alt='logo'/>
            <p className="font-snasMedium text-base md:text-lg text-black">Realtime Stocks News</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src='/images/green_tick.svg' alt='logo'/>
            <p className="font-snasMedium text-base md:text-lg text-black">Add Stocks to Watch List</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src='/images/green_tick.svg' alt='logo'/>
            <p className="font-snasMedium text-base md:text-lg text-black">IPO Calendar</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src={`${view === 'FREE' ? '/images/red_cross.svg' : '/images/green_tick.svg'}`} alt='logo'/>
            <p className="font-snasMedium text-base md:text-lg text-black">Full Access to StockVerse GPT</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src={`${view === 'FREE' ? '/images/red_cross.svg' : '/images/green_tick.svg'}`} alt='logo'/>
            <p className="font-snasMedium text-base md:text-lg text-black">StockPicks</p>
          </div>
        </div>
        <div className="md:w-[48%] w-full flex flex-col gap-4 bg-primaryBg p-4 rounded-xl">
          {/* FREE Plan */}
          <div onClick={() => updatePlan('FREE' ,plans[billingCycle].free.priceId)} className={`${view === 'FREE' ? 'bg-white/5 border border-primaryMain shadow-xl' : 'bg-black/5 border border-black/10'} w-full p-4 rounded-xl cursor-pointer`}>
            <div className="flex flex-wrap gap-4 justify-between items-center py-2 border-b border-black/5">
              <h2 className="text-xl font-sansMedium">{plans[billingCycle].free.label}</h2>
              <p className="flex items-start text-4xl font-sansSemibold text-primaryText"><span className="text-base font-sansMedium">$</span> {plans[billingCycle].free.price} <span className="text-base leading-[100%] self-end pb-0.5 pl-1 font-sansMedium text-primaryTextColor/60">/{billingCycle === 'monthly' ? 'Month' : 'Year'}</span></p>
            </div>
            <p className="text-base font-sansRegular py-2">Our Company Plan is ideal for larger organizations seeking comprehensive solutions for their teams</p>
          </div>
          {/* BASIC Plan */}
          <div onClick={() => updatePlan('BASIC' ,plans[billingCycle].basic.priceId)} className={`${view === 'BASIC' ? 'bg-white/5 border border-primaryMain shadow-xl' : 'bg-black/5 border border-black/10'} w-full p-4 rounded-xl cursor-pointer`}>
            <div className="flex flex-wrap gap-4 justify-between items-center py-2 border-b border-black/5">
              <h4 className="text-xl font-sansMedium">{plans[billingCycle].basic.label}</h4>
              <p className="flex items-start text-4xl font-sansSemibold text-primaryText"><span className="text-base font-sansMedium">$</span> {plans[billingCycle].basic.price} <span className="text-base leading-[100%] self-end pb-0.5 pl-1 font-sansMedium text-primaryTextColor/60">/{billingCycle === 'monthly' ? 'Month' : 'Year'}</span></p>
            </div>
            <p className="text-base font-sansRegular py-2">Our Company Plan is ideal for larger organizations seeking comprehensive solutions for their teams</p>
          </div>

          <button 
          onClick={handleCheckout} 
          disabled={membership?.price_id === priceId}  
          className="disabled:bg-black w-full text-lg py-2 bg-primaryMain hover:bg-black text-white rounded-lg"
          >
            {membership?.price_id === priceId ? 'Current Plan' : 'Select Plan'}
          </button>
        </div>
      </div>
    </div>
  );
}