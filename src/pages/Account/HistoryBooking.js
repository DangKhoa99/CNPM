import React from 'react'
import "../../style/Account.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/Account/MenuLeft"
import MenuHistoryBooking from "../../components/Account/MenuHistoryBooking"

function HistoryBooking() {
    document.title = "Lịch sử đặt khách sạn"
    return (
        <div className="account">
            <Header />
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
