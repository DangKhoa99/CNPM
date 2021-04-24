import React, {useState, useEffect} from 'react'
import "../../style/MenuHotelManagement.css"
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
            <a>
                <img className="menuHotelManagement_img_hotel" src={img[0]} alt=""/>
            </a>

            <a href={"/room-detail?id=" + id}>
                <button className="menuHotelManagement_btn" title="Chi tiết khách sạn">
                    <i className="fas fa-info-circle" style={{color: "purple"}}/>
                </button>
            </a>

            <button className="menuHotelManagement_btn editHotel" title="Chỉnh sửa khách sạn">
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
                                <strong>0 (0)</strong>
                            </p>
                        </div>
                        <div className="menuHotelManagement_price">
                            <h2>${price}</h2> <p> /đêm</p> 
                        </div>
                    </div>
                </div>
            </a>     
        </div>
    )
}

export default HotelCard
