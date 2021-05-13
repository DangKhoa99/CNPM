import React, {useState, useEffect, useCallback} from 'react'
import "../../style/RoomSuggestionHotel.css"
import axios from 'axios'
import * as myConstClass from "../../constants/constantsLanguage"
import RoomSuggestionCard from "./RoomSuggestionCard"
import LoadingScreen from "../LoadingScreen"
import useToken from '../../hooks/useToken'
import Carousel1 from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function RoomSuggestionHotel({
    location,
    idHotel,
    language
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getDataHotelByLocation = useCallback(async () => {
        setIsLoading(true);
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
    },[location]);

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
        getDataHotelByLocation(); 
        if(token){
            getDataFavoriteHotelOfCustomer();
        }
    },[getDataHotelByLocation])

    let savedHotelId = [];
    for(let key in dataFavoriteHotelOfCustomer){
        // console.log("key", dataFavoriteHotelOfCustomer[key]._id)
        data.map((item)=>{
            return (dataFavoriteHotelOfCustomer[key]._id == item._id) ? savedHotelId.push(item._id) : ""
        })
    }

    let place = location;
    if(place == "TPHCM"){
        place = "Hồ Chí Minh"
    }
    else if(place == "HN"){
        place = "Hà Nội"
    }
    else if(place == "ĐN"){
        place = "Đà Nẵng"
    }
    else if(place == "PT"){
        place = "Phan Thiết"
    }
    else if(place == "VT"){
        place = "Vũng Tàu"
    }
    else if(place == "ĐL"){
        place = "Đà Lạt"
    }
    else if(place == "PQ"){
        place = "Phú Quốc"
    }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2.6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1.5
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <div className="roomSuggestionHotel">
            <div className="roomBody_line"></div>
            <div className="roomSuggestionHotel_container">
                <h1 style={{marginBottom: "20px"}}>{content.aroundArea} {place}</h1>
                <div className="scrollMenu">
                    <Carousel1 responsive={responsive}>
                    {isLoading ? <div style={{marginLeft: "550px", marginTop: "-150px"}}><LoadingScreen /></div>
                        :
                        data.sort((a, b) => (a.room.price - b.room.price)).map((item, index) => {
                            // return  idHotel != item._id ?
                            return      <RoomSuggestionCard 
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
                                    // : <div style={{display: "none"}}></div>
                        })}
                    </Carousel1>
                </div>
            </div>
        </div>
    )
}

export default RoomSuggestionHotel
