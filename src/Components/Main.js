import React, {useContext,useState,useEffect} from "react"
import Image from "./Build/Image"
import styles from "../styles.scss"
import {Context} from "../Context"
import Pagination from "../Pagination"
import {Link} from "react-router-dom"
import News from "../News"
function Main(){
const{allBuilds,setUser,fpsbuildsurl} = useContext(Context)
const imageElements = allBuilds.map((img,i) => (
    <Image key = {img.id} img={img}/>
))
 //PAGINATION 
const [currentPage, setCurrentPage] = useState(1);
const [buildsPerPage] = useState(9);
// Get current builds
const indexOfLastBuild = currentPage * buildsPerPage;
const indexOfFirstBuild = indexOfLastBuild - buildsPerPage;
const currentBuilds = imageElements.slice(indexOfFirstBuild, indexOfLastBuild);
// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);
useEffect(() => {
  const token = localStorage.getItem("token")
  if(token){
    fetch(`${fpsbuildsurl}/auto_login`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => resp.json())
    .then(data => {
      setUser(data)
      console.log(data)
    })
  }
},[])
return (
  <>
  <div className = "album bg-light">
    <div className="jumbotron">
      <div className="container">
        <h1 className="jumbotron-heading">FPS Builds</h1>
        <p className="lead text-muted">Welcome to FPS Builds! For all PC Builder enthusiasts... </p>
        <p>
        <Link to="/allbuilds" style={{textDecoration: "none"}}> <div className="btn btn-primary my-2">View All Builds</div></Link>
        </p>
      </div>
    </div>
    <div className="container">
      <div className="row">
        {currentBuilds}
        {imageElements.length > 9 ? <Pagination
          elementsPerPage={buildsPerPage}
          totalElements={imageElements.length}
          paginate={paginate}
        /> : ""}
      </div>  
    </div>
  </div>
  {/* {News()} */}
  </>
)
}
export default Main;