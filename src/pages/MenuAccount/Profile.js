import React, {useState, useEffect} from 'react'
import "../../style/MenuAccount.css"
import Header from '../../components/Header'
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuProfile from "../../components/MenuAccount/MenuProfile"

import useToken from '../../useToken'
import SignIn from '../SignIn/SignIn'

import axios from 'axios';

function Profile() {
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

        if(token){
            fetchData();
        }
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
                        markPage="profile"
                        username={dataCustomer.username}
                        imageUser={dataCustomer.username}
                    />
                    <MenuProfile 
                        id={token.customerId}
                        fullName={dataCustomer.name}
                        email={dataCustomer.email}
                        username={dataCustomer.username}
                        password={dataCustomer.password}
                        phone={dataCustomer.phone}
                        sex={dataCustomer.sex}
                        address={dataCustomer.address}
                    />
                </div>
            </div>
        </div>
    )
}

export default Profile
