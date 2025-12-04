 
import { Link } from 'react-router-dom';
import Slider from 'react-slick';


const setting1 = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 13000,
  arrows: false,
  pauseOnHover: false,
  cssEase: "linear",
  responsive: [{
    breakpoint: 1024,
    settings: {
      speed: 8000 
    }
  }, {
    breakpoint: 600,
    settings: {
      speed: 5000 
    }
  }]
}


const setting2 = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 13000,
  rtl: true,
  arrows: false,
  pauseOnHover: false,
  cssEase: "linear",
  responsive: [{
    breakpoint: 1024,
    settings: {
      speed: 8000 
    }
  }, {
    breakpoint: 600,
    settings: {
      speed: 5000 
    }
  }]
}

const FooterOne = () => {
  return (
    <footer className="wionfooter-section">
      <div className="wiondefault-bg wioncta-section bg-heading overflow-hidden">
        <div className="fixed-height">
          <Slider {...setting1} className="wioncta-slider-init">
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
          </Slider>
        </div>
        <div className="fixed-height" dir="rtl">
          <Slider {...setting2} className="wioncta-slider-init">
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
            <div className="wioncta-slider-content">
              <h2>Let's collaborate to something amazing</h2>
              <div className="wioncta-victor-icon">
                <img src="assets/images/cta/icon1.svg" alt="Icon" />
              </div>
            </div>
          </Slider>
        </div>
        <div className="wioncta-btn mt-80">
          <Link className="wiondefault-btn white-outline aos-init" data-aos-delay="500" data-aos="fade-up" to="/book-now">Schedule a call
            <span className="wionbutton-icon">
              <img className="arry1" src="assets/images/svg/arrow-white.svg" alt="" />
              <img className="arry2" src="assets/images/svg/arrow-white.svg" alt="" />
            </span>
          </Link>
        </div>
      </div>
      <div className="footer-sticky">
        <div className="container">
          <div className="wionfooter-top">
            <div className="row">
              <div className="col-xl-6">
                <div className="wionfooter-textarea">
                  <div className="wionsub-title">
                    <p>Get in touch</p>
                  </div>
                  <a href="mailto:name@glossify.salon">
                    <h3>feedback@glossify.salon</h3>
                  </a>
                </div>
              </div>
              <div className="col-xl-5 offset-xl-1">
                <div className="wionfooter-menu-wraper pl-30">
                  <div className="wionfooter-menu">
                    <h4>Navigation</h4>
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      {/* <li>
                        <Link to="/about-us">About Us</Link>
                      </li> */}
                      <li>
                        <Link to="/services">Services</Link>
                      </li>
                      <li>
                        <Link to="/gallery">Gallery</Link>
                      </li>
                      <li>
                        <Link to="/contact-us">Contact</Link>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="wionfooter-menu">
                    <h4>Other</h4>
                    <ul>
                      <li>
                        <Link to="/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link to="/pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link to="/team">Team</Link>
                      </li>
                      <li>
                        <Link to="/contact-us1">Contact</Link>
                      </li>
                      <li>
                        <Link to="/error-404">404 page</Link>
                      </li>
                    </ul>
                  </div> */}
                  <div className="wionfooter-menu">
                    <h4>Follow us</h4>
                    <ul>
                      <li>
                        <a href="https://www.instagram.com/">Instagram</a>
                      </li>
                      <li>
                        <a href="https://x.com/">X</a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/">Youtube</a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com/">Facebook</a>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="wionfooter-bottom-wrap">
            <div className="wionfooter-logo">
              <Link to="/">
                <img src="assets/images/logo/logo.png" alt="Foote Logo" />
              </Link>
            </div>
            <div className="wionfooter-bottom-text">
              <p>© Copyright {new Date().getFullYear()}, All Rights Reserved by Glossify Dev Team</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;