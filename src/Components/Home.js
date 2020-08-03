import React from "react";
import axios from "axios";
import Registration from "./auth/Registration";
import Login from "./auth/Login";


function Home(props){

  function handleSuccessfulAuth(data) {
    props.handleLogin(data);
    props.history.push("/dashboard");
  }

  function handleLogoutClick() {
    axios
      .delete(`${fpsbuildsurl}/logout`, { withCredentials: true })
      .then(response => {
        props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {props.loggedInStatus}</h1>
        <button onClick={() => handleLogoutClick()}>Logout</button>
        <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      </div>
    );
  
}

export default Home;
