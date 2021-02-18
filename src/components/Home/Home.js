import React from 'react'
import "./Home.css"
import Banner from './Banner'
import Header from '../Header'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home'>
      <Header/>
      <Banner />

      <div className="home__section">
        <div className="home__heading">
          <h1>ĐIỂM ĐẾN YÊU THÍCH</h1>
        </div>

        <div className="home__destination">
          <div className="home__destination__cell">
            <Link to='/search-page?search=nha-trang' className="home__link">
              <img src="./images/NhaTrang.jpg" alt="Nha Trang" className="home__destination__cell__img"/>
              <div className="home__destination__cell__text">Nha Trang</div>
            </Link>
          </div>
       
          <div className="home__destination__cell">
            <Link to='/search-page?search=vung-tau' className="home__link">
              <img src="./images/VungTau.jpg" alt="Vũng Tàu" className="home__destination__cell__img"/>
              <div className="home__destination__cell__text">Vũng Tàu</div>
            </Link>
          </div>
          
          <div className="home__destination__cell">          
            <Link to='/search-page?search=phan-thiet' className="home__link">
              <img src="./images/PhanThiet.jpg" alt="Phan Thiết" className="home__destination__cell__img"/>
              <div className="home__destination__cell__text">Phan Thiết</div>
            </Link>
          </div>
          
          <div className="home__destination__cell">
            <Link to='/search-page?search=phu-quoc' className="home__link">
              <img src="./images/PhuQuoc.jpg" alt="Phú Quốc" className="home__destination__cell__img"/>
              <div className="home__destination__cell__text">Phú Quốc</div>
            </Link>
          </div>
          
          <div className="home__destination__cell">
            <Link to='/search-page?search=da-nang' className="home__link">
              <img src="./images/DaNang.jpg" alt="Đà Nẵng" className="home__destination__cell__img"/>
              <div className="home__destination__cell__text">Đà Nẵng</div>
            </Link>
          </div>
            
          <div className="home__destination__cell">
            <Link to='/search-page?search=da-lat' className="home__link">
              <img src="./images/DaLat.jpg" alt="Đà Lạt" className="home__destination__cell__img"/>
              <div className="home__destination__cell__text">Đà Lạt</div>
            </Link>
          </div>
                  
          <div className="home__destination__cell">
            <Link to='/search-page?search=sapa' className="home__link">
              <img src="./images/Sapa.jpg" alt="Sapa" className="home__destination__cell__img"/>
              <div className="home__destination__cell__text">Sapa</div>
            </Link>
          </div>         
        </div>
      </div>
    </div>
  );
}

export default Home;
