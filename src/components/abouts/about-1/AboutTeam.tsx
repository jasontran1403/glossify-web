import { Link } from 'react-router-dom';
 

export default function AboutTeam() {
  return (
    <div className="wiondefault-bg margin-30">
      <div className="wionsection-padding2">
        <div className="container">
          <div className="wionsection-title center">
            <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
              <p>We're a team of creative minds</p>
            </div>
            <h2 className="aos-init" data-aos-delay="500" data-aos="fade-up">Our team</h2>
          </div>
          <div className="row">
            <div className="col-xxl-3 col-lg-6 col-md-6">
              <Link to="/single-team">
                <div className="wionteam-wra aos-init" data-aos-delay="100" data-aos="fade-up">
                  <div className="wionteam-thumb">
                    <img src="assets/images/team/team1.png" alt="Thumb" />
                  </div>
                  <div className="wionteam-content">
                    <h4>Ava Reynolds</h4>
                    <p>Creative Director</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6">
              <Link to="/single-team">
                <div className="wionteam-wra aos-init" data-aos-delay="200" data-aos="fade-up">
                  <div className="wionteam-thumb">
                    <img src="assets/images/team/team2.png" alt="Thumb" />
                  </div>
                  <div className="wionteam-content">
                    <h4>Leo Martinez</h4>
                    <p>Lead UI/UX Designer</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6">
              <Link to="/single-team">
                <div className="wionteam-wra aos-init" data-aos-delay="300" data-aos="fade-up">
                  <div className="wionteam-thumb">
                    <img src="assets/images/team/team3.png" alt="Thumb" />
                  </div>
                  <div className="wionteam-content">
                    <h4>Ethan Brooks</h4>
                    <p>Head of Development</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6">
              <Link to="/single-team">
                <div className="wionteam-wra aos-init" data-aos-delay="400" data-aos="fade-up">
                  <div className="wionteam-thumb">
                    <img src="assets/images/team/team4.png" alt="Thumb" />
                  </div>
                  <div className="wionteam-content">
                    <h4>Miles Turner</h4>
                    <p>Webflow Expert</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6">
              <Link to="/single-team">
                <div className="wionteam-wra aos-init" data-aos-delay="500" data-aos="fade-up">
                  <div className="wionteam-thumb">
                    <img src="assets/images/team/team5.png" alt="Thumb" />
                  </div>
                  <div className="wionteam-content">
                    <h4>Noah Kim</h4>
                    <p>Digital Marketing Manager</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6">
              <Link to="/single-team">
                <div className="wionteam-wra aos-init" data-aos-delay="600" data-aos="fade-up">
                  <div className="wionteam-thumb">
                    <img src="assets/images/team/team6.png" alt="Thumb" />
                  </div>
                  <div className="wionteam-content content2">
                    <h4>Content & Copy Lead</h4>
                    <p>Content & Copy Lead</p>
                  </div>
                </div>
              </Link>

            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6">
              <Link to="/single-team">
                <div className="wionteam-wra aos-init" data-aos-delay="700" data-aos="fade-up">
                  <div className="wionteam-thumb">
                    <img src="assets/images/team/team7.png" alt="Thumb" />
                  </div>
                  <div className="wionteam-content">
                    <h4>Sophie Lang</h4>
                    <p>Client Success Manager</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-xxl-3 col-lg-6 col-md-6">
              <Link to="/single-team">
                <div className="wionteam-wra aos-init" data-aos-delay="800" data-aos="fade-up">
                  <div className="wionteam-thumb">
                    <img src="assets/images/team/team8.png" alt="Thumb" />
                  </div>
                  <div className="wionteam-content">
                    <h4>Adam Smith</h4>
                    <p>Interaction Designer</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
