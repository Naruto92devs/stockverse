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

const HeroSlider = () => {

    // true when viewport ≥ 768px
    const isMd = useMediaQuery('(min-width: 768px)');

  
    return (
        <div className="w-full project-slider">
            <Swiper
            slidesPerView={'auto'}
            spaceBetween={15}
            // navigation={true}
            // pagination={{
            //   type:'progressbar',
            // }}
            navigation={{
              prevEl: '.custom-nav .swiper-button-prev',
              nextEl: '.custom-nav .swiper-button-next'
            }}
            pagination={{
              el: '.custom-nav .swiper-pagination',
              type: 'progressbar'
            }}
            slideToClickedSlide={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            >
              <SwiperSlide id='slide-bg' className="swiper-project-slide sm:!w-auto !w-[100%]">
                <Image className='img' width={505} height={362} src='/images/cvkd/hero_slide1.jpg' alt='logo'/>
              </SwiperSlide>
              <SwiperSlide id='slide-bg' className="swiper-project-slide sm:!w-auto !w-[100%]">
                <Image className='img' width={505} height={362} src='/images/cvkd/hero_slide2.jpg' alt='logo'/>
              </SwiperSlide>  
              <SwiperSlide id='slide-bg' className="swiper-project-slide sm:!w-auto !w-[100%]">
                <Image className='img' width={505} height={362} src='/images/cvkd/hero_slide3.jpg' alt='logo'/>
              </SwiperSlide>
              {isMd && (
                <SwiperSlide className="swiper-project-slide sm:!w-auto !w-[100%] !opacity-0">
                  <Image className="img" width={505} height={362} src="/images/cvkd/hero_slide3.jpg" alt="extra slide"/>
                </SwiperSlide>
              )}
            </Swiper>

            {/* 2) Your own nav + pagination wrapper */}
            <div className="custom-nav !relative w-full md:pt-20 pt-2 flex md:flex-row flex-col md:items-start items-center gap-12">
              <div className="swiper-pagination flex-grow w-full !relative"></div>
              <div className='buttons flex-none relative flex items-center gap-12'>
                <button className="!w-max swiper-button-prev !relative">
                  <Image width={48} height={48} src='/images/cvkd/prev.svg' alt='logo'/>
                </button>
                <button className="!w-max swiper-button-next !relative">
                  <Image width={48} height={48} src='/images/cvkd/next.svg' alt='logo'/>
                </button>
              </div>
            </div>
        </div>
    );
}

export default HeroSlider;