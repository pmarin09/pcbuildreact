import React, {useContext, useEffect} from 'react'
import {Context} from "../../Context"
import { useHistory } from 'react-router-dom';
import mobo from "../../icons/mobo.png"
import cpu from "../../icons/cpu.png"
import gpu from "../../icons/gpu.png"
import cpucooler from "../../icons/cpucooler.png"
import ram from "../../icons/ram.png"
import hdd from "../../icons/hdd.png"
import psu from "../../icons/psu.png"
import monitor from "../../icons/monitor.png"
import keyboard from "../../icons/keyboard.png"
import mouse from "../../icons/mouse.png"
import headset from "../../icons/headset.png"
import pccase from "../../icons/pccase.png"
import Select from 'react-select'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ReactTooltip from 'react-tooltip';


function PcBuilds(){
  const{user, parts,toggleTheme, checkThemeStatus, loggedInStatus,fpsbuildsurl} = useContext(Context)
  const history = useHistory()
  const themeLabel = <form className="switch" onClick={toggleTheme}style={{float: "right"}} id="setDarkTheme">
                            <input 
                            type="hidden"
                            name="dark_theme"
                            id="theme-checkbox-hidden"
                            value={false}
                            />
                            <input 
                            type="checkbox"
                            name="dark_theme"
                            id="theme-checkbox"
                            value={true}
                            />
                            <span className="slider round"></span>
                    </form>
  const Mobo = (parts.filter(part => part.part_type === "Mobo")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const CPU = (parts.filter(part => part.part_type === "CPU")).map(a=>{return {value: a.id,label: <div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const CPUCooler = (parts.filter(part => part.part_type === "CPUCooler")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const GPU = (parts.filter(part => part.part_type === "GPU")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px",wordWrap: "normal"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const RAM = (parts.filter(part => part.part_type === "RAM")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const HD = (parts.filter(part => part.part_type === "HD")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Case = (parts.filter(part => part.part_type === "Case")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const PSU = (parts.filter(part => part.part_type === "PSU")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Monitor = (parts.filter(part => part.part_type === "Monitor")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Keyboard = (parts.filter(part => part.part_type === "Keyboard")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Mouse = (parts.filter(part => part.part_type === "Mouse")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const Headset = (parts.filter(part => part.part_type === "Headset")).map(a=>{return {value: a.id,label:<div><td style={{width: "350px",fontSize:"14px"}}>{a.description}</td><td style={{width: "280px"}}><img src ={a.get_imgurl} style={{height: "80px", borderRadius:"5px", marginBottom:"10px"}}/></td></div>, description: a.description}})
  const options = 
    {
        Mobo: Mobo,
        CPU: CPU,
        CPUCooler: CPUCooler,
        GPU: GPU,
        RAM: RAM,
        HD: HD,
        ExtraHD: HD,
        Case: Case,
        PSU: PSU,
        Monitor: Monitor,
        ExtraMonitor: Monitor,
        Keyboard: Keyboard,
        Mouse: Mouse,
        Headset: Headset,
    }
  const part_types = 
  [
    "Mobo",
    "CPU",
    "CPUCooler",
    "GPU",
    "RAM",
    "HD",
    "ExtraHD",
    "Case",
    "PSU",
    "Monitor",
    "ExtraMonitor",
    "Keyboard",
    "Mouse",
    "Headset",
  ]
  const build_icons = {
    Mobo: mobo,
    CPU: cpu,
    CPUCooler: cpucooler,
    GPU: gpu,
    RAM: ram,
    HD: hdd,
    ExtraHD: hdd,
    Case: pccase,
    PSU: psu,
    Monitor: monitor,
    ExtraMonitor: monitor,
    Keyboard: keyboard,
    Mouse: mouse,
    Headset: headset
  }
  const customStyles = {
  
    container: base => ({
      ...base,
      width: "100%",
      margin: "auto",
    }),
    control: base => ({
      ...base,
      height: 95,
      minHeight: 32,
      fontSize: 14,
      borderRadius: 5,
      textAlign: "left",
      cursor: "pointer"
    }),
    option: (provided) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      fontSize: 14,
      textAlign: "left",
      cursor: "pointer",
      color: "grey",
    }),
    valueContainer: base => ({
      ...base,
     height:100,
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
  function createBuild(e) {
    e.preventDefault();
    const form = new FormData(document.getElementById("newPcbuild"));
    fetch(`${fpsbuildsurl}/pcbuilds.json`, {
      method: "POST",
      body: form,
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      console.log("Success",data)
      toast.dark("Creating your build... ", {
        position: toast.POSITION.TOP_CENTER
      });
      history.push(`/`)
      setTimeout(() => window.location.reload(false),3000)
    })
    .catch((error) => {
      console.error("Error", error)
      toast.error("Please provide a valid image file.. ", {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }
  return(
    <>
    {(loggedInStatus === "LOGGED_IN") ?
    <section className = "section" id="build-section">
      <ReactTooltip />
      <section className="create-build-form" id="build-form" style={{borderColor: "grey"}}>
        <form className="form" onSubmit={createBuild} id="newPcbuild">
              <div className="col">
                {themeLabel}
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
              <h2 className="build-name" >Build Name:</h2>
                <input
                type="text"
                name="build_name"
                className="build-name-textbox"
                required
              />
            <div>
              <h2 className="build-images">Add build images:</h2>
              <input type="file" 
                className="build-images-dropzone"
                id="file_upload" 
                name="attachment[]"
                required
                multiple
                />
            </div>
            <div className="create-build-table" id="create-build-table">
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
                            {part_types.map(function(part) {
                              return (   
                                <>
                                  <div className = "create-build-detail-row" >
                                    <div className="row no-gutters align-items-center w-100"  >
                                        <div className = "build-detail-col-1" id="create-build-icon"><img src={build_icons[part]} className="build-icon" /></div>
                                        <div className = "build-detail-col-1" id="create-build-component" style={{fontWeight: "350",fontSize: "15px"}}>{part}</div>
                                        <div className = "component-description col-6" id="create-build-description">
                                            <Select 
                                              name={"part_id[" + part + "][id]"}
                                              required
                                              options= {options[part]}
                                              className= "component-description"
                                              placeholder="Select or type to search..."
                                              styles={customStyles}
                                              filterOption={customFilter}
                                              defaultValue= {{label: "Select or type to search"}}
                                              //value: (parts.filter(item => item.part_type === part && item.description === "Not Available")).map(a=>{return a.id})[0] 
                                            /> 
                                        </div>
                                        <div className = "build-detail-col-1" id="create-build-price-header" style={{fontSize: "13px"}}>Price</div>
                                        <div className="build-detail-col-2" id="create-build-price">
                                            <input
                                              type="text"
                                              name={"part_id[" + part + "][price]"}
                                              className="create-build-price"
                                              id="moboprice"
                                            />
                                        </div>
                                    </div>
                                  </div>
                                  {/* <hr className="build-detail-hr" id="build-detail-hr"></hr> */}
                                </>
                              )})}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            <div className="textarea"> <h3> Build Description </h3>
                <textarea
                  type="textarea"
                  name="comments"
                  className="description"
                />
            </div>
            <input
              type="submit"
              value="Create Build"
              className="button is-link"
            />
        </form>
      </section> 
    </section>
      : 
      ""}
      { (loggedInStatus === "LOGGED_IN") ?checkThemeStatus() :""}
      </>
  )
}
export default PcBuilds;

