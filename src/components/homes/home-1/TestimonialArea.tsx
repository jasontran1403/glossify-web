
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
              <p>What people say</p>
            </div>
            <h2 className="aos-init" data-aos-delay="500" data-aos="fade-up">Testimonials</h2>
          </div>
        </div>
        <div className="slick-wrapper">
          <Slider {...setting} className="slick-slide-active grid mcs-horizontal">
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“brand that speaks directly to my audience. rking with this agency was a dream. They understood my and transformed it into a calm, elegant  The branding and UI design elevated the whole product. I’ve received countless compliments since launch.”</h4>
                </div>
                <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t1.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Sarah Lin</h6>
                    <p>Founder, Zenvue (Meditation App)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“flow of the website they created for me. I was blown away by the aesthetic and  They captured the essence of my brand with sophistication and warmth. Clients now say they chose me because of how professional and inviting my website looks!”</h4>
                </div>
                <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t2.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Amira Nasri</h6>
                    <p>Owner, Lunara Studio (Interior Design)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“They understood my and transformed it into a calm, elegant brand that Working with this agency was a dream.  speaks directly to my audience. The branding and UI design elevated the whole product. I’ve received countless compliments since launch.”</h4>
                </div>
                <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t1.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Sarah Lin</h6>
                    <p>Founder, Zenvue (Meditation App)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“transformed it into a calm, elegant brand that speaks directly  Working with this agency was a dream. They understood my and to my audience. The branding and UI design elevated the whole product. I’ve received countless compliments since launch.”</h4>
                </div>
                <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t1.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Sarah Lin</h6>
                    <p>Founder, Zenvue (Meditation App)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“website looks I was blown away by the aesthetic and flow of the website they created for me. They captured the essence of my brand with sophistication and warmth. Clients now say they chose me because of how professional and inviting my!”</h4>
                </div>
                <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t2.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Amira Nasri</h6>
                    <p>Owner, Lunara Studio (Interior Design)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="element-item">
              <div className="wiont-wrap">
                <div className="wiont-content">
                  <h4>“UI design elevated the whole product.Working with this agency was a dream. They understood my and transformed it into a calm, elegant brand that speaks directly to my audience. The branding and  I’ve received countless compliments since launch.”</h4>
                </div>
                <div className="wiont-author-wrap mt-50">
                  <div className="wiont-author-thumb">
                    <img src="assets/images/testimonial/t1.png" alt="" />
                  </div>
                  <div className="wiont-author-data">
                    <h6>Sarah Lin</h6>
                    <p>Founder, Zenvue (Meditation App)</p>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
 
        </div>
      </div>
    </div>
  );
};

export default TestimonialArea;