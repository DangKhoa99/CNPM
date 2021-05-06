import React, {useState} from 'react'
import useToken from '../../hooks/useToken'
import * as myConstClass from "../../constants/constantsLanguage"

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
                            if(row["_id"] != token.customerId){
                                return  <tr key={indexRow + row}>
                                            {columns.map((column, indexCol) => {
                                                let position = content.user
                                                
                                                    if(column != "isAdmin"){
                                                        return <td key={indexCol + column}>{row[column]}</td>
                                                    }
                                                    else{
                                                        if(row[column]){
                                                            position = content.admin
                                                        }
                                                        return <td key={indexCol + column}>{position}</td>
                                                    }
                                                }
                                            )}
                                                <td>  
                                                    <a className="menuUserManagement_table_action" href={"/account/admin/detail-user?id=" + row._id} title={content.informationUser + row.username + content.informationUser1}><i className="fas fa-info-circle"/></a>
                                                </td>
                                        </tr>
                             }
                        })
                    :
                        data.sort((a, b) => (b.name > a.name)).map((row, indexRow) => {
                            if(row["_id"] != token.customerId){
                                return  <tr key={indexRow + row}>
                                            {columns.map((column, indexCol) => {
                                                let position = "Người dùng"
                                                
                                                    if(column != "isAdmin"){
                                                        return <td key={indexCol + column}>{row[column]}</td>
                                                    }
                                                    else{
                                                        if(row[column]){
                                                            position = "Admin"
                                                        }
                                                        return <td key={indexCol + column}>{position}</td>
                                                    }
                                                }
                                            )}
                                                <td>  
                                                    <a className="menuUserManagement_table_action" href={"/account/admin/detail-user?id=" + row._id} title={"Xem thông tin của " + row.username}><i className="fas fa-info-circle"/></a>
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


