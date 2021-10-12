import {React,useEffect} from "react"

function About(){
    useEffect(() => {
        window.scrollTo(0, 0);
      },[]);
    return(
<div className = "content" style={{marginTop: "30px"}}>
        <div className = "policy">
        <h1 style={{fontFamily:"Viga", fontSize:"28px", padding: "25px", alignSelf: "center"}}>About Us</h1>
            <p style={{fontFamily:"Viga", fontSize:"15px", alignSelf: "center"}}>Welcome to FPS Builds... We are pc builders by nature and always looking forward to the next high performance fps build. Making this a space where you can showcase your build and engage with other pc builders to share knowledge and feedback about pc components, pc configuration and overall fps performance on the latest pc games..</p>
            <p style={{fontFamily:"Viga", fontSize:"15px", paddingBottom: "25px", alignSelf: "center"}}>We are interested in showing high performance gaming builds and learning from the endless pc build configurations and your experience while building your pc. It is always challenging to keep your build up to date with all new game releases and higher pc requirements and so we want to provide a place where you can share your build experience, share tips and tricks and contribute to the growing pc building community..</p>
        </div>
        </div>

    )
}

export default About;