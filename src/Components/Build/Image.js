import React, {useContext} from "react"
import {Context} from "../../Context"
import useHover from "../../hooks/useHover"
import PropTypes from "prop-types"
import styles from "../../styles.scss"
import {Link} from "react-router-dom"
import TimeAgo from 'timeago-react';
function Image({img}) {
    const [hovered, ref] = useHover()
    const {addToFavorites,removeFromFavorites,favoriteBuilds} = useContext(Context)

    function favoriteIcon(){
        const alreadyInFavorites = favoriteBuilds.some(item => item.id === img.id)
        if(alreadyInFavorites){
            return <i className="ri-star-fill" onClick= {() => removeFromFavorites(img.id)}></i>
        }else if(hovered){
            return <i className="ri-star-line" onClick={() => addToFavorites(img)}></i>

        }
    }
    return (
            <div className="col-md-4" ref = {ref}>
              <div className="card mb-4 shadow-sm">
              <img src={`http://localhost:3000/${img.attachment_url}`} className= "card-img-top"/>
              {favoriteIcon()}
                <div className="card-body">
                
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