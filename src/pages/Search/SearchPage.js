import React, { useState, useEffect, useCallback } from 'react'
import "../../style/SearchPage.css"
import SearchCard from "../../components/Search/SearchCard"
import LoadingScreen from "../../components/LoadingScreen"
import axios from 'axios'
import useToken from '../../useToken'
import Slider from '@material-ui/core/Slider'

function SearchPage() {
    const [data, setData] = useState([]);
    const [notData, setNotData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterPrice, setFilterPrice] = useState(true); // false: giảm - true: tăng
    const handleClickFilterPrice = () => setFilterPrice(!filterPrice);
    let price = "Giảm dần";
    if(filterPrice == true){
        price = "Tăng dần";
    }
    const [valuePrice, setValuePrice] =  React.useState([0, 100]);
    const rangeSelector = (event, newValue) => {
        setValuePrice(newValue);
        console.log(newValue)
      };

    // const place = decodeURIComponent(window.location.href.split("=").pop()).split("+").join(" ");
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
                    console.log(response.data)
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
            console.log("TEST: ", (response.data))
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
        data.map(item=>{
            return (dataFavoriteHotelOfCustomer[key]._id == item._id) ? savedHotelId.push(item._id) : ""
        }
    )
    }

    return (
        <div className="searchPage">
            {/* <Header /> */}
            <div className="searchPage_info">
                {/* <p>Hơn 300 chỗ ở</p> */}
                <h1>{
                    capitalize(place) == "" ?
                    "Khách sạn tại Việt Nam"
                    :
                    "Khách sạn tại " + capitalize(place)
                }</h1>
            </div>

            <div className="hotelManagement_header">
                <button className="searchPage_filter_hotel" onClick={handleClickFilterPrice}>
                    Giá: {price}
                </button>

                <br></br>

                <Slider
                    style={{width: "500px", color:"red"}}
                    value={valuePrice}
                    onChange={rangeSelector}
                    valueLabelDisplay="auto"
                />
                <p>Bạn đang lọc giá từ ${valuePrice[0]} đến ${valuePrice[1]}</p>
            </div>

            {/* Filter theo khoảng giá trị */}
            {/* {data.filter(data => data.price < 50).map(d => {
                return  <SearchCard 
                            id={d.id}
                            img={d.img}
                            location={d.location}
                            title={d.title}
                            description={d.description}
                            star={d.stars}
                            price={d.price}
                        />
            })} */}

            {isLoading ? <LoadingScreen/>
            :
            notData ? <h1 style={{textAlign: "center"}}>Chúng tôi không tìm thấy bất kỳ khách sạn nào nơi bạn muốn đến. Vui lòng chọn nơi khác.</h1> :
                filterPrice ?
                    data.sort((a, b) => (a.room.price - b.room.price))
                    .filter(item => valuePrice[0] <= item.room.price && item.room.price <= valuePrice[1])
                    .map(item => {
                        return  <SearchCard 
                                    id={item._id}
                                    img={item.imageLink}
                                    address={item.address}
                                    name={item.name}
                                    description={item.tien_ich
                                        .map(ttt => {
                                        return ttt + " · " 
                                    })}
                                    price={item.room.price}
                                    savedHotelId={savedHotelId}
                                />
                    })
                    : 
                    data.sort((a, b) => (b.room.price - a.room.price))
                    .filter(item => valuePrice[0] <= item.room.price && item.room.price <= valuePrice[1])
                    .map(item => {
                        return  <SearchCard 
                                    id={item._id}
                                    img={item.imageLink}
                                    address={item.address}
                                    name={item.name}
                                    description={item.tien_ich
                                        .map(ttt => {
                                        return ttt + " · " 
                                    })}
                                    price={item.room.price}
                                    savedHotelId={savedHotelId}
                                />
                    })
        }
        </div>
    )
}

export default SearchPage
