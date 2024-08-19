import React from "react";
import Helmet from "../components/Helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import heroImage1 from "../assets/images/galleries/gallery-01.jpg";
import heroImage2 from "../assets/images/galleries/gallery-02.jpg";
import heroImage3 from "../assets/images/galleries/gallery-03.jpg";
import image1 from "../assets/images/galleries/gallery-04.jpg";
import image2 from "../assets/images/galleries/gallery-05.jpg";
import image3 from "../assets/images/galleries/gallery-06.jpg";
import image4 from "../assets/images/galleries/gallery-07.jpg";

const Galleries = () => {
  return (
    <Helmet title="Galleries">
      <div className="galleries">
        <div className="galleries__hero">
          <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={500}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            <SwiperSlide>
              <img
                src={heroImage1}
                alt="Hero 1"
                className="galleries__hero-img"
              />
              <div className="galleries__hero-text">[ you only live once ]</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={heroImage2}
                alt="Hero 2"
                className="galleries__hero-img"
              />
              <div className="galleries__hero-text">[ don't hold back ]</div>
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={heroImage3}
                alt="Hero 3"
                className="galleries__hero-img"
              />
              <div className="galleries__hero-text">[ seize the day ]</div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="galleries__content">
          <div className="galleries__grid">
            <div className="galleries__grid-item">
              <img
                src={image1}
                alt="Gallery 1"
                className="galleries__grid-img"
              />
            </div>
            <div className="galleries__grid-item">
              <img
                src={image2}
                alt="Gallery 2"
                className="galleries__grid-img"
              />
            </div>
            <div className="galleries__grid-item">
              <img
                src={image3}
                alt="Gallery 3"
                className="galleries__grid-img"
              />
            </div>
            <div className="galleries__grid-item">
              <img
                src={image4}
                alt="Gallery 4"
                className="galleries__grid-img"
              />
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Galleries;
