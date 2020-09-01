import React, { useState,useContext} from 'react';
import mail from "../../icons/mail.png"
import {Context} from "../../Context"
import {toast} from 'react-toastify';

function ForgotPassword(){

const{fpsbuildsurl} = useContext(Context)
const [email, setEmail] = useState("")
function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}
function forgotPassword(e) {
  const form = new FormData(document.getElementById("forgotPassword"));
  e.preventDefault();
    fetch(`${fpsbuildsurl}/forgot_password`, {
     credentials: "include",
      method: "POST",
      body: form,
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      console.log("Success",data)
      toast.info("Please check your e-mail to reset your password", {
        position: toast.POSITION.TOP_CENTER
      });
    })
    .catch((error) => {
      console.error("Error", error)
      toast.error("E-mail does not exist. Please enter a valid e-mail address ", {
        position: toast.POSITION.TOP_CENTER
      });
    })
}
  return (
    <div className="forgot-pw">
      <h1 className="text-3xl mb-2 text-center font-bold">Forgot Password?</h1>
      <article className="card-body mx-auto" style={{maxWidth: 350, height:150, margin:"20px"}}>
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
              value={email}
            />
          </div> 
          <div className="form-group">
            <button 
            type="submit" 
            className="btn btn-primary btn-block" > 
            Request 
            </button>
          </div> 
        </form>
      </article>
    </div>
    )
}
export default ForgotPassword;