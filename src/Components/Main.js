import React, {useContext} from "react"
import Image from "./Build/Image"
import styles from "../styles.scss"
import {Context} from "../Context"
function Main(){
  const{allBuilds} = useContext(Context)
  const imageElements = allBuilds.map((img,i) => (
    <Image key = {img.id} img={img}/>
))



    return (
    <main role="main">

      <section className="jumbotron">
        <div className="container">
          <h1 className="jumbotron-heading">Featured Builds</h1>
          <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
          <p>
            <a href="#" className="btn btn-primary my-2">View All Builds</a>
          </p>
        </div>
      </section>
      <div className = "album py-5 bg-light">
        <div className="container">
          <div className="row">
            {imageElements}
          </div>  
        </div>
      </div>
    </main>
    )
}

export default Main;