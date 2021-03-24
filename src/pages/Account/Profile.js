import React from 'react'
import "../../style/Account.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/Account/MenuLeft"
import MenuProfile from "../../components/Account/MenuProfile"

function Profile() {
    document.title = "Chỉnh sửa hồ sơ"

    return (
        <div className="account">
            <Header />
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft markPage="profile"/>
                    <MenuProfile />
                </div>
            </div>
        </div>
    )
}

export default Profile
