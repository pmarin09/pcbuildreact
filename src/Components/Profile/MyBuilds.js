import React, {useState, useEffect, useContext} from "react"
import {Context} from "../../Context"
import PropTypes from "prop-types"
import {Link,useParams} from "react-router-dom"
import TimeAgo from 'timeago-react';
import { Button } from 'react-bulma-components';
import {toast } from 'react-toastify';
function MyBuilds() {
const {user, adminId,updateBuilds,loggedInStatus,fpsbuildsurl} = useContext(Context)
const {userId} = useParams()
const [myBuilds, setMyBuilds] = useState()

useEffect(()=>{
    fetch(`${fpsbuildsurl}`+ "/mybuilds/ "+ userId + ".json")
    .then (res => res.json())
    .then (data => setMyBuilds(data))
    console.log(myBuilds)
  },[])

return (
    <>
    {myBuilds ? 
          <div className= "container">
              { myBuilds.pcbuilds.map(filteredBuild => (
                <div className="profile-card">
                <div className="row no-gutters">
                <div className="col-md-4">
                <img src={`${fpsbuildsurl}/${filteredBuild.attachment_url[filteredBuild.main_image ==! null ? filteredBuild.main_image : 0]}`} width="400px" className="profile-card-img" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="profile-card-body">
                    <h5 className="card-title">{filteredBuild.description}</h5>
                    <p className="card-text"></p>
                    <Link to={`/builds/${filteredBuild.id}`}><button type="button" className="btn btn-sm btn-outline-danger">View Details</button></Link>
                    {(user.id === parseInt(userId) && loggedInStatus === "LOGGED_IN") || user.id === adminId? 
                    <>
                        <Link to={`/pcbuilds/edit/${filteredBuild.id}`} style={{textDecoration: "none"}}>
                             <span><button class="btn btn-sm btn-warning" style={{marginLeft: "20px"}}>Edit Build</button></span>
                        </Link>
                        <button class="btn btn-sm btn-danger" style={{marginLeft: "20px"}} onClick= {(e) => {window.confirm("Are you sure you wish to delete this build?") && 
                        e.preventDefault();
                        fetch(`${fpsbuildsurl}/pcbuilds/${filteredBuild.id}.json`, 
                        { method: "DELETE",});
                        toast.dark("Deleting build.. ", {
                            position: toast.POSITION.TOP_CENTER
                          });
                          updateBuilds()
                        
                        }}>Delete Build</button>
                    </>
                        :
                        ""}
                    <p className="card-text"><small className="text-muted"> Build created <TimeAgo datetime={filteredBuild.created_at}/> by <Link to={`/profile/${filteredBuild.user_id}`}>{filteredBuild.username}</Link> </small></p>
                    </div>
                </div>
                </div>
                </div>
              ))}
           </div>    
           :
              ""     
                    
                    }
           </>
)}
MyBuilds.propTypes = {
    item: PropTypes.shape({
        attachment_url: PropTypes.string.isRequired
    })
}
export default MyBuilds;