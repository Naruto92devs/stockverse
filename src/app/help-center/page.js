'use client';
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

const Contact = () => {

  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');




  const handleSubmitFeedBack = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post(`${STOCKVERSE_BACK_END}/feedback`, {
        firstname,
        lastname,
        email,
        feedback,
      }, {
        withCredentials: true,
      });

      const data = response.data;
      console.log(data);
      if (response.status === 207) {
        setLoading(false);
        setFirstname('');
        setLastname('');
        setEmail('');
        setFeedback('');
        setMessage(data.message);
      } else {
        setFirstname('');
        setLastname('');
        setEmail('');
        setFeedback('');
        setMessage(data.message);
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
    <section className="max-md:py-12 min-h-[100vh] pt-20 max-md:px-3 px-3 bg-contactBg bg-cover">
      <div className="w-full xl:container mx-auto flex items-center justify-between max-lg:flex-col max-lg:gap-y-16">
        <div className="flex flex-col justify-between max-lg:w-[100%] w-[48%]">
          <h1 className="font-sansMedium xl:mb-4 2xl:text-6xl md:text-5xl text-4xl text-[#000] leading-[120%] 2xl:pb-40 lg:pb-40 pb-20">How can Stockverse customer support help you today?</h1>
          <div>
            <Image src="/images/contact-logos.svg" alt="logos" width={391} height={91} />
          </div>
        </div>

        <div className="lg:w-[40%] w-[100%] bg-[#fff] border border-[#efefef] px-4 lg:px-6 py-4 rounded-xl">
          <div>
            <form className="w-[100%] mx-auto space-y-4 flex flex-col gap-y-6" onSubmit={handleSubmitFeedBack}>
              <div className="flex items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="First Name" className="text-base 2xl:text-lg font-sansMedium text-secondaryHeading">
                    First Name
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-[#EFEFEF] rounded-lg focus:outline-none focus:border-secondaryHeading placeholder:text-sm"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="Last Name" className="text-base 2xl:text-lg font-sansMedium text-secondaryHeading">
                    Last Name
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-[#EFEFEF] rounded-lg focus:outline-none focus:border-secondaryHeading placeholder:text-sm"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="email" className="text-base 2xl:text-lg font-sansMedium text-secondaryHeading">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-[#EFEFEF] rounded-lg focus:outline-none focus:border-secondaryHeading placeholder:text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-base 2xl:text-lg font-sansMedium text-primaryText">
                  Message
                </label>
                <textarea
                  id="message"
                  autoComplete="off"
                  required
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your Message"
                  className="w-full text-lg px-4 py-2 border bg-background text-primaryText border-[#EFEFEF] focus:outline-none focus:border-primaryText h-32 resize-none rounded-lg placeholder:text-sm"
                />
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-max bg-primaryMain font-sansMedium text-base 2xl:text-lg text-white py-2 rounded-lg hover:bg-primaryMain/90 transition duration-300 px-3"
              >
                {loading ? 'Sending....' : 'Send Feedback'}
              </button>
            </form>
            {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact;