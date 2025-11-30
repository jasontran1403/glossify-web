 
import { Link } from 'react-router-dom';
import Count from '../../../common/count';

 

interface CounterItem {
  value: number;
  suffix?: string;
  label: string;
}

const counter_data: CounterItem[] = [
  {
    value: 12,
    suffix: "+",
    label: "Years of experience",
  },
  {
    value: 84,
    suffix: "k",
    label: "Satisfied clients",
  },
  {
    value: 60,
    suffix: "k+",
    label: "Project completed",
  },
  {
    value: 4.8,
    suffix: "/5",
    label: "Total success rate",
  },
];




const HeroAreaHomeOne = () => {
  return (
    <>
      <section className="wionhero-section wiondefault-bg">
        <div className="container">
          <div className="wionhero-content">
            <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
              <p>Dynamic & innovative creative agency</p>
            </div>
            <h1 className="aos-init" data-aos-delay="500" data-aos="fade-up">We don’t just create</h1>
            <h1 className="aos-init" data-aos-delay="600" data-aos="fade-up">brand—we convert</h1>
          </div>
          <div className="wionhero-thumb">
            <div className="wionhero-thumb-item item3 aos-init" data-aos="fade-up">
              <div className="hero-thumb1">
                <img src="assets/images/hero/thumb1.png" alt="hero thumb" />
              </div>
            </div>
            <div className="wionhero-thumb-item aos-init" data-aos="fade">
              <div className="hero-thumb">
                <img src="assets/images/hero/thumb2.png" alt="hero thumb" />
              </div>
            </div>
            <div className="wionhero-thumb-item item2 aos-init" data-aos="fade-up">
              <div className="hero-thumb3">
                <img src="assets/images/hero/thumb3.png" alt="hero thumb" />
              </div>
            </div>
          </div>
          <div className="wionabout-content">
            <div className="row">
              <div className="col-xl-5 col-lg-4">
                <div className="wionsub-title aos-init" data-aos-delay="500" data-aos="fade-up">
                  <p>Who We Are</p>
                </div>
              </div>
              <div className="col-xl-7 col-lg-8">
                <div className="wionabout-content-data pl-30">
                  <h3>We're a team of creators and builders crafting memorable brands and digital experiences. Whether starting fresh or scaling up, we transform your vision into bold creativity.</h3>
                  <div className="mt-50">
                    <Link className="wiondefault-btn aos-init" data-aos-delay="500" data-aos="fade-up" to="/about-01">Learn more about us
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
          <div className="wioncounter-wraper">


            {counter_data.map((item, i) =>(
              <div key={i} className="wioncounter-box">
              <h2 className="wioncounter-item d-inline-flex align-items-center">
                <span className="odometer d-inline-block" data-odometer-final="12">
                <Count number={item.value} text={item.suffix} />
                </span> 
              </h2>
              <div className="wioncounter-data">
                <p>{item.label}</p>
              </div>
            </div>
            ))} 

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroAreaHomeOne;