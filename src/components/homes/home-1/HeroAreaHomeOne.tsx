
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
    value: 60,
    suffix: "k",
    label: "Satisfied clients",
  },
  {
    value: 40,
    suffix: "k+",
    label: "Customers return",
  },
  {
    value: 4.6,
    suffix: "/5",
    label: "Feedback rating",
  },
];

const HeroAreaHomeOne = () => {
  return (
    <>
      <section className="wionhero-section wiondefault-bg">
        <div className="container">
          {/* <div className="wionhero-content">
            <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
              <p>Dynamic & innovative creative agency</p>
            </div>
            <h1 className="aos-init" data-aos-delay="500" data-aos="fade-up">We don’t just create</h1>
            <h1 className="aos-init" data-aos-delay="600" data-aos="fade-up">brand—we convert</h1>
          </div> */}
          <div className="wionhero-thumb">
            <div className="wionhero-thumb-item item3 aos-init" data-aos="fade-up">
              <div className="hero-thumb1">
                <img src="assets/images/hero/thumb3.png" alt="hero thumb" />
              </div>
            </div>
            <div className="wionhero-thumb-item aos-init" data-aos="fade">
              <div className="hero-thumb">
                <img src="assets/images/hero/thumb1.png" alt="hero thumb" />
              </div>
            </div>
            <div className="wionhero-thumb-item item2 aos-init" data-aos="fade-up">
              <div className="hero-thumb3">
                <img src="assets/images/hero/thumb3.png" alt="hero thumb" />
              </div>
            </div>
          </div>
          <div className="wionabout-content text-center">
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-10 mx-auto">
                <div className="wionabout-content-data">
                  <h4 className="text-center text-justify">We’re a team of passionate nail artists dedicated to crafting beautiful, lasting impressions. From classic manicures to modern designs, we bring creativity and care to every detail. Whether you’re getting ready for a special day or simply treating yourself, we transform your ideas into stunning nail art and relaxing experiences.</h4>
                  <div className="mt-50">
                    {/* <Link className="wiondefault-btn aos-init" data-aos-delay="500" data-aos="fade-up" to="/about-01">Learn more about us
                      <span className="wionbutton-icon">
                        <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
                        <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
                      </span>
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wioncounter-wraper">
            {counter_data.map((item, i) => (
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