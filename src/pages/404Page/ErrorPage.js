import React from 'react'
import "../../style/ErrorPage.css"
import useLanguage from '../../hooks/useLanguage'
import * as myConstClass from "../../constants/constantsLanguage"

function ErrorPage() {
    const { language, setLanguage } = useLanguage();

    let content = myConstClass.LANGUAGE;
    
      language === "English"
        ? (content = content.English)
        : (content = content.Vietnam);

    document.title = "404 Page Not Found | RoyalStay"
    return (
        <div className="errorPage">
            
            <div className="text">
                <p>404</p>
            </div>
            <div className="errorPage_subText">
                <p>{content.titlePageError}</p>
               
               <a href="/"><button className="snip1582">{content.returnHome}</button></a>
            </div>

            <div className="errorPage_container">

            <div className="caveman">
                <div className="leg">
                <div className="foot"><div className="fingers"></div></div>      
                </div>
                <div className="leg">
                <div className="foot"><div className="fingers"></div></div>      
                </div>
                <div className="shape">
                <div className="circle"></div>
                <div className="circle"></div>
                </div>
                <div className="head">
                <div className="eye"><div className="nose"></div></div>
                <div className="mouth"></div>
                </div>
                <div className="arm-right"><div className="club"></div></div>    
            </div>

            <div className="caveman">
                <div className="leg">
                <div className="foot"><div className="fingers"></div></div>      
                </div>
                <div className="leg">
                <div className="foot"><div className="fingers"></div></div>      
                </div>
                <div className="shape">
                <div className="circle"></div>
                <div className="circle"></div>
                </div>
                <div className="head">
                <div className="eye"><div className="nose"></div></div>
                <div className="mouth"></div>
                </div>
                <div className="arm-right"><div className="club"></div></div>  
                
            </div>
            </div>
            
        </div>
    )
}

export default ErrorPage
