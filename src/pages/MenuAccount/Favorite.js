import React, {useState, useEffect} from 'react'
import "../../style/MenuAccount.css"
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuFavorite from "../../components/MenuAccount/MenuFavorite"
import LoadingScreen from "../../components/LoadingScreen"

import useToken from '../../useToken'
import SignIn from '../SignIn/SignIn'

import axios from 'axios';

function Favorite() {
    const { token, setToken } = useToken();
    const [isLoading, setIsLoading] = useState(false);
    const [dataCustomer, setDataCustomer] = useState([]);
    const [dataFavoriteHotelOfCustomer, setDataFavoriteHotelOfCustomer] = useState([]);

    useEffect(() => {
        const fetchDataCustomer = async () => {
            setIsLoading(true);
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
                // console.log(response.data)
                setDataCustomer(response.data)
                setIsLoading(false);
            })
            .catch(error => console.log(error))
        };

        const fetchDataFavoriteHotelOfCustomer = async () => {
            const options = {
                method: "POST",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {
                    "customerId": token.customerId
                },
                url: "http://localhost:5000/customer/favorite"
            }
            axios(options)
            .then(response => {
                console.log("TEST: ", (response.data))
                setDataFavoriteHotelOfCustomer(response.data)
            })
            .catch(error => console.log(error))
        };

        if(token){
            fetchDataCustomer();
            fetchDataFavoriteHotelOfCustomer();
        }
        
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
                        markPage="favorite"
                        username={dataCustomer.username}
                        imageUser={dataCustomer.username}
                    />

                    {isLoading ? <LoadingScreen/> 
                    :
                    <MenuFavorite 
                        favoriteHotel={dataFavoriteHotelOfCustomer}
                    />
                    }
                </div>
            </div>
        </div>
    )
}

export default Favorite
