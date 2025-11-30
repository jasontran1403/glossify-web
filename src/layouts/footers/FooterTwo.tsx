
import { Link } from 'react-router-dom';
 

export default function FooterTwo() {
  return (
    <footer className="wionfooter-section">
      <div className="wiondefault-bg bg2">
        <div className="wionsection-padding">
          <div className="container">
            <div className="wioncta-wrap">
              <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
                <p>Get in Touch</p>
              </div>
              <h2 className="aos-init" data-aos-delay="500" data-aos="fade-up">We'd love to hear about your project. Let's talk!</h2>
              <div className="mt-80">
                <Link className="wiondefault-btn dark-btn aos-init" data-aos-delay="600" data-aos="fade-up" to="/portfolio-1">Start a project
                  <span className="wionbutton-icon">
                    <img className="arry1" src="assets/images/svg/arrow-white.svg" alt="" />
                    <img className="arry2" src="assets/images/svg/arrow-white.svg" alt="" />
                  </span>
                </Link>
              </div>
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
                        <a target='_blank' href="https://www.instagram.com/">Instagram</a>
                      </li>
                      <li>
                        <a target='_blank' href="https://x.com/login?">X</a>
                      </li>
                      <li>
                        <a target='_blank' href="https://www.youtube.com/">Youtube</a>
                      </li>
                      <li>
                        <a target='_blank' href="https://www.linkedin.com/">LinkedIn</a>
                      </li>
                      <li>
                        <a target='_blank' href="https://www.facebook.com/">Facebook</a>
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
