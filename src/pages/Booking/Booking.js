import React, {useState, useEffect, useCallback} from 'react'
import "../../style/Booking.css"
import BookingHeader from "../../components/Booking/BookingHeader"
import BookingBody from "../../components/Booking/BookingBody"
import useToken from '../../hooks/useToken'
import SignIn from '../SignIn/SignIn'
import axios from 'axios'
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"

function Booking() {
    const { language, setLanguage } = useLanguage();
    const { token, setToken } = useToken();
    const searchParams = new URLSearchParams(window.location.search);
    const idHotel = searchParams.get('id');
    const checkIn = searchParams.get('checkin');
    const checkOut = searchParams.get('checkout');
    const roomType = searchParams.get('roomType');

    const [detailHotel, setDetailHotel] = useState(null);

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
                setDetailHotel(response.data);
            })
    },[idHotel]);

    useEffect(() => {
        loadDetailHotelFromServer();
    },[loadDetailHotelFromServer])

    if(!detailHotel) return null

    if(!token){
        return <SignIn />
    }
    let content = myConstClass.LANGUAGE;

    language === "English"
      ? (content = content.English)
      : (content = content.Vietnam);

    document.title = content.orderRoom + " | RoyalStay"
    return (
        <div className="booking">
            <div className="booking_container">
                <BookingHeader
                    language={language}
                />
                <BookingBody
                    idHotel={idHotel}
                    nameHotel={detailHotel.name}
                    imageHotel={detailHotel.imageLink}
                    priceHotelPerNight={detailHotel.room.price}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    typeRoomOrder={roomType}
                    arrayRoomTypeOfHotel={detailHotel.room.roomType}
                    language={language}
                />   
            </div>           
        </div>
    )
}

export default Booking
