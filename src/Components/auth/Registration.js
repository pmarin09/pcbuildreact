import React, { useState,useContext} from "react";
import axios from "axios";
import { Link, useHistory} from "react-router-dom";
import {Context} from "../../Context"
import mail from "../../icons/mail.png"
import pw from "../../icons/pw.png"
import displayname from "../../icons/displayname.png"

function Registration (){
  const{handleSuccessfulAuth,fpsbuildsurl, handleLogin,user} = useContext(Context)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const history = useHistory()
  
  
  // function handleSubmit(event) {

  //   axios
  //     .post(
  //       `${fpsbuildsurl}/users/`,
  //       {
  //         user: {
  //           username: username,
  //           email: email,
  //           password: password,
  //           password_confirmation: password_confirmation,
  //           first_name: null,
  //           last_name: null
  //         }
  //       },
  //       { withCredentials: true }
  //     )
  //     .then(response => {
  //       if (response.data.status === "created") {
  //         handleSuccessfulAuth(response.data);
  //       }
  //       history.push("/")
  //     })
  //     .catch(error => {
  //       console.log("registration error", error);
  //     });
  //   event.preventDefault();
  // }

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
        localStorage.setItem("token", data.jwt)
        handleLogin(data.user)
        history.push("/")
    })
    
    setUsername("")
    setPassword("")
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
            onChange={e => setUsername(e.target.value)} />
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
            onChange={e => setEmail(e.target.value)}/>
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
            onChange={e => setPassword(e.target.value)}/>
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
            onChange={e => setPasswordConfirmation(e.target.value)}/>
    </div>
                                       
    <div className="form-group">
        <button 
        type="submit" 
        className="btn btn-primary btn-block" > 
        Create Account  </button>
    </div>      
    <p className="text-center">Have an account? 
    <Link to="/signin">Sign in here</Link>{" "} </p>                                                                 
  </form>
  </article>
 </div>
 
       
    );
  

    



}

export default Registration;