import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileSecurity({userInfo}) {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track password matching
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [enable, setEnable] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
        // Check if passwords match while typing in the Confirm Password field
        setPasswordsMatch(newPassword === e.target.value);
    };

    const handleUpdatePassword = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post('https://devsalman.tech/update-password', {
                password,
                newPassword,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                setLoading(false);
                setPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setMessage(data.message);
            } else {
                setMessage(data.error || 'Something went wrong');
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

    const handleEnable2FA = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post('https://devsalman.tech/toggle-2fa', {
                
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                setLoading(false);
                setEnable(true);
                setMessage(data.message);
            } else if (response.status === 206) {
                setLoading(false);
                setEnable(false);
                setMessage(data.message);
            } else {
                setMessage(data.error || 'Something went wrong');
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
        <div className="w-full h-full">
            <div className="py-4 md:py-14 mx-auto xl:container md:gap-y-8 gap-y-4 flex max-lg:flex-col items-start justify-between">
                <div className="flex flex-col lg:w-[35%] w-full">
                    <h1 className="text-primaryText max-sm:text-2xl text-xl font-sansMedium">Update Password</h1>
                    <p>Ensure your account is using a long, random password to stay secure.</p>
                </div>
                <div className="lg:w-[60%] w-full max-md:border-t-2 max-md:border-dashed max-md:border-primaryText/20 max-md:pt-6  md:bg-background md:shadow-xl flex flex-col items-start gap-y-4">
                    <form onSubmit={handleUpdatePassword} className="w-full flex flex-col space-y-4">
                        <div className="md:px-8 flex flex-col gap-y-8">
                            <div className="w-full flex flex-col relative">
                                <label htmlFor="password" className="text-lg font-Medium text-primaryText">
                                    Current Password
                                </label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    autoComplete="password"
                                    onChange={handlePasswordChange}
                                    placeholder="Create your password"
                                    pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
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
                            <div className="w-full flex flex-col relative">
                                <label htmlFor="newPassword" className="text-lg font-Medium text-primaryText">
                                    New Password
                                </label>
                                <input
                                    type={newPasswordVisible ? 'text' : 'password'}
                                    id="newPassword"
                                    value={newPassword}
                                    autoComplete="new-password"
                                    onChange={handleNewPasswordChange}
                                    placeholder="Create your password"
                                    pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$"
                                    title="Password must contain at least 1 number, 1 lowercase letter, 1 uppercase letter, 1 special symbol, and be at least 8 characters long."
                                    required
                                    className="w-full text-lg px-4 py-2 border-2 bg-background text-primaryText border-primaryText/10 focus:outline-none focus:border-primaryText"
                                />
                                <button
                                    type="button"
                                    onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                                    className="absolute right-3 top-[2rem] text-3xl text-secondaryHeading focus:outline-none"
                                >
                                    {newPasswordVisible ? '👁️' : '🙈'}
                                </button>
                            </div>
                            <div className="w-full flex flex-col relative">
                                <label htmlFor="confirmPassword" className="text-lg font-Medium text-primaryText">
                                    Confirm New Password
                                </label>
                                <input
                                    type={confirmNewPasswordVisible ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={confirmNewPassword}
                                    autoComplete="new-password"
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirm your password"
                                    required
                                    className={`${passwordsMatch ? 'border-primaryText/10' : 'border-sell'} w-full text-lg px-4 py-2 border-2 bg-background text-primaryText focus:outline-none focus:border-primaryText`}
                                    title={!passwordsMatch ? 'Passwords do not match' : ''} // Show title if passwords do not match
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmNewPasswordVisible(!confirmNewPasswordVisible)}
                                    className="absolute right-3 top-[2rem] text-3xl text-secondaryHeading focus:outline-none"
                                >
                                    {confirmNewPasswordVisible ? '👁️' : '🙈'}
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:px-8 py-4 flex justify-end md:bg-primaryText/10">
                            <button
                                disabled={loading}
                                type="submit"
                                className="w-24 bg-primaryButtonBg text-base text-primaryButtonText py-2 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                            >
                                {loading ? 'Updating...' : 'Save'}
                            </button>
                        </div>
                        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
                    </form>
                </div>
            </div>
            <div className="md:border-t-2 md:border-dashed md:border-primaryText/20 py-4 md:py-10 mx-auto xl:container md:gap-y-8 gap-y-4 flex max-lg:flex-col items-start justify-between">
                <div className="flex flex-col lg:w-[35%] w-full">
                    <h1 className="text-primaryText max-sm:text-2xl text-xl font-sansMedium">Two Factor Authentication</h1>
                    <p>Add additional security to your account using two factor authentication.</p>
                </div>
                <div className="lg:w-[60%] w-full max-md:border-t-2 max-md:border-dashed max-md:border-primaryText/20 max-md:pt-6  md:bg-background md:shadow-xl flex flex-col items-start gap-y-4">
                    <form onSubmit={handleEnable2FA} className="md:p-8 w-full flex flex-col space-y-4">
                        
                        <p className="text-xl font-sansMedium text-primaryText"> {enable ? 'Two factor authentication is Already enabled.' : 'You have not enabled two factor authentication.'}</p>
                        <p className="text-base text-primaryText">When two factor authentication is enabled, you will be prompted for a secure, random OTP during authentication. You may retrieve this OTP from your Email.</p>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-max bg-primaryButtonBg text-base text-primaryButtonText py-2 px-8 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                        >
                            {loading ? 'Updating...' : enable ? 'Disable 2FA' : 'Enable 2FA'}
                        </button>
                        {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}