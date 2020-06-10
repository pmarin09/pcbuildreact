import React,{useContext} from "react"
import {Context} from "../../Context"
import FavoriteBuild from "./FavoriteBuild"

function Favorites() {
    const {favoriteBuilds,emptyFavorites} = useContext(Context)
    const FavoriteItemElements = favoriteBuilds.map(item => (
        <FavoriteBuild key = {item.id} item = {item} />
    ))
console.log(FavoriteItemElements)

    return (
        <main className="cart-page">
            <h1>My Favorite Builds</h1>
            
             {favoriteBuilds.length > 0 ? "": <p>You have not selected any favorite builds...</p> }   
             <div className="row mb-2">
                {FavoriteItemElements}
                </div>
        </main>
    )
}

export default Favorites