'use client';
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/stockpicks_nav";
import Footer from "@/components/stockpicks_footer";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Optional default styles


const calculateNextTarget = () => {
  const now = new Date();
  let targetDate = new Date("March 1, 2025 16:00:17 GMT+05:00"); // Example: Target Date

  // If the target date is in the past, move it forward by 2 days
  if (now >= targetDate) {
    targetDate.setDate(now.getDate() + 2);
  }

  return targetDate.getTime();
};

const Homepage = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);


  const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;
  // Function to calculate the next target date (every 2 days at specific time)



  const [targetTime, setTargetTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    // Initialize countdown on client-side
    const target = calculateNextTarget();
    setTargetTime(target);
    setTimeLeft(target - Date.now());

    const interval = setInterval(() => {
      const now = Date.now();
      let remaining = target - now;

      if (remaining <= 0) {
        // If time is up, set a new target 2 days later
        const newTarget = calculateNextTarget();
        setTargetTime(newTarget);
        remaining = newTarget - now; // Reset countdown
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert milliseconds to days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What are penny stocks?",
      answer:
        "Low-priced, small-cap stocks are known as penny stocks. Contrary to their name, penny stocks rarely cost a penny. The SEC considers a penny stock to be pretty much anything under $5. And while there are sub $5 stocks trading on big exchanges like NYSE and NASDAQ, most investors don’t think of these when asked to describe a penny stock.",
    },
    {
      question: "How to buy penny stocks?",
      answer:
        "To buy penny stocks, open a brokerage account, research low-priced stocks on OTC markets or small exchanges, assess risks, and place a limit order to purchase.",
    },
    {
      question: "The potential payoff of penny stocks",
      answer:
        "The potential payoff of penny stocks can be significant, as they offer the chance for rapid gains due to low prices and volatility, but they also come with high risk, including liquidity issues and potential fraud.",
    },
  ];

  const pennyStocks = [
    { name: "FNMA", percentage: 1600, alerted: 0.071, jumped: 1.136 },
    { name: "CGRW", percentage: 506, alerted: 0.013, jumped: 0.0658 },
    { name: "THCZ", percentage: 233, alerted: 0.521, jumped: 1.214 },
    { name: "BTLLF", percentage: 201, alerted: 3.111, jumped: 6.235 },
  ];


  const handleSubscribeEmailPhone = async (e) => {
    setLoading(true);
    e.preventDefault();
    const id = "Y4nSkL";
    const baseId = "VSwpYs";

    try {
      const requestData = {
        id,
        baseId,
        email,
      };

      // Only add the phone number if it is provided
      if (phone) {
        requestData.phone = `+${phone}`;
      }

      const response = await axios.post(`${STOCKVERSE_BACK_END}/klaviyo-subscription`, requestData);

      const data = response.data;
      console.log(data);
      if (response.status === 200) {
        setMessage(data.message);
        setLoading(false);
        setDone(true);
      } else {
        setMessage(data.message || 'Something went wrong');
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // setMessage(error.response.data.message || 'Something went wrong');
        setMessage('An error occurred. Please try again.');
        setLoading(false);
      } else {
        setMessage('An error occurred. Please try again.');
        setLoading(false);
      }
      console.error('Error during subscribing:', error);
    }
  };

  return (
    <div className="cvkd-bg">
      <Navbar />
      {/* hero section */}
      <section className="w-full xl:container mx-auto xl:py-20 md:py-12 relative max-xl:px-4 max-md:py-8">
        <div className="relative flex max-md:flex-col items-center gap-y-6">
          <div className="w-[55%] max-md:w-full flex flex-col gap-y-6">
            <h1 className="xl:text-6xl  text-5xl font-grotesqueExtrabold text-[#2C2C2C] xl:leading-[140%]">
              Do you have what it takes to <br />
              <span className="text-bg xl:text-7xl md:text-6xl max-md:text-[3.3rem]">
                Beat the Street?
              </span>
            </h1>
            <p className="text-[#2C2C2C] font-poppinsRegular text-xl leading-[170%] max-md:text-lg pr-24 max-md:pr-0">
              Get a front row seat to the Next SCORCHING Penny Stock
              and see Explosive Gains that OUTPERFORM the Street!
            </p>
            <p className="font-poppinsMedium text-[#2C2C2C] text-[1.35rem] max-md:text-xl">
              Spots are Limited! Sign Up 100% FREE Below
            </p>
          </div>
          <div className="w-[58%] max-md:w-full absolute max-md:hidden right-0 top-[-2rem]">
            <div className="w-[45%] max-md:w-[100%] z-[0] absolute -bottom-[18%] -right-[0%] max-md:static">
              {/* <svg viewBox="0 0 450 770" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M449.25 0.75H0.75V545C0.75 668.85 101.15 769.25 225 769.25C348.85 769.25 449.25 668.85 449.25 545V0.75Z" fill="url(#paint0_linear_4_1261)" stroke="url(#paint1_linear_4_1261)" strokeWidth="1.5" />
                <g clipPath="url(#clip0_4_1261)" className="rotate">
                  <path d="M239.11 460.24L235.72 469.65L233.94 469.55L232.35 462.19L229.8 469.31L228.04 469.22L225.88 459.47L227.55 459.57L229.08 467.48L231.68 459.81L233.44 459.91L234.99 467.78L237.44 460.14L239.12 460.24H239.11Z" fill="#2C2C2C" />
                  <path d="M247.64 469.41L243.69 468.71L242.67 470.52L241.05 470.23L246.1 461.37L247.89 461.69L249.6 471.75L247.97 471.46L247.63 469.41H247.64ZM247.43 468.07L246.67 463.41L244.35 467.53L247.43 468.07Z" fill="#2C2C2C" />
                  <path d="M261.36 464.93L261.02 466.17L258.56 465.5L256.37 473.51L254.85 473.09L257.04 465.08L254.56 464.4L254.9 463.16L261.36 464.93Z" fill="#2C2C2C" />
                  <path d="M264.85 468.39C265.52 467.85 266.29 467.52 267.14 467.39C267.99 467.26 268.83 467.36 269.67 467.68C270.62 468.04 271.38 468.6 271.95 469.35C272.51 470.1 272.8 470.97 272.81 471.96L271.04 471.29C270.99 470.73 270.8 470.25 270.48 469.86C270.16 469.47 269.72 469.17 269.18 468.97C268.59 468.74 268.01 468.68 267.44 468.76C266.87 468.85 266.37 469.09 265.91 469.49C265.46 469.89 265.11 470.42 264.85 471.08C264.6 471.74 264.51 472.37 264.58 472.97C264.65 473.57 264.87 474.09 265.23 474.54C265.59 474.99 266.07 475.32 266.66 475.55C267.2 475.76 267.72 475.82 268.22 475.75C268.72 475.67 269.18 475.45 269.59 475.06L271.36 475.73C270.7 476.46 269.9 476.92 268.98 477.1C268.06 477.28 267.12 477.19 266.17 476.83C265.33 476.51 264.63 476.02 264.09 475.36C263.54 474.7 263.2 473.95 263.05 473.1C262.91 472.25 263 471.38 263.34 470.51C263.68 469.64 264.18 468.92 264.85 468.38V468.39Z" fill="#2C2C2C" />
                  <path d="M284.87 474.77L280.53 483.32L279.13 482.61L281.03 478.87L277.01 476.83L275.11 480.57L273.71 479.86L278.05 471.31L279.45 472.02L277.59 475.69L281.61 477.73L283.47 474.06L284.87 474.77Z" fill="#2C2C2C" />
                  <path d="M299.18 483.92L298.44 484.97L296.35 483.51L291.59 490.32L290.3 489.42L295.06 482.61L292.96 481.14L293.69 480.09L299.18 483.92Z" fill="#2C2C2C" />
                  <path d="M308.48 491.5L302.29 498.83L301.09 497.81L303.8 494.6L300.35 491.69L297.64 494.9L296.44 493.88L302.63 486.55L303.83 487.57L301.18 490.71L304.63 493.62L307.28 490.48L308.48 491.5Z" fill="#2C2C2C" />
                  <path d="M312.17 496.81L310.17 498.79L312.5 501.15L311.59 502.05L309.26 499.7L307.17 501.77L309.79 504.42L308.88 505.32L305.15 501.55L311.98 494.8L315.71 498.57L314.8 499.47L312.18 496.82L312.17 496.81Z" fill="#2C2C2C" />
                  <path d="M327.65 513.18L317.82 516.05L316.73 514.59L322.24 505.94L323.25 507.29L318.57 514.35L326.67 511.85L327.66 513.17L327.65 513.18Z" fill="#2C2C2C" />
                  <path d="M330.61 517.79L322.53 522.96L321.68 521.64L329.76 516.47L330.61 517.79Z" fill="#2C2C2C" />
                  <path d="M335.33 527.17C335.35 528.03 335.14 528.82 334.69 529.54C334.24 530.26 333.59 530.85 332.73 531.31C331.87 531.77 331.03 531.99 330.2 531.96C329.37 531.93 328.6 531.67 327.9 531.18C327.2 530.68 326.61 529.99 326.12 529.09L324.63 526.33L333.07 521.78L334.56 524.54C335.04 525.44 335.3 526.32 335.32 527.18L335.33 527.17ZM329.29 530.32C330.11 530.56 331 530.41 331.97 529.89C332.95 529.36 333.57 528.69 333.84 527.86C334.11 527.04 333.97 526.13 333.44 525.14L332.7 523.77L326.52 527.1L327.26 528.47C327.79 529.46 328.47 530.07 329.29 530.31V530.32Z" fill="#2C2C2C" />
                  <path d="M338.23 534.85L335.64 535.96L336.94 539.01L335.76 539.51L334.46 536.47L331.76 537.63L333.22 541.06L332.04 541.56L329.96 536.69L338.79 532.91L340.87 537.78L339.69 538.28L338.23 534.85Z" fill="#2C2C2C" />
                  <path d="M334.53 546.73C334.7 545.89 335.08 545.15 335.66 544.5C336.24 543.86 336.98 543.39 337.87 543.11C338.76 542.82 339.63 542.78 340.48 542.97C341.33 543.16 342.06 543.55 342.68 544.14C343.3 544.73 343.76 545.45 344.03 546.3C344.3 547.16 344.36 548.01 344.18 548.85C344.01 549.69 343.64 550.43 343.06 551.07C342.48 551.71 341.75 552.17 340.85 552.46C339.96 552.75 339.09 552.8 338.24 552.61C337.39 552.43 336.66 552.04 336.03 551.45C335.4 550.86 334.95 550.14 334.68 549.28C334.41 548.43 334.36 547.58 334.53 546.74V546.73ZM336.91 550.33C337.34 550.72 337.85 550.96 338.45 551.06C339.05 551.16 339.68 551.11 340.36 550.89C341.03 550.67 341.58 550.35 342.01 549.92C342.44 549.49 342.71 549 342.83 548.44C342.95 547.88 342.91 547.3 342.72 546.69C342.53 546.09 342.22 545.59 341.8 545.2C341.38 544.81 340.87 544.57 340.27 544.46C339.68 544.36 339.04 544.41 338.37 544.63C337.7 544.84 337.14 545.17 336.72 545.6C336.29 546.03 336.02 546.53 335.89 547.09C335.76 547.65 335.8 548.23 335.99 548.84C336.18 549.44 336.49 549.94 336.92 550.32L336.91 550.33Z" fill="#2C2C2C" />
                  <path d="M337.79 570.3L337.59 568.74L350.1 567.12L350.3 568.68L337.79 570.3Z" fill="#2C2C2C" />
                  <path d="M349.15 598.52L339.75 595.1L339.86 593.32L347.23 591.75L340.11 589.17L340.2 587.41L349.95 585.28L349.85 586.95L341.93 588.46L349.6 591.08L349.49 592.84L341.61 594.37L349.24 596.84L349.14 598.52H349.15Z" fill="#2C2C2C" />
                  <path d="M339.94 607.05L340.65 603.1L338.84 602.07L339.13 600.45L347.97 605.53L347.65 607.32L337.59 609L337.88 607.37L339.93 607.04L339.94 607.05ZM341.29 606.84L345.95 606.09L341.84 603.75L341.29 606.83V606.84Z" fill="#2C2C2C" />
                  <path d="M344.38 620.77L343.14 620.43L343.82 617.97L335.81 615.75L336.23 614.23L344.24 616.45L344.92 613.98L346.16 614.32L344.37 620.77H344.38Z" fill="#2C2C2C" />
                  <path d="M340.91 624.25C341.45 624.93 341.78 625.69 341.9 626.54C342.02 627.39 341.92 628.23 341.6 629.06C341.23 630.01 340.67 630.77 339.92 631.33C339.17 631.89 338.3 632.18 337.31 632.18L337.99 630.42C338.55 630.37 339.03 630.18 339.42 629.86C339.81 629.54 340.11 629.11 340.32 628.56C340.55 627.97 340.62 627.39 340.53 626.82C340.44 626.25 340.2 625.74 339.8 625.29C339.4 624.84 338.87 624.48 338.21 624.23C337.55 623.98 336.92 623.88 336.32 623.95C335.72 624.02 335.2 624.24 334.75 624.59C334.3 624.95 333.96 625.43 333.73 626.02C333.52 626.56 333.45 627.08 333.53 627.58C333.61 628.08 333.83 628.54 334.21 628.95L333.53 630.71C332.8 630.04 332.35 629.25 332.17 628.33C331.99 627.41 332.09 626.47 332.45 625.52C332.77 624.68 333.26 623.98 333.92 623.44C334.58 622.89 335.33 622.55 336.19 622.41C337.04 622.27 337.91 622.37 338.78 622.7C339.66 623.04 340.36 623.54 340.9 624.22L340.91 624.25Z" fill="#2C2C2C" />
                  <path d="M334.47 644.24L325.93 639.88L326.64 638.48L330.38 640.39L332.43 636.37L328.69 634.46L329.41 633.06L337.95 637.42L337.24 638.82L333.58 636.95L331.53 640.97L335.19 642.84L334.47 644.24Z" fill="#2C2C2C" />
                  <path d="M325.27 658.52L324.22 657.78L325.69 655.69L318.89 650.91L319.79 649.62L326.59 654.4L328.07 652.3L329.12 653.04L325.27 658.52Z" fill="#2C2C2C" />
                  <path d="M317.68 667.8L310.37 661.59L311.39 660.39L314.59 663.11L317.51 659.67L314.31 656.95L315.33 655.75L322.64 661.96L321.62 663.16L318.49 660.5L315.57 663.94L318.7 666.6L317.68 667.8Z" fill="#2C2C2C" />
                  <path d="M312.39 671.45L310.42 669.44L308.06 671.76L307.16 670.84L309.52 668.52L307.46 666.42L304.8 669.03L303.9 668.11L307.68 664.39L314.42 671.24L310.64 674.96L309.74 674.04L312.4 671.43L312.39 671.45Z" fill="#2C2C2C" />
                  <path d="M295.93 686.9L293.09 677.06L294.55 675.97L303.18 681.5L301.83 682.51L294.79 677.81L297.26 685.91L295.93 686.9Z" fill="#2C2C2C" />
                  <path d="M291.33 689.84L286.18 681.75L287.51 680.91L292.66 689L291.33 689.84Z" fill="#2C2C2C" />
                  <path d="M281.94 694.54C281.08 694.56 280.29 694.34 279.58 693.9C278.87 693.45 278.28 692.8 277.82 691.94C277.36 691.08 277.15 690.23 277.18 689.4C277.21 688.57 277.47 687.81 277.97 687.11C278.47 686.41 279.17 685.82 280.07 685.34L282.83 683.86L287.36 692.32L284.6 693.8C283.7 694.28 282.82 694.53 281.96 694.55L281.94 694.54ZM278.81 688.48C278.57 689.3 278.71 690.19 279.23 691.17C279.76 692.15 280.43 692.78 281.25 693.05C282.07 693.32 282.98 693.19 283.97 692.66L285.34 691.92L282.02 685.73L280.65 686.47C279.66 687 279.05 687.67 278.81 688.49V688.48Z" fill="#2C2C2C" />
                  <path d="M274.25 697.41L273.15 694.82L270.1 696.11L269.6 694.93L272.65 693.64L271.5 690.93L268.07 692.39L267.57 691.21L272.45 689.14L276.2 697.98L271.32 700.05L270.82 698.87L274.25 697.41Z" fill="#2C2C2C" />
                  <path d="M262.4 693.67C263.24 693.84 263.98 694.22 264.63 694.8C265.27 695.38 265.74 696.12 266.02 697.02C266.3 697.92 266.35 698.78 266.16 699.63C265.97 700.47 265.58 701.21 264.99 701.83C264.4 702.45 263.68 702.9 262.83 703.17C261.97 703.44 261.12 703.49 260.28 703.32C259.44 703.15 258.7 702.77 258.06 702.19C257.42 701.61 256.96 700.87 256.68 699.98C256.4 699.09 256.35 698.22 256.53 697.37C256.72 696.52 257.1 695.79 257.69 695.16C258.28 694.53 259 694.09 259.86 693.81C260.71 693.54 261.56 693.49 262.4 693.67ZM258.79 696.04C258.4 696.47 258.16 696.98 258.05 697.58C257.94 698.18 258 698.81 258.21 699.49C258.42 700.17 258.74 700.72 259.17 701.14C259.6 701.56 260.09 701.84 260.65 701.96C261.21 702.08 261.79 702.05 262.4 701.86C263.01 701.67 263.5 701.36 263.89 700.94C264.28 700.52 264.52 700.01 264.63 699.42C264.74 698.83 264.68 698.19 264.47 697.52C264.26 696.85 263.93 696.29 263.5 695.86C263.07 695.43 262.58 695.15 262.01 695.03C261.45 694.9 260.87 694.94 260.26 695.13C259.65 695.32 259.16 695.63 258.77 696.06L258.79 696.04Z" fill="#2C2C2C" />
                  <path d="M238.82 696.87L240.38 696.67L241.97 709.18L240.41 709.38L238.82 696.87Z" fill="#2C2C2C" />
                  <path d="M210.53 708.15L213.98 698.76L215.76 698.87L217.31 706.24L219.91 699.13L221.67 699.23L223.77 708.99L222.1 708.88L220.61 700.96L217.96 708.62L216.2 708.51L214.7 700.63L212.21 708.26L210.53 708.15Z" fill="#2C2C2C" />
                  <path d="M202.06 698.92L206.01 699.64L207.04 697.84L208.66 698.14L203.55 706.97L201.76 706.64L200.11 696.57L201.74 696.87L202.07 698.92H202.06ZM202.27 700.27L203 704.94L205.35 700.84L202.27 700.28V700.27Z" fill="#2C2C2C" />
                  <path d="M188.31 703.32L188.66 702.08L191.12 702.77L193.36 694.77L194.87 695.19L192.63 703.19L195.1 703.88L194.75 705.12L188.3 703.32H188.31Z" fill="#2C2C2C" />
                  <path d="M184.85 699.84C184.17 700.38 183.41 700.7 182.56 700.82C181.71 700.94 180.87 700.84 180.04 700.52C179.09 700.15 178.33 699.59 177.77 698.83C177.21 698.08 176.93 697.2 176.93 696.22L178.69 696.9C178.74 697.46 178.92 697.94 179.25 698.33C179.57 698.72 180 699.02 180.54 699.23C181.13 699.46 181.71 699.53 182.28 699.44C182.85 699.35 183.36 699.11 183.81 698.72C184.26 698.32 184.62 697.8 184.88 697.14C185.14 696.48 185.23 695.85 185.16 695.25C185.09 694.65 184.88 694.13 184.52 693.68C184.16 693.23 183.69 692.89 183.09 692.66C182.55 692.45 182.03 692.38 181.53 692.45C181.03 692.52 180.57 692.75 180.16 693.13L178.4 692.45C179.07 691.72 179.86 691.27 180.78 691.1C181.7 690.92 182.64 691.02 183.59 691.39C184.43 691.72 185.12 692.21 185.67 692.87C186.21 693.53 186.55 694.29 186.69 695.14C186.83 695.99 186.73 696.86 186.39 697.73C186.05 698.61 185.54 699.31 184.87 699.85L184.85 699.84Z" fill="#2C2C2C" />
                  <path d="M164.89 693.35L169.27 684.82L170.67 685.54L168.75 689.27L172.76 691.33L174.68 687.6L176.08 688.32L171.7 696.85L170.3 696.13L172.18 692.47L168.17 690.41L166.29 694.07L164.89 693.35Z" fill="#2C2C2C" />
                  <path d="M150.6 684.09L151.34 683.04L153.42 684.51L158.22 677.73L159.5 678.64L154.7 685.42L156.8 686.9L156.06 687.95L150.6 684.09Z" fill="#2C2C2C" />
                  <path d="M141.36 676.48L147.59 669.19L148.79 670.21L146.06 673.4L149.49 676.33L152.22 673.14L153.42 674.16L147.19 681.45L145.99 680.43L148.66 677.3L145.23 674.37L142.56 677.5L141.36 676.48Z" fill="#2C2C2C" />
                  <path d="M137.72 671.17L139.73 669.2L137.41 666.83L138.33 665.93L140.65 668.3L142.75 666.24L140.15 663.58L141.07 662.68L144.78 666.47L137.91 673.19L134.2 669.4L135.12 668.5L137.72 671.16V671.17Z" fill="#2C2C2C" />
                  <path d="M122.33 654.71L132.18 651.89L133.26 653.35L127.71 661.97L126.71 660.62L131.43 653.59L123.32 656.04L122.33 654.71Z" fill="#2C2C2C" />
                  <path d="M119.38 650.06L127.49 644.94L128.33 646.27L120.22 651.39L119.38 650.06Z" fill="#2C2C2C" />
                  <path d="M114.73 640.67C114.72 639.81 114.93 639.02 115.38 638.31C115.83 637.6 116.48 637.01 117.34 636.55C118.2 636.09 119.05 635.88 119.88 635.91C120.71 635.94 121.47 636.21 122.17 636.71C122.87 637.21 123.46 637.91 123.94 638.81L125.41 641.58L116.94 646.08L115.47 643.31C114.99 642.41 114.74 641.53 114.73 640.67ZM120.79 637.56C119.97 637.32 119.08 637.45 118.1 637.97C117.12 638.49 116.49 639.17 116.22 639.99C115.95 640.81 116.08 641.72 116.6 642.71L117.33 644.09L123.53 640.79L122.8 639.41C122.27 638.42 121.6 637.8 120.78 637.56H120.79Z" fill="#2C2C2C" />
                  <path d="M111.86 632.95L114.45 631.86L113.17 628.81L114.35 628.31L115.64 631.36L118.35 630.22L116.9 626.79L118.08 626.29L120.13 631.17L111.28 634.89L109.23 630.01L110.41 629.51L111.86 632.94V632.95Z" fill="#2C2C2C" />
                  <path d="M115.64 621.11C115.46 621.95 115.08 622.69 114.5 623.33C113.92 623.97 113.17 624.43 112.28 624.71C111.39 624.99 110.52 625.03 109.67 624.84C108.83 624.65 108.1 624.25 107.47 623.66C106.85 623.07 106.4 622.35 106.14 621.5C105.87 620.64 105.82 619.79 106 618.95C106.18 618.11 106.55 617.37 107.14 616.74C107.72 616.11 108.46 615.65 109.36 615.37C110.26 615.09 111.13 615.04 111.97 615.23C112.82 615.42 113.55 615.81 114.17 616.4C114.79 616.99 115.24 617.72 115.51 618.58C115.78 619.43 115.82 620.28 115.65 621.12L115.64 621.11ZM113.28 617.49C112.86 617.1 112.34 616.86 111.75 616.75C111.16 616.64 110.52 616.7 109.84 616.91C109.16 617.12 108.61 617.44 108.19 617.87C107.76 618.3 107.49 618.79 107.37 619.35C107.25 619.91 107.28 620.49 107.47 621.1C107.66 621.71 107.97 622.2 108.39 622.59C108.81 622.98 109.32 623.23 109.91 623.34C110.5 623.45 111.14 623.4 111.81 623.19C112.49 622.98 113.04 622.66 113.47 622.23C113.9 621.8 114.18 621.31 114.31 620.75C114.44 620.19 114.41 619.61 114.22 619C114.03 618.39 113.72 617.9 113.3 617.51L113.28 617.49Z" fill="#2C2C2C" />
                  <path d="M112.52 597.53L112.71 599.09L100.19 600.64L100 599.08L112.52 597.53Z" fill="#2C2C2C" />
                  <path d="M101.32 569.23L110.7 572.7L110.58 574.48L103.2 576.01L110.3 578.63L110.2 580.39L100.44 582.47L100.55 580.8L108.48 579.34L100.83 576.67L100.95 574.91L108.84 573.43L101.22 570.92L101.33 569.24L101.32 569.23Z" fill="#2C2C2C" />
                  <path d="M110.57 560.77L109.84 564.72L111.64 565.76L111.34 567.38L102.52 562.25L102.85 560.46L112.92 558.84L112.62 560.47L110.57 560.79V560.77ZM109.23 560.97L104.56 561.69L108.65 564.05L109.22 560.97H109.23Z" fill="#2C2C2C" />
                  <path d="M106.21 547.01L107.44 547.36L106.74 549.82L114.73 552.08L114.3 553.59L106.31 551.33L105.61 553.8L104.38 553.45L106.2 547.01H106.21Z" fill="#2C2C2C" />
                  <path d="M109.7 543.56C109.16 542.88 108.84 542.12 108.72 541.27C108.6 540.42 108.71 539.58 109.03 538.75C109.4 537.8 109.97 537.04 110.72 536.49C111.48 535.93 112.35 535.65 113.34 535.65L112.65 537.41C112.09 537.46 111.61 537.64 111.22 537.96C110.83 538.28 110.53 538.71 110.32 539.25C110.09 539.84 110.02 540.42 110.1 540.99C110.18 541.56 110.42 542.07 110.82 542.52C111.22 542.98 111.74 543.33 112.4 543.59C113.06 543.85 113.69 543.94 114.29 543.88C114.89 543.81 115.41 543.6 115.86 543.24C116.31 542.88 116.65 542.41 116.88 541.82C117.09 541.28 117.16 540.76 117.09 540.26C117.02 539.76 116.79 539.3 116.41 538.88L117.1 537.12C117.83 537.79 118.27 538.58 118.45 539.51C118.63 540.44 118.52 541.37 118.15 542.32C117.82 543.16 117.33 543.85 116.67 544.39C116.01 544.93 115.25 545.27 114.4 545.4C113.55 545.54 112.68 545.43 111.81 545.09C110.94 544.75 110.23 544.24 109.7 543.56Z" fill="#2C2C2C" />
                  <path d="M116.26 523.6L124.78 528.01L124.06 529.41L120.33 527.48L118.25 531.49L121.97 533.42L121.25 534.82L112.73 530.41L113.45 529.01L117.1 530.9L119.18 526.89L115.53 525L116.25 523.6H116.26Z" fill="#2C2C2C" />
                  <path d="M125.54 509.36L126.59 510.1L125.11 512.18L131.88 517L130.97 518.28L124.2 513.46L122.71 515.55L121.66 514.81L125.54 509.36Z" fill="#2C2C2C" />
                  <path d="M133.18 500.15L140.45 506.4L139.42 507.59L136.24 504.85L133.3 508.27L136.48 511.01L135.45 512.2L128.18 505.95L129.21 504.76L132.33 507.44L135.27 504.02L132.15 501.34L133.18 500.15Z" fill="#2C2C2C" />
                  <path d="M138.52 496.5L140.48 498.52L142.86 496.21L143.75 497.13L141.37 499.44L143.42 501.55L146.09 498.95L146.98 499.87L143.18 503.56L136.48 496.67L140.28 492.98L141.17 493.9L138.5 496.5H138.52Z" fill="#2C2C2C" />
                  <path d="M155.03 481.17L157.82 491.03L156.35 492.11L147.75 486.53L149.11 485.53L156.13 490.27L153.7 482.15L155.03 481.17Z" fill="#2C2C2C" />
                  <path d="M159.69 478.23L164.79 486.35L163.46 487.19L158.36 479.07L159.69 478.23Z" fill="#2C2C2C" />
                  <path d="M169.09 473.6C169.95 473.59 170.74 473.81 171.45 474.26C172.16 474.71 172.75 475.37 173.2 476.23C173.65 477.09 173.87 477.94 173.83 478.77C173.79 479.6 173.53 480.36 173.03 481.06C172.53 481.76 171.83 482.34 170.92 482.82L168.15 484.28L163.67 475.8L166.44 474.34C167.34 473.86 168.23 473.62 169.09 473.6ZM172.18 479.67C172.43 478.85 172.29 477.96 171.77 476.98C171.25 476 170.58 475.37 169.76 475.09C168.94 474.82 168.03 474.94 167.04 475.47L165.66 476.2L168.94 482.41L170.32 481.68C171.31 481.16 171.93 480.49 172.18 479.67Z" fill="#2C2C2C" />
                  <path d="M176.8 470.77L177.88 473.37L180.94 472.09L181.43 473.27L178.37 474.55L179.5 477.26L182.94 475.82L183.43 477L178.54 479.04L174.84 470.18L179.73 468.14L180.22 469.32L176.78 470.76L176.8 470.77Z" fill="#2C2C2C" />
                  <path d="M188.63 474.58C187.79 474.4 187.05 474.02 186.41 473.43C185.77 472.84 185.31 472.1 185.03 471.2C184.75 470.3 184.71 469.44 184.91 468.59C185.11 467.75 185.5 467.02 186.09 466.4C186.68 465.78 187.4 465.34 188.26 465.07C189.12 464.8 189.97 464.76 190.81 464.94C191.65 465.12 192.39 465.5 193.02 466.08C193.65 466.66 194.11 467.4 194.39 468.3C194.67 469.2 194.71 470.07 194.52 470.91C194.33 471.75 193.94 472.49 193.34 473.11C192.75 473.73 192.02 474.18 191.16 474.44C190.31 474.7 189.46 474.75 188.62 474.57L188.63 474.58ZM192.26 472.23C192.65 471.81 192.9 471.3 193.01 470.7C193.12 470.1 193.07 469.47 192.86 468.79C192.65 468.11 192.33 467.56 191.91 467.13C191.49 466.7 190.99 466.43 190.43 466.3C189.87 466.18 189.29 466.21 188.68 466.39C188.07 466.58 187.58 466.88 187.18 467.3C186.78 467.72 186.54 468.23 186.43 468.82C186.32 469.41 186.37 470.05 186.58 470.72C186.79 471.4 187.11 471.95 187.53 472.38C187.96 472.81 188.45 473.09 189.01 473.22C189.57 473.35 190.15 473.32 190.76 473.13C191.37 472.94 191.86 472.64 192.25 472.21L192.26 472.23Z" fill="#2C2C2C" />
                  <path d="M212.23 471.52L210.67 471.71L209.16 459.19L210.72 459L212.23 471.52Z" fill="#2C2C2C" />
                </g>
                <g clipPath="url(#paint2_angular_4_1261_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0 0.09 -0.09 0 225 584)"><foreignObject x="-1011.11" y="-1011.11" width="2022.22" height="2022.22"><div xmlns="http://www.w3.org/1999/xhtml" style={{ background: "conic-gradient(from 90deg,rgba(34, 34, 34, 1) 0deg,rgba(22, 22, 22, 1) 18.9599deg,rgba(72, 72, 72, 1) 63.0662deg,rgba(72, 72, 72, 1) 121.643deg,rgba(22, 22, 22, 1) 195deg,rgba(72, 72, 72, 1) 257.241deg,rgba(72, 72, 72, 1) 300.57deg,rgba(34, 34, 34, 1) 360deg)", height: "100%", width: "100%", opacity: "1" }}></div></foreignObject></g></g><circle cx="225" cy="584" r="90" data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.086274512112140656,&#34;g&#34;:0.086274512112140656,&#34;b&#34;:0.086274512112140656,&#34;a&#34;:1.0},&#34;position&#34;:0.052666336297988892},{&#34;color&#34;:{&#34;r&#34;:0.28235295414924622,&#34;g&#34;:0.28235295414924622,&#34;b&#34;:0.28235295414924622,&#34;a&#34;:1.0},&#34;position&#34;:0.17518389225006104},{&#34;color&#34;:{&#34;r&#34;:0.28235295414924622,&#34;g&#34;:0.28235295414924622,&#34;b&#34;:0.28235295414924622,&#34;a&#34;:1.0},&#34;position&#34;:0.33789813518524170},{&#34;color&#34;:{&#34;r&#34;:0.086274512112140656,&#34;g&#34;:0.086274512112140656,&#34;b&#34;:0.086274512112140656,&#34;a&#34;:1.0},&#34;position&#34;:0.54166668653488159},{&#34;color&#34;:{&#34;r&#34;:0.28235295414924622,&#34;g&#34;:0.28235295414924622,&#34;b&#34;:0.28235295414924622,&#34;a&#34;:1.0},&#34;position&#34;:0.71455931663513184},{&#34;color&#34;:{&#34;r&#34;:0.28235295414924622,&#34;g&#34;:0.28235295414924622,&#34;b&#34;:0.28235295414924622,&#34;a&#34;:1.0},&#34;position&#34;:0.83491641283035278}],&#34;stopsVar&#34;:[],&#34;transform&#34;:{&#34;m00&#34;:1.1021821408568715e-14,&#34;m01&#34;:-180.0,&#34;m02&#34;:315.0,&#34;m10&#34;:180.0,&#34;m11&#34;:1.1021821408568715e-14,&#34;m12&#34;:494.0},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}" />
                <circle cx="225" cy="584" r="99.5" stroke="url(#paint3_linear_4_1261)" />
                <path d="M240.648 582.933L218.152 569.185C217.962 569.069 217.745 569.006 217.523 569.002C217.301 568.998 217.082 569.053 216.889 569.161C216.695 569.27 216.534 569.428 216.421 569.62C216.309 569.812 216.25 570.03 216.25 570.252V597.748C216.25 597.97 216.309 598.188 216.421 598.38C216.534 598.572 216.695 598.73 216.889 598.838C217.082 598.947 217.301 599.002 217.523 598.998C217.745 598.994 217.962 598.931 218.152 598.815L240.648 585.067C240.831 584.955 240.982 584.798 241.087 584.611C241.191 584.425 241.246 584.214 241.246 584C241.246 583.786 241.191 583.575 241.087 583.388C240.982 583.202 240.831 583.045 240.648 582.933Z" fill="white" />
                <defs>
                  <clipPath id="paint2_angular_4_1261_clip_path"><circle cx="225" cy="584" r="90" /></clipPath><linearGradient id="paint0_linear_4_1261" x1="407.667" y1="882.613" x2="135.225" y2="526.689" gradientUnits="userSpaceOnUse">
                    <stop offset="0.2" stopColor="white" />
                    <stop offset="0.731987" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_4_1261" x1="-5.49998" y1="143.894" x2="365.127" y2="721.002" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="1" stopColor="white" />
                  </linearGradient>
                  <linearGradient id="paint3_linear_4_1261" x1="291.8" y1="484" x2="172.6" y2="671.2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="#C5D6F1" />
                  </linearGradient>
                  <clipPath id="clip0_4_1261">
                    <rect width="250.29" height="250.38" fill="white" transform="translate(100 459)" />
                  </clipPath>
                </defs>
              </svg> */}
            </div>
            <Image className="width-anime max-md:hidden" src="/images/hero-graph.png" alt="" width={942} height={528} />
          </div>
        </div>
      </section>
      {/* email subscription */}
      <section className="w-full xl:container mx-auto py-12 relative z-2">
        <div className="w-full max-xl:w-[95%] mx-auto flex flex-col items-center justify-center w-full p-6 bg-[#FFF] rounded-xl placeholder:text-base placeholder:text-lg text-[#A5A4A1] shadow-[0px_10px_50px_5px_#0000000D]">
          {!done && (
            <form onSubmit={handleSubscribeEmailPhone} className="w-full flex flex-col md:flex-row gap-4 w-full">
              <div className="xl:w-[35%] w-full">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-4 border-[1.5px] border-[#A5A4A1] rounded-xl placeholder:text-base text-[#A5A4A1] focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div className="xl:w-[35%] w-full">
                <PhoneInput
                  country={"us"}
                  value={phone}
                  dropdownClass="custom-flag"
                  autoComplete="phone"
                  onChange={(value) => setPhone(value)}
                  inputProps={{
                    id: "phone",
                    required: true,
                    autoFocus: false,
                  }}
                  inputStyle={{
                    width: "100%",
                    padding: "27px 10px 27px 50px",
                    fontSize: "16px",
                    border: "1.5px solid #A5A4A1",
                    borderRadius: "0.75rem",
                    color: "#1A202C",
                  }}
                  containerStyle={{
                    width: "100%",
                    borderRadius: "12px",
                  }}
                  dropdownStyle={{
                    borderRadius: "0.75rem !important",
                  }}
                />
              </div>

              <div className="xl:w-[27%] w-full">
                <button className="w-full px-6 py-4 bg-[#2C2C2C] text-white font-grotesqueSemibold text-xl lg:text-2xl gap-2 rounded-xl flex items-center justify-center transition hover:bg-black lg:leading-[100%]" type="submit">
                  Subscribe
                  <span>
                    <svg width="42" height="16" viewBox="0 0 42 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM41.7071 8.70711C42.0976 8.31658 42.0976 7.68342 41.7071 7.29289L35.3431 0.928932C34.9526 0.538408 34.3195 0.538408 33.9289 0.928932C33.5384 1.31946 33.5384 1.95262 33.9289 2.34315L39.5858 8L33.9289 13.6569C33.5384 14.0474 33.5384 14.6805 33.9289 15.0711C34.3195 15.4616 34.9526 15.4616 35.3431 15.0711L41.7071 8.70711ZM1 9H41V7H1V9Z" fill="white" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          )}
          {done && (
            <div className="bg-[#fff] p-2 px-4 rounded-lg text-base font-sansMedium">
              {message}
            </div>
          )}
          <p className="text-base max-md:text-sm text-[#2C2C2C] font-poppinsRegular mt-5">
            We will never share your information, and you can unsubscribe at any
            time. View our privacy policy {" "}
            <a href="/policy" className="underline">
              here
            </a>
          </p>
        </div>
      </section>
      <section className="w-full xl:container mx-auto border-b border-b-[#000] xl:py-16 py-8 max-lg:px-4">
        <h2 className="text-[#2C2C2C] xl:text-5xl text-center text-4xl font-grotesqueExtrabold">Our next explosive stock alert is coming in</h2>
        <div className="flex flex-wrap max-md:gap-8 items-center justify-center gap-y-8 mt-12">
          <div className="flex flex-col items-center gap-y-2 md:w-[40%] lg:w-[16%] w-[45%]">
            <p className="text-[#2C2C2C] text-6xl max-md:text-5xl font-grotesqueExtrabold">{days}</p>
            <p className="text-[#2C2C2C] font-poppinsRegular text-base xl:text-xl">Days</p>
          </div>
          <div className="flex flex-col items-center gap-y-2 md:w-[40%] lg:w-[16%] w-[45%]">
            <p className="text-[#2C2C2C] text-6xl max-md:text-5xl font-grotesqueExtrabold">{hours}</p>
            <p className="text-[#2C2C2C] font-poppinsRegular text-base xl:text-xl">Hours</p>
          </div>
          <div className="flex flex-col items-center gap-y-2 md:w-[40%] lg:w-[16%] w-[45%]">
            <p className="text-[#2C2C2C] text-6xl max-md:text-5xl font-grotesqueExtrabold">{minutes}</p>
            <p className="text-[#2C2C2C] font-poppinsRegular text-base xl:text-xl">Minutes</p>
          </div>
          <div className="flex flex-col items-center gap-y-2 md:w-[40%] lg:w-[16%] w-[45%]">
            <p className="text-[#2C2C2C] text-6xl max-md:text-5xl font-grotesqueExtrabold">{seconds}</p>
            <p className="text-[#2C2C2C] font-poppinsRegular text-base xl:text-xl">Seconds</p>
          </div>
        </div>
      </section>
      <section className="w-full xl:container mx-auto xl:py-16 py-8 max-xl:px-12 max-md:px-4">
        <h2 className="text-[#2C2C2C] xl:text-5xl text-center text-4xl font-grotesqueExtrabold">
          Why our members consistently beat the street
        </h2>
        <p className="text-center mt-4 text-lg">
          Proven track record backed by over 80 years of financial expertise
        </p>
        <div className="flex items-center flex-wrap gap-y-8 justify-between text-center mt-16">
          <div className="xl:w-[21%] md:w-[40%] w-[100%] flex flex-col items-center gap-y-2 max-lg:gap-y-6">
            <Image className="w-[30%] max-md:w-[20%]" src="/images/analysis.gif" unoptimized alt="analysis" width={300} height={300} />
            <h3 className="text-[#2C2C2C] xl:text-[1.3rem] text-2xl max-md:text-3xl font-grotesqueBold">Advanced Reporting Analysis</h3>
            <p className="font-poppinsRegular text-sm">
              Our stock experts tap into billions of digital data points to help find the next explosive stock pick.
            </p>
          </div>
          <div className="xl:w-[21%] md:w-[40%] w-[100%] flex flex-col items-center gap-y-2">
            <Image className="w-[30%] max-md:w-[20%]" src="/images/alert.gif" unoptimized alt="alert" width={300} height={300} />
            <h3 className="text-[#2C2C2C] xl:text-[1.3rem] text-2xl max-md:text-3xl font-grotesqueBold">Real-Time Stock Alerts</h3>
            <p className="font-poppinsRegular text-sm">
              Daily alerts to help you take your trading to the next level. Be the first to know about market changes.
            </p>
          </div>
          <div className="xl:w-[21%] md:w-[40%] w-[100%] flex flex-col items-center gap-y-2">
            <Image className="w-[30%] max-md:w-[20%]" src="/images/experience.gif" unoptimized alt="alert" width={300} height={300} />
            <h3 className="text-[#2C2C2C] xl:text-[1.3rem] text-2xl max-md:text-3xl font-grotesqueBold">Backed by Experience</h3>
            <p className="font-poppinsRegular text-sm">
              Our financial analysts have over 80 years experience forecasting off of historical stock market trends.
            </p>
          </div>
          <div className="xl:w-[21%] md:w-[40%] w-[100%] flex flex-col items-center gap-y-2">
            <Image className="w-[30%] max-md:w-[20%]" src="/images/stock.gif" unoptimized alt="alert" width={300} height={300} />
            <h3 className="text-[#2C2C2C] xl:text-[1.3rem] text-2xl max-md:text-3xl font-grotesqueBold">Limited-Time Access</h3>
            <p className="font-poppinsRegular text-sm">Join over 700K subscribers who have gained from our alerts. New subscriber spots are limited – Sign up today!</p>
          </div>
        </div>
      </section>
      <section className="w-full xl:container mx-auto border-b border-b-[#000] pb-16 max-md:py-12">
        <h2 className="text-[#2C2C2C] xl:text-5xl text-center text-4xl font-grotesqueExtrabold">
          Stock picks that outperform the market
        </h2>
        <p className="text-center mt-4 text-lg px-40 max-lg:px-4">
          {`Over the years, Penny Stocks have consistently Outperformed Blue Chip Stocks due to their volatile 
        nature. But how do you find them? With Expert Analysis, we track the market so you don’t have to!`}
        </p>
      </section>

      {/* penny stocks */}
      <section className="w-full xl:container mx-auto max-xl:px-4 py-16 max-md:py-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[#2C2C2C] xl:text-5xl text-center text-4xl font-grotesqueExtrabold xl:mb-16 mb-6">Latest Penny Stock Alerts</h2>

          <div className="flex items-center max-lg:flex-col  max-lg:gap-y-8 justify-between w-full">
            {/* Left Side - Penny Stocks */}
            <div className="grid grid-cols-2 gap-10 max-md:gap-2 w-[42%] max-lg:w-[100%]">
              {pennyStocks.map((stock, index) => (
                <div key={index} className="border-[1.5px] border-[#2C2C2C] rounded-3xl py-4 text-center bg-[#fff]">
                  <div className="border-b-[1.5px] border-[#2C2C2C] py-1">
                    <h3 className="text-[#2C2C2C] xl:text-5xl text-center text-4xl font-grotesqueExtrabold mb-4">{stock.name}</h3>
                    <p className="text-[#26C045] xl:text-4xl text-center text-3xl font-grotesqueExtrabold mb-6 flex items-center justify-center gap-4">
                      <svg style={{ width: "10%" }} viewBox="0 0 30 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 37C13 38.1046 13.8954 39 15 39C16.1046 39 17 38.1046 17 37L13 37ZM16.4142 0.585785C15.6332 -0.195263 14.3668 -0.195263 13.5858 0.585785L0.857863 13.3137C0.0768146 14.0948 0.0768147 15.3611 0.857863 16.1421C1.63891 16.9232 2.90524 16.9232 3.68629 16.1421L15 4.82843L26.3137 16.1421C27.0948 16.9232 28.3611 16.9232 29.1421 16.1421C29.9232 15.3611 29.9232 14.0948 29.1421 13.3137L16.4142 0.585785ZM17 37L17 2L13 2L13 37L17 37Z" fill="#26C045" />
                      </svg>
                      {stock.percentage}%
                    </p>
                  </div>
                  <p className="text-[#2C2C2C] text-lg font-poppinsMedium mt-2"><span className="font-poppinsSemibold">Alerted:</span> ${stock.alerted.toFixed(3)}</p>
                  <p className="text-[#2C2C2C] text-lg font-poppinsMedium"><span className="font-poppinsSemibold">Jumped:</span> ${stock.jumped.toFixed(3)}</p>
                </div>
              ))}
            </div>

            {/* Right Side - Chart */}
            <div className="border-[1.5px] border-[#2C2C2C] rounded-3xl p-4 w-[55%] max-lg:w-[100%]">
              <h3 className="text-2xl font-poppinsMedium mb-2">
                SmallCap Penny Stocks v/s Dow Jones Industrial
              </h3>
              <p className="text-base font-poppinsRegular text-gray-500 mb-4">
                Index performance since January 2000
              </p>
              <svg viewBox="0 0 816 504" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="61.75" y1="33.25" x2="809.25" y2="33.25" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 5" />
                <line x1="61.75" y1="103.25" x2="809.25" y2="103.25" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 5" />
                <line x1="61.75" y1="173.25" x2="809.25" y2="173.25" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 5" />
                <line x1="61.75" y1="243.25" x2="809.25" y2="243.25" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 5" />
                <line x1="62" y1="313" x2="809" y2="313" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <line x1="61.75" y1="383.25" x2="809.25" y2="383.25" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 5" />
                <path d="M1.3988 41.394C3.26146 39.898 4.7208 38.6733 5.7768 37.72C6.8328 36.752 7.72013 35.7473 8.4388 34.706C9.17213 33.65 9.5388 32.616 9.5388 31.604C9.5388 30.6507 9.30413 29.9027 8.8348 29.36C8.38013 28.8027 7.63947 28.524 6.6128 28.524C5.61547 28.524 4.83813 28.8393 4.2808 29.47C3.73813 30.086 3.4448 30.9147 3.4008 31.956H1.4648C1.52346 30.3133 2.02213 29.0447 2.9608 28.15C3.89947 27.2553 5.10946 26.808 6.5908 26.808C8.10147 26.808 9.2968 27.226 10.1768 28.062C11.0715 28.898 11.5188 30.0493 11.5188 31.516C11.5188 32.7333 11.1521 33.9213 10.4188 35.08C9.70013 36.224 8.8788 37.236 7.9548 38.116C7.0308 38.9813 5.85013 39.9933 4.4128 41.152H11.9808V42.824H1.3988V41.394ZM14.5151 34.882C14.5151 32.3593 14.9258 30.394 15.7471 28.986C16.5684 27.5633 18.0058 26.852 20.0591 26.852C22.0978 26.852 23.5278 27.5633 24.3491 28.986C25.1704 30.394 25.5811 32.3593 25.5811 34.882C25.5811 37.4487 25.1704 39.4433 24.3491 40.866C23.5278 42.2887 22.0978 43 20.0591 43C18.0058 43 16.5684 42.2887 15.7471 40.866C14.9258 39.4433 14.5151 37.4487 14.5151 34.882ZM23.6011 34.882C23.6011 33.606 23.5131 32.528 23.3371 31.648C23.1758 30.7533 22.8311 30.0347 22.3031 29.492C21.7898 28.9493 21.0418 28.678 20.0591 28.678C19.0618 28.678 18.2991 28.9493 17.7711 29.492C17.2578 30.0347 16.9131 30.7533 16.7371 31.648C16.5758 32.528 16.4951 33.606 16.4951 34.882C16.4951 36.202 16.5758 37.3093 16.7371 38.204C16.9131 39.0987 17.2578 39.8173 17.7711 40.36C18.2991 40.9027 19.0618 41.174 20.0591 41.174C21.0418 41.174 21.7898 40.9027 22.3031 40.36C22.8311 39.8173 23.1758 39.0987 23.3371 38.204C23.5131 37.3093 23.6011 36.202 23.6011 34.882ZM28.5495 34.882C28.5495 32.3593 28.9602 30.394 29.7815 28.986C30.6029 27.5633 32.0402 26.852 34.0935 26.852C36.1322 26.852 37.5622 27.5633 38.3835 28.986C39.2049 30.394 39.6155 32.3593 39.6155 34.882C39.6155 37.4487 39.2049 39.4433 38.3835 40.866C37.5622 42.2887 36.1322 43 34.0935 43C32.0402 43 30.6029 42.2887 29.7815 40.866C28.9602 39.4433 28.5495 37.4487 28.5495 34.882ZM37.6355 34.882C37.6355 33.606 37.5475 32.528 37.3715 31.648C37.2102 30.7533 36.8655 30.0347 36.3375 29.492C35.8242 28.9493 35.0762 28.678 34.0935 28.678C33.0962 28.678 32.3335 28.9493 31.8055 29.492C31.2922 30.0347 30.9475 30.7533 30.7715 31.648C30.6102 32.528 30.5295 33.606 30.5295 34.882C30.5295 36.202 30.6102 37.3093 30.7715 38.204C30.9475 39.0987 31.2922 39.8173 31.8055 40.36C32.3335 40.9027 33.0962 41.174 34.0935 41.174C35.0762 41.174 35.8242 40.9027 36.3375 40.36C36.8655 39.8173 37.2102 39.0987 37.3715 38.204C37.5475 37.3093 37.6355 36.202 37.6355 34.882ZM6.72022 98.92V97.094H10.8562V113H8.83222V98.92H6.72022ZM24.6571 98.832H16.9351V103.848C17.2724 103.379 17.7711 102.997 18.4311 102.704C19.0911 102.396 19.8024 102.242 20.5651 102.242C21.7824 102.242 22.7724 102.499 23.5351 103.012C24.2978 103.511 24.8404 104.163 25.1631 104.97C25.5004 105.762 25.6691 106.605 25.6691 107.5C25.6691 108.556 25.4711 109.502 25.0751 110.338C24.6791 111.174 24.0704 111.834 23.2491 112.318C22.4424 112.802 21.4378 113.044 20.2351 113.044C18.6951 113.044 17.4484 112.648 16.4951 111.856C15.5418 111.064 14.9624 110.008 14.7571 108.688H16.7151C16.9058 109.524 17.3091 110.177 17.9251 110.646C18.5411 111.115 19.3184 111.35 20.2571 111.35C21.4158 111.35 22.2884 111.005 22.8751 110.316C23.4618 109.612 23.7551 108.688 23.7551 107.544C23.7551 106.4 23.4618 105.52 22.8751 104.904C22.2884 104.273 21.4231 103.958 20.2791 103.958C19.5018 103.958 18.8198 104.149 18.2331 104.53C17.6611 104.897 17.2431 105.403 16.9791 106.048H15.0871V97.072H24.6571V98.832ZM28.5495 104.882C28.5495 102.359 28.9602 100.394 29.7815 98.986C30.6029 97.5633 32.0402 96.852 34.0935 96.852C36.1322 96.852 37.5622 97.5633 38.3835 98.986C39.2049 100.394 39.6155 102.359 39.6155 104.882C39.6155 107.449 39.2049 109.443 38.3835 110.866C37.5622 112.289 36.1322 113 34.0935 113C32.0402 113 30.6029 112.289 29.7815 110.866C28.9602 109.443 28.5495 107.449 28.5495 104.882ZM37.6355 104.882C37.6355 103.606 37.5475 102.528 37.3715 101.648C37.2102 100.753 36.8655 100.035 36.3375 99.492C35.8242 98.9493 35.0762 98.678 34.0935 98.678C33.0962 98.678 32.3335 98.9493 31.8055 99.492C31.2922 100.035 30.9475 100.753 30.7715 101.648C30.6102 102.528 30.5295 103.606 30.5295 104.882C30.5295 106.202 30.6102 107.309 30.7715 108.204C30.9475 109.099 31.2922 109.817 31.8055 110.36C32.3335 110.903 33.0962 111.174 34.0935 111.174C35.0762 111.174 35.8242 110.903 36.3375 110.36C36.8655 109.817 37.2102 109.099 37.3715 108.204C37.5475 107.309 37.6355 106.202 37.6355 104.882ZM6.72022 168.92V167.094H10.8562V183H8.83222V168.92H6.72022ZM14.5151 174.882C14.5151 172.359 14.9258 170.394 15.7471 168.986C16.5684 167.563 18.0058 166.852 20.0591 166.852C22.0978 166.852 23.5278 167.563 24.3491 168.986C25.1704 170.394 25.5811 172.359 25.5811 174.882C25.5811 177.449 25.1704 179.443 24.3491 180.866C23.5278 182.289 22.0978 183 20.0591 183C18.0058 183 16.5684 182.289 15.7471 180.866C14.9258 179.443 14.5151 177.449 14.5151 174.882ZM23.6011 174.882C23.6011 173.606 23.5131 172.528 23.3371 171.648C23.1758 170.753 22.8311 170.035 22.3031 169.492C21.7898 168.949 21.0418 168.678 20.0591 168.678C19.0618 168.678 18.2991 168.949 17.7711 169.492C17.2578 170.035 16.9131 170.753 16.7371 171.648C16.5758 172.528 16.4951 173.606 16.4951 174.882C16.4951 176.202 16.5758 177.309 16.7371 178.204C16.9131 179.099 17.2578 179.817 17.7711 180.36C18.2991 180.903 19.0618 181.174 20.0591 181.174C21.0418 181.174 21.7898 180.903 22.3031 180.36C22.8311 179.817 23.1758 179.099 23.3371 178.204C23.5131 177.309 23.6011 176.202 23.6011 174.882ZM28.5495 174.882C28.5495 172.359 28.9602 170.394 29.7815 168.986C30.6029 167.563 32.0402 166.852 34.0935 166.852C36.1322 166.852 37.5622 167.563 38.3835 168.986C39.2049 170.394 39.6155 172.359 39.6155 174.882C39.6155 177.449 39.2049 179.443 38.3835 180.866C37.5622 182.289 36.1322 183 34.0935 183C32.0402 183 30.6029 182.289 29.7815 180.866C28.9602 179.443 28.5495 177.449 28.5495 174.882ZM37.6355 174.882C37.6355 173.606 37.5475 172.528 37.3715 171.648C37.2102 170.753 36.8655 170.035 36.3375 169.492C35.8242 168.949 35.0762 168.678 34.0935 168.678C33.0962 168.678 32.3335 168.949 31.8055 169.492C31.2922 170.035 30.9475 170.753 30.7715 171.648C30.6102 172.528 30.5295 173.606 30.5295 174.882C30.5295 176.202 30.6102 177.309 30.7715 178.204C30.9475 179.099 31.2922 179.817 31.8055 180.36C32.3335 180.903 33.0962 181.174 34.0935 181.174C35.0762 181.174 35.8242 180.903 36.3375 180.36C36.8655 179.817 37.2102 179.099 37.3715 178.204C37.5475 177.309 37.6355 176.202 37.6355 174.882ZM24.6571 238.832H16.9351V243.848C17.2724 243.379 17.7711 242.997 18.4311 242.704C19.0911 242.396 19.8024 242.242 20.5651 242.242C21.7824 242.242 22.7724 242.499 23.5351 243.012C24.2978 243.511 24.8404 244.163 25.1631 244.97C25.5004 245.762 25.6691 246.605 25.6691 247.5C25.6691 248.556 25.4711 249.502 25.0751 250.338C24.6791 251.174 24.0704 251.834 23.2491 252.318C22.4424 252.802 21.4378 253.044 20.2351 253.044C18.6951 253.044 17.4484 252.648 16.4951 251.856C15.5418 251.064 14.9624 250.008 14.7571 248.688H16.7151C16.9058 249.524 17.3091 250.177 17.9251 250.646C18.5411 251.115 19.3184 251.35 20.2571 251.35C21.4158 251.35 22.2884 251.005 22.8751 250.316C23.4618 249.612 23.7551 248.688 23.7551 247.544C23.7551 246.4 23.4618 245.52 22.8751 244.904C22.2884 244.273 21.4231 243.958 20.2791 243.958C19.5018 243.958 18.8198 244.149 18.2331 244.53C17.6611 244.897 17.2431 245.403 16.9791 246.048H15.0871V237.072H24.6571V238.832ZM28.5495 244.882C28.5495 242.359 28.9602 240.394 29.7815 238.986C30.6029 237.563 32.0402 236.852 34.0935 236.852C36.1322 236.852 37.5622 237.563 38.3835 238.986C39.2049 240.394 39.6155 242.359 39.6155 244.882C39.6155 247.449 39.2049 249.443 38.3835 250.866C37.5622 252.289 36.1322 253 34.0935 253C32.0402 253 30.6029 252.289 29.7815 250.866C28.9602 249.443 28.5495 247.449 28.5495 244.882ZM37.6355 244.882C37.6355 243.606 37.5475 242.528 37.3715 241.648C37.2102 240.753 36.8655 240.035 36.3375 239.492C35.8242 238.949 35.0762 238.678 34.0935 238.678C33.0962 238.678 32.3335 238.949 31.8055 239.492C31.2922 240.035 30.9475 240.753 30.7715 241.648C30.6102 242.528 30.5295 243.606 30.5295 244.882C30.5295 246.202 30.6102 247.309 30.7715 248.204C30.9475 249.099 31.2922 249.817 31.8055 250.36C32.3335 250.903 33.0962 251.174 34.0935 251.174C35.0762 251.174 35.8242 250.903 36.3375 250.36C36.8655 249.817 37.2102 249.099 37.3715 248.204C37.5475 247.309 37.6355 246.202 37.6355 244.882ZM28.5495 314.882C28.5495 312.359 28.9602 310.394 29.7815 308.986C30.6029 307.563 32.0402 306.852 34.0935 306.852C36.1322 306.852 37.5622 307.563 38.3835 308.986C39.2049 310.394 39.6155 312.359 39.6155 314.882C39.6155 317.449 39.2049 319.443 38.3835 320.866C37.5622 322.289 36.1322 323 34.0935 323C32.0402 323 30.6029 322.289 29.7815 320.866C28.9602 319.443 28.5495 317.449 28.5495 314.882ZM37.6355 314.882C37.6355 313.606 37.5475 312.528 37.3715 311.648C37.2102 310.753 36.8655 310.035 36.3375 309.492C35.8242 308.949 35.0762 308.678 34.0935 308.678C33.0962 308.678 32.3335 308.949 31.8055 309.492C31.2922 310.035 30.9475 310.753 30.7715 311.648C30.6102 312.528 30.5295 313.606 30.5295 314.882C30.5295 316.202 30.6102 317.309 30.7715 318.204C30.9475 319.099 31.2922 319.817 31.8055 320.36C32.3335 320.903 33.0962 321.174 34.0935 321.174C35.0762 321.174 35.8242 320.903 36.3375 320.36C36.8655 319.817 37.2102 319.099 37.3715 318.204C37.5475 317.309 37.6355 316.202 37.6355 314.882ZM10.8679 384.09V385.784H2.08991V384.09H10.8679ZM24.6571 378.832H16.9351V383.848C17.2724 383.379 17.7711 382.997 18.4311 382.704C19.0911 382.396 19.8024 382.242 20.5651 382.242C21.7824 382.242 22.7724 382.499 23.5351 383.012C24.2978 383.511 24.8404 384.163 25.1631 384.97C25.5004 385.762 25.6691 386.605 25.6691 387.5C25.6691 388.556 25.4711 389.502 25.0751 390.338C24.6791 391.174 24.0704 391.834 23.2491 392.318C22.4424 392.802 21.4378 393.044 20.2351 393.044C18.6951 393.044 17.4484 392.648 16.4951 391.856C15.5418 391.064 14.9624 390.008 14.7571 388.688H16.7151C16.9058 389.524 17.3091 390.177 17.9251 390.646C18.5411 391.115 19.3184 391.35 20.2571 391.35C21.4158 391.35 22.2884 391.005 22.8751 390.316C23.4618 389.612 23.7551 388.688 23.7551 387.544C23.7551 386.4 23.4618 385.52 22.8751 384.904C22.2884 384.273 21.4231 383.958 20.2791 383.958C19.5018 383.958 18.8198 384.149 18.2331 384.53C17.6611 384.897 17.2431 385.403 16.9791 386.048H15.0871V377.072H24.6571V378.832ZM28.5495 384.882C28.5495 382.359 28.9602 380.394 29.7815 378.986C30.6029 377.563 32.0402 376.852 34.0935 376.852C36.1322 376.852 37.5622 377.563 38.3835 378.986C39.2049 380.394 39.6155 382.359 39.6155 384.882C39.6155 387.449 39.2049 389.443 38.3835 390.866C37.5622 392.289 36.1322 393 34.0935 393C32.0402 393 30.6029 392.289 29.7815 390.866C28.9602 389.443 28.5495 387.449 28.5495 384.882ZM37.6355 384.882C37.6355 383.606 37.5475 382.528 37.3715 381.648C37.2102 380.753 36.8655 380.035 36.3375 379.492C35.8242 378.949 35.0762 378.678 34.0935 378.678C33.0962 378.678 32.3335 378.949 31.8055 379.492C31.2922 380.035 30.9475 380.753 30.7715 381.648C30.6102 382.528 30.5295 383.606 30.5295 384.882C30.5295 386.202 30.6102 387.309 30.7715 388.204C30.9475 389.099 31.2922 389.817 31.8055 390.36C32.3335 390.903 33.0962 391.174 34.0935 391.174C35.0762 391.174 35.8242 390.903 36.3375 390.36C36.8655 389.817 37.2102 389.099 37.3715 388.204C37.5475 387.309 37.6355 386.202 37.6355 384.882Z" fill="#2C2C2C" />
                <line x1="89.5" y1="385" x2="89.5" y2="398" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <path d="M62.122 426.394C63.9847 424.898 65.444 423.673 66.5 422.72C67.556 421.752 68.4433 420.747 69.162 419.706C69.8953 418.65 70.262 417.616 70.262 416.604C70.262 415.651 70.0273 414.903 69.558 414.36C69.1033 413.803 68.3627 413.524 67.336 413.524C66.3387 413.524 65.5613 413.839 65.004 414.47C64.4613 415.086 64.168 415.915 64.124 416.956H62.188C62.2467 415.313 62.7453 414.045 63.684 413.15C64.6227 412.255 65.8327 411.808 67.314 411.808C68.8247 411.808 70.02 412.226 70.9 413.062C71.7947 413.898 72.242 415.049 72.242 416.516C72.242 417.733 71.8753 418.921 71.142 420.08C70.4233 421.224 69.602 422.236 68.678 423.116C67.754 423.981 66.5733 424.993 65.136 426.152H72.704V427.824H62.122V426.394ZM75.2383 419.882C75.2383 417.359 75.649 415.394 76.4703 413.986C77.2916 412.563 78.729 411.852 80.7823 411.852C82.821 411.852 84.251 412.563 85.0723 413.986C85.8936 415.394 86.3043 417.359 86.3043 419.882C86.3043 422.449 85.8936 424.443 85.0723 425.866C84.251 427.289 82.821 428 80.7823 428C78.729 428 77.2916 427.289 76.4703 425.866C75.649 424.443 75.2383 422.449 75.2383 419.882ZM84.3243 419.882C84.3243 418.606 84.2363 417.528 84.0603 416.648C83.899 415.753 83.5543 415.035 83.0263 414.492C82.513 413.949 81.765 413.678 80.7823 413.678C79.785 413.678 79.0223 413.949 78.4943 414.492C77.981 415.035 77.6363 415.753 77.4603 416.648C77.299 417.528 77.2183 418.606 77.2183 419.882C77.2183 421.202 77.299 422.309 77.4603 423.204C77.6363 424.099 77.981 424.817 78.4943 425.36C79.0223 425.903 79.785 426.174 80.7823 426.174C81.765 426.174 82.513 425.903 83.0263 425.36C83.5543 424.817 83.899 424.099 84.0603 423.204C84.2363 422.309 84.3243 421.202 84.3243 419.882ZM89.2728 419.882C89.2728 417.359 89.6834 415.394 90.5048 413.986C91.3261 412.563 92.7634 411.852 94.8168 411.852C96.8554 411.852 98.2854 412.563 99.1068 413.986C99.9281 415.394 100.339 417.359 100.339 419.882C100.339 422.449 99.9281 424.443 99.1068 425.866C98.2854 427.289 96.8554 428 94.8168 428C92.7634 428 91.3261 427.289 90.5048 425.866C89.6834 424.443 89.2728 422.449 89.2728 419.882ZM98.3588 419.882C98.3588 418.606 98.2708 417.528 98.0948 416.648C97.9334 415.753 97.5888 415.035 97.0608 414.492C96.5474 413.949 95.7994 413.678 94.8168 413.678C93.8194 413.678 93.0568 413.949 92.5288 414.492C92.0154 415.035 91.6708 415.753 91.4948 416.648C91.3334 417.528 91.2528 418.606 91.2528 419.882C91.2528 421.202 91.3334 422.309 91.4948 423.204C91.6708 424.099 92.0154 424.817 92.5288 425.36C93.0568 425.903 93.8194 426.174 94.8168 426.174C95.7994 426.174 96.5474 425.903 97.0608 425.36C97.5888 424.817 97.9334 424.099 98.0948 423.204C98.2708 422.309 98.3588 421.202 98.3588 419.882ZM103.307 419.882C103.307 417.359 103.718 415.394 104.539 413.986C105.361 412.563 106.798 411.852 108.851 411.852C110.89 411.852 112.32 412.563 113.141 413.986C113.963 415.394 114.373 417.359 114.373 419.882C114.373 422.449 113.963 424.443 113.141 425.866C112.32 427.289 110.89 428 108.851 428C106.798 428 105.361 427.289 104.539 425.866C103.718 424.443 103.307 422.449 103.307 419.882ZM112.393 419.882C112.393 418.606 112.305 417.528 112.129 416.648C111.968 415.753 111.623 415.035 111.095 414.492C110.582 413.949 109.834 413.678 108.851 413.678C107.854 413.678 107.091 413.949 106.563 414.492C106.05 415.035 105.705 415.753 105.529 416.648C105.368 417.528 105.287 418.606 105.287 419.882C105.287 421.202 105.368 422.309 105.529 423.204C105.705 424.099 106.05 424.817 106.563 425.36C107.091 425.903 107.854 426.174 108.851 426.174C109.834 426.174 110.582 425.903 111.095 425.36C111.623 424.817 111.968 424.099 112.129 423.204C112.305 422.309 112.393 421.202 112.393 419.882Z" fill="#2C2C2C" />
                <line x1="189.5" y1="385" x2="189.5" y2="398" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <path d="M162.122 426.394C163.985 424.898 165.444 423.673 166.5 422.72C167.556 421.752 168.443 420.747 169.162 419.706C169.895 418.65 170.262 417.616 170.262 416.604C170.262 415.651 170.027 414.903 169.558 414.36C169.103 413.803 168.363 413.524 167.336 413.524C166.339 413.524 165.561 413.839 165.004 414.47C164.461 415.086 164.168 415.915 164.124 416.956H162.188C162.247 415.313 162.745 414.045 163.684 413.15C164.623 412.255 165.833 411.808 167.314 411.808C168.825 411.808 170.02 412.226 170.9 413.062C171.795 413.898 172.242 415.049 172.242 416.516C172.242 417.733 171.875 418.921 171.142 420.08C170.423 421.224 169.602 422.236 168.678 423.116C167.754 423.981 166.573 424.993 165.136 426.152H172.704V427.824H162.122V426.394ZM175.238 419.882C175.238 417.359 175.649 415.394 176.47 413.986C177.292 412.563 178.729 411.852 180.782 411.852C182.821 411.852 184.251 412.563 185.072 413.986C185.894 415.394 186.304 417.359 186.304 419.882C186.304 422.449 185.894 424.443 185.072 425.866C184.251 427.289 182.821 428 180.782 428C178.729 428 177.292 427.289 176.47 425.866C175.649 424.443 175.238 422.449 175.238 419.882ZM184.324 419.882C184.324 418.606 184.236 417.528 184.06 416.648C183.899 415.753 183.554 415.035 183.026 414.492C182.513 413.949 181.765 413.678 180.782 413.678C179.785 413.678 179.022 413.949 178.494 414.492C177.981 415.035 177.636 415.753 177.46 416.648C177.299 417.528 177.218 418.606 177.218 419.882C177.218 421.202 177.299 422.309 177.46 423.204C177.636 424.099 177.981 424.817 178.494 425.36C179.022 425.903 179.785 426.174 180.782 426.174C181.765 426.174 182.513 425.903 183.026 425.36C183.554 424.817 183.899 424.099 184.06 423.204C184.236 422.309 184.324 421.202 184.324 419.882ZM189.273 419.882C189.273 417.359 189.683 415.394 190.505 413.986C191.326 412.563 192.763 411.852 194.817 411.852C196.855 411.852 198.285 412.563 199.107 413.986C199.928 415.394 200.339 417.359 200.339 419.882C200.339 422.449 199.928 424.443 199.107 425.866C198.285 427.289 196.855 428 194.817 428C192.763 428 191.326 427.289 190.505 425.866C189.683 424.443 189.273 422.449 189.273 419.882ZM198.359 419.882C198.359 418.606 198.271 417.528 198.095 416.648C197.933 415.753 197.589 415.035 197.061 414.492C196.547 413.949 195.799 413.678 194.817 413.678C193.819 413.678 193.057 413.949 192.529 414.492C192.015 415.035 191.671 415.753 191.495 416.648C191.333 417.528 191.253 418.606 191.253 419.882C191.253 421.202 191.333 422.309 191.495 423.204C191.671 424.099 192.015 424.817 192.529 425.36C193.057 425.903 193.819 426.174 194.817 426.174C195.799 426.174 196.547 425.903 197.061 425.36C197.589 424.817 197.933 424.099 198.095 423.204C198.271 422.309 198.359 421.202 198.359 419.882ZM203.065 426.394C204.928 424.898 206.387 423.673 207.443 422.72C208.499 421.752 209.387 420.747 210.105 419.706C210.839 418.65 211.205 417.616 211.205 416.604C211.205 415.651 210.971 414.903 210.501 414.36C210.047 413.803 209.306 413.524 208.279 413.524C207.282 413.524 206.505 413.839 205.947 414.47C205.405 415.086 205.111 415.915 205.067 416.956H203.131C203.19 415.313 203.689 414.045 204.627 413.15C205.566 412.255 206.776 411.808 208.257 411.808C209.768 411.808 210.963 412.226 211.843 413.062C212.738 413.898 213.185 415.049 213.185 416.516C213.185 417.733 212.819 418.921 212.085 420.08C211.367 421.224 210.545 422.236 209.621 423.116C208.697 423.981 207.517 424.993 206.079 426.152H213.647V427.824H203.065V426.394Z" fill="#2C2C2C" />
                <line x1="289.5" y1="385" x2="289.5" y2="398" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <path d="M262.122 426.394C263.985 424.898 265.444 423.673 266.5 422.72C267.556 421.752 268.443 420.747 269.162 419.706C269.895 418.65 270.262 417.616 270.262 416.604C270.262 415.651 270.027 414.903 269.558 414.36C269.103 413.803 268.363 413.524 267.336 413.524C266.339 413.524 265.561 413.839 265.004 414.47C264.461 415.086 264.168 415.915 264.124 416.956H262.188C262.247 415.313 262.745 414.045 263.684 413.15C264.623 412.255 265.833 411.808 267.314 411.808C268.825 411.808 270.02 412.226 270.9 413.062C271.795 413.898 272.242 415.049 272.242 416.516C272.242 417.733 271.875 418.921 271.142 420.08C270.423 421.224 269.602 422.236 268.678 423.116C267.754 423.981 266.573 424.993 265.136 426.152H272.704V427.824H262.122V426.394ZM275.238 419.882C275.238 417.359 275.649 415.394 276.47 413.986C277.292 412.563 278.729 411.852 280.782 411.852C282.821 411.852 284.251 412.563 285.072 413.986C285.894 415.394 286.304 417.359 286.304 419.882C286.304 422.449 285.894 424.443 285.072 425.866C284.251 427.289 282.821 428 280.782 428C278.729 428 277.292 427.289 276.47 425.866C275.649 424.443 275.238 422.449 275.238 419.882ZM284.324 419.882C284.324 418.606 284.236 417.528 284.06 416.648C283.899 415.753 283.554 415.035 283.026 414.492C282.513 413.949 281.765 413.678 280.782 413.678C279.785 413.678 279.022 413.949 278.494 414.492C277.981 415.035 277.636 415.753 277.46 416.648C277.299 417.528 277.218 418.606 277.218 419.882C277.218 421.202 277.299 422.309 277.46 423.204C277.636 424.099 277.981 424.817 278.494 425.36C279.022 425.903 279.785 426.174 280.782 426.174C281.765 426.174 282.513 425.903 283.026 425.36C283.554 424.817 283.899 424.099 284.06 423.204C284.236 422.309 284.324 421.202 284.324 419.882ZM289.273 419.882C289.273 417.359 289.683 415.394 290.505 413.986C291.326 412.563 292.763 411.852 294.817 411.852C296.855 411.852 298.285 412.563 299.107 413.986C299.928 415.394 300.339 417.359 300.339 419.882C300.339 422.449 299.928 424.443 299.107 425.866C298.285 427.289 296.855 428 294.817 428C292.763 428 291.326 427.289 290.505 425.866C289.683 424.443 289.273 422.449 289.273 419.882ZM298.359 419.882C298.359 418.606 298.271 417.528 298.095 416.648C297.933 415.753 297.589 415.035 297.061 414.492C296.547 413.949 295.799 413.678 294.817 413.678C293.819 413.678 293.057 413.949 292.529 414.492C292.015 415.035 291.671 415.753 291.495 416.648C291.333 417.528 291.253 418.606 291.253 419.882C291.253 421.202 291.333 422.309 291.495 423.204C291.671 424.099 292.015 424.817 292.529 425.36C293.057 425.903 293.819 426.174 294.817 426.174C295.799 426.174 296.547 425.903 297.061 425.36C297.589 424.817 297.933 424.099 298.095 423.204C298.271 422.309 298.359 421.202 298.359 419.882ZM302.823 424.458V422.94L310.545 412.248H312.943V422.72H315.143V424.458H312.943V428H310.963V424.458H302.823ZM311.051 414.338L305.133 422.72H311.051V414.338Z" fill="#2C2C2C" />
                <line x1="389.5" y1="385" x2="389.5" y2="398" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <path d="M362.122 426.394C363.985 424.898 365.444 423.673 366.5 422.72C367.556 421.752 368.443 420.747 369.162 419.706C369.895 418.65 370.262 417.616 370.262 416.604C370.262 415.651 370.027 414.903 369.558 414.36C369.103 413.803 368.363 413.524 367.336 413.524C366.339 413.524 365.561 413.839 365.004 414.47C364.461 415.086 364.168 415.915 364.124 416.956H362.188C362.247 415.313 362.745 414.045 363.684 413.15C364.623 412.255 365.833 411.808 367.314 411.808C368.825 411.808 370.02 412.226 370.9 413.062C371.795 413.898 372.242 415.049 372.242 416.516C372.242 417.733 371.875 418.921 371.142 420.08C370.423 421.224 369.602 422.236 368.678 423.116C367.754 423.981 366.573 424.993 365.136 426.152H372.704V427.824H362.122V426.394ZM375.238 419.882C375.238 417.359 375.649 415.394 376.47 413.986C377.292 412.563 378.729 411.852 380.782 411.852C382.821 411.852 384.251 412.563 385.072 413.986C385.894 415.394 386.304 417.359 386.304 419.882C386.304 422.449 385.894 424.443 385.072 425.866C384.251 427.289 382.821 428 380.782 428C378.729 428 377.292 427.289 376.47 425.866C375.649 424.443 375.238 422.449 375.238 419.882ZM384.324 419.882C384.324 418.606 384.236 417.528 384.06 416.648C383.899 415.753 383.554 415.035 383.026 414.492C382.513 413.949 381.765 413.678 380.782 413.678C379.785 413.678 379.022 413.949 378.494 414.492C377.981 415.035 377.636 415.753 377.46 416.648C377.299 417.528 377.218 418.606 377.218 419.882C377.218 421.202 377.299 422.309 377.46 423.204C377.636 424.099 377.981 424.817 378.494 425.36C379.022 425.903 379.785 426.174 380.782 426.174C381.765 426.174 382.513 425.903 383.026 425.36C383.554 424.817 383.899 424.099 384.06 423.204C384.236 422.309 384.324 421.202 384.324 419.882ZM389.273 419.882C389.273 417.359 389.683 415.394 390.505 413.986C391.326 412.563 392.763 411.852 394.817 411.852C396.855 411.852 398.285 412.563 399.107 413.986C399.928 415.394 400.339 417.359 400.339 419.882C400.339 422.449 399.928 424.443 399.107 425.866C398.285 427.289 396.855 428 394.817 428C392.763 428 391.326 427.289 390.505 425.866C389.683 424.443 389.273 422.449 389.273 419.882ZM398.359 419.882C398.359 418.606 398.271 417.528 398.095 416.648C397.933 415.753 397.589 415.035 397.061 414.492C396.547 413.949 395.799 413.678 394.817 413.678C393.819 413.678 393.057 413.949 392.529 414.492C392.015 415.035 391.671 415.753 391.495 416.648C391.333 417.528 391.253 418.606 391.253 419.882C391.253 421.202 391.333 422.309 391.495 423.204C391.671 424.099 392.015 424.817 392.529 425.36C393.057 425.903 393.819 426.174 394.817 426.174C395.799 426.174 396.547 425.903 397.061 425.36C397.589 424.817 397.933 424.099 398.095 423.204C398.271 422.309 398.359 421.202 398.359 419.882ZM413.449 413.832H405.727V418.848C406.065 418.379 406.563 417.997 407.223 417.704C407.883 417.396 408.595 417.242 409.357 417.242C410.575 417.242 411.565 417.499 412.327 418.012C413.09 418.511 413.633 419.163 413.955 419.97C414.293 420.762 414.461 421.605 414.461 422.5C414.461 423.556 414.263 424.502 413.867 425.338C413.471 426.174 412.863 426.834 412.041 427.318C411.235 427.802 410.23 428.044 409.027 428.044C407.487 428.044 406.241 427.648 405.287 426.856C404.334 426.064 403.755 425.008 403.549 423.688H405.507C405.698 424.524 406.101 425.177 406.717 425.646C407.333 426.115 408.111 426.35 409.049 426.35C410.208 426.35 411.081 426.005 411.667 425.316C412.254 424.612 412.547 423.688 412.547 422.544C412.547 421.4 412.254 420.52 411.667 419.904C411.081 419.273 410.215 418.958 409.071 418.958C408.294 418.958 407.612 419.149 407.025 419.53C406.453 419.897 406.035 420.403 405.771 421.048H403.879V412.072H413.449V413.832Z" fill="#2C2C2C" />
                <line x1="489.5" y1="385" x2="489.5" y2="398" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <path d="M462.122 426.394C463.985 424.898 465.444 423.673 466.5 422.72C467.556 421.752 468.443 420.747 469.162 419.706C469.895 418.65 470.262 417.616 470.262 416.604C470.262 415.651 470.027 414.903 469.558 414.36C469.103 413.803 468.363 413.524 467.336 413.524C466.339 413.524 465.561 413.839 465.004 414.47C464.461 415.086 464.168 415.915 464.124 416.956H462.188C462.247 415.313 462.745 414.045 463.684 413.15C464.623 412.255 465.833 411.808 467.314 411.808C468.825 411.808 470.02 412.226 470.9 413.062C471.795 413.898 472.242 415.049 472.242 416.516C472.242 417.733 471.875 418.921 471.142 420.08C470.423 421.224 469.602 422.236 468.678 423.116C467.754 423.981 466.573 424.993 465.136 426.152H472.704V427.824H462.122V426.394ZM475.238 419.882C475.238 417.359 475.649 415.394 476.47 413.986C477.292 412.563 478.729 411.852 480.782 411.852C482.821 411.852 484.251 412.563 485.072 413.986C485.894 415.394 486.304 417.359 486.304 419.882C486.304 422.449 485.894 424.443 485.072 425.866C484.251 427.289 482.821 428 480.782 428C478.729 428 477.292 427.289 476.47 425.866C475.649 424.443 475.238 422.449 475.238 419.882ZM484.324 419.882C484.324 418.606 484.236 417.528 484.06 416.648C483.899 415.753 483.554 415.035 483.026 414.492C482.513 413.949 481.765 413.678 480.782 413.678C479.785 413.678 479.022 413.949 478.494 414.492C477.981 415.035 477.636 415.753 477.46 416.648C477.299 417.528 477.218 418.606 477.218 419.882C477.218 421.202 477.299 422.309 477.46 423.204C477.636 424.099 477.981 424.817 478.494 425.36C479.022 425.903 479.785 426.174 480.782 426.174C481.765 426.174 482.513 425.903 483.026 425.36C483.554 424.817 483.899 424.099 484.06 423.204C484.236 422.309 484.324 421.202 484.324 419.882ZM489.273 419.882C489.273 417.359 489.683 415.394 490.505 413.986C491.326 412.563 492.763 411.852 494.817 411.852C496.855 411.852 498.285 412.563 499.107 413.986C499.928 415.394 500.339 417.359 500.339 419.882C500.339 422.449 499.928 424.443 499.107 425.866C498.285 427.289 496.855 428 494.817 428C492.763 428 491.326 427.289 490.505 425.866C489.683 424.443 489.273 422.449 489.273 419.882ZM498.359 419.882C498.359 418.606 498.271 417.528 498.095 416.648C497.933 415.753 497.589 415.035 497.061 414.492C496.547 413.949 495.799 413.678 494.817 413.678C493.819 413.678 493.057 413.949 492.529 414.492C492.015 415.035 491.671 415.753 491.495 416.648C491.333 417.528 491.253 418.606 491.253 419.882C491.253 421.202 491.333 422.309 491.495 423.204C491.671 424.099 492.015 424.817 492.529 425.36C493.057 425.903 493.819 426.174 494.817 426.174C495.799 426.174 496.547 425.903 497.061 425.36C497.589 424.817 497.933 424.099 498.095 423.204C498.271 422.309 498.359 421.202 498.359 419.882ZM512.173 415.878C511.851 414.25 510.846 413.436 509.159 413.436C507.854 413.436 506.879 413.942 506.233 414.954C505.588 415.951 505.273 417.601 505.287 419.904C505.625 419.141 506.182 418.547 506.959 418.122C507.751 417.682 508.631 417.462 509.599 417.462C511.11 417.462 512.313 417.931 513.207 418.87C514.117 419.809 514.571 421.107 514.571 422.764C514.571 423.761 514.373 424.656 513.977 425.448C513.596 426.24 513.009 426.871 512.217 427.34C511.44 427.809 510.494 428.044 509.379 428.044C507.869 428.044 506.688 427.707 505.837 427.032C504.987 426.357 504.393 425.426 504.055 424.238C503.718 423.05 503.549 421.583 503.549 419.838C503.549 414.455 505.427 411.764 509.181 411.764C510.619 411.764 511.748 412.153 512.569 412.93C513.391 413.707 513.875 414.69 514.021 415.878H512.173ZM509.181 419.156C508.551 419.156 507.957 419.288 507.399 419.552C506.842 419.801 506.387 420.19 506.035 420.718C505.698 421.231 505.529 421.862 505.529 422.61C505.529 423.725 505.852 424.634 506.497 425.338C507.143 426.027 508.067 426.372 509.269 426.372C510.296 426.372 511.11 426.057 511.711 425.426C512.327 424.781 512.635 423.915 512.635 422.83C512.635 421.686 512.342 420.791 511.755 420.146C511.169 419.486 510.311 419.156 509.181 419.156Z" fill="#2C2C2C" />
                <line x1="589.5" y1="385" x2="589.5" y2="398" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <path d="M562.122 426.394C563.985 424.898 565.444 423.673 566.5 422.72C567.556 421.752 568.443 420.747 569.162 419.706C569.895 418.65 570.262 417.616 570.262 416.604C570.262 415.651 570.027 414.903 569.558 414.36C569.103 413.803 568.363 413.524 567.336 413.524C566.339 413.524 565.561 413.839 565.004 414.47C564.461 415.086 564.168 415.915 564.124 416.956H562.188C562.247 415.313 562.745 414.045 563.684 413.15C564.623 412.255 565.833 411.808 567.314 411.808C568.825 411.808 570.02 412.226 570.9 413.062C571.795 413.898 572.242 415.049 572.242 416.516C572.242 417.733 571.875 418.921 571.142 420.08C570.423 421.224 569.602 422.236 568.678 423.116C567.754 423.981 566.573 424.993 565.136 426.152H572.704V427.824H562.122V426.394ZM575.238 419.882C575.238 417.359 575.649 415.394 576.47 413.986C577.292 412.563 578.729 411.852 580.782 411.852C582.821 411.852 584.251 412.563 585.072 413.986C585.894 415.394 586.304 417.359 586.304 419.882C586.304 422.449 585.894 424.443 585.072 425.866C584.251 427.289 582.821 428 580.782 428C578.729 428 577.292 427.289 576.47 425.866C575.649 424.443 575.238 422.449 575.238 419.882ZM584.324 419.882C584.324 418.606 584.236 417.528 584.06 416.648C583.899 415.753 583.554 415.035 583.026 414.492C582.513 413.949 581.765 413.678 580.782 413.678C579.785 413.678 579.022 413.949 578.494 414.492C577.981 415.035 577.636 415.753 577.46 416.648C577.299 417.528 577.218 418.606 577.218 419.882C577.218 421.202 577.299 422.309 577.46 423.204C577.636 424.099 577.981 424.817 578.494 425.36C579.022 425.903 579.785 426.174 580.782 426.174C581.765 426.174 582.513 425.903 583.026 425.36C583.554 424.817 583.899 424.099 584.06 423.204C584.236 422.309 584.324 421.202 584.324 419.882ZM588.745 413.92V412.094H592.881V428H590.857V413.92H588.745ZM596.54 419.882C596.54 417.359 596.95 415.394 597.772 413.986C598.593 412.563 600.03 411.852 602.084 411.852C604.122 411.852 605.552 412.563 606.374 413.986C607.195 415.394 607.606 417.359 607.606 419.882C607.606 422.449 607.195 424.443 606.374 425.866C605.552 427.289 604.122 428 602.084 428C600.03 428 598.593 427.289 597.772 425.866C596.95 424.443 596.54 422.449 596.54 419.882ZM605.626 419.882C605.626 418.606 605.538 417.528 605.362 416.648C605.2 415.753 604.856 415.035 604.328 414.492C603.814 413.949 603.066 413.678 602.084 413.678C601.086 413.678 600.324 413.949 599.796 414.492C599.282 415.035 598.938 415.753 598.762 416.648C598.6 417.528 598.52 418.606 598.52 419.882C598.52 421.202 598.6 422.309 598.762 423.204C598.938 424.099 599.282 424.817 599.796 425.36C600.324 425.903 601.086 426.174 602.084 426.174C603.066 426.174 603.814 425.903 604.328 425.36C604.856 424.817 605.2 424.099 605.362 423.204C605.538 422.309 605.626 421.202 605.626 419.882Z" fill="#2C2C2C" />
                <line x1="689.5" y1="385" x2="689.5" y2="398" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <path d="M662.122 426.394C663.985 424.898 665.444 423.673 666.5 422.72C667.556 421.752 668.443 420.747 669.162 419.706C669.895 418.65 670.262 417.616 670.262 416.604C670.262 415.651 670.027 414.903 669.558 414.36C669.103 413.803 668.363 413.524 667.336 413.524C666.339 413.524 665.561 413.839 665.004 414.47C664.461 415.086 664.168 415.915 664.124 416.956H662.188C662.247 415.313 662.745 414.045 663.684 413.15C664.623 412.255 665.833 411.808 667.314 411.808C668.825 411.808 670.02 412.226 670.9 413.062C671.795 413.898 672.242 415.049 672.242 416.516C672.242 417.733 671.875 418.921 671.142 420.08C670.423 421.224 669.602 422.236 668.678 423.116C667.754 423.981 666.573 424.993 665.136 426.152H672.704V427.824H662.122V426.394ZM675.238 419.882C675.238 417.359 675.649 415.394 676.47 413.986C677.292 412.563 678.729 411.852 680.782 411.852C682.821 411.852 684.251 412.563 685.072 413.986C685.894 415.394 686.304 417.359 686.304 419.882C686.304 422.449 685.894 424.443 685.072 425.866C684.251 427.289 682.821 428 680.782 428C678.729 428 677.292 427.289 676.47 425.866C675.649 424.443 675.238 422.449 675.238 419.882ZM684.324 419.882C684.324 418.606 684.236 417.528 684.06 416.648C683.899 415.753 683.554 415.035 683.026 414.492C682.513 413.949 681.765 413.678 680.782 413.678C679.785 413.678 679.022 413.949 678.494 414.492C677.981 415.035 677.636 415.753 677.46 416.648C677.299 417.528 677.218 418.606 677.218 419.882C677.218 421.202 677.299 422.309 677.46 423.204C677.636 424.099 677.981 424.817 678.494 425.36C679.022 425.903 679.785 426.174 680.782 426.174C681.765 426.174 682.513 425.903 683.026 425.36C683.554 424.817 683.899 424.099 684.06 423.204C684.236 422.309 684.324 421.202 684.324 419.882ZM688.745 413.92V412.094H692.881V428H690.857V413.92H688.745ZM696.298 426.394C698.16 424.898 699.62 423.673 700.676 422.72C701.732 421.752 702.619 420.747 703.338 419.706C704.071 418.65 704.438 417.616 704.438 416.604C704.438 415.651 704.203 414.903 703.734 414.36C703.279 413.803 702.538 413.524 701.512 413.524C700.514 413.524 699.737 413.839 699.18 414.47C698.637 415.086 698.344 415.915 698.3 416.956H696.364C696.422 415.313 696.921 414.045 697.86 413.15C698.798 412.255 700.008 411.808 701.49 411.808C703 411.808 704.196 412.226 705.076 413.062C705.97 413.898 706.418 415.049 706.418 416.516C706.418 417.733 706.051 418.921 705.318 420.08C704.599 421.224 703.778 422.236 702.854 423.116C701.93 423.981 700.749 424.993 699.312 426.152H706.88V427.824H696.298V426.394Z" fill="#2C2C2C" />
                <line x1="789.5" y1="385" x2="789.5" y2="398" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                <path d="M762.122 426.394C763.985 424.898 765.444 423.673 766.5 422.72C767.556 421.752 768.443 420.747 769.162 419.706C769.895 418.65 770.262 417.616 770.262 416.604C770.262 415.651 770.027 414.903 769.558 414.36C769.103 413.803 768.363 413.524 767.336 413.524C766.339 413.524 765.561 413.839 765.004 414.47C764.461 415.086 764.168 415.915 764.124 416.956H762.188C762.247 415.313 762.745 414.045 763.684 413.15C764.623 412.255 765.833 411.808 767.314 411.808C768.825 411.808 770.02 412.226 770.9 413.062C771.795 413.898 772.242 415.049 772.242 416.516C772.242 417.733 771.875 418.921 771.142 420.08C770.423 421.224 769.602 422.236 768.678 423.116C767.754 423.981 766.573 424.993 765.136 426.152H772.704V427.824H762.122V426.394ZM775.238 419.882C775.238 417.359 775.649 415.394 776.47 413.986C777.292 412.563 778.729 411.852 780.782 411.852C782.821 411.852 784.251 412.563 785.072 413.986C785.894 415.394 786.304 417.359 786.304 419.882C786.304 422.449 785.894 424.443 785.072 425.866C784.251 427.289 782.821 428 780.782 428C778.729 428 777.292 427.289 776.47 425.866C775.649 424.443 775.238 422.449 775.238 419.882ZM784.324 419.882C784.324 418.606 784.236 417.528 784.06 416.648C783.899 415.753 783.554 415.035 783.026 414.492C782.513 413.949 781.765 413.678 780.782 413.678C779.785 413.678 779.022 413.949 778.494 414.492C777.981 415.035 777.636 415.753 777.46 416.648C777.299 417.528 777.218 418.606 777.218 419.882C777.218 421.202 777.299 422.309 777.46 423.204C777.636 424.099 777.981 424.817 778.494 425.36C779.022 425.903 779.785 426.174 780.782 426.174C781.765 426.174 782.513 425.903 783.026 425.36C783.554 424.817 783.899 424.099 784.06 423.204C784.236 422.309 784.324 421.202 784.324 419.882ZM788.745 413.92V412.094H792.881V428H790.857V413.92H788.745ZM796.056 424.458V422.94L803.778 412.248H806.176V422.72H808.376V424.458H806.176V428H804.196V424.458H796.056ZM804.284 414.338L798.366 422.72H804.284V414.338Z" fill="#2C2C2C" />
                <g clipPath="url(#clip0_2142_74)">
                  <path d="M61.7734 293.04L113.062 273.148L138.706 253.257L190.019 233.365L241.307 213.474H315.219L343.908 177.347L377.432 168.741L404.091 181.94L438.968 146.319L497.798 150.2L541.884 124.496L600.399 121.047L651.687 133.889L698.166 102.092H745.563L767.799 82.5572L805.577 74.2144" stroke="#E10600" strokeWidth="2" strokeMiterlimit="10" />
                  <path d="M61.7734 312.95L120.41 287.097L164.35 273.148L178.925 246.864L209.306 216.998L266.951 233.365L330.035 160.68L369.553 157.249L395.197 139.438L420.841 98.0615L472.154 94.1057L502.632 117.597L527.793 153.78H574.73L596.677 113.997L643.349 102.655L708.535 87.1502L749.285 69.3397H792.235L808.526 34.4124" stroke="#26C045" strokeWidth="2" strokeMiterlimit="10" />
                </g>
                <rect x="136" y="488.5" width="30" height="4" rx="2" fill="#26C045" />
                <path d="M183.992 497L181.004 491.87H179.024V497H177.386V484.454H181.436C182.384 484.454 183.182 484.616 183.83 484.94C184.49 485.264 184.982 485.702 185.306 486.254C185.63 486.806 185.792 487.436 185.792 488.144C185.792 489.008 185.54 489.77 185.036 490.43C184.544 491.09 183.8 491.528 182.804 491.744L185.954 497H183.992ZM179.024 490.556H181.436C182.324 490.556 182.99 490.34 183.434 489.908C183.878 489.464 184.1 488.876 184.1 488.144C184.1 487.4 183.878 486.824 183.434 486.416C183.002 486.008 182.336 485.804 181.436 485.804H179.024V490.556ZM197.265 487.136V497H195.627V495.542C195.315 496.046 194.877 496.442 194.313 496.73C193.761 497.006 193.149 497.144 192.477 497.144C191.709 497.144 191.019 496.988 190.407 496.676C189.795 496.352 189.309 495.872 188.949 495.236C188.601 494.6 188.427 493.826 188.427 492.914V487.136H190.047V492.698C190.047 493.67 190.293 494.42 190.785 494.948C191.277 495.464 191.949 495.722 192.801 495.722C193.677 495.722 194.367 495.452 194.871 494.912C195.375 494.372 195.627 493.586 195.627 492.554V487.136H197.265ZM203.703 497.162C202.947 497.162 202.269 497.036 201.669 496.784C201.069 496.52 200.595 496.16 200.247 495.704C199.899 495.236 199.707 494.702 199.671 494.102H201.363C201.411 494.594 201.639 494.996 202.047 495.308C202.467 495.62 203.013 495.776 203.685 495.776C204.309 495.776 204.801 495.638 205.161 495.362C205.521 495.086 205.701 494.738 205.701 494.318C205.701 493.886 205.509 493.568 205.125 493.364C204.741 493.148 204.147 492.938 203.343 492.734C202.611 492.542 202.011 492.35 201.543 492.158C201.087 491.954 200.691 491.66 200.355 491.276C200.031 490.88 199.869 490.364 199.869 489.728C199.869 489.224 200.019 488.762 200.319 488.342C200.619 487.922 201.045 487.592 201.597 487.352C202.149 487.1 202.779 486.974 203.487 486.974C204.579 486.974 205.461 487.25 206.133 487.802C206.805 488.354 207.165 489.11 207.213 490.07H205.575C205.539 489.554 205.329 489.14 204.945 488.828C204.573 488.516 204.069 488.36 203.433 488.36C202.845 488.36 202.377 488.486 202.029 488.738C201.681 488.99 201.507 489.32 201.507 489.728C201.507 490.052 201.609 490.322 201.813 490.538C202.029 490.742 202.293 490.91 202.605 491.042C202.929 491.162 203.373 491.3 203.937 491.456C204.645 491.648 205.221 491.84 205.665 492.032C206.109 492.212 206.487 492.488 206.799 492.86C207.123 493.232 207.291 493.718 207.303 494.318C207.303 494.858 207.153 495.344 206.853 495.776C206.553 496.208 206.127 496.55 205.575 496.802C205.035 497.042 204.411 497.162 203.703 497.162ZM213.287 497.162C212.531 497.162 211.853 497.036 211.253 496.784C210.653 496.52 210.179 496.16 209.831 495.704C209.483 495.236 209.291 494.702 209.255 494.102H210.947C210.995 494.594 211.223 494.996 211.631 495.308C212.051 495.62 212.597 495.776 213.269 495.776C213.893 495.776 214.385 495.638 214.745 495.362C215.105 495.086 215.285 494.738 215.285 494.318C215.285 493.886 215.093 493.568 214.709 493.364C214.325 493.148 213.731 492.938 212.927 492.734C212.195 492.542 211.595 492.35 211.127 492.158C210.671 491.954 210.275 491.66 209.939 491.276C209.615 490.88 209.453 490.364 209.453 489.728C209.453 489.224 209.603 488.762 209.903 488.342C210.203 487.922 210.629 487.592 211.181 487.352C211.733 487.1 212.363 486.974 213.071 486.974C214.163 486.974 215.045 487.25 215.717 487.802C216.389 488.354 216.749 489.11 216.797 490.07H215.159C215.123 489.554 214.913 489.14 214.529 488.828C214.157 488.516 213.653 488.36 213.017 488.36C212.429 488.36 211.961 488.486 211.613 488.738C211.265 488.99 211.091 489.32 211.091 489.728C211.091 490.052 211.193 490.322 211.397 490.538C211.613 490.742 211.877 490.91 212.189 491.042C212.513 491.162 212.957 491.3 213.521 491.456C214.229 491.648 214.805 491.84 215.249 492.032C215.693 492.212 216.071 492.488 216.383 492.86C216.707 493.232 216.875 493.718 216.887 494.318C216.887 494.858 216.737 495.344 216.437 495.776C216.137 496.208 215.711 496.55 215.159 496.802C214.619 497.042 213.995 497.162 213.287 497.162ZM228.379 491.69C228.379 492.002 228.361 492.332 228.325 492.68H220.441C220.501 493.652 220.831 494.414 221.431 494.966C222.043 495.506 222.781 495.776 223.645 495.776C224.353 495.776 224.941 495.614 225.409 495.29C225.889 494.954 226.225 494.51 226.417 493.958H228.181C227.917 494.906 227.389 495.68 226.597 496.28C225.805 496.868 224.821 497.162 223.645 497.162C222.709 497.162 221.869 496.952 221.125 496.532C220.393 496.112 219.817 495.518 219.397 494.75C218.977 493.97 218.767 493.07 218.767 492.05C218.767 491.03 218.971 490.136 219.379 489.368C219.787 488.6 220.357 488.012 221.089 487.604C221.833 487.184 222.685 486.974 223.645 486.974C224.581 486.974 225.409 487.178 226.129 487.586C226.849 487.994 227.401 488.558 227.785 489.278C228.181 489.986 228.379 490.79 228.379 491.69ZM226.687 491.348C226.687 490.724 226.549 490.19 226.273 489.746C225.997 489.29 225.619 488.948 225.139 488.72C224.671 488.48 224.149 488.36 223.573 488.36C222.745 488.36 222.037 488.624 221.449 489.152C220.873 489.68 220.543 490.412 220.459 491.348H226.687ZM232.36 483.68V497H230.722V483.68H232.36ZM236.969 483.68V497H235.331V483.68H236.969ZM244.452 495.686C245.976 494.462 247.17 493.46 248.034 492.68C248.898 491.888 249.624 491.066 250.212 490.214C250.812 489.35 251.112 488.504 251.112 487.676C251.112 486.896 250.92 486.284 250.536 485.84C250.164 485.384 249.558 485.156 248.718 485.156C247.902 485.156 247.266 485.414 246.81 485.93C246.366 486.434 246.126 487.112 246.09 487.964H244.506C244.554 486.62 244.962 485.582 245.73 484.85C246.498 484.118 247.488 483.752 248.7 483.752C249.936 483.752 250.914 484.094 251.634 484.778C252.366 485.462 252.732 486.404 252.732 487.604C252.732 488.6 252.432 489.572 251.832 490.52C251.244 491.456 250.572 492.284 249.816 493.004C249.06 493.712 248.094 494.54 246.918 495.488H253.11V496.856H244.452V495.686ZM255.183 490.358C255.183 488.294 255.519 486.686 256.191 485.534C256.863 484.37 258.039 483.788 259.719 483.788C261.387 483.788 262.557 484.37 263.229 485.534C263.901 486.686 264.237 488.294 264.237 490.358C264.237 492.458 263.901 494.09 263.229 495.254C262.557 496.418 261.387 497 259.719 497C258.039 497 256.863 496.418 256.191 495.254C255.519 494.09 255.183 492.458 255.183 490.358ZM262.617 490.358C262.617 489.314 262.545 488.432 262.401 487.712C262.269 486.98 261.987 486.392 261.555 485.948C261.135 485.504 260.523 485.282 259.719 485.282C258.903 485.282 258.279 485.504 257.847 485.948C257.427 486.392 257.145 486.98 257.001 487.712C256.869 488.432 256.803 489.314 256.803 490.358C256.803 491.438 256.869 492.344 257.001 493.076C257.145 493.808 257.427 494.396 257.847 494.84C258.279 495.284 258.903 495.506 259.719 495.506C260.523 495.506 261.135 495.284 261.555 494.84C261.987 494.396 262.269 493.808 262.401 493.076C262.545 492.344 262.617 491.438 262.617 490.358ZM266.666 490.358C266.666 488.294 267.002 486.686 267.674 485.534C268.346 484.37 269.522 483.788 271.202 483.788C272.87 483.788 274.04 484.37 274.712 485.534C275.384 486.686 275.72 488.294 275.72 490.358C275.72 492.458 275.384 494.09 274.712 495.254C274.04 496.418 272.87 497 271.202 497C269.522 497 268.346 496.418 267.674 495.254C267.002 494.09 266.666 492.458 266.666 490.358ZM274.1 490.358C274.1 489.314 274.028 488.432 273.884 487.712C273.752 486.98 273.47 486.392 273.038 485.948C272.618 485.504 272.006 485.282 271.202 485.282C270.386 485.282 269.762 485.504 269.33 485.948C268.91 486.392 268.628 486.98 268.484 487.712C268.352 488.432 268.286 489.314 268.286 490.358C268.286 491.438 268.352 492.344 268.484 493.076C268.628 493.808 268.91 494.396 269.33 494.84C269.762 495.284 270.386 495.506 271.202 495.506C272.006 495.506 272.618 495.284 273.038 494.84C273.47 494.396 273.752 493.808 273.884 493.076C274.028 492.344 274.1 491.438 274.1 490.358ZM278.149 490.358C278.149 488.294 278.485 486.686 279.157 485.534C279.829 484.37 281.005 483.788 282.685 483.788C284.353 483.788 285.523 484.37 286.195 485.534C286.867 486.686 287.203 488.294 287.203 490.358C287.203 492.458 286.867 494.09 286.195 495.254C285.523 496.418 284.353 497 282.685 497C281.005 497 279.829 496.418 279.157 495.254C278.485 494.09 278.149 492.458 278.149 490.358ZM285.583 490.358C285.583 489.314 285.511 488.432 285.367 487.712C285.235 486.98 284.953 486.392 284.521 485.948C284.101 485.504 283.489 485.282 282.685 485.282C281.869 485.282 281.245 485.504 280.813 485.948C280.393 486.392 280.111 486.98 279.967 487.712C279.835 488.432 279.769 489.314 279.769 490.358C279.769 491.438 279.835 492.344 279.967 493.076C280.111 493.808 280.393 494.396 280.813 494.84C281.245 495.284 281.869 495.506 282.685 495.506C283.489 495.506 284.101 495.284 284.521 494.84C284.953 494.396 285.235 493.808 285.367 493.076C285.511 492.344 285.583 491.438 285.583 490.358ZM299.092 500.348C297.94 499.22 297.04 497.786 296.392 496.046C295.756 494.306 295.438 492.428 295.438 490.412C295.438 488.348 295.774 486.422 296.446 484.634C297.13 482.834 298.102 481.352 299.362 480.188H301.072V480.35C299.728 481.61 298.714 483.128 298.03 484.904C297.358 486.668 297.022 488.504 297.022 490.412C297.022 492.272 297.34 494.048 297.976 495.74C298.624 497.432 299.566 498.914 300.802 500.186V500.348H299.092ZM304.872 483.68V497H303.234V483.68H304.872ZM307.232 492.032C307.232 491.024 307.436 490.142 307.844 489.386C308.252 488.618 308.81 488.024 309.518 487.604C310.238 487.184 311.036 486.974 311.912 486.974C312.776 486.974 313.526 487.16 314.162 487.532C314.798 487.904 315.272 488.372 315.584 488.936V487.136H317.24V497H315.584V495.164C315.26 495.74 314.774 496.22 314.126 496.604C313.49 496.976 312.746 497.162 311.894 497.162C311.018 497.162 310.226 496.946 309.518 496.514C308.81 496.082 308.252 495.476 307.844 494.696C307.436 493.916 307.232 493.028 307.232 492.032ZM315.584 492.05C315.584 491.306 315.434 490.658 315.134 490.106C314.834 489.554 314.426 489.134 313.91 488.846C313.406 488.546 312.848 488.396 312.236 488.396C311.624 488.396 311.066 488.54 310.562 488.828C310.058 489.116 309.656 489.536 309.356 490.088C309.056 490.64 308.906 491.288 308.906 492.032C308.906 492.788 309.056 493.448 309.356 494.012C309.656 494.564 310.058 494.99 310.562 495.29C311.066 495.578 311.624 495.722 312.236 495.722C312.848 495.722 313.406 495.578 313.91 495.29C314.426 494.99 314.834 494.564 315.134 494.012C315.434 493.448 315.584 492.794 315.584 492.05ZM322.186 488.486V494.3C322.186 494.78 322.288 495.122 322.492 495.326C322.696 495.518 323.05 495.614 323.554 495.614H324.76V497H323.284C322.372 497 321.688 496.79 321.232 496.37C320.776 495.95 320.548 495.26 320.548 494.3V488.486H319.27V487.136H320.548V484.652H322.186V487.136H324.76V488.486H322.186ZM335.925 491.69C335.925 492.002 335.907 492.332 335.871 492.68H327.987C328.047 493.652 328.377 494.414 328.977 494.966C329.589 495.506 330.327 495.776 331.191 495.776C331.899 495.776 332.487 495.614 332.955 495.29C333.435 494.954 333.771 494.51 333.963 493.958H335.727C335.463 494.906 334.935 495.68 334.143 496.28C333.351 496.868 332.367 497.162 331.191 497.162C330.255 497.162 329.415 496.952 328.671 496.532C327.939 496.112 327.363 495.518 326.943 494.75C326.523 493.97 326.313 493.07 326.313 492.05C326.313 491.03 326.517 490.136 326.925 489.368C327.333 488.6 327.903 488.012 328.635 487.604C329.379 487.184 330.231 486.974 331.191 486.974C332.127 486.974 332.955 487.178 333.675 487.586C334.395 487.994 334.947 488.558 335.331 489.278C335.727 489.986 335.925 490.79 335.925 491.69ZM334.233 491.348C334.233 490.724 334.095 490.19 333.819 489.746C333.543 489.29 333.165 488.948 332.685 488.72C332.217 488.48 331.695 488.36 331.119 488.36C330.291 488.36 329.583 488.624 328.995 489.152C328.419 489.68 328.089 490.412 328.005 491.348H334.233ZM341.759 497.162C341.003 497.162 340.325 497.036 339.725 496.784C339.125 496.52 338.651 496.16 338.303 495.704C337.955 495.236 337.763 494.702 337.727 494.102H339.419C339.467 494.594 339.695 494.996 340.103 495.308C340.523 495.62 341.069 495.776 341.741 495.776C342.365 495.776 342.857 495.638 343.217 495.362C343.577 495.086 343.757 494.738 343.757 494.318C343.757 493.886 343.565 493.568 343.181 493.364C342.797 493.148 342.203 492.938 341.399 492.734C340.667 492.542 340.067 492.35 339.599 492.158C339.143 491.954 338.747 491.66 338.411 491.276C338.087 490.88 337.925 490.364 337.925 489.728C337.925 489.224 338.075 488.762 338.375 488.342C338.675 487.922 339.101 487.592 339.653 487.352C340.205 487.1 340.835 486.974 341.543 486.974C342.635 486.974 343.517 487.25 344.189 487.802C344.861 488.354 345.221 489.11 345.269 490.07H343.631C343.595 489.554 343.385 489.14 343.001 488.828C342.629 488.516 342.125 488.36 341.489 488.36C340.901 488.36 340.433 488.486 340.085 488.738C339.737 488.99 339.563 489.32 339.563 489.728C339.563 490.052 339.665 490.322 339.869 490.538C340.085 490.742 340.349 490.91 340.661 491.042C340.985 491.162 341.429 491.3 341.993 491.456C342.701 491.648 343.277 491.84 343.721 492.032C344.165 492.212 344.543 492.488 344.855 492.86C345.179 493.232 345.347 493.718 345.359 494.318C345.359 494.858 345.209 495.344 344.909 495.776C344.609 496.208 344.183 496.55 343.631 496.802C343.091 497.042 342.467 497.162 341.759 497.162ZM349.849 488.486V494.3C349.849 494.78 349.951 495.122 350.155 495.326C350.359 495.518 350.713 495.614 351.217 495.614H352.423V497H350.947C350.035 497 349.351 496.79 348.895 496.37C348.439 495.95 348.211 495.26 348.211 494.3V488.486H346.933V487.136H348.211V484.652H349.849V487.136H352.423V488.486H349.849ZM355.11 497.108C354.798 497.108 354.534 497 354.318 496.784C354.102 496.568 353.994 496.304 353.994 495.992C353.994 495.68 354.102 495.416 354.318 495.2C354.534 494.984 354.798 494.876 355.11 494.876C355.41 494.876 355.662 494.984 355.866 495.2C356.082 495.416 356.19 495.68 356.19 495.992C356.19 496.304 356.082 496.568 355.866 496.784C355.662 497 355.41 497.108 355.11 497.108ZM355.11 489.404C354.798 489.404 354.534 489.296 354.318 489.08C354.102 488.864 353.994 488.6 353.994 488.288C353.994 487.976 354.102 487.712 354.318 487.496C354.534 487.28 354.798 487.172 355.11 487.172C355.41 487.172 355.662 487.28 355.866 487.496C356.082 487.712 356.19 487.976 356.19 488.288C356.19 488.6 356.082 488.864 355.866 489.08C355.662 489.296 355.41 489.404 355.11 489.404ZM362.876 485.48V483.986H366.26V497H364.604V485.48H362.876ZM377.552 485.408H371.234V489.512C371.51 489.128 371.918 488.816 372.458 488.576C372.998 488.324 373.58 488.198 374.204 488.198C375.2 488.198 376.01 488.408 376.634 488.828C377.258 489.236 377.702 489.77 377.966 490.43C378.242 491.078 378.38 491.768 378.38 492.5C378.38 493.364 378.218 494.138 377.894 494.822C377.57 495.506 377.072 496.046 376.4 496.442C375.74 496.838 374.918 497.036 373.934 497.036C372.674 497.036 371.654 496.712 370.874 496.064C370.094 495.416 369.62 494.552 369.452 493.472H371.054C371.21 494.156 371.54 494.69 372.044 495.074C372.548 495.458 373.184 495.65 373.952 495.65C374.9 495.65 375.614 495.368 376.094 494.804C376.574 494.228 376.814 493.472 376.814 492.536C376.814 491.6 376.574 490.88 376.094 490.376C375.614 489.86 374.906 489.602 373.97 489.602C373.334 489.602 372.776 489.758 372.296 490.07C371.828 490.37 371.486 490.784 371.27 491.312H369.722V483.968H377.552V485.408ZM380.737 490.358C380.737 488.294 381.073 486.686 381.745 485.534C382.417 484.37 383.593 483.788 385.273 483.788C386.941 483.788 388.111 484.37 388.783 485.534C389.455 486.686 389.791 488.294 389.791 490.358C389.791 492.458 389.455 494.09 388.783 495.254C388.111 496.418 386.941 497 385.273 497C383.593 497 382.417 496.418 381.745 495.254C381.073 494.09 380.737 492.458 380.737 490.358ZM388.171 490.358C388.171 489.314 388.099 488.432 387.955 487.712C387.823 486.98 387.541 486.392 387.109 485.948C386.689 485.504 386.077 485.282 385.273 485.282C384.457 485.282 383.833 485.504 383.401 485.948C382.981 486.392 382.699 486.98 382.555 487.712C382.423 488.432 382.357 489.314 382.357 490.358C382.357 491.438 382.423 492.344 382.555 493.076C382.699 493.808 382.981 494.396 383.401 494.84C383.833 495.284 384.457 495.506 385.273 495.506C386.077 495.506 386.689 495.284 387.109 494.84C387.541 494.396 387.823 493.808 387.955 493.076C388.099 492.344 388.171 491.438 388.171 490.358ZM393.012 497.108C392.7 497.108 392.436 497 392.22 496.784C392.004 496.568 391.896 496.304 391.896 495.992C391.896 495.68 392.004 495.416 392.22 495.2C392.436 494.984 392.7 494.876 393.012 494.876C393.312 494.876 393.564 494.984 393.768 495.2C393.984 495.416 394.092 495.68 394.092 495.992C394.092 496.304 393.984 496.568 393.768 496.784C393.564 497 393.312 497.108 393.012 497.108ZM403.433 487.082C403.169 485.75 402.347 485.084 400.967 485.084C399.899 485.084 399.101 485.498 398.573 486.326C398.045 487.142 397.787 488.492 397.799 490.376C398.075 489.752 398.531 489.266 399.167 488.918C399.815 488.558 400.535 488.378 401.327 488.378C402.563 488.378 403.547 488.762 404.279 489.53C405.023 490.298 405.395 491.36 405.395 492.716C405.395 493.532 405.233 494.264 404.909 494.912C404.597 495.56 404.117 496.076 403.469 496.46C402.833 496.844 402.059 497.036 401.147 497.036C399.911 497.036 398.945 496.76 398.249 496.208C397.553 495.656 397.067 494.894 396.791 493.922C396.515 492.95 396.377 491.75 396.377 490.322C396.377 485.918 397.913 483.716 400.985 483.716C402.161 483.716 403.085 484.034 403.757 484.67C404.429 485.306 404.825 486.11 404.945 487.082H403.433ZM400.985 489.764C400.469 489.764 399.983 489.872 399.527 490.088C399.071 490.292 398.699 490.61 398.411 491.042C398.135 491.462 397.997 491.978 397.997 492.59C397.997 493.502 398.261 494.246 398.789 494.822C399.317 495.386 400.073 495.668 401.057 495.668C401.897 495.668 402.563 495.41 403.055 494.894C403.559 494.366 403.811 493.658 403.811 492.77C403.811 491.834 403.571 491.102 403.091 490.574C402.611 490.034 401.909 489.764 400.985 489.764ZM407.425 486.92C407.425 486.104 407.671 485.456 408.163 484.976C408.655 484.484 409.285 484.238 410.053 484.238C410.821 484.238 411.451 484.484 411.943 484.976C412.435 485.456 412.681 486.104 412.681 486.92C412.681 487.748 412.435 488.408 411.943 488.9C411.451 489.38 410.821 489.62 410.053 489.62C409.285 489.62 408.655 489.38 408.163 488.9C407.671 488.408 407.425 487.748 407.425 486.92ZM417.937 484.436L410.647 497H409.027L416.317 484.436H417.937ZM410.053 485.246C409.645 485.246 409.321 485.39 409.081 485.678C408.853 485.954 408.739 486.368 408.739 486.92C408.739 487.472 408.853 487.892 409.081 488.18C409.321 488.468 409.645 488.612 410.053 488.612C410.461 488.612 410.785 488.468 411.025 488.18C411.265 487.88 411.385 487.46 411.385 486.92C411.385 486.368 411.265 485.954 411.025 485.678C410.785 485.39 410.461 485.246 410.053 485.246ZM414.319 494.516C414.319 493.688 414.565 493.034 415.057 492.554C415.549 492.062 416.179 491.816 416.947 491.816C417.715 491.816 418.339 492.062 418.819 492.554C419.311 493.034 419.557 493.688 419.557 494.516C419.557 495.332 419.311 495.986 418.819 496.478C418.339 496.97 417.715 497.216 416.947 497.216C416.179 497.216 415.549 496.976 415.057 496.496C414.565 496.004 414.319 495.344 414.319 494.516ZM416.929 492.842C416.521 492.842 416.197 492.986 415.957 493.274C415.717 493.55 415.597 493.964 415.597 494.516C415.597 495.056 415.717 495.47 415.957 495.758C416.197 496.034 416.521 496.172 416.929 496.172C417.337 496.172 417.661 496.034 417.901 495.758C418.141 495.47 418.261 495.056 418.261 494.516C418.261 493.964 418.141 493.55 417.901 493.274C417.661 492.986 417.337 492.842 416.929 492.842ZM421.371 500.348V500.186C422.607 498.914 423.543 497.432 424.179 495.74C424.827 494.048 425.151 492.272 425.151 490.412C425.151 488.504 424.809 486.668 424.125 484.904C423.453 483.128 422.445 481.61 421.101 480.35V480.188H422.811C424.071 481.352 425.037 482.834 425.709 484.634C426.393 486.422 426.735 488.348 426.735 490.412C426.735 492.428 426.411 494.306 425.763 496.046C425.127 497.786 424.233 499.22 423.081 500.348H421.371Z" fill="#2C2C2C" />
                <rect x="469" y="488.5" width="30" height="4" rx="2" fill="#E10600" />
                <path d="M514.292 484.454C515.66 484.454 516.842 484.712 517.838 485.228C518.846 485.732 519.614 486.458 520.142 487.406C520.682 488.354 520.952 489.47 520.952 490.754C520.952 492.038 520.682 493.154 520.142 494.102C519.614 495.038 518.846 495.758 517.838 496.262C516.842 496.754 515.66 497 514.292 497H510.386V484.454H514.292ZM514.292 495.65C515.912 495.65 517.148 495.224 518 494.372C518.852 493.508 519.278 492.302 519.278 490.754C519.278 489.194 518.846 487.976 517.982 487.1C517.13 486.224 515.9 485.786 514.292 485.786H512.024V495.65H514.292ZM529.611 484.454V493.724C529.611 494.756 529.293 495.584 528.657 496.208C528.021 496.82 527.181 497.126 526.137 497.126C525.081 497.126 524.235 496.814 523.599 496.19C522.963 495.554 522.645 494.69 522.645 493.598H524.283C524.295 494.21 524.451 494.708 524.751 495.092C525.063 495.476 525.525 495.668 526.137 495.668C526.749 495.668 527.205 495.488 527.505 495.128C527.805 494.756 527.955 494.288 527.955 493.724V484.454H529.611ZM534.655 484.454V497H533.017V484.454H534.655ZM545.043 494.21H539.571L538.563 497H536.835L541.371 484.526H543.261L547.779 497H546.051L545.043 494.21ZM544.575 492.878L542.307 486.542L540.039 492.878H544.575ZM559.127 500.348C557.975 499.22 557.075 497.786 556.427 496.046C555.791 494.306 555.473 492.428 555.473 490.412C555.473 488.348 555.809 486.422 556.481 484.634C557.165 482.834 558.137 481.352 559.397 480.188H561.107V480.35C559.763 481.61 558.749 483.128 558.065 484.904C557.393 486.668 557.057 488.504 557.057 490.412C557.057 492.272 557.375 494.048 558.011 495.74C558.659 497.432 559.601 498.914 560.837 500.186V500.348H559.127ZM564.907 483.68V497H563.269V483.68H564.907ZM567.266 492.032C567.266 491.024 567.47 490.142 567.878 489.386C568.286 488.618 568.844 488.024 569.552 487.604C570.272 487.184 571.07 486.974 571.946 486.974C572.81 486.974 573.56 487.16 574.196 487.532C574.832 487.904 575.306 488.372 575.618 488.936V487.136H577.274V497H575.618V495.164C575.294 495.74 574.808 496.22 574.16 496.604C573.524 496.976 572.78 497.162 571.928 497.162C571.052 497.162 570.26 496.946 569.552 496.514C568.844 496.082 568.286 495.476 567.878 494.696C567.47 493.916 567.266 493.028 567.266 492.032ZM575.618 492.05C575.618 491.306 575.468 490.658 575.168 490.106C574.868 489.554 574.46 489.134 573.944 488.846C573.44 488.546 572.882 488.396 572.27 488.396C571.658 488.396 571.1 488.54 570.596 488.828C570.092 489.116 569.69 489.536 569.39 490.088C569.09 490.64 568.94 491.288 568.94 492.032C568.94 492.788 569.09 493.448 569.39 494.012C569.69 494.564 570.092 494.99 570.596 495.29C571.1 495.578 571.658 495.722 572.27 495.722C572.882 495.722 573.44 495.578 573.944 495.29C574.46 494.99 574.868 494.564 575.168 494.012C575.468 493.448 575.618 492.794 575.618 492.05ZM582.22 488.486V494.3C582.22 494.78 582.322 495.122 582.526 495.326C582.73 495.518 583.084 495.614 583.588 495.614H584.794V497H583.318C582.406 497 581.722 496.79 581.266 496.37C580.81 495.95 580.582 495.26 580.582 494.3V488.486H579.304V487.136H580.582V484.652H582.22V487.136H584.794V488.486H582.22ZM595.959 491.69C595.959 492.002 595.941 492.332 595.905 492.68H588.021C588.081 493.652 588.411 494.414 589.011 494.966C589.623 495.506 590.361 495.776 591.225 495.776C591.933 495.776 592.521 495.614 592.989 495.29C593.469 494.954 593.805 494.51 593.997 493.958H595.761C595.497 494.906 594.969 495.68 594.177 496.28C593.385 496.868 592.401 497.162 591.225 497.162C590.289 497.162 589.449 496.952 588.705 496.532C587.973 496.112 587.397 495.518 586.977 494.75C586.557 493.97 586.347 493.07 586.347 492.05C586.347 491.03 586.551 490.136 586.959 489.368C587.367 488.6 587.937 488.012 588.669 487.604C589.413 487.184 590.265 486.974 591.225 486.974C592.161 486.974 592.989 487.178 593.709 487.586C594.429 487.994 594.981 488.558 595.365 489.278C595.761 489.986 595.959 490.79 595.959 491.69ZM594.267 491.348C594.267 490.724 594.129 490.19 593.853 489.746C593.577 489.29 593.199 488.948 592.719 488.72C592.251 488.48 591.729 488.36 591.153 488.36C590.325 488.36 589.617 488.624 589.029 489.152C588.453 489.68 588.123 490.412 588.039 491.348H594.267ZM601.793 497.162C601.037 497.162 600.359 497.036 599.759 496.784C599.159 496.52 598.685 496.16 598.337 495.704C597.989 495.236 597.797 494.702 597.761 494.102H599.453C599.501 494.594 599.729 494.996 600.137 495.308C600.557 495.62 601.103 495.776 601.775 495.776C602.399 495.776 602.891 495.638 603.251 495.362C603.611 495.086 603.791 494.738 603.791 494.318C603.791 493.886 603.599 493.568 603.215 493.364C602.831 493.148 602.237 492.938 601.433 492.734C600.701 492.542 600.101 492.35 599.633 492.158C599.177 491.954 598.781 491.66 598.445 491.276C598.121 490.88 597.959 490.364 597.959 489.728C597.959 489.224 598.109 488.762 598.409 488.342C598.709 487.922 599.135 487.592 599.687 487.352C600.239 487.1 600.869 486.974 601.577 486.974C602.669 486.974 603.551 487.25 604.223 487.802C604.895 488.354 605.255 489.11 605.303 490.07H603.665C603.629 489.554 603.419 489.14 603.035 488.828C602.663 488.516 602.159 488.36 601.523 488.36C600.935 488.36 600.467 488.486 600.119 488.738C599.771 488.99 599.597 489.32 599.597 489.728C599.597 490.052 599.699 490.322 599.903 490.538C600.119 490.742 600.383 490.91 600.695 491.042C601.019 491.162 601.463 491.3 602.027 491.456C602.735 491.648 603.311 491.84 603.755 492.032C604.199 492.212 604.577 492.488 604.889 492.86C605.213 493.232 605.381 493.718 605.393 494.318C605.393 494.858 605.243 495.344 604.943 495.776C604.643 496.208 604.217 496.55 603.665 496.802C603.125 497.042 602.501 497.162 601.793 497.162ZM609.884 488.486V494.3C609.884 494.78 609.986 495.122 610.19 495.326C610.394 495.518 610.748 495.614 611.252 495.614H612.458V497H610.982C610.07 497 609.386 496.79 608.93 496.37C608.474 495.95 608.246 495.26 608.246 494.3V488.486H606.968V487.136H608.246V484.652H609.884V487.136H612.458V488.486H609.884ZM615.144 497.108C614.832 497.108 614.568 497 614.352 496.784C614.136 496.568 614.028 496.304 614.028 495.992C614.028 495.68 614.136 495.416 614.352 495.2C614.568 494.984 614.832 494.876 615.144 494.876C615.444 494.876 615.696 494.984 615.9 495.2C616.116 495.416 616.224 495.68 616.224 495.992C616.224 496.304 616.116 496.568 615.9 496.784C615.696 497 615.444 497.108 615.144 497.108ZM615.144 489.404C614.832 489.404 614.568 489.296 614.352 489.08C614.136 488.864 614.028 488.6 614.028 488.288C614.028 487.976 614.136 487.712 614.352 487.496C614.568 487.28 614.832 487.172 615.144 487.172C615.444 487.172 615.696 487.28 615.9 487.496C616.116 487.712 616.224 487.976 616.224 488.288C616.224 488.6 616.116 488.864 615.9 489.08C615.696 489.296 615.444 489.404 615.144 489.404ZM631.641 485.408H625.323V489.512C625.599 489.128 626.007 488.816 626.547 488.576C627.087 488.324 627.669 488.198 628.293 488.198C629.289 488.198 630.099 488.408 630.723 488.828C631.347 489.236 631.791 489.77 632.055 490.43C632.331 491.078 632.469 491.768 632.469 492.5C632.469 493.364 632.307 494.138 631.983 494.822C631.659 495.506 631.161 496.046 630.489 496.442C629.829 496.838 629.007 497.036 628.023 497.036C626.763 497.036 625.743 496.712 624.963 496.064C624.183 495.416 623.709 494.552 623.541 493.472H625.143C625.299 494.156 625.629 494.69 626.133 495.074C626.637 495.458 627.273 495.65 628.041 495.65C628.989 495.65 629.703 495.368 630.183 494.804C630.663 494.228 630.903 493.472 630.903 492.536C630.903 491.6 630.663 490.88 630.183 490.376C629.703 489.86 628.995 489.602 628.059 489.602C627.423 489.602 626.865 489.758 626.385 490.07C625.917 490.37 625.575 490.784 625.359 491.312H623.811V483.968H631.641V485.408ZM642.08 487.082C641.816 485.75 640.994 485.084 639.614 485.084C638.546 485.084 637.748 485.498 637.22 486.326C636.692 487.142 636.434 488.492 636.446 490.376C636.722 489.752 637.178 489.266 637.814 488.918C638.462 488.558 639.182 488.378 639.974 488.378C641.21 488.378 642.194 488.762 642.926 489.53C643.67 490.298 644.042 491.36 644.042 492.716C644.042 493.532 643.88 494.264 643.556 494.912C643.244 495.56 642.764 496.076 642.116 496.46C641.48 496.844 640.706 497.036 639.794 497.036C638.558 497.036 637.592 496.76 636.896 496.208C636.2 495.656 635.714 494.894 635.438 493.922C635.162 492.95 635.024 491.75 635.024 490.322C635.024 485.918 636.56 483.716 639.632 483.716C640.808 483.716 641.732 484.034 642.404 484.67C643.076 485.306 643.472 486.11 643.592 487.082H642.08ZM639.632 489.764C639.116 489.764 638.63 489.872 638.174 490.088C637.718 490.292 637.346 490.61 637.058 491.042C636.782 491.462 636.644 491.978 636.644 492.59C636.644 493.502 636.908 494.246 637.436 494.822C637.964 495.386 638.72 495.668 639.704 495.668C640.544 495.668 641.21 495.41 641.702 494.894C642.206 494.366 642.458 493.658 642.458 492.77C642.458 491.834 642.218 491.102 641.738 490.574C641.258 490.034 640.556 489.764 639.632 489.764ZM647.224 497.108C646.912 497.108 646.648 497 646.432 496.784C646.216 496.568 646.108 496.304 646.108 495.992C646.108 495.68 646.216 495.416 646.432 495.2C646.648 494.984 646.912 494.876 647.224 494.876C647.524 494.876 647.776 494.984 647.98 495.2C648.196 495.416 648.304 495.68 648.304 495.992C648.304 496.304 648.196 496.568 647.98 496.784C647.776 497 647.524 497.108 647.224 497.108ZM652.497 493.508C652.617 494.192 652.893 494.72 653.325 495.092C653.769 495.464 654.363 495.65 655.107 495.65C656.103 495.65 656.835 495.26 657.303 494.48C657.783 493.7 658.011 492.386 657.987 490.538C657.735 491.078 657.315 491.504 656.727 491.816C656.139 492.116 655.485 492.266 654.765 492.266C653.961 492.266 653.241 492.104 652.605 491.78C651.981 491.444 651.489 490.958 651.129 490.322C650.769 489.686 650.589 488.918 650.589 488.018C650.589 486.734 650.961 485.702 651.705 484.922C652.449 484.13 653.505 483.734 654.873 483.734C656.553 483.734 657.729 484.28 658.401 485.372C659.085 486.464 659.427 488.09 659.427 490.25C659.427 491.762 659.289 493.01 659.013 493.994C658.749 494.978 658.293 495.728 657.645 496.244C657.009 496.76 656.133 497.018 655.017 497.018C653.793 497.018 652.839 496.688 652.155 496.028C651.471 495.368 651.081 494.528 650.985 493.508H652.497ZM655.035 490.88C655.839 490.88 656.499 490.634 657.015 490.142C657.531 489.638 657.789 488.96 657.789 488.108C657.789 487.208 657.537 486.482 657.033 485.93C656.529 485.378 655.821 485.102 654.909 485.102C654.069 485.102 653.397 485.366 652.893 485.894C652.401 486.422 652.155 487.118 652.155 487.982C652.155 488.858 652.401 489.56 652.893 490.088C653.385 490.616 654.099 490.88 655.035 490.88ZM661.549 486.92C661.549 486.104 661.795 485.456 662.287 484.976C662.779 484.484 663.409 484.238 664.177 484.238C664.945 484.238 665.575 484.484 666.067 484.976C666.559 485.456 666.805 486.104 666.805 486.92C666.805 487.748 666.559 488.408 666.067 488.9C665.575 489.38 664.945 489.62 664.177 489.62C663.409 489.62 662.779 489.38 662.287 488.9C661.795 488.408 661.549 487.748 661.549 486.92ZM672.061 484.436L664.771 497H663.151L670.441 484.436H672.061ZM664.177 485.246C663.769 485.246 663.445 485.39 663.205 485.678C662.977 485.954 662.863 486.368 662.863 486.92C662.863 487.472 662.977 487.892 663.205 488.18C663.445 488.468 663.769 488.612 664.177 488.612C664.585 488.612 664.909 488.468 665.149 488.18C665.389 487.88 665.509 487.46 665.509 486.92C665.509 486.368 665.389 485.954 665.149 485.678C664.909 485.39 664.585 485.246 664.177 485.246ZM668.443 494.516C668.443 493.688 668.689 493.034 669.181 492.554C669.673 492.062 670.303 491.816 671.071 491.816C671.839 491.816 672.463 492.062 672.943 492.554C673.435 493.034 673.681 493.688 673.681 494.516C673.681 495.332 673.435 495.986 672.943 496.478C672.463 496.97 671.839 497.216 671.071 497.216C670.303 497.216 669.673 496.976 669.181 496.496C668.689 496.004 668.443 495.344 668.443 494.516ZM671.053 492.842C670.645 492.842 670.321 492.986 670.081 493.274C669.841 493.55 669.721 493.964 669.721 494.516C669.721 495.056 669.841 495.47 670.081 495.758C670.321 496.034 670.645 496.172 671.053 496.172C671.461 496.172 671.785 496.034 672.025 495.758C672.265 495.47 672.385 495.056 672.385 494.516C672.385 493.964 672.265 493.55 672.025 493.274C671.785 492.986 671.461 492.842 671.053 492.842ZM675.495 500.348V500.186C676.731 498.914 677.667 497.432 678.303 495.74C678.951 494.048 679.275 492.272 679.275 490.412C679.275 488.504 678.933 486.668 678.249 484.904C677.577 483.128 676.569 481.61 675.225 480.35V480.188H676.935C678.195 481.352 679.161 482.834 679.833 484.634C680.517 486.422 680.859 488.348 680.859 490.412C680.859 492.428 680.535 494.306 679.887 496.046C679.251 497.786 678.357 499.22 677.205 500.348H675.495Z" fill="#2C2C2C" />
                <defs>
                  <clipPath id="clip0_2142_74">
                    <rect width="749" height="280" fill="white" transform="translate(61 34)" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full xl:container mx-auto py-16 max-lg:px-4">
        <div className="bg-[#FAFAFA] rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="flex-1 text-center md:text-left p-6">
            <h2 className="text-[#2C2C2C] xl:text-4xl text-4xl font-grotesqueExtrabold text-center">Our track record is our reputation!!</h2>
            <div className="flex items-center flex-col justify-center md:justify-start mt-8">
              <div className="w-[100%] flex justify-center">
                <div className="xl:w-[48%] md:w-[60%] w-[80%]">
                  <svg viewBox="40 0 350 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M376.875 205C384.124 205 390.051 199.115 389.508 191.887C386.383 150.27 368.458 110.97 338.744 81.2563C305.925 48.4375 261.413 30 215 30C168.587 30 124.075 48.4374 91.2563 81.2563C61.5422 110.97 43.6172 150.27 40.4916 191.887C39.9487 199.115 45.8763 205 53.125 205C60.3737 205 66.1898 199.111 66.8284 191.891C69.8923 157.245 85.0286 124.607 109.818 99.8179C137.714 71.9218 175.549 56.25 215 56.25C254.451 56.25 292.286 71.9218 320.182 99.8179C344.971 124.607 360.108 157.245 363.172 191.891C363.81 199.111 369.626 205 376.875 205Z" fill="#F3F3F3" />
                    <path d="M77.5833 205.001C77.5833 168.555 92.061 133.603 117.832 107.832C143.602 82.0618 178.555 67.584 215 67.584C251.445 67.584 286.398 82.0618 312.168 107.832C337.939 133.603 352.417 168.556 352.417 205.001" stroke="#DDDDDD" strokeWidth="0.5" strokeDasharray="5 4" />
                    <g filter="url(#filter0_d_4_1422)">
                      <path d="M355.188 124.062C361.465 120.438 363.656 112.378 359.572 106.389C340.443 78.3447 313.507 56.3842 281.97 43.3211C246.379 28.5788 206.917 25.9924 169.707 35.963C132.496 45.9336 99.6148 67.904 76.1632 98.4668C55.3828 125.548 43.0351 158.035 40.4918 191.887C39.9488 199.115 45.8763 205 53.125 205C60.3737 205 66.1898 199.112 66.8286 191.891C69.3112 163.826 79.7272 136.942 96.9887 114.447C116.923 88.4684 144.871 69.7936 176.501 61.3185C208.13 52.8435 241.672 55.042 271.924 67.5729C298.121 78.4239 320.583 96.4975 336.766 119.562C340.929 125.496 348.91 127.687 355.188 124.062Z" fill="#2BE751" />
                    </g>
                    <defs>
                      <filter id="filter0_d_4_1422" x="0.457275" y="0" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feMorphology radius="" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_4_1422" />
                        <feOffset dy="-5" />
                        <feGaussianBlur stdDeviation="10" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.14902 0 0 0 0 0.752941 0 0 0 0 0.270588 0 0 0 0.4 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4_1422" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4_1422" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
              <h3 className="text-[#A5A4A1] font-grotesqueExtrabold xl:text-5xl text-5xl  xl:mt-[-7rem] md:mt-[-5rem] mt-[-7rem]">
                <span className="text-[#2C2C2C] xl:text-7xl text-7xl">14</span>
                /16
              </h3>
            </div>
            <p className="mt-2 text-gray-600 text-center font-poppinsRegular text-base mt-20">Fourteen out of our last sixteen stock alerts rallied for huge gains</p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col flex-1 gap-4 mt-6 md:mt-0 text-center md:text-left record p-6">
            <h2 className="text-[#2C2C2C] xl:text-5xl text-center text-4xl font-grotesqueExtrabold">{`What's included in my`} <br /> FREE subscription?</h2>
            <p className="text-[#2C2C2C] font-poppinsRegular text-center text-sm mb-4 px-24 max-md:px-0">
              Penny stocks are volatile and provide tremendous opportunity for short-term gains.
              Here is what you will get by joining the PENNY PICKS newsletter.
            </p>
            <ul className="text-[#2c2c2c] font-poppinsMedium text-sm flex flex-wrap gap-y-6 gap-x-8 items-start">
              <li className="flex items-center gap-2 lg:w-[45%]">
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M25.7675 7.06106C25.8922 7.17019 25.9939 7.30303 26.0667 7.45183C26.1396 7.60063 26.1822 7.76244 26.1919 7.92783C26.2017 8.09323 26.1785 8.25892 26.1237 8.41527C26.0688 8.57161 25.9834 8.7155 25.8725 8.83855L12.73 23.4248C12.6185 23.5483 12.4835 23.6484 12.3329 23.719C12.1822 23.7897 12.019 23.8296 11.8527 23.8363C11.6865 23.8431 11.5206 23.8166 11.3647 23.7583C11.2088 23.7001 11.0661 23.6114 10.945 23.4973L3.34001 16.3386C3.11186 16.1207 2.97372 15.8252 2.95289 15.5105C2.93206 15.1957 3.03005 14.8846 3.22751 14.6386C3.33409 14.5052 3.46666 14.3949 3.61718 14.3143C3.7677 14.2337 3.93302 14.1846 4.10311 14.1698C4.2732 14.1551 4.44451 14.1751 4.60664 14.2286C4.76877 14.2821 4.91834 14.368 5.04626 14.4811L10.9463 19.7886C11.1926 20.0103 11.5169 20.1251 11.8479 20.1077C12.1789 20.0904 12.4894 19.9423 12.7113 19.6961L24.015 7.1623C24.235 6.91835 24.5423 6.77083 24.8702 6.75165C25.1982 6.73246 25.5205 6.84317 25.7675 7.0598V7.06106Z" fill="black" />
                </svg>
                Complete stock trading report
              </li>
              <li className="flex items-center gap-2 lg:w-[45%]">
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M25.7675 7.06106C25.8922 7.17019 25.9939 7.30303 26.0667 7.45183C26.1396 7.60063 26.1822 7.76244 26.1919 7.92783C26.2017 8.09323 26.1785 8.25892 26.1237 8.41527C26.0688 8.57161 25.9834 8.7155 25.8725 8.83855L12.73 23.4248C12.6185 23.5483 12.4835 23.6484 12.3329 23.719C12.1822 23.7897 12.019 23.8296 11.8527 23.8363C11.6865 23.8431 11.5206 23.8166 11.3647 23.7583C11.2088 23.7001 11.0661 23.6114 10.945 23.4973L3.34001 16.3386C3.11186 16.1207 2.97372 15.8252 2.95289 15.5105C2.93206 15.1957 3.03005 14.8846 3.22751 14.6386C3.33409 14.5052 3.46666 14.3949 3.61718 14.3143C3.7677 14.2337 3.93302 14.1846 4.10311 14.1698C4.2732 14.1551 4.44451 14.1751 4.60664 14.2286C4.76877 14.2821 4.91834 14.368 5.04626 14.4811L10.9463 19.7886C11.1926 20.0103 11.5169 20.1251 11.8479 20.1077C12.1789 20.0904 12.4894 19.9423 12.7113 19.6961L24.015 7.1623C24.235 6.91835 24.5423 6.77083 24.8702 6.75165C25.1982 6.73246 25.5205 6.84317 25.7675 7.0598V7.06106Z" fill="black" />
                </svg>
                Real-time notifications
              </li>
              <li className="flex items-center gap-2 lg:w-[45%]">
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M25.7675 7.06106C25.8922 7.17019 25.9939 7.30303 26.0667 7.45183C26.1396 7.60063 26.1822 7.76244 26.1919 7.92783C26.2017 8.09323 26.1785 8.25892 26.1237 8.41527C26.0688 8.57161 25.9834 8.7155 25.8725 8.83855L12.73 23.4248C12.6185 23.5483 12.4835 23.6484 12.3329 23.719C12.1822 23.7897 12.019 23.8296 11.8527 23.8363C11.6865 23.8431 11.5206 23.8166 11.3647 23.7583C11.2088 23.7001 11.0661 23.6114 10.945 23.4973L3.34001 16.3386C3.11186 16.1207 2.97372 15.8252 2.95289 15.5105C2.93206 15.1957 3.03005 14.8846 3.22751 14.6386C3.33409 14.5052 3.46666 14.3949 3.61718 14.3143C3.7677 14.2337 3.93302 14.1846 4.10311 14.1698C4.2732 14.1551 4.44451 14.1751 4.60664 14.2286C4.76877 14.2821 4.91834 14.368 5.04626 14.4811L10.9463 19.7886C11.1926 20.0103 11.5169 20.1251 11.8479 20.1077C12.1789 20.0904 12.4894 19.9423 12.7113 19.6961L24.015 7.1623C24.235 6.91835 24.5423 6.77083 24.8702 6.75165C25.1982 6.73246 25.5205 6.84317 25.7675 7.0598V7.06106Z" fill="black" />
                </svg>
                Company breakdowns
              </li>
              <li className="flex items-center gap-2 lg:w-[45%]">
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M25.7675 7.06106C25.8922 7.17019 25.9939 7.30303 26.0667 7.45183C26.1396 7.60063 26.1822 7.76244 26.1919 7.92783C26.2017 8.09323 26.1785 8.25892 26.1237 8.41527C26.0688 8.57161 25.9834 8.7155 25.8725 8.83855L12.73 23.4248C12.6185 23.5483 12.4835 23.6484 12.3329 23.719C12.1822 23.7897 12.019 23.8296 11.8527 23.8363C11.6865 23.8431 11.5206 23.8166 11.3647 23.7583C11.2088 23.7001 11.0661 23.6114 10.945 23.4973L3.34001 16.3386C3.11186 16.1207 2.97372 15.8252 2.95289 15.5105C2.93206 15.1957 3.03005 14.8846 3.22751 14.6386C3.33409 14.5052 3.46666 14.3949 3.61718 14.3143C3.7677 14.2337 3.93302 14.1846 4.10311 14.1698C4.2732 14.1551 4.44451 14.1751 4.60664 14.2286C4.76877 14.2821 4.91834 14.368 5.04626 14.4811L10.9463 19.7886C11.1926 20.0103 11.5169 20.1251 11.8479 20.1077C12.1789 20.0904 12.4894 19.9423 12.7113 19.6961L24.015 7.1623C24.235 6.91835 24.5423 6.77083 24.8702 6.75165C25.1982 6.73246 25.5205 6.84317 25.7675 7.0598V7.06106Z" fill="black" />
                </svg>
                Ongoing educational news
              </li>
              <li className="flex items-center gap-2 lg:w-[45%]">
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M25.7675 7.06106C25.8922 7.17019 25.9939 7.30303 26.0667 7.45183C26.1396 7.60063 26.1822 7.76244 26.1919 7.92783C26.2017 8.09323 26.1785 8.25892 26.1237 8.41527C26.0688 8.57161 25.9834 8.7155 25.8725 8.83855L12.73 23.4248C12.6185 23.5483 12.4835 23.6484 12.3329 23.719C12.1822 23.7897 12.019 23.8296 11.8527 23.8363C11.6865 23.8431 11.5206 23.8166 11.3647 23.7583C11.2088 23.7001 11.0661 23.6114 10.945 23.4973L3.34001 16.3386C3.11186 16.1207 2.97372 15.8252 2.95289 15.5105C2.93206 15.1957 3.03005 14.8846 3.22751 14.6386C3.33409 14.5052 3.46666 14.3949 3.61718 14.3143C3.7677 14.2337 3.93302 14.1846 4.10311 14.1698C4.2732 14.1551 4.44451 14.1751 4.60664 14.2286C4.76877 14.2821 4.91834 14.368 5.04626 14.4811L10.9463 19.7886C11.1926 20.0103 11.5169 20.1251 11.8479 20.1077C12.1789 20.0904 12.4894 19.9423 12.7113 19.6961L24.015 7.1623C24.235 6.91835 24.5423 6.77083 24.8702 6.75165C25.1982 6.73246 25.5205 6.84317 25.7675 7.0598V7.06106Z" fill="black" />
                </svg>
                Email and SMS text messaging
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* testimonials */}
      <section className="w-full xl:container mx-auto py-16 border-b border-b-[#000]">
        <div className="mb-10">
          <h2 className="text-[#2C2C2C] xl:text-5xl text-center text-4xl font-grotesqueExtrabold">Real Testimonials - Latest Subscribers</h2>
        </div>
        <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide className="">
            <div className="w-full flex flex-col items-center gap-y-2">
              <Image className="w-[9%] max-md:w-[20%]" src="/images/user-1.png" alt="user" width={150} height={150} />
              <p className="text-[#2C2C2C] xl:text-3xl text-2xl font-grotesqueSemibold">Sebastian, Philadelphia</p>
              <Image className="mb-2" src="images/rating-star.svg" alt="rating" width={160} height={24} />
              <p className="text-center w-[52%] max-lg:w-[75%] font-poppinsRegular text-[#2C2C2C] text-base max-md:text-justify" style={{ textAlignLast: "center" }}>
                {`Guys thank you so much for hitting the ball out of the park on your last alert! 
                I've been trading for four months now and your alert helped me book my first real profit. 
                Before your alert the biggest profit I made was about 5%. With yours I made 210% and 
                came out with $6,620 in profit. You just paid for my next vacation!`}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="text-center">
            <div className="w-full flex flex-col items-center gap-y-2">
              <Image className="w-[9%] max-md:w-[20%]" src="/images/user-1.png" alt="user" width={150} height={150} />
              <p className="text-[#2C2C2C] xl:text-3xl text-2xl font-grotesqueSemibold">Sebastian, Philadelphia</p>
              <Image className="mb-2" src="images/rating-star.svg" alt="rating" width={160} height={24} />
              <p className="text-center w-[52%] max-lg:w-[75%] font-poppinsRegular text-[#2C2C2C] text-base max-md:text-justify" style={{ textAlignLast: "center" }}>
                {`Guys thank you so much for hitting the ball out of the park on your last alert! 
                I've been trading for four months now and your alert helped me book my first real profit. 
                Before your alert the biggest profit I made was about 5%. With yours I made 210% and 
                came out with $6,620 in profit. You just paid for my next vacation!`}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="text-center">
            <div className="w-full flex flex-col items-center gap-y-2">
              <Image className="w-[9%] max-md:w-[20%]" src="/images/user-1.png" alt="user" width={150} height={150} />
              <p className="text-[#2C2C2C] xl:text-3xl text-2xl font-grotesqueSemibold">Sebastian, Philadelphia</p>
              <Image className="mb-2" src="images/rating-star.svg" alt="rating" width={160} height={24} />
              <p className="text-center w-[52%] max-lg:w-[75%] font-poppinsRegular text-[#2C2C2C] text-base max-md:text-justify" style={{ textAlignLast: "center" }}>
                {`Guys thank you so much for hitting the ball out of the park on your last alert! 
                I've been trading for four months now and your alert helped me book my first real profit. 
                Before your alert the biggest profit I made was about 5%. With yours I made 210% and 
                came out with $6,620 in profit. You just paid for my next vacation!`}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="text-center">
            <div className="w-full flex flex-col items-center gap-y-2">
              <Image className="w-[9%] max-md:w-[20%]" src="/images/user-1.png" alt="user" width={150} height={150} />
              <p className="text-[#2C2C2C] xl:text-3xl text-2xl font-grotesqueSemibold">Sebastian, Philadelphia</p>
              <Image className="mb-2" src="images/rating-star.svg" alt="rating" width={160} height={24} />
              <p className="text-center w-[52%] max-lg:w-[75%] font-poppinsRegular text-[#2C2C2C] text-base max-md:text-justify" style={{ textAlignLast: "center" }}>
                {`Guys thank you so much for hitting the ball out of the park on your last alert! 
                I've been trading for four months now and your alert helped me book my first real profit. 
                Before your alert the biggest profit I made was about 5%. With yours I made 210% and 
                came out with $6,620 in profit. You just paid for my next vacation!`}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      {/* ----------FAQ section---------- */}
      <section className='w-full px-6 max-sm:px-3 mx-auto xl:container flex flex-col gap-y-12 py-16'>
        <div className='w-full flex items-center gap-y-4 justify-between max-lg:flex-col'>
          <div className='w-full'>
            <h2 className='text-[#2C2C2C] xl:text-5xl text-center text-4xl font-grotesqueExtrabold'>The Lowdown on Penny Stocks</h2>
            <p className="text-center mt-4 text-lg px-40 max-lg:px-4 font-poppinsRegular">What Wall St. doesn’t want you to know about penny stocks.</p>
          </div>
        </div>
        <div className='flex flex-col gap-y-8'>
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-[#FFFFFF] shadow-[0px_10px_50px_5px_#0000000D]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-toggle text-[#2C2C2C] flex justify-between items-center w-full px-6 py-4 font-grotesqueBold xl:text-3xl md:text-xl text-xl text-left"
              >
                <span>{faq.question}</span>
                <span>
                  {
                    activeIndex === index ? <div>
                      <svg width="25" height="4" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="25" height="4" rx="2" fill="#2C2C2C" />
                      </svg>
                    </div> :
                      <div><svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="18" width="30" height="4" rx="2" fill="#2C2C2C" />
                        <rect x="22" y="5" width="30" height="4" rx="2" transform="rotate(90 22 5)" fill="#2C2C2C" />
                      </svg>
                      </div>
                  }
                </span>
              </button>
              <div
                className={`faq-content px-6 text-[#2C2C2C] text-primaryTextColor font-poppinsRegular text-base max-md:text-xs transition-all duration-600 overflow-hidden ${activeIndex === index ? "max-h-screen pb-6" : "max-h-0"
                  }`}
                style={{ maxHeight: activeIndex === index ? "600px" : "0" }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="w-full xl:container mx-auto xl:py-6">
        <div className="bg-[#FFF] rounded-xl shadow-[0px_10px_50px_5px_#0000000D] py-4">
          <h2 className="text-[#2C2C2C] xl:text-5xl text-center text-4xl font-grotesqueExtrabold">What are you waiting for?</h2>
          <p className="text-center mt-4 text-lg px-40 max-lg:px-4 font-poppinsRegular">Our next big stock alert is coming in</p>
          <div className="flex flex-wrap max-md:gap-8 items-center justify-center gap-y-8 mt-12">
            <div className="flex flex-col items-center gap-y-2 md:w-[40%] lg:w-[18%] w-[45%]">
              <p className="text-[#2C2C2C] text-5xl max-md:text-4xl font-grotesqueExtrabold">{days}</p>
              <p className="text-[#2C2C2C] font-poppinsRegular text-base">Days</p>
            </div>
            <div className="flex flex-col items-center gap-y-2 md:w-[40%] lg:w-[18%] w-[45%]">
              <p className="text-[#2C2C2C] text-5xl max-md:text-4xl font-grotesqueExtrabold">{hours}</p>
              <p className="text-[#2C2C2C] font-poppinsRegular text-base">Hours</p>
            </div>
            <div className="flex flex-col items-center gap-y-2 md:w-[40%] lg:w-[18%] w-[45%]">
              <p className="text-[#2C2C2C] text-5xl max-md:text-3xl font-grotesqueExtrabold">{minutes}</p>
              <p className="text-[#2C2C2C] font-poppinsRegular text-base">Minutes</p>
            </div>
            <div className="flex flex-col items-center gap-y-2 md:w-[40%] lg:w-[18%] w-[45%]">
              <p className="text-[#2C2C2C] text-5xl max-md:text-3xl font-grotesqueExtrabold">{seconds}</p>
              <p className="text-[#2C2C2C] font-poppinsRegular text-base">Seconds</p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center w-full p-6">
            <div className="w-full max-xl:w-[95%] mx-auto flex flex-col items-center justify-center w-full p-6rounded-xl placeholder:text-base placeholder:text-lg text-[#A5A4A1]">
              {!done && (
                <form onSubmit={handleSubscribeEmailPhone} className="w-full flex flex-col md:flex-row gap-4 w-full">
                  <div className="xl:w-[35%] w-full">
                    <input
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full p-4 border-[1.5px] border-[#A5A4A1] rounded-xl placeholder:text-base text-[#A5A4A1] focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                  </div>
                  <div className="xl:w-[35%] w-full">
                    <PhoneInput
                      country={"us"}
                      value={phone}
                      autoComplete="phone"
                      onChange={(value) => setPhone(value)}
                      inputProps={{
                        id: "phone",
                        required: true,
                        autoFocus: false,
                      }}
                      inputStyle={{
                        width: "100%",
                        padding: "27px 10px 27px 50px",
                        fontSize: "16px",
                        border: "1.5px solid #A5A4A1",
                        borderRadius: "0.75rem",
                        color: "#1A202C",
                      }}
                      containerStyle={{
                        width: "100%",
                        borderRadius: "0.75rem",
                      }}
                      dropdownStyle={{
                        borderRadius: "0.75rem !important",
                      }}
                    />
                  </div>
                  <div className="xl:w-[27%] w-full">
                    <button className="w-full px-6 py-4 bg-[#2C2C2C] text-white font-grotesqueSemibold text-xl lg:text-2xl gap-2 rounded-xl flex items-center justify-center transition hover:bg-black lg:leading-[100%]">
                      Subscribe
                      <span>
                        <svg width="42" height="16" viewBox="0 0 42 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM41.7071 8.70711C42.0976 8.31658 42.0976 7.68342 41.7071 7.29289L35.3431 0.928932C34.9526 0.538408 34.3195 0.538408 33.9289 0.928932C33.5384 1.31946 33.5384 1.95262 33.9289 2.34315L39.5858 8L33.9289 13.6569C33.5384 14.0474 33.5384 14.6805 33.9289 15.0711C34.3195 15.4616 34.9526 15.4616 35.3431 15.0711L41.7071 8.70711ZM1 9H41V7H1V9Z" fill="white" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              )}
              {done && (
                <div className="bg-[#fff] p-2 px-4 rounded-lg text-base font-sansMedium">
                  {message}
                </div>
              )}
              <p className="text-base text-[#2C2C2C] font-poppinsRegular mt-5">
                Read <Link href="/disclaimer" className="underline text-[#007AFF]">disclaimer</Link>
                &#160;and <Link href="/policy" className="underline text-[#007AFF]">privacy policy</Link>
                {" "}before joining. &#160;&#160; |&#160;&#160;  Your info is never shared.&#160;&#160;  |&#160;&#160;  Unsubscribe anytime
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )

}
export default Homepage;