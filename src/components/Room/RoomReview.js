import React from 'react'
import "../../style/RoomReview.css"
import StarIcon from "@material-ui/icons/Star"

function RoomReview() {
    return (
        <div className="roomReview">
            <div className="roomBody_line"></div>
            <div className="roomReview_container">
                <div className="roomReview_star">
                    <h2>
                        <span className="roomHeader_heading_stars">
                            <StarIcon className="roomHeader_heading_star"/>
                            <strong>4.9 (41 đánh giá)</strong>
                        </span>

                        <span>
                            
                        </span>
                    </h2>
                </div>

            </div>

            
        </div>
    )
}

export default RoomReview
