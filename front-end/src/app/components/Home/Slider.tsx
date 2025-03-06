'use client';

import { Box } from '@mui/material';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const images = [
  '/banners/banner_1.png',
  '/banners/banner_2.png',
  '/banners/banner_3.png',
];

function Slider() {
  return (
    <Box
      sx={{
        width: '100%',
        height: {xs: '200px', md: '500px'},
        margin: '0 auto',
        overflow: 'hidden',
        borderRadius: '8px',
      }}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        style={{ width: '100%', height: '100%' }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={src}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default Slider;
