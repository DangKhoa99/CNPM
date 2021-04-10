import React, {useState, useRef} from 'react'
import "../../style/RoomBody.css"
import StarIcon from "@material-ui/icons/Star"
import {ReactComponent as Wifi} from "../../icons/iconWifi.svg"
import {ReactComponent as Parking} from "../../icons/iconParking.svg"
import {ReactComponent as Pool} from "../../icons/iconPool.svg"
import {ReactComponent as AirConditioner} from "../../icons/iconAirConditioner.svg"
import {ReactComponent as Essentials} from "../../icons/iconEssentials.svg"
import {ReactComponent as Hangers} from "../../icons/iconHangers.svg"
import {ReactComponent as HairDryer} from "../../icons/iconHairDryer.svg"
import {ReactComponent as Kitchen} from "../../icons/iconKitchen.svg"
import {ReactComponent as SecurityCamera} from "../../icons/iconSecurityCamera.svg"
import {ReactComponent as Elevator} from "../../icons/iconElevator.svg"
import {ReactComponent as TV} from "../../icons/iconTV.svg"
import {ReactComponent as More} from "../../icons/iconMore.svg"
import {ReactComponent as SingleBed} from "../../icons/iconSingleBed.svg"
import {ReactComponent as TwinBeds} from "../../icons/iconTwinBeds.svg"
import {ReactComponent as Aerosol} from "../../icons/iconAerosol.svg"
import {ReactComponent as CO} from "../../icons/iconCO.svg"
import {ReactComponent as IncreaseHygiene} from "../../icons/iconIncreaseHygiene.svg"
import {ReactComponent as Clock} from "../../icons/iconClock.svg"
import {ReactComponent as NoSmoking} from "../../icons/iconNoSmoking.svg"
import {ReactComponent as NoPets} from "../../icons/iconNoPets.svg"

import RoomBooking from "./RoomBooking"

function RoomBody({
    description,
    roomType,
}) {
    const myRef = useRef(null);

    const [small, setSmall] = useState(false);
    const [medium, setMedium] = useState(false);
    const [large, setLarge] = useState(false);

    // for (var i in roomType) {
    //     if(roomType[i] == "Small")
    //         setSmall(true);
    //     else if(roomType[i] == "Medium")
    //         setMedium(true);
    //     else if(roomType[i] == "Large")
    //         setLarge(true);
    // }


    console.log("roomType", roomType[0]);

    const scrollToElement = () =>{
        if(!isReadMore){
                window.scrollTo({
                behavior: "smooth",
                top: 0
            });
        }
      }

    const [amenities, setAmenities] = useState([
        {
          symbol: <Wifi />,
          txt: "Wifi"
        },
        {
          symbol: <Parking />,
          txt: "Bãi đậu xe miễn phí"
        },
        {
          symbol: <Pool />,
          txt: "Bể bơi"
        },
        {
          symbol: <AirConditioner />,
          txt: "Máy điều hòa"
        },
        {
          symbol: <Essentials />,
          txt: "Tiện nghi thiết yếu"
        },
        {
          symbol: <Hangers />,
          txt: "Mắc áo"
        },
        {
          symbol: <HairDryer />,
          txt: "Máy sấy tóc"
        },
        {
          symbol: <Kitchen />,
          txt: "Bếp"
        },
        {
          symbol: <SecurityCamera />,
          txt: "Camera an ninh trong nhà"
        },
        {
          symbol: <Elevator />,
          txt: "Thang máy"
        },
        {
          symbol: <TV />,
          txt: "Tivi"
        },
        {
          symbol: <More />,
          txt: "Và nhiều tiện nghi khác"
        },
    ]);

    // Show more
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };



    return (
        <div className="roomBody">
            <div className="roomBody_container_left">
                <div className="roomBody_description"  ref={myRef}>
                    <h2>Mô tả</h2>
                    <div className="roomBody_description_paragraph">
                        <span >{isReadMore ? description.slice(0, 150) + "..." : description}</span>
                        
                    </div>
                    <button onClick={() => {toggleReadMore(); scrollToElement();}} className="readMore">
                            {isReadMore ? "Xem thêm" : " Ẩn bớt"}
                    </button> 

                </div>

                <div className="roomBody_line"></div>

                <div className="roomBody_rooms">
                    <h2>Loại phòng</h2>
                    <div className="roomBody_rooms_options">
                        <div className="roomBody_rooms_roomTypes">
                            <div className="roomBody_rooms_roomType">
                                <div className="roomBody_rooms_roomType_space">
                                    <div className="roomBody_rooms_roomType_frame">
                                        <div className="roomBody_rooms_roomType_frame_icons">
                                            <span className="roomBody_rooms_roomType_frame_icon">
                                                <TwinBeds />
                                            </span>
                                        </div>
                                        <div className="roomBody_rooms_roomType_frame_title">Phòng nhỏ</div>
                                        <div className="roomBody_rooms_roomType_frame_subTitle">1 giường đôi</div>
                                        <div className="roomBody_rooms_roomType_frame_price">Giá tiền: 10$ /đêm</div>
                                    </div>
                                </div>
                            </div>

                            <div className="roomBody_rooms_roomType">
                                <div className="roomBody_rooms_roomType_space">
                                    <div className="roomBody_rooms_roomType_frame">
                                        <div className="roomBody_rooms_roomType_frame_icons">
                                            <span className="roomBody_rooms_roomType_frame_icon">
                                                <SingleBed />
                                            </span>

                                            <span className="roomBody_rooms_roomType_frame_icon">
                                                <TwinBeds />
                                            </span>
                                        </div>
                                        <div className="roomBody_rooms_roomType_frame_title">Phòng vừa</div>
                                        <div className="roomBody_rooms_roomType_frame_subTitle">1 giường đơn + 1 giường đôi</div>
                                        <div className="roomBody_rooms_roomType_frame_price">Giá tiền: 30$ /đêm</div>
                                    </div>
                                </div>
                            </div>

                            <div className="roomBody_rooms_roomType">
                                <div className="roomBody_rooms_roomType_space">
                                    <div className="roomBody_rooms_roomType_frame">
                                        <div className="roomBody_rooms_roomType_frame_icons">
                                            <span className="roomBody_rooms_roomType_frame_icon">
                                                <TwinBeds />
                                            </span>

                                            <span className="roomBody_rooms_roomType_frame_icon">
                                                <TwinBeds />
                                            </span>
                                        </div>
                                        <div className="roomBody_rooms_roomType_frame_title">Phòng lớn</div>
                                        <div className="roomBody_rooms_roomType_frame_subTitle">2 giường đôi</div>
                                        <div className="roomBody_rooms_roomType_frame_price">Giá tiền: 50$ /đêm</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="roomBody_line"></div>

                <div className="roomBody_amenities">
                    <h2>Tiện nghi</h2>
                    <div className="roomBody_amenities_cells">
                        {amenities.map(a => {
                            return  <div className="roomBody_amenities_cell">
                                        <div className="roomBody_amenities_cell_detail">
                                            <div className="roomBody_amenities_cell_detail_title">{a.txt}</div>
                                            <div className="roomBody_amenities_cell_detail_icon">{a.symbol}</div>
                                        </div>
                                    </div>
                        })}
                    </div>
                </div>

                <div className="roomBody_line"></div>

                <div className="roomBody_thingsToKnow">
                    <h2>Những điều cần biết</h2>
                    <div className="roomBody_thingsToKnow_cells">
                        <div className="roomBody_thingsToKnow_cell">
                            <h3>Nội quy khách sạn</h3>
                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">Nhận phòng: Sau 14:00</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><Clock/></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">Trả phòng: 12:00</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><Clock/></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">Không hút thuốc</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><NoSmoking /></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">Không thú cưng</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><NoPets/></div>
                            </div>
                        </div>

                        <div className="roomBody_thingsToKnow_cell">
                            <h3>Y tế và an toàn</h3>
                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">Đã cam kết thực hiện quy trình vệ sinh tăng cường của Airbnb.</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><IncreaseHygiene/></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">Áp dụng hướng dẫn về giãn cách xã hội và các hướng dẫn khác liên quan đến COVID-19 của Airbnb</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><Aerosol/></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">Máy phát hiện khí CO</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><CO/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="roomBody_container_right">
                <RoomBooking />
            </div>
        </div>
    )
}

export default RoomBody
