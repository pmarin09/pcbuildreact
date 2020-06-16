import React, {useContext} from "react"
import {Context} from "../../Context"
import useHover from "../../hooks/useHover"
import PropTypes from "prop-types"
import styles from "../../styles.scss"
import {Link,useParams, useHistory} from "react-router-dom"
import TimeAgo from 'timeago-react';


function Image({img}) {
    const [hovered, ref] = useHover()
    const {addToFavorites,removeFromFavorites,favoriteBuilds} = useContext(Context)
    const{buildposts} = useContext(Context)
    const history = useHistory()
    const{likes} = useContext(Context)
    const{user} = useContext(Context)
    const{loggedInStatus} = useContext(Context)
    const thisBuildPosts = buildposts.filter(build => build.pcbuild_id === img.id)
    const buildpostcount = thisBuildPosts.length
    const thisBuildLikes = likes.filter(like => like.pcbuild_id === img.id)
    const buildlikecount = thisBuildLikes.length
    const parts = img.parts.map(part => part.description)
    const thisBuildUserLikes =  likes.filter(like => like.user_id === user.id && like.pcbuild_id === img.id).map(filteredLike => (
    
          <a className="level-item">
                  <i className="ri-delete-bin-5-fill"onClick ={ (e) => { 
                    fetch("http://localhost:3000/likes/" + filteredLike.id + ".json", {
                      method: "DELETE",
                    })
                   e.preventDefault();
                    window.location.reload();
                  }}></i>
              </a>
      
      ))
  function createLike(e) {
    
   if(likes.find(like => like.user_id === user.id && like.pcbuild_id === img.id)){
    
    likes.filter(like => like.user_id === user.id && like.pcbuild_id === img.id).map(filteredLike => (
      (d) =>  {
          fetch("http://localhost:3000/likes/" + filteredLike.id + ".json", {
          method: "DELETE",
        })
       d.preventDefault();
      }
    ))
   } else {
    const form = new FormData(document.getElementById("newLike"));
    fetch(`http://localhost:3000/pcbuilds/${img.id}/likes.json`, {
      method: "POST",
      body: form,
    });
    e.preventDefault();
    //  window.location.reload(false);
      }
  }


  function favoriteIcon(){
    const alreadyInFavorites = favoriteBuilds.some(item => item.id === img.id)
    if(alreadyInFavorites){
        return <i className="ri-thumb-up-fill" onClick= {() => removeFromFavorites(img.id)}></i>
    }else if(hovered){
        return <i className="ri-thumb-up-line" onClick={() => addToFavorites(img)}></i>

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
               
                <form className="form" onSubmit={createLike} id="newLike">
                <input
                  type="text"
                  name="user_id"
                  value={user.id}
                  className="description"
                  required
                  style={{display: "none"}}
                />
              
                <div className="postButton">
                <input
                  type="submit"
                  value="Like"
                  className="button is-success"
                />
              </div>
                </form>

               {thisBuildUserLikes}
               
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