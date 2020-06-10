import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"
import UserProvider from "./providers/UserProvider";
import {ContextProvider} from "./Context"




ReactDOM.render(
  
  <ContextProvider>
  <UserProvider>
    <Router>
        <App/>
    </Router>
    </UserProvider> 
    </ContextProvider>, document.getElementById("root"))