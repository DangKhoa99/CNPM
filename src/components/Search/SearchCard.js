import React, {useState, useEffect, useCallback} from 'react'
import "../../style/SearchCard.css"
import StarIcon from "@material-ui/icons/Star"
import { store } from 'react-notifications-component'
import axios from 'axios'
import useToken from '../../hooks/useToken'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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
                if(response.data.length > 0){
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
            <li class="product__item">
                <div class="product__thumbnail"> 
                    {/* <img src={img[0]} alt="thumbnail"/> */}
                    <Carousel 
                        showThumbs={false}
                        autoPlay={false}
                        showStatus={false}
                        showIndicators={false}
                    >
                        <div>
                            <img src={img[0]}/>
                        </div>
                        <div>
                            <img src={img[1]}/>
                        </div>
                        <div>
                            <img src={img[2]}/>
                        </div>
                        <div>
                            <img src={img[3]}/>
                        </div>
                        <div>
                            <img src={img[4]}/>
                        </div>
                    </Carousel>
                


                    <button class="product__love-icon" onClick={() => {handleClickFavorite();}}>
                        {clickFavorite ? <i class="fas fa-heart"></i> : <i class="far fa-heart"/>}
                    </button>
                    <div className="product__love-iconLeft">
                        <div className="searchCard_stars">
                            <StarIcon className="searchCard_star"/>
                            <p>
                                <strong>{avgReview}</strong> ({dataReview.length})
                            </p>
                        </div>
                    </div>
                </div>
                <div class="product__price">
                    <span style={{fontSize: "24px"}}><strong>${price}</strong></span>
                    <span style={{fontSize: "14px"}}>/đêm</span>
                </div>
                <div class="product__detail">
                    <p className="product__address"><i class="fas fa-map-marker-alt"/> {address}</p>
                    <h1 class="product__title">
                        {name}
                    </h1>
                    <p class="product__description">
                        {description}
                    </p>
                    <a href={'/room-detail?id=' + id} class="product__button"><i class="fas fa-hotel"/>  Xem chi tiết</a>
                </div>
            </li>



            {/* <a href={'/room-detail?id=' + id}>
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
            </a> */}
        </div>
    )
}

export default SearchCard
