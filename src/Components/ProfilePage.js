import React, { useContext,useState } from "react";
import { Context } from "../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
function ProfilePage (){

const {user, loggedInStatus,handleSuccessfulAuth,allBuilds}=useContext(Context)
const history = useHistory()
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password,setPassword] = useState("")
const [password_confirmation, setPasswordConfirmation] = useState("")


// function handleSubmit(event) {

//     axios
//       .patch(
//         `http://localhost:3000/users/${user.id}`,
//         {
//           user: {
//             username: username,
//             email: email,
//             password: password,
//             password_confirmation: password_confirmation
//           }
//         },
//         { withCredentials: true }
//       )
//       .then(response => {
//         if (response.data.status === "updated") {
//           handleSuccessfulAuth(response.data);
//         }
//         history.push("/")
//       })
//       .catch(error => {
//         console.log("registration error", error);
//       });
//     event.preventDefault();
//   }


  function uploadAvatar(e) {
    const form = new FormData(document.getElementById("newAvatar"));

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PATCH",
      body: form,
    });
    e.preventDefault();
    // window.location.reload(false);
  }
  
console.log (user)
  return (
<>



{(loggedInStatus === "LOGGED_IN") ?
<div>
<hr></hr>

<div className="container bootstrap snippet">
  <div className="row">
    <div className="col-sm-10"><h1>{user.username}</h1></div>
    <div className="col-sm-2">{user.attachment_url ? <img src = {`http://localhost:3000/${user.attachment_url}`}  className="img-avatar"/> : <Gravatar email="1000-email@example.com" /> }</div>
  </div>
  <div className="row">
    <div className="col-sm-3">

    <div className="text-center">
    {user.attachment_url ? <img src = {`http://localhost:3000/${user.attachment_url}`}  className="img-avatar"/> : <Gravatar email="1000-email@example.com"  className="img-avatar"/> }
      <hr></hr>
      <small>Upload your avatar...</small>
      <form onSubmit={uploadAvatar} id="newAvatar">
      <input 
      type="file" 
      id= "file_upload" 
      name= "attachment" 
      className="text-center center-block file-upload"/>
      <hr></hr>
      <input
            type="submit"
            value="Upload Avatar"
            className="button is-link"
          />
      </form>
    </div><hr></hr>
  
             
        <div className="panel panel-default">
          <div className="panel-heading">Member since: <TimeAgo datetime={user.created_at}/> <i className="fa fa-link fa-1x"></i></div>
          <div className="panel-body"><a href="http://bootnipets.com"></a></div>
        </div>
        
        
        <ul className="list-group">
          <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Builds</strong></span> {user.pcbuilds.length}</li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Likes</strong></span> </li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Discussions</strong></span> </li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Posts</strong></span></li>
        </ul> 
             
        <div className="panel panel-default">
          <div className="panel-heading">Social Media</div>
          <div className="panel-body">
            <i className="fa fa-facebook fa-2x"></i> <i className="fa fa-github fa-2x"></i> <i className="fa fa-twitter fa-2x"></i> <i className="fa fa-pinterest fa-2x"></i> <i className="fa fa-google-plus fa-2x"></i>
          </div>
        </div>
        
      </div>
    <div className="col-sm-9">
        <div className="tab-content">
          <div className="tab-pane active" id="home">
              <hr></hr>
                <form className="form" action="##"  id="updateForm">
                    <div className="form-group">
                        
                        <div className="col-xs-6">
                            <label for="first_name"><h4>First name</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any."/>
                        </div>
                    </div>
                    <div className="form-group">
                        
                        <div className="col-xs-6">
                          <label for="last_name"><h4>Last name</h4></label>
                            <input type="text" className="form-control" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any."/>
                        </div>
                    </div>
        
                    <div className="form-group">
                        
                        <div className="col-xs-6">
                            <label for="email"><h4>Email</h4></label>
                            <input type="email" className="form-control" name="email" id="email" placeholder={user.email} title="enter your email."/>
                        </div>
                    </div>
                    <div className="form-group">
                        
                        <div className="col-xs-6">
                            <label for="password"><h4>Password</h4></label>
                            <input type="password" className="form-control" name="password" id="password" placeholder="password" title="enter your password."/>
                        </div>
                    </div>
                    <div className="form-group">
                        
                        <div className="col-xs-6">
                          <label for="password2"><h4>Verify</h4></label>
                            <input type="password" className="form-control" name="password_confirmation" id="password_confirmation" placeholder="password2" title="enter your password2."/>
                        </div>
                    </div>
                    <div className="form-group">
                         <div className="col-xs-12">
                              <br></br>
                              <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                               <button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat"></i> Reset</button>
                          </div>
                    </div>
              </form>
            
            <hr></hr>
           </div>
            </div>
        </div>
      </div>
  </div>
  </div>
  : 
  history.push("/")}
  
  </>                                             
  ) 
};

export default ProfilePage;
