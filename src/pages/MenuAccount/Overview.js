import React, {useState, useEffect} from 'react'
import "../../style/MenuAccount.css"
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuOverview from "../../components/MenuAccount/MenuOverview"

import useToken from '../../useToken'
import SignIn from '../SignIn/SignIn'

import axios from 'axios'

function Overview() {
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

    document.title = dataCustomer.username + " | RoyalStay"

    
    if(!token){
        return <SignIn />
    }

    const fullName = (dataCustomer.name || "");
    const userName = (dataCustomer.name || "").split(' ').slice(-1).join(' ');
    
    return (
        <div className="account">
            {/* <Header /> */}
            <div className="account_page">
                <div className="account_container">
                    <MenuLeft 
                        markPage="overview"
                        fullName={fullName}
                        nameUser={userName}
                        username={dataCustomer.username}
                        imageUser={fullName}
                    />
                    <MenuOverview
                        id={token.customerId}
                        fullName={dataCustomer.name}
                        email={dataCustomer.email}
                        username={dataCustomer.username}
                        phone={dataCustomer.phone}
                        sex={dataCustomer.sex}
                        address={dataCustomer.address}
                    />
                </div>
            </div>
        </div>
    )
}

export default Overview
