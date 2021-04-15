import React, {useEffect} from 'react'
import "../../style/Booking.css"
import BookingHeader from "../../components/Booking/BookingHeader"
import BookingBody from "../../components/Booking/BookingBody"

import useToken from '../../useToken'
import SignIn from '../SignIn/SignIn'
import { useLocation } from 'react-router-dom'

function Booking() {
    const location = useLocation();
    // console.log(location.pathname)
    
    const { token, setToken } = useToken();
  
    // useEffect(() => {
        
    // },[])

    
    if(!token){
        return <SignIn />
    }

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
