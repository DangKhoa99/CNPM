import React from 'react'
import "../../style/MenuAdmin.css"
import MenuAdmin from "../../components/Admin/MenuAdmin"
import MenuUserManagement from "../../components/Admin/MenuUserManagement"
import useToken from '../../hooks/useToken'
import SignIn from '../SignIn/SignIn'
import useGetDataCustomer from '../../hooks/useDataCustomer'
import LoadingScreen from "../../components/LoadingScreen"

function UserManagement() {
    const {token, setToken} = useToken();
    const {dataCustomer, isLoading} = useGetDataCustomer();
    if(!token){
        return <SignIn />
    }

    document.title = "Quản lý người dùng | RoyalStay"
    const fullName = (dataCustomer.name || "");
    const userName = (dataCustomer.name || "").split(' ').slice(-1).join(' ');
    return (
        <div className="admin">
            <div className="admin_page">
                <div className="admin_container">
                    {isLoading ? <div style={{marginLeft: "80px"}}><LoadingScreen/></div> :
                        <MenuAdmin
                            markPage="userManagement"
                            fullName={fullName}
                            nameUser={userName}
                            username={dataCustomer.username}
                            imageUser={fullName}
                        />
                    }
                    <MenuUserManagement/>
                </div>
            </div> 
        </div>
    )
}

export default UserManagement
