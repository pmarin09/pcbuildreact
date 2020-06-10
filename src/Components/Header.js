import React,{useContext,useEffect} from "react"
import headerImage from "../icons/header.png"
import {Link} from "react-router-dom"
import {Context} from "../Context"

function Header(){
  const{user} = useContext(Context)
  const{checkLoginStatus} = useContext(Context)
  const{handleLogoutClick} = useContext(Context)
  const{loggedInStatus} = useContext(Context)
  useEffect(()=>{
 checkLoginStatus()
},[])

if(loggedInStatus === "LOGGED_IN"){
    return (
        <header>
  <div className="navbar navbar-light bg-light shadow-sm">
              <div className="navbar-brand d-flex align-items-center">
                <img className="header-icon"  src= {headerImage}/> 
                  <strong>PC Build App</strong>
              </div>
              <div className="navbar-start">
             
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <Link to="/" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Home</span></Link>
                    <Link to="/" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only" >Home</span></Link>
              </a>
              <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <Link to="/profile" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Profile</span></Link>
                    <Link to="/profile" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only">Profile</span></Link>
              </a>
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <Link to="/favorites" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Favorites</span></Link>
                    <Link to="/favorites" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only">Favorites</span></Link>
              </a>
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <Link to="/discussions" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Forum</span></Link>
                    <Link to="/discussions" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only">Forum</span></Link>
              </a>
              <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <Link to="/pcbuilds" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Create Build</span></Link>
                    <Link to="/pcbuilds" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only">Create Build</span></Link>
              </a>
              
              <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <button onClick={() => handleLogoutClick()}>Logout</button>
              </a>
        </div>
      </div>
    </header>
    )
    } else {
      return (
        <header>
        <div className="navbar navbar-light bg-light shadow-sm">
              <div className="navbar-brand d-flex align-items-center">
                <img className="header-icon"  src= {headerImage}/> 
                  <strong>PC Build App</strong>
              </div>
              <div className="navbar-start">
             
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <Link to="/" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Home</span></Link>
                    <Link to="/" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only" >Home</span></Link>
              </a>
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <Link to="/discussions" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Forum</span></Link>
                    <Link to="/discussions" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only">Forum</span></Link>
              </a>
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <Link to="/register" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Sign Up</span></Link>
                    <Link to="/register" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only">Sign Up</span></Link>
              </a>
                <a className="navbar-item bd-navbar-item-documentation  is-active">
                    <span className="icon has-text-primary">
                      {/* <svg className="svg-inline--fa fa-book fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="book" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z"></path></svg><!-- <i className="fas fa-book"></i> --> */}
                    </span>
                    <Link to="/signin" style={{textDecoration: "none"}}><span className="is-hidden-touch is-hidden-widescreen">Log In</span></Link>
                    <Link to="/signin" style={{textDecoration: "none"}}><span className="is-hidden-desktop-only">Log In</span></Link>
              </a>
        </div>
      </div>
    </header>
    )
      }
}

export default Header;