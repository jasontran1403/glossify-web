  
import { Link } from 'react-router-dom';
import  { useState } from 'react';
import menu_data from '../../data/menu-data';
import OffCanvas from '../../common/OffCanvas';
import Sidebar from '../../common/Sidebar';

const HeaderTwo = () => {
  // mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  // open offcanvas
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);
  const toggleOffCanvas = () => {
    setOffCanvasOpen(!offCanvasOpen);
  }


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
                <nav className="main-menu menu-style1 d-none d-lg-block menu-left">
                  <ul>
                    {menu_data.map((item, i) => (
                      <li key={i} className="menu-item-has-children">
                        <Link to={item.link}>{item.title}</Link>
                        {item.has_dropdown &&
                          <ul className="sub-menu">
                            {item.has_dropdown && item.sub_menus && item.sub_menus.map((sub_item, index) => (
                              <li key={index}
                                className={('has_sub_dropdown' in sub_item) && sub_item.has_sub_dropdown ? 'menu-item-has-children' : undefined}>
                                <Link to={sub_item?.link || "/"} className={('has_sub_dropdown' in sub_item) && sub_item.has_sub_dropdown ? 'no-border' : undefined}>{sub_item.title}</Link>
                                {('has_sub_dropdown' in sub_item) &&
                                  <ul className="sub-menu">
                                    {sub_item.sub_menus?.map((sub_inner_item, sub_index) => (
                                      <li key={sub_index}><Link to={sub_inner_item?.link || "/"}>{sub_inner_item.title}</Link></li>
                                    ))}
                                  </ul>
                                }
                              </li>
                            ))}
                          </ul>
                        }
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-auto d-flex align-items-center">
              <div onClick={toggleOffCanvas} className="wionheader-barger">
                <span></span>
              </div>
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
      <Sidebar  setOffCanvasOpen={setOffCanvasOpen} offCanvasOpen={offCanvasOpen} />
    </>
  );
};

export default HeaderTwo;