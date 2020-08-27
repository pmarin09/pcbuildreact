import React, { useContext,useState } from "react";
import { Link, useHistory} from "react-router-dom";
import {Context} from "../../Context"
import mail from "../../icons/mail.png"
import pw from "../../icons/pw.png"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Login (props){
  const{user, token,loggedInStatus,setLoggedInStatus,fpsbuildsurl,handleLogin,handleAuthClick} = useContext(Context)
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("") 
  const history = useHistory()
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
        history.push("/")
        }else{
        const token = null
        notify(token)
        }
    });
    setEmail("")
    setPassword("")
}

if(loggedInStatus === "NOT_LOGGED_IN"){
return (
 <div className="top">
   <ToastContainer
   autoClose={1500}
   />
    <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
    <article className="card-body mx-auto" style={{maxWidth: 400, height:350}}>
      <form className="sign-in" onSubmit={handleSubmit}>
          <div className="form-group input-group">
          <div className="input-group-prepend">
              <span className="input-group-text"> <img src ={mail}/> </span>
          </div>
              <input 
                  name="userEmail" 
                  className="form-control" 
                  placeholder="Email address" 
                  type="email"  
                  value={email}  
                  id="userEmail"
                  onChange = {e => setEmail(e.target.value)}
              />
          </div> 
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"> <img src ={pw}/>  </span>
            </div>
              <input 
                  className="form-control" 
                  placeholder="Your password" 
                  type="password" 
                  name="userPassword"
                  value={password}
                  id="userPassword"
                  onChange = {e => setPassword(e.target.value)}
              />
          </div>
          <div className="form-group">
              <button 
              type="submit" 
              className="btn btn-primary btn-block" >
              Sign In 
              </button>                          
          </div>
          <p className="text-center">Don't have an account? 
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              Sign up here
            </Link>{" "}
          </p>  
          <br />{" "}
            <Link to="forgotPassword" className="text-blue-500 hover:text-blue-600">
                  Forgot Password?
            </Link>                                                              
      </form>
      {/* <button onClick={handleAuthClick} className="ui button">Access Authorized Route</button> */}
    </article>
  </div>
);
  } else {
    return(
      <div>
        You are already logged in...
      </div>
    )
  }
}
export default Login;