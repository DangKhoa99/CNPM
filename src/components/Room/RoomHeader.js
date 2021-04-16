import React, {useState, useEffect} from 'react'
import "../../style/RoomHeader.css"
import StarIcon from "@material-ui/icons/Star"
import {ReactComponent as Heart} from "../../icons/iconHeart.svg"
import {ReactComponent as RedHeart} from "../../icons/iconRedHeart.svg"
import Gallery from 'react-grid-gallery';
import { store } from 'react-notifications-component'

import axios from 'axios'
import useToken from '../../useToken'

function RoomHeader({
    idHotel,
    name,
    img,
    address,
    review,
    reference,
    click,
    savedHotel
}) {
    console.log("ID khách sạn: ", idHotel)
    const { token, setToken } = useToken();
    const [clickFavorite, setClickFavorite] = useState(false);

    useEffect(() => {
        if(savedHotel == "true"){
            setClickFavorite(true)
        }
    },[savedHotel])

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

    let saveFavorite = "Lưu";
    if(clickFavorite == true){
        saveFavorite = "Đã lưu";
    }

    const notification_saveFavorite = {
        title: ' RoyalStay - Thông báo',
        message: 'Đã lưu khách sạn `' + name + '`',
        type: 'success',// 'default', 'success', 'info', 'warning'
        container: 'bottom-left',// where to position the notifications
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

    let avgReview = 0;
    if(review.length > 0){
        for(var key in review){
            var obj = review[key];
            avgReview = avgReview + obj.score;
        }
        avgReview = (avgReview / review.length).toFixed(1);
    }


    const saveHotel = async () => {
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "hotelId": idHotel,
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
                "hotelId": idHotel,
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

    const IMAGES =
    [
        {
            src: img[0],
            thumbnail: img[0],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 1"
        },
        {
            src: img[1],
            thumbnail: img[1],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 2"
        },
        {
            src: img[2],
            thumbnail: img[2],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 3"
        },
        {
            src: img[3],
            thumbnail: img[3],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 4"
        },
        {
            src: img[4],
            thumbnail: img[4],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: "Image 5"
        },
    ];
    
    return (
        <div className="roomHeader" ref={reference}>
            <div className="roomHeader_container">
                <div className="roomHeader_heading">
                    <section>
                        <div className="roomHeader_heading_name">
                            <h1>Khách sạn {name}</h1>
                        </div>
                        <div className="roomHeader_heading_description">
                            <div className="roomHeader_heading_description_left">
                                <span className="roomHeader_heading_stars" onClick={click}>
                                    <StarIcon className="roomHeader_heading_star"/>
                                    <strong>{avgReview} ({review.length})</strong>
                                </span>
                                <span className="roomHeader_heading_dot">·</span>
                                <span className="roomHeader_heading_place">{address}</span>
                            </div>
                            
                            <div className="roomHeader_heading_description_right">
                                <button 
                                    className="roomHeader_heading_btn" 
                                    onClick={() => {handleClickFavorite() }}
                                >
                                    <span className="roomHeader_heading_heart">
                                        {clickFavorite ? <RedHeart className="roomHeader_heading_redHeart_svg" /> : <Heart className="roomHeader_heading_heart_svg" />}
                                    </span>
                                    {saveFavorite}
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="roomHeader_images">
                    <div 
                        style={{
                            display: "block",
                            minHeight: "1px",
                            width: "100%",
                            border: "1px solid #ddd",
                            borderRadius: "12px",
                            overflow: "auto",
                            textAlign: "center",
                            background: "white"
                        }}
                    >
                        <Gallery 
                            images={IMAGES}
                            enableImageSelection={false}
                            backdropClosesModal={true}
                            showLightboxThumbnails={true}
                            maxRows="1"
                            rowHeight={300}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomHeader
