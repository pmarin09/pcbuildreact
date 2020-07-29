import React, { useState} from 'react';
import mail from "../../icons/mail.png"

function ForgotPassword(){

const baseURL = "http://localhost:3000/"
const [email, setEmail] = useState("")

  function forgotPassword(e) {
    const form = new FormData(document.getElementById("forgotPassword"));

    fetch(`${baseURL}/forgot_password`, {
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
        <div className="forgot-pw">
      <h1 className="text-3xl mb-2 text-center font-bold">Forgot Password?</h1>
        <article className="card-body mx-auto" style={{maxWidth: 350, height:150}}>
        <form onSubmit={forgotPassword} id= "forgotPassword">
        <h1 className="text-3xl mb-2 text-center font-bold">Request Reset Password</h1>
        <div className="form-group input-group">
        
        <div className="input-group-prepend">
                <span className="input-group-text"> <img src ={mail}/> </span>
        </div>
          <input required 
          id="forgotpasswordemail" 
          onChange={e => setEmail(e.target.value)} 
          name="email" 
          placeholder="Enter your e-mail..." 
          type="email" 
          value={email}/>
          
          </div> 
          <div className="form-group">
                <button 
                type="submit" 
                className="btn btn-primary btn-block" > 
                Request </button>
            </div> 

            
        </form>
        </article>
    </div>
    )
  
}

export default ForgotPassword;