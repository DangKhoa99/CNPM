import React, {useState, useEffect, useCallback} from 'react'
import "../../style/MenuBooking.css"
import axios from 'axios'
import * as myConstClass from "../../constants/constantsLanguage"

function MenuBookingCard({
    idInvoice,
    idHotel,
    checkIn,
    checkOut,
    roomType,
    status,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    const [dataHotel, setDataHotel] = useState(null)
    const loadDetailHotelFromServer = useCallback(async () =>{
        const options = {
            method: "POST",
            data: {
                "hotelId": idHotel
            },
            url: "http://localhost:5000/hotel/"
        }
        await axios(options)
            .then(response => {
                setDataHotel(response.data);
            })
    },[idHotel]);

    useEffect(() => {
        loadDetailHotelFromServer();
    },[loadDetailHotelFromServer])

    if(!dataHotel) return null
    
    let pricePerNight = 0
    if(roomType == content.smallRoom){
        pricePerNight = dataHotel.room.price
    }
    else if(roomType == content.mediumRoom){
        pricePerNight = dataHotel.room.price + 50
    }
    else if(roomType == content.largeRoom){
        pricePerNight = dataHotel.room.price + 100
    }

    const click = () => {
        console.log("CLICK")
    }

    return (
        <div className="menuBookingCard">
            <a className="menuBookingCard_btn" href={"/account/hotel-invoice-detail/" + idInvoice} title={content.detailInvoice}>
                <i className="fas fa-receipt" style={{fontSize: "20px"}}/>
            </a>

            <a className="menuBookingCard_btn_hotel" href={"/room-detail/" + idHotel} title={content.detailRoom}>
                <i className="fas fa-hotel" style={{fontSize: "20px"}}/>
            </a>

            <a className="menuBooking_box">
                <img src={dataHotel.imageLink[0]} style={{background: "gray"}}/>
                <div className="menuBooking_info">
                    <div className="menuBooking_infoTop">
                        <h3>{dataHotel.name}</h3>
                        <p>{checkIn} - {checkOut} · {dataHotel.address}</p>
                        <p className={"hotel_booking_status " + status}>{status}</p>
                    </div>
                    <div className="menuBooking_infoBottom">
                        <div className="menuBooking_price">
                            <p style={{fontSize: "12px", marginBottom: "10px"}}>{content.typeRoom}: <b>{roomType}</b></p>
                            <h2>${pricePerNight}</h2> 
                            <p> /{content.night}</p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default MenuBookingCard
