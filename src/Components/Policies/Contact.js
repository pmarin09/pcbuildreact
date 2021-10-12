import {React,useEffect} from "react"

function Contact(){
    useEffect(() => {
        window.scrollTo(0, 0);
      },[]);
    return(
<div className = "content" style={{marginTop: "30px"}}>
        <div className = "policy">
        <h1 style={{fontFamily:"Viga", fontSize:"28px", padding: "25px", alignSelf: "center"}}>Contact Us</h1>
            <p style={{fontFamily:"Viga", fontSize:"14px", padding: "25px", alignSelf: "center"}}>Send us an email: fpsbuilds@gmail.com</p>
        </div>
        </div>

    )
}

export default Contact;