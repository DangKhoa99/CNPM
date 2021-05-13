import React, { useState, useEffect, useCallback } from 'react'
import "../../style/MenuHotelManagement.css"
import HotelCard from "./HotelCard"
import LoadingScreen from "../LoadingScreen"
import axios from 'axios'
import Slider from '@material-ui/core/Slider'
import * as myConstClass from "../../constants/constantsLanguage"
import { CustomDialog } from 'react-st-modal'
import AddHotel from "./AddHotel"

function MenuHotelManagement({ language, token }) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterPrice, setFilterPrice] = useState(true); // false: giảm - true: tăng
    const handleClickFilterPrice = () => setFilterPrice(!filterPrice);
    let price = content.decrease;
    if(filterPrice == true){
        price = content.increase;
    }

    const [scrollBtn, setScrollBtn] = useState(false);
    const toggleVisible = () =>{
        const scrolled = document.documentElement.scrollTop;
        if(scrolled > 100){
            setScrollBtn(true);
        }
        else{
            setScrollBtn(false);
        }
    }

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    window.addEventListener("scroll", toggleVisible);

    const [location, setLocation] = useState("All");
    const handleFilterLocation = (e) => {
        setLocation(e.target.value);
    }
    // console.log(location)

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
                    // console.log(response.data)
                    setData(response.data);
                    setIsLoading(false);
                }
            })
        }
    },[location])

    useEffect(() => {
        getDataHotel();     
    },[getDataHotel])

    let maxPrice = Math.max(...Object.values(data.map(item => (item.room.price))));
    const [valuePrice, setValuePrice] =  useState([0, 999]);
    useEffect(() => {
        console.log("MAX: ", maxPrice)
        setValuePrice([0, maxPrice])
    },[maxPrice])
    const rangeSelector = (event, newValue) => {
        setValuePrice(newValue);
        // console.log(newValue)
    };

    return (
        <div className="menuHotelManagement">
            <div className="menuHotelManagement_header">
                <h1 style={{marginBottom: "20px", fontSize: "50px", textTransform: "uppercase"}}>{content.hotelManagement}</h1>

                <button className="menuHotelManagement_filter_hotel" onClick={handleClickFilterPrice}>
                    <i className="fas fa-funnel-dollar"/> {price} {filterPrice? <i className="fas fa-long-arrow-alt-up"/> : <i className="fas fa-long-arrow-alt-down"/>}
                </button>        

                {/* react-select */}
                {/* <i className="fas fa-map-marked-alt" style={{fontSize: "20px"}}/> */}
                <select className="menuHotelManagement_filter_hotel" onChange={handleFilterLocation}>
                    <optgroup label={content.selectPlace}>
                        <option value='All'>{content.allPlace}</option>
                        <option value='TPHCM'>Hồ Chí Minh</option>
                        <option value='HN'>Hà Nội</option>
                        <option value='ĐN'>Đà Nẵng</option>
                        <option value='PT'>Phan Thiết</option>
                        <option value='VT'>Vũng Tàu</option>
                        <option value='ĐL'>Đà Lạt</option>
                        <option value='PQ'>Phú Quốc</option>
                    </optgroup>
                </select>

                <button 
                    className="menuHotelManagement_filter_hotel"
                    onClick={async () => {
                        const result = await CustomDialog(<AddHotel
                            token={token}
                            language={language}
                        />, {
                            title: content.addHotel,
                            showCloseIcon: true,
                        })
                    }}
                >
                    <i className="fas fa-plus-square"/>  {content.addHotel}
                </button>

            </div>

            <div className="menuHotelManagement_header">
            <div className="slider_price">
                    <div className="price_wrap">
                        <h2>${valuePrice[0]} </h2>
                        <h2>${valuePrice[1]}</h2>
                    </div>
                    <Slider
                        className="slider"
                        value={valuePrice}
                        min={0}
                        max={maxPrice}
                        onChange={rangeSelector}
                    />
                </div>
            </div>

            {isLoading ? <div style={{marginTop: "-280px"}}><LoadingScreen /></div>
            :
            filterPrice ?
                data.sort((a, b) => (a.room.price - b.room.price))
                    .filter(item => valuePrice[0] <= item.room.price && item.room.price <= valuePrice[1])
                    .map((item, index) => {
                    return <HotelCard
                                key={index + item}
                                id={item._id}
                                img={item.imageLink}
                                address={item.address}
                                name={item.name}
                                description={item.bio}
                                tien_ich={item.tien_ich
                                    .map(function(ttt, index) {
                                        return (index ? ' · ' : '') + ttt
                                })}
                                price={item.room.price}
                                quantity={item.room.quantity}
                                roomType={item.room.roomType}
                                review={item.review}
                                language={language}
                            />
                })
                :
                data.sort((a, b) => (b.room.price - a.room.price))
                    .filter(item => valuePrice[0] <= item.room.price && item.room.price <= valuePrice[1])
                    .map((item, index) => {
                    return <HotelCard
                                key={index + item}
                                id={item._id}
                                img={item.imageLink}
                                address={item.address}
                                name={item.name}
                                description={item.bio}
                                tien_ich={item.tien_ich
                                    .map(function(ttt, index) {
                                        return (index ? ' · ' : '') + ttt
                                })}
                                price={item.room.price}
                                quantity={item.room.quantity}
                                roomType={item.room.roomType}
                                review={item.review}
                                language={language}
                            />
                })
            }

            <button className="menuHotelManagement_btnScrollToTop" onClick={scrollToTop} style={{display: scrollBtn ? "inline" : "none"}}><i className="fas fa-arrow-circle-up"/></button>
        </div>
    )
}

export default MenuHotelManagement
