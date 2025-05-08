import Image from 'next/image';

export default function KeyInfo() {

  return (
    <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container flex flex-col items-center gap-12 py-24 relative'>
      <h2 className='text-center font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
        Key information about CVKD
      </h2>
      <div className='w-full flex flex-wrap justify-between gap-y-4'>
        <div className='lg:w-[24%] md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
          <Image width={45} height={45} src='/images/cvkd/info1.svg' alt='logo' />
          <h4 className='font-inter font-medium text-2xl text-black'>Ticker</h4>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>NASDAQ: CVKD</p>
        </div>
        <div className='lg:w-[24%] md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
          <Image width={45} height={45} src='/images/cvkd/info2.svg' alt='logo' />
          <h4 className='font-inter font-medium text-2xl text-black'>Lead Asset</h4>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Tecarfarin (oral VKA)</p>
        </div>
        <div className='lg:w-[24%] md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
          <Image width={45} height={45} src='/images/cvkd/info3.svg' alt='logo' />
          <h4 className='font-inter font-medium text-2xl text-black'>Primary Indication</h4>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>LVAD Anticoagulation</p>
        </div>
        <div className='lg:w-[24%] md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
          <Image width={45} height={45} src='/images/cvkd/info4.svg' alt='logo' />
          <h4 className='font-inter font-medium text-2xl text-black'>FDA Status</h4>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Fast Track and Orphan Drug (2x)</p>
        </div>
        <div className='md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
          <Image width={45} height={45} src='/images/cvkd/info5.svg' alt='logo' />
          <h4 className='font-inter font-medium text-2xl text-black'>Market Size</h4>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>More than $2 billion combined peak potential across three indications</p>
        </div>
        <div className='md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
          <Image width={45} height={45} src='/images/cvkd/info6.svg' alt='logo' />
          <h4 className='font-inter font-medium text-2xl text-black'>Clinical Stage</h4>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'> Late-stage, Phase 3-ready</p>
        </div>
        <div className='md:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
          <Image width={45} height={45} src='/images/cvkd/info7.svg' alt='logo' />
          <h4 className='font-inter font-medium text-2xl text-black'>Strategic Partner</h4>
          <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Abbott, contributing to trial design, site access, and awareness</p>
        </div>
      </div>
    </div>
  );
}