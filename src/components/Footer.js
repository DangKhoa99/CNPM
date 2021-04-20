import React, {useState, useEffect} from 'react'
import '../style/Footer.css'
import { Link } from 'react-router-dom'
import {Button} from "@material-ui/core"
import {ReactComponent as LogoRoyalStay} from "../icons/logoRoyalStay.svg"
import { useLocation } from 'react-router-dom'

function Footer() {
  const location = useLocation();
  const data = [
    {
      title: "GIỚI THIỆU",
      links: [
        "Phương thức hoạt động",
        "Trang tin tức",
        "Nhà đầu tư",
        "Cơ hội nghề nghiệp",
        "Quyền riêng tư",
        "Điều khoản dịch vụ",
      ],
    },
    {
      title: "CỘNG ĐỒNG",
      links: [
        "Đối tác",
        "Mời bạn bè",
      ],
    },
    {
      title: "ĐÓN TIẾP KHÁCH",
      links: [
        "Cho thuê phòng",
        "Tổ chức trải nghiệm",
        "Đón tiếp khách có trách nhiệm",
        "Trung tâm cộng đồng",
      ],
    },
    {
      title: "HỖ TRỢ",
      links: [
        "Trung tâm trợ giúp",
        "Hỗ trợ khu dân cư",
        "Tin cậy và an toàn",
      ],
    },
  ]

  // Bấm vào logo để lên đầu trang
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const [hideFooter, setHideFooter] = useState(false);

  const handleHideFooter = () =>{
    if(location.pathname == "/404" || location.pathname == "/sign-in" || location.pathname == "/sign-up"){
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
          <Button className="footer_btn_to_top" title="Lên đầu trang" variant="outlined" onClick={scrollToTop}>
            <i class="fas fa-arrow-up"/>
          </Button>
        </div>
        
        <div class='footer_links'>
            {data.map(d => {
              return  <div class='footer_link_items'>
                        <h2>{d.title}</h2> 
                        {d.links.map(link => {
                          return <Link to='/'>{link}</Link>
                        })}
                      </div>
            })}
        </div>

        <section class='social_media'>
          <div class='social_media_wrap'>
            <div class='footer_logo'>
              <LogoRoyalStay />
            </div>

            <small class='website_rights'>© 2021 RoyalStay</small>

            <div class='social_icons'>
              <a href="https://www.facebook.com/royalStay" class="social_icon_link facebook" target="_blank" title="Facebook">
                <i class='fab fa-facebook-f' />
              </a>

              <a href="https://www.instagram.com/royalStay" class="social_icon_link instagram" target="_blank" title="Instagram">
                <i class='fab fa-instagram' />
              </a>

              <a href="https://www.youtube.com/royalStay" class="social_icon_link youtube" target="_blank" title="Youtube">
                <i class='fab fa-youtube' />
              </a>

              <a href="https://twitter.com/royalStay" class="social_icon_link twitter" target="_blank" title="Twitter">
                <i class='fab fa-twitter' />
              </a>

              <a href="https://www.linkedin.com/company/royalStay" class="social_icon_link linkedin" target="_blank" title="LinkedIn">
                <i class='fab fa-linkedin' />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Footer;
