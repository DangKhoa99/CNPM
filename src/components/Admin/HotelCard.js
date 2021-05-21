import React, {useState} from 'react'
import "../../style/MenuHotelManagement.css"
import StarIcon from "@material-ui/icons/Star"
import * as myConstClass from "../../constants/constantsLanguage"
import { calAvgReview } from "../../helpers/calAvgReview"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { Confirm, CustomDialog } from 'react-st-modal'
import axios from 'axios'
import useToken from '../../hooks/useToken'
import EditHotelModal from "./EditHotelModal"

function HotelCard({
    id,
    img,
    address,
    name,
    description,
    price,
    quantity,
    tien_ich,
    roomType,
    review,
    language
}) {
    const { token, setToken } = useToken();
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    
    let avgReview = calAvgReview(review);

    const handleDeleteHotel = () =>{
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "hotelId": id
            },
            url: "http://localhost:5000/hotel/delete"
        }
        axios(options)
        .then(response => {
            // console.log("DELETE HOTEL: ", response.data)
            window.location.reload();
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="hotelCard">
            <a style={{height: "200px", width: "350px"}}>
                <Carousel 
                    showThumbs={false}
                    autoPlay={false}
                    showStatus={false}
                    showIndicators={false}
                >
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[0]} alt=""/>
                    </div>
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[1]} alt=""/>
                    </div>
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[2]} alt=""/>
                    </div>
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[3]} alt=""/>
                    </div>
                    <div>
                        <img className="menuHotelManagement_img_hotel" src={img[4]} alt=""/>
                    </div>
                </Carousel>
            </a>

            <a href={"/room-detail/" + id}>
                <button className="menuHotelManagement_btn" title={content.detailRoom}>
                    <i className="fas fa-hotel" style={{color: "purple"}}/>
                </button>
            </a>

            <button 
                className="menuHotelManagement_btn editHotel" 
                title={content.editHotel}
                onClick={async () => {
                    const result = await CustomDialog(<EditHotelModal
                        idHotel={id}
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
                <i className="fas fa-edit" style={{color: "green"}}/>
            </button>

            <button 
                className="menuHotelManagement_btn removeHotel" 
                title={content.removeHotel} 
                onClick={async () => {
                    const result = await Confirm(content.txtConfirmRemoveHotel + name + content.txtConfirmRemoveHotel1, content.confirmRemove)
                    if(result){
                        handleDeleteHotel();
                    }
                    else{
                        
                    }
                }}
            >
                <i className="fas fa-trash-alt" style={{color: "red"}}/>
            </button>

            <a className="menuHotelManagement_links">
                <div className="menuHotelManagement_info">
                    <div className="menuHotelManagement_infoTop">
                        <p>{address}</p>
                        <h3>{name}</h3>
                        <p>________</p>
                        <p>{tien_ich}</p>
                    </div>
                    <div className="menuHotelManagement_infoBottom">
                        <div className="menuHotelManagement_stars">
                            <StarIcon className="menuHotelManagement_star"/>
                            <p>
                                <strong>{avgReview} </strong>({review.length})
                            </p>
                        </div>
                        <div className="menuHotelManagement_price" style={{textAlign: "right"}}>
                            <p style={{marginBottom: "10px", color: "gray", fontStyle: "italic", fontSize: "12px"}}>{content.quantityRoom}{quantity}</p>
                            <h2>${price}</h2> <p> /{content.night}</p> 
                        </div>
                    </div>
                </div>
            </a>     
        </div>
    )
}

export default HotelCard
