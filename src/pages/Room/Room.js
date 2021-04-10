import React, {useState, useEffect, useRef} from 'react'
import "../../style/Room.css"
import Header from "../../components/Header"
import RoomHeader from "../../components/Room/RoomHeader"
import RoomBody from "../../components/Room/RoomBody"
import RoomReview from "../../components/Room/RoomReview"
import LoadingScreen from "../../components/LoadingScreen"

import axios from 'axios'

function Room() {
    document.title = "Chi tiết phòng";

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

    useEffect(() => {
        const fetchData = async () =>{
            setIsLoading(true);
            await axios.post("http://localhost:5000/hotel/", _id)
                .then(response => {
                    setData(response.data);
                    setIsLoading(false);
                })
        };
        fetchData();
        // console.log("data in use", data);
    },[])

    if(!data) return null


    const arrImage=[]

    for (var key in data.imageLink) {
        var obj = data.imageLink[key];
        arrImage.push(obj);
        // console.log("obj : ", typeof(obj));
    }

    // console.log("arrImage", arrImage[0]);
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
  
                <RoomBody 
                    description={data.bio}
                    roomType={data.room.roomType}
                />
            
            

                <RoomReview reference={roomReview}/>

            
            
            </div>
            
        </div>
    )
}

export default Room
