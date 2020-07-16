import React, { useContext, useEffect} from "react";
import { Context } from "../../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import { useHistory,useParams } from 'react-router-dom';
import mobo from "../../icons/mobo.png"
import Select from 'react-select'

function EditBuild (){

const {user,users,parts,allBuilds,checkLoginStatus,posts,loggedInStatus}=useContext(Context)
const history = useHistory()
const {buildId} = useParams()
const thisBuild = allBuilds.filter(build => build.id.toString() === buildId)
const thisBuildImages = thisBuild.map(a => {
  return a.attachment_url.map(b =>
        <td><img src = {`http://localhost:3000/${b}`} className="build-edit-images"/></td>
    )})
 const Mobo = (parts.filter(part => part.part_type === "Mobo")).map(a=>{return {value: a.id,label: a.description}})


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

console.log(thisBuild.filter(build => build.pcbuild_parts))

  


function updateBuild(e) {
  const form = new FormData(document.getElementById("updatePcbuild"));

  fetch(`http://localhost:3000/pcbuilds/${buildId}.json`, {
    method: "PATCH",
    body: form,
  });
  e.preventDefault();
  // history.push(`/pcbuilds`)
  // window.location.reload(false);
}
useEffect(()=>{
  checkLoginStatus()
},[])


return (
    
   
<div>
  
<hr></hr>
{thisBuild.map(build => 
<div className="profile-container">
  <div className="row">
     <div className="col-xs-3 col-sm-3" >{build.attachment_url ? <img src = {`http://localhost:3000/${build.attachment_url}`}  className="build-img-avatar"/> : <Gravatar email="1000-email@example.com" /> }</div>
    <div className="col-sm-9"><h1 className="profile-username"><small>Build Owner: {build.username}</small></h1>
    <div className="profile-stats-row">
          <div className="col-md-3"> {build.attachment_url.length} </div>
          <div className="col-md-3"> {build.likes.length} </div>
          <div className="col-md-3"> {build.favorites.length}</div>
          <div className="col-md-3"> {build.buildposts.length}</div>
        </div>
      <div className="profile-statslabel-row">
          
          <div className="col-md-3"> Images </div>
          <div className="col-md-3"> Likes </div>
          <div className="col-md-3"> Favorites </div>
          <div className="col-md-3"> Comments </div>
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
          <p> {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }).format(new Date(build.created_at))}</p> <i className="fa fa-link fa-1x"></i></div>
          <div className="panel-body"><a href="http://bootnipets.com"></a></div>
        </div>
                 
        
        <ul className="list-group">
          <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
          
        </ul> 
         </div>
         <div className="col-sm-9">

           <div className= "build-card-body">
            {thisBuildImages}
            </div>
         
  <form className="form" onSubmit={updateBuild} id="updatePcbuild">
  <div className="col">
              Image:
              <input type="file" 
                className="dropzone"
                id="file_upload" 
                name="attachment[]"
                multiple
                 />
      </div>
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
      <table className="create-build-table">
    <thead>
      <tr>
        <th>Icon</th>
        <th className = "component">Component</th>
        <th className = "component-description">Description</th>
        <th className = "hola">Price</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td><img src={mobo} className="build-icon"/></td>
        <td className = "component">Motherboard</td> 
        <td className = "component-description">
              <Select 
              name="pcbuildpart_id[Mobo][id]"
              required
              options= {Mobo}
              className= "component-description"
              /> 
        </td>
        <td className = "part-price">
                <input
                  type="text"
                  name="part_id[Mobo][price]"
                  className="price"
                  id="moboprice"
                  required
                />
        </td>
        </tr>

        <input
            type="submit"
            value="Update Build"
            className="button is-link"
          />
          </tbody>
          </table>
    </form>


          </div>
      </div>
    </div>
    )}
  </div>
 
  )}


export default EditBuild;
