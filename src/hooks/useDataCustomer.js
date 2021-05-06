import React, {useState, useEffect} from 'react'
import axios from 'axios'
import useToken from './useToken'

export default function useDataCustomer() {
    const {token, setToken} = useToken();
    const [dataCustomer, setDataCustomer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const getData = async () => {
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
        }

        if(token){
            getData();
        }
    },[])

  return {dataCustomer, isLoading};
}