'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function ResetPasswrod() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const [OTP, setOTP] = useState('');
    const [VerifyOTP, setVerifyOTP] = useState(false);
    const [green, setGreen] = useState(true);
    const [id, setid] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            router.push('/'); // Redirect to dashboard if already logged in
        }
    }, [router]);

    const handleSubmitForm = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/forgot-password`, {
                email,
            }, {
                withCredentials: true, // Include cookies in the request
            });

            // Check if the response status is 200 (OK)
            if (response.status === 201) {
                const data = response.data;
                console.log(data);
                setError(data.message);
                setGreen(true);
                setid(data.id);
                setLoading(false);
                setVerifyOTP(true);
            } else {
                setError(response.data.message || 'Failed to sign in');
                setLoading(false);
                setGreen(false);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
                setGreen(false);
                setLoading(false);
            } else {
                setError(err.message || 'An unexpected error occurred');
                setLoading(false);
                setGreen(false);
            }
        }
    };

    const handleSubmitOTP = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/reset-password`, {
                id,
                OTP,
                newPassword,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                setError(data.message);
                setLoading(false);
                setGreen(true);
                router.push('/login');
            } else {
                setError(data.message || 'Something went wrong');
                setLoading(false);
                setGreen(false);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Something went wrong');
                setError(false);
                setGreen(false);
            } else {
                setError('An error occurred. Please try again.');
                setLoading(false);
                setGreen(false);
            }
            console.error('Error during signup:', error);
            setLoading(false);
                setGreen(false);
        }
    };


    const resendOTP = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/backup-otp`, {
                id,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                setError(data.message);
                setGreen(true);
                setLoading(false);
            } else {
                setError(data.message || 'Something went wrong');
                setLoading(false);
                setGreen(false);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Something went wrong');
                setError(false);
                setGreen(false);
            } else {
                setError('An error occurred. Please try again.');
                setLoading(false);
                setGreen(false);
            }
            console.error('Error during signup:', error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-loginBg bg-cover bg-center bg-no-repeat w-full flex flex-col justify-center items-center flex-grow">

            <div className={` ${VerifyOTP ? 'hidden' : 'flex'} px-6 w-full max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center justify-center`}>
                <form onSubmit={handleSubmitForm} className="flex flex-col items-center 2xl:w-[40%] lg:w-[50%] md:w-[70%] sm:w-[90%] space-y-4">
                    <div className="p-8 max-sm:px-4 rounded-xl flex flex-col gap-y-8 items-center bg-white shadow-lg">
                        <Image src="/images/stockverseLogo.png" width={200} height={57.20} alt='Stockverse Logo' />
                        <p className="text-base leading-[120%] font-sansRegular max-sm:text-sm text-center text-primaryText">
                            Please provide us your email address associated with StockVerse to recover your Account.
                        </p>
                        <div className="w-full flex flex-col space-y-2">
                            <label htmlFor="email" className="text-md font-sansMedium text-primaryTextColor">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                required
                                className="w-full text-base font-sansRegular px-4 py-2 border bg-white text-primaryTextColor border-primaryTextColor/40 rounded-lg focus:outline-none focus:border-primaryTextColor"
                            />
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primaryMain text-base text-white font-sansMedium py-2 rounded-lg hover:bg-black transition duration-300"
                        >
                            {loading ? 'Loading...' : 'Continue'}
                        </button>
                        <p className="flex gap-x-2 text-md font-sansMedium text-primaryText">
                            Already have an account?
                            <Link className="underline text-primaryMain" href='/login'>
                                Sign In!
                            </Link>
                        </p>
                    </div>
                </form>
                {error && <p className={`${green? 'text-buy' : 'text-sell'} text-base font-sansRegular text-center mt-4`}>{error}</p>}
            </div>

            {/* OTP VERIFICATION POPUP */}
            <div className={`${VerifyOTP ? 'flex' : 'hidden'} px-6 max-sm:px-3 mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center justify-center`}>
                <form onSubmit={handleSubmitOTP} className="flex flex-col items-center 2xl:w-[40%] lg:w-[50%] md:w-[70%] sm:w-[90%] space-y-4">
                    <div className="p-8 max-sm:px-4 rounded-xl flex flex-col gap-y-8 items-center bg-white shadow-lg">
                        <Image src="/images/stockverseLogo.png" width={200} height={57.20} alt='Stockverse Logo' />
                        <p className="text-base leading-[120%] font-sansRegular max-sm:text-sm text-center text-primaryText">
                            We have sent an OTP to your verified email address! In order to Reset Passwrod, please enter OTP sent to your email Inbox?
                        </p>
                        <div className="w-full flex flex-col gap-y-2">
                            <div className="flex justify-between items-end">
                                <label htmlFor="otp" className="text-md font-sansMedium text-primaryText">
                                    Enter OTP
                                </label>
                                {/* <p className="cursor-pointer text-md font-Medium text-primaryText underline">Resend OTP?</p> */}
                            </div>
                            <input
                                type="text"
                                id="otp"
                                autoComplete="otp"
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                placeholder="Enter OTP Sent To Your Email"
                                required
                                className="w-full text-base px-4 py-2 border font-sansRegualr bg-white text-primaryText border-primaryText/40 rounded-lg focus:outline-none focus:border-primaryText"
                            />
                            <p onClick={resendOTP} className="cursor-pointer self-end text-md font-sansMedium text-primaryText underline"> {loading ? 'Sending...' : 'Resend OTP?'}</p>
                        </div>
                        <div className="w-full flex flex-col relative gap-y-2">
                            <div className="flex justify-between items-end">
                                <label htmlFor="password" className="text-md font-sansMedium text-primaryText">
                                    Set Password
                                </label>
                                {/* <p className="cursor-pointer text-md font-Medium text-primaryText underline">Resend OTP?</p> */}
                            </div>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                value={newPassword}
                                autoComplete="new-password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter Your New Password"
                                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                                title="Password must contain at least 1 number, 1 lowercase letter, 1 uppercase letter, 1 special symbol, and be at least 8 characters long."
                                required
                                className="w-full text-base px-4 py-2 border bg-white font-sansRegualr text-primaryText border-primaryText/40 rounded-lg focus:outline-none focus:border-primaryText"
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute right-3 top-[2.3rem] text-3xl text-primaryText focus:outline-none"
                            >
                                {
                                    passwordVisible ?
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_19140_7012)">
                                                <path d="M15.9996 5C12.3774 5 9.39959 6.85 7.11626 9.23125C4.97737 11.4687 3.49959 14.125 2.74403 16C3.49959 17.875 4.97737 20.5312 7.1107 22.7687C9.39959 25.15 12.3774 27 15.9996 27C19.6218 27 22.5996 25.15 24.8829 22.7687C27.0218 20.5312 28.4996 17.875 29.2551 16C28.4996 14.125 27.0218 11.4687 24.8885 9.23125C22.5996 6.85 19.6218 5 15.9996 5ZM5.29959 7.0375C7.91625 4.3 11.5107 2 15.9996 2C20.4885 2 24.0829 4.3 26.6996 7.0375C29.2996 9.75625 31.0385 13 31.8663 15.2312C32.0496 15.725 32.0496 16.275 31.8663 16.7687C31.0385 19 29.2996 22.25 26.6996 24.9625C24.0829 27.7 20.4885 30 15.9996 30C11.5107 30 7.91625 27.7 5.29959 24.9625C2.69959 22.25 0.960699 19 0.138477 16.7687C-0.0448568 16.275 -0.0448568 15.725 0.138477 15.2312C0.960699 13 2.69959 9.75 5.29959 7.0375ZM15.9996 21C18.4551 21 20.444 18.7625 20.444 16C20.444 13.2375 18.4551 11 15.9996 11C15.9607 11 15.9274 11 15.8885 11C15.9607 11.3187 15.9996 11.6562 15.9996 12C15.9996 14.2062 14.4051 16 12.444 16C12.1385 16 11.8385 15.9562 11.5551 15.875C11.5551 15.9187 11.5551 15.9563 11.5551 16C11.5551 18.7625 13.544 21 15.9996 21ZM15.9996 8C17.8856 8 19.6943 8.84285 21.0279 10.3431C22.3615 11.8434 23.1107 13.8783 23.1107 16C23.1107 18.1217 22.3615 20.1566 21.0279 21.6569C19.6943 23.1571 17.8856 24 15.9996 24C14.1136 24 12.3049 23.1571 10.9713 21.6569C9.63768 20.1566 8.88848 18.1217 8.88848 16C8.88848 13.8783 9.63768 11.8434 10.9713 10.3431C12.3049 8.84285 14.1136 8 15.9996 8Z" fill="#DFDFDF" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_19140_7012">
                                                    <rect width="32" height="32" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        :
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.3239 6.78976C14.8658 6.70964 15.4248 6.66667 16.0006 6.66667C22.8072 6.66667 27.2737 12.6731 28.7743 15.0491C28.9559 15.3367 29.0467 15.4805 29.0975 15.7022C29.1357 15.8688 29.1356 16.1316 29.0975 16.2981C29.0466 16.5199 28.9551 16.6646 28.7722 16.9541C28.3725 17.5869 27.7629 18.4761 26.9553 19.4406M8.96576 8.95338C6.083 10.9089 4.12593 13.6258 3.22814 15.047C3.04571 15.3358 2.9545 15.4802 2.90365 15.702C2.86546 15.8685 2.86545 16.1313 2.90362 16.2978C2.95444 16.5196 3.04524 16.6634 3.22685 16.9509C4.72739 19.3269 9.19388 25.3333 16.0006 25.3333C18.7451 25.3333 21.1092 24.3568 23.0518 23.0355M4.00055 4L28.0006 28M13.1721 13.1716C12.4483 13.8954 12.0006 14.8954 12.0006 16C12.0006 18.2091 13.7914 20 16.0006 20C17.1051 20 18.1051 19.5523 18.829 18.8284" stroke="#DFDFDF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                }
                            </button>
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primaryMain font-sansMedium text-base text-white py-2 rounded-lg hover:bg-black transition duration-300"
                        >
                            {loading ? 'Updating Password...' : 'Submit'}
                        </button>
                    </div>
                </form>
                {error && <p className={`${green? 'text-buy' : 'text-sell'} font-sansRegular text-base text-center mt-4`}>{error}</p>}
            </div>

        </div>
    );
}