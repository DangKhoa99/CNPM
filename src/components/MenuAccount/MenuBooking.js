import React from 'react'
import "../../style/MenuBooking.css"
import MenuBookingCard from "./MenuBookingCard"
import NoItem from "../NoItem"

function MenuBooking({
    booking
}) {
    let onlyReturn = 0
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
                    if(isHotelBooking.status == "Pending" || isHotelBooking.status == "Staying"){
                        return  <MenuBookingCard
                                    idInvoice={isHotelBooking._id}
                                    idHotel={isHotelBooking.hotelId}
                                    checkIn={isHotelBooking.checkIn}
                                    checkOut={isHotelBooking.checkOut}
                                    roomType={type}
                                    status={isHotelBooking.status}
                                />
                    }
                    else{
                        if(onlyReturn == 0){
                            onlyReturn += 1
                            return <NoItem text="Không có phòng đang đặt"/>
                        }
                        else{
                            return ""
                        }  
                    }
                })}
            </div>
        </div>
    )
}

export default MenuBooking
