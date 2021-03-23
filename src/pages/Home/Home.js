import React, {useState} from 'react'
import "../../style/Home.css"
import Banner from '../../components/Home/Banner'
import Header from '../../components/Header'
import NhaTrang from "../../images/NhaTrang.jpg"
import VungTau from "../../images/VungTau.jpg"
import PhanThiet from "../../images/PhanThiet.jpg"
import PhuQuoc from "../../images/PhuQuoc.jpg"
import DaNang from "../../images/DaNang.jpg"
import DaLat from "../../images/DaLat.jpg"
import Sapa from "../../images/Sapa.jpg"

function Home() {
  document.title = "Trang chủ"

  const [data, setData] = useState([
    {
      src: NhaTrang,
      txt: "Nha Trang",
      link: "nha-trang",
    },
    {
      src: VungTau,
      txt: "Vũng Tàu",
      link: "vung-tau",
    },
    {
      src: PhanThiet,
      txt: "Phan Thiết",
      link: "phan-thiet",
    },
    {
      src: PhuQuoc,
      txt: "Phú Quốc",
      link: "phu-quoc",
    },
    {
      src: DaNang,
      txt: "Đà Nẵng",
      link: "da-nang",
    },
    {
      src: DaLat,
      txt: "Đà Lạt",
      link: "da-lat",
    },
    {
      src: Sapa,
      txt: "Sapa",
      link: "sapa",
    },
  ])

  return (
    <div className='home'>
      <Header />
      <Banner />

      <div className="home__section">
        <div className="home__heading">
          <h1>ĐIỂM ĐẾN YÊU THÍCH</h1>
        </div>

        <div className="home__destination">
          {data.map(d => {
            return  <div className="home__destination__cell">
                      <a href={'/search-page?result=' + d.link} className="home__link" target="_blank">
                        <img src={d.src} alt={d.txt} className="home__destination__cell__img"/>
                        <div className="home__destination__cell__text">{d.txt}</div>
                      </a>
                    </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
