import React, {useContext,useState,useEffect} from "react"
import {Context} from "../../Context"
import { useHistory } from 'react-router-dom';
function NewDiscussion(){
  const{forums, user, checkLoginStatus} = useContext(Context)
  const history = useHistory()
  const forumData = forums.map(forum => (<option value = {forum.id}>{forum.title}</option>))
  
  function createDiscussion(e) {
        const form = new FormData(document.getElementById("newDiscussion"));
        
        fetch("https://fpsbuilds-back-staging.herokuapp.com/discussions.json", {
          method: "POST",
          body: form,
        });
        e.preventDefault();
        history.push(`/discussions`)
        window.location.reload(false);
  }
   useEffect(()=>{
    checkLoginStatus()
  },[])

    return(
<section className = "section">
      <div className = "article-container">
        <div className="request">
        <h2 className="title is-5 has-text-grey-light">Create a New Discussion</h2>
        <section className="forms text-center border border-light p-5">
          <form className="form" onSubmit={createDiscussion} id="newDiscussion">
            <div className="form-row mb-4">
              <div className="col">
                Title:
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  required
                />
              
              <div className="textarea" rows="15">
               Description:
                <textarea
                  type="textarea"
                  name="description"
                  className="description"
                  required
                />
              </div>
              
              <div>
                <select
                  type="select"
                  name="forum_id"
                  className="form-control"
                >
                {forumData}
                </select>
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
              </div>
            </div>
            </div>
            <input
              type="submit"
              value="New Discussion"
              className="button is-link"
            />
          </form>
        </section>
      </div>
      </div>
  </section>
    )
}

export default NewDiscussion;