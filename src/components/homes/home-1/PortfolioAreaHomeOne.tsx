
 
import { Link } from 'react-router-dom'; 
import portfolio_data from '../../../data/portfolio-data';

const PortfolioAreaHomeOne = () => {
  return (
    <div className="wionsection-padding wiondefault-bg margin-30">
      <div className="container">
        <div className="wionsection-title center">
          <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
            <p>Our work speaks for us</p>
          </div>
          <h2 className="aos-init" data-aos-delay="500" data-aos="fade-up">Our projects</h2>
        </div>
        <div className="wionp-wraper">
          <div className="wionp-item">
            {portfolio_data.slice(0, 3).map((item, i) => (
              <div key={i} className={`wionp-wrap aos-init ${item.cls}`} data-aos-delay={item.dataAosDelay} data-aos="fade-up">
                <div className="wionp-thumb">
                  <Link to="#">
                    <img src={item.img} alt={item.title} />
                  </Link>
                </div>
                <div className="wionp-meta">
                  <ul>
                    <li>
                      <Link to="#">{item.category}</Link>
                    </li>
                    <li>
                      <Link to="#">{item.date}</Link>
                    </li>
                  </ul>
                </div>
                <div className="wionp-content-wrap">
                  <div className="wionp-title">
                    <Link to="#">
                      <h3>{item.title}</h3>
                    </Link>
                  </div>
                  <div className="wionp-btn-icon">
                    <Link className="wionportfolio-btn" to="#">
                      <i className="ri-arrow-right-up-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="wionp-item">
            {portfolio_data.slice(3, 6).map((item, i) => (
              <div key={i} className={`wionp-wrap ${item.cls}`} data-aos-delay={item.dataAosDelay} data-aos="fade-up">
                <div className="wionp-thumb">
                  <Link to="#">
                    <img src={item.img} alt={item.title} />
                  </Link>
                </div>
                <div className="wionp-meta">
                  <ul>
                    <li>
                      <Link to="#">{item.category}</Link>
                    </li>
                    <li>
                      <Link to="#">{item.date}</Link>
                    </li>
                  </ul>
                </div>
                <div className="wionp-content-wrap">
                  <div className="wionp-title">
                    <Link to="#">
                      <h3>{item.title}</h3>
                    </Link>
                  </div>
                  <div className="wionp-btn-icon">
                    <Link className="wionportfolio-btn" to="#">
                      <i className="ri-arrow-right-up-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        {/* <div className="wionp-btn wow">
          <Link className="wiondefault-btn" to="/portfolio-1">View full projects
            <span className="wionbutton-icon">
              <img className="arry1" src={arrow_right} alt="" />
              <img className="arry2" src={arrow_right} alt="" />
            </span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default PortfolioAreaHomeOne;