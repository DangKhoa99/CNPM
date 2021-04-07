import React, { useState } from 'react'
import "../../style/SearchCard.css"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import StarIcon from "@material-ui/icons/Star"
import {ReactComponent as Heart} from "../../icons/iconHeart.svg"
import {ReactComponent as RedHeart} from "../../icons/iconRedHeart.svg"

import { store } from 'react-notifications-component'

function SearchCard({
    id,
    img,
    address,
    name,
    description,
    star,
    price,
}) {
    const [clickFavorite, setClickFavorite] = useState(false);

    const handleClickFavorite = () => setClickFavorite(!clickFavorite);

    let saveFavorite = "Lưu";
    if(clickFavorite == true){
        saveFavorite = "Đã lưu";
    }

    const notification_saveFavorite = {
        title: ' RoyalStay - Thông báo',
        message: 'Đã lưu khách sạn `' + name + '`',
        type: 'success',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const notification_notSaveFavorite = {
        title: 'RoyalStay - Thông báo',
        message: 'Bỏ lưu khách sạn `' + name + '`',
        type: 'danger',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    return (
        <div className="searchCard">
            <a href={'/room-detail?id=' + id} target="_blank">
                <img className="searchCard_img_hotel" src={img[0]} alt=""/>
            </a>

            <button 
                className="searchCard_btn"
                onClick={() => {
                    handleClickFavorite(); 
                    clickFavorite ? store.addNotification(notification_notSaveFavorite) : store.addNotification(notification_saveFavorite)
                }}
            >
                <span className="searchCard_heart">
                    {clickFavorite ? <RedHeart className="searchCard_redHeart_svg" /> : <Heart className="searchCard_heart_svg" />}
                </span>
                {saveFavorite}
            </button>

            <a className="searchCard_links" href={'/room-detail?id=' + id} target="_blank">
                <div className="searchCard_info">
                    <div className="searchCard_infoTop">
                        <p>{address}</p>
                        <h3>{name}</h3>
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
                            <h2>${price}</h2> <p> /đêm</p> 
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default SearchCard
