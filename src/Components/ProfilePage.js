import React, { useContext } from "react";
import { Context } from "../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { useHistory } from 'react-router-dom';
function ProfilePage (){

const {user}=useContext(Context)
const{loggedInStatus} = useContext(Context)
const history = useHistory()

  

  return (
<>



{(loggedInStatus === "LOGGED_IN") ?
<div>
<hr></hr>

<div className="container bootstrap snippet">
  <div className="row">
    <div className="col-sm-10"><h1>{user.username}</h1></div>
    <div className="col-sm-2"><Gravatar email="e-991email@example.com" size={100} className="img-avatar"/></div>
  </div>
  <div className="row">
    <div className="col-sm-3">

    <div className="text-center">
    <Gravatar email="e-991email@example.com" size={150} className="img-avatar"/>
      <hr></hr>
      <small>Upload a different photo...</small>
      <input type="file" className="text-center center-block file-upload"/>
    </div><hr></hr>

             
        <div className="panel panel-default">
          <div className="panel-heading">Member since: <TimeAgo datetime={user.created_at}/> <i className="fa fa-link fa-1x"></i></div>
          <div className="panel-body"><a href="http://bootnipets.com"></a></div>
        </div>
        
        
        <ul className="list-group">
          <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Builds</strong></span> 125</li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Likes</strong></span> 13</li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Discussions</strong></span> 37</li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Posts</strong></span> 78</li>
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
                <form className="form" action="##" method="post" id="registrationForm">
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
                            <input type="password" className="form-control" name="password2" id="password2" placeholder="password2" title="enter your password2."/>
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
           <div className="tab-pane" id="messages">
             
             <h2></h2>
             
             <hr></hr>
                <form className="form" action="##" method="post" id="registrationForm">
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
                            <label for="phone"><h4>Phone</h4></label>
                            <input type="text" className="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any."/>
                        </div>
                    </div>
        
                    <div className="form-group">
                        <div className="col-xs-6">
                           <label for="mobile"><h4>Mobile</h4></label>
                            <input type="text" className="form-control" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any."/>
                        </div>
                    </div>
                    <div className="form-group">
                        
                        <div className="col-xs-6">
                            <label for="email"><h4>Email</h4></label>
                            <input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email."/>
                        </div>
                    </div>
                    <div className="form-group">
                        
                        <div className="col-xs-6">
                            <label for="email"><h4>Location</h4></label>
                            <input type="email" className="form-control" id="location" placeholder="somewhere" title="enter a location"/>
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
                            <input type="password" className="form-control" name="password2" id="password2" placeholder="password2" title="enter your password2."/>
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
             
           </div>
           <div className="tab-pane" id="settings">
              
               
                <hr></hr>
                <form className="form" action="##" method="post" id="registrationForm">
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
                            <label for="phone"><h4>Phone</h4></label>
                            <input type="text" className="form-control" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any."/>
                        </div>
                    </div>
        
                    <div className="form-group">
                        <div className="col-xs-6">
                           <label for="mobile"><h4>Mobile</h4></label>
                            <input type="text" className="form-control" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any."/>
                        </div>
                    </div>
                    <div className="form-group">
                        
                        <div className="col-xs-6">
                            <label for="email"><h4>Email</h4></label>
                            <input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email."/>
                        </div>
                    </div>
                    <div className="form-group">
                        
                        <div className="col-xs-6">
                            <label for="email"><h4>Location</h4></label>
                            <input type="email" className="form-control" id="location" placeholder="somewhere" title="enter a location"/>
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
                            <input type="password" className="form-control" name="password2" id="password2" placeholder="password2" title="enter your password2."/>
                        </div>
                    </div>
                    <div className="form-group">
                         <div className="col-xs-12">
                              <br></br>
                              <button className="btn btn-lg btn-success pull-right" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                               <button className="btn btn-lg" type="reset"><i className="glyphicon glyphicon-repeat"></i> Reset</button>
                          </div>
                    </div>
              </form>
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
