import React, {useState, useEffect, useCallback} from 'react'
import "../../style/SearchCard.css"
import StarIcon from "@material-ui/icons/Star"
import {ReactComponent as Heart} from "../../icons/iconHeart.svg"
import {ReactComponent as RedHeart} from "../../icons/iconRedHeart.svg"
import { store } from 'react-notifications-component'
import axios from 'axios'

import useToken from '../../useToken'

function SearchCard({
    id,
    img,
    address,
    name,
    description,
    price,
    savedHotelId
}) {
    // console.log("asdfjkahjf: ", savedHotelId)
    const { token, setToken } = useToken();
    const [clickFavorite, setClickFavorite] = useState(false);

    const [dataReview, setDataReview] = useState([]);
    const [rating, setRating] = useState(0);

    const _id = {"hotelId": id};

    const loadReviewHotelFromServer = useCallback(async () => {
        await axios.post("http://localhost:5000/hotel/review", _id)
            .then(response => {
                console.log("Data REVIEW: ",response.data)
                if(response.data.length>0){
                    setDataReview(response.data);
                }
                
                
            })
            .catch(error => console.log(error))
    },[id]);

    useEffect(() => {
        for(let i in savedHotelId){
            if(id == savedHotelId[i]){
                setClickFavorite(true)
            }
        }
        loadReviewHotelFromServer();
    },[savedHotelId, loadReviewHotelFromServer])

    let avgReview = 0;
    if(dataReview.length > 0){
        for(var key in dataReview){
            var obj = dataReview[key];
            avgReview = avgReview + obj.score;
        }
        avgReview = (avgReview / dataReview.length).toFixed(1);
    }

    const handleClickFavorite = () => {
        console.log("Click Favorite", token)
        if(!token){
            store.addNotification(notification_requireLogin)
        }
        else{
            setClickFavorite(!clickFavorite);

            if(clickFavorite == true){       
                removeSaveHotel()
                store.addNotification(notification_notSaveFavorite);
            }
            else{
                saveHotel()
                store.addNotification(notification_saveFavorite);
            }
        }
    }

    const saveHotel = async () => {
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "hotelId": id,
                "customerId": token.customerId
            },
            url: "http://localhost:5000/customer/favorite/add"
        }
        axios(options)
        .then(response => {
            console.log("Success: ", response.data)
        })
        .catch(error => console.log("Error:", error))
    }

    const removeSaveHotel = async () => {
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "hotelId": id,
                "customerId": token.customerId
            },
            url: "http://localhost:5000/customer/favorite/delete"
        }
        axios(options)
        .then(response => {
            console.log("Success: ", response.data)
        })
        .catch(error => console.log("Error:", error))
    }

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

    const notification_requireLogin = {
        title: 'RoyalStay - Thông báo',
        message: 'Bạn chưa đăng nhập',
        type: 'danger',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    return (
        <div className="searchCard">
            <a href={'/room-detail?id=' + id}>
                <img className="searchCard_img_hotel" src={img[0]} alt=""/>
            </a>

            <button 
                className="searchCard_btn"
                onClick={() => {handleClickFavorite();}}
            >
                <span className="searchCard_heart">
                    {clickFavorite ? <RedHeart className="searchCard_redHeart_svg" /> : <Heart className="searchCard_heart_svg" />}
                </span>
                {saveFavorite}
            </button>

            <a className="searchCard_links" href={'/room-detail?id=' + id}>
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
                                <strong>{avgReview} ({dataReview.length})</strong>
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
