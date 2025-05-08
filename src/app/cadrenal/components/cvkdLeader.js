import Link from 'next/link';
import Image from 'next/image';

export default function Leader() {
  return (
    <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-2 pb-16 flex md:flex-row flex-col items-start justify-between max-md:gap-18 relative'>
      <div className='md:w-[49%]'>
        <h2 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
          From Refugee to Nasdaq: Meet the <span className='font-RomanItalic'> Leader </span> Behind <span className='font-RomanItalic'> CVKD </span>
        </h2>
        <p className='pt-14 font-inter font-normal text-lg text-[#606060] leading-[130%] capitalize'>{`Quang X. Pham’s Journey Fuels Cadrenal’s Mission to Serve the Most Overlooked Patients in Cardiology`}</p>
      </div>

      <div className='md:w-[49%]'>
        <div className='flex flex-wrap items-center gap-4 pt-5'>
          <Link href='https://quangxpham.com/' className='px-5 py-3 rounded-full flex items-center gap-2 font-inter text-white bg-cvkdButton font-medium text-base'>
            Learn About Quang X. Pham
            <Image width={24} height={24} src='/images/arrow-up-right.svg' alt='arrow' />
          </Link>
          <Link href='https://a.co/d/dYZ3Li0' className='px-5 py-3 rounded-full flex items-center gap-2 font-inter text-black bg-white font-medium border border-[#D0D5DD] text-base'>
            {`Get the Book – Underdog Nation`}
            <Image className='invert' width={24} height={24} src='/images/arrow-up-right.svg' alt='arrow' />
          </Link>
        </div>
        <h3 className='font-RomanRegular text-[#1B1B1B] text-3xl pt-14'>Meet Our Founder</h3>
        <p className='pt-4 font-inter font-normal text-lg text-[#606060] leading-[150%] capitalize'>{`Quang X. Pham didn’t take the conventional route to Wall Street. He fled Vietnam as a war refugee, became the first Vietnamese American aviator in the U.S. Marine Corps, broke records in biotech sales, and took Cadrenal Therapeutics public on Nasdaq.`}</p>
        <p className='pt-6 font-inter font-normal text-lg text-[#606060] leading-[150%] capitalize'>{`Now, with Underdog Nation (published by Forbes Books), Pham shares the ER Approach™ — Effort + Results — that powers his leadership and Cadrenal’s bold mission to transform cardiovascular safety for neglected patient groups.`}</p>
        <p className='pt-12 font-interItalic font-normal text-2xl text-[#606060] leading-[150%] capitalize'>“Success {`isn’t`} reserved for the privileged — it <span className='font-medium text-[#383838]'> belongs </span> to those who <span className='font-medium text-[#383838]'> fight </span> for it.”</p>
        <p className='pt-6 font-inter font-normal text-lg text-[#606060] leading-[150%] capitalize'> — <span className='font-interItalic font-medium text-[#383838]'> Quang X. Pham, </span> CEO, Cadrenal Therapeutics (CVKD)</p>
      </div>
    </div>
  );
}