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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function EditBuild (){
  const {allBuilds,user,parts,fpsbuildsurl,updateImages}=useContext(Context)
  const history = useHistory()
  const {buildId} = useParams()
  const thisBuild = allBuilds.find(build => build.id.toString() === buildId)
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
    fetch(`${fpsbuildsurl}/pcbuilds/${buildId}.json`, {
      method: "PATCH",
      body: form,
    });
    e.preventDefault();
    toast.success("Updating your build... ", {
      position: toast.POSITION.TOP_CENTER
    });
    setTimeout( () => window.location.reload(false),1000)
  }
  function uploadBuildImages(e) {
    const form = new FormData(document.getElementById("newBuildImages"));
    fetch(`${fpsbuildsurl}/pcbuilds/${buildId}/update_attachment/${buildId}.json`, {
      method: "PATCH",
      body: form,
    });
    updateImages();
    e.preventDefault();
  }
return (
  <>
  <ToastContainer 
    autoClose={1000}
    />
  {thisBuild ? 
  <div>
      <hr></hr>
      <div className="profile-container">
        <div className="row">
          <div className="col-xs-3 col-sm-3" >{thisBuild.attachment_url ? <img src = {`${fpsbuildsurl}/${thisBuild.attachment_url[0]}`}  className="build-img-avatar"/> : <Gravatar email="1000-email@example.com" /> }
          </div>
          <div className="col-sm-9"><h1 className="profile-username"><small>{thisBuild.build_name}</small></h1>
          <table className="profile-table">
          <tr className="profile-stats-row">
                <div className="col-md-3"> {thisBuild.attachment_url.length} </div>
                <div className="col-md-3"> {thisBuild.likes.length} </div>
                <div className="col-md-3"> {thisBuild.favorites.length}</div>
                <div className="col-md-3"> {thisBuild.buildposts.length}</div>
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
              }).format(new Date(thisBuild.created_at))}</p> <i className="fa fa-link fa-1x"></i></div>
                <div className="panel-body"><a href="http://bootnipets.com"></a></div>
              </div>
              <ul className="list-group">
                <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
              </ul> 
              </div>
            <div className="col-sm-9">
                <div className= "build-card-body">
                <div className="row">
                  {thisBuild.attachment_url.map((url,i) =>
              <div className = "col-sm-4">
                <div className= "removeFavoriteIcon">
                    <i className="ri-close-fill ri-2x" 
                    onClick= {() =>{fetch(`${fpsbuildsurl}/pcbuilds/${buildId}/delete_attachment/${thisBuild.attachment_id[i]}.json`, {method:"DELETE",}); updateImages()}}>
                    </i>
                </div>
                <img src = {`${fpsbuildsurl}/${url}`} className="build-edit-images"/>
              </div>
          )}
                </div>
                </div>
                <form className="form" onSubmit={uploadBuildImages} id="newBuildImages">
                <div className="col">
                                <h3  style={{fontSize: "25px"}}>Add your build images :</h3>
                                <input type="file" 
                                  className="dropzone"
                                  id="file_upload" 
                                  name="attachment[]"
                                  multiple
                                  />
                    </div>
                    <div className= "update-build"> <input
                                type="submit"
                                value="Upload Images"
                                className="update-build-button"
                              />
                    </div>
                </form>
                <form className="form" onSubmit={updateBuild} id="updatePcbuild">
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
                          <th className = "component-price">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                          {thisBuild.pcbuild_parts.map(function(pcbuild_part) {
                          return (
                            <tr>
                            <td className = "edit-build-icon"><img src={build_icons[pcbuild_part.part.part_type]} className="build-icon"/></td>
                            <td className = "component">{pcbuild_part.part.part_type}</td> 
                            <td className = "component-description">
                                  <Select 
                                  name={"pcbuildpart_id[" + pcbuild_part.part.part_type + "][part_id]"}
                                  required
                                  options= {options[pcbuild_part.part.part_type]}
                                  placeholder={pcbuild_part.part.description}
                                  className= "component-description"
                                  defaultValue= {{label: pcbuild_part.part.description, value: pcbuild_part.part_id}}
                                  /> 
                            </td>
                            <td className = "part-price">
                                    <input
                                      type="text"
                                      name={"pcbuildpart_id[" + pcbuild_part.part.part_type + "][price]"}
                                      className="edit-build-price"
                                      id="moboprice"
                                      defaultValue={pcbuild_part.price}
                                      required
                                    />
                                    <input
                                      type="hidden"
                                      name={"pcbuildpart_id[" + pcbuild_part.part.part_type + "][id]"}
                                      defaultValue= {pcbuild_part.id}
                                      required
                                    />
                            </td>
                            </tr>
                           
                          )})} 
                      </tbody>
                    </table>
                    <div className="textarea"> Build Description
                           <textarea
                             type="textarea"
                             name="comments"
                             className="description"
                             defaultValue={thisBuild.comments}
                             required
                           />
                    </div>
                    <div className= "update-build"> 
                            <input
                              type="submit"
                              value="Update Build Info"
                              className="update-build-button"
                            />
                     </div>
                </form>
            </div>
          </div>
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
        timeout={3000} //3 secs
    /> 
  </div>
  }
  </>
)}
export default EditBuild;
