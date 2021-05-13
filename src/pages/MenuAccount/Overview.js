import React from 'react'
import "../../style/MenuAccount.css"
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuOverview from "../../components/MenuAccount/MenuOverview"
import useToken from '../../hooks/useToken'
import SignIn from '../SignIn/SignIn'
import useGetDataCustomer from '../../hooks/useDataCustomer'
import LoadingScreen from "../../components/LoadingScreen"
import useLanguage from '../../hooks/useLanguage'

function Overview() {
    const { language, setLanguage } = useLanguage();
    const {token, setToken} = useToken();
    const {dataCustomer, isLoading} = useGetDataCustomer();
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
                        markPage="overview"
                        fullName={fullName}
                        nameUser={userName}
                        username={dataCustomer.username}
                        imageUser={fullName}
                        language={language}
                    />
                    }
                    {isLoading ? <LoadingScreen/> 
                    :
                    <MenuOverview
                        id={token.customerId}
                        fullName={dataCustomer.name}
                        email={dataCustomer.email}
                        username={dataCustomer.username}
                        phone={dataCustomer.phone}
                        sex={dataCustomer.sex}
                        address={dataCustomer.address}
                        language={language}
                    />
                    }
                </div>
            </div>
        </div>
    )
}

export default Overview
