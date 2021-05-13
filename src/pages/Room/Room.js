import React, {useState, useEffect, useRef,  useCallback} from 'react'
import "../../style/Room.css"
import RoomHeader from "../../components/Room/RoomHeader"
import RoomBody from "../../components/Room/RoomBody"
import RoomReview from "../../components/Room/RoomReview"
import RoomSuggestionHotel from "../../components/Room/RoomSuggestionHotel"
import LoadingScreen from "../../components/LoadingScreen"
import axios from 'axios'
import useToken from '../../hooks/useToken'
import useLanguage from '../../hooks/useLanguage'
import { useLocation } from 'react-router-dom'
import history from "../../history"

function Room() {
    const { language, setLanguage } = useLanguage();

    const scrollToElement = (ref) => {
        window.scrollTo({
            behavior: "smooth",
            top: ref.current.offsetTop - 48
        });
    };

    const roomHeader = useRef();
    const roomReview = useRef();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const searchParams = new URLSearchParams(window.location.search);
    // const getID = searchParams.get('id');
    let location11 = useLocation();
    const getID = location11.pathname.split("/").pop();
    // console.log(getID)


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

    const loadDetailHotelFromServer = useCallback(async () =>{
        setIsLoading(true);
        const options = {
            method: "POST",
            data: {
                "hotelId": getID
            },
            url: "http://localhost:5000/hotel/"
            }
            axios(options)
            .then(response => {
                // console.log("ROOM: ", response.data)
                setData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Error: ", error);
                history.push("/404");
            })
    },[getID]); // every time id changed, new data will be loaded

    useEffect(() => {
        loadDetailHotelFromServer();
        if(token){
            getDataFavoriteHotelOfCustomer();
        }   
    },[loadDetailHotelFromServer])// useEffect will run once and when id changes

    //first render, when useEffect did't triggered yet we will return null
    if(!data){
        return null
    } 

    const arrImage = []
    for (var key in data.imageLink) {
        var obj = data.imageLink[key];
        arrImage.push(obj);
    }

    document.title = data.name + " | RoyalStay";

    let savedHotel = "false";
    for(let key in dataFavoriteHotelOfCustomer){
        // console.log("key", dataFavoriteHotelOfCustomer[key]._id)
        if(dataFavoriteHotelOfCustomer[key]._id == getID){
            // console.log("true");
            savedHotel = "true";
        }
    }

    return (
        <div className="room">
            <div className="room__container">
                {isLoading ? <LoadingScreen/>
                :
                <RoomHeader
                    idHotel={getID}
                    name={data.name}
                    img={arrImage}
                    address={data.address}
                    review={data.review}
                    reference={roomHeader}
                    click={() => scrollToElement(roomReview)}
                    savedHotel={savedHotel}
                    language={language}
                    price={data.room.price}
                    description={data.bio}
                    roomType={data.room.roomType}
                    quantity={data.room.quantity}
                    tien_ich={data.tien_ich
                        .map(function(ttt, index) {
                            return (index ? ' · ' : '') + ttt
                    })}
                />
                }
                {isLoading ? <LoadingScreen/>
                :
                <RoomBody 
                    idHotel={getID}
                    description={data.bio}
                    roomType={data.room.roomType}
                    quantity={data.room.quantity}
                    price={data.room.price}
                    language={language}
                />
                }
            
                <RoomReview 
                    reference={roomReview}
                    idHotel={getID}
                    language={language}
                />

                <RoomSuggestionHotel
                    location={data.address.split(" ").pop()}
                    idHotel={getID}
                    language={language}
                />  
            </div>      
        </div>
    )
}

export default Room
