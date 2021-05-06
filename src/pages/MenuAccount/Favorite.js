import React from 'react'
import "../../style/MenuAccount.css"
import MenuLeft from "../../components/MenuAccount/MenuLeft"
import MenuFavorite from "../../components/MenuAccount/MenuFavorite"
import LoadingScreen from "../../components/LoadingScreen"
import useToken from '../../hooks/useToken'
import SignIn from '../SignIn/SignIn'
import useGetDataCustomer from '../../hooks/useDataCustomer'
import useGetDataFavoriteHotelOfCustomer from '../../hooks/useDataFavoriteHotelOfCustomer'
import useLanguage from '../../hooks/useLanguage'

function Favorite() {
    const { language, setLanguage } = useLanguage();
    const { token, setToken } = useToken();
    const {dataCustomer, isLoading} = useGetDataCustomer();
    const {dataFavoriteHotelOfCustomer, isLoadingDataFavoriteHotelOfCustomer} = useGetDataFavoriteHotelOfCustomer();

    document.title = dataCustomer.username + " | RoyalStay"

    const fullName = (dataCustomer.name || "");
    const userName = (dataCustomer.name || "").split(' ').slice(-1).join(' ');

    if(!token){
        return <SignIn />
    }
    
    return (
        <div className="account">
            <div className="account_page">
                <div className="account_container">
                    {isLoading ? <LoadingScreen/> 
                    :
                    <MenuLeft 
                        markPage="favorite"
                        fullName={fullName}
                        nameUser={userName}
                        username={dataCustomer.username}
                        imageUser={fullName}
                        language={language}
                    />
                    }
                    
                    {isLoadingDataFavoriteHotelOfCustomer ? <LoadingScreen/> 
                    :
                    <MenuFavorite 
                        favoriteHotel={dataFavoriteHotelOfCustomer}
                        language={language}
                    />
                    }
                </div>
            </div>
        </div>
    )
}

export default Favorite
