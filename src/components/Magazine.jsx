import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Magazine = () => {
  return (
    <div className="magazine">
      <div className="container">
        <div className="titleWrap">
          <h2>Magazine</h2>
        </div>
        <div className="magazineList">
          <div className="magazine-box"></div>
          <Swiper
            modules={[Autoplay]}
            className="swiper-wrap"
            loop={true}
            spaceBetween={20}
            slidesPerView={2.5}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
          >
            <SwiperSlide className="mg-img">
              <img src="img/magazine/magazine1.png" alt="" />
            </SwiperSlide>
            <SwiperSlide className="mg-img">
              <img src="img/magazine/magazine2.png" alt="" />
            </SwiperSlide>
            <SwiperSlide className="mg-img">
              <img src="img/magazine/magazine3.png" alt="" />
            </SwiperSlide>
            <SwiperSlide className="mg-img">
              <img src="img/magazine/magazine4.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="mg-img">
              <img src="img/magazine/magazine6.png" alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Magazine;
