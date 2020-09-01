import React, { useState,useContext} from "react";
import axios from "axios";
import { Link, useHistory} from "react-router-dom";
import {Context} from "../../Context"
import mail from "../../icons/mail.png"
import pw from "../../icons/pw.png"
import displayname from "../../icons/displayname.png"
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Registration (){
  const{setLoggedInStatus,token,fpsbuildsurl, handleLogin,user,updateUsers} = useContext(Context)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const history = useHistory()
  function notify(token) {
    if(!token){
      toast.error("Registration error. Please try again", {
        position: toast.POSITION.TOP_CENTER
      });
      setLoggedInStatus("NOT_LOGGED_IN")
    }else if(token){
    setUsername("")
    setPassword("")
     setLoggedInStatus("LOGGED_IN")
     toast.dark("Welcome to FPS Builds! ", {
      position: toast.POSITION.TOP_CENTER
    });
    }
  }
  const handleSubmit = (evt) => {
    evt.preventDefault()
    fetch(`${fpsbuildsurl}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password,
            password_confirmation
            
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
        setTimeout(() =>{ 
          history.push("/")
          updateUsers()
        },1700)
        }else{
        const token = null
        notify(token)
        }
    });
  }
return (
  <div className="create-account">
    <article className="card-body mx-auto" style={{maxWidth: 400}}>
      <h4 className="card-title mt-3 text-center">Create Account</h4>
      <p className="text-center">Join our PC Build community!</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group input-group">
            <div className="input-group-prepend">
                <span className="input-group-text"> <img src ={displayname}/> </span>
            </div>
                <input 
                    name="username" 
                    value = {username} 
                    className="form-control" 
                    placeholder="Username" 
                    type="text" id="Username" 
                    onChange={e => setUsername(e.target.value)} 
                    required
                />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
                <span className="input-group-text"> <img src ={mail}/> </span>
            </div>
              <input 
                name="email" 
                className="form-control" 
                placeholder="Email address" 
                type="email"  
                value={email}  
                id="userEmail"
                onChange={e => setEmail(e.target.value)}
                required
              />
          </div> 
          <div className="form-group input-group">
            <div className="input-group-prepend">
                <span className="input-group-text"> <img src ={pw}/> </span>
            </div>
              <input 
                className="form-control" 
                placeholder="Create password" 
                type="password" 
                name="password"
                value={password}
                id="password"
                onChange={e => setPassword(e.target.value)}
                required
              />
          </div>
          <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <img src ={pw}/> </span>
              </div>
              <input 
                className="form-control" 
                placeholder="Re-enter your password" 
                type="password" 
                name="password_confirmation"
                value={password_confirmation}
                id="password_confirmation"
                onChange={e => setPasswordConfirmation(e.target.value)}
                required
              />
          </div>
          <div className="form-group">
                <button 
                type="submit" 
                className="btn btn-primary btn-block" > 
                Create Account  </button>
          </div>      
          <p className="text-center">Have an account? 
            <Link to="/signin">Sign in here</Link>{" "} 
          </p>                                                               
        </form>
    </article>
  </div>
    );
}
export default Registration;