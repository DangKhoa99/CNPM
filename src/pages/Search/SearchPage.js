import React, { useState, useEffect } from 'react'
import "../../style/SearchPage.css"
import SearchCard from "../../components/Search/SearchCard"
import LoadingScreen from "../../components/LoadingScreen"
import axios from 'axios'

function SearchPage() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pageURL, setPageURL] = useState("");
    const [filterPrice, setFilterPrice] = useState(false); // false: giảm - true: tăng

    const handleClickFilterPrice = () => setFilterPrice(!filterPrice);

    let price = "Giảm dần";
    if(filterPrice == true){
        price = "Tăng dần";
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            // const result = await axios.get('http://localhost:5000/hotel/')
            await axios.get('http://localhost:5000/hotel/')
            .then(response => {
                if(response.data.length > 0){
                    setData(response.data);
                    setIsLoading(false);
                }
            })
            // setData(result.data);
            // setIsLoading(false);
        };

        fetchData();

        console.log("data use effect", data);

        if(window.location.href.split("=").pop() == ""){
            setPageURL("Vui lòng chọn địa điểm");
        }
        else{
            setPageURL(decodeURIComponent(window.location.href.split("=").pop()));
        }
    },[])

    console.log("aaaaa", data);

    const place = pageURL.split("+").join(" ");

    function capitalize(str) {
        const arrOfWords = str.split(" ");
        const arrOfWordsCased = [];
        
        for (let i = 0; i < arrOfWords.length; i++) {
            const word = arrOfWords[i];
            arrOfWordsCased.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        }
        return arrOfWordsCased.join(" ");
    }

    document.title = capitalize(place) + " | RoyalStay"
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
                <h1>{"Khách sạn tại " + capitalize(place)}</h1>

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
