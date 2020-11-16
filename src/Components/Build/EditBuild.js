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
import psu from "../../icons/pws.png"
import monitor from "../../icons/monitor.png"
import keyboard from "../../icons/keyboard.png"
import mouse from "../../icons/mouse.png"
import headset from "../../icons/headset.png"
import pccase from "../../icons/pccase.png"
import Select from 'react-select'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function EditBuild (){
  const {allBuilds,user,parts,fpsbuildsurl,updateImages,updateBuilds}=useContext(Context)
  const history = useHistory()
  const {buildId} = useParams()
  const thisBuild = allBuilds.find(build => build.id.toString() === buildId)
  const Mobo = (parts.filter(part => part.part_type === "Mobo")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const CPU = (parts.filter(part => part.part_type === "CPU")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const CPUCooler = (parts.filter(part => part.part_type === "CPUCooler")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const GPU = (parts.filter(part => part.part_type === "GPU")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const RAM = (parts.filter(part => part.part_type === "RAM")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const HD = (parts.filter(part => part.part_type === "HD")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Case = (parts.filter(part => part.part_type === "Case")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const PSU = (parts.filter(part => part.part_type === "PWS")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Monitor = (parts.filter(part => part.part_type === "Monitor")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Keyboard = (parts.filter(part => part.part_type === "Keyboard")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Mouse = (parts.filter(part => part.part_type === "Mouse")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Headset = (parts.filter(part => part.part_type === "Headset")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const options = {
    Mobo: Mobo,
    CPU: CPU,
    CPUCooler: CPUCooler,
    GPU: GPU,
    RAM: RAM,
    HD: HD,
    Case: Case,
    PWS: PSU,
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
    PWS: psu,
    Monitor: monitor,
    Keyboard: keyboard,
    Mouse: mouse,
    Headset: headset
  }
  const part_types = 
  [
    "Mobo",
    "CPU",
    "CPUCooler",
    "GPU",
    "RAM",
    "HD",
    "Case",
    "PSU",
    "Monitor",
    "Keyboard",
    "Mouse",
    "Headset",
  ]
  const customStyles = {
  
    container: base => ({
      ...base,
      width: "100%"
    }),
    control: base => ({
      ...base,
      height: 90,
      minHeight: 32,
      fontSize: 14,
      borderRadius: 5,
      marginLeft:10,
      textAlign: "left",
      cursor: "pointer"
    }),
    option: (provided) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      fontSize: 14,
      textAlign: "left",
      cursor: "pointer",
    }),
    valueContainer: base => ({
      ...base,
     height:100,
     color: "grey",
     fontSize: 12,
     whiteSpace: "none",
    }),
    singleValue: base => ({
      ...base,
     whiteSpace: "none",
    }),

    }
  const customFilter = (option, searchText) => {
      if (
        option.data.description.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
  }
  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }
  function updateBuild(e) {
    e.preventDefault();
    const form = new FormData(document.getElementById("updatePcbuild"));
    fetch(`${fpsbuildsurl}/pcbuilds/${buildId}.json`, {
      method: "PATCH",
      body: form,
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      console.log("Success",data)
      updateBuilds();
    })
    toast.success("Updating your build... ", {
      position: toast.POSITION.TOP_CENTER
    });
    setTimeout( () => window.location.reload(false),1000)
  }
  function uploadBuildImages(e) {
    e.preventDefault();
    const form = new FormData(document.getElementById("newBuildImages"));
    fetch(`${fpsbuildsurl}/pcbuilds/${buildId}/update_attachment/${buildId}.json`, {
      method: "PATCH",
      body: form,
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      console.log("Success",data)
      updateImages();
    })
    .catch((error) => {
      console.error("Error", error)
      toast.error("Please provide a valid image file.. ", {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }
  console.log(thisBuild)
return (
  <>
  {thisBuild ? 
  <div>
      <hr></hr>
      <div className="profile-container">
        <div className="row">
          <div className="col-xs-3 col-sm-3" >{thisBuild.attachment_url ? <img src = {`${fpsbuildsurl}/${thisBuild.attachment_url[0]}`}  className="build-img-avatar"/> : <Gravatar email="1000-email@example.com" /> }
          </div>
          <div className="col-sm-9">
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
                                  value={thisBuild.user_id}
                                  className="description"
                                  required
                                  style={{display: "none"}}
                                />
                                <input
                                  type="text"
                                  name="username"
                                  value={thisBuild.username}
                                  className="description"
                                  required
                                  style={{display: "none"}}
                                />
                      <div className="profile-username" style={{textAlign: "center", marginTop: "20px"}}> Build Name: </div>
                      <input
                             type="text"
                             name="build_name"
                             className="profile-username" style={{textAlign: "center", marginLeft: "185px", borderRadius: "15px"}}
                             defaultValue={thisBuild.build_name}
                      />
           <div className="create-build-table dark" style={{marginTop: "30px"}} id="create-build-table">
              <div className="row">
                  <div className="col-md-12">
                      <div className="create-build-detail-card mb-3">
                          <div className="card-header pr-0 pl-0">
                              <div className="row no-gutters align-items-center w-100">
                                  <div className="col-1 text-muted" style={{paddingLeft: "15px",margin:"auto", textAlign:"center", paddingRight: "none !important"} } id="component-header">Icon</div>
                                  <div className="d-none d-md-block col text-muted">
                                      <div className="row no-gutters align-items-center">
                                          <div className="build-detail-col-2">Component</div>
                                          <div className="build-detail-col-4">Description</div>
                                          <div className="build-detail-col-2">Price USD</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="create-build-detail-card-body">
                            {thisBuild.pcbuild_parts.map(function(pcbuild_part) {
                              return (   
                                <>
                                  <div className = "create-build-detail-row" >
                                    <div className="row no-gutters align-items-center w-100"  >
                                        <div className = "build-detail-col-1" id="create-build-icon"><img src={build_icons[pcbuild_part.part.part_type]}/></div>
                                        <div className = "build-detail-col-1" id="create-build-component" style={{fontSize: "11px", color: "white"}}>{pcbuild_part.part.part_type}</div>
                                        <div className = "component-description col-6" id="create-build-description">
                                        <Select 
                                          name={"pcbuildpart_id[" + pcbuild_part.part.part_type + "][part_id]"}
                                          required
                                          options= {options[pcbuild_part.part.part_type]}
                                          placeholder={pcbuild_part.part.description}
                                          className= "component-description"
                                          styles={customStyles}
                                          filterOption={customFilter}
                                          // defaultValue= {{label: pcbuild_part.part.description, value: pcbuild_part.part_id}}
                                          defaultValue= {{label: pcbuild_part.part.description, value: pcbuild_part.part_id}}
                                        /> 
                                        </div>
                                        <div className = "build-detail-col-1" id="create-build-price-header" style={{color: "white"}}>Price</div>
                                        <div className="build-detail-col-2" id="create-build-price">
                                          <input
                                            type="text"
                                            name={"pcbuildpart_id[" + pcbuild_part.part.part_type + "][price]"}
                                            className="edit-build-price"
                                            id="moboprice"
                                            defaultValue={pcbuild_part.price}
                                          />
                                          <input
                                            type="hidden"
                                            name={"pcbuildpart_id[" + pcbuild_part.part.part_type + "][id]"}
                                            defaultValue= {pcbuild_part.id}
                                            required
                                          />
                                        </div>
                                    </div>
                                  </div>
                                  <hr className="build-detail-hr"></hr>
                                </>
                              )})}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
                    <div className="textarea"> Build Description
                           <textarea
                             type="textarea"
                             name="comments"
                             className="description"
                             defaultValue={thisBuild.comments}
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
