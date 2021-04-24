import React from 'react'
import "../style/NoItem.css"

function NoItem({
    text
}) {
    return (
        <div className="noItem">
            <div id="noItem_background"></div>

            <div className="noItem_top">
                <h1 className="noItem_h1">{text}</h1>
            </div>

            <div className="noItem_container">
                <div className="noItem_ghost-copy">
                    <div className="noItem_one"></div>
                    <div className="noItem_two"></div>
                    <div className="noItem_three"></div>
                    <div className="noItem_four"></div>
                </div>

                <div className="noItem_ghost">
                    <div className="noItem_face">
                        <div className="noItem_eye"></div>
                        <div className="noItem_eye-right"></div>
                        <div className="noItem_mouth"></div>
                    </div>
                </div>

                <div className="noItem_shadow"></div>
            </div>
        </div>
    )
}

export default NoItem
