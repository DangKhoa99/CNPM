import React, {useState, useEffect} from 'react'
import "../../style/MenuAccount.css"
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuBooking from "../../components/MenuAccount/MenuBooking"

import useToken from '../../useToken'
import SignIn from '../SignIn/SignIn'

import axios from 'axios'

function Booking() {
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

    document.title = dataCustomer.username + " | RoyalStay"

    if(!token){
        return <SignIn />
    }
    
    return (
        <div className="account">
            {/* <Header /> */}
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft 
                        markPage="booking"
                        username={dataCustomer.username}
                    />
                    <MenuBooking
                        booking={dataCustomer.booking}
                    />
                </div>
            </div>
        </div>
    )
}

export default Booking
