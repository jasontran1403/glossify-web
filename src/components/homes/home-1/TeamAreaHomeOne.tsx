 
import { Link } from 'react-router-dom';
import team_data from '../../../data/team-data';

 

const TeamAreaHomeOne = () => {
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
            {team_data.slice(0, 4).map((item, i) => (
              <div key={i} className="col-xxl-3 col-lg-6 col-md-6 col-sm-6">
                <Link to="/single-team">
                  <div className="wionteam-wrap aos-init" data-aos-delay={item.dataAosDelay} data-aos="fade-up">
                    <div className="wionteam-thumb">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="wionteam-content">
                      <h4>{item.name}</h4>
                      <p>{item.role}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAreaHomeOne;