import React, { useContext, useEffect} from "react";
import { Context } from "../../Context";
import 'bootstrap/dist/css/bootstrap.css';
import Gravatar from 'react-gravatar'
import { useHistory,useParams } from 'react-router-dom';
import mobo from "../../icons/mobo.png"
import cpu from "../../icons/cpu.png"
import gpu from "../../icons/gpu.png"
import cpucooler from "../../icons/cpucooler.png"
import ram from "../../icons/ram.png"
import hdd from "../../icons/hdd.png"
import pws from "../../icons/pws.png"
import monitor from "../../icons/monitor.png"
import keyboard from "../../icons/keyboard.png"
import mouse from "../../icons/mouse.png"
import headset from "../../icons/headset.png"
import pccase from "../../icons/pccase.png"
import Select from 'react-select'

function EditBuild (){

const {user,users,parts,allBuilds,checkLoginStatus,posts,loggedInStatus}=useContext(Context)
const history = useHistory()
const {buildId} = useParams()
const thisBuild = allBuilds.filter(build => build.id.toString() === buildId)
console.log(thisBuild)
const thisBuildImages = thisBuild.map(a => {
  return a.attachment_url.map(b =>
        <td><img src = {`http://localhost:3000/${b}`} className="build-edit-images"/></td>
    )})
 const pcbuild_parts = (thisBuild[0].pcbuild_parts.map(pcbuild_part=>{return {id: pcbuild_part.id,description: pcbuild_part.part.description,part_type: pcbuild_part.part.part_type, price: pcbuild_part.price}}))


const Mobo = (parts.filter(part => part.part_type === "Mobo")).map(a=>{return {value: a.id,label: a.description}})
const CPU = (parts.filter(part => part.part_type === "CPU")).map(a=>{return {value: a.id,label: a.description}})
const CPUCooler = (parts.filter(part => part.part_type === "CPUCooler")).map(a=>{return {value: a.id,label: a.description}})
const GPU = (parts.filter(part => part.part_type === "GPU")).map(a=>{return {value: a.id,label: a.description}})
const RAM = (parts.filter(part => part.part_type === "RAM")).map(a=>{return {value: a.id,label: a.description}})
const HD = (parts.filter(part => part.part_type === "HD")).map(a=>{return {value: a.id,label: a.description}})
const Case = (parts.filter(part => part.part_type === "Case")).map(a=>{return {value: a.id,label: a.description}})
const PWS = (parts.filter(part => part.part_type === "PWS")).map(a=>{return {value: a.id,label: a.description}})
const Monitor = (parts.filter(part => part.part_type === "Monitor")).map(a=>{return {value: a.id,label: a.description}})
const Keyboard = (parts.filter(part => part.part_type === "Keyboard")).map(a=>{return {value: a.id,label: a.description}})
const Mouse = (parts.filter(part => part.part_type === "Mouse")).map(a=>{return {value: a.id,label: a.description}})
const Headset = (parts.filter(part => part.part_type === "Headset")).map(a=>{return {value: a.id,label: a.description}})


const options = {
  Mobo: Mobo,
  CPU: CPU,
  CPUCooler: CPUCooler,
  GPU: GPU,
  RAM: RAM,
  HD: HD,
  Case: Case,
  PWS: PWS,
  Monitor: Monitor,
  Keyboard: Keyboard,
  Mouse: Mouse,
  Headset: Headset
}

const build_icons = {
  Mobo: mobo,
  CPU: cpu,
  CPUCooler: cpucooler,
  GPU: gpu,
  RAM: ram,
  HD: hdd,
  Case: pccase,
  PWS: pws,
  Monitor: monitor,
  Keyboard: keyboard,
  Mouse: mouse,
  Headset: headset

}
  


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
    <div className="col-sm-9"><h1 className="profile-username"><small>{build.build_name}</small></h1>
    <table className="profile-table">
    <tr className="profile-stats-row">
          <div className="col-md-3"> {build.attachment_url.length} </div>
          <div className="col-md-3"> {build.likes.length} </div>
          <div className="col-md-3"> {build.favorites.length}</div>
          <div className="col-md-3"> {build.buildposts.length}</div>
        </tr>
      <tr className="profile-statslabel-row">
          
          <div className="col-md-3"> Images </div>
          <div className="col-md-3"> Likes </div>
          <div className="col-md-3"> Favorites </div>
          <div className="col-md-3"> Comments </div>
        </tr>
    </table>
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
    
      {pcbuild_parts.map(function(part) {
      return (
        <tr>
        <td><img src={build_icons[part.part_type]} className="build-icon"/></td>
        <td className = "component">{part.part_type}</td> 
        <td className = "component-description">
              <Select 
              name={"pcbuildpart_id[" + part.part_type + "][part_id]"}
              required
              options= {options[part.part_type]}
              defaultValue={part.description}
              className= "component-description"
              /> 
        </td>
        <td className = "part-price">
                <input
                  type="text"
                  name={"pcbuildpart_id[" + part.part_type + "][price]"}
                  className="price"
                  id="moboprice"
                  defaultValue={part.price}
                  required
                />
                <input
                  type="hidden"
                  name={"pcbuildpart_id[" + part.part_type + "][id]"}
                  value= {part.id}
                  required
                />
        </td>
        </tr>
    
      )})}
        

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
