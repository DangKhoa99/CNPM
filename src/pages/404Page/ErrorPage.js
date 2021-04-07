import React from 'react'
import "../../style/ErrorPage.css"

function ErrorPage() {
    document.title = "404 Page Not Found"

    const myStyleBackground={
        background: `url('${process.env.PUBLIC_URL}/images/404.jpg'), #151729`
    }

    const animationBackground = (e) => {
        let x = -e.clientX / 5;
        let y = -e.clientY / 5;
        let container = document.getElementById('container');
        container.style.backgroundPositionX = x + 'px'; 
        container.style.backgroundPositionY = y + 'px';
    }

    return (
        <div className="errorPage">
            <div className="errorPage_container" id="container" style={myStyleBackground} 
            onMouseMove={e => animationBackground(e)}>
                <div className="errorPage_content">
                    <h2>404</h2>
                    <h4>Oops! Trang không tìm thấy</h4>
                    <p>Chúng tôi không tìm thấy trang bạn tìm kiếm</p>
                    <a href="/">Trở về trang chủ</a>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
