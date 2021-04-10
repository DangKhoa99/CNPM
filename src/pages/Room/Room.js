import React, {useState, useEffect, useRef,  useCallback} from 'react'
import "../../style/Room.css"
import Header from "../../components/Header"
import RoomHeader from "../../components/Room/RoomHeader"
import RoomBody from "../../components/Room/RoomBody"
import RoomReview from "../../components/Room/RoomReview"
import LoadingScreen from "../../components/LoadingScreen"

import axios from 'axios'

function Room() {
    document.title = "Chi tiết phòng | RoyalStay";

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

    const getID = window.location.href.split("=").pop();
    const _id = {"hotelId": getID};

    const loadDetailRoomFromServer = useCallback(async () =>{
        setIsLoading(true);
        const result = await axios.post("http://localhost:5000/hotel/", _id)
        // await axios.post("http://localhost:5000/hotel/", _id)
        //     .then(response => {
        //         setData(response.data);
        //         setIsLoading(false);
        //     })
        setData(result.data);
        setIsLoading(false);
    },[getID]); // every time id changed, new data will be loaded

    useEffect(() => {
        loadDetailRoomFromServer()
    },[loadDetailRoomFromServer])// useEffect will run once and when id changes

    if(!data) return null //first render, when useEffect did't triggered yet we will return null

    const arrImage=[]
    for (var key in data.imageLink) {
        var obj = data.imageLink[key];
        arrImage.push(obj);
    }

    return (
        <div className="room">
            <div className="room__container">
                {isLoading ? <LoadingScreen/>
                :
                <RoomHeader
                    name={data.name}
                    img={arrImage}
                    address={data.address}
                    reference={roomHeader}
                    click={() => scrollToElement(roomReview)}
                />
                }
                {isLoading ? <LoadingScreen/>
                :
                <RoomBody 
                    description={data.bio}
                    roomType={data.room.roomType}
                    quantity={data.room.quantity}
                />
                }
            

                <RoomReview reference={roomReview}/>

            
            
            </div>
            
        </div>
    )
}

export default Room
