import React from 'react'
import "../../style/MenuHotelManagement.css"
import StarIcon from "@material-ui/icons/Star"
import * as myConstClass from "../../constants/constantsLanguage"
import { calAvgReview } from "../../helpers/calAvgReview"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function HotelCard({
    id,
    img,
    address,
    name,
    description,
    price,
    review,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    let avgReview = calAvgReview(review);
    return (
        <div className="hotelCard">
            <a style={{height: "200px", width: "350px"}}>
                <Carousel 
                    showThumbs={false}
                    autoPlay={false}
                    showStatus={false}
                    showIndicators={false}
                >
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[0]} alt=""/>
                    </div>
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[1]} alt=""/>
                    </div>
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[2]} alt=""/>
                    </div>
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[3]} alt=""/>
                    </div>
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[4]} alt=""/>
                    </div>
                </Carousel>
            </a>

            <a href={"/room-detail?id=" + id}>
                <button className="menuHotelManagement_btn" title={content.detailRoom}>
                    <i className="fas fa-info-circle" style={{color: "purple"}}/>
                </button>
            </a>

            <button className="menuHotelManagement_btn editHotel" title={content.editHotel}>
                <i className="far fa-edit" style={{color: "green"}}/>
            </button>

            <a className="menuHotelManagement_links">
                <div className="menuHotelManagement_info">
                    <div className="menuHotelManagement_infoTop">
                        <p>{address}</p>
                        <h3>{name}</h3>
                        <p>________</p>
                        <p>{description}</p>
                    </div>
                    <div className="menuHotelManagement_infoBottom">
                        <div className="menuHotelManagement_stars">
                            <StarIcon className="menuHotelManagement_star"/>
                            <p>
                                <strong>{avgReview} </strong>({review.length})
                            </p>
                        </div>
                        <div className="menuHotelManagement_price">
                            <h2>${price}</h2> <p> /{content.night}</p> 
                        </div>
                    </div>
                </div>
            </a>     
        </div>
    )
}

export default HotelCard
