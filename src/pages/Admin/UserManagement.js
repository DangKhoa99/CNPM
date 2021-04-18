import React, {useState, useEffect} from 'react'
import "../../style/UserManagement.css"
import axios from 'axios'
import SignIn from '../SignIn/SignIn'
import useToken from '../../useToken'
import LoadingScreen from "../../components/LoadingScreen"

function UserManagement() {
    const { token, setToken } = useToken();
    const [isLoading, setIsLoading] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [sortName, setSortName] = useState(true); // false: giảm - true: tăng
    const handleClickSortName = () => setSortName(!sortName);
    let sort = <i class="fas fa-sort-down" style={{marginLeft: "5px"}}></i>;
    if(sortName == false){
        sort = <i class="fas fa-sort-up" style={{marginLeft: "5px"}}></i>;
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const options = {
                method: "GET",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {},
                url: "http://localhost:5000/customer/"
            }
            axios(options)
            .then(response => {
                console.log(response.data)
                setDataUser(response.data)
                setIsLoading(false);
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

    console.log("ADMIN: ", )

    return (
        <div className="userManagement">
            <h1 style={{marginBottom: "20px", fontSize: "50px"}}>QUẢN LÝ NGƯỜI DÙNG</h1>

            <a href="/account/admin/add-user/">
                <button className="userManagement_addUser">
                    <i class="fas fa-user-plus"/> Thêm người dùng
                </button>
            </a>
            
            <table className="userManagement_table">
                <thead>
                    <tr>
                        <th style={{verticalAlign: "middle", overflow: "hidden"}}>
                            <div className="th_text" onClick={handleClickSortName} style={{cursor: "pointer"}}>
                                Họ tên{sort}
                            </div>
                        </th>
                        <th style={{verticalAlign: "middle", overflow: "hidden", fontWeight: "600"}}>
                            <div className="th_text">
                                Tài khoản
                            </div>
                        </th>
                        <th style={{verticalAlign: "middle", overflow: "hidden"}}>
                            <div className="th_text">
                                Chức vụ
                            </div>
                        </th>
                        <th style={{verticalAlign: "middle", overflow: "hidden"}}>
                            <div className="th_text">
                                Hành động
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody style={{cursor: "pointer"}}>
                    {isLoading ? <div style={{marginRight: "-800px"}}><LoadingScreen/></div> : 
                        sortName ? 
                        dataUser.sort((a, b) => (a.name > b.name))
                        .map(user => {
                            if(user._id != token.customerId){
                                return  <tr>
                                            <td>
                                                {user.name}
                                            </td>
                                            <td style={{fontWeight: "600"}}>
                                                {user.username}
                                            </td>
                                            <td>
                                                {user.isAdmin ? "Admin" : "Người dùng"}
                                            </td>
                                            <td>
                                                <a className="userManagement_action" href={"/account/admin/detail-user?id=" + user._id} title={"Xem thông tin của " + user.username}><i class="fas fa-info-circle"/></a>
                                            </td>
                                        </tr>
                            }
                        })
                        :
                        dataUser.sort((a, b) => (a.name < b.name))
                        .map(user => {
                            if(user._id != token.customerId){
                                return  <tr>
                                            <td>
                                                {user.name}
                                            </td>
                                            <td style={{fontWeight: "600"}}>
                                                {user.username}
                                            </td>
                                            <td>
                                                {user.isAdmin ? "Admin" : "Người dùng"}
                                            </td>
                                            <td>
                                                <a className="userManagement_action" href={"/account/admin/detail-user?id=" + user._id} title={"Xem thông tin của " + user.username}><i class="fas fa-info-circle"/></a>
                                            </td>
                                        </tr>
                            }
                        })
                        
                    }
                </tbody>

            </table>
        </div>
    )
}

export default UserManagement
