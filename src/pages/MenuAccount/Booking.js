import React from 'react'
import "../../style/MenuAccount.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuBooking from "../../components/MenuAccount/MenuBooking"

import useToken from '../../useToken'
import SignIn from '../SignIn/SignIn'

function Booking() {
    const { token, setToken } = useToken();

    if(!token){
        return <SignIn />
    }
    
    document.title = "Khách sạn đang đặt | RoyalStay"
    return (
        <div className="account">
            {/* <Header /> */}
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft markPage="booking"/>
                    <MenuBooking />
                </div>
            </div>
        </div>
    )
}

export default Booking
