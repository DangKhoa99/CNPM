import React, { useState, useEffect } from 'react'
import "../../style/MenuHistoryBooking.css"
import MenuBookingCard from "./MenuBookingCard"
import NoItem from "../NoItem"
import * as myConstClass from "../../constants/constantsLanguage"
import axios from 'axios'
import LoadingScreen from "../LoadingScreen"

function MenuHistoryBooking({
    language,
    token
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    // console.log("BOOKING: ", booking)
    const [status, setStatus] = useState("All")
    const handleFilterStatus = (e) =>{
        setStatus(e.target.value);
    }

    const [dataBookingListHotelOfCustomer, setDataBookingListHotelOfCustomer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // https://www.debuggr.io/react-update-unmounted-component/
        let mounted = true;
        const getDataBookingListHotelOfCustomer = async () => {
            setIsLoading(true);
            if(status == "All"){
                const options = {
                    method: "POST",
                    headers: {
                        "auth-token": token.authToken,
                    },
                    data: {
                        "customerId": token.customerId
                    },
                    url: "http://localhost:5000/customer/booking"
                }
                axios(options)
                .then(response => {
                    if(mounted){
                        setDataBookingListHotelOfCustomer(response.data);
                        setIsLoading(false);
                    }
                })
                .catch(error => console.log("Error: ", error))
            }
            else{
                const options = {
                    method: "POST",
                    headers: {
                        "auth-token": token.authToken,
                    },
                    data: {
                        "customerId": token.customerId,
                        "status": status
                    },
                    url: "http://localhost:5000/customer/bookingByStatus"
                }
                axios(options)
                .then(response => {
                    if(mounted){
                        setDataBookingListHotelOfCustomer(response.data);
                        setIsLoading(false);
                    }
                })
                .catch(error => console.log("Error: " + error))
            }
        }

        getDataBookingListHotelOfCustomer();
        

        return () => mounted = false;
        
    },[status])

    return (
        <div className="menuHistoryBooking">
            <div className="menuHistoryBooking_container">
                <h1 className="menuHistoryBooking_title">{content.hotelBookingHistory}</h1>

                <div className="language-select" style={{marginBottom: "20px"}}>
                    <select
                        className="custom_select"
                        onChange={handleFilterStatus}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Staying">Staying</option>
                        <option value="Stayed">Stayed</option>
                        <option value="Cancel">Cancel</option>
                    </select>
                </div>
                
                { isLoading ? <div style={{marginTop: "-280px"}}><LoadingScreen /></div>
                :
                dataBookingListHotelOfCustomer.length == 0 ? <NoItem text={content.noHistory}/>
                :
                dataBookingListHotelOfCustomer.map((isHotelBooking, index) =>{
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
                })}
            </div>
        </div>
    )
}

export default MenuHistoryBooking
