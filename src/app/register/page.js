'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function Register() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [OTP, setOTP] = useState('');
    const [VerifyOTP, setVerifyOTP] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password matching
    const [message, setMessage] = useState(null);
    const [id, setid] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            router.push('/');
        }
    }, [router]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Check if passwords match while typing in the Confirm Password field
        setPasswordsMatch(password === e.target.value);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (!passwordsMatch) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/signup`, {
                username,
                email,
                password,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 201) {
                setMessage(data.message);
                setid(data.id);
                setLoading(false);
                setVerifyOTP(true);
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
            console.error('Error during signup:', error);
        }
    };

    const handleSubmitOTP = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/auth/verify-otp`, {
                id,
                OTP,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                const authToken = response.data.token;
                // console.log(authToken);
                if (authToken) {
                    Cookies.set('authToken', authToken, { expires: 6 / 24 });
                }
                // Redirect to dashboard after successful login
                router.push('/');
                // setMessage(data.message);
                // setLoading(false);
                // router.push('/login');
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
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="max-lg:pt-16 pb-[10vh] max-md:pt-10 w-full bg-loginBg bg-no-repeat bg-cover bg-left-bottom mb-[-20px]">
            <div className={`${VerifyOTP ? 'hidden' : 'flex'} px-6 max-sm:px-3 lg:min-h-[90vh] mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center justify-center`}>
                <h1 className="text-6xl max-md:text-4xl font-sansSemibold text-secondaryHeading">Register</h1>
                <p className="text-lg mb-8 max-md:mb-4 w-[40%] max-xl:w-[70%] max-sm:w-[100%] leading-[120%] max-xl:text-base max-sm:text-sm text-center text-secondaryHeading">
                    Welcome! Sign Up now to access personalized stock insights, real-time data, and your custom watchlist with StockverseGPT at your side.
                </p>
                <form onSubmit={handleSubmit} className="w-[35%] max-lg:w-[55%] max-sm:w-[90%] space-y-4">
                    <div className="w-full flex flex-col">
                        <label htmlFor="username" className="text-md font-Medium text-secondaryHeading">
                            Name
                        </label>
                        <input
                            type="name"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-secondaryHeading/40 rounded-lg focus:outline-none focus:border-secondaryHeading"
                        />
                    </div>
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
                    <div className="w-full flex flex-col relative">
                        <label htmlFor="password" className="text-md font-Medium text-secondaryHeading">
                            Password
                        </label>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            value={password}
                            autoComplete="new-password"
                            onChange={handlePasswordChange}
                            placeholder="Create your password"
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
                    <div className="w-full flex flex-col relative">
                        <label htmlFor="confirmPassword" className="text-md font-Medium text-secondaryHeading">
                            Confirm Password
                        </label>
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            autoComplete="new-password"
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirm your password"
                            required
                            className={`w-full text-base px-4 py-2 border ${passwordsMatch ? 'border-secondaryHeading/40' : 'border-sell'} bg-mobNavLink text-secondaryHeading rounded-lg focus:outline-none focus:border-secondaryHeading`}
                            title={!passwordsMatch ? 'Passwords do not match' : ''} // Show title if passwords do not match
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            className="absolute right-3 top-[1.7rem] text-3xl text-secondaryHeading focus:outline-none"
                        >
                            {confirmPasswordVisible ? '👁️' : '🙈'}
                        </button>
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-submit text-base text-mobNavLink py-2 rounded-lg hover:bg-secondaryHeading transition duration-300"
                    >
                        {loading ? 'Signning Up...' : 'Sign Up'}
                    </button>
                    <div className="w-full flex flex-col mt-4 space-y-2">
                        <a 
                        href={loading ? '' : 'https://devsalman.tech/auth/google'} 
                        className="w-[100%] cursor-pointer flex gap-x-2 justify-center border-[1.5px] border-secondaryHeading hover:border-mobNavLink text-center text-base text-secondaryHeading py-2 rounded-lg hover:bg-mobNavLink transition duration-300"
                        >
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12.2898C21 16.4398 18.79 21.4998 12.13 21.4998C7.12461 21.533 3.03852 17.5051 3 12.4998C3.03852 7.49437 7.12461 3.46646 12.13 3.49972C14.2007 3.5074 16.2085 4.21189 17.83 5.49972C17.942 5.59125 18.0109 5.72533 18.02 5.86972C18.0206 6.01581 17.963 6.15613 17.86 6.25972C17.209 6.85492 16.5882 7.48237 16 8.13972C15.8289 8.32802 15.5422 8.35408 15.34 8.19972C14.4161 7.516 13.2888 7.1637 12.14 7.19972C9.18528 7.19972 6.79 9.595 6.79 12.5498C6.79 15.5045 9.18528 17.8998 12.14 17.8998C15.14 17.8998 16.41 16.6198 17.07 14.3498H12.5C12.2239 14.3498 12 14.1259 12 13.8498V11.1998C12 10.9236 12.2239 10.6998 12.5 10.6998H20.5C20.7302 10.6983 20.9244 10.8709 20.95 11.0998C20.9871 11.4953 21.0038 11.8925 21 12.2898Z" fill="black"/>
                        </svg>
                        Register with Google
                        </a>
                    </div>
                </form>
                <p className="flex gap-x-2 text-md font-Medium text-secondaryHeading">
                    Already have an account?
                    <Link className="underline" href='/login'>
                        Sign In!
                    </Link>
                </p>
                {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
            </div>

            {/* OTP VERIFICATION POPUP */}
            <div className={`${VerifyOTP ? 'flex' : 'hidden'} px-6 max-sm:px-3 lg:min-h-[90vh] mx-auto xl:container gap-y-4 max-sm:gap-y-3 flex flex-col items-center justify-center`}>
                <form onSubmit={handleSubmitOTP} className="flex flex-col items-center w-[35%] max-lg:w-[55%] max-sm:w-[90%] space-y-4">
                    <Image src="/images/stockverseLogo.png" width={250} height={57.20} alt='Stockverse Logo' />
                    <div className="p-8 max-sm:px-4 rounded-xl flex flex-col gap-y-8 items-center bg-background shadow-lg">
                        <p className="text-base leading-[120%] font-sansRegular max-sm:text-sm text-center text-primaryText">
                            Thanks for signing up! Before getting started, could you verify your email address by providing OTP emailed to you?
                        </p>
                        <div className="w-full flex flex-col gap-y-2">
                            <label htmlFor="otp" className="text-md font-Medium text-secondaryHeading">
                                Enter OTP
                            </label>
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
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-submit text-base text-mobNavLink py-2 rounded-lg hover:bg-secondaryHeading transition duration-300"
                        >
                            {loading ? 'Verifying...' : 'Submit'}
                        </button>
                    </div>
                    {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
                </form>
            </div>
        </div>
    );
}