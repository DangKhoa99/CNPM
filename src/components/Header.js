import React, { useState, useEffect } from 'react'
import '../style/Header.css'
import { useLocation } from 'react-router-dom'
import {ReactComponent as LogoRoyalStay} from "../icons/logoRoyalStay.svg"
import {ReactComponent as Logo} from "../icons/logo.svg"
import Aos from "aos"
import "aos/dist/aos.css"
import {ReactComponent as IconLocation} from "../icons/iconBooking.svg"
import {Avatar} from "@material-ui/core"

function Header() {
  // vị trí địa chỉ trình duyệt hiện tại
  const location = useLocation();
  console.log(location.pathname);

  const [buttonSignIn, setButtonSignIn] = useState(true);
  const [colorHeader, setColorHeader] = useState(true);

  // const [hideHeader, setHideHeader] = useState(false);

  const [menuMobile, setMenuMobile] = useState(false);
  const [menuProfile, setMenuProfile] = useState(false);
  const [menuSearchSuggestion, setMenuSearchSuggestion] = useState(false);
  const [menuSearchSuggestionsClick, setMenuSearchSuggestionsClick] = useState(false);

  // menuMobile
  const openMenuMobile = () => setMenuMobile(!menuMobile);

  // profileMenu
  const openMenuProfile = () => setMenuProfile(!menuProfile);

  // searchSuggestion
  const openMenuSearchSuggestion = () => setMenuSearchSuggestion(true);
  const closeMenuSearchSuggestion = () => {
    if(menuSearchSuggestionsClick == false){
      setMenuSearchSuggestion(false);
    }
  }
  
  // menuSearchSuggestionsClick
  const handleMenuSearchSuggestionsClick = (e) => {
    setMenuSearchSuggestionsClick(true);
  }

  // Nhấp để đóng menu khi Responsive
  const closeMobileMenu = () => setMenuMobile(false);

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

  console.log("Test Header: " + window.location.href)

  // Bấm vào logo để lên đầu trang
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  
  // const handleHideHeader = () =>{
  //   if(location.pathname == "/404"){
  //     setHideHeader(true);
  //   }
  //   else{
  //     setHideHeader(false);
  //   }
  // }

  
  useEffect(() => {
    Aos.init({ 
      duration: 500,
      once: true
    });
    Aos.refresh();
    showButton();
    changeBackground();
    // handleHideHeader();

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
      <nav className={
        // hideHeader ? 'header hideHeader' : 
      colorHeader ? 'header active' : 'header'}>
        <div className='header_container'>

          {/* Logo */}
          <a 
            href='/' 
            className={colorHeader ? 'header_logo active' : 'header_logo'} 
            onClick={() => {closeMobileMenu(); scrollToTop();}}
          >
            {buttonSignIn ? <LogoRoyalStay /> : <Logo />}
          </a>

          {/* Search Bar */}
          <div 
            className={colorHeader ? "header_search active" : "header_search"} 
            onClick={openMenuSearchSuggestion} 
            onBlur={closeMenuSearchSuggestion}
          >
            <form action="/search-page">
              <input 
                type="text" 
                name="result" 
                className={colorHeader ? "input_search active" : "input_search"} 
                placeholder="Bạn sắp đi đâu?" 
                spellCheck="false"
                autocomplete="off"
              />
            </form>
            <a 
              href="/search-page?result=" 
              className={colorHeader ? "header_search_btn active" : "header_search_btn"}
            >
              <i class="fas fa-search"></i>
            </a>

            {/* Menu Search Suggestion */}
            <div 
              className={menuSearchSuggestion ? "search_suggestions" : "search_suggestions close"} 
              onMouseDown={handleMenuSearchSuggestionsClick}
            >
              <ul className="search_suggestions_lists">
                <li className="search_suggestions_item">       
                    <a 
                      className="search_suggestions_link" 
                      href="/search-page?result=Hồ+Chí+Minh"
                    >
                      Hồ Chí Minh
                      <IconLocation />
                    </a>
                </li>

                <li className="search_suggestions_item">
                  <a 
                    className="search_suggestions_link" 
                    href="/search-page?result=Đà+Nẵng"
                  >
                    Đà Nẵng
                    <IconLocation />
                  </a>
                </li>

                <li className="search_suggestions_item">
                  <a 
                    className="search_suggestions_link" 
                    href="/search-page?result=Hà+Nội"
                  >
                    Hà Nội
                    <IconLocation />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div 
            className='menu_icon' 
            onClick={openMenuMobile}
          >
            <i 
              className={menuMobile ? 
                colorHeader ? 'fas fa-times headerMenuIcon_active' : 'fas fa-times headerMenuIcon' 
                : 
                colorHeader ? 'fas fa-bars headerMenuIcon_active' : 'fas fa-bars headerMenuIcon'} 
            />
          </div>

          {/* Trang chủ - Đăng ký - Đăng nhập - Avatar */}
          <ul 
            className={menuMobile ? 
              colorHeader ? 'header_menu active scroll' : 'header_menu active' 
              :
              'header_menu'} 
            data-aos={menuMobile ? "" : "fade-left"}
          >
            <li className='header_item'>
              <a 
                href='/' 
                className={colorHeader ? 'header_links active' : 'header_links'} 
                onClick={closeMobileMenu}
              > 
                <div>Trang chủ</div>
              </a>
            </li>

            <li className='header_item'>
              <p className={colorHeader ? 'header_bar active' : 'header_bar'}/>
            </li>

            <li className='header_item'>
              <a 
                href='/sign-in' 
                className={colorHeader ? 'header_links active' : 'header_links'} 
                onClick={closeMobileMenu}
              > 
                Đăng nhập
              </a>
            </li>

            <li className='header_item'>
              <a 
                href='/sign-up' 
                className={colorHeader ? 'header_links register active' : 'header_links register'} 
                onClick={closeMobileMenu}
              > 
                Đăng ký
              </a>
            </li>

            {/* Avatar */}
            <li className='header_item'>
              <button 
                className={colorHeader ? 'header_avatar active' : 'header_avatar'} 
                onClick={openMenuProfile}
              >
                <Avatar 
                  className="avatar_header" 
                  alt="dangkhoa99" 
                  src="/images/Khoa.jpg"
                />

                <span>Hồ sơ</span>

                <svg 
                  viewBox="0 0 1024 1024" 
                  className={menuProfile ? "reverse_svg" : ""}
                >
                  <path d="M476.455 806.696L95.291 425.532Q80.67 410.911 80.67 390.239t14.621-34.789 35.293-14.117 34.789 14.117L508.219 698.8l349.4-349.4q14.621-14.117 35.293-14.117t34.789 14.117 14.117 34.789-14.117 34.789L546.537 800.142q-19.159 19.159-38.318 19.159t-31.764-12.605z"/>
                </svg>
              </button>

              {/* Menu hồ sơ */}
              <div className={menuProfile ? "profile_menu" : "profile_menu close"}>
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
