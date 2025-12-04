


export default function Contactus3Area() {
  return (
    <section className="wionabout-section1 wiondefault-bg mb-00">
      <div className="container">
        <div className="wionsection-title center max-w715">
          <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
            <p>Connect With Us</p>
          </div>
          <h1 className="aos-init" data-aos-delay="400" data-aos="fade-up">We're Here to Serve</h1>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div className="aos-init" data-aos-delay="400" data-aos="fade-up">
              <div className="wioncontact-info-box box1">
                <div className="wioncontact-info-icon">
                  <img src="assets/images/service/icon1.svg" alt="" />
                </div>
                <div className="wioncontact-info-content">
                  <h4>Visit Us</h4>
                  <p>1302 North Main Street #6, Crown Point, IN 46307</p>
                </div>
              </div>
              <div className="wioncontact-info-box box2">
                <div className="wioncontact-info-icon">
                  <img src="assets/images/service/icon2.svg" alt="" />
                </div>
                <div className="wioncontact-info-content">
                  <h4>Call Us</h4>
                  <p>Call us and we’ll get back to you soon.
                    <a href="col">+1 (219) 661-1636</a>
                  </p>
                </div>
              </div>
            </div>

          </div>
          <div className="col-lg-7">
            <div className="wioncontact-box aos-init" data-aos-delay="400" data-aos="fade-up">
              <div className="wioncontact-title">
                <h4>Have feedback? Fill out the form below:</h4>
              </div>
              <form action="#">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="wionmain-field">
                      <h6>Full name</h6>
                      <input type="text" placeholder="Full name" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="wionmain-field">
                      <h6>Email</h6>
                      <input type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="wionmain-field">
                      <h6>Phone number</h6>
                      <input type="text" placeholder="Phone number" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="wionmain-field">
                      <h6>Staff's name</h6>
                      <input type="text" placeholder="Staff's name" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="wionmain-field">
                      <h6>Services</h6>
                      <input type="text" placeholder="List of services performed" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="wionmain-field">
                      <h6>Images</h6>
                      <input type="file" accept="image/*" />
                    </div>
                  </div>
                </div>
                <div className="wionmain-field-textarea">
                  <h6>Feedback content</h6>
                  <textarea className="button-text" name="textarea" placeholder="Tell us about your feedback"></textarea>
                </div>

                <button className="wiondefault-btn submit-btn mt-50">Submit feedback
                  <span className="wionbutton-icon">
                    <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
                    <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
