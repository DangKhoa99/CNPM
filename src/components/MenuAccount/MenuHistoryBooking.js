import React from 'react'
import "../../style/MenuHistoryBooking.css"
import MenuBookingCard from "./MenuBookingCard"
import NoItem from "../NoItem"

function MenuHistoryBooking({
    booking
}) {
    let onlyReturn = 0
    console.log("BOOKING: ", booking)
    return (
        <div className="menuHistoryBooking">
            <div className="menuHistoryBooking_container">
                <h1 className="menuHistoryBooking_title">Lịch sử đặt khách sạn</h1>
                
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
                    if(isHotelBooking.status == "Stayed" || isHotelBooking.status == "Cancel"){
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
                        console.log("return only")
                        if(onlyReturn == 0){
                            onlyReturn += 1
                            return <NoItem text="Không có lịch sử"/>
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

export default MenuHistoryBooking
