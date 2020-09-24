import React from "react"

const SearchBox = ({placeholder,handleChange}) => {
    return(
        <div class="search-box">
            <input type ="search"
            placeholder = {placeholder}
            className = "search-txt"
            onChange = {handleChange}
            />
            <span class="search-btn">
                <i class="fas fa-search"></i>
            </span>
        </div>
        
    )
}


export default SearchBox;