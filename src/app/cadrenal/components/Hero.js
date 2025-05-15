import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container flex md:flex-row flex-col justify-between sm:py-16 py-8 relative'>
        <div className='md:w-[60%] w-full'>
          <h1 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
            (Nasdaq: CVKD): The Under-$50M Market Cap Stock Targeting a Billion-Dollar
            <span className='font-RomanItalic'> Cardiovascular Problem</span>
          </h1>
        </div>
        <div className='lg:w-[32.5%] md:w-[35%] sm:w-[60%] w-full pt-4 flex flex-col items-start xl:gap-12 gap-6'>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[130%]'>Cadrenal Therapeutics <span className='font-medium italic text-[#383838]'> (NASDAQ: CVKD) </span> Is Redefining Cardiovascular Safety With The Only Drug Designed Specifically For Patients With LVAD, ESKD + AFib, And MHV.
          </p>
          <Link href='/cvkd' className='px-5 py-3 rounded-full flex items-center gap-2 font-inter text-white bg-cvkdButton font-medium text-base'>
            Why CVKD
            <Image width={24} height={24} src='/images/arrow-up-right.svg' alt='arrow' />
          </Link>
        </div>
      </div>
  );
}