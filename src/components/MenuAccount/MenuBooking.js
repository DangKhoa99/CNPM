import React from 'react'
import "../../style/MenuBooking.css"
import MenuBookingCard from "./MenuBookingCard"
import NoItem from "../NoItem"
import * as myConstClass from "../../constants/constantsLanguage"

function MenuBooking({
    booking,
    language
}) {
    let onlyReturn = 0
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
        
    return (
        <div className="menuBooking">
            <div className="menuBooking_container">
                <h1 className="menuBooking_title">{content.bookingHotel}</h1>
                {booking.map((isHotelBooking, index) => {
                    let type = content.smallRoom
                    if(isHotelBooking.roomType == "small"){
                        type = content.smallRoom
                    }
                    if(isHotelBooking.roomType == "medium"){
                        type = content.mediumRoom
                    }
                    if(isHotelBooking.roomType == "large"){
                        type = content.largeRoom
                    }
                    if(isHotelBooking.status == "Pending" || isHotelBooking.status == "Staying"){
                        return  <MenuBookingCard
                                    key={index + isHotelBooking}
                                    idInvoice={isHotelBooking._id}
                                    idHotel={isHotelBooking.hotelId}
                                    checkIn={isHotelBooking.checkIn}
                                    checkOut={isHotelBooking.checkOut}
                                    roomType={type}
                                    status={isHotelBooking.status}
                                    language={language}
                                />
                    }
                    else{
                        if(onlyReturn == 0){
                            onlyReturn += 1
                            return <NoItem text={content.noBookingHotel}/>
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
