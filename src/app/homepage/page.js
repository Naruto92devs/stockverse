'use client'
import Navbar from "@/components/stockpicks_nav";
import Image from "next/image";
import { useState,useEffect,useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from "next/link";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Homepage = ()=>{
const [activeIndex, setActiveIndex] = useState(null);
const TARGET_HOUR = 0; // Set the target hour (e.g., midnight)
const TARGET_MINUTE = 0; // Set the target minute
const TARGET_SECOND = 0; // Set the target second

// Function to calculate the next target date (every 2 days at specific time)
const calculateNextTarget = () => {
  const now = new Date();
  let targetDate = new Date(now);

  // Set the target time (e.g., midnight)
  targetDate.setHours(TARGET_HOUR, TARGET_MINUTE, TARGET_SECOND, 0);

  // If current time is past today's target time, set it for 2 days later
  if (now >= targetDate) {
    targetDate.setDate(targetDate.getDate() + 2);
  }

  return targetDate.getTime(); // Return as timestamp
};

// State for tracking the target time
const [targetTime, setTargetTime] = useState(calculateNextTarget);
const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());

useEffect(() => {
  const interval = setInterval(() => {
    const now = Date.now();
    const remaining = targetTime - now;

    if (remaining <= 0) {
      // Once time expires, set a new target date 2 days later
      const newTarget = calculateNextTarget();
      setTargetTime(newTarget);
      setTimeLeft(newTarget - now);
    } else {
      setTimeLeft(remaining);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [targetTime]);

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

return (
    <>
    <Navbar/>
    {/* hero section */}
    <section className="w-full xl:container mx-auto xl:py-20 md:py-12 md:px-4 relative max-md:px-3 max-md:py-8">
     <div className="relative flex items-center gap-y-6">
       <div className="w-[55%] flex flex-col gap-y-6">
       <h1 className="xl:text-6xl md:text-5xl text-4xl font-grotesqueExtrabold text-[#2C2C2C] xl:leading-[140%]">
        Do you have what it takes to <br />
        <span className="text-bg xl:text-7xl max-md:text-[3.5rem]">
          Beat the Street?
        </span>
      </h1>
      <p className="text-[#2C2C2C] font-poppinsRegular text-xl leading-[170%] max-md:text-lg pr-24">
        Get a front row seat to the Next SCORCHING Penny Stock
        and see Explosive Gains that OUTPERFORM the Street!
      </p>
      <p className="font-poppinsMedium text-[#2C2C2C] text-[1.35rem] max-md:text-xl">
        Spots are Limited! Sign Up 100% FREE Below
      </p>
       </div>
       <div className="w-[58%] absolute right-0">
        <div className="w-[50%] z-[0] absolute -bottom-[35%] -right-[7%]">
            <svg width="350" height="770" viewBox="0 0 450 770" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M449.25 0.75H0.75V545C0.75 668.85 101.15 769.25 225 769.25C348.85 769.25 449.25 668.85 449.25 545V0.75Z" fill="url(#paint0_linear_4_1261)" stroke="url(#paint1_linear_4_1261)" strokeWidth="1.5"/>
            <g clipPath="url(#clip0_4_1261)" className="rotate">
            <path d="M239.11 460.24L235.72 469.65L233.94 469.55L232.35 462.19L229.8 469.31L228.04 469.22L225.88 459.47L227.55 459.57L229.08 467.48L231.68 459.81L233.44 459.91L234.99 467.78L237.44 460.14L239.12 460.24H239.11Z" fill="#2C2C2C"/>
            <path d="M247.64 469.41L243.69 468.71L242.67 470.52L241.05 470.23L246.1 461.37L247.89 461.69L249.6 471.75L247.97 471.46L247.63 469.41H247.64ZM247.43 468.07L246.67 463.41L244.35 467.53L247.43 468.07Z" fill="#2C2C2C"/>
            <path d="M261.36 464.93L261.02 466.17L258.56 465.5L256.37 473.51L254.85 473.09L257.04 465.08L254.56 464.4L254.9 463.16L261.36 464.93Z" fill="#2C2C2C"/>
            <path d="M264.85 468.39C265.52 467.85 266.29 467.52 267.14 467.39C267.99 467.26 268.83 467.36 269.67 467.68C270.62 468.04 271.38 468.6 271.95 469.35C272.51 470.1 272.8 470.97 272.81 471.96L271.04 471.29C270.99 470.73 270.8 470.25 270.48 469.86C270.16 469.47 269.72 469.17 269.18 468.97C268.59 468.74 268.01 468.68 267.44 468.76C266.87 468.85 266.37 469.09 265.91 469.49C265.46 469.89 265.11 470.42 264.85 471.08C264.6 471.74 264.51 472.37 264.58 472.97C264.65 473.57 264.87 474.09 265.23 474.54C265.59 474.99 266.07 475.32 266.66 475.55C267.2 475.76 267.72 475.82 268.22 475.75C268.72 475.67 269.18 475.45 269.59 475.06L271.36 475.73C270.7 476.46 269.9 476.92 268.98 477.1C268.06 477.28 267.12 477.19 266.17 476.83C265.33 476.51 264.63 476.02 264.09 475.36C263.54 474.7 263.2 473.95 263.05 473.1C262.91 472.25 263 471.38 263.34 470.51C263.68 469.64 264.18 468.92 264.85 468.38V468.39Z" fill="#2C2C2C"/>
            <path d="M284.87 474.77L280.53 483.32L279.13 482.61L281.03 478.87L277.01 476.83L275.11 480.57L273.71 479.86L278.05 471.31L279.45 472.02L277.59 475.69L281.61 477.73L283.47 474.06L284.87 474.77Z" fill="#2C2C2C"/>
            <path d="M299.18 483.92L298.44 484.97L296.35 483.51L291.59 490.32L290.3 489.42L295.06 482.61L292.96 481.14L293.69 480.09L299.18 483.92Z" fill="#2C2C2C"/>
            <path d="M308.48 491.5L302.29 498.83L301.09 497.81L303.8 494.6L300.35 491.69L297.64 494.9L296.44 493.88L302.63 486.55L303.83 487.57L301.18 490.71L304.63 493.62L307.28 490.48L308.48 491.5Z" fill="#2C2C2C"/>
            <path d="M312.17 496.81L310.17 498.79L312.5 501.15L311.59 502.05L309.26 499.7L307.17 501.77L309.79 504.42L308.88 505.32L305.15 501.55L311.98 494.8L315.71 498.57L314.8 499.47L312.18 496.82L312.17 496.81Z" fill="#2C2C2C"/>
            <path d="M327.65 513.18L317.82 516.05L316.73 514.59L322.24 505.94L323.25 507.29L318.57 514.35L326.67 511.85L327.66 513.17L327.65 513.18Z" fill="#2C2C2C"/>
            <path d="M330.61 517.79L322.53 522.96L321.68 521.64L329.76 516.47L330.61 517.79Z" fill="#2C2C2C"/>
            <path d="M335.33 527.17C335.35 528.03 335.14 528.82 334.69 529.54C334.24 530.26 333.59 530.85 332.73 531.31C331.87 531.77 331.03 531.99 330.2 531.96C329.37 531.93 328.6 531.67 327.9 531.18C327.2 530.68 326.61 529.99 326.12 529.09L324.63 526.33L333.07 521.78L334.56 524.54C335.04 525.44 335.3 526.32 335.32 527.18L335.33 527.17ZM329.29 530.32C330.11 530.56 331 530.41 331.97 529.89C332.95 529.36 333.57 528.69 333.84 527.86C334.11 527.04 333.97 526.13 333.44 525.14L332.7 523.77L326.52 527.1L327.26 528.47C327.79 529.46 328.47 530.07 329.29 530.31V530.32Z" fill="#2C2C2C"/>
            <path d="M338.23 534.85L335.64 535.96L336.94 539.01L335.76 539.51L334.46 536.47L331.76 537.63L333.22 541.06L332.04 541.56L329.96 536.69L338.79 532.91L340.87 537.78L339.69 538.28L338.23 534.85Z" fill="#2C2C2C"/>
            <path d="M334.53 546.73C334.7 545.89 335.08 545.15 335.66 544.5C336.24 543.86 336.98 543.39 337.87 543.11C338.76 542.82 339.63 542.78 340.48 542.97C341.33 543.16 342.06 543.55 342.68 544.14C343.3 544.73 343.76 545.45 344.03 546.3C344.3 547.16 344.36 548.01 344.18 548.85C344.01 549.69 343.64 550.43 343.06 551.07C342.48 551.71 341.75 552.17 340.85 552.46C339.96 552.75 339.09 552.8 338.24 552.61C337.39 552.43 336.66 552.04 336.03 551.45C335.4 550.86 334.95 550.14 334.68 549.28C334.41 548.43 334.36 547.58 334.53 546.74V546.73ZM336.91 550.33C337.34 550.72 337.85 550.96 338.45 551.06C339.05 551.16 339.68 551.11 340.36 550.89C341.03 550.67 341.58 550.35 342.01 549.92C342.44 549.49 342.71 549 342.83 548.44C342.95 547.88 342.91 547.3 342.72 546.69C342.53 546.09 342.22 545.59 341.8 545.2C341.38 544.81 340.87 544.57 340.27 544.46C339.68 544.36 339.04 544.41 338.37 544.63C337.7 544.84 337.14 545.17 336.72 545.6C336.29 546.03 336.02 546.53 335.89 547.09C335.76 547.65 335.8 548.23 335.99 548.84C336.18 549.44 336.49 549.94 336.92 550.32L336.91 550.33Z" fill="#2C2C2C"/>
            <path d="M337.79 570.3L337.59 568.74L350.1 567.12L350.3 568.68L337.79 570.3Z" fill="#2C2C2C"/>
            <path d="M349.15 598.52L339.75 595.1L339.86 593.32L347.23 591.75L340.11 589.17L340.2 587.41L349.95 585.28L349.85 586.95L341.93 588.46L349.6 591.08L349.49 592.84L341.61 594.37L349.24 596.84L349.14 598.52H349.15Z" fill="#2C2C2C"/>
            <path d="M339.94 607.05L340.65 603.1L338.84 602.07L339.13 600.45L347.97 605.53L347.65 607.32L337.59 609L337.88 607.37L339.93 607.04L339.94 607.05ZM341.29 606.84L345.95 606.09L341.84 603.75L341.29 606.83V606.84Z" fill="#2C2C2C"/>
            <path d="M344.38 620.77L343.14 620.43L343.82 617.97L335.81 615.75L336.23 614.23L344.24 616.45L344.92 613.98L346.16 614.32L344.37 620.77H344.38Z" fill="#2C2C2C"/>
            <path d="M340.91 624.25C341.45 624.93 341.78 625.69 341.9 626.54C342.02 627.39 341.92 628.23 341.6 629.06C341.23 630.01 340.67 630.77 339.92 631.33C339.17 631.89 338.3 632.18 337.31 632.18L337.99 630.42C338.55 630.37 339.03 630.18 339.42 629.86C339.81 629.54 340.11 629.11 340.32 628.56C340.55 627.97 340.62 627.39 340.53 626.82C340.44 626.25 340.2 625.74 339.8 625.29C339.4 624.84 338.87 624.48 338.21 624.23C337.55 623.98 336.92 623.88 336.32 623.95C335.72 624.02 335.2 624.24 334.75 624.59C334.3 624.95 333.96 625.43 333.73 626.02C333.52 626.56 333.45 627.08 333.53 627.58C333.61 628.08 333.83 628.54 334.21 628.95L333.53 630.71C332.8 630.04 332.35 629.25 332.17 628.33C331.99 627.41 332.09 626.47 332.45 625.52C332.77 624.68 333.26 623.98 333.92 623.44C334.58 622.89 335.33 622.55 336.19 622.41C337.04 622.27 337.91 622.37 338.78 622.7C339.66 623.04 340.36 623.54 340.9 624.22L340.91 624.25Z" fill="#2C2C2C"/>
            <path d="M334.47 644.24L325.93 639.88L326.64 638.48L330.38 640.39L332.43 636.37L328.69 634.46L329.41 633.06L337.95 637.42L337.24 638.82L333.58 636.95L331.53 640.97L335.19 642.84L334.47 644.24Z" fill="#2C2C2C"/>
            <path d="M325.27 658.52L324.22 657.78L325.69 655.69L318.89 650.91L319.79 649.62L326.59 654.4L328.07 652.3L329.12 653.04L325.27 658.52Z" fill="#2C2C2C"/>
            <path d="M317.68 667.8L310.37 661.59L311.39 660.39L314.59 663.11L317.51 659.67L314.31 656.95L315.33 655.75L322.64 661.96L321.62 663.16L318.49 660.5L315.57 663.94L318.7 666.6L317.68 667.8Z" fill="#2C2C2C"/>
            <path d="M312.39 671.45L310.42 669.44L308.06 671.76L307.16 670.84L309.52 668.52L307.46 666.42L304.8 669.03L303.9 668.11L307.68 664.39L314.42 671.24L310.64 674.96L309.74 674.04L312.4 671.43L312.39 671.45Z" fill="#2C2C2C"/>
            <path d="M295.93 686.9L293.09 677.06L294.55 675.97L303.18 681.5L301.83 682.51L294.79 677.81L297.26 685.91L295.93 686.9Z" fill="#2C2C2C"/>
            <path d="M291.33 689.84L286.18 681.75L287.51 680.91L292.66 689L291.33 689.84Z" fill="#2C2C2C"/>
            <path d="M281.94 694.54C281.08 694.56 280.29 694.34 279.58 693.9C278.87 693.45 278.28 692.8 277.82 691.94C277.36 691.08 277.15 690.23 277.18 689.4C277.21 688.57 277.47 687.81 277.97 687.11C278.47 686.41 279.17 685.82 280.07 685.34L282.83 683.86L287.36 692.32L284.6 693.8C283.7 694.28 282.82 694.53 281.96 694.55L281.94 694.54ZM278.81 688.48C278.57 689.3 278.71 690.19 279.23 691.17C279.76 692.15 280.43 692.78 281.25 693.05C282.07 693.32 282.98 693.19 283.97 692.66L285.34 691.92L282.02 685.73L280.65 686.47C279.66 687 279.05 687.67 278.81 688.49V688.48Z" fill="#2C2C2C"/>
            <path d="M274.25 697.41L273.15 694.82L270.1 696.11L269.6 694.93L272.65 693.64L271.5 690.93L268.07 692.39L267.57 691.21L272.45 689.14L276.2 697.98L271.32 700.05L270.82 698.87L274.25 697.41Z" fill="#2C2C2C"/>
            <path d="M262.4 693.67C263.24 693.84 263.98 694.22 264.63 694.8C265.27 695.38 265.74 696.12 266.02 697.02C266.3 697.92 266.35 698.78 266.16 699.63C265.97 700.47 265.58 701.21 264.99 701.83C264.4 702.45 263.68 702.9 262.83 703.17C261.97 703.44 261.12 703.49 260.28 703.32C259.44 703.15 258.7 702.77 258.06 702.19C257.42 701.61 256.96 700.87 256.68 699.98C256.4 699.09 256.35 698.22 256.53 697.37C256.72 696.52 257.1 695.79 257.69 695.16C258.28 694.53 259 694.09 259.86 693.81C260.71 693.54 261.56 693.49 262.4 693.67ZM258.79 696.04C258.4 696.47 258.16 696.98 258.05 697.58C257.94 698.18 258 698.81 258.21 699.49C258.42 700.17 258.74 700.72 259.17 701.14C259.6 701.56 260.09 701.84 260.65 701.96C261.21 702.08 261.79 702.05 262.4 701.86C263.01 701.67 263.5 701.36 263.89 700.94C264.28 700.52 264.52 700.01 264.63 699.42C264.74 698.83 264.68 698.19 264.47 697.52C264.26 696.85 263.93 696.29 263.5 695.86C263.07 695.43 262.58 695.15 262.01 695.03C261.45 694.9 260.87 694.94 260.26 695.13C259.65 695.32 259.16 695.63 258.77 696.06L258.79 696.04Z" fill="#2C2C2C"/>
            <path d="M238.82 696.87L240.38 696.67L241.97 709.18L240.41 709.38L238.82 696.87Z" fill="#2C2C2C"/>
            <path d="M210.53 708.15L213.98 698.76L215.76 698.87L217.31 706.24L219.91 699.13L221.67 699.23L223.77 708.99L222.1 708.88L220.61 700.96L217.96 708.62L216.2 708.51L214.7 700.63L212.21 708.26L210.53 708.15Z" fill="#2C2C2C"/>
            <path d="M202.06 698.92L206.01 699.64L207.04 697.84L208.66 698.14L203.55 706.97L201.76 706.64L200.11 696.57L201.74 696.87L202.07 698.92H202.06ZM202.27 700.27L203 704.94L205.35 700.84L202.27 700.28V700.27Z" fill="#2C2C2C"/>
            <path d="M188.31 703.32L188.66 702.08L191.12 702.77L193.36 694.77L194.87 695.19L192.63 703.19L195.1 703.88L194.75 705.12L188.3 703.32H188.31Z" fill="#2C2C2C"/>
            <path d="M184.85 699.84C184.17 700.38 183.41 700.7 182.56 700.82C181.71 700.94 180.87 700.84 180.04 700.52C179.09 700.15 178.33 699.59 177.77 698.83C177.21 698.08 176.93 697.2 176.93 696.22L178.69 696.9C178.74 697.46 178.92 697.94 179.25 698.33C179.57 698.72 180 699.02 180.54 699.23C181.13 699.46 181.71 699.53 182.28 699.44C182.85 699.35 183.36 699.11 183.81 698.72C184.26 698.32 184.62 697.8 184.88 697.14C185.14 696.48 185.23 695.85 185.16 695.25C185.09 694.65 184.88 694.13 184.52 693.68C184.16 693.23 183.69 692.89 183.09 692.66C182.55 692.45 182.03 692.38 181.53 692.45C181.03 692.52 180.57 692.75 180.16 693.13L178.4 692.45C179.07 691.72 179.86 691.27 180.78 691.1C181.7 690.92 182.64 691.02 183.59 691.39C184.43 691.72 185.12 692.21 185.67 692.87C186.21 693.53 186.55 694.29 186.69 695.14C186.83 695.99 186.73 696.86 186.39 697.73C186.05 698.61 185.54 699.31 184.87 699.85L184.85 699.84Z" fill="#2C2C2C"/>
            <path d="M164.89 693.35L169.27 684.82L170.67 685.54L168.75 689.27L172.76 691.33L174.68 687.6L176.08 688.32L171.7 696.85L170.3 696.13L172.18 692.47L168.17 690.41L166.29 694.07L164.89 693.35Z" fill="#2C2C2C"/>
            <path d="M150.6 684.09L151.34 683.04L153.42 684.51L158.22 677.73L159.5 678.64L154.7 685.42L156.8 686.9L156.06 687.95L150.6 684.09Z" fill="#2C2C2C"/>
            <path d="M141.36 676.48L147.59 669.19L148.79 670.21L146.06 673.4L149.49 676.33L152.22 673.14L153.42 674.16L147.19 681.45L145.99 680.43L148.66 677.3L145.23 674.37L142.56 677.5L141.36 676.48Z" fill="#2C2C2C"/>
            <path d="M137.72 671.17L139.73 669.2L137.41 666.83L138.33 665.93L140.65 668.3L142.75 666.24L140.15 663.58L141.07 662.68L144.78 666.47L137.91 673.19L134.2 669.4L135.12 668.5L137.72 671.16V671.17Z" fill="#2C2C2C"/>
            <path d="M122.33 654.71L132.18 651.89L133.26 653.35L127.71 661.97L126.71 660.62L131.43 653.59L123.32 656.04L122.33 654.71Z" fill="#2C2C2C"/>
            <path d="M119.38 650.06L127.49 644.94L128.33 646.27L120.22 651.39L119.38 650.06Z" fill="#2C2C2C"/>
            <path d="M114.73 640.67C114.72 639.81 114.93 639.02 115.38 638.31C115.83 637.6 116.48 637.01 117.34 636.55C118.2 636.09 119.05 635.88 119.88 635.91C120.71 635.94 121.47 636.21 122.17 636.71C122.87 637.21 123.46 637.91 123.94 638.81L125.41 641.58L116.94 646.08L115.47 643.31C114.99 642.41 114.74 641.53 114.73 640.67ZM120.79 637.56C119.97 637.32 119.08 637.45 118.1 637.97C117.12 638.49 116.49 639.17 116.22 639.99C115.95 640.81 116.08 641.72 116.6 642.71L117.33 644.09L123.53 640.79L122.8 639.41C122.27 638.42 121.6 637.8 120.78 637.56H120.79Z" fill="#2C2C2C"/>
            <path d="M111.86 632.95L114.45 631.86L113.17 628.81L114.35 628.31L115.64 631.36L118.35 630.22L116.9 626.79L118.08 626.29L120.13 631.17L111.28 634.89L109.23 630.01L110.41 629.51L111.86 632.94V632.95Z" fill="#2C2C2C"/>
            <path d="M115.64 621.11C115.46 621.95 115.08 622.69 114.5 623.33C113.92 623.97 113.17 624.43 112.28 624.71C111.39 624.99 110.52 625.03 109.67 624.84C108.83 624.65 108.1 624.25 107.47 623.66C106.85 623.07 106.4 622.35 106.14 621.5C105.87 620.64 105.82 619.79 106 618.95C106.18 618.11 106.55 617.37 107.14 616.74C107.72 616.11 108.46 615.65 109.36 615.37C110.26 615.09 111.13 615.04 111.97 615.23C112.82 615.42 113.55 615.81 114.17 616.4C114.79 616.99 115.24 617.72 115.51 618.58C115.78 619.43 115.82 620.28 115.65 621.12L115.64 621.11ZM113.28 617.49C112.86 617.1 112.34 616.86 111.75 616.75C111.16 616.64 110.52 616.7 109.84 616.91C109.16 617.12 108.61 617.44 108.19 617.87C107.76 618.3 107.49 618.79 107.37 619.35C107.25 619.91 107.28 620.49 107.47 621.1C107.66 621.71 107.97 622.2 108.39 622.59C108.81 622.98 109.32 623.23 109.91 623.34C110.5 623.45 111.14 623.4 111.81 623.19C112.49 622.98 113.04 622.66 113.47 622.23C113.9 621.8 114.18 621.31 114.31 620.75C114.44 620.19 114.41 619.61 114.22 619C114.03 618.39 113.72 617.9 113.3 617.51L113.28 617.49Z" fill="#2C2C2C"/>
            <path d="M112.52 597.53L112.71 599.09L100.19 600.64L100 599.08L112.52 597.53Z" fill="#2C2C2C"/>
            <path d="M101.32 569.23L110.7 572.7L110.58 574.48L103.2 576.01L110.3 578.63L110.2 580.39L100.44 582.47L100.55 580.8L108.48 579.34L100.83 576.67L100.95 574.91L108.84 573.43L101.22 570.92L101.33 569.24L101.32 569.23Z" fill="#2C2C2C"/>
            <path d="M110.57 560.77L109.84 564.72L111.64 565.76L111.34 567.38L102.52 562.25L102.85 560.46L112.92 558.84L112.62 560.47L110.57 560.79V560.77ZM109.23 560.97L104.56 561.69L108.65 564.05L109.22 560.97H109.23Z" fill="#2C2C2C"/>
            <path d="M106.21 547.01L107.44 547.36L106.74 549.82L114.73 552.08L114.3 553.59L106.31 551.33L105.61 553.8L104.38 553.45L106.2 547.01H106.21Z" fill="#2C2C2C"/>
            <path d="M109.7 543.56C109.16 542.88 108.84 542.12 108.72 541.27C108.6 540.42 108.71 539.58 109.03 538.75C109.4 537.8 109.97 537.04 110.72 536.49C111.48 535.93 112.35 535.65 113.34 535.65L112.65 537.41C112.09 537.46 111.61 537.64 111.22 537.96C110.83 538.28 110.53 538.71 110.32 539.25C110.09 539.84 110.02 540.42 110.1 540.99C110.18 541.56 110.42 542.07 110.82 542.52C111.22 542.98 111.74 543.33 112.4 543.59C113.06 543.85 113.69 543.94 114.29 543.88C114.89 543.81 115.41 543.6 115.86 543.24C116.31 542.88 116.65 542.41 116.88 541.82C117.09 541.28 117.16 540.76 117.09 540.26C117.02 539.76 116.79 539.3 116.41 538.88L117.1 537.12C117.83 537.79 118.27 538.58 118.45 539.51C118.63 540.44 118.52 541.37 118.15 542.32C117.82 543.16 117.33 543.85 116.67 544.39C116.01 544.93 115.25 545.27 114.4 545.4C113.55 545.54 112.68 545.43 111.81 545.09C110.94 544.75 110.23 544.24 109.7 543.56Z" fill="#2C2C2C"/>
            <path d="M116.26 523.6L124.78 528.01L124.06 529.41L120.33 527.48L118.25 531.49L121.97 533.42L121.25 534.82L112.73 530.41L113.45 529.01L117.1 530.9L119.18 526.89L115.53 525L116.25 523.6H116.26Z" fill="#2C2C2C"/>
            <path d="M125.54 509.36L126.59 510.1L125.11 512.18L131.88 517L130.97 518.28L124.2 513.46L122.71 515.55L121.66 514.81L125.54 509.36Z" fill="#2C2C2C"/>
            <path d="M133.18 500.15L140.45 506.4L139.42 507.59L136.24 504.85L133.3 508.27L136.48 511.01L135.45 512.2L128.18 505.95L129.21 504.76L132.33 507.44L135.27 504.02L132.15 501.34L133.18 500.15Z" fill="#2C2C2C"/>
            <path d="M138.52 496.5L140.48 498.52L142.86 496.21L143.75 497.13L141.37 499.44L143.42 501.55L146.09 498.95L146.98 499.87L143.18 503.56L136.48 496.67L140.28 492.98L141.17 493.9L138.5 496.5H138.52Z" fill="#2C2C2C"/>
            <path d="M155.03 481.17L157.82 491.03L156.35 492.11L147.75 486.53L149.11 485.53L156.13 490.27L153.7 482.15L155.03 481.17Z" fill="#2C2C2C"/>
            <path d="M159.69 478.23L164.79 486.35L163.46 487.19L158.36 479.07L159.69 478.23Z" fill="#2C2C2C"/>
            <path d="M169.09 473.6C169.95 473.59 170.74 473.81 171.45 474.26C172.16 474.71 172.75 475.37 173.2 476.23C173.65 477.09 173.87 477.94 173.83 478.77C173.79 479.6 173.53 480.36 173.03 481.06C172.53 481.76 171.83 482.34 170.92 482.82L168.15 484.28L163.67 475.8L166.44 474.34C167.34 473.86 168.23 473.62 169.09 473.6ZM172.18 479.67C172.43 478.85 172.29 477.96 171.77 476.98C171.25 476 170.58 475.37 169.76 475.09C168.94 474.82 168.03 474.94 167.04 475.47L165.66 476.2L168.94 482.41L170.32 481.68C171.31 481.16 171.93 480.49 172.18 479.67Z" fill="#2C2C2C"/>
            <path d="M176.8 470.77L177.88 473.37L180.94 472.09L181.43 473.27L178.37 474.55L179.5 477.26L182.94 475.82L183.43 477L178.54 479.04L174.84 470.18L179.73 468.14L180.22 469.32L176.78 470.76L176.8 470.77Z" fill="#2C2C2C"/>
            <path d="M188.63 474.58C187.79 474.4 187.05 474.02 186.41 473.43C185.77 472.84 185.31 472.1 185.03 471.2C184.75 470.3 184.71 469.44 184.91 468.59C185.11 467.75 185.5 467.02 186.09 466.4C186.68 465.78 187.4 465.34 188.26 465.07C189.12 464.8 189.97 464.76 190.81 464.94C191.65 465.12 192.39 465.5 193.02 466.08C193.65 466.66 194.11 467.4 194.39 468.3C194.67 469.2 194.71 470.07 194.52 470.91C194.33 471.75 193.94 472.49 193.34 473.11C192.75 473.73 192.02 474.18 191.16 474.44C190.31 474.7 189.46 474.75 188.62 474.57L188.63 474.58ZM192.26 472.23C192.65 471.81 192.9 471.3 193.01 470.7C193.12 470.1 193.07 469.47 192.86 468.79C192.65 468.11 192.33 467.56 191.91 467.13C191.49 466.7 190.99 466.43 190.43 466.3C189.87 466.18 189.29 466.21 188.68 466.39C188.07 466.58 187.58 466.88 187.18 467.3C186.78 467.72 186.54 468.23 186.43 468.82C186.32 469.41 186.37 470.05 186.58 470.72C186.79 471.4 187.11 471.95 187.53 472.38C187.96 472.81 188.45 473.09 189.01 473.22C189.57 473.35 190.15 473.32 190.76 473.13C191.37 472.94 191.86 472.64 192.25 472.21L192.26 472.23Z" fill="#2C2C2C"/>
            <path d="M212.23 471.52L210.67 471.71L209.16 459.19L210.72 459L212.23 471.52Z" fill="#2C2C2C"/>
            </g>
            <g clipPath="url(#paint2_angular_4_1261_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0 0.09 -0.09 0 225 584)"><foreignObject x="-1011.11" y="-1011.11" width="2022.22" height="2022.22"><div xmlns="http://www.w3.org/1999/xhtml" style={{background:"conic-gradient(from 90deg,rgba(34, 34, 34, 1) 0deg,rgba(22, 22, 22, 1) 18.9599deg,rgba(72, 72, 72, 1) 63.0662deg,rgba(72, 72, 72, 1) 121.643deg,rgba(22, 22, 22, 1) 195deg,rgba(72, 72, 72, 1) 257.241deg,rgba(72, 72, 72, 1) 300.57deg,rgba(34, 34, 34, 1) 360deg)",height:"100%",width:"100%",opacity:"1"}}></div></foreignObject></g></g><circle cx="225" cy="584" r="90" data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.086274512112140656,&#34;g&#34;:0.086274512112140656,&#34;b&#34;:0.086274512112140656,&#34;a&#34;:1.0},&#34;position&#34;:0.052666336297988892},{&#34;color&#34;:{&#34;r&#34;:0.28235295414924622,&#34;g&#34;:0.28235295414924622,&#34;b&#34;:0.28235295414924622,&#34;a&#34;:1.0},&#34;position&#34;:0.17518389225006104},{&#34;color&#34;:{&#34;r&#34;:0.28235295414924622,&#34;g&#34;:0.28235295414924622,&#34;b&#34;:0.28235295414924622,&#34;a&#34;:1.0},&#34;position&#34;:0.33789813518524170},{&#34;color&#34;:{&#34;r&#34;:0.086274512112140656,&#34;g&#34;:0.086274512112140656,&#34;b&#34;:0.086274512112140656,&#34;a&#34;:1.0},&#34;position&#34;:0.54166668653488159},{&#34;color&#34;:{&#34;r&#34;:0.28235295414924622,&#34;g&#34;:0.28235295414924622,&#34;b&#34;:0.28235295414924622,&#34;a&#34;:1.0},&#34;position&#34;:0.71455931663513184},{&#34;color&#34;:{&#34;r&#34;:0.28235295414924622,&#34;g&#34;:0.28235295414924622,&#34;b&#34;:0.28235295414924622,&#34;a&#34;:1.0},&#34;position&#34;:0.83491641283035278}],&#34;stopsVar&#34;:[],&#34;transform&#34;:{&#34;m00&#34;:1.1021821408568715e-14,&#34;m01&#34;:-180.0,&#34;m02&#34;:315.0,&#34;m10&#34;:180.0,&#34;m11&#34;:1.1021821408568715e-14,&#34;m12&#34;:494.0},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"/>
            <circle cx="225" cy="584" r="99.5" stroke="url(#paint3_linear_4_1261)"/>
            <path d="M240.648 582.933L218.152 569.185C217.962 569.069 217.745 569.006 217.523 569.002C217.301 568.998 217.082 569.053 216.889 569.161C216.695 569.27 216.534 569.428 216.421 569.62C216.309 569.812 216.25 570.03 216.25 570.252V597.748C216.25 597.97 216.309 598.188 216.421 598.38C216.534 598.572 216.695 598.73 216.889 598.838C217.082 598.947 217.301 599.002 217.523 598.998C217.745 598.994 217.962 598.931 218.152 598.815L240.648 585.067C240.831 584.955 240.982 584.798 241.087 584.611C241.191 584.425 241.246 584.214 241.246 584C241.246 583.786 241.191 583.575 241.087 583.388C240.982 583.202 240.831 583.045 240.648 582.933Z" fill="white"/>
            <defs>
            <clipPath id="paint2_angular_4_1261_clip_path"><circle cx="225" cy="584" r="90"/></clipPath><linearGradient id="paint0_linear_4_1261" x1="407.667" y1="882.613" x2="135.225" y2="526.689" gradientUnits="userSpaceOnUse">
            <stop offset="0.2" stopColor="white"/>
            <stop offset="0.731987" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear_4_1261" x1="-5.49998" y1="143.894" x2="365.127" y2="721.002" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0"/>
            <stop offset="1" stopColor="white"/>
            </linearGradient>
            <linearGradient id="paint3_linear_4_1261" x1="291.8" y1="484" x2="172.6" y2="671.2" gradientUnits="userSpaceOnUse">
            <stop stopColor="white"/>
            <stop offset="1" stopColor="#C5D6F1"/>
            </linearGradient>
            <clipPath id="clip0_4_1261">
            <rect width="250.29" height="250.38" fill="white" transform="translate(100 459)"/>
            </clipPath>
            </defs>
            </svg>
        </div>
        <Image className="width-anime" src="/images/hero-graph.png" alt="" width={942} height={528}/>
      </div>
     </div>
    </section>
    {/* email subscription */}
    <section className="w-full xl:container mx-auto py-12 relative z-2">
    <div className="w-full flex flex-col items-center justify-center w-full p-6 bg-[#FFF] rounded-xl placeholder:text-base placeholder:text-lg text-[#A5A4A1] shadow-[0px_10px_50px_5px_#0000000D]">
      <div className="w-full flex flex-col md:flex-row gap-4 w-full">
        <div className="w-[35%]">
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-4 border-[1.5px] border-[#A5A4A1] rounded-xl placeholder:text-base placeholder:text-lg text-[#A5A4A1] focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        </div>
        <div className="w-[35%]">
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full p-4 border-[1.5px] border-[#A5A4A1] rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        </div>
        <div className="w-[27%]">
        <button className="w-full px-6 py-4 bg-black text-white font-medium rounded-xl flex items-center justify-center transition hover:bg-gray-900">
          Subscribe 
          <span className="ml-2">
            <svg width="42" height="16" viewBox="0 0 42 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM41.7071 8.70711C42.0976 8.31658 42.0976 7.68342 41.7071 7.29289L35.3431 0.928932C34.9526 0.538408 34.3195 0.538408 33.9289 0.928932C33.5384 1.31946 33.5384 1.95262 33.9289 2.34315L39.5858 8L33.9289 13.6569C33.5384 14.0474 33.5384 14.6805 33.9289 15.0711C34.3195 15.4616 34.9526 15.4616 35.3431 15.0711L41.7071 8.70711ZM1 9H41V7H1V9Z" fill="white"/>
            </svg>
          </span>
        </button>
        </div>
      </div>
      <p className="text-base text-[#2C2C2C] font-poppinsRegular mt-5">
        We will never share your information, and you can unsubscribe at any
        time. View our privacy policy {" "}
        <a href="/policy" className="underline">
         here
        </a>
      </p>
    </div>
    </section>
    <section className="w-full xl:container mx-auto border-b border-b-[#000] xl:py-16">
        <h2 className="text-[#2C2C2C] text-center text-5xl font-grotesqueExtrabold">Our next explosive stock alert is coming in</h2>
        <div className="flex items-center justify-center gap-32 mt-12">
            <div className="flex flex-col items-center gap-y-2">
                <p className="text-[#2C2C2C] text-5xl font-grotesqueExtrabold">{days}</p>
                <p className="text-[#2C2C2C] font-poppinsRegular text-base">Days</p>
            </div>
            <div className="flex flex-col items-center gap-y-2">
                <p className="text-[#2C2C2C] text-5xl font-grotesqueExtrabold">{hours}</p>
                <p className="text-[#2C2C2C] font-poppinsRegular text-base">Hours</p>
            </div>
            <div className="flex flex-col items-center gap-y-2">
                <p className="text-[#2C2C2C] text-5xl font-grotesqueExtrabold">{minutes}</p>
                <p className="text-[#2C2C2C] font-poppinsRegular text-base">Minutes</p>
            </div>
            <div className="flex flex-col items-center gap-y-2">
                <p className="text-[#2C2C2C] text-5xl font-grotesqueExtrabold">{seconds}</p>
                <p className="text-[#2C2C2C] font-poppinsRegular text-base">Seconds</p>
            </div>
        </div>
    </section>
    <section className="w-full xl:container mx-auto border-b border-b-[#000]">
        <h2 className="text-center text-5xl font-grotesqueExtrabold">
            Why our members consistently beat the street
        </h2>
        <p className="text-center">
        Proven track record backed by over 80 years of financial expertise
        </p>
        <div className="flex items-center flex-wrap justify-between text-center">
            <div className="xl:w-[23%] md:w-[40%] w-[100%] flex flex-col items-center gap-y-2">
                <Image className="w-[30%]" src="/images/analysis.gif" alt="analysis" width={300} height={300} />
                <h3 className="text-[#2C2C2C] xl:text-[1.3rem] text-2xl font-grotesqueBold">Advanced Reporting Analysis</h3>
                <p className="font-poppinsRegular text-xs">
                    Our stock experts tap into billions of digital data points to help find the next explosive stock pick.
                </p>
            </div>
            <div className="xl:w-[23%] md:w-[40%] w-[100%]">
                <h3 className="text-[#2C2C2C] xl:text-[1.3rem] text-2xl font-grotesqueBold">Real-Time Stock Alerts</h3>
                <p>
                    Daily alerts to help you take your trading to the next level. Be the first to know about market changes.
                </p>
            </div>
            <div className="xl:w-[23%] md:w-[40%] w-[100%]">
                <h3 className="text-[#2C2C2C] xl:text-[1.3rem] text-2xl font-grotesqueBold">Backed by Experience</h3>
                <p>
                    Our financial analysts have over 80 years experience forecasting off of historical stock market trends.
                </p>
            </div>
            <div className="xl:w-[23%] md:w-[40%] w-[100%]">
                <h3 className="text-[#2C2C2C] xl:text-[1.3rem] text-2xl font-grotesqueBold">Limited-Time Access</h3>
                <p>Join over 700K subscribers who have gained from our alerts. New subscriber spots are limited – Sign up today!</p>
            </div>
        </div>
    </section>
    {/* testimonials */}
    <section className="w-full xl:container mx-auto py-20">
        <div className="mb-10">
            <h2 className="text-center text-5xl font-grotesqueExtrabold">Real Testimonials - Latest Subscribers</h2>
        </div>
        <Swiper navigation={true} loop={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide className="">
            <div className="w-full flex flex-col items-center gap-y-2">
            <Image className="w-[9%]" src="/images/user-1.png" alt="user" width={150} height={150} />
            <p className="text-[#2C2C2C] xl:text-3xl font-grotesqueSemibold">Sebastian, Philadelphia</p>
            <Image className="mb-2" src="images/rating-star.svg" alt="rating" width={160} height={24} />
            <p className="text-center w-[50%] text-base">
                {`Guys thank you so much for hitting the ball out of the park on your last alert! 
                I've been trading for four months now and your alert helped me book my first real profit. 
                Before your alert the biggest profit I made was about 5%. With yours I made 210% and 
                came out with $6,620 in profit. You just paid for my next vacation!`}
            </p>
            </div>
        </SwiperSlide>
        <SwiperSlide className="text-center">
        <div className="w-full flex flex-col items-center gap-y-2">
            <Image className="w-[9%]" src="/images/user-1.png" alt="user" width={150} height={150} />
            <p className="text-[#2C2C2C] xl:text-3xl font-grotesqueSemibold">Sebastian, Philadelphia</p>
            <Image className="mb-2" src="images/rating-star.svg" alt="rating" width={160} height={24} />
            <p className="text-center w-[50%] text-base">
                {`Guys thank you so much for hitting the ball out of the park on your last alert! 
                I've been trading for four months now and your alert helped me book my first real profit. 
                Before your alert the biggest profit I made was about 5%. With yours I made 210% and 
                came out with $6,620 in profit. You just paid for my next vacation!`}
            </p>
            </div>
        </SwiperSlide>
        <SwiperSlide className="text-center">
        <div className="w-full flex flex-col items-center gap-y-2">
            <Image className="w-[9%]" src="/images/user-1.png" alt="user" width={150} height={150} />
            <p className="text-[#2C2C2C] xl:text-3xl font-grotesqueSemibold">Sebastian, Philadelphia</p>
            <Image className="mb-2" src="images/rating-star.svg" alt="rating" width={160} height={24} />
            <p className="text-center w-[50%] text-base">
                {`Guys thank you so much for hitting the ball out of the park on your last alert! 
                I've been trading for four months now and your alert helped me book my first real profit. 
                Before your alert the biggest profit I made was about 5%. With yours I made 210% and 
                came out with $6,620 in profit. You just paid for my next vacation!`}
            </p>
            </div>
        </SwiperSlide>
        <SwiperSlide className="text-center">
        <div className="w-full flex flex-col items-center gap-y-2">
            <Image className="w-[9%]" src="/images/user-1.png" alt="user" width={150} height={150} />
            <p className="text-[#2C2C2C] xl:text-3xl font-grotesqueSemibold">Sebastian, Philadelphia</p>
            <Image className="mb-2" src="images/rating-star.svg" alt="rating" width={160} height={24} />
            <p className="text-center w-[50%] text-base">
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
        <div className='w-full flex items-center gap-y-4 justify-between max-lg:flex-col lg:pt-8'>
          <div className='w-full'>
            <h2 className='text-center text-5xl font-grotesqueExtrabold'>The Lowdown on Penny Stocks</h2>
            <p className="text-center">What Wall St. doesn’t want you to know about penny stocks.</p>
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
                className="faq-toggle text-[#2C2C2C] flex justify-between items-center w-full px-6 py-4 font-grotesqueBold xl:text-3xl md:text-xl text-lg text-left"
              >
                <span>{faq.question}</span>
                <span>
                {
                    activeIndex === index ? <div>
                    <svg width="25" height="4" viewBox="0 0 30 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="25" height="4" rx="2" fill="#2C2C2C"/>
                    </svg>
                    </div>: 
                    <div><svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="18" width="30" height="4" rx="2" fill="#2C2C2C"/>
                    <rect x="22" y="5" width="30" height="4" rx="2" transform="rotate(90 22 5)" fill="#2C2C2C"/>
                    </svg>
                    </div>
                  }
                </span>
              </button>
              <div
                className={`faq-content px-6 text-[#2C2C2C] text-primaryTextColor font-poppinsRegular text-base transition-all duration-600 overflow-hidden ${
                  activeIndex === index ? "max-h-screen pb-6" : "max-h-0"
                }`}
                style={{ maxHeight: activeIndex === index ? "600px" : "0" }}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
)

}
export default Homepage;