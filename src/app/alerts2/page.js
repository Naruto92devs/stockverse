
// import AweberForm from "@/components/AweberForm";
// import Form from "@/components/Form";
'use client';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Optional default styles
import Disclaimer from '../disclaimer/page';
import { useMetadata } from '@/context/MetadataContext';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function Alerts() {
  const { setMetadata } = useMetadata();
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(null);

   useEffect(() => {
      setMetadata({
        title: "Stock Alerts, Monitor the Stock Market - Stockverse",
        description: "Set stock alerts and monitor the market! Stay updated with real-time notifications and expert insights to track your investments effectively",
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        // setMessage(error.response.data.message || 'Something went wrong');
        setMessage('An error occurred. Please try again.');
        setLoading(false);
      } else {
        setMessage('An error occurred. Please try again.');
        setLoading(false);
      }
      console.error('Error during subscribing:', error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full relative bg-heroBg bg-no-repeat bg-cover bg-left-bottom">
        {/* <div className="absolute z-10 bg-alertsBg/70 w-full h-[100%]"></div> */}
        <div className="relative z-10 py-6 max-md:py-6 lg:px-[10%] px-3 max-sm:px-3 mx-auto xl:container gap-y-0 max-sm:gap-y-3 flex flex-col items-start justify-center">
          <svg className="w-48 h-16" width="400" height="96" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_379_19)">
              <path d="M17.57 26.1401L17.3 26.2901L17.57 26.1401Z" fill="black" />
              <path d="M27.7 16.94V8L13.85 0L0 8V16.31L16.2 25.66L13.85 27.02L0 19.02V27.96L13.85 35.96L27.7 27.96V19.65L11.5 10.3L13.85 8.94L27.7 16.94ZM1.09 8.63L13.85 1.26L26.61 8.63V11.35L13.85 4.01L1.09 11.34V8.62V8.63ZM1.09 15.68V13.24L19.4 23.81L17.29 25.03L1.09 15.68ZM26.61 27.34L13.85 34.71L1.09 27.34V24.63L13.85 31.99L26.61 24.63V27.34ZM26.61 20.29V22.73L8.29 12.15L10.4 10.93L26.6 20.28L26.61 20.29ZM10.41 9.67L10.14 9.83L6.11 12.16L26.07 23.68L13.86 30.73L1.09 23.36V20.92L13.85 28.28L17.3 26.29L17.57 26.13L21.6 23.8L1.64 12.29L13.85 5.27L26.61 12.61V15.05L13.85 7.69L10.4 9.68L10.41 9.67Z" fill="black" />
              <path d="M10.4099 9.66992L10.1299 9.82992L10.4099 9.66992Z" fill="black" />
              <path d="M13.85 38.4002L0 30.4102V39.3602L13.85 47.3602L27.7 39.3602V30.4102L13.85 38.4102V38.4002ZM26.61 38.7202L13.85 46.0802L1.09 38.7202V36.0102L13.85 43.3702L26.61 36.0102V38.7202ZM26.61 34.7402L13.85 42.1002L1.09 34.7402V32.3002L13.85 39.6602L26.61 32.3002V34.7402Z" fill="black" />
              <path d="M42.14 35.7499C40.42 35.7499 38.78 35.4899 37.21 34.9599C35.64 34.4299 34.41 33.7499 33.51 32.9199L34.7 30.4099C35.56 31.1599 36.65 31.7799 37.98 32.2799C39.31 32.7699 40.7 33.0199 42.13 33.0199C43.44 33.0199 44.5 32.8699 45.32 32.5699C46.14 32.2699 46.74 31.8599 47.12 31.3299C47.51 30.7999 47.7 30.2099 47.7 29.5399C47.7 28.7699 47.45 28.1399 46.94 27.6699C46.44 27.1999 45.78 26.8199 44.98 26.5299C44.18 26.2399 43.29 25.9899 42.32 25.7699C41.35 25.5599 40.38 25.2999 39.41 25.0099C38.43 24.7199 37.54 24.3499 36.74 23.8999C35.94 23.4499 35.29 22.8399 34.79 22.0799C34.3 21.3199 34.05 20.3399 34.05 19.1299C34.05 17.9199 34.36 16.8999 34.97 15.9299C35.58 14.9499 36.53 14.1699 37.8 13.5799C39.08 12.9899 40.7 12.6899 42.68 12.6899C43.99 12.6899 45.29 12.8599 46.58 13.2099C47.87 13.5499 48.98 14.0499 49.93 14.6899L48.87 17.2699C47.9 16.6299 46.88 16.1599 45.81 15.8699C44.74 15.5799 43.7 15.4399 42.69 15.4399C41.42 15.4399 40.38 15.5999 39.57 15.9199C38.75 16.2399 38.16 16.6699 37.78 17.2099C37.4 17.7499 37.22 18.3499 37.22 19.0099C37.22 19.7999 37.47 20.4399 37.98 20.9099C38.48 21.3799 39.14 21.7599 39.94 22.0399C40.74 22.3199 41.63 22.5699 42.6 22.7999C43.57 23.0299 44.54 23.2799 45.51 23.5599C46.49 23.8399 47.38 24.1999 48.18 24.6499C48.98 25.0999 49.63 25.6999 50.13 26.4499C50.62 27.1999 50.87 28.1699 50.87 29.3499C50.87 30.5299 50.56 31.5499 49.94 32.5199C49.32 33.4999 48.36 34.2799 47.06 34.8699C45.76 35.4599 44.12 35.7599 42.15 35.7599L42.14 35.7499Z" fill="black" />
              <path d="M62.4501 32.2702C61.8101 32.8002 61.0001 33.0702 60.0301 33.0702C59.1701 33.0702 58.5101 32.8202 58.0501 32.3302C57.5901 31.8402 57.3601 31.1302 57.3601 30.2002V14.6802H54.2701V30.3302C54.2701 32.0502 54.7401 33.3702 55.6901 34.2902C56.6301 35.2102 57.9701 35.6702 59.6801 35.6702C60.3901 35.6702 61.0701 35.5702 61.7301 35.3802C62.3901 35.1902 62.9501 34.8902 63.4201 34.4802L62.4501 32.2602V32.2702ZM59.2001 18.4302L57.3701 20.9702H62.2601V18.4302H59.2001ZM51.3801 18.4302V20.9702H57.3701V18.4302H51.3801Z" fill="black" />
              <path d="M72.5899 35.6803C70.8699 35.6803 69.3499 35.3003 68.0199 34.5503C66.6899 33.8003 65.64 32.7603 64.86 31.4403C64.09 30.1203 63.7 28.6203 63.7 26.9503C63.7 25.2803 64.09 23.7503 64.86 22.4403C65.63 21.1303 66.6799 20.1103 68.0199 19.3703C69.3499 18.6303 70.8699 18.2603 72.5899 18.2603C74.3099 18.2603 75.8 18.6303 77.15 19.3703C78.49 20.1103 79.5399 21.1303 80.3099 22.4303C81.0699 23.7303 81.4499 25.2403 81.4499 26.9503C81.4499 28.6603 81.0699 30.1503 80.3099 31.4603C79.5499 32.7703 78.5 33.8003 77.15 34.5503C75.81 35.3003 74.2899 35.6803 72.5899 35.6803ZM72.5899 32.9803C73.6799 32.9803 74.67 32.7303 75.54 32.2403C76.41 31.7503 77.09 31.0403 77.58 30.1303C78.07 29.2203 78.32 28.1603 78.32 26.9603C78.32 25.7603 78.07 24.6803 77.58 23.7903C77.09 22.9003 76.4 22.2103 75.54 21.7103C74.67 21.2203 73.6899 20.9703 72.5899 20.9703C71.4899 20.9703 70.52 21.2203 69.66 21.7103C68.8 22.2003 68.1099 22.9003 67.5999 23.7903C67.0799 24.6803 66.83 25.7403 66.83 26.9603C66.83 28.1803 67.0899 29.2203 67.5999 30.1303C68.1199 31.0403 68.8 31.7503 69.66 32.2403C70.52 32.7303 71.4999 32.9803 72.5899 32.9803Z" fill="black" />
              <path d="M91.8801 35.6803C90.1401 35.6803 88.5901 35.3003 87.2301 34.5503C85.8701 33.8003 84.8001 32.7703 84.0301 31.4603C83.2601 30.1503 82.8701 28.6503 82.8701 26.9503C82.8701 25.2503 83.2601 23.7503 84.0301 22.4403C84.8001 21.1303 85.8701 20.1103 87.2301 19.3703C88.5901 18.6303 90.1401 18.2603 91.8801 18.2603C93.4301 18.2603 94.8001 18.5703 96.0201 19.1803C97.2301 19.7903 98.1701 20.7003 98.8401 21.9003L96.4901 23.4103C95.9301 22.5703 95.2501 21.9603 94.4501 21.5603C93.6501 21.1603 92.7801 20.9603 91.8601 20.9603C90.7401 20.9603 89.7501 21.2103 88.8701 21.7003C87.9901 22.1903 87.2901 22.8903 86.7801 23.7803C86.2601 24.6703 86.0101 25.7303 86.0101 26.9503C86.0101 28.1703 86.2701 29.2403 86.7801 30.1403C87.3001 31.0403 87.9901 31.7403 88.8701 32.2303C89.7501 32.7203 90.7501 32.9703 91.8601 32.9703C92.7801 32.9703 93.6501 32.7703 94.4501 32.3703C95.2501 31.9703 95.9401 31.3603 96.4901 30.5203L98.8401 32.0003C98.1701 33.1803 97.2401 34.0903 96.0201 34.7203C94.8101 35.3503 93.4301 35.6703 91.8801 35.6703V35.6803Z" fill="black" />
              <path d="M117.45 18.4301L110.27 25.4801L107.94 27.5301L104.41 30.8301L104.38 30.8501L104.41 35.4901H101.31V11.6001H104.41V26.9401L113.71 18.4301H117.45Z" fill="black" />
              <path d="M126.53 35.4902L116.61 12.9502H120.09L129.2 33.7502H127.2L136.38 12.9502H139.6L129.72 35.4902H126.53Z" fill="black" />
              <path d="M147.04 35.6803C145.22 35.6803 143.61 35.3003 142.23 34.5503C140.85 33.8003 139.77 32.7703 139.01 31.4603C138.25 30.1503 137.87 28.6503 137.87 26.9503C137.87 25.2503 138.24 23.7503 138.98 22.4403C139.72 21.1303 140.74 20.1103 142.04 19.3703C143.34 18.6303 144.8 18.2603 146.44 18.2603C148.08 18.2603 149.55 18.6303 150.82 19.3503C152.09 20.0803 153.08 21.1003 153.8 22.4203C154.52 23.7403 154.88 25.2803 154.88 27.0403C154.88 27.1703 154.88 27.3203 154.86 27.4903C154.85 27.6603 154.83 27.8203 154.81 27.9703H140.29V25.7503H153.2L151.94 26.5203C151.96 25.4303 151.74 24.4503 151.26 23.5903C150.79 22.7303 150.14 22.0603 149.31 21.5803C148.48 21.1003 147.52 20.8603 146.43 20.8603C145.34 20.8603 144.4 21.1003 143.56 21.5803C142.72 22.0603 142.07 22.7403 141.6 23.6103C141.13 24.4803 140.89 25.4703 140.89 26.5903V27.1103C140.89 28.2503 141.15 29.2603 141.68 30.1503C142.21 31.0403 142.94 31.7303 143.89 32.2303C144.83 32.7203 145.92 32.9703 147.14 32.9703C148.15 32.9703 149.07 32.8003 149.89 32.4503C150.72 32.1103 151.44 31.5903 152.06 30.9003L153.77 32.9003C153 33.8003 152.04 34.4903 150.89 34.9603C149.74 35.4303 148.46 35.6703 147.04 35.6703V35.6803Z" fill="black" />
              <path d="M157.85 35.4903V18.4303H160.81V23.0703L160.52 21.9103C160.99 20.7303 161.79 19.8303 162.9 19.2103C164.02 18.5903 165.39 18.2803 167.02 18.2803V21.2703C166.89 21.2503 166.77 21.2403 166.65 21.2403H166.31C164.66 21.2403 163.35 21.7303 162.38 22.7203C161.41 23.7103 160.93 25.1303 160.93 27.0003V35.5003H157.84L157.85 35.4903Z" fill="black" />
              <path d="M174.63 35.6803C173.21 35.6803 171.87 35.4903 170.59 35.1003C169.31 34.7103 168.31 34.2403 167.58 33.6803L168.87 31.2303C169.6 31.7203 170.5 32.1403 171.57 32.4903C172.64 32.8303 173.74 33.0103 174.85 33.0103C176.29 33.0103 177.32 32.8103 177.96 32.4003C178.59 31.9903 178.91 31.4203 178.91 30.6903C178.91 30.1503 178.72 29.7403 178.33 29.4303C177.94 29.1303 177.43 28.9003 176.8 28.7503C176.17 28.6003 175.46 28.4703 174.69 28.3503C173.92 28.2303 173.14 28.0803 172.37 27.9003C171.6 27.7203 170.89 27.4603 170.24 27.1303C169.6 26.8003 169.08 26.3403 168.69 25.7503C168.3 25.1603 168.11 24.3703 168.11 23.3803C168.11 22.3903 168.4 21.4503 168.98 20.6803C169.56 19.9103 170.38 19.3103 171.44 18.8903C172.5 18.4703 173.76 18.2603 175.22 18.2603C176.34 18.2603 177.47 18.3903 178.62 18.6603C179.77 18.9303 180.71 19.3103 181.44 19.8003L180.12 22.2503C179.35 21.7303 178.54 21.3803 177.71 21.1903C176.87 21.0003 176.04 20.9003 175.2 20.9003C173.85 20.9003 172.84 21.1203 172.17 21.5603C171.5 22.0003 171.17 22.5603 171.17 23.2503C171.17 23.8303 171.37 24.2803 171.77 24.5903C172.17 24.9003 172.68 25.1403 173.32 25.3103C173.95 25.4803 174.66 25.6303 175.43 25.7403C176.2 25.8603 176.98 26.0103 177.75 26.1903C178.52 26.3703 179.23 26.6203 179.86 26.9503C180.49 27.2703 181.01 27.7203 181.41 28.3003C181.81 28.8803 182.01 29.6503 182.01 30.6203C182.01 31.6503 181.71 32.5403 181.11 33.2903C180.51 34.0403 179.66 34.6303 178.57 35.0403C177.48 35.4603 176.17 35.6703 174.64 35.6703L174.63 35.6803Z" fill="black" />
              <path d="M192.18 35.6803C190.36 35.6803 188.75 35.3003 187.37 34.5503C185.99 33.8003 184.91 32.7703 184.15 31.4603C183.39 30.1503 183.01 28.6503 183.01 26.9503C183.01 25.2503 183.38 23.7503 184.12 22.4403C184.86 21.1303 185.88 20.1103 187.18 19.3703C188.48 18.6303 189.94 18.2603 191.58 18.2603C193.22 18.2603 194.69 18.6303 195.96 19.3503C197.23 20.0803 198.22 21.1003 198.94 22.4203C199.66 23.7403 200.02 25.2803 200.02 27.0403C200.02 27.1703 200.02 27.3203 200 27.4903C199.99 27.6603 199.97 27.8203 199.95 27.9703H185.43V25.7503H198.34L197.08 26.5203C197.1 25.4303 196.88 24.4503 196.4 23.5903C195.93 22.7303 195.28 22.0603 194.45 21.5803C193.62 21.1003 192.66 20.8603 191.57 20.8603C190.48 20.8603 189.54 21.1003 188.7 21.5803C187.86 22.0603 187.21 22.7403 186.74 23.6103C186.27 24.4803 186.03 25.4703 186.03 26.5903V27.1103C186.03 28.2503 186.29 29.2603 186.82 30.1503C187.35 31.0403 188.08 31.7303 189.03 32.2303C189.97 32.7203 191.06 32.9703 192.28 32.9703C193.29 32.9703 194.21 32.8003 195.03 32.4503C195.86 32.1103 196.58 31.5903 197.2 30.9003L198.91 32.9003C198.14 33.8003 197.18 34.4903 196.03 34.9603C194.88 35.4303 193.6 35.6703 192.18 35.6703V35.6803Z" fill="black" />
              <path d="M118.15 35.4903H114.35L108.76 28.5603L107.94 27.5303L111.9 27.5503L118.15 35.4903Z" fill="black" />
            </g>
            <defs>
              <clipPath id="clip0_379_19">
                <rect width="200" height="47.35" fill="black" />
              </clipPath>
            </defs>
          </svg>
          <p className="text-3xl text-secondaryHeading font-sansSemibold">
            #1 Long Term Stock Picking Service In The U.S.A
          </p>
          <div className="w-full mt-2 max-md:flex-col-reverse max-md:gap-y-8 flex items-center justify-between">
            <div className="w-[39%] max-xl:w-[45%] max-md:w-[100%] p-2">
              <Image className="w-[92%] h-[100%]" width={398} height={815} src='/images/alerts.png' alt="iPhone" />
            </div>
            <div className="w-[50%] max-md:w-[100%] max-md:mt-4 flex flex-col gap-y-4 max-md:gap-y-6">
              <h1 className="text-4xl max-xl:text-2xl font-sansSemibold text-secondaryHeading">Get Winning Stock Picks Sent To Your Phone</h1>
              <p className="text-xl max-xl:text-md text-secondaryHeading font-sansRegular">2023 Track Record: <span className="font-sansBold"> 477.2%.</span> 2024 Track Record: <span className="font-sansBold"> 233.3%.</span> 28 of Last 32 Trades Won! Make BIG Money Following Our Trades. </p>
              {/* <div className="klaviyo-form-UyiDsy"></div> */}
              <div className={`flex-grow p-4 sm:gap-y-2 gap-y-2 flex flex-col items-center justify-center`}>
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
        </div>
      </div>
      <div className="py-6 max-md:py-6 px-3 max-sm:px-3 mx-auto xl:container gap-y-8 max-sm:gap-y-3 flex flex-col items-center justify-center">
        <Disclaimer />
      </div>
    </div>
  );
}