import React, {useContext} from "react"
import {Context} from "../../Context"
import useHover from "../../hooks/useHover"
import PropTypes from "prop-types"
import styles from "../../styles.scss"
import {Link,useHistory} from "react-router-dom"
import TimeAgo from 'timeago-react';
import buildcomments from "../../icons/buildcommentswhite.png"
function Image({img}) {
  const [hovered, ref] = useHover()
  const {buildposts, likes, updateLikes, favorites, updateFavorites, user,loggedInStatus,fpsbuildsurl} = useContext(Context)
  const history = useHistory()
  const thisBuildPosts = buildposts.filter(build => build.pcbuild_id === img.id)
  const buildpostcount = thisBuildPosts.length
  const thisBuildLikes = likes.filter(like => like.pcbuild_id === img.id)
  const buildlikecount = thisBuildLikes.length
  const CPU = img.parts.map(part => (part.part_type === "CPU") ? part.description: "")
  const Mobo = img.parts.map(part => (part.part_type === "Mobo") ? part.description: "")
  const GPU = img.parts.map(part => (part.part_type === "GPU") ? part.description: "")
  const pcbuildParts = img.pcbuild_parts.map(b=>b.price)
  const pcbuildTotalCost = pcbuildParts.reduce((acc,price) => {return  acc + price},0)
  function createLike() {
        const form = new FormData(document.getElementById("newLike"));
        fetch(`${fpsbuildsurl}/pcbuilds/${img.id}/likes.json`, {
          method: "POST",
          body: form,
        })
     }
  function deleteLike() {
      likes.filter(like => like.user_id === user.id && like.pcbuild_id === img.id).map(filteredLike => (
                   
                    fetch(`${fpsbuildsurl}/pcbuilds/${img.id}/likes/${filteredLike.id}.json`, {
                      method: "DELETE",
                    })
                  ))
  }
  function createFavorite() {
      const form = new FormData(document.getElementById("newFavorite"));
      fetch(`${fpsbuildsurl}/pcbuilds/${img.id}/favorites.json`, {
        method: "POST",
        body: form,
      })
  }
  function deleteFavorite() {
    favorites.filter(favorite => favorite.user_id === user.id && favorite.pcbuild_id === img.id).map(filteredFavorite => (
      fetch(`${fpsbuildsurl}/pcbuilds/${img.id}/favorites/${filteredFavorite.id}.json`, {
        method: "DELETE",
      })
    ))
  }
  function favoriteIcon(){
    const alreadyInFavorites = favorites.some(favorite => favorite.user_id === user.id && favorite.pcbuild_id === img.id)
    if(alreadyInFavorites){
        return <i className="ri-star-fill ri-lg" onClick= {() => {deleteFavorite(); setTimeout(() => updateFavorites(),150)}}></i>
    }else {
        return <i className="ri-star-line ri-lg" onClick={()=> {createFavorite(); setTimeout(() => updateFavorites(),150)}}></i>

    }
  }
  function LikeIcon(){
    const alreadyInLikes = likes.some(like => like.user_id === user.id && like.pcbuild_id === img.id)
    
    if(alreadyInLikes){
        return <i className="ri-thumb-up-fill" onClick= {() => {deleteLike(); setTimeout(() => updateLikes(),150)}}></i>
    }else {
        return <i className="ri-thumb-up-line" onClick={()=> {createLike(); setTimeout(() =>updateLikes(),150)}}></i>
    }
  }
  return (
      <div className="col-md-4" ref = {ref}>
          <div className="card mb-4 shadow-sm">
              <img src={`${fpsbuildsurl}/${img.attachment_url[0]}`} className= "card-img-top"/>
              <div>
                <div className= "comments-icon"><Link to={`/builds/${img.id}`}><img src={buildcomments}/> </Link> <em><small>{buildpostcount}</small></em>
                  <div className= "like-icon">{ (loggedInStatus === "LOGGED_IN" && user )? LikeIcon(): ""} 
                  <em><small> {buildlikecount} {buildlikecount === 1 ? "like" : "likes"}</small></em></div>
                </div>
              </div>
            <div className="card-body">
              <div className="card-text">
                <div className="favorite-icon">{ (loggedInStatus === "LOGGED_IN" && user )? favoriteIcon(): ""} 
                  <div className= "build-cost"><i className="ri-money-dollar-circle-line ri-lg"></i> Total Cost: ${pcbuildTotalCost}</div>
                </div>
                <hr className="main-card-hr"></hr>
                <div className= "build-name-card">{img.build_name}</div>
                <div><small>{CPU}</small></div>
                <div><small>{Mobo}</small></div>
                <div><small>{GPU}</small></div>
                <div>...</div>
              </div>
                <p className="card-text">
                  <em><small>Uploaded <TimeAgo datetime={img.created_at}/> by <Link to={`/profile/${img.user_id}`}> {img.username} </Link></small></em>
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link to={`/builds/${img.id}`}><button type="button" className="btn btn-sm btn-outline-primary">View</button></Link>
                  </div>
                </div>
            </div>
          </div>
          {(loggedInStatus === "LOGGED_IN" && user )?
          <>
          <form className="form" onSubmit={createLike} id="newLike" style={{display: "none"}}>
                <input
                  value= {user.id}
                  name="user_id"
                  style={{display: "none"}}
                  required
                />
          </form>
          <form className="form" onSubmit={createFavorite} id="newFavorite" style={{display: "none"}}>
                <input
                  value= {user.id}
                  name="user_id"
                  style={{display: "none"}}
                  required
                />
          </form>
          </>
          :""}
      </div>
    )
}
Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    }) 
}
export default Image;