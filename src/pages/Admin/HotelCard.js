import React, {useState, useEffect} from 'react'
import "../../style/HotelManagement.css"
import StarIcon from "@material-ui/icons/Star"

function HotelCard({
    id,
    img,
    address,
    name,
    description,
    price
}) {
    return (
        <div className="hotelCard">
            <a href="#">
                <img className="hotelManagement_img_hotel" src={img[0]} alt=""/>
            </a>

            <button className="hotelManagement_btn" title="Chi tiết khách sạn">
                <i class="fas fa-info-circle" style={{color: "purple"}}/>
            </button>

            <button className="hotelManagement_btn editHotel" title="Chỉnh sửa khách sạn">
                <i class="far fa-edit" style={{color: "green"}}/>
            </button>

            <a className="hotelManagement_links" href="">
                <div className="hotelManagement_info">
                    <div className="hotelManagement_infoTop">
                        <p>{address}</p>
                        <h3>{name}</h3>
                        <p>________</p>
                        <p>{description}</p>
                    </div>
                    <div className="hotelManagement_infoBottom">
                        <div className="hotelManagement_stars">
                            <StarIcon className="hotelManagement_star"/>
                            <p>
                                <strong>0 (0)</strong>
                            </p>
                        </div>
                        <div className="hotelManagement_price">
                            <h2>${price}</h2> <p> /đêm</p> 
                        </div>
                    </div>
                </div>
            </a>     
        </div>
    )
}

export default HotelCard
