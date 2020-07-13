import React, { useContext, useEffect} from "react";
import { Context } from "../../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { useHistory,useParams, Link } from 'react-router-dom';
import MyBuilds from "./MyBuilds"
function ProfilePage (){

const {user,loggedInStatus,users}=useContext(Context)
const history = useHistory()
const {userId} = useParams()
const profileUser = users.filter(user => user.id.toString() === userId)


console.log(userId)
  return (


<div>
  
<hr></hr>
{profileUser.map(profileUserData => 
<div className="profile-container">
  <div className="row">
     <div className="col-xs-3 col-sm-3" >{profileUserData.attachment_url ? <img src = {`http://localhost:3000/${profileUserData.attachment_url}`}  className="profile-img-avatar"/> : <Gravatar email="1000-email@example.com" /> }</div>
    <div className="col-sm-9"><h1 className="profile-username">{profileUserData.username}</h1>
    <div className="profile-stats-row">
          <div className="col-md-3"> 10 </div>
          <div className="col-md-3"> 20 </div>
          <div className="col-md-3"> 5 </div>
          <div className="col-md-3"> 40 </div>
        </div>
      <div className="profile-statslabel-row">
          <div className="col-md-3"> Builds </div>
          <div className="col-md-3"> Likes </div>
          <div className="col-md-3"> Favorites </div>
          <div className="col-md-3"> Posts </div>
        </div>
    </div>
  </div>
  <div className="row">
    <div className="col-sm-3">
      
    <div className="text-center">
      
    </div><hr></hr>
  
             
        <div className="panel panel-default">

       <div className="edit-div"> {(user.id === parseInt(userId) && loggedInStatus === "LOGGED_IN") ? 
                        <Link to={`/profile/edit/${userId}`} style={{textDecoration: "none"}}>
                             <button class="edit-button">Edit Profile</button>
                        </Link>
                        :
                        ""}
          </div>              
          <div className="panel-heading">Member since: <TimeAgo datetime={profileUserData.created_at}/> <i className="fa fa-link fa-1x"></i></div>
          <div className="panel-body"><a href="http://bootnipets.com"></a></div>
        </div>
        
        
        <ul className="list-group">
          <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Builds</strong></span>  </li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Likes</strong></span> </li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Discussions</strong></span> </li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Posts</strong></span></li>
        </ul> 
         </div>
         <div className="col-sm-9">
         <MyBuilds />
          </div>
      </div>
    </div>
    )}
  </div>
    
 
)}
export default ProfilePage;
