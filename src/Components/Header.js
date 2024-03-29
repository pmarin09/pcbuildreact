import React,{useContext,useEffect, useState} from "react"
import headerImage from "../icons/logo.webp"
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
import newbuild from "../icons/newbuild.png"
import managebuild from "../icons/createbuild.png"
import security from "../icons/security.png"
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function Header(){
  const{user,loggedInStatus,token,setLoggedInStatus,handleLogin,handleAuthClick,handleLogoutClick,fpsbuildsurl} = useContext(Context)
  const history = useHistory()
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("") 

  function notify (token){
    if(!token){
      toast.error("Incorrect e-mail and/or password. Please try again", {
        position: toast.POSITION.TOP_CENTER
      });
    }else if(token){
    toast.dark("Logged In  ✔️ ", {
      position: toast.POSITION.TOP_CENTER
    });
    setLoggedInStatus("LOGGED_IN")
    }
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
    fetch(`${fpsbuildsurl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(resp => resp.json())
    .then(data => {
        handleLogin(data.user)
        localStorage.setItem("token", data.jwt)
        console.log(data.jwt)
        if(data.jwt){
        const token = localStorage.getItem("token")
        notify(token)
        }else{
        const token = null
        notify(token)
        }
    });
    setEmail("")
    setPassword("")
}
console.log(user)
  function toggleNavMenu() {
    const x = document.getElementById("pc-nav");
    x.classList.toggle("responsive");
  }
  const theLinks = document.querySelectorAll(".pcnavbar-item");
  const x = document.getElementById("pc-nav");
        theLinks.forEach(link => link.addEventListener("click", ()=>{
        x.classList.remove("responsive");
  }))
  if(loggedInStatus === "LOGGED_IN"  && user){
    return (
      <>
      <ToastContainer 
        autoClose={1700}
      />
      <div className="pcbuildapp-navbar" id="pc-navbar">
                  <img className="header-icon"  src= {headerImage}/> 
                <div className="pcnavbar-start" id="pc-nav">
                  <a className="pcnavbar-item">
                      <Link to="/" style={{textDecoration: "none"}}>
                        <span className="pcnavbar-icon"><img src={home}/></span>
                        <span className="pcnavbar-text"> Home</span>
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
                        <span className="pcnavbar-icon"><img src={newbuild}/></span>
                        <span className="pcnavbar-text"> New Build</span>
                      </Link>
                </a>
                <a className="pcnavbar-item">
                      <Link to={`/profile/${user.id}`} style={{textDecoration: "none"}}>
                        <span className="pcnavbar-icon"><img src={managebuild}/></span>
                        <span className="pcnavbar-text"> Manage My Builds</span>
                      </Link>
                </a>
                      <a className="profile-div">
                      <Link to={`/profile/edit/${user.id}`}>
                      {user.attachment_url ? <img src = {`${fpsbuildsurl}/${user.attachment_url}`}  className="profile-avatar"/> : <Gravatar email={user.email}className="profile-avatar" size={100} default="robohash"/> }
                      <span> <em><small>{user.username}</small></em></span>
                      </Link>
                      <span className="logout-span"><Link onClick={() => handleLogoutClick()} style={{textDecoration: "none"}}><img src={logout}/> <em><small>Logout</small></em></Link></span>
                      </a>
                <a href="javascript: void(0)" className="icon" onClick={toggleNavMenu}>
                <i className="ri-menu-line ri-xl"></i>
                </a>
          </div>
      </div>
      </>
    )
  }else if(loggedInStatus === "NOT_LOGGED_IN") {
    return (
      <>
      <ToastContainer 
      autoClose={1700}
      />
        <div className="pcbuildapp-navbar" id="pc-navbar">
          <img className="header-icon"  src= {headerImage}/> 
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
                      className="btn btn-primary btn-block"
                      >
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
      </>
    )
  }
}
export default Header;