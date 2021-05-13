import React, {useState, useEffect, useCallback} from 'react'
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios'
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"
import useToken from '../../hooks/useToken'
import {calDate} from "../../helpers/calDate"
import BoxComment from "../../components/Room/BoxComment"
import history from "../../history"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { Confirm } from 'react-st-modal'
import { CustomDialog } from 'react-st-modal'
import AddCommentModal from '../../components/MenuAccount/AddCommentModal'

function HotelInvoiceDetail() {
    const { language, setLanguage } = useLanguage();
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const { token, setToken } = useToken();
    // const searchParams = new URLSearchParams(window.location.search);
    // const bookingId = searchParams.get('id');
    let location11 = useLocation();
    const bookingId = location11.pathname.split("/").pop();
    // console.log(bookingId)

    const [dataBookingHotelOfCustomer, setDataBookingHotelOfCustomer] = useState([]);
    const [dataReview, setDataReview] = useState([]);
    const [dataHotel, setDataHotel] = useState(null);
    let history1 = useHistory();

    const loadDetailHotelFromServer = useCallback(async () =>{
        const options = {
            method: "POST",
            data: {
                "hotelId": dataBookingHotelOfCustomer.hotelId
            },
            url: "http://localhost:5000/hotel/"
        }
        axios(options)
            .then(response => {
                setDataHotel(response.data);
            })
    },[dataBookingHotelOfCustomer.hotelId]); // every time id changed, new data will be loaded

    useEffect(() => {
        const getDataBookingHotelOfCustomer = async () => {
            const options = {
                method: "POST",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {
                    "customerId": token.customerId,
                    "bookingId": bookingId
                },
                url: "http://localhost:5000/customer/booking/view_one"
            }
            axios(options)
            .then(response => {
                // console.log("BOOKING ID:", response.data)
                setDataBookingHotelOfCustomer(response.data)
            })
            .catch(error => {
                console.log("Error: ", error);
                // history.push("/404");
            })
        }

        if(token){
            getDataBookingHotelOfCustomer();
        }
        loadDetailHotelFromServer();
    },[loadDetailHotelFromServer])

    useEffect(() => {
        const loadReviewHotelFromServer = async () => {
            if(typeof dataBookingHotelOfCustomer.hotelId !== "undefined"){
                const options = {
                    method: "POST",
                    headers: {
                        "auth-token": token.authToken,
                    },
                    data: {
                        "hotelId": dataBookingHotelOfCustomer.hotelId,
                        "customerId": token.customerId,
                    },
                    url: "http://localhost:5000/hotel/review/getByCustomer"
                }  
                axios(options)
                    .then(response => {
                        // console.log("Review: ", response.data);
                        setDataReview(response.data);
                    })
                    .catch(error => console.log("Error: ", error))
                }
            }
        loadReviewHotelFromServer();
    },[dataBookingHotelOfCustomer.hotelId])
    
    if(!dataHotel) return null

    let type = content.smallRoom;
    const priceSmallRoom = dataHotel.room.price;
    const priceMediumRoom = dataHotel.room.price + 50;
    const priceLargeRoom = dataHotel.room.price + 100;

    let pricePerNight = 0;
    if(dataBookingHotelOfCustomer.roomType == "small"){
        type = content.smallRoom;
        pricePerNight = priceSmallRoom;
    }
    else if(dataBookingHotelOfCustomer.roomType == "medium"){
        type = content.mediumRoom;
        pricePerNight = priceMediumRoom;
    }
    else if(dataBookingHotelOfCustomer.roomType == "large"){
        type = content.largeRoom;
        pricePerNight = priceLargeRoom;
    }

    let checkIn = new Date(dataBookingHotelOfCustomer.checkIn)
    let checkOut = new Date(dataBookingHotelOfCustomer.checkOut)
    const calNight = calDate(checkIn, checkOut);

    document.title = content.detailInvoice + " | RoyalStay"

    const handleDeleteOrderHotel = () =>{
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "customerId": token.customerId,
                "bookingId": bookingId
            },
            url: "http://localhost:5000/customer/booking/cancel"
        }
        axios(options)
        .then(response => {
            // console.log("DELETE ORDER HOTEL: ", response.data)
            window.location = "/account/history-booking"
        })
        .catch(error => console.log(error))
    }
    return (
        <div className="hotelInvoiceDetail">
            <div className="booking_container">
                <div className="bookingHeader">
                    <div className="bookingHeader_container">
                        <div className="bookingHeader_block">
                            <div className="bookingHeader_back">
                                <button className="bookingHeader_icon" onClick={history1.goBack}>
                                <i className="fas fa-chevron-left"></i>
                                </button>
                            </div>

                            <div className="bookingHeader_text">
                                {content.detailInvoice}
                            </div>
                            <a 
                                className="menuBookingCard_btn_hotel1" 
                                href={"/room-detail/" + dataBookingHotelOfCustomer.hotelId} 
                                title={content.detailRoom}
                            >
                                <i className="fas fa-hotel" style={{fontSize: "20px"}}/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bookingBody">
                    <div className="bookingBody_container">

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <h4 style={{marginBottom: "20px", color: "gray"}}><i className="fas fa-receipt"/> {content.idInvoice}: <i>{bookingId}</i></h4>

                                <div className="bookingBody_hotel_name">
                                        <h2>{dataHotel.name}</h2>
                                </div>

                                <div className="bookingBody_hotel">
                                    <div className="bookingBody_hotel_img">
                                        <div className="bookingBody_img">
                                            <Carousel 
                                                showThumbs={false}
                                                autoPlay={false}
                                                showStatus={false}
                                                showIndicators={false}
                                            >
                                                <div>
                                                    <img src={dataHotel.imageLink[0]}/>
                                                </div>
                                                <div>
                                                    <img src={dataHotel.imageLink[1]}/>
                                                </div>
                                                <div>
                                                    <img src={dataHotel.imageLink[2]}/>
                                                </div>
                                                <div>
                                                    <img src={dataHotel.imageLink[3]}/>
                                                </div>
                                                <div>
                                                    <img src={dataHotel.imageLink[4]}/>
                                                </div>
                                            </Carousel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <h2>{content.yourTrip}</h2>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.dates}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        {dataBookingHotelOfCustomer.checkIn} - {dataBookingHotelOfCustomer.checkOut}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.typeRoom}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        {type}
                                    </div>
                                </div>    
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.price}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        ${pricePerNight}/{content.night}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.numberOfDaysToStay}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        {calNight} {content.night}
                                    </div>
                                </div>
                            </div>
                        </div>     

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3><u>{content.total}</u></h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        ${pricePerNight * calNight}
                                    </div>
                                </div>
                            </div>
                        </div>        

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.payments}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                    {content.atTheHotel}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bookingBody_components">
                            <div className="bookingBody_component">
                                <div className="bookingBody_component_block">
                                    <h3>{content.status}</h3>
                                    <div className="bookingBody_component_day_block_subText">
                                        <p className={"hotel_booking_status " + dataBookingHotelOfCustomer.status}>{dataBookingHotelOfCustomer.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        {dataBookingHotelOfCustomer.status == "Stayed" ? 
                            <div className="bookingBody_components">
                                <div className="bookingBody_component">
                                    <div className="bookingBody_component_block">
                                        <h3 style={{margin: "auto 0px"}}>{content.review}</h3>
                                        <div className="bookingBody_component_day_block_subText">
                                            {
                                            <div style={{width: "100%"}}>
                                                {dataReview == "Bạn chưa đánh giá khách sạn này. Hãy đánh giá!" ? 
                                                    <p>{content.txtNoReview}
                                                        <button 
                                                            style={{backgroundColor: "transparent", border: "none", fontSize: "16px", color: "#717171", fontWeight: "700", textDecoration: "underline", cursor: "pointer", marginLeft: "5px"}}
                                                            onClick={async () => {
                                                                const result = await CustomDialog(<AddCommentModal
                                                                    token={token}
                                                                    language={language}
                                                                    idHotel={dataBookingHotelOfCustomer.hotelId}
                                                                />, {
                                                                    title: content.addCmt,
                                                                    showCloseIcon: true,
                                                                })
                                                            }}
                                                            > 
                                                        {content.txtNoReview1}
                                                        </button>
                                                    </p>
                                                :
                                                    <BoxComment
                                                        hotelInvoiceDetail={"HotelInvoiceDetail"}
                                                        customerName={dataReview.customerName}
                                                        customerID={dataReview.customerID}
                                                        score={dataReview.score}
                                                        content={dataReview.content}
                                                        idHotel={dataBookingHotelOfCustomer.hotelId}
                                                        reviewId={dataReview._id}
                                                        language={language}
                                                        token={token}
                                                    />
                                                }
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        : 
                            ""
                        }
                        

                        <div className="bookingBody_components_line"></div>

                        <div className="bookingBody_components">
                            <button 
                                className={"booking_btn_confirm " + dataBookingHotelOfCustomer.status} style={{marginRight: "20px"}} 
                                onClick={async () => {
                                    const result = await Confirm(content.txtRemoveOrderHotel + dataHotel.name + content.txtRemoveOrderHotel1, content.confirmRemove)
                                    if(result){
                                        handleDeleteOrderHotel();
                                    }
                                    else{
                                        
                                    }
                                }}
                            >
                                {content.cancelOrderRoom}
                            </button>

                            <button className="booking_btn_confirm invoiceOk" onClick={history.goBack}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default HotelInvoiceDetail
