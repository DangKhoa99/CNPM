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
                    img1="https://a0.muscache.com/im/pictures/57df2556-0385-408e-968c-80cc744a96b1.jpg?im_w=720"
                    img2="https://a0.muscache.com/im/pictures/0c30fe8e-c29b-4f73-a53e-5421f1b68e9e.jpg?im_w=720"
                    img3="https://a0.muscache.com/im/pictures/bda44d94-fe2f-47ad-abf5-14df4ce4e255.jpg?im_w=720"
                    img4="https://a0.muscache.com/im/pictures/b3b360fa-2556-4c2c-83f9-8c7337b24f1a.jpg?im_w=720"
                    img5="https://a0.muscache.com/im/pictures/5894f335-dbe8-4f2e-8841-b415d8eb1990.jpg?im_w=720"
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
