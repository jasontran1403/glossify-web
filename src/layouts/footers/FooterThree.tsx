
import { Link } from 'react-router-dom';
 

export default function FooterThree() {
  return (
    <footer className="wionfooter-section">
    <div className="wionsection-padding bg-heading wiondefault-bg margin-30 mb-0">
      <div className="container">
        <div className="wioncta-wrap3">
          <div className="animation-container scroll3">
            <div className="wionhero-thumb4 box6">
              <img src="assets/images/cta/thumb1.png" alt="" />
            </div>
          </div>
          <div className="animation-container scroll4">
            <div className="wionhero-thumb4 thumb5 box7">
              <img src="assets/images/cta/thumb2.png" alt="" />
            </div>
          </div>
          <div className="wionsub-title title2 aos-init" data-aos-delay="400" data-aos="fade-up">
            <p>Get in Touch</p>
          </div>
          <h2 className="aos-init" data-aos-delay="500" data-aos="fade-up">We’re excited to collaborate <span>on your project idea!</span></h2>
          <div className="wioncta-btn mt-80 aos-init" data-aos-delay="600" data-aos="fade-up">
            <Link className="wiondefault-btn white-outline" to="/portfolio-1">View our work
              <span className="wionbutton-icon">
              <img className="arry1" src="assets/images/svg/arrow-white.svg" alt="" />
              <img className="arry2" src="assets/images/svg/arrow-white.svg" alt="" />
            </span>
            </Link>
          </div>
        </div>
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
                <a href="mailto:name@gmail.com">
                  <h2>support@gmail .com</h2>
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
                    <li>
                      <Link to="/portfolio-1">Work</Link>
                    </li>
                    <li>
                      <Link to="/about-01">About</Link>
                    </li>
                    <li>
                      <Link to="/service">Services</Link>
                    </li>
                    <li>
                      <Link to="/blog">Articles</Link>
                    </li>
                  </ul>
                </div>
                <div className="wionfooter-menu">
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
                </div>
                <div className="wionfooter-menu">
                  <h4>Follow us</h4>
                  <ul>
                    <li>
                      <a href="https://www.instagram.com/">Instagram</a>
                    </li>
                    <li>
                      <a href="https://x.com/login?">X</a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/">Youtube</a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/">LinkedIn</a>
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
              <img src="assets/images/logo/logo-dark.svg" alt="Foote Logo" />
            </Link>
          </div>
          <div className="wionfooter-bottom-text">
            <p>© Copyright {new Date().getFullYear()}, All Rights Reserved by FavDevs</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}
