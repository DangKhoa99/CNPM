import React, {useState, useEffect} from 'react'
import "../../style/RoomHeader.css"
import { useHistory } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star"
import Gallery from 'react-grid-gallery';
import { store } from 'react-notifications-component'
import axios from 'axios'
import useToken from '../../hooks/useToken'
import * as myConstClass from "../../constants/constantsLanguage"
import { calAvgReview } from "../../helpers/calAvgReview"
import EditHotelModal from "../Admin/EditHotelModal"
import { Confirm, CustomDialog } from 'react-st-modal'

function RoomHeader({
    idHotel,
    name,
    img,
    address,
    review,
    reference,
    click,
    savedHotel,
    language,
    price,
    description,
    roomType,
    quantity,
    tien_ich
}) {
    let content = myConstClass.LANGUAGE;

    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    let history1 = useHistory();

    const handleDeleteHotel = () =>{
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "hotelId": idHotel
            },
            url: "http://localhost:5000/hotel/delete"
        }
        axios(options)
        .then(response => {
            // console.log("DELETE ORDER HOTEL: ", response.data)
            window.location = "/account/admin/hotel-management/"
        })
        .catch(error => console.log(error))
    }

    // console.log("ID khách sạn: ", idHotel)
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
        title: 'RoyalStay - ' + content.notification,
        message: content.savedHotel + ' `' + name + '`',
        type: 'success',// 'default', 'success', 'info', 'warning'
        container: 'bottom-left',// where to position the notifications
        dismiss: {
            duration: 2000
        }
    };

    const notification_notSaveFavorite = {
        title: 'RoyalStay - ' + content.notification,
        message: content.unsaved + ' `' + name + '`',
        type: 'danger',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const notification_requireLogin = {
        title: 'RoyalStay - ' + content.notification,
        message: content.notLogin,
        type: 'danger',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    let avgReview = calAvgReview(review);

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
                "hotelId": idHotel,
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

    const IMAGES =
    [
        {
            src: img[0],
            thumbnail: img[0],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: content.image1
        },
        {
            src: img[1],
            thumbnail: img[1],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: content.image2
        },
        {
            src: img[2],
            thumbnail: img[2],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: content.image3
        },
        {
            src: img[3],
            thumbnail: img[3],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: content.image4
        },
        {
            src: img[4],
            thumbnail: img[4],
            thumbnailWidth: 200,
            thumbnailHeight: 130,
            caption: content.image5
        },
    ];
    
    return (
        <div className="roomHeader" ref={reference}>
            <div className="roomHeader_container">
                {token && token.isAdmin ? 
                <div className="bookingBody_components">
                    <button 
                        className="booking_btn_confirm Pending" 
                        style={{marginRight: "20px"}} 
                        onClick={async () => {
                            const result = await Confirm(content.txtConfirmRemoveHotel + name + content.txtConfirmRemoveHotel1, content.confirmRemove)
                            if(result){
                                handleDeleteHotel();
                            }
                            else{
                                
                            }
                        }}
                    >
                        {content.removeHotel}
                    </button>

                    <button 
                        className="booking_btn_confirm editHotel"
                        onClick={async () => {
                            const result = await CustomDialog(<EditHotelModal
                                idHotel={idHotel}
                                img={img}
                                address={address}
                                name={name}
                                description={description}
                                price={price}
                                quantity={quantity}
                                tien_ich={tien_ich}
                                roomType={roomType}
                                token={token}
                                language={language}
                            />, {
                                title: content.editInformationHotel,
                                showCloseIcon: true,
                            })
                        }}
                    >
                        {content.edit}
                    </button>

                    <button className="booking_btn_confirm invoiceOk" onClick={history1.goBack}>
                        {content.return}
                    </button>
                </div>
                : ""}
                
                <div className="roomHeader_heading">
                    <section>
                        <div className="roomHeader_heading_name">
                            <h1>{content.titleRoomHeader} {name}</h1>
                        </div>
                        <div className="roomHeader_heading_description">
                            <div className="roomHeader_heading_description_left">
                                <span className="roomHeader_heading_stars" onClick={click}>
                                    <StarIcon className="roomHeader_heading_star"/>
                                    <strong>{avgReview} ({review.length} {content.reviews})</strong>
                                </span>
                                <span className="roomHeader_heading_dot">·</span>
                                <span className="roomHeader_heading_place">{address}</span>
                            </div>
                            
                            <div className="roomHeader_heading_description_right">
                                {clickFavorite ? <input id="toggle-heart" className="checked" type="checkbox"/> : <input id="toggle-heart" type="checkbox" />}
                                <label htmlFor="toggle-heart" aria-label="like" onClick={() => {handleClickFavorite() }}>❤</label>
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
                            borderRadius: "15px",
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
                            maxRows={1}
                            rowHeight={300}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomHeader
