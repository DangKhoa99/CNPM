import React from 'react'
import "../../style/Account.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/Account/MenuLeft"
import MenuBooking from "../../components/Account/MenuBooking"

function Booking() {
    document.title = "Khách sạn đang đặt"
    return (
        <div className="account">
            <Header />
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
