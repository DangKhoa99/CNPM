import React from 'react'
import "./SearchCard.css"
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
            <FavoriteBorderIcon className="searchCard__heart"/>
            <div className="searchCard__info">
                <div className="searchCard__infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>________</p>
                    <p>{description}</p>
                </div>
                <div className="searchCard__infoBottom">
                    <div className="searchCard__stars">
                        <StarIcon className="searchCard__star"/>
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div>
                    <div className="searchCard__price">
                        <h2>{price}</h2> <p> /đêm</p> 
                        <p>{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchCard
