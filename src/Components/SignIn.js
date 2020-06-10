import React, {useState} from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };
      
      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
        
          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };
   

  return (
    <div className="top">
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
        <div className="card bg-light">
<article className="card-body mx-auto" style={{maxWidth: 400}}>
	<form>
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
            onChange = {(event) => onChangeHandler(event)}/>
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
            onChange = {(event) => onChangeHandler(event)}/>
    </div>
                                       
    <div className="form-group">
        <button 
        type="submit" 
        className="btn btn-primary btn-block" 
        onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
        Sign In 
        </button>
        <br />{" "}
        <button
          className="btn-google"
          onClick={() => {signInWithGoogle();}}
        >
          Sign in with Google
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
};

export default SignIn;
