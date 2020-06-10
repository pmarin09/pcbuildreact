import React, {useState,useEffect} from "react";
import Application from "./Components/Application";
import Header from "./Components/Header"
import Footer from "./Components/Footer"

import { BrowserRouter, Switch, Route } from "react-router-dom";

  function App(){

   
  return (
    <>
      <Header/>
      <Application />
      <Footer/>
    </>
  );

}

export default App;
