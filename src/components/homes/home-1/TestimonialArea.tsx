
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 

const setting = {
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};


const TestimonialArea = () => {
  return (
    <div className="wiondefault-bg">
      <div className="wiont-section section" style={{ backgroundImage: 'url(/assets/images/testimonial/t-bg.png)' }}>
        <div className="container">
          <div className="wionsection-title">
            <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
              <p>Why Choose Us</p>
            </div>
            <h2 className="aos-init" data-aos-delay="500" data-aos="fade-up">CP Nails Spa</h2>
          </div>
        </div>
        <div className="slick-wrapper">
          <Slider {...setting} className="slick-slide-active grid mcs-horizontal">
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“Our special treatments are created from pure natural herbs, offering a soothing experience that’s 100% safe for your skin. Every step is designed with care, bringing you calm, comfort, and visible results. Clients often tell us they immediately feel the purity and gentleness in each treatment the moment they walk through our doors.”</h4>
                </div>
                {/* <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t1.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Sarah Lin</h6>
                    <p>Founder, Zenvue (Meditation App)</p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“What truly sets us apart is how unique our services feel compared to other spa treatments. From the techniques we use to the atmosphere we create, everything is thoughtfully crafted to deliver something refreshing and exceptional. Many guests say this distinct experience is what keeps them coming back.”</h4>
                </div>
                {/* <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t2.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Amira Nasri</h6>
                    <p>Owner, Lunara Studio (Interior Design)</p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“Our products are carefully selected and refined through SpaLabs-quality standards, ensuring they’re both effective and luxurious. Each formula is designed to nourish, protect, and elevate your natural beauty. Clients consistently praise the noticeable improvements and the premium feel of every session.”</h4>
                </div>
                {/* <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t1.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Sarah Lin</h6>
                    <p>Founder, Zenvue (Meditation App)</p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“Our promise is simple: uncompromising cleanliness and conscious beauty. With specialized pure-lab sterilization and absolutely no whirlpool spa chairs, we prioritize your safety, comfort, and peace of mind. Many clients say they chose us because they trust the integrity and mindfulness behind everything we do.”</h4>
                </div>
                {/* <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t1.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Sarah Lin</h6>
                    <p>Founder, Zenvue (Meditation App)</p>
                  </div>
                </div> */}
              </div>
            </div>
          </Slider>
 
        </div>
      </div>
    </div>
  );
};

export default TestimonialArea;