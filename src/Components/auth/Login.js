import React, { useContext,useState } from "react";
import { Link, useHistory} from "react-router-dom";
import {Context} from "../../Context"
import axios from "axios"

function Login (props){
  const{handleSuccessfulAuth} = useContext(Context)
  const{user} = useContext(Context)
  const{loggedInStatus} = useContext(Context)
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("") 
  const history = useHistory()
 console.log(loggedInStatus)
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

  if(loggedInStatus === "NOT_LOGGED_IN") {

 
  return (

<div className="top">
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">

        <div className="card bg-light">
<article className="card-body mx-auto" style={{maxWidth: 400}}>
	<form onSubmit={handleSubmit}>
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
		 </div>
        <input 
            name="userEmail" 
            className="form-control" 
            placeholder="Email address" 
            type="email"  
            value={email}  
            id="userEmail"
            onChange = {e => setEmail(e.target.value)}/>
    </div> 
    
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
		</div>
        <input 
            className="form-control" 
            placeholder="Your password" 
            type="password" 
            name="userPassword"
            value={password}
            id="userPassword"
            onChange = {e => setPassword(e.target.value)}/>
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
          </Link>{" "}</p>  
          <br />{" "}
          <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>                                                              
    </form>
    </article>
    </div> 
</div>
</div>
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