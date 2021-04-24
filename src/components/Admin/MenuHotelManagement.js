import React, { useState, useEffect, useCallback } from 'react'
import "../../style/MenuHotelManagement.css"
import HotelCard from "./HotelCard"
import LoadingScreen from "../LoadingScreen"
import axios from 'axios'
import useToken from '../../hooks/useToken'
import Slider from '@material-ui/core/Slider'

function MenuHotelManagement() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterPrice, setFilterPrice] = useState(true); // false: giảm - true: tăng
    const handleClickFilterPrice = () => setFilterPrice(!filterPrice);
    let price = "Giảm dần";
    if(filterPrice == true){
        price = "Tăng dần";
    }

    const [location, setLocation] = useState("All");
    const handleFilterLocation = (e) => {
        setLocation(e.target.value);
    }
    console.log(location)

    const getDataHotel = useCallback(async () => {
        setIsLoading(true);
        if(location == "All"){
            const options = {
                method: "GET",
                url: "http://localhost:5000/hotel/"
            }
            axios(options)
            .then(response => {
                if(response.data.length > 0){
                    setData(response.data);
                    setIsLoading(false);
                }
            })
        }
        else{
            const options = {
                method: "POST",
                data: {
                    "location": location
                },
                url: "http://localhost:5000/hotel/location"
            }
            axios(options)
            .then(response => {
                if(response.data.length > 0){
                    console.log(response.data)
                    setData(response.data);
                    setIsLoading(false);
                }
            })
        }
    },[location])

    useEffect(() => {
        getDataHotel();     
    },[getDataHotel])



    const [valuePrice, setValuePrice] =  React.useState([0, 100]);
    const rangeSelector = (event, newValue) => {
        setValuePrice(newValue);
        console.log(newValue)
      };

    return (
        <div className="menuHotelManagement">

            <div className="menuHotelManagement_header">
                <h1 style={{marginBottom: "20px", fontSize: "50px"}}>QUẢN LÝ KHÁCH SẠN</h1>

                <button className="menuHotelManagement_filter_hotel" onClick={handleClickFilterPrice}>
                    <i className="fas fa-funnel-dollar"/>  Lọc giá: {price}
                </button>        

                {/* react-select */}
                {/* <i className="fas fa-map-marked-alt" style={{fontSize: "20px"}}/> */}
                <select className="menuHotelManagement_filter_hotel" onChange={handleFilterLocation}>
                    <optgroup label="Chọn địa điểm">
                        <option value='All'>Tất cả địa điểm</option>
                        <option value='TPHCM'>Hồ Chí Minh</option>
                        <option value='HN'>Hà Nội</option>
                        <option value='ĐN'>Đà Nẵng</option>
                        <option value='PT'>Phan Thiết</option>
                        <option value='VT'>Vũng Tàu</option>
                        <option value='ĐL'>Đà Lạt</option>
                        <option value='PQ'>Phú Quốc</option>
                    </optgroup>
                </select>

                <a href="/account/admin/add-hotel/">
                    <button className="menuHotelManagement_filter_hotel">
                        <i className="fas fa-plus-square"/>  Thêm khách sạn
                    </button>
                </a>
            </div>

            <div className="menuHotelManagement_header">
                <Slider
                    style={{width: "500px", color:"red"}}
                    value={valuePrice}
                    onChange={rangeSelector}
                    valueLabelDisplay="auto"
                />
                <p>Bạn đang lọc giá từ ${valuePrice[0]} đến ${valuePrice[1]}</p>
            </div>

            {isLoading ? <LoadingScreen/>
            :
            filterPrice ?
                data.sort((a, b) => (a.room.price - b.room.price))
                    .filter(item => valuePrice[0] <= item.room.price && item.room.price <= valuePrice[1])
                    .map(item => {
                    return <HotelCard
                                id={item._id}
                                img={item.imageLink}
                                address={item.address}
                                name={item.name}
                                description={item.tien_ich
                                    .map(ttt => {
                                    return ttt + " · " 
                                })}
                                price={item.room.price} 
                            />
                })
                :
                data.sort((a, b) => (b.room.price - a.room.price))
                    .filter(item => valuePrice[0] <= item.room.price && item.room.price <= valuePrice[1])
                    .map(item => {
                    return <HotelCard
                                id={item._id}
                                img={item.imageLink}
                                address={item.address}
                                name={item.name}
                                description={item.tien_ich
                                    .map(ttt => {
                                    return ttt + " · " 
                                })}
                                price={item.room.price} 
                            />
                })
            }
        </div>
    )
}

export default MenuHotelManagement
