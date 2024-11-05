'use client';
import React, { useState } from 'react';
import axios from 'axios';

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default function Feedback() {

  const [loading, setLoading] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedBack] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmitFeedBack = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
        const response = await axios.post(`${STOCKVERSE_BACK_END}/feedback`, {
            firstName,
            lastName,
            email,
            feedback,
        }, {
            withCredentials: true,
        });

        const data = response.data;
        console.log(data);
        if (response.status === 207) {
            setLoading(false);
            setFirstName('');
            setLastName('');
            setEmail('');
            setFeedBack('');
            setMessage(data.message);
        } else {
            setFirstName('');
            setLastName('');
            setEmail('');
            setFeedBack('');
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
        <div className="py-16 min-h-[80vh] h-max w-full bg-newsBg bg-no-repeat bg-cover bg-center max-sm:-mb-8 -mb-24">
                <div className="max-md:py-0 py-10 px-6 max-sm:px-3 mx-auto xl:container gap-y-12 flex flex-wrap justify-between items-start">
                  <div className="lg:w-[48%] w-full flex flex-col items-start gap-y-2">
                    <p className="text-base text-article font-sansMedium">Support</p>
                    <h1 className="text-secondaryHeading max-sm:text-3xl text-4xl font-sansSemibold">How can we help?</h1>
                    <p className="text-lg text-secondaryHeading font-sansRegular">If you have any questions or issues related to your service 
                    feel free to contact us and we will answer as fast as possible.</p>
                  </div>
                  <div className="lg:w-[48%] w-full relative">
                    <div className=" w-full bg-background shadow-2xl p-4 md:p-8">
                      <form onSubmit={handleSubmitFeedBack} className=" w-full flex flex-col space-y-4">
                          <div className="flex flex-col gap-y-8">
                            <div className="flex justify-between items-start">
                              <div className="w-[48%] flex flex-col gap-y-2">
                                  <label htmlFor="firstname" className="text-md font-Medium text-primaryText">
                                      First Name
                                  </label>
                                  <input
                                      type="text"
                                      id="firstname"
                                      autoComplete="given-name"
                                      placeholder="First Name"
                                      value={firstName}
                                      onChange={(e) => setFirstName(e.target.value)}
                                      required
                                      className="w-full text-lg px-4 py-2 border-2 bg-background text-primaryText border-primaryText/10 focus:outline-none focus:border-primaryText"
                                  />
                              </div>
                              <div className="w-[48%] flex flex-col gap-y-2">
                                  <label htmlFor="lastname" className="text-md font-Medium text-primaryText">
                                      Last Name
                                  </label>
                                  <input
                                      type="text"
                                      id="lastname"
                                      autoComplete="family-name"
                                      placeholder="Last Name"
                                      value={lastName}
                                      onChange={(e) => setLastName(e.target.value)}
                                      required
                                      className="w-full text-lg px-4 py-2 border-2 bg-background text-primaryText border-primaryText/10 focus:outline-none focus:border-primaryText"
                                  />
                              </div>
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="email" className="text-md font-Medium text-primaryText">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email"
                                    className="w-full text-lg px-4 py-2 border-2 bg-background text-primaryText border-primaryText/10 focus:outline-none focus:border-primaryText"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-y-2">
                                <label htmlFor="message" className="text-md font-Medium text-primaryText">
                                    Message
                                </label>
                                <textarea
                                  id="message"
                                  autoComplete="off"
                                  required
                                  value={feedback}
                                  onChange={(e) => setFeedBack(e.target.value)}
                                  placeholder="Enter your feedback or inquiry"
                                  className="w-full text-lg px-4 py-2 border-2 bg-background text-primaryText border-primaryText/10 focus:outline-none focus:border-primaryText h-32 resize-none"
                                />
                            </div>
                          </div>
                          <div className="w-full py-4 flex justify-end">
                              <button
                                  disabled={loading}
                                  type="submit"
                                  className="w-max px-4 bg-primaryButtonBg text-base text-primaryButtonText py-2 hover:bg-secondaryHeading hover:text-mobNavLink transition duration-300"
                              >
                                  {loading ? 'Sending...' : 'Send Feedback'}
                              </button>
                          </div>
                          {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
                      </form>
                    </div>
                  </div>
                </div>
            </div>
      </div>
    );
  }