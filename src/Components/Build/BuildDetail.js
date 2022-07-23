import React, {useContext,useState, useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import {Context} from "../../Context"
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import Carousel from 'react-bootstrap/Carousel'
import Pagination from '../../Pagination';
import moment from "moment";
import Loader from 'react-loader-spinner';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function BuildDetail(img) {
    const{fpsbuildsurl, user, adminId, loggedInStatus, buildposts,updateBuildPosts} = useContext(Context)
    const {buildId} = useParams()
    const [thisBuild, SetThisBuild] = useState()
    const [emojiPickerState, SetEmojiPicker] = useState(false);
    const [message, SetMessage] = useState("");
    function thisBuildImage(){
      return thisBuild.attachment_url.map( b => 
              <div className = "carousel-fade carousel-item custom">
               <img src = {`${fpsbuildsurl}/${b}`} style = {{maxWidth:  "700px", maxHeight: "720px", borderRadius: "15px", borderColor:"#1f237"}}></img>
              </div>
    )}
    function humanize(str) {
      var i, frags = str.split('_');
      for (i=0; i<frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
      return frags.join(' ');
    }
    function thisBuildParts(){ return thisBuild.pcbuild_parts.map( b =>
             (b.part.description !== "Not Available") ? 
             <>
          <div className = "build-detail-row">
         
          <div className="row no-gutters align-items-center w-100">
                          <div className = "build-detail-col-1" id="build-component" style={{fontFamily: "Viga"}}>{b.part.part_type}</div>
                          <div className = "build-detail-col-2" id="build-img"><img src={b.part.get_imgurl} className="build-part-img"/></div>
                          <div className="build-detail-col-2" id="build-description">{b.part.description}</div>
                          <div className="build-detail-col-4" id="build-specs">
                          <div className="build-detail-col-6">
                              {Object.keys(b.part.details).slice(0, 10).map(function (key,i){
                                  if(b.part.details[key] === null){
                                    return false
                                  }
                                  if(key === "img_link1"|| key === "date_available"){
                                    return false
                                  }
                                  return(
                                    <>
                                      <div className = "specs-grid-item-key">{humanize(key)}</div> 
                                      <div className="media-body flex-truncate ml-2"> <div className = "specs-grid-item-value">{b.part.details[key]}</div></div>
                                  </>
                                  )
                              })}
                          </div>
                          </div>
                          <div className="build-detail-col-2">${b.price}</div>
                         
                          {/* ${a.pcbuild_parts.map(c => c.part_id === b.id? c.price : "")} */}
          </div>
          </div>
          <hr className="build-detail-hr"></hr>
            </>
            : "" )
          }
        
    const showBuildposts =  buildposts.filter(buildpost => buildpost.pcbuild_id.toString() === buildId).map(filteredPost => (
        <div className="build-detail-box" style={{fontSize: "13px"}}>
           <article className="media">
               <div className="media-left">
               <figure className="image is-48x48">
               {filteredPost.user.attachment_url ? <img src = {`${fpsbuildsurl}/${filteredPost.user.attachment_url}`} className="discussion-avatar" /> : <Gravatar email={filteredPost.user.email} className = "discussion-avatar" default="robohash"/>}
               </figure>
               </div>
              <div className="media-content" id= "post-content">
                <div className="content">
                  {filteredPost.content}
                  <hr style={{backgroundColor: "#636161", height:"1px", margin: "4px "}}></hr>
                  <p style={{marginBottom:"1px !important"}}><em><small>Posted <TimeAgo datetime={filteredPost.created_at}/> by {filteredPost.username}  
                  <span style={{fontSize: "9px",fontWeight:"400"}}>   | Last updated: {moment(filteredPost.updated_at).format("MMMM Do YYYY, h:mm:ss a")}{" "} </span> 
                  </small></em></p>

                  
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
        
    function pcbuildTotalCost(){
    return Object.values(thisBuild.pcbuild_parts.map(pcbuildpart => pcbuildpart.price)).reduce((acc,price) => {return  acc + price},0)
                          }
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
          SetMessage("")
        })
    }
    function createBuildPostMobile(e) {
      e.preventDefault();
      const form = new FormData(document.getElementById("newBuildPost-mobile"));
      fetch(`${fpsbuildsurl}/buildposts.json`, {
        method: "POST",
        body: form,
      })
      .then(response => response.json())
      .then(data => {
        console.log("Success",data)
        updateBuildPosts();
        SetMessage("")
      })
  }
    //PAGINATION 
   const [currentPage, setCurrentPage] = useState(1);
   const [buildpostsPerPage] = useState(4);
   // Get current posts
   const indexOfLastBuildPost = currentPage * buildpostsPerPage;
   const indexOfFirstBuildPost = indexOfLastBuildPost - buildpostsPerPage;
   const currentBuildPosts = showBuildposts.slice(indexOfFirstBuildPost, indexOfLastBuildPost);
   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);

   console.log(thisBuild)

   let emojiPicker;
   if (emojiPickerState) {
     emojiPicker = (
       <Picker
         title="Pick your emoji…"
         emoji="point_up"
         onSelect={emoji => SetMessage(message + emoji.native)}
         theme ="dark"
         style={{ margin: "8px",position: "relative", zIndex:"1",width: "100%"}}
         color= "#0f171d"
         perline= "13"
         sheetSize="64"
       />
     );
   }
 
   function triggerPicker(event) {
     event.preventDefault();
     SetEmojiPicker(!emojiPickerState);
   }

    useEffect (() => {
      window.scrollTo(0, 0);
      fetch(`${fpsbuildsurl}/pcbuilds/${buildId}.json`)
      .then (res => res.json())
      .then (data => SetThisBuild(data))
      console.log(thisBuild)
    },[])
  return (
    <div>
    {thisBuild  ? 
      <div className= "build-detail-main">
        <div className = "build-intro-container" style={{maxWidth: "3000px"}}>
        <div className= "col-md-12">
            <div className="row no-gutters align-items-center w-100">
                <div className=" build-pics col-3" style={{flexGrow: "0.5"}}>
                        <h2 className="build-owner" style={{fontFamily: "Viga"}}> 
                        
                          <Link to={`/profile/${thisBuild.user_id}`}>
                          {thisBuild.user.attachment_url ? <img src = {`${fpsbuildsurl}/${thisBuild.user.attachment_url}`}  className="profile-avatar"/> 
                          : 
                          <Gravatar email= {thisBuild.user.email.toString()} className="profile-avatar" size={100} default="robohash"/> }
                          <span className= "build-owner-name"> {thisBuild.username}</span>
                          </Link>
                        </h2>
                        
                    
                        <h3 className="title is-6 has-text-grey-light" style={{marginLeft: "8px",marginBottom: "1px",padding:"5px",fontFamily: "Viga"}}> Build Description</h3>
            <div className= "build-comments-area" style={{fontSize:"13px"}}>{thisBuild.comments}</div>
      
            <div className= "build-comments-area"> { ((loggedInStatus === "LOGGED_IN") && user) ?
                  <>
                      <form className="form" onSubmit={createBuildPost} id="newBuildPost">
                            <h2 className="title is-6 has-text-grey-light" style={{fontFamily: "Viga"}}>Post a Comment:</h2>
                              
                                <div className="post-textarea" style={{height:"185px",width:"100% !important"}}>
                                      <textarea
                                        type="text"
                                        name="content"
                                        className="description"
                                        style={{height:"182px",fontSize: "14px"}}
                                        value= {message}
                                        onChange={e => SetMessage(e.target.value)}
                                        required
                                      />
                                    <div className="postButton">
                                      <input
                                        type="submit"
                                        value="New Comment"
                                        style={{fontFamily: "Viga", fontSize:"12px", marginTop:"10px"}}
                                        className="button is-success"
                                      />
                                        <i className="far fa-grin"
                                        onClick={triggerPicker}
                                        id="emoji-button">
                                        </i>
                                    </div>
                                   {emojiPicker}
                                   
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
                                      
                      </form>
                    </>
                    :
                  ""}
                  </div>
            </div>
            <div className="build-pics col-5" style={{marginLeft:"20px", marginRight:"20px"}}>
                  <Carousel fade= "true">
                      {thisBuildImage()}
                  </Carousel>
            </div>
            <div className="build-posts-column col-3" style={{maxWidth:"25.5%"}}>
                      <div>
                        {currentBuildPosts}

                        {showBuildposts.length > 4 ?
                        <Pagination
                          elementsPerPage={buildpostsPerPage}
                          totalElements={showBuildposts.length}
                          paginate={paginate}
                            /> : ""}
                        
                    </div>
            </div>
          </div>
         </div>
        </div>
        <div className = "build-intro-mobile-container" style={{maxWidth: "3000px"}}>
            <div className= "col-xl-12">
                <div className="row no-gutters align-items-center w-100">
                    <div className=" build-pics col-12" style={{marginTop:"10px"}}>
                            <h2 className="build-owner"> 
                            
                              <Link to={`/profile/${thisBuild.user_id}`}>
                              {thisBuild.user.attachment_url ? <img src = {`${fpsbuildsurl}/${thisBuild.user.attachment_url}`}  className="profile-avatar"/> 
                              : 
                              <Gravatar email= {thisBuild.user.email.toString()} className="profile-avatar" size={100} default="robohash"/> }
                              <span className= "build-owner-name"> {thisBuild.username}</span>
                              </Link>
                            </h2>
                            
                        
                            <h3 className="title is-6 has-text-grey-light" style={{marginLeft: "8px",marginBottom: "1px",padding:"5px"}}> Build Description</h3>
                <div className= "build-comments-area" style={{fontSize:"13px"}}>{thisBuild.comments}</div>
                </div>
                <div className="build-pics-carousel col-12" style={{marginTop:"10px"}}>
                      <Carousel fade= "true">
                          {thisBuildImage()}
                      </Carousel>
                </div>
              </div>
          </div>
        </div>
        <div className="build-detail-container">
        <div className="row">
            <div className="col-sm-12">
                          <h1 style={{fontSize: "30px", marginLeft:"10px", fontFamily: "Viga"}}>{thisBuild.build_name}
                            <div style={{verticalAlign: "Middle", float:"right",marginTop: "1.5px"}}><h1 className="total-cost">{pcbuildTotalCost()}</h1></div>
                            <div style={{verticalAlign: "Middle", float:"right"}}><i className="ri-money-dollar-circle-line ri-1.5x"></i></div>
                          </h1>
            </div>
            <div className="col-md-12">
                <div className="build-detail-card mb-3">
               
                    <div className="card-header pr-0 pl-0">
                        <div className="row no-gutters align-items-center w-100" style={{fontFamily: "Viga"}}>
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
                      {thisBuildParts()}
                    </div>
                </div>
            </div>
        </div>

        <div className= "current-build-posts-mobile">
            {currentBuildPosts}
                    {showBuildposts.length > 3 ?
                    <Pagination
                      elementsPerPage={buildpostsPerPage}
                      totalElements={showBuildposts.length}
                      paginate={paginate}
                        /> : ""}
        </div>
        </div>
        <div className= "post-comments-mobile">
        { ((loggedInStatus === "LOGGED_IN") && user) ?
          <div className = "container">
              <hr></hr>
              <form className="form" onSubmit={createBuildPostMobile} id="newBuildPost-mobile">
                    <h2 className="title is-5 has-text-grey-light" style={{fontFamily: "Viga"}}>Post a comment:</h2>
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
                                style={{fontFamily: "Viga"}}
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
      </div>
      :
      <div className="loading">
    <Loader
        type="ThreeDots"
        color="#B50000"
        secondaryColor = "grey"
        height={250}
        width={250}
        timeout={4000} //2 secs
    /> 
  </div>}
      </div>
  )
}
export default BuildDetail;