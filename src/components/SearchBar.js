import React, {useState} from 'react'

function SearchBar({
    colorHeader,
    openMenuSearchSuggestion,
    closeMenuSearchSuggestion,

    menuSearchSuggestion,
    blockHeader,
    handleMenuSearchSuggestionsClick,

}) {
    const [searchLocation, setSearchLocation] = useState({
        value: '',
        predictions: [
            "Hồ Chí Minh",
            "Hà Nội",
            "Phan Thiết",
            "Vũng Tàu",
            "Phú Quốc",
            "Đà Nẵng",
            "Đà Lạt",
        ]

    });

    function getPredictions(value){
        return [
            "Hồ Chí Minh",
            "Hà Nội",
            "Phan Thiết",
            "Vũng Tàu",
            "Phú Quốc",
            "Đà Nẵng",
            "Đà Lạt",
        ].filter(item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    }

    function onChangeSearchLocation(e){
        const value = e.target.value;
        setSearchLocation({value: value});

        if(value.length > 0){
            const predictions = getPredictions(value);
            setSearchLocation({predictions: predictions});
            
        }
        else{
            setSearchLocation({predictions:["Hồ Chí Minh",
                                            "Hà Nội",
                                            "Phan Thiết",
                                            "Vũng Tàu",
                                            "Phú Quốc",
                                            "Đà Nẵng",
                                            "Đà Lạt",
                                            ]
            });
        }
    }

    return (
        <div className="searchBar">
            <div 
                className={colorHeader ? "header_search active" : "header_search"} 
                onClick={openMenuSearchSuggestion} 
                onBlur={closeMenuSearchSuggestion}
            >
            <form action="/search-page">
              <input 
                // required
                type="text" 
                name="result" 
                className={colorHeader ? "input_search active" : "input_search"} 
                placeholder="Bạn sắp đi đâu?" 
                spellCheck="false"
                autoComplete="off"
                value={searchLocation.value}
                onChange={onChangeSearchLocation}
              />
            </form>
            <a 
              href={"/search-page?result=" + searchLocation.value}
              className={colorHeader ? "header_search_btn active" : "header_search_btn"}
            >
              <i className="fas fa-search-location"></i>
            </a>
          
            {/* Menu Search Suggestion */}
            <div 
              className={
                menuSearchSuggestion ?
                blockHeader ? "search_suggestions staticHeader" :
                "search_suggestions"
                : 
                "search_suggestions close"} 
              onMouseDown={handleMenuSearchSuggestionsClick}
            >
              <ul className="search_suggestions_lists">
                {searchLocation.predictions.length==0 ? 
                            <li className="search_suggestions_item">  
                                <a className="search_suggestions_link">
                                    Không tìm thấy kết quả
                                </a>
                            </li>
                :
                searchLocation.predictions.map((item, index) => {
                    return  <li key={index + item} className="search_suggestions_item">  
                                <a 
                                className="search_suggestions_link" 
                                href={"/search-page?result=" + item}
                                >
                                <i className="fas fa-map-marker-alt" style={{color: "red", marginRight: "20px"}}/>{item}
                                </a>
                            </li>
                })
                }    
              </ul>
            </div>
          </div>
            
        </div>
    )
}

export default SearchBar
