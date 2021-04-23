import React, {useState} from 'react'
import useToken from '../../hooks/useToken'

export default function DataTable({ data }){
    const { token, setToken } = useToken();
    const columns_vi = ["Họ tên" ,"Tài khoản", "Chức vụ"]
    const columns = ["name" ,"username", "isAdmin"]

    const [sortName, setSortName] = useState(true); // false: giảm - true: tăng
    const handleClickSortName = () => setSortName(!sortName);
    let sort = <i class="fas fa-sort-down" style={{marginLeft: "5px"}}></i>;
    if(sortName == false){
        sort = <i class="fas fa-sort-up" style={{marginLeft: "5px"}}></i>;
    }
    return(
        <table className="menuUserManagement_table" cellPadding={0} cellSpacing={0}>
            <thead>
                <tr>
                    {
                        columns_vi.map(heading => {
                            if(heading != "Họ tên"){
                                return <th>{heading}</th>
                            }
                            else{
                                return <th onClick={handleClickSortName} style={{cursor: "pointer"}}>{heading}{sort}</th>
                            }
                        })
                        
                    }<th>Hành động</th>
                    
                </tr>
            </thead>
            <tbody>

                {data.length > 0 ?
                    sortName ? 
                        data.sort((a, b) => (a.name > b.name)).map(row => {
                            if(row["_id"] != token.customerId){
                                return  <tr>
                                            {columns.map(column => {
                                                let position = "Người dùng"
                                                
                                                    if(column != "isAdmin"){
                                                        return <td>{row[column]}</td>
                                                    }
                                                    else{
                                                        if(row[column]){
                                                            position = "Admin"
                                                        }
                                                        return <td>{position}</td>
                                                    }
                                                }
                                            )}
                                                <td>  
                                                    <a className="menuUserManagement_table_action" href={"/account/admin/detail-user?id=" + row._id} title={"Xem thông tin của " + row.username}><i class="fas fa-info-circle"/></a>
                                                </td>
                                        </tr>
                             }
                        })
                    :
                        data.sort((a, b) => (b.name > a.name)).map(row => {
                            if(row["_id"] != token.customerId){
                                return  <tr>
                                            {columns.map(column => {
                                                let position = "Người dùng"
                                                
                                                    if(column != "isAdmin"){
                                                        return <td>{row[column]}</td>
                                                    }
                                                    else{
                                                        if(row[column]){
                                                            position = "Admin"
                                                        }
                                                        return <td>{position}</td>
                                                    }
                                                }
                                            )}
                                                <td>  
                                                    <a className="menuUserManagement_table_action" href={"/account/admin/detail-user?id=" + row._id} title={"Xem thông tin của " + row.username}><i class="fas fa-info-circle"/></a>
                                                </td>
                                        </tr>
                            }
                        })
                : "Không tìm thấy dữ liệu phù hợp"
                }
            </tbody>
        </table>
    )
}


