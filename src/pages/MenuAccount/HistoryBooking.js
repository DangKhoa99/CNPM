import React, {useState, useEffect} from 'react'
import "../../style/MenuAccount.css"
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuHistoryBooking from "../../components/MenuAccount/MenuHistoryBooking"

import useToken from '../../useToken'
import SignIn from '../SignIn/SignIn'

import axios from 'axios';

function HistoryBooking() {
    const { token, setToken } = useToken();

    const [dataCustomer, setDataCustomer] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "POST",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {
                    "customerId": token.customerId
                },
                url: "http://localhost:5000/customer/"
            }
            axios(options)
            .then(response => {
                console.log(response.data)
                setDataCustomer(response.data)
            })
            .catch(error => console.log(error))
        }

        fetchData()
    },[])

    if(!token){
        return <SignIn />
    }

    document.title = dataCustomer.username + " | RoyalStay"

    return (
        <div className="account">
            {/* <Header /> */}
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft 
                        markPage="history_booking"
                        username={dataCustomer.username}
                    />
                    <MenuHistoryBooking
                        
                    />
                </div>
            </div>
        </div>
    )
}

export default HistoryBooking
