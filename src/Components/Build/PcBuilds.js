import React, {useContext, useEffect} from 'react'
import {Context} from "../../Context"
import { useHistory } from 'react-router-dom';
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

  function PcBuilds(){
  
  const{user, parts, checkLoginStatus,toggleTheme, checkThemeStatus, loggedInStatus} = useContext(Context)
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
 
  
  function createBuild(e) {
    const form = new FormData(document.getElementById("newPcbuild"));

    fetch("http://localhost:3000/pcbuilds.json", {
      method: "POST",
      body: form,
    });
    e.preventDefault();
    history.push(`/pcbuilds`)
    window.location.reload(false);
  }

  useEffect(()=>{
    checkLoginStatus()
    checkThemeStatus()
  },[])
  
  console.log(user.dark_theme)
    return(
    <>
                       
    {(loggedInStatus === "LOGGED_IN") ?
    
    <section className = "section">
    
      
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
                <h2 className="build-name">Build Title:</h2>
                 <input
                  type="text"
                  name="build_name"
                  className="build-name-textbox"
                />
              <div>
              <h2 className="build-images">Add build images:</h2>
              <input type="file" 
                className="build-images-dropzone"
                id="file_upload" 
                name="attachment[]"
                required
                multiple
                 /></div>
      <table className="create-build-table" id="create-build-table">
    <thead>
      <tr>
        <th>Icon</th>
        <th className = "component">Component</th>
        <th className = "component-description">Description</th>
        <th className = "component-price">Price</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td><img src={mobo} className="build-icon"/></td>
        <td className = "component">Motherboard</td> 
        <td className = "component-description">
              <Select 
              name="part_id[Mobo][id]"
              required
              options= {Mobo}
              className= "component-description"
              placeholder="Select or type..."
              /> 
        </td>
        <td className = "part-price">
                <input
                  type="text"
                  name="part_id[Mobo][price]"
                  className="create-build-price"
                  id="moboprice"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={cpu} className="build-icon" /></td>
        <td className = "component">CPU</td> 
        <td className = "component-description">
              <Select 
              name="part_id[CPU][id]"
              required
              options= {CPU}
              placeholder="Select or type..."
              /> 
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[CPU][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={cpucooler} className="build-icon"/></td>
        <td className = "component">CPU Cooler</td> 
        <td className = "component-description">
            <Select 
              name="part_id[CPUCooler][id]"
              required
              options= {CPUCooler}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[CPUCooler][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={gpu} className="build-icon"/></td>
        <td className = "component">Video Card</td> 
        <td className = "component-description">
        <Select 
              name="part_id[GPU][id]"
              required
              options= {GPU}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[GPU][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={ram} className="build-icon"/></td>
        <td className = "component">RAM</td> 
        <td className = "component-description">
              <Select 
              name="part_id[RAM][id]"
              required
              options= {RAM}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[RAM][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={hdd} className="build-icon" /></td>
        <td className = "component">Hard Drive</td> 
        <td className = "component-description">
             <Select 
              name="part_id[HD][id]"
              required
              options= {HD}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[HD][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={pccase} className="build-icon"/></td>
        <td className = "component">Case</td> 
        <td className = "component-description">
              <Select 
              name="part_id[Case][id]"
              required
              options= {Case}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[Case][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={pws} className="build-icon"/></td>
        <td className = "component">Power Supply</td> 
        <td className = "component-description">
             <Select 
              name="part_id[PWS][id]"
              required
              options= {PWS}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[PWS][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={monitor} className="build-icon"/></td>
        <td className = "component">Monitor</td> 
        <td className = "component-description">
             <Select 
              name="part_id[Monitor][id]"
              required
              options= {Monitor}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[Monitor][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={keyboard} className="build-icon"/></td>
        <td className = "component">Keyboard</td> 
        <td className = "component-description">
              <Select 
              name="part_id[Keyboard][id]"
              required
              options= {Keyboard}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[Keyboard][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={mouse} className="build-icon" /></td>
        <td className = "component">Mouse</td> 
        <td className = "component-description">
              <Select 
              name="part_id[Mouse][id]"
              required
              options= {Mouse}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[Mouse][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td><img src={headset} className="build-icon" /></td>
        <td className = "component">Headset</td> 
        <td className = "component-description">
              <Select 
              name="part_id[Headset][id]"
              required
              options= {Headset}
              placeholder="Select or type..."
              />
        </td>
        <td className = "component-price">
                <input
                  type="text"
                  name="part_id[Headset][price]"
                  className="create-build-price"
                  required
                />
        </td>
      </tr>
    </tbody>
  </table>
    <div className="textarea"> Build Description
                <textarea
                  type="textarea"
                  name="comments"
                  className="description"
                  required
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
      history.push("/")}
      </>
    )
  }


export default PcBuilds

