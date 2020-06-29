import React,{useContext,useEffect} from "react"
import {Context} from "../../Context"
import FavoriteBuild from "./FavoriteBuild"

function Favorites() {
    const {allBuilds,setAllBuilds,user} = useContext(Context)
    const favoriteBuilds = allBuilds.filter(build => build.favorites.some(favorite => favorite.pcbuild_id === build.id && favorite.user_id === user.id)? build : "" )
    const FavoriteItemElements = favoriteBuilds.map(item => (
        <FavoriteBuild key = {item.id} item = {item} />
       ))

       useEffect(()=>{
        fetch(`http://localhost:3000/pcbuilds.json`)
        .then (res => res.json())
        .then (data => setAllBuilds(data))
    },[])

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