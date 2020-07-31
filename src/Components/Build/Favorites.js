import React,{useContext,useEffect,useState} from "react"
import {Context} from "../../Context"
import FavoriteBuild from "./FavoriteBuild"
import Pagination from '../../Pagination';
function Favorites() {
    const {allBuilds,setAllBuilds,user} = useContext(Context)
    const favoriteBuilds = allBuilds.filter(build => build.favorites.some(favorite => favorite.pcbuild_id === build.id && favorite.user_id === user.id)? build : "" )
    const FavoriteItemElements = favoriteBuilds.map(item => (
        <FavoriteBuild key = {item.id} item = {item} />
       ))

       useEffect(()=>{
        fetch(`https://fpsbuilds-back-staging.herokuapp.com/pcbuilds.json`)
        .then (res => res.json())
        .then (data => setAllBuilds(data))
    },[])

      //PAGINATION 
      const [currentPage, setCurrentPage] = useState(1);
      const [favoriteBuildsPerPage] = useState(10);
   
     // Get current posts
     const indexOfLastFavorite = currentPage * favoriteBuildsPerPage;
     const indexOfFirstFavorite = indexOfLastFavorite - favoriteBuildsPerPage;
     const currentFavorites = FavoriteItemElements.slice(indexOfFirstFavorite, indexOfLastFavorite);
   
     // Change page
     const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <main className="top">
             {favoriteBuilds.length > 0 ? "": <p>You have not selected any favorite builds...</p> }   
             <div className="row mb-2">
                {currentFavorites}
                </div>
                
                {favoriteBuilds.length > 10 ? 
                <Pagination
                            elementsPerPage={favoriteBuildsPerPage}
                            totalElements={favoriteBuilds.length}
                            paginate={paginate}
                            className="favorites-pagination"
                        />
                :""}
        </main>
    )
}

export default Favorites