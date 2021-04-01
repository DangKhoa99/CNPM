import React from 'react'
import "../../style/SearchCard.css"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import StarIcon from "@material-ui/icons/Star"
import {ReactComponent as Heart} from "../../icons/iconHeart.svg"

function SearchCard({
    img,
    location,
    title,
    description,
    star,
    price,
}) {
    return (
        <div className="searchCard">
            <img src={img} alt=""/>

            <button className="searchCard_btn">
                <span className="searchCard_heart">
                    <Heart className="searchCard_heart_svg"/>
                </span>
                Lưu
            </button>

            {/* <FavoriteBorderIcon className="searchCard_heart"/> */}
            <div className="searchCard_info">
                <div className="searchCard_infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>________</p>
                    <p>{description}</p>
                </div>
                <div className="searchCard_infoBottom">
                    <div className="searchCard_stars">
                        <StarIcon className="searchCard_star"/>
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div>
                    <div className="searchCard_price">
                        <h2>{price}</h2> <p> /đêm</p> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
