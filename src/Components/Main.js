import React, {useContext,useState} from "react"
import Image from "./Build/Image"
import styles from "../styles.scss"
import {Context} from "../Context"
import Pagination from "../Pagination"
function Main(){
  const{allBuilds} = useContext(Context)
  const imageElements = allBuilds.map((img,i) => (
    <Image key = {img.id} img={img}/>
))

 //PAGINATION 
 const [currentPage, setCurrentPage] = useState(1);
 const [buildsPerPage] = useState(9);

// Get current posts
const indexOfLastBuild = currentPage * buildsPerPage;
const indexOfFirstBuild = indexOfLastBuild - buildsPerPage;
const currentBuilds = imageElements.slice(indexOfFirstBuild, indexOfLastBuild);

// Change page
const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
    <main role="main">
     
      <div className = "album py-5 bg-light">
      <div className="jumbotron">
        <div className="container">
          <h1 className="jumbotron-heading">Featured Builds</h1>
          <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
          <p>
            <a href="#" className="btn btn-primary my-2">View All Builds</a>
          </p>
        </div>
      </div>
        <div className="container">
          <div className="row">
            {currentBuilds}
            <Pagination
              elementsPerPage={buildsPerPage}
              totalElements={imageElements.length}
              paginate={paginate}
            />
          </div>  
        </div>
      </div>
    </main>
    )
}

export default Main;