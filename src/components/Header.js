import React, { useState, useEffect } from 'react'
import '../style/Header.css'
import { useLocation } from 'react-router-dom'
import {ReactComponent as LogoRoyalStay} from "../icons/logoRoyalStay.svg"
import {ReactComponent as Logo} from "../icons/logo.svg"
import Aos from "aos"
import "aos/dist/aos.css"
import {Avatar} from "@material-ui/core"
import axios from 'axios'
import useToken from '../hooks/useToken'
import useLanguage from '../hooks/useLanguage'
import { store } from 'react-notifications-component'
import SearchBar from './SearchBar'
import * as myConstClass from "../constants/constantsLanguage"

function Header(){
  const { token, setToken } = useToken();
  const { language, setLanguage } = useLanguage();

  const handleSetLanguage= (e) => {
    setLanguage(e.target.value);
    window.location.reload();
  }

  const notificationLogoutSuccess = {
    title: ' RoyalStay - Thông báo',
    message: 'Đăng xuất thành công',
    type: 'success',
    container: 'bottom-left',
    dismiss: {
        duration: 2000
    }
};

  // vị trí địa chỉ trình duyệt hiện tại
  const location = useLocation();
  // console.log("location: ", location.pathname);

  const [buttonSignIn, setButtonSignIn] = useState(true);
  const [colorHeader, setColorHeader] = useState(true);

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

  const [hideHeader, setHideHeader] = useState(false);
  const handleHideHeader = () =>{
    if(location.pathname == "/404" || location.pathname == "/sign-in" || location.pathname == "/sign-up"){
      setHideHeader(true)
    }
    else{
      setHideHeader(false);
    }
  }

  const [blockHeader, setBlockHeader] = useState(false);
  const handleBlockHeader = () =>{
    if(location.pathname == "/room-detail" || location.pathname == "/booking"){
      setBlockHeader(true)
    }
    else{
      setBlockHeader(false);
    }
  }

  // console.log("Test Header: " + window.location.href)

  // Bấm vào logo để lên đầu trang
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  // console.log("token before logout", token)
  //log out
  const handleLogOut = async () => {
    const options = {
      method: "POST",
      headers: {
        'auth-token': token.authToken,
      },
      data: {},
      url: "http://localhost:5000/auth/logout"  
    };
    axios(options)
      .then(response => {
        console.log("logout: ", response.data);
        if(response.data == "Đăng xuất thành công"){
          localStorage.removeItem('authToken');
          setToken(null);
          window.location.reload();
          store.addNotification(notificationLogoutSuccess); 
        }
      })
      .catch(error => console.log("Error LogOut: ", error))
  }

  // getImageUser
  const [dataCustomer, setDataCustomer] = useState([]);
  const getImageUser = async () => {
    const options = {
        method: "POST",
        headers: {
            "auth-token": token.authToken,
        },
        data: {
            "customerId": token.customerId
        },
        url: "http://localhost:5000/customer/"
    }
    axios(options)
    .then(response => {
        // console.log("dATA: ", response.data)
        setDataCustomer(response.data)
    })
    .catch(error => {
      console.log("Error: ", error)
      setDataCustomer([]);
      localStorage.removeItem('authToken');
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
    handleHideHeader();
    handleBlockHeader();
    if(token){
      getImageUser();
    }

    // Chỉ đổi màu thanh Header khi scroll ở Trang chủ
    if(location.pathname != "/"){
      changeBackground();
      window.removeEventListener('scroll', changeBackground);
    }
    else
      window.addEventListener('scroll', changeBackground);

  }, [location]); 

  // Hiện nút Đăng ký khi Responsive
  window.addEventListener('resize', showButton);

  const userName = (dataCustomer.name || "").split(' ').slice(-1).join(' ');

  let content = myConstClass.LANGUAGE;
  language === "English"
    ? (content = content.English)
    : (content = content.Vietnam);

  return (
      <nav className={
        hideHeader ? 
        "header hideHeader" 
        : 
        colorHeader ? 
          blockHeader ? 'header staticHeader': 'header active' 
          : 
          'header'
      }>
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
          <SearchBar
            colorHeader={colorHeader}
            openMenuSearchSuggestion={openMenuSearchSuggestion}
            closeMenuSearchSuggestion={closeMenuSearchSuggestion}
            menuSearchSuggestion={menuSearchSuggestion}
            blockHeader={blockHeader}
            handleMenuSearchSuggestionsClick={handleMenuSearchSuggestionsClick}
            language={language}
          />
          
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
                <div>{content.home}</div>
              </a>
            </li>

            <li className='header_item'>
              <p className={colorHeader ? 'header_bar active' : 'header_bar'}/>
            </li>

            <li className={token && dataCustomer.length != 0 ? 'header_item login': 'header_item'}>
            {/* <li className='header_item'> */}
              <a 
                href='/sign-in' 
                className={colorHeader ? 'header_links active' : 'header_links'} 
                onClick={closeMobileMenu}
              > 
                {content.login}
              </a>
            </li>

            <li className={token && dataCustomer.length != 0 ? 'header_item login': 'header_item'}>
            {/* <li className='header_item'> */}
              <a 
                href='/sign-up' 
                className={colorHeader ? 'header_links register active' : 'header_links register'} 
                onClick={closeMobileMenu}
              > 
                {content.register}
              </a>
            </li>

            {/* Avatar */}
            <li className={token && dataCustomer.length != 0 ? 'header_item': 'header_item login'}>
            {/* <li className='header_item'> */}
              <button 
                className={colorHeader ? 'header_avatar active' : 'header_avatar'} 
                onClick={openMenuProfile}
              >
                <Avatar 
                  className="avatar_header" 
                  alt={userName}
                  src={dataCustomer.name}
                />
              </button>

              {/* Menu hồ sơ */}
              <div className={menuProfile ? dataCustomer.isAdmin ? "profile_menu isAdmin" : "profile_menu" : "profile_menu close"}>
                <h3>{dataCustomer.name} {dataCustomer.isAdmin ? <i style={{color: "green", fontSize: "14px"}} className="fas fa-check-circle"/> : ""}
                {dataCustomer.isAdmin ? <p>Admin</p> : ""}
                </h3>
                <ul className="profile_menu_lists">
                  <li className="profile_menu_list">
                    <a href="/account/overview/">{dataCustomer.isAdmin ? <i className="fas fa-user-shield"/> : <i className="fas fa-user"/>} {content.account}</a>
                  </li>
                  {dataCustomer.isAdmin ? "" :
                    <li className="profile_menu_list">
                      <a href="/account/history-booking/"><i className="fas fa-calendar-alt"></i>{content.hotelBookingHistory}</a>
                    </li>
                  }

                  <li className={dataCustomer.isAdmin ? "profile_menu_list" : "profile_menu_list notAdmin"}>
                    <a href="/account/admin/user-management/"><i className="fas fa-cogs"/>{content.management}</a>
                  </li>

                  <li className="profile_menu_list">
                    <a 
                    className="log_out" 
                    onClick={handleLogOut}><i className="fas fa-sign-out-alt"/> {content.logout}</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          
          <div className="language-select">
            <select
              className="custom_select"
              value={language}
              onChange={handleSetLanguage}
            >
              <option value="Vietnam">{content.vietnam}</option>
              <option value="English">{content.english}</option>
            </select>
          </div>

        </div>
      </nav>
  );
}

export default Header;
