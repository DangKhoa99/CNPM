import React from 'react'
import "../../style/Account.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/Account/MenuLeft"
import MenuFavorite from "../../components/Account/MenuFavorite"

function Favorite() {
    document.title = "Khách sạn yêu thích"
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
