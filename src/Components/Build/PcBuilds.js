import React, {useContext, useEffect} from 'react'
import {Context} from "../../Context"
import { useHistory } from 'react-router-dom';
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
        Case: Case,
        PWS: PSU,
        Monitor: Monitor,
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
    "Case",
    "PWS",
    "Monitor",
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
    Case: pccase,
    PWS: psu,
    Monitor: monitor,
    Keyboard: keyboard,
    Mouse: mouse,
    Headset: headset
  }
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
      width: 500,
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
  console.log(loggedInStatus)
  return(
    <>
    
    {(loggedInStatus === "LOGGED_IN") ?
    <section className = "section">
      <ReactTooltip />
      <section className="create-build-form" id="build-form">
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
                <h2 className="build-name" >Build Title:</h2>
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
          <table className="create-build-table" id="create-build-table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th className = "component">Component</th>
                  <th className = "component-description" data-tip="Select Other if your component does not appear on the list">Description</th>
                  <th className = "component-price">Price USD </th>
                </tr>
              </thead>
              <tbody>
              {part_types.map(function(part) {
                return (
                <tr>
                  <td><img src={build_icons[part]} className="build-icon" /> </td>
                  <td className = "component">{part}</td> 
                  <td className = "component-description">
                        <Select 
                        name={"part_id[" + part + "][id]"}
                        required
                        options= {options[part]}
                        className= "component-description"
                        placeholder="Select or type to search..."
                        styles={customStyles}
                        filterOption={customFilter}
                        defaultValue= {{label: "Select or type to search", value: (parts.filter(item => item.part_type === part && item.description === "Not Available")).map(a=>{return a.id})[0] }}
                        /> 
                  </td>
                  <td className = "part-price">
                          <input
                            type="text"
                            name={"part_id[" + part + "][price]"}
                            className="create-build-price"
                            id="moboprice"
                          />
                  </td>
                </tr>
                    )})}
              </tbody>
          </table>
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

