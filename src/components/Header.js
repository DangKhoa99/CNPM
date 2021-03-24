import React, { useState, useEffect } from 'react'
import '../style/Header.css'
import { Link, useLocation } from 'react-router-dom'
import {Button} from "@material-ui/core"
import {ReactComponent as LogoAirbnb} from "../icons/logoAirbnb.svg"
import {ReactComponent as Logo} from "../icons/logoAirbn.svg"
import Aos from "aos"
import "aos/dist/aos.css"

import {Avatar} from "@material-ui/core"
// import {animateScroll as scroll} from "react-scroll"

// Thanh header của website
function Header() {
  // vị trí địa chỉ trình duyệt hiện tại
  const location = useLocation();
  // console.log(location.pathname);

  const [click, setClick] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [buttonSignIn, setButtonSignIn] = useState(true);
  const [colorHeader, setColorHeader] = useState(true);

  // Nhấp để mở menu khi Responsive
  const handleClick = () => setClick(!click);

  const openProfileMenu = () => setProfileMenu(!profileMenu);

  // Nhấp để đóng menu khi Responsive
  const closeMobileMenu = () => setClick(false);

  // Hiện nút Đăng ký khi Responsive
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButtonSignIn(false);
    } 
    else {
      setButtonSignIn(true);
    }
  };

  // Đổi màu Header khi SCROLL ở Trang chủ
  const changeBackground = () =>{
    if(location.pathname == "/"){
      if(window.scrollY <= 80){
        setColorHeader(false);
      }
      else{
        setColorHeader(true);
      }
    }
    else{
      setColorHeader(true);
    }
  }

  // Bấm vào logo để lên đầu trang
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  
  useEffect(() => {
    Aos.init({ 
      duration: 500,
      once: true
    });
    Aos.refresh();
    showButton();
    changeBackground();

    // Chỉ đổi màu thanh Header khi scroll ở Trang chủ
    if(location.pathname != "/"){
      changeBackground();
      window.removeEventListener('scroll', changeBackground);
    }
    else
      window.addEventListener('scroll', changeBackground);

  }, []); 

  // Hiện nút Đăng ký khi Responsive
  window.addEventListener('resize', showButton);



  return (
      <nav className={colorHeader ? 'header active' : 'header'}>
        <div className='header_container'>
          <Link to='/' className={colorHeader ? 'header_logo active' : 'header_logo'} onClick={() => {closeMobileMenu(); scrollToTop();}}>
              {buttonSignIn ? <LogoAirbnb /> : <Logo />}
          </Link>

          <div className={colorHeader ? "header_search active" : "header_search"}>
            <input className={colorHeader ? "input_search active" : "input_search"} type="text" placeholder="Bạn sắp đi đâu?"/>
            <Button href="/search-page?result=">
              <div class="search_icon">
                <svg viewBox="0 0 32 32">
                  <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"/>
                </svg>
              </div>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className='menu_icon' onClick={handleClick}>
            <i className={click ? colorHeader ? 'fas fa-times headerMenuIcon_active' : 'fas fa-times headerMenuIcon' : colorHeader ? 'fas fa-bars headerMenuIcon_active' : 'fas fa-bars headerMenuIcon'} />
          </div>

          <ul className={click ? colorHeader ? 'header_menu active scroll' : 'header_menu active' : 'header_menu'} data-aos={click ? "" : "fade-left"}>
            <li className='header_item'>
              <a href='/' className={colorHeader ? 'header_links active' : 'header_links'} onClick={closeMobileMenu}> 
                <div>Trang chủ</div>
                
              </a>
            </li>

            <li className='header_item'>
              <p className={colorHeader ? 'header_bar active' : 'header_bar'}/>
            </li>

            <li className='header_item'>
              <a href='/sign-up' className={colorHeader ? 'header_links active' : 'header_links'} onClick={closeMobileMenu}> 
                Đăng ký
              </a>
            </li>

            <li className='header_item'>
              <a href='/sign-in' className={colorHeader ? 'header_links active' : 'header_links'} onClick={closeMobileMenu}> 
                Đăng nhập
              </a>
            </li>

            <li className='header_item'>
              <button className={colorHeader ? 'header_avatar active' : 'header_avatar'} onClick={openProfileMenu}>
                <Avatar className="avatar_header" alt="dangkhoa99" src="/images/Khoa.jpg"/>
                <span>Hồ sơ</span>
                <svg viewBox="0 0 1024 1024" className={profileMenu ? "reverse_svg" : ""}>
                  <path d="M476.455 806.696L95.291 425.532Q80.67 410.911 80.67 390.239t14.621-34.789 35.293-14.117 34.789 14.117L508.219 698.8l349.4-349.4q14.621-14.117 35.293-14.117t34.789 14.117 14.117 34.789-14.117 34.789L546.537 800.142q-19.159 19.159-38.318 19.159t-31.764-12.605z"/>
                </svg>
              </button>

              <div className={profileMenu ? "profile_menu" : "profile_menu close"}>
                <ul className="profile_menu_lists">
                  <li className="profile_menu_list">
                    <a href="/account/overview/">Tài khoản</a>
                  </li>
                  <li className="profile_menu_list">
                    <a className="log_out" href="#">Đăng xuất</a>
                  </li>
                </ul>

              </div>
            </li>



            {/* <li className='header_item'>
              <Link to='/host/homes' className={colorHeader ? 'header_links active' : 'header_links'} onClick={closeMobileMenu}>
                Trở thành chủ nhà
              </Link>
            </li> */}

            {/* <li>
              <Link to='/sign-in' className={colorHeader ? 'header_links_mobile active' : 'header_links_mobile'} onClick={closeMobileMenu}>
                Đăng nhập
              </Link>
            </li> */}
          </ul>
          {/* {buttonSignIn && <Button className={colorHeader ? "header_btn_signIn active" : "header_btn_signIn"} variant="outlined" href="/sign-up">ĐĂNG KÝ</Button>} */}
        </div>
      </nav>
  );
}

export default Header;
