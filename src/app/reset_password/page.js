'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';

export default function ResetPasswrod() {

const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
const [newPassword, setNewPassword] = useState('');
const [passwordVisible, setPasswordVisible] = useState(false);
const [error, setError] = useState('');
const [OTP, setOTP] = useState('');
const [VerifyOTP, setVerifyOTP] = useState(false);
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
        const response = await axios.post('https://devsalman.tech/forgot-password', {
            email,
        }, {
            withCredentials: true, // Include cookies in the request
        });

        // Check if the response status is 200 (OK)
        if (response.status === 201) {
        const data = response.data;
        console.log(data);
        setError(data.message);
        setid(data.id);
        setLoading(false);
        setVerifyOTP(true);
        } else {
            setError(response.data.message || 'Failed to sign in');
            setLoading(false);
        }
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
            setLoading(false);
        } else {
            setError(err.message || 'An unexpected error occurred');
            setLoading(false);
        }
    }
};

const handleSubmitOTP = async (e) => {
setLoading(true);
e.preventDefault();

try {
    const response = await axios.post('https://devsalman.tech/reset-password', {
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
        router.push('/login');
    } else {
        setError(data.message || 'Something went wrong');
        setLoading(false);
    }
} catch (error) {
    if (error.response && error.response.data) {
        setError(error.response.data.message || 'Something went wrong');
        setError(false);
    } else {
        setError('An error occurred. Please try again.');
        setLoading(false);
    }
    console.error('Error during signup:', error);
    setLoading(false);
}
};


const resendOTP = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    try {
        const response = await axios.post('https://devsalman.tech/backup-otp', {
            id,
        }, {
            withCredentials: true,
        });
    
        const data = response.data;
        console.log(data);
        if (response.status === 207) {
            setError(data.message);
            setLoading(false);
        } else {
            setError(data.message || 'Something went wrong');
            setLoading(false);
        }
    } catch (error) {
        if (error.response && error.response.data) {
            setError(error.response.data.message || 'Something went wrong');
            setError(false);
        } else {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
        console.error('Error during signup:', error);
        setLoading(false);
    }
    };

return (
    <div className="max-lg:pt-16 pb-[19vh] max-md:pt-12 w-full bg-loginBg bg-no-repeat bg-cover bg-left-bottom mb-[-20px]">
        
        <div className={` ${VerifyOTP ? 'hidden' : 'flex'} px-6 max-sm:px-3 lg:min-h-[90vh] mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center justify-center`}>
            <h1 className="text-4xl max-md:text-4xl font-sansSemibold text-secondaryHeading">Password assistance</h1>
            <p className="text-lg mb-8 max-md:mb-4 w-[40%] max-xl:w-[70%] max-sm:w-[100%] leading-[120%] max-xl:text-base max-sm:text-sm text-center text-secondaryHeading">
            Enter the email address associated with your Amazon account.
            </p>
            <form onSubmit={handleSubmitForm} className="w-[35%] max-lg:w-[55%] max-sm:w-[90%] space-y-4">
                <div className="w-full flex flex-col">
                <label htmlFor="email" className="text-md font-Medium text-secondaryHeading">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-secondaryHeading/40 rounded-lg focus:outline-none focus:border-secondaryHeading"
                />
                </div>
                <button
                disabled={loading}
                type="submit"
                className="w-full bg-submit text-base text-mobNavLink py-2 rounded-lg hover:bg-secondaryHeading transition duration-300"
                >
                {loading ? 'Loading...' : 'Continue'}
                </button>
                <div className="w-full flex flex-col mt-4 space-y-2">
                </div>
            </form>
            <p className="flex gap-x-2 text-md font-Medium text-secondaryHeading">
                Already have an account?
                <Link className="underline" href='/login'>
                Sign In!
                </Link>
            </p>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>

        {/* OTP VERIFICATION POPUP */}
        <div className={`${VerifyOTP ? 'flex' : 'hidden'} px-6 max-sm:px-3 lg:min-h-[90vh] mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center justify-center`}>
            <form onSubmit={handleSubmitOTP} className="flex flex-col items-center w-[40%] max-lg:w-[55%] max-sm:w-[90%] space-y-4">
                <Image src="/images/stockverseLogo.png" width={200} height={57.20} alt='Stockverse Logo' />
                <div className="p-8 max-sm:px-4 rounded-xl flex flex-col gap-y-8 items-center bg-background shadow-lg">
                    <p className="text-base leading-[120%] font-sansRegular max-sm:text-sm text-center text-primaryText">
                        We have sent an OTP to your verified email address! In order to Reset Passwrod, please enter OTP sent to your email Inbox?
                    </p>
                    <div className="w-full flex flex-col gap-y-2">
                    <div className="flex justify-between items-end">
                        <label htmlFor="otp" className="text-md font-Medium text-secondaryHeading">
                            Enter OTP
                        </label>
                        {/* <p className="cursor-pointer text-md font-Medium text-secondaryHeading underline">Resend OTP?</p> */}
                        </div>
                        <input
                            type="text"
                            id="otp"
                            autoComplete="otp"
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                            placeholder="Enter OTP Sent To Your Email"
                            required
                            className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-secondaryHeading/40 rounded-lg focus:outline-none focus:border-secondaryHeading"
                        />
                        <p onClick={resendOTP} className="cursor-pointer self-end text-md font-Medium text-secondaryHeading underline"> {loading ? 'Sending...' : 'Resend OTP?'}</p>
                    </div>
                    <div className="w-full flex flex-col relative">
                        <div className="flex justify-between items-end">
                        <label htmlFor="password" className="text-md font-Medium text-secondaryHeading">
                            Set Password
                        </label>
                        {/* <p className="cursor-pointer text-md font-Medium text-secondaryHeading underline">Resend OTP?</p> */}
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
                        className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-secondaryHeading/40 rounded-lg focus:outline-none focus:border-secondaryHeading"
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-[1.7rem] text-3xl text-secondaryHeading focus:outline-none"
                        >
                            {passwordVisible ? '👁️' : '🙈'}
                        </button>
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-submit text-base text-mobNavLink py-2 rounded-lg hover:bg-secondaryHeading transition duration-300"
                    >
                        {loading ? 'Changing Password...' : 'Submit'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>

    </div>
);
}