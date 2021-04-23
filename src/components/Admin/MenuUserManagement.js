import React, {useState, useEffect} from 'react'
import "../../style/MenuUserManagement.css"
import axios from 'axios'
import SignIn from '../../pages/SignIn/SignIn'
import useToken from '../../hooks/useToken'
import LoadingScreen from "../LoadingScreen"
import DataTable from "./DataTable"

function MenumenuUserManagement() {
    const { token, setToken } = useToken();
    const [isLoading, setIsLoading] = useState(false);
    const [dataUser, setDataUser] = useState([]);
 
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
            await axios(options)
            .then(response => {
                console.log(response.data)
                setDataUser(response.data)
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
                // window.location = "/404"
            })
        }
        if(token){
            fetchData();
        }
        
    },[])

    console.log("ADMIN: ", dataUser)
    const [q, setQ] = useState("")
    const [searchColumns, setSearchColumns] = useState(["name", "username"])
    function search(rows){
        // const columns = dataUser[0] && Object.keys(dataUser[0]);
        return rows.filter(row => (
            searchColumns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
        )
    }
    const columns = ["name", "username"]
    if(!token){
        return <SignIn />
    }
    
    return (
        <div className="menuUserManagement">
            <h1 style={{marginBottom: "20px", fontSize: "50px"}}>QUẢN LÝ NGƯỜI DÙNG</h1>
            <div className="menuUserManagement_function">
                <a href="/account/admin/add-user/">
                    <button className="menuUserManagement_addUser">
                        <i class="fas fa-user-plus"/> Thêm người dùng
                    </button>
                </a>

                <div className="menuUserManagement_boxSearch">
                    
                    <div className="menuUserManagement_search">
                        <i class="fas fa-search" style={{fontSize: "30px", marginTop: "auto", marginBottom: "auto", marginLeft: "-30px"}}></i>
                        <input 
                            className="searchTerm"
                            placeholder="Tìm..."
                            type="text" 
                            value={q} 
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <span className='input-highlight'>
                            {q.replace(/ /g, "\u00a0")}
                        </span>
                    </div>

                    <div className="menuUserManagement_option_search">
                        {columns && columns.map(column => {
                            let column_vi = "Họ tên"
                            if(column == "username"){
                                column_vi = "Tài khoản"
                            }
                            return  <label className="container_checkbox">{column_vi}
                                        <input
                                            className="checkbox"
                                            type="checkbox"
                                            checked={searchColumns.includes(column)}
                                            onChange={(e) => {
                                                const checked = searchColumns.includes(column);
                                                setSearchColumns((prev) =>
                                                    checked
                                                        ? prev.filter((sc) => sc !== column)
                                                        : [...prev, column]
                                                )
                                            }}
                                        />
                                        
                                        <span class="checkmark_checkbox"></span>
                                    </label>
                        })}
                    </div>
                </div>
            </div>
            {isLoading ? <LoadingScreen/> 
            : 
            <div>
                <DataTable
                    data={search(dataUser)}
                />
            </div>
            }
        </div>
    )
}

export default MenumenuUserManagement
