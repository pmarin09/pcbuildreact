import React, {useContext} from "react"
import {Context} from "../../Context"
import useHover from "../../hooks/useHover"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import TimeAgo from 'timeago-react';
function FavoriteBuild({item}) {
    const {loggedInStatus,user,favorites,updateFavorites} = useContext(Context)
    const favoriteBuildParts = item.parts.map(b =>
            <tr>
              <td className="fav-td">{b.part_type}</td>
              <td>{b.description}</td>
            </tr>
            )
        
             function deleteFavorite() {
              favorites.filter(favorite => favorite.user_id === user.id && favorite.pcbuild_id === item.id).map(filteredFavorite => (
                fetch(`https://fpsbuilds-back-staging.herokuapp.com/pcbuilds/${item.id}/favorites/${filteredFavorite.id}.json`, {
                  method: "DELETE",
                })
                
                ))
                window.location.reload(false);
          }
          function removefavoriteIcon(){
                  return <i className="ri-close-fill ri-2x" onClick= {() => {deleteFavorite(); updateFavorites();}}></i>
          }
    
          
    return (
          <div className= "container">
                <div className="favorites-card">
                <div className="row no-gutters">
                <div className="col-md-4">
                
                <img src={`https://fpsbuilds-back-staging.herokuapp.com/${item.attachment_url}`} width="400px" className="favorites-card-img" alt="..."/>
                
                </div>
                <div className="col-md-8">
                    <div className="favorites-card-body">
                    <div className= "removeFavoriteIcon">{ loggedInStatus === "LOGGED_IN" ? removefavoriteIcon(): ""}</div>
                    <h5 className="card-title">{item.description}</h5>
                    <p className="card-text">{favoriteBuildParts}</p>
                    <Link to={`/builds/${item.id}`}><button type="button" className="btn btn-sm btn-outline-danger">View Details</button></Link>
                    <p className="card-text"><small className="text-muted"> Build created <TimeAgo datetime={item.created_at}/> by <Link to={`/profile/${item.user_id}`}>{item.username}</Link> </small></p>
                    
                    </div>
                    
                </div>
                </div>
                </div>
           </div>
    )
}

FavoriteBuild.propTypes = {
    item: PropTypes.shape({
        attachment_url: PropTypes.string.isRequired
    })
}

export default FavoriteBuild