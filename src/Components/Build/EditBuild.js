import React, { useContext, useEffect} from "react";
import { Context } from "../../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import { useHistory,useParams } from 'react-router-dom';



function EditBuild (){

const {user,users,allBuilds,loggedInStatus}=useContext(Context)
const history = useHistory()
const {buildId} = useParams()
const thisBuild = allBuilds.filter(build => build.id.toString() === buildId)
// const Mobo = (thisBuild.parts.filter(part => part.part_type === "Mobo")).map(a=>{return {value: a.id,label: a.description}})
// const CPU = (thisBuild.parts.filter(part => part.part_type === "CPU")).map(a=>{return {value: a.id,label: a.description}})
// const CPUCooler = (thisBuild.parts.filter(part => part.part_type === "CPUCooler")).map(a=>{return {value: a.id,label: a.description}})
// const GPU = (thisBuild.parts.filter(part => part.part_type === "GPU")).map(a=>{return {value: a.id,label: a.description}})
// const RAM = (thisBuild.parts.filter(part => part.part_type === "RAM")).map(a=>{return {value: a.id,label: a.description}})
// const HD = (thisBuild.parts.filter(part => part.part_type === "HD")).map(a=>{return {value: a.id,label: a.description}})
// const Case = (thisBuild.parts.filter(part => part.part_type === "Case")).map(a=>{return {value: a.id,label: a.description}})
// const PWS = (thisBuild.parts.filter(part => part.part_type === "PWS")).map(a=>{return {value: a.id,label: a.description}})
// const Monitor = (thisBuild.parts.filter(part => part.part_type === "Monitor")).map(a=>{return {value: a.id,label: a.description}})
// const Keyboard = (thisBuild.parts.filter(part => part.part_type === "Keyboard")).map(a=>{return {value: a.id,label: a.description}})
// const Mouse = (thisBuild.parts.filter(part => part.part_type === "Mouse")).map(a=>{return {value: a.id,label: a.description}})
// const Headset = (thisBuild.parts.filter(part => part.part_type === "Headset")).map(a=>{return {value: a.id,label: a.description}})

console.log(thisBuild)

  return (
    <>
    {/* {(user.id === parseInt(userId) && loggedInStatus === "LOGGED_IN") ?  */}
<div>
  
<hr></hr>
{thisBuild.map(build => 
<div className="profile-container">
  <div className="row">
     <div className="col-xs-3 col-sm-3" >{build.attachment_url ? <img src = {`http://localhost:3000/${build.attachment_url}`}  className="profile-img-avatar"/> : <Gravatar email="1000-email@example.com" /> }</div>
    <div className="col-sm-9"><h1 className="profile-username">{build.username}</h1>
    <div className="profile-stats-row">
          <div className="col-md-3"> {build.attachment_url.length} </div>
          <div className="col-md-3"> {build.likes.length} </div>
          <div className="col-md-3"> {build.favorites.length}</div>
          <div className="col-md-3"> 0</div>
        </div>
      <div className="profile-statslabel-row">
          
          <div className="col-md-3"> Images </div>
          <div className="col-md-3"> Likes </div>
          <div className="col-md-3"> Favorites </div>
          <div className="col-md-3"> Posts </div>
        </div>
    </div>
  </div>
  <div className="row">
    <div className="col-sm-3">
      
    <div className="text-center">
      
    </div><hr></hr>
  
        <div className="panel panel-default">
        
                
                <hr></hr>
          <div className="panel-heading">Build Created: 
          <p> {new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }).format(new Date(build.created_at))}</p> <i className="fa fa-link fa-1x"></i></div>
          <div className="panel-body"><a href="http://bootnipets.com"></a></div>
        </div>
                 
        
        <ul className="list-group">
          <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Builds</strong></span>  </li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Likes</strong></span> </li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Discussions</strong></span> </li>
          <li className="list-group-item text-right"><span className="pull-left"><strong>Posts</strong></span></li>
        </ul> 
         </div>
         <div className="col-sm-9">
      
          </div>
      </div>
    </div>
    )}
  </div>
    {/* : */}
    {/* "You are not authorized to access this page.."} */}
</>
  )}


export default EditBuild;
