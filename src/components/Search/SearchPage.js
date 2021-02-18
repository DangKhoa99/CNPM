import React from 'react'
import "./SearchPage.css"
import SearchCard from "./SearchCard"
import { Button } from '@material-ui/core'
import Header from '../Header'
import { Link } from "react-router-dom"

function SearchPage() {
    return (
        <div className="searchPage">
            <Header />
            <div className="searchPage__info">
                <p>Hơn 300 chỗ ở</p>
                <h1>Khám phá</h1>
                {/* <Button variant="outlined">
                    Cancellation Flexibility
                </Button>
                <Button variant="outlined">
                    Type of place
                </Button>
                <Button variant="outlined">
                    Price
                </Button>
                <Button variant="outlined">
                    Rooms and beds
                </Button>
                <Button variant="outlined">
                    More filters
                </Button> */}
            </div>
            
            <Link to="/rooms" className="searchPage__link">
                <SearchCard
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"
                    location="Phòng riêng tại Quận 3"
                    title="Tiamy Housie T4"
                    description="2 khách · 1 giường · 1 phòng tắm · Wifi · Bếp · Chỗ đậu xe miễn phí"
                    star="4.74 (27)"
                    price="$14"
                    total="Tổng $117"
                />
            </Link>
            
            <Link to="/rooms" className="searchPage__link">
                <SearchCard
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"
                    location="Private room in center of London"
                    title="Stay at this spacious Edwardian House"
                    description="1 guest &middot; 1 bedroom &middot; 1.5 shared bthrooms &middot; Wifi &middot; Kitchen &middot; Free parking &middot; Washing Machine"
                    star={4.73}
                    price="30USD / night"
                    total="117USD total"
                />
            </Link>

            <Link to="/rooms" className="searchPage__link">
                <SearchCard
                    img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"
                    location="Private room in center of London"
                    title="Stay at this spacious Edwardian House"
                    description="1 guest &middot; 1 bedroom &middot; 1.5 shared bthrooms &middot; Wifi &middot; Kitchen &middot; Free parking &middot; Washing Machine"
                    star={4.73}
                    price="30USD / night"
                    total="117USD total"
                />
            </Link>
        </div>
    )
}

export default SearchPage
