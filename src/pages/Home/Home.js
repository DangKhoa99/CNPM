import React, {useState} from 'react'
import "../../style/Home.css"
import Banner from '../../components/Home/Banner'

function Home() {
  document.title = "Trang chủ"

  const [data, setData] = useState([
    {
      // src: NhaTrang,
      src: "images/NhaTrang.jpg",
      txt: "Nha Trang",
      link: "nha+trang",
    },
    {
      // src: VungTau,
      src: "images/VungTau.jpg",
      txt: "Vũng Tàu",
      link: "vũng+tàu",
    },
    {
      // src: PhanThiet,
      src: "images/PhanThiet.jpg",
      txt: "Phan Thiết",
      link: "phan+thiết",
    },
    {
      // src: PhuQuoc,
      src: "images/PhuQuoc.jpg",
      txt: "Phú Quốc",
      link: "phú+quốc",
    },
    {
      // src: DaNang,
      src: "images/DaNang.jpg",
      txt: "Đà Nẵng",
      link: "đà+nẵng",
    },
    {
      // src: DaLat,
      src: "images/DaLat.jpg",
      txt: "Đà Lạt",
      link: "dà+lạt",
    },
    {
      // src: Sapa,
      src: "images/Sapa.jpg",
      txt: "Sapa",
      link: "sapa",
    },
  ])

  return (
    <div className='home'>
      {/* <Header /> */}
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
