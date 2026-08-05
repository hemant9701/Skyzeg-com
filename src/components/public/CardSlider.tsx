"use client";

import { Children, type ReactNode } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CardSliderProps {
  children: ReactNode;
  autoplay?: boolean;
}

export default function CardSlider({
  children,
  autoplay = true,
}: CardSliderProps) {
  const slides = Children.toArray(children);

  if (!slides.length) {
    return null;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      speed={600}
      autoplay={
        autoplay
          ? {
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false
      }
      breakpoints={{
        0: {
          slidesPerView: 1.1,
          spaceBetween: 16,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      }}
      className="!pb-12"
    >
      {slides.map((child, index) => (
        <SwiperSlide key={index} className="!flex !h-auto">
          <div className="w-full">{child}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}