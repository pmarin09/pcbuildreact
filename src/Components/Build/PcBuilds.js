import React, {useState,useContext, useEffect} from 'react'
import {Context} from "../../Context"
import { useHistory } from 'react-router-dom';
  function PcBuilds(){
  
  const{user, parts, checkLoginStatus, loggedInStatus} = useContext(Context)
  const history = useHistory()
  
  const Mobo = parts.map(part => part.part_type === "Mobo" ? (<option value = {part.id}>{part.description}</option>): "")
  const CPU = parts.map(part => part.part_type === "CPU" ? (<option value = {part.id}>{part.description}</option>): "")
  const CPUCooler = parts.map(part => part.part_type === "CPUCooler" ? (<option value = {part.id}>{part.description}</option>): "")
  const GPU = parts.map(part => part.part_type === "GPU" ? (<option value = {part.id}>{part.description}</option>): "")
  const RAM = parts.map(part => part.part_type === "RAM" ? (<option value = {part.id}>{part.description}</option>): "")
  const HD = parts.map(part => part.part_type === "HD" ? (<option value = {part.id}>{part.description}</option>): "")
  const Case = parts.map(part => part.part_type === "Case" ? (<option value = {part.id}>{part.description}</option>): "")
  const PWS = parts.map(part => part.part_type === "PWS" ? (<option value = {part.id}>{part.description}</option>): "")
  const Monitor = parts.map(part => part.part_type === "Monitor" ? (<option value = {part.id}>{part.description}</option>): "")
  const Keyboard = parts.map(part => part.part_type === "Keyboard" ? (<option value = {part.id}>{part.description}</option>): "")
  const Mouse = parts.map(part => part.part_type === "Mouse" ? (<option value = {part.id}>{part.description}</option>): "")
  const Headset = parts.map(part => part.part_type === "Headset" ? (<option value = {part.id}>{part.description}</option>): "")
 

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
  },[])

    return(
    <>
    {(loggedInStatus === "LOGGED_IN") ?
    <section className = "section">
      <h2 className="title is-5 has-text-grey-light">Create a New Build</h2>

<section className="forms text-center border border-light p-5">
  <form className="form" onSubmit={createBuild} id="newPcbuild">
  <div className="col">
              Image:
              <input type="file" 
                className="dropzone"
                id="file_upload" 
                name="attachment[]"
                required
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
      <table className="table table-hover">
    <thead>
      <tr>
        <th>Icon</th>
        <th>Component</th>
        <th>Description</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
    <tr>
        <td>MOBO ICON</td>
        <td>Motherboard</td> 
        <td>
              <select
                type="select"
                name="part_id[Mobo][id]"
                className="dropdown"
                id = "mobo">
              {Mobo}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[Mobo][price]"
                  className="price"
                  id="moboprice"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>CPU ICON</td>
        <td>CPU</td> 
        <td>
              <select
                type="select"
                name="part_id[CPU][id]"
                className="dropdown">
              {CPU}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[CPU][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Cooler ICON</td>
        <td>CPU Cooler</td> 
        <td>
              <select
                type="select"
                name="part_id[CPUCooler][id]"
                className="dropdown">
              {CPUCooler}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[CPUCooler][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>GPU ICON</td>
        <td>Video Card</td> 
        <td>
              <select
                type="select"
                name="part_id[GPU][id]"
                className="dropdown">
              {GPU}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[GPU][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>RAM ICON</td>
        <td>RAM</td> 
        <td>
              <select
                type="select"
                name="part_id[RAM][id]"
                className="dropdown">
              {RAM}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[RAM][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>HD ICON</td>
        <td>Hard Drive 1</td> 
        <td>
              <select
                type="select"
                name="part_id[HD][id]"
                className="dropdown">
              {HD}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[HD][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>HD ICON</td>
        <td>Hard Drive 2</td> 
        <td>
              <select
                type="select"
                name="part_id[HD][id]"
                className="dropdown">
              {HD}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[HD][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Case Icon</td>
        <td>Case</td> 
        <td>
              <select
                type="select"
                name="part_id[Case][id]"
                className="dropdown">
              {Case}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[Case][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>PWS ICON</td>
        <td>Power Supply</td> 
        <td>
              <select
                type="select"
                name="part_id[PWS][id]"
                className="dropdown">
              {PWS}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[PWS][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Monitor ICON</td>
        <td>Monitor</td> 
        <td>
              <select
                type="select"
                name="part_id[Monitor][id]"
                className="dropdown">
              {Monitor}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[Monitor][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Keyboard ICON</td>
        <td>Keyboard</td> 
        <td>
              <select
                type="select"
                name="part_id[Keyboard][id]"
                className="dropdown">
              {Keyboard}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[Keyboard][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Mouse ICON</td>
        <td>Mouse</td> 
        <td>
              <select
                type="select"
                name="part_id[Mouse][id]"
                className="dropdown">
              {Mouse}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[Mouse][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
      <tr>
        <td>Headset ICON</td>
        <td>Headset</td> 
        <td>
              <select
                type="select"
                name="part_id[Headset][id]"
                className="dropdown">
              {Headset}
              </select>
        </td>
        <td>
                <input
                  type="text"
                  name="part_id[Headset][price]"
                  className="price"
                  required
                />
        </td>
      </tr>
    </tbody>
  </table>
    <div className="textarea"> Comments
                <input
                  type="text"
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

