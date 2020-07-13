import React, { useContext, useEffect} from "react";
import { Context } from "../../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { useHistory,useParams } from 'react-router-dom';



function EditProfile (){

const {user,users}=useContext(Context)
const history = useHistory()
const {userId} = useParams()
const profileUser = users.filter(user => user.id.toString() === userId)

function updateProfileInfo(e) {
  const form = new FormData(document.getElementById("profileInfo"));

  fetch(`http://localhost:3000/users/${user.id}`, {
    method: "PATCH",
    body: form,
  });
  e.preventDefault();
   window.location.reload(false);
   history.push("/profile")
}
function uploadAvatar(e) {
    const form = new FormData(document.getElementById("newAvatar"));

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      body: form,
    });
    e.preventDefault();
    window.location.reload(false);
}

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
    

  )}

export default EditProfile;
