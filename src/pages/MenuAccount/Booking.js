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
            await axios(options)
            .then(response => {
                console.log(response.data)
                setDataCustomer(response.data)
            })
            .catch(error => console.log(error))
        }

        if(token){
            fetchData();
        }
    },[])

    document.title = dataCustomer.username + " | RoyalStay"

    if(!token){
        return <SignIn />
    }

    let hotelBooking = [];
    for(let key in dataCustomer.booking){
        // console.log("key", dataCustomer.booking[key])
        hotelBooking.push(dataCustomer.booking[key])
    }

    const fullName = (dataCustomer.name || "");
    const userName = (dataCustomer.name || "").split(' ').slice(-1).join(' ');
    
    return (
        <div className="account">
            {/* <Header /> */}
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft 
                        markPage="booking"
                        fullName={fullName}
                        nameUser={userName}
                        username={dataCustomer.username}
                        imageUser={fullName}
                    />
                    <MenuBooking
                        booking={hotelBooking}
                    />
                </div>
            </div>
        </div>
    )
}

export default Booking
