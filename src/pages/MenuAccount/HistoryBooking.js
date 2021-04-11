import React from 'react'
import "../../style/MenuAccount.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuHistoryBooking from "../../components/MenuAccount/MenuHistoryBooking"

function HistoryBooking() {
    document.title = "Lịch sử đặt khách sạn | RoyalStay"
    return (
        <div className="account">
            {/* <Header /> */}
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft markPage="history_booking"/>
                    <MenuHistoryBooking />
                </div>
            </div>
        </div>
    )
}

export default HistoryBooking
