import React, {useContext,useEffect,useState} from "react"
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
    const parts = img.parts.map(part => (part.part_type === "CPU") ? part.description: "")
    const [active,setActive] = useState(false)

  function deleteLike() {
      likes.filter(like => like.user_id === user.id && like.pcbuild_id === img.id).map(filteredLike => (
                   
                    fetch(`http://localhost:3000/pcbuilds/${img.id}/likes/${filteredLike.id}.json`, {
                      method: "DELETE",
                    })
                  ))
  }
function createLike() {
    
  const form = new FormData(document.getElementById("newLike"));
  
    fetch(`http://localhost:3000/pcbuilds/${img.id}/likes.json`, {
      method: "POST",
      body: form,
    })
 
    
 }
 function updateLikes(){
  setTimeout(() => {fetch(`http://localhost:3000/likes.json`)
  .then (res => res.json())
  .then (data => setLikes(data))
  },50)
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
        return <i className="ri-thumb-up-fill" onClick= {() => {deleteLike(); updateLikes();}}></i>
    }else {
        return <i className="ri-thumb-up-line" onClick={()=> {createLike(); updateLikes();}}></i>
    }
    
}



    return (
      <div className="col-md-4" ref = {ref}>
          <div className="card mb-4 shadow-sm">
              <img src={`http://localhost:3000/${img.attachment_url}`} className= "card-img-top"/>
              <div className= "grid-container">
              <div className= "comments-icon"><Link to={`/builds/${img.id}`}><i className="ri-message-2-line"></i></Link> <em><small>{buildpostcount}</small></em></div>
              <div className= "grid-item">{LikeIcon()} 
                 <em><small> {buildlikecount} {buildlikecount === 1 ? "like" : "likes"}</small></em></div>
              </div>
            <div className="card-body">
                <p className="card-text">
                <div>{favoriteIcon()}</div>
                <div>{parts}</div>
                </p>
                  <p className="card-text">
                  <em><small>Uploaded <TimeAgo datetime={img.created_at}/> by {img.username}</small></em>
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link to={`/builds/${img.id}`}><button type="button" className="btn btn-sm btn-outline-primary">View</button></Link>
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