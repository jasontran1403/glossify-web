import { Link } from 'react-router-dom';

export default function ServiceArea() {
  return (
    <section className="wionabout-section1 wiondefault-bg">
      <div className="container">
        <div className="wionsection-title">
          <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
            <p>What we do for you</p>
          </div>
          <h2 className="aos-init" data-aos-delay="500" data-aos="fade-up">Our services</h2>
        </div>
        <div className="wionservice-main-box card-sticky">
          <div className="row">
            <div className="col-lg-6">
              <div className="wionservice-d-thumb">
                <img src="assets/images/service/thumb14.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="wiondefault-content pl-110">
                <h3 className="title">01. Pedicure</h3>
                <p>We use personal one-time pedicure kits which include pumice stone, nail buffer, and nail file for all of our pedicure services. We offer complimentary drinks. Please kindly ask us if we forgot to offer you one..</p>
                <div className="mt-50">
                  <div className="wionservice-d-data">
                    <ul className="service-prices-list">
                      <li className="service-price-item">
                        <span className="service-name">Basic Pedicure</span>
                        <span className="service-price">$33</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Deluxe Spa Pedicure</span>
                        <span className="service-price">$38</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Herbal Deluxe Pedicure</span>
                        <span className="service-price">$48</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Signature Volcano Spa Pedicure</span>
                        <span className="service-price">$58</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="mt-50">
                  <Link className="wiondefault-btn" to="/single-service">Explore more
                    <span className="wionbutton-icon">
                      <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
                      <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
                    </span>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="wionservice-main-box card-sticky mt-80">
          <div className="row">
            <div className="col-lg-6 order-lg-2">
              <div className="wionservice-d-thumb">
                <img src="assets/images/service/thumb15.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="wiondefault-content pr-110">
                <h3 className="title">2. Nails</h3>
                <p>NOTE: Please consult one of our nail techs if you have any questions about additional service requests.</p>
                <div className="mt-50">
                  <div className="wionservice-d-data">
                    <ul className="service-prices-list">
                      <li className="service-price-item">
                        <span className="service-name">Basic Manicure</span>
                        <span className="service-price">$28</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">No-Chip Manicure</span>
                        <span className="service-price">$38</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Full Set (artificial nails)</span>
                        <span className="service-price">$48+</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Fill-Ins</span>
                        <span className="service-price">$38+</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Dipping Powder</span>
                        <span className="service-price">$48</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Kid’s Pedicure</span>
                        <span className="service-price">$28</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Basic Manicure & Pedicure</span>
                        <span className="service-price">$58</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Full set Pink and White</span>
                        <span className="service-price">$68</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="mt-50">
                  <Link className="wiondefault-btn" to="/single-service">Explore more
                    <span className="wionbutton-icon">
                      <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
                      <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
                    </span>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="wionservice-main-box card-sticky mt-80">
          <div className="row">
            <div className="col-lg-6">
              <div className="wionservice-d-thumb">
                <img src="assets/images/service/thumb16.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="wiondefault-content pl-110">
                <h3 className="title">3. Miscellaneous Services</h3>
                <p></p>
                <div className="mt-50">
                  <div className="wionservice-d-data">
                    <ul className="service-prices-list">
                      <li className="service-price-item">
                        <span className="service-name">No-Chip Polish</span>
                        <span className="service-price">$28</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Artificial Nails Removal</span>
                        <span className="service-price">$18</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">No-Chip Polish Soak Off</span>
                        <span className="service-price">$13</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Artificial Nails Repair</span>
                        <span className="service-price">$8+</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Cut Down</span>
                        <span className="service-price">$8+</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Regular Polish Change</span>
                        <span className="service-price">$18</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Nails Design</span>
                        <span className="service-price">$8+</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">French</span>
                        <span className="service-price">$8+</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="mt-50">
                  <Link className="wiondefault-btn" to="/single-service">Explore more
                    <span className="wionbutton-icon">
                      <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
                      <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
                    </span>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="wionservice-main-box card-sticky mt-80">
          <div className="row">
            <div className="col-lg-6 order-lg-2">
              <div className="wionservice-d-thumb">
                <img src="assets/images/service/thumb17.jpg" alt="" />
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="wiondefault-content pr-110">
                <h3 className="title">4. Waxing</h3>
                <p></p>
                <div className="mt-50">
                  <div className="wionservice-d-data">
                    <ul className="service-prices-list">
                      <li className="service-price-item">
                        <span className="service-name">Eyebrows</span>
                        <span className="service-price">$13</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Lip</span>
                        <span className="service-price">$11+</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Under Arms</span>
                        <span className="service-price">$23+</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Full Face</span>
                        <span className="service-price">$38+</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Cheeks</span>
                        <span className="service-price">$13</span>
                      </li>
                      <li className="service-price-item">
                        <span className="service-name">Chin</span>
                        <span className="service-price">$13+</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-50">
                  <Link className="wiondefault-btn" to="/single-service">Explore more
                    <span className="wionbutton-icon">
                      <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
                      <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}