'use client';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Optional default styles

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function CvkdForm() {

  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState('');
  const [tag, setTag] = useState('cvkd subscriber');
  const [message, setMessage] = useState(null);
  const [done, setDone] = useState(null);
  const [er, setEr] = useState(null);
  const [loading, setLoading] = useState(null);
  const [loadingButton, setLoadingButton] = useState(null); // 'cvkd' | 'sms' | null

  const handleSubscribeEmailPhone = async (e, tagType) => {
    e.preventDefault();
    setTag(tagType);
    setLoadingButton(tagType);
  
    try {
      const requestData = {
        email,
        phone: `+${phone}`,
        tag: tagType,
      };
  
      const response = await axios.post(`${STOCKVERSE_BACK_END}/stockpicks/create-contact`, requestData);
      const data = response.data;
  
      if (response.status === 200) {
        setDone(true);
        setEr(false);
        setMessage(data.message || 'Subscribed Successfully');
        setEmail('');
        setPhone('');
      } else {
        setDone(true);
        setEr(true);
        setMessage(data.message || 'Something went wrong');
        setEmail('');
        setPhone('');
      }
    } catch (error) {
      setDone(true);
      setEr(true);
      setMessage(error?.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Error during subscribing:', error);
    } finally {
      setLoadingButton(null);
    }
  };

  return (
      <div className={`w-full flex flex-col items-center`}>
          <form onSubmit={handleSubscribeEmailPhone} className="w-full space-y-6">
            <div className="w-full flex flex-col gap-3">
              <label htmlFor="email" className="text-xl font-inter font-normal text-black">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sams@lineakit.com"
                required
                className="w-full text-[16px] font-inter font-normal px-4 py-3 border bg-white text-primaryTextColor border-[#E6E6E6] rounded-lg focus:outline-none focus:border-primaryTextColor"
              />
            </div>
            <div className="w-full flex flex-col gap-3 relative">
              <div className="flex justify-between items-end">
                <label htmlFor="phone" className="text-xl font-inter font-normal text-black">
                  Mobile Number
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
                  padding: "24px 24px 24px 50px",
                  fontSize: "16px",
                  border: "1px solid #E6E6E6",
                  borderRadius: "0.5rem",
                  backgroundColor: "#fff",
                  color: "#111",
                }}
                containerStyle={{
                  width: "100%",
                }}
                dropdownStyle={{
                  borderRadius: "0.5rem",
                }}
                // className='!rounded-full'
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="privacyPolicy"
                checked={privacyChecked}
                onChange={() => setPrivacyChecked(!privacyChecked)}
                required
                className="placeholder:text-[#1E1E1F] w-5 h-5 rounded bg-gray-800 border-gray-700 focus:ring-blue-500"
              />
              <label htmlFor="privacyPolicy" className="text-lg font-inter text-[#606060]">
                Privacy Policy
              </label>
            </div>
            <p className="text-lg capitalize text-[#606060] font-inter font-normal">
              You may receive <span className='text-[#0429BB]'> recurring </span> email or SMS alerts from Stockverse. Message and data rates may apply. You can unsubscribe at any time.
            </p>
            <div className='flex flex-wrap gap-4'>
            <button
  disabled={loadingButton !== null}
  type="button"
  onClick={(e) => handleSubscribeEmailPhone(e, 'cvkd subscriber')}
  className="px-5 py-3 rounded-full flex items-center gap-2 font-inter text-white bg-cvkdButton font-medium text-base"
>
  {loadingButton === 'cvkd subscriber' ? 'Subscribing...' : 'Get CVKD Investor Alerts Now'}
  <Image width={24} height={24} src='/images/arrow-up-right.svg' alt='arrow' />
</button>

<button
  disabled={loadingButton !== null}
  type="button"
  onClick={(e) => handleSubscribeEmailPhone(e, 'sms stock alert')}
  className="px-5 py-3 rounded-full flex items-center gap-2 font-inter text-black bg-white font-medium border border-[#D0D5DD] text-base"
>
  {loadingButton === 'sms stock alert' ? 'Subscribing...' : 'SMS Stock Alert'}
  <Image className='invert' width={24} height={24} src='/images/arrow-up-right.svg' alt='arrow' />
</button>
            </div>
          </form>
          {done && <p className={`${er ? 'text-sell' : 'text-buy' } pt-4 font-inter font-normal  text-center`}>{message}</p>}
      </div>
  );
}