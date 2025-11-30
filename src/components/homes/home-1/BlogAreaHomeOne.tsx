 
import { Link } from "react-router-dom";  
import blog_data from "../../../data/blog-data";

const BlogAreaHomeOne = () => {
  return (
    <div className="wiondefault-bg margin-30">
      <div className="wionsection-padding2">
        <div className="container">
          {/* Section Title */}
          <div className="wionsection-title">
            <div className="row">
              <div className="col-xl-7 col-lg-8">
                <div
                  className="wionsub-title"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <p>We're a team of creative minds</p>
                </div>
                <h2 data-aos="fade-up" data-aos-delay="500">Our articles</h2>
              </div>
              <div className="col-xl-5 col-lg-4 d-flex align-items-end justify-content-end">
                <div className="wiontitle-btn">
                  <Link to="/blog" className="wiondefault-btn">
                    View all articles
                    <span className="wionbutton-icon">
                      <img
                        className="arry1"
                        src="/assets/images/svg/arrow-right.png"
                        alt="Arrow"
                        width={20}
                        height={20}
                      />
                      <img
                        className="arry2"
                        src="/assets/images/svg/arrow-right.png"
                        alt="Arrow"
                        width={20}
                        height={20}
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="row">
            {/* First large blog item */}
            <div className="col-xl-6">
              {blog_data.slice(0, 1).map((item) => (
                <div
                  key={item.id}
                  className="wionblog-wrap"
                  data-aos={item.dataAos}
                  data-aos-delay={item.dataAosDelay}
                >
                  <div className="wionblog-thumb"> 
                    <Link to={item.link}>
                      <img src={item.img} width={639} height={452} alt={item.title} />
                    </Link>
                    <Link to={item.link}>
                      <div className="wionblog-btn">{item.category}</div>                      
                    </Link>
                  </div>
                  <div className="wionblog-meta">
                    <ul>
                      <li>
                        <Link to={item.link}>{item.date} –</Link>
                      </li>
                      <li>{item.readTime}</li>
                    </ul>
                  </div>
                  <div className="wionblog-title">
                    <Link to={item.link}>
                      <h3>{item.title}</h3>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Other smaller blog items */}
            <div className="col-xl-6">
              <div className="wionblog-wraper">
                {blog_data.slice(1).map((item) => (
                  <div
                    key={item.id}
                    className="wionblog-wrap2 mb-24"
                    data-aos={item.dataAos}
                    data-aos-delay={item.dataAosDelay}
                  >
                    <div className="wionblog-thumb2"> 
                      <Link to={item.link}>
                        <img src={item.img} alt={item.title} />
                      </Link>
                      <Link to={item.link}>
                        <div className="wionblog-btn">{item.category}</div>
                      </Link>
                    </div>
                    <div className="wionblog-item">
                      <div className="wionblog-meta">
                        <ul>
                          <li>
                            <Link to={item.link}>{item.date} –</Link>
                          </li>
                          <li>{item.readTime}</li>
                        </ul>
                      </div>
                      <div className="wionblog-title2">
                        <Link to={item.link}>
                          <h3>{item.title}</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* End Blog Grid */}
        </div>
      </div>
    </div>
  );
};

export default BlogAreaHomeOne;
