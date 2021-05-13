import React, {useState, useEffect} from 'react'
import '../style/Footer.css'
import { Link } from 'react-router-dom'
import {ReactComponent as LogoRoyalStay} from "../icons/logoRoyalStay.svg"
import { useLocation } from 'react-router-dom'
import Singleton from "../constants/Singleton"

function Footer() {
  const location = useLocation();

  // Singleton pattern
  const data =  new Singleton();
  // console.log(typeof(data))
  // console.log((data))
  // console.log("data: ", data.data[0].title = "aaa");

  // Bấm vào logo để lên đầu trang
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const [hideFooter, setHideFooter] = useState(false);

  const handleHideFooter = () =>{
    if(location.pathname == "/404" || location.pathname == "/sign-in" || location.pathname == "/sign-up" || location.pathname == "/account/admin/user-management/" || location.pathname == "/account/admin/hotel-management/" || location.pathname == "/account/admin/add-user/" || location.pathname == "/account/admin/add-hotel/" || location.pathname == "/account/admin/detail-user"){
      setHideFooter(true)
    }
    else{
      setHideFooter(false);
    }
  }

  useEffect(() => {
    handleHideFooter();
  }, [location]); 

  return (
    <div className="footer">  
      <div className={hideFooter ? "footer_container hideFooter" : "footer_container"}>
        <div className='footer_to_top'>
          <button className="footer_btn_to_top" title="Lên đầu trang" variant="outlined" onClick={scrollToTop}>
            <i className="fas fa-arrow-up"/>
          </button>
        </div>
        
        <div className='footer_links'>
            {data.data.map((d, index) => {
              return  <div key={index + d} className='footer_link_items'>
                        <h2>{d.title}</h2> 
                        {d.links.map((link, index1) => {
                          return <Link key={index1 + link} to='/'>{link}</Link>
                        })}
                      </div>
            })}
        </div>

        <section className='social_media'>
          <div className='social_media_wrap'>
            <div className='footer_logo'>
              <LogoRoyalStay />
            </div>

            <div className="center_footer">
              <small className='website_rights'>© 2021 RoyalStay</small>
              <p style={{width: "150%", marginBottom: "20px"}}>Made with ❤️ by
              <b><span></span></b>
              </p>  
            </div>

            <div className='social_icons'>
              <a href="https://www.facebook.com/royalStay" className="social_icon_link facebook" target="_blank" title="Facebook">
                <i className='fab fa-facebook-f' />
              </a>

              <a href="https://www.instagram.com/royalStay" className="social_icon_link instagram" target="_blank" title="Instagram">
                <i className='fab fa-instagram' />
              </a>

              <a href="https://www.youtube.com/royalStay" className="social_icon_link youtube" target="_blank" title="Youtube">
                <i className='fab fa-youtube' />
              </a>

              <a href="https://twitter.com/royalStay" className="social_icon_link twitter" target="_blank" title="Twitter">
                <i className='fab fa-twitter' />
              </a>

              <a href="https://www.linkedin.com/company/royalStay" className="social_icon_link linkedin" target="_blank" title="LinkedIn">
                <i className='fab fa-linkedin' />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Footer;
