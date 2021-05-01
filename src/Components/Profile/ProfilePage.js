import React, { useContext, useState, useEffect} from "react";
import { Context } from "../../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import {useParams, Link } from 'react-router-dom';
import MyBuilds from "./MyBuilds"
import Loader from 'react-loader-spinner'
function ProfilePage (){

const {user,adminId,loggedInStatus,fpsbuildsurl}=useContext(Context)
const {userId} = useParams()
const [profileUser, setProfileUser]  = useState()
useEffect(()=>{
  fetch(`${fpsbuildsurl}/users/` + userId + ".json")
  .then (res => res.json())
  .then (data => setProfileUser(data))
  console.log(profileUser)
},[])

return (
  <>
  {profileUser ? 
  
  <div>
    <div className="profile-container">
        <div className="row">
          <div className="col-xs-3 col-sm-3" >{profileUser.attachment_url ? <img src = {`${fpsbuildsurl}/${profileUser.attachment_url}`}  className="profile-img-avatar"/> : <Gravatar email={profileUser.email} size={100} className="profile-img-avatar" default="robohash" /> }</div>
          <div className="col-sm-9"><h1 className="profile-username" style={{fontFamily: "Viga"}}>{profileUser.username}</h1>
          <table className="profile-table">
            <tr className="profile-stats-row">
                  <div className="col-md-2" > {profileUser.pcbuilds.length} </div>
                  <div className="col-md-2" > {profileUser.likes.length} </div>
                  <div className="col-md-2" > {profileUser.favorites.length} </div>
                  <div className="col-md-2" > {profileUser.discussions.length}</div>
                  <div className="col-md-2" > {profileUser.posts.length} </div>
            </tr>
            <tr className="profile-statslabel-row">
                  <div className="col-md-2" > {profileUser.pcbuilds.length > 1 ? "Builds": "Build"} </div>
                  <div className="col-md-2" > {profileUser.likes.length > 1 || profileUser.likes.length === 0? "Likes": "Like"} </div>
                  <div className="col-md-2" > {profileUser.favorites.length > 1 || profileUser.favorites.length === 0 ? "Favorites" : "Favorite"}  </div>
                  <div className="col-md-2" > {profileUser.discussions.length > 1 || profileUser.discussions.length === 0? "Discussions" : "Discussion"} </div>
                  <div className="col-md-2" > {profileUser.posts.length > 1 || profileUser.posts.length === 0 ? "Posts" : "Post"} </div>
            </tr>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
          <div className="text-center">
          </div><hr></hr>
            <div className="panel panel-default">
              <div className="edit-div"> {(user.id === parseInt(userId) && loggedInStatus === "LOGGED_IN") || user.id === adminId ? 
                              <Link to={`/profile/edit/${userId}`} style={{textDecoration: "none"}}>
                                  <button className="edit-button">Edit Profile</button>
                              </Link>
                              :
                              ""}
              </div>              
              <div className="panel-heading">Member since: 
                <p>{new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      day: "2-digit",
                      month: "long"
                    }).format(new Date(profileUser.created_at))}
                </p><i className="fa fa-link fa-1x"></i>
              </div>
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
        
  </div>
  
  :
  <div className="discussions-detail-loading">
                <Loader
                    type="ThreeDots"
                    color="#B50000"
                    secondaryColor = "grey"
                    height={250}
                    width={250}
                    timeout={3000} //3 secs
                /> 
              </div>
              
  }
  </>
)}
export default ProfilePage;
