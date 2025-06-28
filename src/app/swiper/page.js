'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className='w-full'>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <iframe className="w-full rounded-lg border border-[#3A3A3A]" src="https://www.youtube.com/embed/yiFp5vMa9T0?si=8PmGCoG2u2PfAXiT" title="YouTube video player" frameborder="5" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
          </iframe>
        </SwiperSlide>
        <SwiperSlide>
          <Image className='w-full' src="/images/powerful_bg.png" width={1440} height={700} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <Image className='w-full' src="/images/press-release.png" width={500} height={500} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <Image className='w-full' src="/images/press-release.png" width={500} height={500} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <Image className='w-full' src="/images/press-release.png" width={500} height={500} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <Image className='w-full' src="/images/press-release.png" width={500} height={500} alt='img' />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper w-[70%]"
      >
        <SwiperSlide>
           <iframe className="w-full rounded-lg border border-[#3A3A3A]" src="https://www.youtube.com/embed/yiFp5vMa9T0?si=8PmGCoG2u2PfAXiT" title="YouTube video player" frameborder="5" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
           </iframe>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/powerful_bg.png" width={1440} height={700} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/press-release.png" width={500} height={500} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/press-release.png" width={500} height={500} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
            <Image src="/images/press-release.png" width={500} height={500} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/press-release.png" width={500} height={500} alt='img' />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
