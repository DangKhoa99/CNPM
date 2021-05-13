import React, { useState, useEffect, useCallback } from 'react'
import "../../style/SearchPage.css"
import SearchCard from "../../components/Search/SearchCard"
import LoadingScreen from "../../components/LoadingScreen"
import axios from 'axios'
import useToken from '../../hooks/useToken'
import { Slider } from '@material-ui/core'
import Lottie from "react-lottie"
import animationData from "../../lotties/pinjump"
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"

function SearchPage() {
    const { language, setLanguage } = useLanguage();
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const [data, setData] = useState([]);
    const [notData, setNotData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterPrice, setFilterPrice] = useState(true); // false: giảm - true: tăng
    const handleClickFilterPrice = () => setFilterPrice(!filterPrice);
    let price = content.decrease;
    if(filterPrice == true){
        price = content.increase;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const place = searchParams.get('result');
    // console.log("PLACE: ", place)

    let placeMap = place;
    if(capitalize(place) == "Hồ Chí Minh"){
        placeMap = "HCM"
    }
    else if(capitalize(place) == "Hà Nội"){
        placeMap = "HN"
    }
    else if(capitalize(place) == "Đà Nẵng"){
        placeMap = "ĐN"
    }
    else if(capitalize(place) == "Phan Thiết"){
        placeMap = "PT"
    }
    else if(capitalize(place) == "Vũng Tàu"){
        placeMap = "VT"
    }
    else if(capitalize(place) == "Đà Lạt"){
        placeMap = "ĐL"
    }
    else if(capitalize(place) == "Phú Quốc"){
        placeMap = "PQ"
    }


    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setNotData(false);

        if(capitalize(place) == "Việt Nam"){
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
                    "location": placeMap
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
                else{
                    setNotData(true);
                    setIsLoading(false);
                }
            })
        }
    },[place]);

    const { token, setToken } = useToken();
    const [dataFavoriteHotelOfCustomer, setDataFavoriteHotelOfCustomer] = useState([]);
    const getDataFavoriteHotelOfCustomer = async () => {
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "customerId": token.customerId
            },
            url: "http://localhost:5000/customer/favorite"
        }
        axios(options)
        .then(response => {
            // console.log("TEST: ", (response.data))
            setDataFavoriteHotelOfCustomer(response.data)
        })
        .catch(error => console.log(error))
    };

    useEffect(() => {
        fetchData();
        if(token){
            getDataFavoriteHotelOfCustomer();
        }
    },[fetchData])

    function capitalize(str) {
        const arrOfWords = str.split(" ");
        const arrOfWordsCased = [];
        
        for (let i = 0; i < arrOfWords.length; i++) {
            const word = arrOfWords[i];
            arrOfWordsCased.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        }
        return arrOfWordsCased.join(" ");
    }
    if(capitalize(place) == ""){
        document.title = "Việt Nam | RoyalStay"
    }
    else{
        document.title = capitalize(place) + " | RoyalStay"
    }
    
    // console.log(data.map(d => {return d.name}));
    // Phân trang
    // const [paging, setPaging] = useState({
    //     cards: [data.map(d => {return d.name})],
    //     currentPage: 1,
    //     cardsPerPage: 10
    // });

    // const handleClickNumberPaging = (e) => {
    //     setPaging({currentPage: Number(e.target.id)});
    // }

    // const indexOfLastCard = paging.currentPage * paging.cardsPerPage;
    // const indexOfFirstCard = indexOfLastCard - paging.cardsPerPage;
    // const currentCards = paging.cards.slice(indexOfFirstCard, indexOfLastCard);

    let savedHotelId = [];
    for(let key in dataFavoriteHotelOfCustomer){
        // console.log("key", dataFavoriteHotelOfCustomer[key]._id)
        data.map((item)=>{
            return (dataFavoriteHotelOfCustomer[key]._id == item._id) ? savedHotelId.push(item._id) : ""
        })
    }
    let maxPrice = Math.max(...Object.values(data.map(item => (item.room.price))));
    // console.log("MAX PRICE: ", (maxPrice))
    const [valuePrice, setValuePrice] =  React.useState([0, 120]);
    useEffect(() => {
        setValuePrice([0, maxPrice])
    },[maxPrice])
    const rangeSelector = (e, newValue) => {
        setValuePrice(newValue);
        // console.log(newValue)
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="searchPage">
            <div className="searchPage_info">
                <p style={{fontSize: "15px", color: "gray", fontStyle: "italic"}}>{content.subTitleSearchPage1} <b>{data.length}</b> {content.subTitleSearchPage2}</p>
                <h1><i className="fas fa-map-marked-alt"/>{
                    capitalize(place) == "" ?
                    content.titleSearchPage + " Việt Nam"
                    :
                    content.titleSearchPage + capitalize(place)
                }</h1>
            </div>

            <div className="menuHotelManagement_header">
                <button className="searchPage_filter_hotel" onClick={handleClickFilterPrice}>
                <i className="fas fa-funnel-dollar"/> {price} {filterPrice? <i className="fas fa-long-arrow-alt-up"/> : <i className="fas fa-long-arrow-alt-down"/>}
                </button>

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
                {notData ? <div><h1 style={{textAlign: "center"}}>{content.notData}</h1> <Lottie 
                                        options={defaultOptions}
                                        height={300}
                                        width={300}/></div> : ""}
            <ul className="list-product">
                {isLoading ? <div style={{marginLeft: "750px", marginTop: "-200px"}}><LoadingScreen /></div>
                :
                    filterPrice ?
                        data.sort((a, b) => (a.room.price - b.room.price))
                        .filter(item => valuePrice[0] <= item.room.price && item.room.price <= valuePrice[1])
                        .map((item, index) => {
                            return  <SearchCard 
                                        key={index + item}
                                        id={item._id}
                                        img={item.imageLink}
                                        address={item.address}
                                        name={item.name}
                                        description={item.tien_ich
                                            .map(function(ttt, index) {
                                                return (index ? ' · ' : '') + ttt
                                        })}
                                        price={item.room.price}
                                        savedHotelId={savedHotelId}
                                        review={item.review}
                                        language={language}
                                    />
                                
                        })
                        : 
                        data.sort((a, b) => (b.room.price - a.room.price))
                        .filter(item => valuePrice[0] <= item.room.price && item.room.price <= valuePrice[1])
                        .map((item, index) => {
                            return <SearchCard 
                                        key={index + item}
                                        id={item._id}
                                        img={item.imageLink}
                                        address={item.address}
                                        name={item.name}
                                        description={item.tien_ich
                                            .map(function(ttt, index) {
                                                return (index ? ' · ' : '') + ttt
                                        })}
                                        price={item.room.price}
                                        savedHotelId={savedHotelId}
                                        review={item.review}
                                        language={language}
                                    />
                        })
                }
            </ul>
        </div>
    )
}

export default SearchPage
