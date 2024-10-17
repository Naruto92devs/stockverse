import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileInfo({userInfo}) {

    const [fullname, setFullname] = useState(userInfo.user.fullname);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    // Function to extract initials
    const getInitials = (fullname) => {
        const nameArray = fullname.split(' ');
        const initials = nameArray.map(name => name[0]).join('');
        return initials.toUpperCase(); // Convert to uppercase
    };

    const handleUpdateName = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post('https://devsalman.tech/update-username', {
                fullname,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                setLoading(false);
                setMessage(data.message);
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
        <div className="w-full h-full">
            <div className="py-4 md:py-10 mx-auto xl:container md:gap-y-8 gap-y-4 flex max-lg:flex-col items-start justify-between">
                <div className="flex flex-col lg:w-[30%] w-full">
                    <h1 className="text-primaryText max-sm:text-2xl text-xl font-sansMedium">Profile Information</h1>
                    <p>Update your account&#39;s profile information and email address.</p>
                </div>
                <div className="lg:w-[60%] w-full max-md:border-t-2 max-md:border-dashed max-md:border-primaryText/20 max-md:pt-6  md:bg-background md:shadow-xl flex flex-col items-start gap-y-4">
                    <div className="md:px-8">
                        <div className="cursor-pointer bg-primaryText/10 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-sansRegular font-bold text-primaryText">
                            {getInitials(userInfo.user.fullname)} {/* Display the initials */}
                        </div>
                    </div>
                    <form onSubmit={handleUpdateName} className="w-full flex flex-col space-y-4">
                        <div className="md:px-8 flex flex-col gap-y-8">
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="username" className="text-md font-Medium text-primaryText">
                                    Name
                                </label>
                                <input
                                    type="name"
                                    autoComplete="name"
                                    placeholder="Enter your full name"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                    className="w-full text-lg px-4 py-2 border-2 bg-background text-primaryText border-primaryText/10 focus:outline-none focus:border-primaryText"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="email" className="text-md font-Medium text-primaryText">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    autoComplete="email"
                                    disabled
                                    value={userInfo.user.email}
                                    placeholder="Your Email"
                                    className="w-full text-lg px-4 py-2 border-2 bg-background text-primaryText border-primaryText/10 focus:outline-none focus:border-primaryText"
                                />
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
        </div>
    );
}