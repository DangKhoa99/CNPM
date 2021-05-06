import React, {useEffect} from 'react'
import "../../style/Home.css"
import Banner from '../../components/Home/Banner'
import Aos from "aos"
import "aos/dist/aos.css"
import Lottie from "react-lottie"
import animationData from "../../lotties/locationFinding"
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"

function Home() {
  const { language, setLanguage } = useLanguage();
  let content = myConstClass.LANGUAGE;
  language === "English"
    ? (content = content.English)
    : (content = content.Vietnam);

  const data = [
    {
      src: "images/HCMC.jpg",
      txt: "TP. Hồ Chí Minh",
      link: "Hồ Chí Minh",
    },
    {
      src: "images/VungTau.jpg",
      txt: "Vũng Tàu",
      link: "vũng+tàu",
    },
    {
      src: "images/PhanThiet.jpg",
      txt: "Phan Thiết",
      link: "phan+thiết",
    },
    {
      src: "images/PhuQuoc.jpg",
      txt: "Phú Quốc",
      link: "phú+quốc",
    },
    {
      src: "images/DaNang.jpg",
      txt: "Đà Nẵng",
      link: "đà+nẵng",
    },
    {
      src: "images/DaLat.jpg",
      txt: "Đà Lạt",
      link: "đà+lạt",
    },
    {
      src: "images/HaNoi.jpg",
      txt: "Hà Nội",
      link: "Hà Nội",
    },
  ]

  useEffect(() => {
    Aos.init({ 
      duration: 500,
      once: true
    });
    Aos.refresh();
  })

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  document.title = content.home + " | RoyalStay"
  return (
    <div className='home'>
      <Banner 
        language={language}
      />

      <div className="home_section">
        <div className="home_heading">
          <Lottie 
            options={defaultOptions}
            height={100}
            width={100}/>
          {/* <img src="images/Place.png"/> */}
          <h1>{content.favoriteDestination}</h1>
          {/* <h1>TEST</h1> */}
        </div>

        <div className="home_destination" data-aos="fade-right">
          {data.map((d, index) => {
            return  <div key={index + d} className="home_destination_cell">
                      <a href={'/search-page?result=' + d.link} className="home_link">
                        <img src={d.src} alt={d.txt} className="home_destination_cell_img"/>
                        <div className="home_destination_cell_text">{d.txt}</div>
                      </a>
                    </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
