import React from 'react'
import "../../style/MenuAccount.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuOverview from "../../components/MenuAccount/MenuOverview"

import useToken from '../../useToken'
import SignIn from '../SignIn/SignIn'

import axios from 'axios';

function Overview() {
    const { token, setToken } = useToken();

    if(!token){
        return <SignIn />
    }

    document.title = "Tổng quan về tài khoản | RoyalStay"
    
    return (
        <div className="account">
            {/* <Header /> */}
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft 
                        markPage="overview"
                    />
                    <MenuOverview />
                </div>
            </div>
        </div>
    )
}

export default Overview
