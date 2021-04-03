import React, {useRef} from 'react'
import "../../style/Room.css"
import Header from "../../components/Header"
import RoomHeader from "../../components/Room/RoomHeader"
import RoomBody from "../../components/Room/RoomBody"
import RoomReview from "../../components/Room/RoomReview"

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

    return (
        <div className="room">
            {/* <Header /> */}

            <div className="room__container">
                <RoomHeader
                    name="King Fisher"
                    img1="https://a0.muscache.com/im/pictures/9ec7ff59-0dcc-4134-a6bd-ec75e4cf38d4.jpg?im_w=720"
                    img2="https://a0.muscache.com/im/pictures/ff691b32-6b29-43c7-abb3-380b1d8ce327.jpg?im_w=720"
                    img3="https://a0.muscache.com/im/pictures/50883bf5-c0db-444c-8c83-b87a1c284ad1.jpg?im_w=720"
                    img4="https://a0.muscache.com/im/pictures/a2272bf2-3e06-49cc-83f8-8678371af5e2.jpg?im_w=720"
                    img5="https://a0.muscache.com/im/pictures/d08e5af4-7665-46f7-9258-75c934897ba4.jpg?im_w=720"
                    reference={roomHeader}
                    click={() => scrollToElement(roomReview)}
                />

                <RoomBody />

                <RoomReview reference={roomReview}/>

            </div>
            
        </div>
    )
}

export default Room
