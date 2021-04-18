import React from 'react'
import "../style/NoItem.css"

function NoItem({
    text
}) {
    return (
        <div className="noItem">
            <div id="noItem_background"></div>

            <div class="noItem_top">
                <h1 class="noItem_h1">{text}</h1>
            </div>

            <div class="noItem_container">
                <div class="noItem_ghost-copy">
                    <div class="noItem_one"></div>
                    <div class="noItem_two"></div>
                    <div class="noItem_three"></div>
                    <div class="noItem_four"></div>
                </div>

                <div class="noItem_ghost">
                    <div class="noItem_face">
                        <div class="noItem_eye"></div>
                        <div class="noItem_eye-right"></div>
                        <div class="noItem_mouth"></div>
                    </div>
                </div>

                <div class="noItem_shadow"></div>
            </div>
        </div>
    )
}

export default NoItem
