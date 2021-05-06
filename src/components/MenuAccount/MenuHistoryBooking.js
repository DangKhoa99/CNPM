import React from 'react'
import "../../style/MenuHistoryBooking.css"
import MenuBookingCard from "./MenuBookingCard"
import NoItem from "../NoItem"
import * as myConstClass from "../../constants/constantsLanguage"

function MenuHistoryBooking({
    booking,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    let onlyReturn = 0
    console.log("BOOKING: ", booking)
    return (
        <div className="menuHistoryBooking">
            <div className="menuHistoryBooking_container">
                <h1 className="menuHistoryBooking_title">{content.hotelBookingHistory}</h1>
                
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
                    if(isHotelBooking.status == "Stayed" || isHotelBooking.status == "Cancel"){
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
                        console.log("return only")
                        if(onlyReturn == 0){
                            onlyReturn += 1
                            return <NoItem key={index + isHotelBooking} text={content.noHistory}/>
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
