import React, {useState} from 'react'
import useToken from '../../hooks/useToken'
import * as myConstClass from "../../constants/constantsLanguage"
import axios from 'axios'
import { Confirm, CustomDialog, Alert } from 'react-st-modal'
import EditUserModal from "./EditUserModal"
import DetailUser from "./DetailUser"

export default function DataTable({ data, language }){
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    const { token, setToken } = useToken();
    const columns_vi = [content.fullName, content.username, content.role]
    const columns = ["name" ,"username", "isAdmin"]

    const [sortName, setSortName] = useState(true); // false: giảm - true: tăng
    const handleClickSortName = () => setSortName(!sortName);
    let sort = <i className="fas fa-sort-down" style={{marginLeft: "5px"}}></i>;
    if(sortName == false){
        sort = <i className="fas fa-sort-up" style={{marginLeft: "5px"}}></i>;
    }
    return(
        <table className="menuUserManagement_table" cellPadding={0} cellSpacing={0}>
            <thead>
                <tr>
                    {
                        columns_vi.map((heading, index) => {
                            if(heading != content.fullName){
                                return <th key={index + heading}>{heading}</th>
                            }
                            else{
                                return <th key={index + heading} onClick={handleClickSortName} style={{cursor: "pointer"}}>{heading}{sort}</th>
                            }
                        })
                    }<th>{content.action}</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ?
                    sortName ? 
                        data.sort((a, b) => (a.name > b.name)).map((row, indexRow) => {
                            const handleDeleteUser = () => {
                                const options = {
                                    method: "POST",
                                    headers: {
                                        "auth-token": token.authToken,
                                    },
                                    data: {
                                        "customerId": row._id
                                    },
                                    url: "http://localhost:5000/customer/delete"
                                }
                                axios(options)
                                .then(response => {
                                    // console.log("DELETE HOTEL: ", response.data)
                                    window.location.reload();
                                })
                                .catch(error => console.log(error))
                            }
                            if(row["_id"] != token.customerId){
                                return  <tr key={indexRow + row}>
                                            {columns.map((column, indexCol) => {
                                                let position = content.user
                                                
                                                    if(column != "isAdmin"){
                                                        return <td key={indexCol + column} style={{verticalAlign: "middle"}}>{row[column]}</td>
                                                    }
                                                    else{
                                                        if(row[column]){
                                                            position = content.admin
                                                        }
                                                        return <td key={indexCol + column} style={{verticalAlign: "middle"}}>{position}</td>
                                                    }
                                                }
                                            )}
                                                <td style={{verticalAlign: "middle"}}>  
                                                    <button 
                                                        style={{border: "none", background: "transparent", cursor: "pointer"}}
                                                        className="menuUserManagement_table_action_view" 
                                                        title={content.informationUser + row.username + content.informationUser1}
                                                        onClick={async () => {
                                                            await Alert(<DetailUser
                                                                language={language}
                                                                idCustomer={row._id}
                                                                isAdmin={row.isAdmin}
                                                                fullName={row.name}
                                                                username={row.username}
                                                                email={row.email}
                                                                phone={row.phone}
                                                                sex={row.sex}
                                                                address={row.address}
                                                            />, content.informationUser + row.username + content.informationUser1)
                                                        }}
                                                    >
                                                        <i className="fas fa-eye"/>
                                                    </button>

                                                    <button
                                                        style={{border: "none", background: "transparent", cursor: "pointer"}}
                                                        className="menuUserManagement_table_action_edit" 
                                                        title={content.editInformationUser + row.username + content.informationUser1}
                                                        onClick={async () => {
                                                            const result = await CustomDialog(<EditUserModal
                                                                customerId={row._id}
                                                                fullName={row.name}
                                                                username={row.username}
                                                                isAdmin={row.isAdmin}
                                                                token={token}
                                                                language={language}
                                                            />, {
                                                                title: content.editInformationUser + row.username + content.informationUser1,
                                                                showCloseIcon: true,
                                                            })
                                                        }}
                                                    >
                                                        <i className="fas fa-user-edit"/>
                                                    </button>

                                                    <button 
                                                        style={{border: "none", background: "transparent", cursor: "pointer"}}
                                                        className="menuUserManagement_table_action_remove" 
                                                        title={content.removeUser + row.username + content.informationUser1}
                                                        onClick={async () => {
                                                            const result = await Confirm(content.txtRemoveUser + row.username + content.txtConfirmRemoveHotel1, content.confirmRemove)
                                                            if(result){
                                                                handleDeleteUser();
                                                            }
                                                            else{
                                                                
                                                            }
                                                        }}
                                                    >
                                                        <i className="fas fa-user-minus"/>
                                                    </button>
                                                </td>
                                        </tr>
                             }
                        })
                    :
                        data.sort((a, b) => (b.name > a.name)).map((row, indexRow) => {
                            const handleDeleteUser = () => {
                                const options = {
                                    method: "POST",
                                    headers: {
                                        "auth-token": token.authToken,
                                    },
                                    data: {
                                        "customerId": row._id
                                    },
                                    url: "http://localhost:5000/customer/delete"
                                }
                                axios(options)
                                .then(response => {
                                    // console.log("DELETE HOTEL: ", response.data)
                                    window.location.reload();
                                })
                                .catch(error => console.log(error))
                            }
                            if(row["_id"] != token.customerId){
                                return  <tr key={indexRow + row}>
                                            {columns.map((column, indexCol) => {
                                                let position = content.user
                                                
                                                    if(column != "isAdmin"){
                                                        return <td key={indexCol + column} style={{verticalAlign: "middle"}}>{row[column]}</td>
                                                    }
                                                    else{
                                                        if(row[column]){
                                                            position = content.admin
                                                        }
                                                        return <td key={indexCol + column} style={{verticalAlign: "middle"}}>{position}</td>
                                                    }
                                                }
                                            )}
                                                <td style={{verticalAlign: "middle"}}>  
                                                    <button 
                                                        style={{border: "none", background: "transparent", cursor: "pointer"}}
                                                        className="menuUserManagement_table_action_view" 
                                                        title={content.informationUser + row.username + content.informationUser1}
                                                        onClick={async () => {
                                                            await Alert(<DetailUser
                                                                language={language}
                                                                idCustomer={row._id}
                                                                isAdmin={row.isAdmin}
                                                                fullName={row.name}
                                                                username={row.username}
                                                                email={row.email}
                                                                phone={row.phone}
                                                                sex={row.sex}
                                                                address={row.address}
                                                            />, 'Thông tin của `' + row.username + "`")
                                                        }}
                                                    >
                                                        <i className="fas fa-eye"/>
                                                    </button>

                                                    <button
                                                        style={{border: "none", background: "transparent", cursor: "pointer"}}
                                                        className="menuUserManagement_table_action_edit" 
                                                        title={content.informationUser + row.username + content.informationUser1}
                                                        onClick={async () => {
                                                            const result = await CustomDialog(<EditUserModal
                                                                customerId={row._id}
                                                                fullName={row.name}
                                                                username={row.username}
                                                                isAdmin={row.isAdmin}
                                                                token={token}
                                                                language={language}
                                                            />, {
                                                                title: "Sửa thông tin người dùng",
                                                                showCloseIcon: true,
                                                            })
                                                        }}
                                                    >
                                                        <i className="fas fa-user-edit"/>
                                                    </button>

                                                    <button 
                                                        style={{border: "none", background: "transparent", cursor: "pointer"}}
                                                        className="menuUserManagement_table_action_remove" 
                                                        title={content.informationUser + row.username + content.informationUser1}
                                                        onClick={async () => {
                                                            const result = await Confirm('Bạn có muốn xóa `' + row.username + '`?', "XÁC NHẬN XÓA")
                                                            if(result){
                                                                handleDeleteUser();
                                                            }
                                                            else{
                                                                
                                                            }
                                                        }}
                                                    >
                                                        <i className="fas fa-user-minus"/>
                                                    </button>
                                                </td>
                                        </tr>
                            }
                        })
                : <tr><td>Không tìm thấy dữ liệu phù hợp</td></tr>
                }
            </tbody>
        </table>
    )
}


