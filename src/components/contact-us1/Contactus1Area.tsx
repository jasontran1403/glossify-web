
 

export default function Contactus1Area() {
  return (
    <section className="wionabout-section1 wiondefault-bg">
      <div className="container">
        <div className="wionsection-title center">
          <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
            <p>Connect With Us, We're Here to Help</p>
          </div>
          <h1 className="aos-init" data-aos-delay="500" data-aos="fade-up">Contact us</h1>
        </div>
        <div className="wioncontact-box aos-init" data-aos-delay="700" data-aos="fade-up">
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
    </section>
  )
}
