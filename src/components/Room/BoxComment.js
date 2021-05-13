import React, {useState} from 'react'
import * as myConstClass from "../../constants/constantsLanguage"
import {Avatar} from "@material-ui/core"
import StarRatings from "react-star-ratings"
import axios from 'axios'
import { store } from 'react-notifications-component'
import { Confirm } from 'react-st-modal'

function BoxComment({
    hotelInvoiceDetail,
    customerName,
    customerID,
    score,
    content,
    idHotel,
    reviewId,
    language,
    token
}) {
    let contentLanguage = myConstClass.LANGUAGE;
    language === "English"
        ? (contentLanguage = contentLanguage.English)
        : (contentLanguage = contentLanguage.Vietnam);

    const [clickEditReview, setClickEditReview] = useState(false);
    const handleClickEditReview = () =>{
        setClickEditReview(!clickEditReview);
        setRating(score);
        setCommentTxt(content);
    }

    const handleDeleteCommentUserByAdmin = () => {
        const options = {
            method: "POST",
            headers: {
                "auth-token": token.authToken,
            },
            data: {
                "hotelId": idHotel,
                "reviewId": reviewId
            },
            url: "http://localhost:5000/hotel/review/delete"
        }
        axios(options)
        .then(response => {
            // console.log("DELETE REVIEW OF USER IN HOTEL: ", response.data)
            window.location.reload();
        })
        .catch(error => console.log(error))
    }

    const [rating, setRating] = useState(score);

    function changeRating(newRating){
        setRating(newRating);
    }

    function textStar(rating){
        if(rating == 0){
            return contentLanguage.review + "...";
        }
        else if(rating == 1){
            return contentLanguage.extremelyDislike;
        }
        else if(rating == 2){
            return contentLanguage.dislike;
        }
        else if(rating == 3){
            return contentLanguage.allright;
        }
        else if(rating == 4){
            return contentLanguage.prefer;
        }
        else if(rating == 5){
            return contentLanguage.likeSoMuch;
        }
    }

    const [commentTxt, setCommentTxt] = useState(content);

    const handleChangeCommentTxt = (e) => {
        let value = e.target.value;
        setCommentTxt(value);
    }

    const removeReviewInput = (e) => {
        e.preventDefault();
        setClickEditReview(!clickEditReview);
        setRating(score);
        setCommentTxt(content);
    }

     // Chưa đánh giá sao cho khách sạn
     const notification_notStar = {
        title: ' RoyalStay - ' + contentLanguage.notification,
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
                    "hotelId": idHotel,
                    "reviewId": reviewId,
                    "customerId": token.customerId,
                    "content": commentTxt,
                    "score": rating,
                },
                url: "http://localhost:5000/hotel/review/edit"
            }
            axios(options)
            .then(response => {
                console.log("Data cmt: ", response.data)
                if(response.data == "Chỉnh sửa không thành công"){
                    console.log("Chỉnh sửa không thành công");
                }
                else{
                    window.location.reload();
                } 
            })
            .catch(error => console.log("Error11: ", error))
        }
    }

    const userName = (customerName || "").split(' ').slice(-1).join(' ');

    return (
        <div className={"box_comment " + hotelInvoiceDetail}>
            <div className="commentator">
                <div className={"commentator_avatar " + hotelInvoiceDetail}>
                    <Avatar 
                        className="commentator_img" 
                        alt={userName} 
                        src={userName}
                    />
                </div>

                <div className={"commentator_info " + hotelInvoiceDetail}>
                    {
                    token && token.isAdmin ?
                        <div className="commentator_name">
                            <p>{customerName}</p> 
                            <button 
                                style={{background: "white", border: "none"}}
                                onClick={async () => {
                                    const result = await Confirm(contentLanguage.txtRemoveCmtUser + customerName + contentLanguage.txtRemoveCmtUser1, contentLanguage.confirmRemove)
                                    if(result){
                                        handleDeleteCommentUserByAdmin();
                                    }
                                    else{
                                        
                                    }
                                }}
                            >
                                <i className="fas fa-ban" style={{color: "red"}} title={contentLanguage.removeCmtUser}/>
                            </button>
                        </div>
                    :
                    token && customerID == token.customerId
                    ? 
                        <div className={"commentator_name " + hotelInvoiceDetail}>
                            <p>{customerName}</p> 
                            <button style={{background: "white", border: "none"}} onClick={handleClickEditReview}>
                                <i className="far fa-edit" title={contentLanguage.editReview}/>
                            </button>
                        </div>
                    :
                        customerName
                    }
                    <div className="comment_time">
                        {/* <div>time - tháng 2 năm 2021</div> */}
                        {clickEditReview && token && customerID == token.customerId 
                        ? 
                        <div className="comment_stars">
                            <StarRatings
                                rating={rating}
                                changeRating={changeRating}
                                numberOfStars={5}
                                name='rating'
                                starRatedColor="#f1c40f"
                                starHoverColor="#f1c40f"
                                starEmptyColor="gray"
                                starDimension="14px"
                                svgIconPath="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                svgIconViewBox="0 0 576 512"
                            /> 

                            <p className="comment_stars_text">{textStar(rating)}</p>
                        </div>
                        :
                        <div className="comment_stars" >
                            <StarRatings
                                rating={score}
                                numberOfStars={5}
                                name='rating'
                                starRatedColor="#f1c40f"
                                starEmptyColor="gray"
                                starDimension="14px"
                                svgIconPath="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                svgIconViewBox="0 0 576 512"
                            /> 
                        </div>
                        }
                    </div>
                </div>
            </div>

            <div>
                <span>
                    <div className="comment_text">
                        {/* EDIT REVIEW */}
                        {clickEditReview && token && customerID == token.customerId ?
                        <div className="comment_input" style={{width: "500px"}}>
                            <form onSubmit={submitComment}>
                                <textarea
                                    style={{fontSize: "16px"}}
                                    name="my_comment" 
                                    rows="1" 
                                    placeholder={contentLanguage.enterYourCmt}
                                    className="message"
                                    value={commentTxt}
                                    onChange={handleChangeCommentTxt}
                                />

                                <div className="comment_input_btn">
                                    <button className="comment_btn_cancel" onClick={removeReviewInput}>{contentLanguage.cancel}</button>

                                    <button className="comment_btn_submit" type="submit"><i className="far fa-comment-dots"/> {contentLanguage.edit}</button>
                                </div>
                            </form>                        
                        </div>
                        : <span>{content}</span>
                        }
                    </div>
                </span>
            </div>
        </div>
    )
}

export default BoxComment
