
 

export default function Contactus2Area() {
  return (
    <section className="wionabout-section1 wiondefault-bg mb-00">
      <div className="container">
        <div className="wionsection-title center max-w715">
          <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
            <p>Connect With Us, We're Here to Help</p>
          </div>
          <h1 className="aos-init" data-aos-delay="500" data-aos="fade-up">Get in touch</h1>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <div className="wioncontact-thumb aos-init" data-aos-delay="600" data-aos="fade-up">
              <img src="assets/images/service/thumb13.png" alt="" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="wioncontact-box aos-init" data-aos-delay="600" data-aos="fade-up">
              <div className="wioncontact-title">
                <h4>Have a project in mind? Fill out the form below:</h4>
              </div>
              <form action="#">
                <div className="row">
                  <div className="col-lg-6 ">
                    <div className="wionmain-field">
                      <h6>Name</h6>
                      <input type="text" placeholder="First name" />
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="wionmain-field">
                      <div className="mt-34">
                        <input type="text" placeholder="Last name" />
                      </div>
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
                      <h6>Phone</h6>
                      <input type="text" placeholder="Phone number" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="wionmain-field">
                      <h6>Subject</h6>
                      <input type="email" placeholder="Subject description" />
                    </div>
                  </div>
                </div>
                <div className="wionmain-field-textarea">
                  <h6>Message</h6>
                  <textarea className="button-text" name="textarea" placeholder="Let us know about your project"></textarea>
                </div>

                <button className="wiondefault-btn submit-btn mt-50">Submit message
                  <span className="wionbutton-icon">
                    <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
                    <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-50">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="wioncontact-info-bo aos-init" data-aos-delay="400" data-aos="fade-up">
                <div className="wioncontact-info-icon">
                  <img src="assets/images/service/icon1.svg" alt="" />
                </div>
                <div className="wioncontact-info-content">
                  <h4>Visit Us</h4>
                  <p>6587 Roller Derby Lane, Canada, and 730 Grant Street, San Francisco</p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="wioncontact-info-bo aos-init" data-aos-delay="500" data-aos="fade-up">
                <div className="wioncontact-info-icon">
                  <img src="assets/images/service/icon2.svg" alt="" />
                </div>
                <div className="wioncontact-info-content">
                  <h4>Call Us</h4>
                  <p>Call us and we’ll get back to you soon.
                    <a href="col">(123) 456-7890</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="wioncontact-info-bo aos-init" data-aos-delay="600" data-aos="fade-up">
                <div className="wioncontact-info-icon">
                  <img src="assets/images/service/icon3.svg" alt="" />
                </div>
                <div className="wioncontact-info-content">
                  <h4>Join Our Community</h4>
                  <p>Connect with like-minded professionals and stay updated.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
