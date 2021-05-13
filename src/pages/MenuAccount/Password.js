import React from 'react'
import "../../style/MenuAccount.css"
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuPassword from "../../components/MenuAccount/MenuPassword"
import useToken from '../../hooks/useToken'
import SignIn from '../SignIn/SignIn'
import useGetDataCustomer from '../../hooks/useDataCustomer'
import LoadingScreen from "../../components/LoadingScreen"
import useLanguage from '../../hooks/useLanguage'

function Password() {
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
                        markPage="password"
                        fullName={fullName}
                        nameUser={userName}
                        username={dataCustomer.username}
                        imageUser={fullName}
                        language={language}
                    />
                    }
                    {isLoading ? <LoadingScreen/> 
                    :
                    <MenuPassword
                        id={token.customerId}
                        address={dataCustomer.address}
                        language={language}
                        token={token}
                    />
                    }
                </div>
            </div>
        </div>
    )
}

export default Password
