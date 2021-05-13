import React, {useState, useEffect} from 'react'
import axios from 'axios'
import useToken from './useToken'

export default function useGetDataFavoriteHotelOfCustomer() {
    const {token, setToken} = useToken();
    const [dataFavoriteHotelOfCustomer, setDataFavoriteHotelOfCustomer] = useState([]);
    const [isLoadingDataFavoriteHotelOfCustomer, setIsLoadingDataFavoriteHotelOfCustomer] = useState(false);
    
    useEffect(() => {
        const getDataFavoriteHotelOfCustomer = async () => {
            setIsLoadingDataFavoriteHotelOfCustomer(true);
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
                // console.log((response.data))
                setDataFavoriteHotelOfCustomer(response.data)
                setIsLoadingDataFavoriteHotelOfCustomer(false);
            })
            .catch(error => console.log(error))
        };

        if(token){
            getDataFavoriteHotelOfCustomer();
        }
    },[])

  return {dataFavoriteHotelOfCustomer, isLoadingDataFavoriteHotelOfCustomer};
}