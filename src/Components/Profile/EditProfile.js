import React, {useContext, useState,useEffect} from "react";
import { Context } from "../../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { useHistory,useParams } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'react-loader-spinner'
import ProfilePage from './ProfilePage'

function EditProfile (){
const {adminId,loggedInStatus,updateUsers,fpsbuildsurl,user}=useContext(Context)
const history = useHistory()
const {userId} = useParams()
const [profileUser, setProfileUser]  = useState()
useEffect(()=>{
  fetch(`${fpsbuildsurl}/users/` + userId + ".json")
  .then (res => res.json())
  .then (data => setProfileUser(data))
  console.log(profileUser)
},[])

function updateProfileInfo(e) {
  const form = new FormData(document.getElementById("profileInfo"));
  fetch(`${fpsbuildsurl}/users/${userId}`, {
    method: "PATCH",
    body: form,
  });
  e.preventDefault();
  toast.success("Updating profile... ", {
    position: toast.POSITION.TOP_CENTER
  });
  updateUsers()
}
function uploadAvatar(e) {
    e.preventDefault();
    const form = new FormData(document.getElementById("newAvatar"));
    fetch(`${fpsbuildsurl}/users/${userId}`, {
      method: "PATCH",
      body: form,
    });
    toast.success("Uploading avatar... ", {
      position: toast.POSITION.TOP_CENTER
    });
    updateUsers()
    setTimeout( () => window.location.reload(false),1500)
}
console.log(profileUser)
return (
 
    <>
    {( user && profileUser && user.id === parseInt(userId) && loggedInStatus === "LOGGED_IN") || user.id === adminId  ? 
    <div>
        <hr></hr>
        <div className="profile-container">
          <div className="row">
            <div className="col-xs-3 col-sm-3" >{profileUser.attachment_url ? <img src = {`${fpsbuildsurl}/${profileUser.attachment_url}`}  className="profile-img-avatar"/> : <Gravatar email={profileUser.email} size={100} className="profile-img-avatar" default="robohash"/> }</div>
            <div className="col-sm-9"><h1 className="profile-username">{profileUser.username}</h1>
            <table className="profile-table">
                <tr className="profile-stats-row">
                        <div className="col-md-2" style= {{fontWeight: "bold"}}> {profileUser.pcbuilds.length} </div>
                        <div className="col-md-2" style= {{fontWeight: "bold"}}> {profileUser.likes.length} </div>
                        <div className="col-md-2" style= {{fontWeight: "bold"}}> {profileUser.favorites.length} </div>
                        <div className="col-md-2" style= {{fontWeight: "bold"}}> {profileUser.discussions.length}</div>
                        <div className="col-md-2" style= {{fontWeight: "bold"}}> {profileUser.posts.length} </div>
                </tr>
                <tr className="profile-statslabel-row">
                        <div className="col-md-2"> {profileUser.pcbuilds.length > 1 ? "Builds": "Build"} </div>
                        <div className="col-md-2"> {profileUser.likes.length > 1 || profileUser.likes.length === 0? "Likes": "Like"} </div>
                        <div className="col-md-2"> {profileUser.favorites.length > 1 || profileUser.favorites.length === 0 ? "Favorites" : "Favorite"}  </div>
                        <div className="col-md-2"> {profileUser.discussions.length > 1 || profileUser.discussions.length === 0? "Discussions" : "Discussion"} </div>
                        <div className="col-md-2"> {profileUser.posts.length > 1 || profileUser.posts.length === 0 ? "Posts" : "Post"} </div>
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
                      }).format(new Date(profileUser.created_at))}
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
                          defaultValue={profileUser.first_name}
                          placeholder={profileUser.first_name} 
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
                          defaultValue={profileUser.last_name}
                          placeholder={profileUser.last_name} 
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
                          defaultValue= {profileUser.email}
                          placeholder={profileUser.email} 
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
      </div>
        :
        <div className="loading">
        <Loader
          type="TailSpin"
          color="#B50000"
          secondaryColor = "grey"
          height={250}
          width={250}
          timeout={2000} //3 secs
        /> 
      </div>
    }
    </>

  )}
export default EditProfile;
