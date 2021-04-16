import React from 'react'
import "../../style/ErrorPage.css"

function ErrorPage() {
    document.title = "404 Page Not Found | RoyalStay"
    return (
        <div className="errorPage">
            
            <div class="text">
                <p>404</p>
            </div>
            <div class="subText">
                <p>TRANG BẠN TÌM KIẾM KHÔNG TỒN TẠI</p>
               
               <a href="/"><button class="snip1582">Trở về trang chủ</button></a>
            </div>

            <div class="container">

            <div class="caveman">
                <div class="leg">
                <div class="foot"><div class="fingers"></div></div>      
                </div>
                <div class="leg">
                <div class="foot"><div class="fingers"></div></div>      
                </div>
                <div class="shape">
                <div class="circle"></div>
                <div class="circle"></div>
                </div>
                <div class="head">
                <div class="eye"><div class="nose"></div></div>
                <div class="mouth"></div>
                </div>
                <div class="arm-right"><div class="club"></div></div>    
            </div>

            <div class="caveman">
                <div class="leg">
                <div class="foot"><div class="fingers"></div></div>      
                </div>
                <div class="leg">
                <div class="foot"><div class="fingers"></div></div>      
                </div>
                <div class="shape">
                <div class="circle"></div>
                <div class="circle"></div>
                </div>
                <div class="head">
                <div class="eye"><div class="nose"></div></div>
                <div class="mouth"></div>
                </div>
                <div class="arm-right"><div class="club"></div></div>  
                
            </div>
            </div>
            
        </div>
    )
}

export default ErrorPage
