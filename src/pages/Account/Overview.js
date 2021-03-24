import React from 'react'
import "../../style/Account.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/Account/MenuLeft"
import MenuOverview from "../../components/Account/MenuOverview"

function Overview() {
    document.title = "Tổng quan về tài khoản"
    return (
        <div className="account">
            <Header />
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
