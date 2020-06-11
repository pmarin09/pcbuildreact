import React, {useState,useContext, useEffect} from 'react'
import {Context} from "../../Context"
import { useHistory } from 'react-router-dom';
  function PcBuilds(){
  const[pcbuilds, setPcbuilds]=useState([])
  const{user} = useContext(Context)
  const{allBuilds} = useContext(Context)
  const{parts} = useContext(Context)
  const{checkLoginStatus} = useContext(Context)
  const{loggedInStatus} = useContext(Context)
  const history = useHistory()
  
  const RamParts = parts.filter(part => part.id === 1)

  const RamDescription = RamParts.map(part => (
    <option value = {part.id}>{part.description}</option>))
   
  console.log(RamDescription)


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
    <div className = "article-container">
      <div className="request">
      <h2 className="title is-5 has-text-grey-light">Create a New Build</h2>
      <section className="forms text-center border border-light p-5">
        <form className="form" onSubmit={createBuild} id="newPcbuild">
          <div className="form-row mb-4">
            
            <div className="col">
              Image:
              <input type="file" 
                className="dropzone"
                id="file_upload" 
                name="attachment"
                required
                multiple
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
            
            <div> RAM Module:
              <select
                type="select"
                name="part_id"
                className="form-control"
              >
                {RamDescription}
              </select>
      
            </div>
          </div>
          </div>
          <input
            type="submit"
            value="Create Build"
            className="button is-link"
          />
        </form>
      </section>
    </div>
    </div>
  </section>
      : 
      history.push("/")}
      </>
    )
  }


export default PcBuilds

