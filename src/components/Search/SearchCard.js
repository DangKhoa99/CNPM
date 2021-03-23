import React from 'react'
import "../../style/SearchCard.css"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import StarIcon from "@material-ui/icons/Star"

function SearchCard({
    img,
    location,
    title,
    description,
    star,
    price,
    total,
}) {
    return (
        <div className="searchCard">
            <img src={img} alt=""/>
            <FavoriteBorderIcon className="searchCard_heart"/>
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
                        <p>{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
