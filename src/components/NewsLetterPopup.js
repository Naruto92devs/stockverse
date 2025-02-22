'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Optional default styles

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function NewsLetterPopup({newsletter, setNewsletter}) {

  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleSubscribeEmailPhone = async (e) => {
    setLoading(true);
    e.preventDefault();
    const id = "YhpBUN";
    const baseId = "VSwpYs";

    try {
        const requestData = {
            id,
            baseId,
            email,
            phone: `+${phone}`,
        };

        // Only add the phone number if it is provided
        // if (phone) {
        //     requestData.phone = `+${phone}`;
        // }

        const response = await axios.post(`${STOCKVERSE_BACK_END}/klaviyo-subscription`, requestData);

        const data = response.data;
        console.log(data);
        if (response.status === 200) {
            setMessage(data.message);
            setLoading(false);
            setDone(true);
            setEmail('');
            setPhone('');
        } else {
            setMessage(data.message || 'Something went wrong');
            setLoading(false);
        }
    } catch (error) {
        if (error.response && error.response.data) {
            setMessage(error.response.data.message || 'Something went wrong');
            setLoading(false);
        } else {
            setMessage('An error occurred. Please try again.');
            setLoading(false);
        }
        console.error('Error during subscribing:', error);
    }
  };

  return (
    <div className={`${newsletter ? 'visible' : 'hidden'} fixed z-20 top-0 left-0 bottom-0 right-0 p-4 w-full flex bg-black/10 backdrop-blur-sm flex flex-col items-center justify-center h-full max-h-screen overflow-y-scroll scrollbar-hide`}>
      <div className={`md:w-[750px] relative w-full min-h-max flex sm:flex-row flex-col items-center bg-primaryBg rounded-xl overflow-hidden`}>
        <Image className='flex-none max-sm:hidden' width={266} height={500} src='/images/popup_side_image.jpg' alt='img' />
        <Image className='sm:hidden pt-4' src="/images/stockverseLogo.png" width={200} height={57.20} alt='Stockverse Logo' />
        <div className={`flex-grow p-4 sm:gap-y-2 gap-y-2 flex flex-col items-center justify-center`}>
          <Image className='cursor-pointer absolute top-2 right-2' onClick={() => setNewsletter(false)} width={32} height={32} src='/images/cross.svg' alt='close' />
          <h1 className="text-3xl max-md:text-2xl font-sansMedium text-primaryTextColor text-center">Winning Stock Picks</h1>
          <p className="text-lg leading-[120%] max-xl:text-base max-sm:text-sm text-center text-primaryTextColor">
            Grow Your Wealth by +673.66%! Get Exclusive Stock Picks Sent To Your Inbox!
          </p>
          <form onSubmit={handleSubscribeEmailPhone} className="w-full space-y-4">
            <div className="w-full flex flex-col">
              <label htmlFor="email" className="text-md font-sansMedium text-primaryTextColor">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sams@lineakit.com"
                required
                className="w-full text-base px-4 py-2 border bg-primary-bg text-primaryTextColor border-primaryTextColor/10 rounded-lg focus:outline-none focus:border-primaryTextColor"
              />
            </div>
            <div className="w-full flex flex-col relative">
              <div className="flex justify-between items-end">
                <label htmlFor="phone" className="text-base font-sansMedium text-primaryTextColor">
                  Phone
                </label>
              </div>
              <PhoneInput
                country={"us"}
                value={phone}
                autoComplete="phone"
                onChange={(value) => setPhone(value)}
                inputProps={{
                  id: "phone",
                  required: true,
                  autoFocus: false,
                }}
                inputStyle={{
                  width: "100%",
                  padding: "10px 10px 10px 50px",
                  fontSize: "16px",
                  border: "1px solid rgba(156, 163, 175, 0.4)",
                  borderRadius: "0.5rem",
                  backgroundColor: "#F7FAFC",
                  color: "#1A202C",
                }}
                containerStyle={{
                  width: "100%",
                }}
                dropdownStyle={{
                  borderRadius: "0.5rem",
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="privacyPolicy"
                checked={privacyChecked}
                onChange={() => setPrivacyChecked(!privacyChecked)}
                required
                className="placeholder:text-[#1E1E1F] w-4 h-4 rounded bg-gray-800 border-gray-700 focus:ring-blue-500"
              />
              <label htmlFor="privacyPolicy" className="text-xs font-sansRegular text-[#96A0B5]">
                Privacy Policy
              </label>
            </div>
            <p className="text-xs text-[#96A0B5] font-sansRegular">
              By submitting this form and signing up for texts, you consent to receive marketing text messages (e.g., promos, cart reminders)
              from Relqo Media at the number provided, including messages sent by autodialer. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Unsubscribe at any time by replying STOP or clicking the unsubscribe link (where available).{" "}
              <a href="/policy" className="text-[#0A84EF] text-[0.8rem] underline font-MontserratSemibold">
                Privacy Policy
              </a>{" "}
              &{" "}
              <a href="/terms" className="text-[#0A84EF] text-[0.8rem] font-MontserratSemibold underline">
                Terms
              </a>
              .
            </p>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primaryMain text-base font-sansMedium text-white py-2 rounded-lg hover:bg-black transition duration-300"
            >
              {loading ? 'Subscribing...' : 'Reveal the Winners!'}
            </button>
          </form>
          {done && <p className="text-black text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
}