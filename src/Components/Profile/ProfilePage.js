import React, { useContext, useEffect} from "react";
import { Context } from "../../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { useHistory,useParams, Link } from 'react-router-dom';
import MyBuilds from "./MyBuilds"
function ProfilePage (){

const {user,loggedInStatus,users,allBuilds,posts,discussions,favorites}=useContext(Context)
const history = useHistory()
const {userId} = useParams()
const profileUser = users.filter(user => user.id.toString() === userId)
const myBuilds = allBuilds.filter(build => build.user_id.toString() === userId)
const myPosts = posts.filter(post => post.user_id.toString() === userId)
const myLikes = myBuilds.map(build => build.likes).reduce((acc, likes) => acc +likes.length,0)
const myDiscussions = discussions.filter(discussion => discussion.user_id.toString() === userId)
const myFavorites = favorites.filter(favorite => favorite.user_id.toString() === userId)
console.log(myDiscussions)

  return (

<div>
  
<hr></hr>
{profileUser.map(profileUserData => 
<div className="profile-container">
  <div className="row">
     <div className="col-xs-3 col-sm-3" >{profileUserData.attachment_url ? <img src = {`http://localhost:3000/${profileUserData.attachment_url}`}  className="profile-img-avatar"/> : <Gravatar email="1000-email@example.com" /> }</div>
    <div className="col-sm-9"><h1 className="profile-username">{profileUserData.username}</h1>
      <div className="profile-stats-row">
            <div className="col-md-2"> {profileUserData.pcbuilds.length} </div>
            <div className="col-md-2"> {myLikes} </div>
            <div className="col-md-2"> {myFavorites.length} </div>
            <div className="col-md-2"> {myDiscussions.length}</div>
            <div className="col-md-2"> {myPosts.length} </div>
      </div>
      <div className="profile-statslabel-row">
            <div className="col-md-2"> {profileUserData.pcbuilds.length > 1 ? "Builds": "Build"} </div>
            <div className="col-md-2"> {myLikes > 1 || myLikes === 0? "Likes": "Like"} </div>
            <div className="col-md-2"> {myFavorites.length > 1 || myFavorites.length === 0 ? "Favorites" : "Favorite"}  </div>
            <div className="col-md-2"> {myDiscussions.length > 1 || myDiscussions.length === 0? "Discussions" : "Discussion"} </div>
            <div className="col-md-2"> {myPosts.length > 1 || myPosts.length === 0 ? "Posts" : "Post"} </div>
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
          <div className="panel-heading">Member since: 
          <p>{new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          day: "2-digit",
          month: "long"
          
        }).format(new Date(profileUserData.created_at))}</p><i className="fa fa-link fa-1x"></i></div>
          <div className="panel-body"><a href="http://bootnipets.com"></a></div>
        </div>
        
        
        <ul className="list-group">
          <li className="list-group-item text-muted">Info <i className="fa fa-dashboard fa-1x"></i></li>
          
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
