import InvestorSlider from './InvestorSlider';

export default function Investors() {

  const text = 'Investors are closely watching CVKD for several reasons';
  
  return (
    <div className='w-full bg-[#111111]'>
    <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-24 relative'>
      <div className='w-full flex md:flex-row flex-col items-start justify-between gap-4'>
        <p className='font-inter font-normal md:text-2xl text-lg text-white leading-[150%]'>Why Investors Are Watching
        </p>
        <h4 className='md:w-[55%] w-full font-RomanRegular text-white xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[120%]'>Investors are closely watching CVKD for several reasons</h4>
      </div>
      <InvestorSlider />
    </div>
  </div>
  );
}