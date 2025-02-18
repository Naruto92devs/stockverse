import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function DeleteAccount() {

    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState('');
    const [delLoading, setDelLoading] = useState(false);
    const [confirm, SetConfirm] = useState(false);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    const toggleConfirm = () => {
        SetConfirm(!confirm);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDeleteAccount = async (e) => {
        setDelLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/delete-account`, {
                password,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                setDelLoading(false);
                SetConfirm(false);
                setMessage(data.message);
                Cookies.remove('authToken');
                localStorage.removeItem('UserInfo');
                router.push('/');
            } else {
                setMessage(data.error || 'Something went wrong');
                setDelLoading(false);
                SetConfirm(false);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Something went wrong');
                setDelLoading(false);
            } else {
                setMessage('An error occurred. Please try again.');
                setDelLoading(false);
            }
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className="w-full h-full">
            <div className="md:border-t-2 md:border-dashed md:border-primaryText/20 py-4 md:py-10 mx-auto xl:container md:gap-y-8 gap-y-4 flex max-lg:flex-col items-start justify-between">
                <div className="flex flex-col lg:w-[35%] w-full">
                    <h1 className="text-primaryText max-sm:text-2xl text-xl font-sansMedium">Delete Account</h1>
                    <p>Permanently delete your account.</p>
                </div>
                <div className="lg:w-[60%] w-full max-md:border-t-2 max-md:border-dashed max-md:border-primaryText/20 max-md:pt-6  md:bg-background md:shadow-xl flex flex-col items-start gap-y-4">
                    <div className="md:p-8 w-full flex flex-col space-y-4">
                        
                        <p className="text-lg text-primaryText">Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.</p>
                        <button
                            onClick={toggleConfirm}
                            disabled={delLoading}
                            type="submit"
                            className="w-max bg-sell text-base text-primaryButtonText py-2 px-8 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                        >
                            {delLoading ? 'Deleting Account...' : 'Delete Account'}
                        </button>
                        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
                    </div>
                </div>
                <div className={`${confirm ? 'visible' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 w-full h-[100vh] flex flex-col items-center justify-center bg-primaryText/60`}>
                    <div className="max-w-[90%] w-max rounded-lg bg-background ">
                        <form onSubmit={handleDeleteAccount} className="md:p-8 p-6 w-full flex flex-col items-center space-y-4">
                            <p className="text-lg text-primaryText text-center">Are you sure you want to delete your account, this action is not reversible. Provide password to conrtinue!</p>
                            <div className="w-full flex flex-col relative">
                                <label htmlFor="password" className="text-lg font-Medium text-primaryText">
                                    Current Password
                                </label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    autoComplete="new-password"
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your password to delete your account"
                                    // pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                                    title="Password must contain at least 1 number, 1 lowercase letter, 1 uppercase letter, 1 special symbol, and be at least 8 characters long."
                                    required
                                    className="w-full text-lg px-4 py-2 border-2 bg-background text-primaryText border-primaryText/10 focus:outline-none focus:border-primaryText"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute right-3 top-[2rem] text-3xl text-secondaryHeading focus:outline-none"
                                >
                                    {passwordVisible ? '👁️' : '🙈'}
                                </button>
                            </div>
                            <div className="flex gap-4 flex-wrap">
                                <button
                                    disabled={delLoading}
                                    type="submit"
                                    className="w-max bg-sell text-base text-primaryButtonText py-2 px-8 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                                >
                                    {delLoading ? 'Deleting Account...' : 'Confirm'}
                                </button>
                                <button
                                onClick={toggleConfirm}
                                type="cancel"
                                className="w-max bg-buy text-base text-primaryButtonText py-2 px-8 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                            {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}