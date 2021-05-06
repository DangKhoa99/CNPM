import React, { useState, useRef } from 'react'
import '../../style/Banner.css'
import {Button} from "@material-ui/core"
import * as myConstClass from "../../constants/constantsLanguage"

function Banner({
  language
}) {
  const [inHover, setHover] = useState(false);
  const myRef = useRef(null);

  const scrollToElement = () =>{
    window.scrollTo({
      behavior: "smooth",
      top: myRef.current.offsetHeight - 40
    });
  }

  const myStyleBackground={
    background: `url('${process.env.PUBLIC_URL}/images/banner.jpg') center center/cover no-repeat`
  }

  let content = myConstClass.LANGUAGE
  language === "English"
    ? (content = content.English)
    : (content = content.Vietnam);

  return (
    <div className='banner_container' style={myStyleBackground} ref={myRef}>
      <h1>{content.titleBanner}</h1>
      <p>{content.subTitleBanner}</p>
      
      <div className='banner_btn'>
        <Button 
          variant="outlined"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={scrollToElement}>
          {content.explore} 
          {!inHover &&
          <i className='fas fa-chevron-right'/>}
          {inHover &&
          <i className="fas fa-arrow-right"/>}
        </Button>
      </div>
    </div>
  );
}

export default Banner;
