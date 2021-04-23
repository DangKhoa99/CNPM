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
import { store } from 'react-notifications-component'
import SearchBar from './SearchBar'

function Header() {
  const { token, setToken } = useToken();

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
  console.log("location: ", location.pathname);

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
    })
    
    localStorage.removeItem('authToken');
    setToken(null);

    window.location.reload();
    store.addNotification(notificationLogoutSuccess); 
  }

  // getImageUser
  const [dataCustomer, setDataCustomer] = useState([]);
  const fetchData = async () => {
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
        console.log(response.data)
        setDataCustomer(response.data)
    })
    .catch(error => console.log(error))
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
      fetchData();
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

  // Search bar
  // const [dataSearchLocation, setDataSearchLocation] = useState([]);
  // const [searchLocation, setSearchLocation] = useState("");
  // function onChangeSearchLocation(e){
  //   setSearchLocation(e.target.value);
  // }

  const userName = (dataCustomer.name || "").split(' ').slice(-1).join(' ');

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
            // searchLocation={searchLocation}
            // onChangeSearchLocation={onChangeSearchLocation}
            menuSearchSuggestion={menuSearchSuggestion}
            blockHeader={blockHeader}
            handleMenuSearchSuggestionsClick={handleMenuSearchSuggestionsClick}
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
                <div>Trang chủ</div>
              </a>
            </li>

            <li className='header_item'>
              <p className={colorHeader ? 'header_bar active' : 'header_bar'}/>
            </li>

            <li className={token ? 'header_item login': 'header_item'}>
            {/* <li className='header_item'> */}
              <a 
                href='/sign-in' 
                className={colorHeader ? 'header_links active' : 'header_links'} 
                onClick={closeMobileMenu}
              > 
                Đăng nhập
              </a>
            </li>

            <li className={token ? 'header_item login': 'header_item'}>
            {/* <li className='header_item'> */}
              <a 
                href='/sign-up' 
                className={colorHeader ? 'header_links register active' : 'header_links register'} 
                onClick={closeMobileMenu}
              > 
                Đăng ký
              </a>
            </li>

            {/* Avatar */}
            <li className={token ? 'header_item': 'header_item login'}>
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
                <h3>{dataCustomer.name}
                {dataCustomer.isAdmin ? <p>Admin</p> : ""}
                </h3>
                <ul className="profile_menu_lists">
                  <li className="profile_menu_list">
                    <a href="/account/overview/">{dataCustomer.isAdmin ? <i className="fas fa-user-shield"/> : <i className="fas fa-user"/>} Tài khoản</a>
                  </li>

                  <li className="profile_menu_list">
                    <a href="/account/profile/"><i className="fas fa-user-edit"></i>Chỉnh sửa thông tin</a>
                  </li>

                  <li className={dataCustomer.isAdmin ? "profile_menu_list" : "profile_menu_list notAdmin"}>
                    <a href="/account/admin/user-management/"><i className="fas fa-user-cog"/>Quản lý người dùng</a>
                  </li>

                  <li className={dataCustomer.isAdmin ? "profile_menu_list" : "profile_menu_list notAdmin"}>
                    <a href="/account/admin/hotel-management/"><i className="fas fa-hotel"/> Quản lý khách sạn</a>
                  </li>

                  <li className="profile_menu_list">
                    <a 
                    className="log_out" 
                    onClick={handleLogOut}><i className="fas fa-sign-out-alt"/> Đăng xuất</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
  );
}

export default Header;
