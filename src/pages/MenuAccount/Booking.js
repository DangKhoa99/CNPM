import React, {useState, useEffect} from 'react'
import "../../style/MenuAccount.css"
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuBooking from "../../components/MenuAccount/MenuBooking"
import useToken from '../../hooks/useToken'
import SignIn from '../SignIn/SignIn'
import useGetDataCustomer from '../../hooks/useDataCustomer'
import LoadingScreen from "../../components/LoadingScreen"

import axios from 'axios'

function Booking() {
    const {token, setToken} = useToken();
    const {dataCustomer, isLoading} = useGetDataCustomer();
    
    const [dataBookingListHotelOfCustomer, setDataBookingListHotelOfCustomer] = useState([])

    useEffect(() => {
        const getDataBookingListHotelOfCustomer = async () => {
            const options = {
                method: "POST",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {
                    "customerId": token.customerId
                },
                url: "http://localhost:5000/customer/booking"
            }
            axios(options)
            .then(response => {
                console.log(response.data)
                setDataBookingListHotelOfCustomer(response.data)
            })
            .catch(error => console.log(error))
        }

        if(token){
            getDataBookingListHotelOfCustomer();
        }
    },[])




    if(!token){
        return <SignIn />
    }

    document.title = dataCustomer.username + " | RoyalStay"

    const fullName = (dataCustomer.name || "");
    const userName = (dataCustomer.name || "").split(' ').slice(-1).join(' ');
    
    return (
        <div className="account">
            <div className="account_page">
                <div className="account_container">
                    {isLoading ? <LoadingScreen/> 
                    :
                    <MenuLeft 
                        markPage="booking"
                        fullName={fullName}
                        nameUser={userName}
                        username={dataCustomer.username}
                        imageUser={fullName}
                    />
                    }
                    {isLoading ? <LoadingScreen/> 
                        :
                    <MenuBooking
                        booking={dataBookingListHotelOfCustomer}
                    />
                    }
                </div>
            </div>
        </div>
    )
}

export default Booking
