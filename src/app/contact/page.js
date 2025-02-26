'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Optional default styles
import axios from "axios";


const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;


const Marketing = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('+1');
    const [company_name, setCompany_name] = useState('');
    const [company_website, setCompany_website] = useState('');
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmitFeedBack = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post(`${STOCKVERSE_BACK_END}/advertise-feedback`, {
                username,
                email,
                phone,
                company_name,
                company_website,
                feedback,
            }, {
                withCredentials: true,
            });

            const data = response.data;
            console.log(data);
            if (response.status === 207) {
                setLoading(false);
                setUsername('');
                setEmail('');
                setPhone('');
                setCompany_name('');
                setCompany_website('');
                setFeedback('');
                setMessage(data.message);
            } else {
                setUsername('');
                setEmail('');
                setPhone('');
                setCompany_name('');
                setCompany_website('');
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
        <>
            {/* hero section */}
            <section className="w-full xl:pl-[8%] md:pl-6 pl-0 flex items-center max-md:flex-col max-md:gap-6 max-md:pt-20">
                <div className="w-full md:w-[50%] max-md:px-3">
                    <div className="flex flex-col items-start gap-y-5">
                        <p className="text-[#1B1B1B] text-xl xl:text-2xl font-sansMedium">STOCKPICKS TEMPLATE </p>
                        <h1 className="font-sansMedium xl:mb-4 2xl:text-8xl lg:text-7xl text-4xl text-[#000] xl:w-[80%] leading-[120%]">One Stop Shop
                            <span className="hero_h1"> Everything</span>
                            <span className="text-[#190DF4]"> Stocks</span>
                        </h1>
                        <p className="text-[#1b1b1b] font-sansRegular text-lg 2xl:text-2xl xl:w-[80%]">Explore a platform offering real-time stock data and AI-driven insights tailored to your trading style.</p>
                        <Link href="" className="bg-[#634FF7] font-sansMedium text-[#fff] rounded-lg px-4 py-2 text-base 2xl:text-xl">Get started for free</Link>
                    </div>
                    <div className="xl:pt-24 pt-12">
                        <p className="text-[#1b1b1b] font-sansRegular text-base 2xl:text-xl">TRUSTED BY BIG COMPANY</p>
                        <div className="flex items-center max-sm:justify-between xl:gap-12 xl:pt-8 pt-6">
                            <Image className="w-[25%]" src="/images/nietzsche.svg" alt="nietzsche" width={147} height={39} />
                            <Image className="w-[25%]" src="/images/epicurious.svg" alt="epicurious" width={152} height={39} />
                            <Image className="w-[25%]" src="/images/cloudwatch.svg" alt="cloudwatch" width={163} height={39} />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[50%] h-[45%] max-md:h-[30%] hero-bg pt-24 pl-16">
                    <Image class="rounded-tl-lg w-full" src="/images/hero-img.png" width={620} height={691} alt="hero-img" />
                </div>
            </section>

            {/* powerful way */}
            <section className="bg-contactPowerSectionBg bg-cover bg-no-repeat 2xl:py-40 lg:py-36 py-20 max-md:px-3">
                <div className="w-full xl:container mx-auto flex justify-end">
                    <div className="w-[45%] max-sm:w-full">
                        <h2 className="text-[#fff] font-sansMedium 2xl:text-6xl 2xl:leading-[140%] lg:leading-[140%] leading-[140%] lg:text-5xl text-3xl 2xl:pb-48 max-md:pb-16 pb-32">{`A powerful way to drive growth in today's competitive markets`}</h2>
                        <p className="text-[#fff] text-lg lg:text-xl 2xl:text-2xl 2xl:pb-12 pb-6 font-sansRegular">
                            {`At PressReach, we amplify the reach of your press releases by delivering sponsored native advertising content on the Internet's top tier publisher websites.`}
                        </p>
                        <Link href="/register" className="bg-[#ffffff] font-sansMedium text-[#111] rounded-lg px-4 py-2 text-base 2xl:text-xl">Get started for free</Link>
                    </div>
                </div>
            </section>

            {/* press release */}
            <section className="bg-[#090E12] 2xl:py-12 lg:py-14 py-3">
                <div className="w-full xl:px-[2%] px-3 2xl:px-6">
                    <div className="flex items-center justify-between pt-6 xl:px-16 2xl:pb-12 lg:pb-12 pb-6">
                        <Image className="w-[15%]" src="/images/polymath.svg" alt="polymath" width={178} height={48} />
                        <Image className="w-[15%]" src="/images/acme-corp.svg" alt="acme-corp" width={203} height={48} />
                        <Image className="w-[15%]" src="/images/nietzsche-2.svg" alt="nitzsche" width={183} height={48} />
                        <Image className="w-[15%]" src="/images/epicurious-2.svg" alt="epicurious" width={190} height={48} />
                        <Image className="w-[15%]" src="/images/cloud-watch-2.svg" alt="cloudwatch" width={202} height={48} />
                    </div>
                    <div className="bg-[#FFFFFF0F] flex max-md:flex-col max-md:gap-8 items-center justify-between rounded-3xl max-md:rounded-2xl 2xl:px-28 lg:px-12 px-4 2xl:py-8 lg:py-6 py-4">
                        <div className="max-md:w-full w-[40%] 2xl:w-[50%]">
                            <h3 className="font-sansMedium xl:mb-4 2xl:text-8xl lg:text-7xl text-4xl text-[#fff] xl:w-[80%] leading-[120%] 2xl:pb-48 lg:pb-32 pb-20">Your press releases are more <span className="text-[#FFFFFF66]">likely to get read</span></h3>
                            <p className="text-[#fff] text-lg lg:text-xl 2xl:text-2xl 2xl:pb-12 pb-6 font-sansRegular">Instead of hoping investors stumble upon your website and then click through to your news page, we put you in direct contact with them. Your press releases are more likely to get read so that your brand awareness soars.</p>
                            <Link href="" className="bg-[#ffffff] font-sansMedium text-[#111] rounded-lg px-4 py-2 text-base 2xl:text-xl">Get started for free</Link>
                        </div>
                        <div className="max-md:w-full w-[50%] 2xl-w-[50%]">
                            <Image className="w-full h-full" src="/images/press-release.png" alt="press release" width={653} height={714} />
                        </div>
                    </div>
                </div>
            </section>

            {/* innovative strategies */}
            <section className="w-full xl:container mx-auto max-md:py-6 py-14">
                <div className="flex max-md:flex-col-reverse max-md:gap-8 items-center justify-between rounded-3xl max-md:rounded-2xl max-sm:px-3 2xl:py-8 lg:py-6 py-4">
                    <div className="max-md:w-full w-[45%]">
                        <Image className="w-full h-full" src="/images/market-share.png" alt="market-share" width={587} height={636} />
                    </div>
                    <div className="max-md:w-full w-[52%]">
                        <h4 className="font-sansMedium xl:mb-4 2xl:text-8xl lg:text-7xl text-4xl text-[#000] leading-[120%] 2xl:pb-48 lg:pb-32 pb-20">Boost Market Share With <span className="text-[#00000066]">Innovative Strategies.</span></h4>
                        <p className="text-[#111] text-lg lg:text-xl 2xl:text-2xl 2xl:pb-12 pb-6 font-sansRegular">We offer a number of handy, easy-to-use tools that will allow you to see: how readers are engaging with your content, how the content is doing compared to others in your market, what the trending topics are on the web, and much more.</p>
                        <Link href="" className="bg-[#634FF7] duration-300 hover:bg-[#4934df] font-sansMedium text-[#fff] rounded-lg px-4 py-2 text-base 2xl:text-xl">Get started for free</Link>
                    </div>
                </div>
            </section>

            {/* interested investors */}
            <section className="w-full xl:container mx-auto max-md:py-6 py-20 px-3">
                <h4 className="font-sansMedium xl:mb-4 2xl:text-8xl lg:text-7xl text-4xl text-[#000] leading-[120%] 2xl:pb-24 lg:pb-16 pb-20 max-md:w-full w-[70%]">Right now interested investors want to <span className="text-[#00000066]">read about your company</span></h4>
                <div className="flex items-center justify-between max-md:flex-col max-md:items-start gap-y-6">
                    <Image className="w-[15%] max-md:w-[30%]" src="/images/top-4-stocks.png" alt="" width={202} height={56} />
                    <p className="text-[#111111] text-lg lg:text-xl 2xl:text-2xl 2xl:pb-12 pb-6 font-sansRegular w-[55%] max-md:w-full">The great thing about PressReach is not only do we offer exposure to one of the largest targeted investor audiences. But we also display your press releases to investors who have expressed interest in your marketplace. These are people who really want to hear what you have to say!</p>
                </div>
            </section>

            {/* contact us */}
            <section className="max-md:py-6 py-20 max-md:px-3 px-3 bg-[#fafafa]">
                <div className="w-full xl:container mx-auto flex items-center justify-between max-md:flex-col max-md:gap-y-8">
                    <div className="flex flex-col justify-between max-md:w-[100%] w-[48%]">
                        <h4 className="font-sansMedium xl:mb-4 2xl:text-8xl lg:text-7xl text-4xl text-[#000] leading-[120%] 2xl:pb-40 lg:pb-60 pb-20">{`Don't Hesitate To Contact Us`}</h4>
                        <div>
                            <p className="text-[#111] text-lg lg:text-xl 2xl:text-2xl 2xl:pb-12 pb-6 font-sansRegular">
                                {`To capitalize on PressReach's publisher network and increase your investor exposure, 
                    complete the short form below.`}
                            </p>
                            <p className="text-[#111] text-lg lg:text-xl 2xl:text-2xl font-sansRegular">This is your chance to start reaching your best audiences with content that grabs their attention and engages them. Just complete the form below to get started.</p>
                        </div>
                    </div>

                    <div className="md:w-[40%] sm:w-[70%] w-[100%] border border-[#efefef] px-2 md:px-6 py-4 rounded-xl shadow">
                        <div>
                            <form className="w-[100%] max-sm:w-[90%] mx-auto space-y-4" onSubmit={handleSubmitFeedBack}>
                                <div className="w-full flex flex-col gap-1">
                                    <label htmlFor="username" className="text-base 2xl:text-lg font-sansMedium text-secondaryHeading">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Fill your full name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-[#EFEFEF] rounded-lg focus:outline-none focus:border-secondaryHeading placeholder:text-sm"
                                    />
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
                                <div className="relative w-full flex flex-col gap-1">
                                    <label htmlFor="phone" className="text-base 2xl:text-lg font-sansMedium text-secondaryHeading">
                                        Phone Number
                                    </label>
                                    <PhoneInput
                                        className="font-sansMedium"
                                        country={'us'} // Default country code
                                        value={phone}
                                        onChange={(value) => setPhone(value)} // Updates phone state with formatted value
                                        inputProps={{
                                            id: 'phone',
                                            required: true,
                                            autoFocus: false,
                                        }}
                                        inputStyle={{
                                            width: '100%',
                                            padding: '10px 10px 10px 50px',
                                            fontSize: '16px',
                                            border: '1px solid #EFEFEF',
                                            borderRadius: '0.5rem',
                                            backgroundColor: '#FFFFFF', // Adjust this to match your `bg-mobNavLink`
                                            color: '#1A202C', // Matches `text-secondaryHeading`
                                        }}
                                        containerStyle={{
                                            width: '100%',
                                        }}
                                        dropdownStyle={{
                                            borderRadius: '0.5rem',
                                        }}
                                    />

                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col gap-1 w-[49%]">
                                        <label htmlFor="company-name" className="text-base 2xl:text-lg font-sansMedium text-secondaryHeading">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Company name"
                                            value={company_name}
                                            onChange={(e) => setCompany_name(e.target.value)}
                                            required
                                            className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-[#EFEFEF] rounded-lg focus:outline-none focus:border-secondaryHeading placeholder:text-sm"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-[49%]">
                                        <label htmlFor="company-website" className="text-base 2xl:text-lg font-sansMedium text-secondaryHeading">
                                            Company URL
                                        </label>
                                        <input
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Company Website"
                                            value={company_website}
                                            onChange={(e) => setCompany_website(e.target.value)}
                                            required
                                            className="w-full text-base px-4 py-2 border bg-mobNavLink text-secondaryHeading border-[#EFEFEF] rounded-lg focus:outline-none focus:border-secondaryHeading placeholder:text-sm"
                                        />
                                    </div>
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
                                    {loading ? 'Sending....' : 'Get started for free'}
                                </button>
                            </form>
                            {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default Marketing;