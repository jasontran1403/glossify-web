import { Link } from 'react-router-dom';
 

interface SidebarProps {
  setOffCanvasOpen: (value: boolean) => void;
  offCanvasOpen?: boolean;
}

export default function Sidebar({ setOffCanvasOpen, offCanvasOpen }: SidebarProps) {

 

  return (
    <>
      <div className="wionsidemenu-wraper">
        <div className={`wionsidemenu-column2 ${offCanvasOpen ? 'active' : ''}`}>
          <div className="wionsidemenu-body">
            <div className="wionsidebar-wrap">
              <div className="wionsidebar-header-icon">
                <Link to="/">
                  <img src="assets/images/logo/logo-dark.svg" alt="Icon" />
                </Link>
              </div>
              <div className="mt-50">
                <div className="wionsidebar-content">
                  <p>We are a team of creators crafting memorable brands and digital experiences.</p>
                  <img src="assets/images/hero/thumb7.png" alt="Thumb" />
                </div>
                <div className="wionsidebar-content2">
                  <h4>Visit Us</h4>
                  <p>6587 Roller Derby Lane, Canada, and 730 Grant Street, San Francisco</p>
                </div>
                <div className="wionsidebar-content2">
                  <h4>Call Us</h4>
                  <p>Call us and we’ll get back to you soon.
                    <a href="tel:123">(123) 456-7890</a>
                  </p>
                </div>
                <div className="wionsidebar-content2 pb-0">
                  <h4>Join Our Community</h4>
                  <p>Connect with like-minded professionals and stay updated.</p>
                  <div className="wionsidebar-social">
                    <ul>
                      <li>
                        <a href="https://www.twitter.com">
                          <img className="social-show" src="assets/images/svg/fb.svg" alt="" />
                          <img className="social-hide" src="assets/images/svg/fb.svg" alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com">
                          <img className="social-show" src="assets/images/svg/in.svg" alt="" />
                          <img className="social-hide" src="assets/images/svg/in.svg" alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com">
                          <img className="social-show" src="assets/images/svg/ins.svg" alt="" />
                          <img className="social-hide" src="assets/images/svg/ins.svg" alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com">
                          <img className="social-show" src="assets/images/svg/twter.svg" alt="" />
                          <img className="social-hide" src="assets/images/svg/twter.svg" alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-50 wionsidebar-content3">
                  <p>© Copyright {new Date().getFullYear()}, All Rights Reserved by Mthemeus</p>
                </div>
              </div>
            </div>
            <span className="wionsidemenu-close" onClick={() => setOffCanvasOpen(false)}>
              <i className="ri-close-line"></i>
            </span>
          </div>
        </div>
      </div>
      <div className={`offcanvas-overlay ${offCanvasOpen ? 'active' : ''}`} onClick={() => setOffCanvasOpen(false)}></div>
    </>
  )
}
