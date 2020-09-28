import React from "react";
import Application from "./Components/Application";
import HttpsRedirect from 'react-https-redirect';
import Header from "./Components/Header"
import Footer from "./Components/Footer"
function App(){
  return (
    <>
      <HttpsRedirect>
        <Header/>
        <Application/>
        <Footer/>
      </HttpsRedirect>
    </>
  );
}
export default App;
