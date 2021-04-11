import React from 'react'
import "../../style/MenuAccount.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuOverview from "../../components/MenuAccount/MenuOverview"

function Overview() {
    document.title = "Tổng quan về tài khoản | RoyalStay"
    return (
        <div className="account">
            {/* <Header /> */}
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft markPage="overview"/>
                    <MenuOverview />
                </div>
            </div>
        </div>
    )
}

export default Overview
