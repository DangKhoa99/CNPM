import React, {useState, useEffect, useCallback} from 'react'
import "../../style/MenuBooking.css"
import axios from 'axios'

function MenuBookingCard({
    idInvoice,
    idHotel,
    checkIn,
    checkOut,
    roomType,
    status
}) {
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
    if(roomType == "Nhỏ"){
        pricePerNight = dataHotel.room.price
    }
    else if(roomType == "Vừa"){
        pricePerNight = dataHotel.room.price + 50
    }
    else if(roomType == "Lớn"){
        pricePerNight = dataHotel.room.price + 100
    }

    const click = () => {
        console.log("CLICK")
    }

    return (
        <div className="menuBookingCard">
            <a className="menuBookingCard_btn" href={"/account/hotel-invoice-detail?id=" + idInvoice} title="Xem chi tiết hóa đơn">
                <i class="fas fa-receipt" style={{fontSize: "20px"}}/>
            </a>

            <a className="menuBookingCard_btn_hotel" href={"/room-detail?id=" + idHotel} title="Xem khách sạn">
                <i class="fas fa-hotel" style={{fontSize: "20px"}}/>
            </a>

            <a className="menuBooking_box">
                <img src={dataHotel.imageLink[0]} alt={dataHotel.name}/>
                <div className="menuBooking_info">
                    <div className="menuBooking_infoTop">
                        <h3>{dataHotel.name}</h3>
                        <p>{checkIn} - {checkOut} · {dataHotel.address}</p>
                        <p className={"hotel_booking_status " + status}>{status}</p>
                    </div>
                    <div className="menuBooking_infoBottom">
                        <div className="menuBooking_price">
                            <p style={{fontSize: "12px", marginBottom: "10px"}}>Loại phòng: <b>{roomType}</b></p>
                            <h2>${pricePerNight}</h2> 
                            <p> /đêm</p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default MenuBookingCard
