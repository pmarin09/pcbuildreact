import React, {useContext,useState, useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import {Context} from "../../Context"
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import Carousel from 'react-bootstrap/Carousel'
import Pagination from '../../Pagination';

function BuildDetail(img) {
    const{fpsbuildsurl,allBuilds, user, adminId, loggedInStatus, buildposts,updateBuildPosts} = useContext(Context)
    const {buildId} = useParams()
    const thisBuild = allBuilds.filter(build => build.id.toString() === buildId)
    const thisBuildImage = thisBuild.map(a => {
      return a.attachment_url.map(b =>
              <div className = "carousel-fade carousel-item custom">
               <img src = {`${fpsbuildsurl}/${b}`} style = {{maxWidth:  "500px"}}></img>
              </div>
        )})
    function humanize(str) {
      var i, frags = str.split('_');
      for (i=0; i<frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(' ');
    }
    const thisBuildParts = thisBuild.map(a => {
        return  a.parts.map(b =>
             (b.description !== "Not Available") ? 
             <>
          <div className = "build-detail-row">
         
          <div className="row no-gutters align-items-center w-100">
                          <div className = "build-detail-col-1" id="build-component">{b.part_type}</div>
                          <div className = "build-detail-col-2" id="build-img"><img src={b.get_imgurl} className="build-part-img"/></div>
                          <div className="build-detail-col-2" id="build-description">{b.description}</div>
                          <div className="build-detail-col-4" id="build-specs">
                          <div className="build-detail-col-6">
                              {Object.keys(b.details).slice(0, 10).map(function (key,i){
                                  if(b.details[key] === null){
                                    return false
                                  }
                                  if(key === "img_link1"|| key === "date_available"){
                                    return false
                                  }
                                  return(
                                    <>
                                      <div className = "specs-grid-item-key">{humanize(key)}</div> 
                                      <div className="media-body flex-truncate ml-2"> <div className = "specs-grid-item-value">{b.details[key]}</div></div>
                                  </>
                                  )
                              })}
                          </div>
                          </div>
                          <div className="build-detail-col-2">${a.pcbuild_parts.map(c => c.part_id === b.id? c.price : "")}</div>
          </div>
          </div>
          <hr className="build-detail-hr"></hr>
            
            
            </>
            : "" )
          })

       
    const showBuildposts =  buildposts.filter(buildpost => buildpost.pcbuild_id.toString() === buildId).map(filteredPost => (
        <div className="box">
           <article className="media">
               <div className="media-left">
               <figure className="image is-48x48">
               {filteredPost.user.attachment_url ? <img src = {`${fpsbuildsurl}/${filteredPost.user.attachment_url}`} className="discussion-avatar" /> : <Gravatar email={filteredPost.user.email}  className = "discussion-avatar"/>}
               </figure>
               </div>
              <div className="media-content" id= "post-content">
                <div className="content">
                  {filteredPost.content}
                  <hr></hr>
                  <p><em><small>Posted <TimeAgo datetime={filteredPost.updated_at}/>  by {filteredPost.username}</small>
                      </em>
                      </p>
                </div>
                {(user.id === filteredPost.user_id && loggedInStatus === "LOGGED_IN") || user.id === adminId?
                  <nav className="level is-mobile">
                      <div className="level-left">
                        <a className="level-item">
                            <Link to={`/editbuildpost/${filteredPost.id}`} style={{textDecoration: "none"}}> <i className="ri-edit-box-fill"></i></Link>
                        </a>
                        <a className="level-item">
                            <i className="ri-delete-bin-5-fill"onClick ={ (e) => { 
                              e.preventDefault();
                              fetch(`${fpsbuildsurl}/buildposts/` + filteredPost.id + ".json", {
                                method: "DELETE",
                              })
                              .then(response => response.json())
                              .then(data => {
                                console.log("Success",data)
                                updateBuildPosts();
                              })
                            }}></i>
                        </a>
                      </div>
                  </nav>
                :
                ""}
              </div>
            </article>
          </div>
        ))
    const pcbuildParts = thisBuild.map(a => {return   a.pcbuild_parts.map(b=>b.price)})
    const pcbuildPrices = Object.values(pcbuildParts).reduce((acc,price) => {return  price},0)
    const pcbuildTotalCost = Object.values(pcbuildPrices).reduce((acc, price)=>{return acc + price},0)
    function createBuildPost(e) {
        e.preventDefault();
        const form = new FormData(document.getElementById("newBuildPost"));
        fetch(`${fpsbuildsurl}/buildposts.json`, {
          method: "POST",
          body: form,
        })
        .then(response => response.json())
        .then(data => {
          console.log("Success",data)
          updateBuildPosts();
        })
    }
    //PAGINATION 
   const [currentPage, setCurrentPage] = useState(1);
   const [buildpostsPerPage] = useState(10);
   // Get current posts
   const indexOfLastBuildPost = currentPage * buildpostsPerPage;
   const indexOfFirstBuildPost = indexOfLastBuildPost - buildpostsPerPage;
   const currentBuildPosts = showBuildposts.slice(indexOfFirstBuildPost, indexOfLastBuildPost);
   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);

   useEffect(() => {
      window.scrollTo(0, 0);
    })
  return (
      <div className= "build-detail-main">
       <div className= "build-img">
          <Carousel fade= "true">
              {thisBuildImage}
          </Carousel>
        </div>
        <div className="build-detail-container">
        <div className="row">
        <div className="col-sm-12">
                      <h1 style={{fontSize: "30px", marginLeft:"8px"}}>{thisBuild.map(build => build.build_name)}
                        <div style={{verticalAlign: "Middle", float:"right",marginTop: "1.5px"}}><h1 className="total-cost">{pcbuildTotalCost}</h1></div>
                        <div style={{verticalAlign: "Middle", float:"right"}}><i className="ri-money-dollar-circle-line ri-1.5x"></i></div>
                      </h1>
                    </div>
            <div className="col-md-12">
                <div className="build-detail-card mb-3">
               
                    <div className="card-header pr-0 pl-0">
                        <div className="row no-gutters align-items-center w-100">
                            <div className="col-1 text-muted" style={{paddingLeft: "15px",margin:"auto", textAlign:"center", paddingRight: "none !important"} } id="component-header">Component</div>
                            <div className="d-none d-md-block col text-muted">
                                <div className="row no-gutters align-items-center">
                                    <div className="build-detail-col-2">Image</div>
                                    <div className="build-detail-col-2">Description</div>
                                    <div className="build-detail-col-4">Specs</div>
                                    <div className="build-detail-col-2">Price</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="build-detail-card-body">
                      {thisBuildParts}
                    </div>
                    <h2 className="title is-5 has-text-grey-light">Build Description</h2>
                    <div className= "build-comments-area">{thisBuild.map(build => build.comments)}</div>
                </div>
            </div>
        </div>
            {currentBuildPosts}
                    {showBuildposts.length > 10 ?
                    <Pagination
                      elementsPerPage={buildpostsPerPage}
                      totalElements={showBuildposts.length}
                      paginate={paginate}
                        /> : ""}
        </div>
        { ((loggedInStatus === "LOGGED_IN") && user) ?
          <div className = "container">
              <hr></hr>
              <form className="form" onSubmit={createBuildPost} id="newBuildPost">
                    <h2 className="title is-5 has-text-grey-light">What do you think of this Build?</h2>
                      <div className="form-row mb-4">
                        <div className="textarea">
                              <textarea
                                type="text"
                                name="content"
                                className="description"
                                required
                              />
                            <div className="postButton">
                              <input
                                type="submit"
                                value="New Comment"
                                className="button is-success"
                              />
                          </div>
                        </div>
                              <input
                                value= {buildId}
                                name="pcbuild_id"
                                style={{display: "none"}}
                                required
                              />
                              <input
                                type="text"
                                name="user_id"
                                value={user.id}
                                className="description"
                                required
                                style={{display: "none"}}
                              />
                              <input
                                type="text"
                                name="username"
                                value={user.username}
                                className="description"
                                required
                                style={{display: "none"}}
                              />
                      </div>
              </form>
            </div>
        :
        ""}
      </div>
  )
}
export default BuildDetail;