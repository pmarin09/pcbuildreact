import React, { useState} from 'react';
import mail from "../../icons/mail.png"
import pw from "../../icons/pw.png"
import tokencode from "../../icons/token.png"
function ResetPassword(){

const baseURL = "http://localhost:3000/"
const [email, setEmail] = useState("")
const [token, setToken] = useState("")
const [password, setPassword] = useState("")
const [password_confirmation, setPasswordConfirmation] = useState("")

  function resetPassword(e) {
    const form = new FormData(document.getElementById("resetPassword"));

    fetch(`${baseURL}/reset_password`, {
     credentials: "include",
      method: "POST",
      body: form,
    })
     .then(res => res.json())
    .then(response => {
      alert(response.alert)
    })
    .catch(console.log)
 
}

    return (
        
    <div className="top">
     <article className="card-body mx-auto" style={{maxWidth: 400}}>
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
                required/>
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
                    required/>
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
                    required />
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
                    required/>
            </div>
                
                
            <div className="form-group">
                <button 
                type="submit" 
                className="btn btn-primary btn-block" > 
                Reset </button>
            </div>  
        </form>
      </article>
    </div>
 
    )
  
}

export default ResetPassword;