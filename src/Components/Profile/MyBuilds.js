import React, {useContext} from "react"
import {Context} from "../../Context"
import PropTypes from "prop-types"
import {Link,useParams} from "react-router-dom"
import TimeAgo from 'timeago-react';
function MyBuilds() {
    
    
    const {loggedInStatus,allBuilds, user,favorites,updateFavorites} = useContext(Context)
    const {userId} = useParams()
    const myBuilds = allBuilds.filter(build => build.user_id.toString() === userId)
    
    

    return (

        
          <div className= "container">
              { myBuilds.map(filteredBuild => (
                <div className="profile-card">
                <div className="row no-gutters">
                <div className="col-md-4">
                
                <img src={`http://localhost:3000/${filteredBuild.attachment_url}`} width="400px" className="profile-card-img" alt="..."/>
                
                </div>
                <div className="col-md-8">
                    <div className="profile-card-body">
                    <h5 className="card-title">{filteredBuild.description}</h5>
                    <p className="card-text"></p>
                    <Link to={`/builds/${filteredBuild.id}`}><button type="button" className="btn btn-sm btn-outline-danger">View Details</button></Link>
                    <p className="card-text"><small className="text-muted"> Build created <TimeAgo datetime={filteredBuild.created_at}/> by <Link to={`/profile/${filteredBuild.user_id}`}>{filteredBuild.username}</Link> </small></p>
                    
                    </div>
                    
                </div>
                </div>
                </div>
              ))}
           </div>    
)}

MyBuilds.propTypes = {
    item: PropTypes.shape({
        attachment_url: PropTypes.string.isRequired
    })
}

export default MyBuilds