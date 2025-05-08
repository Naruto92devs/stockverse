'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Pagination, Navigation } from 'swiper/modules';
import './HeroSlider.css';

// simple hook to track a matchMedia query
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    // set initial value
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

const InvestorSlider = () => {

    // true when viewport ≥ 768px
    const isMd = useMediaQuery('(min-width: 768px)');

  
    return (
        <div className="w-full pt-24">
            <Swiper
            slidesPerView={'auto'}
            spaceBetween={40}
            navigation={{
              prevEl: '.custom-nav-investor .swiper-button-prev',
              nextEl: '.custom-nav-investor .swiper-button-next'
            }}
            pagination={{
              el: '.custom-nav-investor .swiper-pagination',
              type: 'progressbar'
            }}
            slideToClickedSlide={true}
            modules={[Pagination, Navigation]}
            className="mySwiper-investo"
            >
              <SwiperSlide id='slide-bg' className="swiper-project-slide sm:!w-auto !w-[100%]">
                <Image className='img rounded-lg' width={505} height={362} src='/images/cvkd/investor_slide1.jpg' alt='logo'/>
              </SwiperSlide>
              <SwiperSlide id='slide-bg' className="swiper-project-slide sm:!w-auto !w-[100%]">
                <Image className='img rounded-lg' width={505} height={362} src='/images/cvkd/investor_slide2.jpg' alt='logo'/>
              </SwiperSlide>  
              <SwiperSlide id='slide-bg' className="swiper-project-slide sm:!w-auto !w-[100%]">
                <Image className='img rounded-lg' width={505} height={362} src='/images/cvkd/investor_slide3.jpg' alt='logo'/>
              </SwiperSlide>
              {isMd && (
                <SwiperSlide className="swiper-project-slide sm:!w-auto !w-[100%] !opacity-0">
                  <Image className="img rounded-lg" width={505} height={362} src="/images/cvkd/investor_slide3.jpg" alt="extra slide"/>
                </SwiperSlide>
              )}
            </Swiper>

            {/* 2) Your own nav + pagination wrapper */}
            <div className="custom-nav-investor !relative w-full md:pt-16 pt-8 flex md:flex-row flex-col md:items-start justify-between items-center gap-12">
              {/* <div className="swiper-pagination flex-grow w-full !relative"></div> */}
              <div className='buttons pt-6 w-max relative flex items-center gap-11'>
                <button className="!w-max swiper-button-prev !relative">
                  <Image className='' width={48} height={48} src='/images/cvkd/prev1.svg' alt='logo'/>
                </button>
                <button className="!w-max swiper-button-next !relative">
                  <Image className='' width={48} height={48} src='/images/cvkd/next1.svg' alt='logo'/>
                </button>
              </div>
              <div className='md:w-[56%] sm:w-[70%] w-full'>
                <h4 className='font-RomanRegular max-md:text-center text-3xl text-white leading-[120%]'>Guidance from advisors</h4>
                <p className='md:w-[75%] pt-4 max-md:text-center font-inter font-normal text-lg text-[#CFCFCF] leading-[150%]'>Guidance from renowned scientific advisors affiliated with Duke, Harvard, and the Cleveland Clinic</p>
              </div>
            </div>
        </div>
    );
}

export default InvestorSlider;