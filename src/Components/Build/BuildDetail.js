import React, {useContext} from "react"
import {useParams, Link} from "react-router-dom"
import {Context} from "../../Context"
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import PcBuilds from "./PcBuilds";
import Carousel from 'react-bootstrap/Carousel'

function BuildDetail(img) {
    const{allBuilds, user, loggedInStatus, buildposts} = useContext(Context)
    const {buildId} = useParams()
    const thisBuild = allBuilds.filter(build => build.id.toString() === buildId)
    const thisBuildImage = thisBuild.map(a => {
      return a.attachment_url.map(b =>
            <Carousel.Item>
            <img src = {`http://localhost:3000/${b}`} width=  "400px" height= "400px"></img>
            </Carousel.Item>
        )})
    const thisBuildParts = thisBuild.map(a => {
        return  a.parts.map(b =>
            <tr>
              <td>{b.part_type}</td>
              <td>{b.description}</td>
              <td>${a.pcbuild_parts.map(c => c.part_id === b.id? c.price : "")}</td>
            </tr>
            )
          })
    const showBuildposts =  buildposts.filter(buildpost => buildpost.pcbuild_id.toString() === buildId).map(filteredPost => (
    
        <div className="box">
           <article className="media">
               <div className="media-left">
               <figure className="image is-48x48">
               <Gravatar email="1000-email@example.com" />
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
               {(user.id === filteredPost.user_id && loggedInStatus === "LOGGED_IN") ?
               <nav className="level is-mobile">
                   <div className="level-left">
                   <a className="level-item">
                       
                       <Link to={`/editbuildpost/${filteredPost.id}`} style={{textDecoration: "none"}}> <i className="ri-edit-box-fill"></i></Link>
                   </a>
                   <a className="level-item">
                       <i className="ri-delete-bin-5-fill"onClick ={ (e) => { 
                         fetch("http://localhost:3000/buildposts/" + filteredPost.id + ".json", {
                           method: "DELETE",
                         })
                        e.preventDefault();
                        window.location.reload();
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
     
        const form = new FormData(document.getElementById("newBuildPost"));
        
        fetch("http://localhost:3000/buildposts.json", {
          method: "POST",
          body: form,
        });
        e.preventDefault();
        window.location.reload(false);
      }
     
    return (
        <>
        <div>
            <div className= "build-img">
                <Carousel>
                    {thisBuildImage}
                </Carousel>
              </div>
          <hr></hr>
           <div className="table-wrapper">
           
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-8"><h2>Total Build Price: ${pcbuildTotalCost}</h2></div>
                </div>
            </div>

       
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Specs</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                  {thisBuildParts}
                </tbody>
            </table>
            <h2 className="title is-5 has-text-grey-light">Build Description</h2>
            <div>{thisBuild.map(build => build.comments)}</div>
            {showBuildposts}
        </div>
        </div>
       

        { (loggedInStatus === "LOGGED_IN") ?
<div className = "container">
<hr></hr>
  <form className="form" onSubmit={createBuildPost} id="newBuildPost">
  <h2 className="title is-5 has-text-grey-light">What do you think of this Build?</h2>
    <div className="form-row mb-4">
      <div className="textarea">
        <input
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


</>



       

    )
}

export default BuildDetail