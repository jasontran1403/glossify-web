
import { Link } from 'react-router-dom';
 

export default function BlogArea() {
  return (
    <section className="wionabout-section1 wiondefault-bg">
      <div className="container">
        <div className="wionsection-title">
          <div className="wionsub-title aos-init" data-aos-delay="400" data-aos="fade-up">
            <p>our creative ideas and insights</p>
          </div>
          <h1 className="aos-init" data-aos-delay="500" data-aos="fade-up">Our articles</h1>
          
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="blog-page-wrap">
              <div className="wionblog-wrap mb-0 aos-init" data-aos-delay="400" data-aos="fade-up">
                <div className="wionblog-thumb">
                  <Link to="/single-blog">
                    <img src="assets/images/blog/b1.png" alt="Thumb" />
                  </Link>
                  <Link to="/single-blog">
                    <div className="wionblog-btn">Creative Agency</div>
                  </Link>
                </div>
                <div className="wionblog-meta">
                  <ul>
                    <li>
                      <Link to="/single-blog">20 June 2025 –</Link>
                    </li>
                    <li>10 min read</li>
                  </ul>
                </div>
                <div className="wionblog-title">
                  <Link to="/single-blog">
                    <h3>Top 5 reasons to launch your product with a creative agency</h3>
                  </Link>
                </div>
              </div>
              <div className="wionblog-wrap mb-0 mt-50 aos-init" data-aos-delay="500" data-aos="fade-up">
                <div className="wionblog-thumb">
                  <Link to="/single-blog">
                    <img src="assets/images/blog/b12.png" alt="Thumb" />
                  </Link>
                  <Link to="/single-blog">
                    <div className="wionblog-btn">Technology</div>
                  </Link>
                </div>
                <div className="wionblog-meta">
                  <ul>
                    <li>
                      <Link to="/single-blog">28 June 2025 –</Link>
                    </li>
                    <li>8 min read</li>
                  </ul>
                </div>
                <div className="wionblog-title">
                  <Link to="/single-blog">
                    <h3>How AI is reshaping agency-brand dynamics: At a glance</h3>
                  </Link>
                </div>
              </div>
              <div className="wionblog-wrap mb-0 mt-50 aos-init" data-aos-delay="600" data-aos="fade-up">
                <div className="wionblog-thumb">
                  <Link to="/single-blog">
                    <img src="assets/images/blog/b13.png" alt="Thumb" />
                  </Link>
                  <Link to="/single-blog">
                    <div className="wionblog-btn">UI/UX</div>
                  </Link>
                </div>
                <div className="wionblog-meta">
                  <ul>
                    <li>
                      <Link to="/single-blog">16 June 2025 –</Link>
                    </li>
                    <li>5 min read</li>
                  </ul>
                </div>
                <div className="wionblog-title">
                  <Link to="/single-blog">
                    <h3>15 Best modern AI solutions as a foundation for UI/UX design</h3>
                  </Link>
                </div>
              </div>
              <div className="wionblog-wrap mb-0 mt-50 aos-init" data-aos-delay="700" data-aos="fade-up">
                <div className="wionblog-thumb">
                  <Link to="/single-blog">
                    <img src="assets/images/blog/b14.png" alt="Thumb" />
                  </Link>
                  <Link to="/single-blog">
                    <div className="wionblog-btn">Web Development</div>
                  </Link>
                </div>
                <div className="wionblog-meta">
                  <ul>
                    <li>
                      <Link to="/single-blog">10 June 2025 –</Link>
                    </li>
                    <li>8 min read</li>
                  </ul>
                </div>
                <div className="wionblog-title">
                  <Link to="/single-blog">
                    <h3>FastHTML — Modern web applications in pure Python</h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="wionblog-sidebar">
              <div className="wionblog-widgets">
                <h4>Search</h4>
                <form action="#">
                  <div className="wionsearch-box">
                    <input type="search" placeholder="Type keyword here..." />
                    <button id="wionsearch-btn" className="wiondefault-btn" type="button">
                      <span className="wionbutton-icon">
                        <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
                        <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
                      </span>
                    </button>
                  </div>
                </form>
              </div>
              <div className="wionblog-widgets">
                <h4>Categories:</h4>
                <div className="wionblog-categorie">
                  <ul>
                    <li><Link to="/single-blog">Business (24)</Link></li>
                    <li><Link to="/single-blog">Digital Marketing (16)</Link></li>
                    <li><Link to="/single-blog">Creative Agency (08)</Link></li>
                    <li><Link to="/single-blog">UI/UX Design (33)</Link></li>
                    <li><Link to="/single-blog">Web Development (05)</Link></li>
                  </ul>
                </div>
              </div>
              <div className="wionblog-widgets">
                <h4>Recent Posts</h4>
                <div className="wionrecent-post-item">
                  <div className="wionrecent-post-thumb">
                    <Link to="/single-blog">
                      <img src="assets/images/blog/b15.png" alt="" />
                    </Link>
                  </div>
                  <div className="wionrecent-post-content">
                    <div className="wionblog-meta recent-post-meta">
                      <ul>
                        <li>
                          <Link to="/single-blog">18 June 2025 –</Link>
                        </li>
                        <li>15 min read</li>
                      </ul>
                    </div>
                    <div className="wionrecent-post">
                      <Link to="/single-blog">
                        <h4>Build a creative agency website in 4 steps</h4>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="wionrecent-post-item">
                  <div className="wionrecent-post-thumb">
                    <Link to="/single-blog">
                      <img src="assets/images/blog/b16.png" alt="" />
                    </Link>
                  </div>
                  <div className="wionrecent-post-content">
                    <div className="wionblog-meta recent-post-meta">
                      <ul>
                        <li>
                          <Link to="/single-blog">18 June 2025 –</Link>
                        </li>
                        <li>6 min read</li>
                      </ul>
                    </div>
                    <div className="wionrecent-post">
                      <Link to="/single-blog">
                        <h4>What is click fraud and how to avoid it</h4>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
              <div className="wionblog-widgets">
                <h4>Tags</h4>
                <div className="wionblog-tags">
                  <ul>
                    <li><Link to="/single-blog">Business</Link></li>
                    <li><Link to="/single-blog">Digital Marketing</Link></li>
                    <li><Link to="/single-blog">Web</Link></li>
                    <li><Link to="/single-blog">Creative Agency</Link></li>
                    <li><Link to="/single-blog">UI/UX</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
