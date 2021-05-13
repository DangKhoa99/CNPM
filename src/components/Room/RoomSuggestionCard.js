import React, {useState, useEffect} from 'react'
import "../../style/RoomSuggestionCard.css"
import StarIcon from "@material-ui/icons/Star"
import { store } from 'react-notifications-component'
import axios from 'axios'
import useToken from '../../hooks/useToken'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import * as myConstClass from "../../constants/constantsLanguage"
import { calAvgReview } from "../../helpers/calAvgReview"

function RoomSuggestionCard({
    id,
    img,
    address,
    name,
    price,
    savedHotelId,
    review,
    language
}) {
    let content = myConstClass.LANGUAGE;

    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const { token, setToken } = useToken();
    const [clickFavorite, setClickFavorite] = useState(false);

    useEffect(() => {
        for(let i in savedHotelId){
            if(id == savedHotelId[i]){
                setClickFavorite(true)
            }
        }
    },[savedHotelId])

    let avgReview = calAvgReview(review);

    const handleClickFavorite = () => {
        // console.log("Click Favorite", token)
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
            // console.log("Success: ", response.data)
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
            // console.log("Success: ", response.data)
        })
        .catch(error => console.log("Error:", error))
    }

    let saveFavorite = "Lưu";
    if(clickFavorite == true){
        saveFavorite = "Đã lưu";
    }

    const notification_saveFavorite = {
        title: ' RoyalStay - ' + content.notification,
        message: content.savedHotel + '`' + name + '`',
        type: 'success',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const notification_notSaveFavorite = {
        title: ' RoyalStay - ' + content.notification,
        message: content.unsaved + '`' + name + '`',
        type: 'danger',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const notification_requireLogin = {
        title: ' RoyalStay - ' + content.notification,
        message: content.notLogin,
        type: 'danger',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };
    return (
        <div className="roomSuggestionCard">
            <div className="product__thumbnail"> 
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

                <button className="product__love-icon" onClick={() => {handleClickFavorite();}}>
                    {clickFavorite ? <i className="fas fa-heart"></i> : <i className="far fa-heart"/>}
                </button>
                <div className="product__love-iconLeft">
                    <div className="roomSuggestionCard_stars">
                        <StarIcon className="roomSuggestionCard_star"/>
                        <p>
                            <strong>{avgReview}</strong> ({review.length})
                        </p>
                    </div>
                </div>
            </div>
            <div className="product__price">
                <span style={{fontSize: "24px"}}><strong>${price}</strong></span>
                <span style={{fontSize: "14px"}}>/{content.night}</span>
            </div>
            <div className="product__detail">
                <p className="roomSuggestionCard_product__address"><i className="fas fa-map-marker-alt"/> {address}</p>
                <h1 className="product__title">
                    {name}
                </h1>
                <a href={'/room-detail/' + id} className="roomSuggestionCard_product__button"><i className="fas fa-hotel"/>  {content.detailRoom}</a>
            </div>
        </div>
    )
}

export default RoomSuggestionCard
