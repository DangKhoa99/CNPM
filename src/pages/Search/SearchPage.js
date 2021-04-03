import React, { useState, useEffect } from 'react'
import "../../style/SearchPage.css"
import SearchCard from "../../components/Search/SearchCard"
import { Button } from '@material-ui/core'
import Header from '../../components/Header'

function SearchPage() {
    

    const [pageURL, setPageURL] = useState("");
    useEffect(() => {
        if(window.location.href.split("=").pop() == ""){
            setPageURL("Vui lòng chọn địa điểm");
        }
        else{
            setPageURL(decodeURIComponent(window.location.href.split("=").pop()));
        }
        
    })
    
    console.log("aaaa", decodeURIComponent(window.location.href.split("=").pop()));

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

    document.title = capitalize(place)

    const [data, setData] = useState([
        {
            id: 1,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU",
            location: "Phòng riêng tại Quận 3",
            title: "Tiamy Housie T4",
            description: "2 khách · 1 giường · 1 phòng tắm · Wifi · Bếp · Chỗ đậu xe miễn phí",
            stars: "4.74 (27)",
            price: "$14",
            total: "Tổng $117",
        },
        {
            id: 2,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU",
            location: "Phòng riêng tại Quận 2",
            title: "CCC",
            description: "2 khách · 2 giường · 1 phòng tắm · Wifi · Bếp · Chỗ đậu xe miễn phí",
            stars: "4.74 (27)",
            price: "$90",
            total: "Tổng $200",
        },
        {
            id: 3,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU",
            location: "Phòng riêng tại Quận 1",
            title: "AAA",
            description: "2 khách · 1 giường · 1 phòng tắm · Wifi · Bếp · Chỗ đậu xe miễn phí",
            stars: "4.74 (27)",
            price: "$148",
            total: "Tổng $200",
        },
        {
            id: 4,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU",
            location: "Phòng riêng tại Quận 9",
            title: "BBB",
            description: "2 khách · 1 giường · 1 phòng tắm · Wifi · Bếp · Chỗ đậu xe miễn phí",
            stars: "4.74 (27)",
            price: "$12",
            total: "Tổng $200",
        },
    ])


    return (
        <div className="searchPage">
            {/* <Header /> */}
            <div className="searchPage_info">
                {/* <p>Hơn 300 chỗ ở</p> */}
                <h1>{"Khách sạn tại " + capitalize(place)}</h1>
                <h2>Bộ lọc:</h2>

                <div className="bookingBody_component_edit_typeRoom active">
                    <p>· Giá:</p>
                            
                    <form>
                        <label class="bookingBody_component_edit_room_type">
                            <input 
                                type="radio" 
                                id="decrease" 
                                name="price" 
                                value="decrease"
                            />
                            <span class="check_mark_typeRoom"></span>
                            Giảm dần
                        </label>
                                
                        <label class="bookingBody_component_edit_room_type">
                            <input 
                                type="radio" 
                                id="increase" 
                                name="price" 
                                value="increase"
                            />
                            <span class="check_mark_typeRoom"></span>
                            Tăng dần
                        </label>

                        <button className="booking_btn_confirm_edit" type="submit">
                            Lọc
                        </button>
                    </form>
                </div> 





                {/* <button className="searchPage_filter_hotel">
                    Giá
                </button> */}
                {/* <Button variant="outlined">
                    Cancellation Flexibility
                </Button>
                <Button variant="outlined">
                    Type of place
                </Button>
                <Button variant="outlined">
                    Price
                </Button>
                <Button variant="outlined">
                    Rooms and beds
                </Button>
                <Button variant="outlined">
                    More filters
                </Button> */}
            </div>

            {data.map(d => {
                return  <SearchCard 
                            id={d.id}
                            img={d.img}
                            location={d.location}
                            title={d.title}
                            description={d.description}
                            star={d.stars}
                            price={d.price}
                            total={d.total}
                        />
            })}
        </div>
    )
}

export default SearchPage
