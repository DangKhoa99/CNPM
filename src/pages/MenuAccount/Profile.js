import React from 'react'
import "../../style/MenuAccount.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuProfile from "../../components/MenuAccount/MenuProfile"

import useToken from '../../useToken'
import SignIn from '../SignIn/SignIn'

function Profile() {

    const { token, setToken } = useToken();

    if(!token){
        return <SignIn />
    }
    document.title = "Chỉnh sửa hồ sơ | RoyalStay"

    return (
        <div className="account">
            {/* <Header /> */}
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
