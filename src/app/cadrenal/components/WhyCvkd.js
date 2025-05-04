'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WhyCVKD() {

  return (
      <div className='w-full mx-auto px-4 xl:px-6 2xl:px-36 xl:container flex flex-col items-center gap-12 py-12 relative'>
        <h2 className='text-center font-RomanRegular text-[#1E1E1E] xl:text-[3.3rem] lg:text-[3.1rem] sm:text-[2.4rem] text-4xl leading-[125%]'>
          Why CVKD is Different
        </h2>
        <div className='w-full flex flex-wrap justify-between gap-y-4'>
          <motion.div 
          initial={{ opacity: 0, y: -60, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            delay: 0.2, // optional delay
          }}
          viewport={{ once: true, amount: 0.6 }} // only animates once when 80% in view
          className='lg:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info1.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Fewer Drug Interactions</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Better metabolism by bypassing the CYP450 pathway, resulting in fewer drug interactions</p>
          </motion.div>
          <motion.div 
          initial={{ opacity: 0, y: -60, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            delay: 0.3, // optional delay
          }}
          viewport={{ once: true, amount: 0.6 }} // only animates once when 80% in view
          className='lg:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info2.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Renal-Friendly Solution</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>Safer use in patients with renal failure</p>
          </motion.div>
          <motion.div 
          initial={{ opacity: 0, y: -60, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            delay: 0.4, // optional delay
          }}
          viewport={{ once: true, amount: 0.6 }} // only animates once when 80% in view
          className='lg:w-[32.3%] sm:w-[48.7%] w-full flex flex-col sm:items-start items-center max-sm:text-center gap-4 p-4 border border-black/10 rounded-lg'>
            <Image width={45} height={45} src='/images/cvkd/info4.svg' alt='logo' />
            <h4 className='font-inter font-medium text-2xl text-black'>Tailored for Rare Needs</h4>
            <p className='font-inter font-normal text-lg text-[#606060] leading-[150%]'>It is the only late-stage anticoagulant in development for LVADs and rare cardiovascular indications</p>
          </motion.div>
        </div>
      </div>
  );
}