'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BigPharma() {
  return (
    <div className='w-full bg-[#FAFAFA]'>
      <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container py-24 flex lg:flex-row flex-col items-start justify-between lg:gap-0 gap-16 relative'>
        <div className='lg:w-[49%]'>
          <h2 className='font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
            Patients With Implanted Cardiac Devices Are Left Behind by <span className='font-RomanItalic'> Big Pharma </span>
          </h2>
          <p className='pt-14 font-inter font-normal text-lg text-[#606060] leading-[130%] capitalize'>{`Challenges faced by patients include:`}</p>
        </div>

        <div className='lg:w-[49%] '>
          <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.2, // optional delay
          }}
          viewport={{ once: true, amount: 0.6 }}
          className="flex max-sm:flex-col items-start justify-between gap-2 gap-6 px-6 py-6 border-b border-[#111111]/15">
            <div className='sm:w-[48%] flex items-center gap-6'>
              <p className='font-inter font-normal text-[#8D8D8D] text-base leading-[150%]'>(01)</p>
              <h4 className='font-inter font-medium text-2xl text-[#111111] leading-[150%]'>{`DOACs Don’t Work`}</h4>
            </div>
            <h4 className='sm:w-[48%] font-inter font-normal text-lg text-[#606060] leading-[150%]'>{`LVAD patients are not covered by DOACs, and warfarin is ineffective`}</h4>
          </motion.div>
          <motion.div 
            initial={{ scale: 1.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: 0.3, // optional delay
            }}
            viewport={{ once: true, amount: 0.6 }}
          className="flex max-sm:flex-col items-start justify-between gap-2 gap-6 px-6 py-6 border-b border-[#111111]/15">
            <div className='sm:w-[48%] flex items-center gap-6'>
              <p className='font-inter font-normal text-[#8D8D8D] text-base leading-[150%]'>(02)</p>
              <h4 className='font-inter font-medium text-2xl text-[#111111] leading-[150%]'>{`Kidney Patients Left Out`}</h4>
            </div>
            <h4 className='sm:w-[48%] font-inter font-normal text-lg text-[#606060] leading-[150%]'>{`Over 70% of kidney failure patients with AFib receive no anticoagulation due to safety concerns`}</h4>
          </motion.div>
          <motion.div 
          initial={{ scale: 1.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.4, // optional delay
          }}
          viewport={{ once: true, amount: 0.6 }}
          className="flex max-sm:flex-col items-start justify-between gap-2 gap-6 px-6 py-6 border-b border-[#111111]/15">
            <div className='sm:w-[48%] flex items-center gap-6'>
              <p className='font-inter font-normal text-[#8D8D8D] text-base leading-[150%]'>(03)</p>
              <h4 className='font-inter font-medium text-2xl text-[#111111] leading-[150%]'>{`No Options for MHV`}</h4>
            </div>
            <h4 className='sm:w-[48%] font-inter font-normal text-lg text-[#606060] leading-[150%]'>{`There are no approved therapies beyond warfarin for mechanical heart valves`}</h4>
          </motion.div>
          <motion.div 
          initial={{ scale: 1.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.5, // optional delay
          }}
          viewport={{ once: true, amount: 0.6 }}
          className="flex max-sm:flex-col items-start justify-between gap-2 gap-6 px-6 py-6 border-b border-[#111111]/15">
            <div className='sm:w-[48%] flex items-center gap-6'>
              <p className='font-inter font-normal text-[#8D8D8D] text-base leading-[150%]'>(04)</p>
              <h4 className='font-inter font-medium text-2xl text-[#111111] leading-[150%]'>{`Bleeding Still Unsolved`}</h4>
            </div>
            <h4 className='sm:w-[48%] font-inter font-normal text-lg text-[#606060] leading-[150%]'>{`Current therapies result in uncontrolled bleeding, stroke, and death — and the issue remains unaddressed`}</h4>
          </motion.div>
        </div>
      </div>
    </div>
  );
}