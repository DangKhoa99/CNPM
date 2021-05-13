import React, {useState, useEffect} from 'react'
import "../../style/MenuUserManagement.css"
import axios from 'axios'
import SignIn from '../../pages/SignIn/SignIn'
import LoadingScreen from "../LoadingScreen"
import DataTable from "./DataTable"
import * as myConstClass from "../../constants/constantsLanguage"
import { CustomDialog } from 'react-st-modal'
import AddUser from "./AddUser"

function MenuUserManagement({
    language, 
    token
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
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
                // console.log(response.data)
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

    // console.log("ADMIN: ", dataUser)
    const [q, setQ] = useState("")
    const [searchColumns, setSearchColumns] = useState(["name", "username", "isAdmin"])
    const handleSearch = (e) =>{
        setQ(e.target.value);
    }
    function search(rows){
        // const columns = dataUser[0] && Object.keys(dataUser[0]);
        return rows.filter(row => (
            searchColumns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
        )

    }
    const columns = ["name", "username", "isAdmin"]
    if(!token){
        return <SignIn />
    }
    
    return (
        <div className="menuUserManagement">
            <h1 style={{marginBottom: "20px", fontSize: "50px", textTransform: "uppercase", textAlign: "center"}}>{content.userManagement}</h1>
            <div className="menuUserManagement_function">
                {/* <a href="/account/admin/add-user/"> */}
                <button 
                    className="menuUserManagement_addUser"
                    onClick={async () => {
                        const result = await CustomDialog(<AddUser
                            token={token}
                            language={language}
                        />, {
                            title: content.addUser,
                            showCloseIcon: true,
                        })
                    }}
                >
                    <i className="fas fa-user-plus"/> {content.addUser}
                </button>
                {/* </a> */}

                <div className="menuUserManagement_boxSearch">
                    
                    <div className="menuUserManagement_search">
                        <i className="fas fa-search" style={{fontSize: "14px", marginTop: "auto", marginBottom: "auto", marginLeft: "-30px"}}></i>
                        <input 
                            className="searchTerm"
                            placeholder={content.placeholderSearchMenuUserManagement}
                            type="text" 
                            value={q} 
                            onChange={handleSearch}
                        />
                        <span className='input-highlight'>
                            {q.replace(/ /g, "\u00a0")}
                        </span>
                    </div>

                    <div className="menuUserManagement_option_search" style={{display: "none"}}>
                        {columns && columns.map((column, index) => {
                            let column_vi = content.fullName
                            if(column == "username"){
                                column_vi = content.username
                            }
                            return  <label key={index + column} className="container_checkbox">{column_vi}
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
                                        
                                        <span className="checkmark_checkbox"></span>
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
                    language={language}
                />
            </div>
            }
        </div>
    )
}

export default MenuUserManagement
