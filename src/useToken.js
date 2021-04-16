import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('authToken');
        const userToken = JSON.parse(tokenString);

        // console.log(userToken);
        return userToken
      };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('authToken', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }

}