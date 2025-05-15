'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useMembership } from "@/context/MembershipContext";
import axios from 'axios';
import Image from "next/image";
import { useMetadata } from "@/context/MetadataContext";
const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function Membership() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { membership } = useMembership();
  const [priceId, setPriceId] = useState('');
  const [view, setView] = useState('FREE');
  const router = useRouter();
  const { setMetadata } = useMetadata();


  useEffect(() => {
    setMetadata({
      title: "Pricing Plans - Stockverse",
      description: "Our pricing plans for everyone. Access real-time data, personalized stock alerts and valuable insights to help you make informed investment decisions",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const plans = {
    monthly: {
      free: { price: "0", priceId: "price_free", label: "FREE" },
      basic: { price: "9.99", priceId: "price_1RAIqeBi8ZwCbxPY42hCa5sp", label: "PREMIUM" },
    },
    yearly: {
      free: { price: "0", priceId: "price_free", label: "FREE" },
      basic: { price: "99.99", priceId: "price_1RAFH5Bi8ZwCbxPYZOgkq1qn", label: "PREMIUM" },
    },
  };

  const updatePlan = (plan, id) => {
    setView(plan);
    setPriceId(id);
  };

  // Update priceId when billingCycle changes
  useEffect(() => {
    setPriceId(plans[billingCycle][view.toLowerCase()].priceId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingCycle, view]);

  
  const handleCheckout = async () => {
    try {
      if (membership) {
        const response = await axios.post(`${STOCKVERSE_BACK_END}/create-checkout-session`, { priceId }, {withCredentials:true,});
        const data = response.data;
        if (data.clientSecret) {
          router.push(`/checkout?clientSecret=${data.clientSecret}`);
        } else {
          console.error(data.error);
        }
      } else {
        router.push('/register');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="w-full h-full sm:py-24 py-12 bg-pricingBg bg-no-repeat bg-cover bg-top-center">
      
      <div className="px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center">
        <h1 className="w-full md:w-[70%] xl:w-[45%] font-sansMedium text-5xl max-sm:text-[7vw] leading-[120%] text-center">
          Trade Smarter. Move Faster. Win Bigger.
        </h1>
        {/* Toggle Monthly/Yearly */}
        <div className="flex items-center justify-center my-8 bg-white p-1 rounded-full">
          <button
            className={`px-6 py-2 text-lg font-sansMedium rounded-full ${billingCycle === "monthly" ? "bg-primaryMain text-white" : "bg-none text-primaryTextColor"}`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={`flex items-center gap-2 pl-6 pr-1 py-1.5 text-lg font-sansMedium rounded-full ${billingCycle === "yearly" ? "bg-primaryMain text-white" : "bg-none text-primaryTextColor"}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly <span className={`px-3 py-1 text-sm font-sansMedium rounded-full ${billingCycle === "yearly" ? "bg-white/5 text-white" : "bg-black/5 text-primaryTextColor"}`}>save 15%</span>
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="mx-auto xl:container p-6 flex flex-wrap md:flex-row justify-between items-center max-md:gap-8">
        <div className="md:w-[48%] w-full flex flex-col items-start gap-2">
          <h2 className="py-1 px-3 bg-black text-lg text-white font-sansMedium rounded-full">{view === 'FREE' ? 'FREE' : 'PREMIUM'} MEMBERSHIP</h2>
          <h3 className="text-xl mt-2 mb-4 font-sansMedium text-black">What You Get with Premium:</h3>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src='/images/green_tick.svg' alt='logo'/>
            <p className="font-sansRegular text-base md:text-lg text-black"> <span className="font-sansMedium"> Live Stock Data & Charts </span> — No delays, no guessing</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src='/images/green_tick.svg' alt='logo'/>
            <p className="font-sansRegular text-base md:text-lg text-black"> <span className="font-sansMedium"> Instant Market News  </span> — Beat the headlines, beat the herd</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src='/images/green_tick.svg' alt='logo'/>
            <p className="font-sansRegular text-base md:text-lg text-black"> <span className="font-sansMedium"> Build Your Watchlist </span> — Track winners before they move</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src='/images/green_tick.svg' alt='logo'/>
            <p className="font-sansRegular text-base md:text-lg text-black"> <span className="font-sansMedium"> Early IPO Access </span> — Get in before the crowd</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src={`${view === 'FREE' ? '/images/red_cross.svg' : '/images/green_tick.svg'}`} alt='logo'/>
            <p className="font-sansRegular text-base md:text-lg text-black"> <span className="font-sansMedium"> Real-Time Stock Trades </span> — Follow our latest trade entries and exits</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src={`${view === 'FREE' ? '/images/red_cross.svg' : '/images/green_tick.svg'}`} alt='logo'/>
            <p className="font-sansRegular text-base md:text-lg text-black"> <span className="font-sansMedium"> Pro-Level Research Tools </span> — See what others {`don’t`}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image width={36} height={36} src={`${view === 'FREE' ? '/images/red_cross.svg' : '/images/green_tick.svg'}`} alt='logo'/>
            <p className="font-sansRegular text-base md:text-lg text-black"> <span className="font-sansMedium"> Verified Stock Picks </span> — Our top trade ideas, updated frequently</p>
          </div>
        </div>
        <div className="md:w-[48%] w-full flex flex-col gap-4 bg-primaryBg p-4 rounded-xl">
          {/* FREE Plan */}
          <div onClick={() => updatePlan('FREE' ,plans[billingCycle].free.priceId)} className={`${view === 'FREE' ? 'bg-white/5 border border-primaryMain shadow-xl' : 'bg-black/5 border border-black/10'} w-full p-4 rounded-xl cursor-pointer`}>
            <div className="flex flex-wrap gap-4 justify-between items-center py-2 border-b border-black/5">
              <h2 className="text-xl font-sansMedium">{plans[billingCycle].free.label}</h2>
              <p className="flex items-start text-4xl font-sansSemibold text-primaryText"><span className="text-base font-sansMedium">$</span> {plans[billingCycle].free.price} <span className="text-base leading-[100%] self-end pb-0.5 pl-1 font-sansMedium text-primaryTextColor/60">/{billingCycle === 'monthly' ? 'Month' : 'Year'}</span></p>
            </div>
            <p className="text-lg font-sansRegular py-2 text-primaryTextColor">Get your feet wet with stock data and charts. Love it? Upgrade anytime to unlock full AI insights and advanced tools.</p>
          </div>
          {/* PREMIUM Plan */}
          <div onClick={() => updatePlan('BASIC' ,plans[billingCycle].basic.priceId)} className={`${view === 'BASIC' ? 'bg-white/5 border border-primaryMain shadow-xl' : 'bg-black/5 border border-black/10'} w-full p-4 rounded-xl cursor-pointer`}>
            <div className="flex flex-wrap gap-4 justify-between items-center py-2 border-b border-black/5">
              <h4 className="text-xl font-sansMedium">{plans[billingCycle].basic.label}</h4>
              <p className="flex items-start text-4xl font-sansSemibold text-primaryText"><span className="text-base font-sansMedium">$</span> {plans[billingCycle].basic.price} <span className="text-base leading-[100%] self-end pb-0.5 pl-1 font-sansMedium text-primaryTextColor/60">/{billingCycle === 'monthly' ? 'Month' : 'Year'}</span></p>
            </div>
            <p className="text-lg font-sansRegular py-2 text-primaryTextColor">Unlock full market access for just {billingCycle === 'monthly' ? '$9.99/month' : '$99.99/year'} .</p>
          </div>

          <button 
          onClick={handleCheckout} 
          disabled={membership?.price_id === priceId}  
          className={`${membership?.price_id !== 'price_free' && view === 'FREE' ? '' : ''} disabled:bg-black w-full text-lg py-2 font-sansMedium bg-primaryMain hover:bg-black text-white rounded-lg`}
          >
            {!membership && view === 'FREE' ? (
              'Get Started For Free'
            ) : !membership && view !== 'FREE'  ? (
              'Get Started'
            ) : membership?.price_id === priceId ? (
              'Current Plan'
            ) : (
              'Select Plan'
            )}
          </button>
          {membership && membership?.price_id !== 'price_free' && view === 'FREE' ? (
            <p className="text-black font-sansRegular">{`ℹ️ Info: You’re currently subscribed to our Premium plan. If you wish to downgrade to the Free version, simply cancel your current subscription. Once your plan reaches its expiration date, your account will automatically be moved to the Free tier.`}</p>
          ) : null}
          {membership && membership?.price_id !== 'price_free' && membership?.price_id !== priceId && view !== 'FREE' ? (
            <p className="text-black font-sansRegular">{`⚠️ Info: You’re currently subscribed to our Premium plan. If you wish to upgrade or downgrade to the other plan, Please notice that your current plan will be canceled and cannot be revived.`}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}