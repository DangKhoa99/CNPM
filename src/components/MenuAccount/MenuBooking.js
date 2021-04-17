import React, {useState, useEffect} from 'react'
import "../../style/MenuBooking.css"
import MenuBookingCard from "./MenuBookingCard"

function MenuBooking({
    booking
}) {
    console.log("Hotel Booking: ", booking)
    return (
        <div className="menuBooking">
            <div className="menuBooking_container">
                <h1 className="menuBooking_title">Khách sạn đang đặt</h1>
                {booking.map(isHotelBooking => {
                    let type = "Nhỏ"
                    if(isHotelBooking.roomType == "small"){
                        type = "Nhỏ"
                    }
                    if(isHotelBooking.roomType == "medium"){
                        type = "Vừa"
                    }
                    if(isHotelBooking.roomType == "large"){
                        type = "Lớn"
                    }
                    return  <MenuBookingCard
                                idInvoice={isHotelBooking._id}
                                idHotel={isHotelBooking.hotelId}
                                checkIn={isHotelBooking.checkIn}
                                checkOut={isHotelBooking.checkOut}
                                roomType={type}
                                status={isHotelBooking.status}
                            />
                })}
                
                

            </div>

        </div>
    )
}

export default MenuBooking
