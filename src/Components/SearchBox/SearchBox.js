import React from "react"

const SearchBox = ({placeholder,handleChange}) => {
    return(
        <div className="search-box">
            <input type ="search"
            placeholder = {placeholder}
            className = "search-txt"
            onChange = {handleChange}
            />
            <span className="search-btn">
                <i className="fas fa-search"></i>
            </span>
        </div>
        
    )
}


export default SearchBox;