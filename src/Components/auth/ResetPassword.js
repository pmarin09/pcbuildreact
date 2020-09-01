import React, { useState, useContext} from 'react';
import mail from "../../icons/mail.png"
import pw from "../../icons/pw.png"
import tokencode from "../../icons/token.png"
import {Context} from "../../Context"
import {toast} from 'react-toastify';
import { useHistory } from 'react-router-dom';
function ResetPassword(){
const{fpsbuildsurl} = useContext(Context)
const [email, setEmail] = useState("")
const [token, setToken] = useState("")
const [password, setPassword] = useState("")
const [password_confirmation, setPasswordConfirmation] = useState("")
const history = useHistory()
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }
function resetPassword(e) {
    e.preventDefault();
    const form = new FormData(document.getElementById("resetPassword"));
    fetch(`${fpsbuildsurl}/reset_password`, {
     credentials: "include",
      method: "POST",
      body: form,
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      console.log("Success",data)
      toast.info("Your password has been reset, please log in", {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout( () => history.push("/signin"),1000)
    })
    .catch((error) => {
      console.error("Error", error)
      toast.error("Invalid token or password confirmation. Please try again..  ", {
        position: toast.POSITION.TOP_CENTER
      });
    })
}
return (
    <div className="top">
        <article className="card-body mx-auto" style={{maxWidth: 400, margin:"20px"}}>
            <h4 className="card-title mt-3 text-center">Reset Password</h4>
            <form onSubmit={resetPassword} id= "resetPassword">
                <div className="form-group input-group">
                <p><small><em>The code that was emailed to you. This is case-sensitive.</em></small></p>
                <div className="input-group-prepend">
                    <span className="input-group-text"> <img src ={tokencode}/> </span>
                </div>
                <input 
                    name="token" 
                    value = {token} 
                    className="form-control" 
                    placeholder="Enter token..." 
                    type="text" id="token" 
                    onChange={e => setToken(e.target.value)} 
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
                    placeholder="Enter new password" 
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
                        Reset 
                    </button>
                </div>  
            </form>
        </article>
    </div>
    )
}
export default ResetPassword;