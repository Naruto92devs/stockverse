import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function ProfileInfo() {

    const { user, fetchUser } = useUser();
    const [fullname, setFullname] = useState(user.fullname);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleUpdateName = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/update-username`, {
                fullname,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                setLoading(false);
                setMessage(data.message);
                fetchUser();
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
        <form onSubmit={handleUpdateName} className="w-full flex flex-col space-y-4">
            <div className="flex flex-col gap-y-8">
                <div className="w-full flex flex-col gap-y-2">
                    <label htmlFor="username" className="text-md font-sansMedium text-primaryTextColor">
                        Username
                    </label>
                    <input
                        type="name"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                        className="w-full text-base px-4 py-2 border bg-primary-bg text-primaryTextColor border-primaryTextColor/10 rounded-lg focus:outline-none focus:border-primaryTextColor"
                    />
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <label htmlFor="email" className="text-md font-sansMedium text-primaryTextColor">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        disabled
                        value={user.email}
                        placeholder="Your Email"
                        className="w-full text-base px-4 py-2 border bg-primary-bg text-primaryTextColor border-primaryTextColor/10 rounded-lg focus:outline-none focus:border-primaryTextColor"
                    />
                </div>
            </div>
            <div className="w-full py-4 flex justify-end">
                <button
                    disabled={loading}
                    type="submit"
                    className="px-4 bg-primaryMain text-base text-white py-2 hover:bg-black rounded-xl transition duration-300"
                >
                    {loading ? 'Updating...' : 'Save Chnages'}
                </button>
            </div>
            {message && <p className="font-sansMedium text-black text-center">{message}</p>}
        </form>
    );
}