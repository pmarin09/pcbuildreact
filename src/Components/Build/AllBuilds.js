import React, {useContext,useEffect,useState} from "react"
import Image from "./Image"
import styles from "../../styles.scss"
import {Context} from "../../Context"
import Pagination from "../../Pagination"
function AllBuilds(){
  const{allBuilds,updateBuilds} = useContext(Context)
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

useEffect(() => updateBuilds(),[])
    return (
    <main role="main">
      <div className = "album py-5 bg-light">
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
    </main>
    )
}
export default AllBuilds;