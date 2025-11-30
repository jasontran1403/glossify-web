import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import menu_data from "../../data/menu-data";
import OffCanvas from "../../common/OffCanvas";

export default function HeaderThree() {
  // mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // For underline animation
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLLIElement | null)[]>([]);
  const location = useLocation();

  // Find active index based on current path (exact match for single-level menu)
  const activeIndex = menu_data.findIndex(item => location.pathname === item.link);

  // Set initial underline position for active item (with timeout to ensure refs are set)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeIndex >= 0 && menuRefs.current[activeIndex]) {
        const el = menuRefs.current[activeIndex];
        setUnderlineStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
        });
      } else {
        setUnderlineStyle({ left: 0, width: 0 });
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Handle mouse enter
  const handleMouseEnter = (index: number, el: HTMLLIElement) => {
    setHoveredIndex(index);
    setUnderlineStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
    });
  };

  // Handle mouse leave - back to active
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    // Re-use the timeout logic for consistency
    const timer = setTimeout(() => {
      if (activeIndex >= 0 && menuRefs.current[activeIndex]) {
        const el = menuRefs.current[activeIndex];
        setUnderlineStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
        });
      } else {
        setUnderlineStyle({ left: 0, width: 0 });
      }
    }, 0);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <header className="site-header wionheader-section" id="sticky-menu">
        <div className="container">
          <div className="row gx-3 align-items-center justify-content-between">
            <div className="col-8 col-sm-auto ">
              <div className="header-logo">
                <Link to="/">
                  <img src="assets/images/logo/logo-dark.svg" alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col">
              <div className="wionmain-menu-item">
                <nav 
                  className="main-menu menu-style1 d-none d-lg-block menu-left menu-with-underline"
                  onMouseLeave={handleMouseLeave}
                >
                  <ul>
                    {menu_data.map((item, i) => {
                      const isActive = location.pathname === item.link;
                      return (
                        <li 
                          key={i} 
                          ref={el => menuRefs.current[i] = el}
                          className={`menu-item-has-children ${hoveredIndex === i ? 'hovered' : ''} ${isActive ? 'active' : ''}`}
                          onMouseEnter={(e) => handleMouseEnter(i, e.currentTarget)}
                        >
                          <Link 
                            to={item.link}
                            className={`nav-link ${isActive ? 'active-link' : ''}`}
                          >
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {/* Underline element */}
                  <div 
                    className="menu-underline"
                    style={{
                      left: `${underlineStyle.left}px`,
                      width: `${underlineStyle.width}px`,
                      transition: 'left 0.3s ease, width 0.3s ease',
                    }}
                  />
                </nav>
              </div>
            </div>
            <div className="col-auto d-flex align-items-center">
              <Link className="wiondefault-btn wionheader-btn" to="/book-now">Book Now
                <span className="wionbutton-icon">
                  <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
                  <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
                </span>
              </Link>
              <div className="wionheader-menu">
                <nav className="navbar site-navbar justify-content-between">
                  <button onClick={toggleMenu} className="wionmenu-toggle d-inline-block d-lg-none">
                    <span></span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <OffCanvas menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  )
}