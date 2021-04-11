import React, { useState, useEffect, useCallback } from 'react'
import "../../style/SearchPage.css"
import SearchCard from "../../components/Search/SearchCard"
import LoadingScreen from "../../components/LoadingScreen"
import axios from 'axios'

function SearchPage() {
    const [data, setData] = useState([]);
    const [notData, setNotData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filterPrice, setFilterPrice] = useState(false); // false: giảm - true: tăng

    const handleClickFilterPrice = () => setFilterPrice(!filterPrice);

    let price = "Giảm dần";
    if(filterPrice == true){
        price = "Tăng dần";
    }

    const place = decodeURIComponent(window.location.href.split("=").pop()).split("+").join(" ");

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

    const location = {
        "location": placeMap,
    }

    console.log("location", location.location);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setNotData(false);

        if(capitalize(place) == "Việt Nam"){
            axios.get('http://localhost:5000/hotel/')
            .then(response => {
                if(response.data.length > 0){
                    setData(response.data);
                    setIsLoading(false);
                }
            })
        }
        else{
            axios.post('http://localhost:5000/hotel/location', location)
            .then(response => {
                if(response.data.length > 0){
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

    useEffect(() => {
        fetchData();
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

                <button className="searchPage_filter_hotel" onClick={handleClickFilterPrice}>
                    Giá: {price}
                </button>
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
                                    star={0}
                                    price={item.room.price}
                                />
                    })
                    : 
                    data.sort((a, b) => (b.room.price - a.room.price))
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
                                    star={0}
                                    price={item.room.price}
                                />
                    })
            // data.map(item => {
            //     return  <SearchCard 
            //                 // id={item.id}
            //                 img={item.imangeLink}
            //                 address={item.address}
            //                 name={item.name}
            //                 description={item.tien_ich
            //                     .map(ttt => {
            //                     return ttt + " · " 
            //                 })}
            //                 star={0}
            //                 price={item.price}
            //             />
            // })
        }
        </div>
    )
}

export default SearchPage
