import React from 'react'
import "../../style/MenuAccount.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuFavorite from "../../components/MenuAccount/MenuFavorite"

function Favorite() {
    document.title = "Khách sạn yêu thích | RoyalStay"
    return (
        <div className="account">
            {/* <Header /> */}
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft markPage="favorite"/>
                    <MenuFavorite />
                </div>
            </div>
        </div>
    )
}

export default Favorite
