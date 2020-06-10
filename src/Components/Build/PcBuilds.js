import React, {useState,useContext, useEffect} from 'react'
import {Context} from "../../Context"
import { useHistory } from 'react-router-dom';
  function PcBuilds(){
  const[pcbuilds, setPcbuilds]=useState([])
  const{user} = useContext(Context)
  const{allBuilds} = useContext(Context)
  const{checkLoginStatus} = useContext(Context)
  const history = useHistory()




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


  function handleFileInputChange(event) {
    let body = new FormData()
    body.append('pcbuilds[attachment]', event.target.files[0] )
    fetch(
      `http://localhost:3000/pcbuilds.json`,
      {
        method: 'post',
        body: body
      }
    )
    .then((response) => response.json())
    .then((pcbuild) => {
      pcbuilds.unshift(pcbuild)
      setPcbuilds(pcbuilds)
 
    })
  }

 

    return(
    
      <div className="pcbuilds_container">

        <div className="row">
          <div className="col">
            <form onSubmit={createBuild} id="newPcbuild">
              <div className="form-group" >
                <label htmlFor="file_upload">Upload Your PC Build</label>
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
                <input
              type="submit"
              value="Create Build"
              className="button is-link"
              />
              </div>
            </form>
          </div>
        </div>

        {allBuilds.map((pcbuildRow, rowIndex) =>
          <div key={`pcbuild_row_${rowIndex}`} className="row">
            {allBuilds.map((pcbuild, columnIndex) =>
              <div key={`pcbuild_row_${rowIndex}_col_${columnIndex}`} className="col-sm-9">
                <img data-id={pcbuild.id} src={`http://localhost:3000/${pcbuild.attachment_url}`} />
              </div>
            )}
          </div>
        )}


      </div>
      
    )
  }


export default PcBuilds

