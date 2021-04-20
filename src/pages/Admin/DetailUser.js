import React, {useState, useEffect} from 'react'
import "../../style/DetailUser.css"
import { useHistory } from "react-router-dom";
import axios from 'axios'
import useToken from '../../hooks/useToken'

function DetailUser() {
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
                console.log(response.data)
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

    return (
        <div className="detailUser">
            <div className="bookingHeader_block">
                <button className="bookingHeader_icon" onClick={history.goBack}>
                    <svg viewBox="0 0 32 32">
                        <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"/> 
                    </svg>
                </button>
                <div style={{marginLeft: "30px"}} className="bookingHeader_text">
                    Thông tin người dùng
                </div>
            </div>


            <table className="detailUser_table">
                <tbody style={{cursor: "pointer"}}>
                    <tr>
                        <td>
                            id:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {idCustomer}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Chức vụ:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.isAdmin ? "Admin" : "Người dùng"}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Họ tên:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.name}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Tài khoản:
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
                            {dataUser.email ? dataUser.email : "Chưa cập nhật"}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Số điện thoại:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.phone ? dataUser.phone : "Chưa cập nhật"}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Giới tính:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.sex ? "Nam" : "Nữ"}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Địa chỉ:
                        </td>
                        <td style={{fontWeight: "600"}}>
                            {dataUser.address ? dataUser.address : "Chưa cập nhật"}
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}

export default DetailUser
