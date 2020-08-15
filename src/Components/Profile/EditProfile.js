import React, { useContext, useEffect} from "react";
import { Context } from "../../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { useHistory,useParams } from 'react-router-dom';



function EditProfile (){
const {user,loggedInStatus,users,allBuilds,posts,discussions,favorites,fpsbuildsurl}=useContext(Context)
const history = useHistory()
const {userId} = useParams()
const myBuilds = allBuilds.filter(build => build.user_id.toString() === userId)
const myPosts = posts.filter(post => post.user_id.toString() === userId)
const myLikes = myBuilds.map(build => build.likes).reduce((acc, likes) => acc +likes.length,0)
const myDiscussions = discussions.filter(discussion => discussion.user_id.toString() === userId)
const myFavorites = favorites.filter(favorite => favorite.user_id.toString() === userId)
const profileUser = users.filter(user => user.id.toString() === userId)
function updateProfileInfo(e) {
  const form = new FormData(document.getElementById("profileInfo"));
  fetch(`${fpsbuildsurl}/users/${user.id}`, {
    method: "PATCH",
    body: form,
  });
  e.preventDefault();
   window.location.reload(false);
   history.push("/profile")
}
function uploadAvatar(e) {
    const form = new FormData(document.getElementById("newAvatar"));
    fetch(`${fpsbuildsurl}/users/${user.id}`, {
      method: "PATCH",
      body: form,
    });
    e.preventDefault();
    window.location.reload(false);
}
return (
    <>
    {(user.id === parseInt(userId) && loggedInStatus === "LOGGED_IN") ? 
    <div>
        <hr></hr>
        {profileUser.map(profileUserData => 
        <div className="profile-container">
          <div className="row">
            <div className="col-xs-3 col-sm-3" >{profileUserData.attachment_url ? <img src = {`${fpsbuildsurl}/${profileUserData.attachment_url[0]}`}  className="profile-img-avatar"/> : <Gravatar email="1000-email@example.com" className="profile-img-avatar"/> }</div>
            <div className="col-sm-9"><h1 className="profile-username">{profileUserData.username}</h1>
            <table className="profile-table">
                <tr className="profile-stats-row">
                        <div className="col-md-2"> {profileUserData.pcbuilds.length} </div>
                        <div className="col-md-2"> {myLikes} </div>
                        <div className="col-md-2"> {myFavorites.length} </div>
                        <div className="col-md-2"> {myDiscussions.length}</div>
                        <div className="col-md-2"> {myPosts.length} </div>
                </tr>
                <tr className="profile-statslabel-row">
                        <div className="col-md-2"> {profileUserData.pcbuilds.length > 1 ? "Builds": "Build"} </div>
                        <div className="col-md-2"> {myLikes > 1 || myLikes === 0? "Likes": "Like"} </div>
                        <div className="col-md-2"> {myFavorites.length > 1 || myFavorites.length === 0 ? "Favorites" : "Favorite"}  </div>
                        <div className="col-md-2"> {myDiscussions.length > 1 || myDiscussions.length === 0? "Discussions" : "Discussion"} </div>
                        <div className="col-md-2"> {myPosts.length > 1 || myPosts.length === 0 ? "Posts" : "Post"} </div>
                </tr>
            </table>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
            <div className="text-center"></div>
            <hr></hr>
            <div className="panel panel-default">
                  <small>Upload your avatar...</small>
                        <form onSubmit={uploadAvatar} id="newAvatar">
                        <input 
                        type="file" 
                        id= "file_upload" 
                        name= "attachment" 
                        className=" center-block file-upload"/>
                        <input
                                type="submit"
                                value="Upload Avatar"
                                className="button is-danger"
                            />
                        </form>
                        <hr></hr>
                  <div className="panel-heading">Member since: 
                  <p> {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                      }).format(new Date(profileUserData.created_at))}
                  </p> 
                  <i className="fa fa-link fa-1x"></i></div>
                  <div className="panel-body"><a href="http://bootnipets.com"></a></div>
            </div>
            <ul className="list-group">
                <li className="list-group-item text-muted">Info <i className="fa fa-dashboard fa-1x"></i></li>
                <li className="list-group-item text-right"><span className="pull-left"></span>  </li>
            </ul> 
            </div>
            <div className="col-sm-9">
                <form className="form" onSubmit={updateProfileInfo}  id="profileInfo">
                  <div className="form-group">
                      <div className="col-xs-6">
                          <label for="first_name"><h4>First name</h4></label>
                          <input 
                          type="text" 
                          className="form-control" 
                          name="first_name" 
                          id="first_name" 
                          defaultValue={profileUserData.first_name}
                          placeholder={profileUserData.first_name} 
                          title="enter your first name..."/>
                      </div>
                  </div>
                  <div className="form-group">
                      
                      <div className="col-xs-6">
                        <label for="last_name"><h4>Last name</h4></label>
                          <input type="text" 
                          className="form-control" 
                          name="last_name" 
                          id="last_name" 
                          defaultValue={profileUserData.last_name}
                          placeholder={profileUserData.last_name} 
                          title="enter your last name if any..."/>
                      </div>
                  </div>
                  <div className="form-group">
                      
                      <div className="col-xs-6">
                          <label for="email"><h4>Email</h4></label>
                          <input type="email" 
                          className="form-control" 
                          name="email" 
                          id="email" 
                          defaultValue= {profileUserData.email}
                          placeholder={profileUserData.email} 
                          title="enter your email."/>
                      </div>
                  </div>
                  <div className="form-group">
                      
                      <div className="col-xs-6">
                          <label for="password"><h4>Password</h4></label>
                          <input type="password" 
                          className="form-control" 
                          name="password" 
                          id="password" 
                          placeholder="password" 
                          title="enter your password."/>
                      </div>
                  </div>
                  <div className="form-group">
                      
                      <div className="col-xs-6">
                        <label for="password2"><h4>Verify</h4></label>
                          <input 
                          type="password" 
                          className="form-control" 
                          name="password_confirmation" 
                          id="password_confirmation" 
                          placeholder="password2" 
                          title="enter your password2."/>
                      </div>
                  </div>
                  <div className="form-group">
                      <div className="col-xs-12">
                            <br></br>
                            <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                        </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
        :
        "You are not authorized to access this page.."}
    </>
  )}
export default EditProfile;
