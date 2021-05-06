import React, {useState, useEffect} from 'react'
import "../../style/DetailUser.css"
import { useHistory } from "react-router-dom";
import axios from 'axios'
import useToken from '../../hooks/useToken'
import SignIn from '../SignIn/SignIn'
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"

function DetailUser() {
    const { language, setLanguage } = useLanguage();
    let content = myConstClass.LANGUAGE;
    language === "English"
      ? (content = content.English)
      : (content = content.Vietnam);

    let history = useHistory();
    const searchParams = new URLSearchParams(window.location.search);
    const idCustomer = searchParams.get('id');

    const { token, setToken } = useToken();
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "POST",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {
                    "customerId": idCustomer
                },
                url: "http://localhost:5000/customer/getUser"
            }
            axios(options)
            .then(response => {
                // console.log(response.data)
                setDataUser(response.data)
            })
            .catch(error => {
                console.log(error)
                window.location = "/404"
            })
        }
        if(token){
            fetchData();
        }
    },[])

    if(!token){
        return <SignIn />
    }

    document.title = content.userInformation + " - " + dataUser.username + " | RoyalStay"

    return (
        <div className="detailUser">
            <div className="bookingHeader_block">
                <button className="bookingHeader_icon" onClick={history.goBack} title={content.return}>
                    <svg viewBox="0 0 32 32">
                        <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"/> 
                    </svg>
                </button>
                <div style={{marginLeft: "30px"}} className="bookingHeader_text">
                    {content.userInformation}
                </div>
            </div>

            <table className="detailUser_table">
                <tbody style={{cursor: "pointer"}}>
                    <tr>
                        <td>
                            {content.idAccount}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {idCustomer}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.role}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.isAdmin ? content.admin : content.user}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.fullName}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.name}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.username}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.username}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Email:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.email ? dataUser.email : content.notUpdate}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.phoneNumber}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.phone ? dataUser.phone : content.notUpdate}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.sex}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.sex ? content.male : content.female}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {content.address}:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.address ? dataUser.address : content.notUpdate}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DetailUser
