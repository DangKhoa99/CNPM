import React, {useState, useRef, useEffect} from 'react'
import "../../style/RoomBody.css"
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
import * as myConstClass from "../../constants/constantsLanguage"

function RoomBody({
    idHotel,
    description,
    roomType,
    quantity,
    price,
    language
}) {
    let content = myConstClass.LANGUAGE;

    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const myRef = useRef(null);

    const [small, setSmall] = useState(false);
    const [medium, setMedium] = useState(false);
    const [large, setLarge] = useState(false);
    
    const priceSmallRoom = price;
    const priceMediumRoom = price + 50;
    const priceLargeRoom = price + 100;

    useEffect(() => {
        for (var i in roomType) {
            if(roomType[i] == "Small"){
                setSmall(true);
            }
            else if(roomType[i] == "Medium"){
                setMedium(true);
            }
            else if(roomType[i] == "Large"){
                setLarge(true);
            }
        }
    },[roomType])
    // console.log("roomType", roomType[0]);

    const scrollToElement = () =>{
        if(!isReadMore){
                window.scrollTo({
                behavior: "smooth",
                top: myRef.current.offsetHeight + 460
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
          txt: content.freeParking
        },
        {
          symbol: <Pool />,
          txt: content.pool
        },
        {
          symbol: <AirConditioner />,
          txt: content.airConditioner
        },
        {
          symbol: <Essentials />,
          txt: content.essentials
        },
        {
          symbol: <Hangers />,
          txt: content.hangers
        },
        {
          symbol: <HairDryer />,
          txt: content.hairDryer
        },
        {
          symbol: <Kitchen />,
          txt: content.kitchen
        },
        {
          symbol: <SecurityCamera />,
          txt: content.securityCamera
        },
        {
          symbol: <Elevator />,
          txt: content.elevator
        },
        {
          symbol: <TV />,
          txt: content.TV
        },
        {
          symbol: <More />,
          txt: content.otherAmenities
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
                <div className="roomBody_description">
                    <h2 ref={myRef}>{content.description}</h2>
                    <div className="roomBody_description_paragraph">
                        <span >{isReadMore ? description.slice(0, 150) + "..." : description}</span>
                        
                    </div>
                    <button onClick={() => {toggleReadMore(); scrollToElement();}} className="readMore">
                            {isReadMore ? content.readMore : content.hidden}
                    </button> 

                </div>

                <div className="roomBody_line"></div>

                <div className="roomBody_rooms">
                    <h2>{content.typeRoom}</h2>
                    <div className="roomBody_rooms_options">
                        <div className="roomBody_rooms_roomTypes">

                            <div className={small ? "roomBody_rooms_roomType" : "roomBody_rooms_roomType disable"}>
                                <div className="roomBody_rooms_roomType_space">
                                    <div className="roomBody_rooms_roomType_frame">
                                        <div className="roomBody_rooms_roomType_frame_icons">
                                            <span className="roomBody_rooms_roomType_frame_icon">
                                                <TwinBeds />
                                            </span>
                                        </div>
                                        <div className="roomBody_rooms_roomType_frame_title">{content.smallRoom}</div>
                                        <div className="roomBody_rooms_roomType_frame_subTitle">{content.doubleBed}</div>
                                        <div className="roomBody_rooms_roomType_frame_price">{content.price}: {priceSmallRoom}$ /{content.night}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={medium ? "roomBody_rooms_roomType" : "roomBody_rooms_roomType disable"}>
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
                                        <div className="roomBody_rooms_roomType_frame_title">{content.mediumRoom}</div>
                                        <div className="roomBody_rooms_roomType_frame_subTitle">{content.mixBed}</div>
                                        <div className="roomBody_rooms_roomType_frame_price">{content.price}: {priceMediumRoom}$ /{content.night}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={large ? "roomBody_rooms_roomType" : "roomBody_rooms_roomType disable"}>
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
                                        <div className="roomBody_rooms_roomType_frame_title">{content.largeRoom}</div>
                                        <div className="roomBody_rooms_roomType_frame_subTitle">{content.doubleBeds}</div>
                                        <div className="roomBody_rooms_roomType_frame_price">{content.price}: {priceLargeRoom}$ /{content.night}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="roomBody_line"></div>

                <div className="roomBody_amenities">
                    <h2>{content.amenities}</h2>
                    <div className="roomBody_amenities_cells">
                        {amenities.map((a, index) => {
                            return  <div key={index + a} className="roomBody_amenities_cell">
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
                    <h2>{content.thingsToKnow}</h2>
                    <div className="roomBody_thingsToKnow_cells">
                        <div className="roomBody_thingsToKnow_cell">
                            <h3>{content.hotelRules}</h3>
                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">{content.hoursCheckIn}</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><Clock/></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">{content.hoursCheckOut}</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><Clock/></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">{content.noSmoking}</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><NoSmoking /></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">{content.noPets}</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><NoPets/></div>
                            </div>
                        </div>

                        <div className="roomBody_thingsToKnow_cell">
                            <h3>{content.healthSafety}</h3>
                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">{content.commitCleaning}</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><IncreaseHygiene/></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">{content.applicationCOVID19}</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><Aerosol/></div>
                            </div>

                            <div className="roomBody_thingsToKnow_cell_detail">
                                <div className="roomBody_thingsToKnow_cell_detail_title">{content.COdetector}</div>
                                <div className="roomBody_thingsToKnow_cell_detail_icon"><CO/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="roomBody_container_right">
                <RoomBooking
                    priceSmallRoom={priceSmallRoom}
                    priceMediumRoom={priceMediumRoom}
                    priceLargeRoom={priceLargeRoom}
                    roomType={roomType}
                    quantity={quantity}
                    price={price}
                    idHotel={idHotel}
                    language={language}
                />
            </div>
        </div>
    )
}

export default RoomBody
