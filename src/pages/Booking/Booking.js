import React from 'react'
import "../../style/Booking.css"
import BookingHeader from "../../components/Booking/BookingHeader"
import BookingBody from "../../components/Booking/BookingBody"

function Booking() {
    document.title = "Đặt phòng | RoyalStay"
    return (
        <div className="booking">
            <div className="booking_container">
                <BookingHeader />
                <BookingBody />   
            </div>           
        </div>
    )
}

export default Booking
