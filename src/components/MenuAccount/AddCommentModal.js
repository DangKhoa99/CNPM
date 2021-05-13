import React, {useState} from 'react'
import axios from 'axios'
import * as myConstClass from "../../constants/constantsLanguage"
import StarRatings from "react-star-ratings"
import { store } from 'react-notifications-component'

function AddCommentModal({
    token,
    language,
    idHotel
}) {
    let content = myConstClass.LANGUAGE;
    language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    const [rating, setRating] = useState(0);
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

    return (
        <div className="addCommentModal">
            <div className="customDialog">
                <div className="Content-module_content__1e-91">

                <div className="roomReview_review_input" style={{boxShadow: "none", width: "550px"}}>
                        <div className="commentator">

                            <div className="commentator_info">

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

                        <div className="comment_input" style={{width: "520px"}}>
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
                </div>
            </div>
        </div>
    )
}

export default AddCommentModal
