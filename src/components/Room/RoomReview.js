import React, {useState, useEffect, useCallback} from 'react'
import "../../style/RoomReview.css"
import StarIcon from "@material-ui/icons/Star"
import {Avatar} from "@material-ui/core"
import StarRatings from "react-star-ratings"
import axios from 'axios'
import { store } from 'react-notifications-component'
import useGetDataCustomer from '../../hooks/useDataCustomer'
import NoItem from "../NoItem"
import useToken from '../../hooks/useToken'
import * as myConstClass from "../../constants/constantsLanguage"
import { calAvgReview } from "../../helpers/calAvgReview"
import BoxComment from "./BoxComment"

function RoomReview({
    reference,
    idHotel,
    language,
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const { token, setToken } = useToken();
    const {dataCustomer, isLoading} = useGetDataCustomer();
    const [dataReview, setDataReview] = useState([]);
    const [rating, setRating] = useState(0);

    const _id = {"hotelId": idHotel};

    const loadReviewHotelFromServer = useCallback(async () => {
        await axios.post("http://localhost:5000/hotel/review", _id)
            .then(response => {
                // console.log("Review: ", response.data);
                setDataReview(response.data);
            })
            .catch(error => console.log("Error: ", error))
    },[idHotel]);

    useEffect(() => {
        loadReviewHotelFromServer();
    },[loadReviewHotelFromServer])

    let avgReview = calAvgReview(dataReview);

    function changeRating(newRating){
        setRating(newRating);
    }

    function textStar(rating){
        if(rating == 0){
            return content.review + "...";
        }
        else if(rating == 1){
            return content.extremelyDislike;
        }
        else if(rating == 2){
            return content.dislike;
        }
        else if(rating == 3){
            return content.allright;
        }
        else if(rating == 4){
            return content.prefer;
        }
        else if(rating == 5){
            return content.likeSoMuch;
        }
    }

    const [commentTxt, setCommentTxt] = useState("");

    const handleChangeCommentTxt = (e) => {
        let value = e.target.value;
        setCommentTxt(value);
    }

    const removeReviewInput = () => {
        // e.preventDefault();
        setRating(0);
        setCommentTxt("");
    }

    // Chưa sử dụng khách sạn bao giờ
    const notification_notYetUsed = {
        title: ' RoyalStay - ' + content.notification,
        message: content.useServiceOfHotel,
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    // Chưa đánh giá sao cho khách sạn
    const notification_notStar = {
        title: ' RoyalStay - ' + content.notification,
        message: "Vui lòng đánh giá ⭐ và viết nhận xét cho khách sạn",
        type: 'warning',
        container: 'bottom-left',
        dismiss: {
            duration: 2000
        }
    };

    const submitComment = (e) => {
        e.preventDefault();
        if(rating == 0 || commentTxt == ""){
            store.addNotification(notification_notStar);
        }
        else{
            const options = {
                method: "POST",
                headers: {
                    "auth-token": token.authToken,
                },
                data: {
                    "customerId": token.customerId,
                    "hotelId": idHotel,
                    "score": rating,
                    "content": commentTxt,
                },
                url: "http://localhost:5000/hotel/review/add"
            }
            axios(options)
            .then(response => {
                // console.log("Data cmt: ", response.data)
                if(response.data == "Chỉ có thể đánh giá khách sạn đã ở"){
                    store.addNotification(notification_notYetUsed);
                    removeReviewInput();
                }
                else{
                    window.location.reload();
                }
            })
            .catch(error => console.log("Error11: ", error))
            // window.location.reload();
        }
    }

    const userName = (dataCustomer.name || "").split(' ').slice(-1).join(' ');

    let isEdit = false;
    if(dataReview.length > 0 && token){
        for(let i in dataReview){
            if(dataReview[i].customerID == token.customerId){
                isEdit = true
            }
            if(isEdit){
                break;
            }
        }
    }

    return (
        <div className="roomReview">
            <div className="roomBody_line" ref={reference}></div>
            <div className="roomReview_container">
                <div className="roomReview_star">
                    <h2>
                        <span className="roomHeader_heading_stars">
                            <StarIcon className="roomHeader_heading_star"/>
                            <strong>{avgReview} ({dataReview.length} {content.reviews})</strong>
                        </span>
                    </h2>
                </div>

                {!token ? 
                <p style={{marginBottom: "50px", textAlign: "center"}}>{content.youNeed}<a href="/sign-in">{content.login}</a>{content.useServiceToRate}</p>
                :
                isEdit ? <div style={{textAlign: "center", marginBottom: "20px"}}><h1>{content.canOnlyEdit}<b style={{fontWeight: "600", color: "#B22222", textTransform: "uppercase", cursor: "pointer"}}>{content.edit}</b>{content.yourReview}</h1></div> :<div className="roomReview_review_input">
                        <div className="commentator">
                            <div className="commentator_avatar">
                                <Avatar 
                                    className="commentator_img" 
                                    alt={userName} 
                                    src={userName}
                                />
                            </div>

                            <div className="commentator_info">
                                {dataCustomer.username} {token.isAdmin ? <i style={{color: "green", fontSize: "14px"}} className="fas fa-check-circle"/> : ""}
                                {/* - <i style={{fontWeight: '400', fontSize: '14px'}}>tháng {(new Date().getMonth() + 1)} năm {(new Date().getFullYear())}</i> */}

                                <div className="comment_stars">
                                    <StarRatings
                                        rating={rating}
                                        changeRating={changeRating}
                                        numberOfStars={5}
                                        name='rating'
                                        starRatedColor="#f1c40f"
                                        starHoverColor="#f1c40f"
                                        starEmptyColor="gray"
                                        starDimension="20px"
                                        svgIconPath="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                        svgIconViewBox="0 0 576 512"
                                    /> 

                                    <p className="comment_stars_text">{textStar(rating)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="comment_input">
                            <form onSubmit={submitComment}>
                                <textarea 
                                    name="my_comment" 
                                    rows="1" 
                                    placeholder={content.enterYourCmt}
                                    className="message"
                                    value={commentTxt}
                                    onChange={handleChangeCommentTxt}
                                />

                                <div className="comment_input_btn">
                                    <button className="comment_btn_cancel" onClick={removeReviewInput}>{content.cancel}</button>

                                    <button className="comment_btn_submit" type="submit"><i className="far fa-comment-dots"/> {content.review}</button>
                                </div>
                            </form>                        
                        </div>
                    </div>
                }

            
                <div className="block_comment">
                    {/* comment_section - phần bình luận */}
                    <div className="block_comment_container"> 
                        {dataReview.length == 0 ? <div style={{width: "100%"}}><NoItem text={content.noReviews} /></div> : 
                        dataReview.map((reviews, index) => {
                            return  <BoxComment 
                                        key={index + reviews}
                                        customerName={reviews.customerName}
                                        customerID={reviews.customerID}
                                        score={reviews.score}
                                        content={reviews.content}
                                        idHotel={idHotel}
                                        reviewId={reviews._id}
                                        language={language}
                                        token={token}
                                    />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomReview
