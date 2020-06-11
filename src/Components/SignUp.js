import React, {useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        

<div className="card bg-light">
<article className="card-body mx-auto" style={{maxWidth: 400}}>
	<h4 className="card-title mt-3 text-center">Create Account</h4>
	<p className="text-center">Join our PC Build community!</p>
	<p>
	<button
          onClick={() => {
            try {
              signInWithGoogle();
            } catch (error) {
              console.error("Error signing in with Google", error);
            }
          }}
          className="btn-google"
        >
          Sign In with Google
        </button>
		
	</p>
	<p className="divider-text">
        <span className="bg-light">OR</span>
    </p>
	<form>
	<div className="form-group input-group">
		<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
		 </div>
        <input 
            name="displayName" 
            value = {displayName} 
            className="form-control" 
            placeholder="Display name" 
            type="text" id="displayName" 
            onChange={event => onChangeHandler(event)} />
    </div>
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
            onChange={event => onChangeHandler(event)}/>
    </div> 
    
    <div className="form-group input-group">
    	<div className="input-group-prepend">
		    <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
		</div>
        <input 
            className="form-control" 
            placeholder="Create password" 
            type="password" 
            name="userPassword"
            value={password}
            id="userPassword"
            onChange={event => onChangeHandler(event)}/>
    </div>
                                       
    <div className="form-group">
        <button 
        type="submit" 
        className="btn btn-primary btn-block" 
        onClick={event => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}> 
        Create Account  </button>
    </div>      
    <p className="text-center">Have an account? 
    <Link to="/signin">Sign in here</Link>{" "} </p>                                                                 
</form>
</article>
</div> 
</div>
</div>
  );
};

export default SignUp;
