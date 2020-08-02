import React,{useContext,useEffect, useState} from "react"
import headerImage from "../icons/header.png"
import {Link, useHistory} from "react-router-dom"
import {Context} from "../Context"
import Gravatar from 'react-gravatar'
import home from "../icons/home.png"
import profile from "../icons/profile.png"
import forum from "../icons/forum.png"
import create from "../icons/create.png"
import favorite from "../icons/favorite.png"
import logout from "../icons/logout.png"
import register from "../icons/register.png"
import createbuild from "../icons/createbuild.png"
import security from "../icons/security.png"
import axios from "axios"

function Header(){
  const{user, checkLoginStatus, handleLogoutClick,loggedInStatus, handleSuccessfulAuth} = useContext(Context)
  const history = useHistory()
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("") 
  useEffect(()=>{
 checkLoginStatus()
},[])

function handleSubmit(event) {
  axios
    .post(
      "https://fpsbuilds-back-staging.herokuapp.com/sessions",
      {
        user: {
          email: email,
          password: password
        }
      },
      { withCredentials: true }
    )
    .then(response => {
      if (response.data.logged_in) {
        handleSuccessfulAuth(response.data);
      }
      console.log(user)
      history.push("/");
    })
    .catch(error => {
      console.log("login error", error);
    });
  event.preventDefault();
}


function toggleNavMenu() {
  const x = document.getElementById("pc-nav");
  x.classList.toggle("responsive");
}
const theLinks = document.querySelectorAll(".pcnavbar-item");
const x = document.getElementById("pc-nav");
theLinks.forEach(link => link.addEventListener("click", ()=>{
  x.classList.remove("responsive");
}))

if(loggedInStatus === "LOGGED_IN"){
    return (
        
  <div className="pcbuildapp-navbar" id="pc-navbar">
                <img className="header-icon"  src= {headerImage}/> 
                  <strong className= "app-title">FPS Builds</strong>
              <div className="pcnavbar-start" id="pc-nav">
                <a className="pcnavbar-item">
                    <Link to="https://fpsbuilds-back-staging.herokuapp.com/" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src={home}/></span>
                      <span className="pcnavbar-text" > Home</span>
                    </Link>
              </a>
              <a className="pcnavbar-item">
                    <Link to="/allbuilds" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src={create}/></span>
                      <span className="pcnavbar-text"> All Builds</span>
                    </Link>
              </a>
                <a className="pcnavbar-item">
                    <Link to="/favorites" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src= {favorite}/></span>
                      <span className="pcnavbar-text"> My Favorites</span>
                    </Link>
                </a>
                <a className="pcnavbar-item">
                    <Link to="/discussions" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src={forum}/></span>
                      <span className="pcnavbar-text"> Forum</span>
                    </Link>
              </a>
              <a className="pcnavbar-item">
                    <Link to="/pcbuilds" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src={createbuild}/></span>
                      <span className="pcnavbar-text"> Create Build</span>
                    </Link>
              </a>
                    <a className="profile-div">
                    <Link to={`/profile/${user.id}`}>
                    {user.attachment_url ? <img src = {`https://fpsbuilds-back-staging.herokuapp.com/${user.attachment_url}`}  className="profile-avatar"/> : <Gravatar email="1000-email@example.com" className="profile-avatar" /> }
                    <span> <em><small>{user.username}</small></em></span>
                    </Link>
                    <span className="logout-span"><Link onClick={() => handleLogoutClick()} style={{textDecoration: "none"}}><img src={logout}/> <em><small>Logout</small></em></Link></span>
                    </a>
                    
              <a href="javascript: void(0)" className="icon" onClick={toggleNavMenu}>
              <i className="ri-menu-line ri-xl"></i>
              </a>
        </div>

        
      </div>

  
    )
    } else {
      return (
       
          <div className="pcbuildapp-navbar" id="pc-navbar">
                <img className="header-icon"  src= {headerImage}/> 
                <strong className= "app-title">FPS Builds</strong>
              <div className="pcnavbar-start" id="pc-nav">
              
              <a className="pcnavbar-item">
                    <Link to="/" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src={home}/></span>
                      <span className="pcnavbar-text" > Home</span>
                    </Link>
              </a>
              
              <a className="pcnavbar-item">
                    <Link to="/allbuilds" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src={create}/></span>
                      <span className="pcnavbar-text"> All Builds</span>
                    </Link>
              </a>
              <a className="pcnavbar-item">
                    <Link to="/discussions" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src={forum}/></span>
                      <span className="pcnavbar-text"> Forum</span>
                    </Link>
              </a>
                <a className="pcnavbar-item">
                    <Link to="/register" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src={register}/></span>
                      <span className="pcnavbar-text">Sign Up</span>
                    </Link>
              </a>

              <a className="login">
                    <Link to="/signin" style={{textDecoration: "none"}}>
                      <span className="pcnavbar-icon"><img src={security}/></span>
                      <span className="pcnavbar-text">Log In</span>
                    </Link>
              </a>
              
               <div className="login-div">
                <form className="header-sign-in" onSubmit={handleSubmit}>
                  <div className="header-login-form">
                      <div>
                        <input 
                            name="userEmail" 
                            className="form-control" 
                            placeholder="Email address" 
                            type="email"  
                            value={email}  
                            id="userEmail"
                            onChange = {e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <input 
                            className="form-control" 
                            placeholder="Your password" 
                            type="password" 
                            name="userPassword"
                            value={password}
                            id="userPassword"
                            onChange = {e => setPassword(e.target.value)}/>
                            <Link to = "/forgotPassword"> <small><em>Forgot Password?</em></small> </Link>
                    </div>
                    <div>
                        <button 
                        type="submit" 
                        className="btn btn-primary btn-block" >
                        Sign In 
                        </button>                          
                      </div>
                  </div>
                  <div></div>
                </form>
                </div>
                <a href="javascript:void(0);" className="icon" onClick={toggleNavMenu}>
              <i className="ri-menu-line ri-xl"></i>
              </a>
                
            </div>
            
          </div>
      
    )
      }
}

export default Header;