import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MainSlide = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      style={{
        "--swiper-pagination-color": "lavender",
        "--swiper-navigation-color": "turquoise",
      }}
    >
      <SwiperSlide className="mainImg">
        <img src="img/mainslide/slide1.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide className="mainImg">
        <img src="img/mainslide/slide2.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide className="mainImg">
        <img src="img/mainslide/slide3.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide className="mainImg">
        <img src="img/mainslide/slide4.jpg" alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSlide;
