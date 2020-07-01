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
      "http://localhost:3000/sessions",
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

if(loggedInStatus === "LOGGED_IN"){
    return (
        <header>
  <div className="pc-navbar">
              <div className="navbar-brand d-flex align-items-center">
                <img className="header-icon"  src= {headerImage}/> 
                  <strong className= "app-title">PC Build App</strong>
              </div>
              <div className="navbar-start">
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      <img src={home}/>
                    </span>
                    <Link to="/" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen"> Home</span></Link>
                    <Link to="/" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only" > Home</span></Link>
              </a>
              <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                    <img src={create}/>
                    </span>
                    <Link to="/allbuilds" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen"> All Builds</span></Link>
                    <Link to="/allbuilds" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only"> All Builds</span></Link>
              </a>
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                    <img src= {favorite}/>
                    </span>
                    <Link to="/favorites" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen"> Favorites</span></Link>
                    <Link to="/favorites" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only"> My Favorites</span></Link>
              </a>
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                    <img src={forum}/>
                    </span>
                    <Link to="/discussions" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen"> Forum</span></Link>
                    <Link to="/discussions" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only"> Forum</span></Link>
              </a>
              <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                    <img src={createbuild}/>
                    </span>
                    <Link to="/pcbuilds" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen"> Create Build</span></Link>
                    <Link to="/pcbuilds" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only"> Create Build</span></Link>
              </a>
              

              <div className="profile-div" >
                    <span className="profile">
                    {user.attachment_url ? <img src = {`http://localhost:3000/${user.attachment_url}`}  className="profile-avatar"/> : <Gravatar email="1000-email@example.com" /> }
                    </span>
                    <Link to="/profile" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen"> {user.email}</span></Link>
                    <Link to="/profile" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only"> {user.email}</span></Link>
                    <span className="logout-span">
                    <img src={logout}/>
                    </span>
                    <Link onClick={() => handleLogoutClick()} style={{textDecoration: "none"}}>Logout</Link>
              </div>
        </div>
      </div>
    </header>
    )
    } else {
      return (
        <header>
        <div className="pc-navbar">
              <div className="navbar-brand d-flex align-items-center">
                <img className="header-icon"  src= {headerImage}/> 
                <strong className= "app-title">PC Build App</strong>
              </div>
              <div className="navbar-loggedout-start">
              <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      <img src={home}/>
                    </span>
                    <Link to="/" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen"> Home</span></Link>
                    <Link to="/" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only" > Home</span></Link>
              </a>
              <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                    <img src={create}/>
                    </span>
                    <Link to="/allbuilds" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen"> All Builds</span></Link>
                    <Link to="/allbuilds" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only"> All Builds</span></Link>
              </a>
              <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                    <img src={forum}/>
                    </span>
                    <Link to="/discussions" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen"> Forum</span></Link>
                    <Link to="/discussions" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only"> Forum</span></Link>
              </a>
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                    <img src={register}/>
                    </span>
                    <Link to="/register" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Sign Up</span></Link>
                    <Link to="/register" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only">Sign Up</span></Link>
              </a>
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
                            <small><Link to = "/forgotPassword"> Forgot Password? </Link></small>
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
      </div>
    </header>
    )
      }
}

export default Header;