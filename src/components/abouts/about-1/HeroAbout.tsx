 

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function HeroAbout() {
  return (
    <section className="wionabout-section1 wiondefault-bg">
      <div className="container">
        <div className="wionsection-title center">
          <div
            className="wionsub-title aos-init"
            data-aos-delay="400"
            data-aos="fade-up"
          >
            <p>Our successful journey started right here</p>
          </div>
          <h1
            className="aos-init"
            data-aos-delay="500"
            data-aos="fade-up"
          >
            Our Story
          </h1>
        </div>

        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          loop={true}
          speed={2500}
          centeredSlides={true}
          slidesPerView={3}
          initialSlide={3}
          preventClicks={false}
          preventClicksPropagation={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 3,
            depth: 395,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            767: {
              slidesPerView: 1,
            },
            991: {
              slidesPerView: 2.24,
            },
          }}
          className="wionabout-thumb-slider"
        >
          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb5.png)`,
            }}
          />
          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb6.png)`,
            }}
          />
          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb7.png)`,
            }}
          />
          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb8.png)`,
            }}
          />
          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb9.png)`,
            }}
          />


          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb5.png)`,
            }}
          />
          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb6.png)`,
            }}
          />
          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb7.png)`,
            }}
          />
          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb8.png)`,
            }}
          />
          <SwiperSlide
            className="swiper-slide section"
            style={{
              backgroundImage: `url(/assets/images/about/thumb9.png)`,
            }}
          />

        </Swiper>
      </div>
    </section>
  );
}
