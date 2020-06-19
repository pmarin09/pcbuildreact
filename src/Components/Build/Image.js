import React, {useContext,useEffect} from "react"
import {Context} from "../../Context"
import useHover from "../../hooks/useHover"
import PropTypes from "prop-types"
import styles from "../../styles.scss"
import {Link,useHistory} from "react-router-dom"
import TimeAgo from 'timeago-react';

function Image({img}) {
    const [hovered, ref] = useHover()
    const {addToFavorites,removeFromFavorites,favoriteBuilds,buildposts, likes, setLikes, user, loggedInStatus} = useContext(Context)
    const history = useHistory()
    const thisBuildPosts = buildposts.filter(build => build.pcbuild_id === img.id)
    const buildpostcount = thisBuildPosts.length
    const thisBuildLikes = likes.filter(like => like.pcbuild_id === img.id)
    const buildlikecount = thisBuildLikes.length
    const parts = img.parts.map(part => part.part_type === "Mobo"? part.description: "")
    

  function deleteLike() {

    
      likes.filter(like => like.user_id === user.id && like.pcbuild_id === img.id).map(filteredLike => (
                   
                    fetch(`http://localhost:3000/pcbuilds/${img.id}/likes/${filteredLike.id}.json`, {
                      method: "DELETE",
                    })
                    ,fetch(`http://localhost:3000/pcbuilds/${img.id}/likes.json`)
                    .then (res => res.json())
                    .then (data => setLikes(data))
                  
                  ))
  }
function createLike() {
    
  const form = new FormData(document.getElementById("newLike"));
  
    fetch(`http://localhost:3000/pcbuilds/${img.id}/likes.json`, {
      method: "POST",
      body: form,
    })
    fetch(`http://localhost:3000/pcbuilds/${img.id}/likes.json`)
    .then (res => res.json())
    .then (data => setLikes(data))
    console.log(likes)
   
 }
function favoriteIcon(){
    const alreadyInFavorites = favoriteBuilds.some(item => item.id === img.id)
    if(alreadyInFavorites){
        return <i className="ri-bookmark-2-fill" onClick= {() => removeFromFavorites(img.id)}></i>
    }else if(hovered){
        return <i className="ri-bookmark-2-line" onClick={() => addToFavorites(img)}></i>

    }
}
function LikeIcon(){
    const alreadyInLikes = likes.some(like => like.user_id === user.id && like.pcbuild_id === img.id)
    
    if(alreadyInLikes){
        return <i className="ri-thumb-up-fill" onClick= {() => deleteLike()}></i>
    }else {
        return <i className="ri-thumb-up-line" onClick={()=> createLike()}></i>
    }
    
}

    return (
      <div className="col-md-4" ref = {ref}>
          <div className="card mb-4 shadow-sm">
              <img src={`http://localhost:3000/${img.attachment_url}`} className= "card-img-top"/>
            <div className="card-body">
                <p className="card-text">
                <em><small><Link to={`/builds/${img.id}`}><i className="ri-message-2-line"></i></Link>{buildpostcount}</small></em>
                <div>{favoriteIcon()}</div>
                <em><small>{buildlikecount} Likes</small></em>
              <div>{LikeIcon()}</div> 
                <div>{parts}</div>
                </p>
                  <p className="card-text">
                  <em><small>Uploaded <TimeAgo datetime={img.created_at}/> by {img.username}</small></em>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link to={`/builds/${img.id}`}><button type="button" className="btn btn-sm btn-outline-secondary">View</button></Link>
                    </div>
                  </div>
            </div>
          </div>
          <form className="form" onSubmit={createLike} id="newLike" style={{display: "none"}}>
                <input
                  value= {user.id}
                  name="user_id"
                  style={{display: "none"}}
                  required
                />
          </form>
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
export default Image