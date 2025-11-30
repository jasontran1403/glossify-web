  
import  { useState } from 'react'
import menu_data from '../data/menu-data';
import { Link } from 'react-router-dom';

interface OffCanvasProps {
  menuOpen: boolean; 
  setMenuOpen: (value: boolean) => void;
}


export default function OffCanvas({ menuOpen, setMenuOpen }: OffCanvasProps) {

  const [navTitle, setNavTitle] = useState("");
  //openMobileMenu
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };

  const [navTitle2, setNavTitle2] = useState("");
  //openMobileMenu
  const openMobileMenu2 = (menu: string) => {
    if (navTitle2 === menu) {
      setNavTitle2("");
    } else {
      setNavTitle2(menu);
    }
  };

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close only if clicked directly on wrapper (not inside content)
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    }
  };

  return (

    <div className={`wionmenu-wrapper ${menuOpen ? 'wionbody-visible' : ''}`} onClick={handleWrapperClick}>
      <div className="wionmenu-area text-center">
        <div className="wionmenu-mobile-top">
          <div className="mobile-logo">
            <Link to="/">
              <img src="assets/images/logo/logo-dark.svg" alt="logo" />
            </Link>
          </div>
          <button className="wionmenu-toggle mobile" onClick={() => setMenuOpen(false)}>
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="wionmobile-menu">
          <ul>
            {menu_data.map((item, i) => (
              <li key={i} className={`menu-item-has-children wionitem-has-children ${navTitle === item.title ? "wionactive" : ""}`}>
                <Link to={item.link}>
                  {item.title}
                  {item.has_dropdown && <span onClick={() => openMobileMenu(item.title)} className="wionmean-expand"></span>}
                </Link>
                {item?.has_dropdown &&
                  <ul className={`sub-menu wionsubmenu ${navTitle === item?.title ? "wionopen" : ""}`} style={{ display: navTitle === item.title ? "block" : "none", }}>
                    {item.has_dropdown && item.sub_menus && item.sub_menus.map((sub_item, index) => (
                      <li className={`${sub_item?.has_sub_dropdown ? 'menu-item-has-children wionitem-has-children' : ''} ${navTitle2 === sub_item.title ? "wionactive" : ""}`} key={index}>
                        <Link to={sub_item.link}>
                          {sub_item.title}
                          {sub_item.has_sub_dropdown && <><span className="wionmean-expand" onClick={() => openMobileMenu2(sub_item.title)}></span><span onClick={() => openMobileMenu2(sub_item.title)} className="wionmean-expand"></span></>}
                        </Link>
                        {sub_item?.has_sub_dropdown &&
                          <ul className={`sub-menu wionsubmenu ${navTitle2 === sub_item?.title ? "wionopen" : ""}`} style={{ display: navTitle2 === sub_item?.title ? "block" : "none", }}>
                            {sub_item.has_sub_dropdown && sub_item.sub_menus && sub_item.sub_menus.map((sub_inner_item, sub_index) => (
                              <li key={sub_index}><Link to={sub_inner_item.link}>{sub_inner_item.title}</Link></li>
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
        </div>
        <div className="wionmobile-menu-btn">
          <Link className="wiondefault-btn wionheader-btn btn2" to="/contact-us1">Book Now
            <span className="wionbutton-icon">
              <img className="arry1" src="assets/images/svg/arrow-right.png" alt="" />
              <img className="arry2" src="assets/images/svg/arrow-right.png" alt="" />
            </span>
          </Link>
        </div>
      </div>
    </div>

  )
}
