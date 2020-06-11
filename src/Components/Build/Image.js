import React, {useContext} from "react"
import {Context} from "../../Context"
import useHover from "../../hooks/useHover"
import PropTypes from "prop-types"
import styles from "../../styles.scss"
import {Link,useParams} from "react-router-dom"
import TimeAgo from 'timeago-react';
function Image({img}) {
    const [hovered, ref] = useHover()
    const {addToFavorites,removeFromFavorites,favoriteBuilds} = useContext(Context)
    const{buildposts} = useContext(Context)
    function favoriteIcon(){
        const alreadyInFavorites = favoriteBuilds.some(item => item.id === img.id)
        if(alreadyInFavorites){
            return <i className="ri-thumb-up-fill" onClick= {() => removeFromFavorites(img.id)}></i>
        }else if(hovered){
            return <i className="ri-thumb-up-line" onClick={() => addToFavorites(img)}></i>

        }
    }

    const thisBuildPosts = buildposts.filter(build => build.pcbuild_id === img.id)
    const buildpostcount = thisBuildPosts.length
    const parts = img.parts.map(part => part.description)
  console.log(parts)
    return (
            <div className="col-md-4" ref = {ref}>
              <div className="card mb-4 shadow-sm">
              <img src={`http://localhost:3000/${img.attachment_url}`} className= "card-img-top"/>
              
                <div className="card-body">
                <p className="card-text">
                <em><small><Link to={`/builds/${img.id}`}><i className="ri-message-2-line"></i></Link>{buildpostcount}</small></em>
                <div>{favoriteIcon()}</div>
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