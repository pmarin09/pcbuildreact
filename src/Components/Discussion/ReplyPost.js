import React, {useEffect, useState,useContext} from "react"
import {Context} from "../../Context"
import { useHistory, useParams} from 'react-router-dom';
function ReplyPost(){
  const {user} = useContext(Context)
  const history = useHistory()
  const{fpsbuildsurl} = useContext(Context)
  const {discussionId} = useParams()
  const {postId} = useParams()
  const [thisPost, setThisPost]=useState([])
  
  useEffect(()=>{
    fetch(`${fpsbuildsurl}/discussions/`+ discussionId +"/posts/"+ postId + ".json")
    .then (res => res.json())
    .then (data => setThisPost(data))
},[])

function updateReplies(){
  fetch(`${fpsbuildsurl}/discussions/`+ discussionId +"/posts/"+ postId + ".json")
    .then (res => res.json())
    .then (data => setThisPost(data))
}
  function ReplyPost(e) {
      e.preventDefault();
      const form = new FormData(document.getElementById("editPost"));
      fetch(`${fpsbuildsurl}/discussions/` + discussionId +"/posts/"+ postId + "/replies.json",{
        method: "POST",
        body: form,
      })
      .then(response => response.json())
        .then(data => {
          console.log("Success",data)
          updateReplies()
        })
        
      history.push(`/discussions/`+ discussionId)
  }

  return(
    <section className = "section">
      <div className = "article-container">
        <div className="box" id="edit-post-box" style={{width: "75%", margin:"auto"}}>
          <h2 className="title is-5 has-text-grey-light">Reply to Post</h2>
          <section className="forms text-center" style={{width: "100%", height:"200%"}}>
            <form className="form" onSubmit={ReplyPost} id="editPost">
              <div className="form-row mb-4">
                <div className = "textarea">
                  <textarea
                    type="textarea"
                    name="content"
                    // defaultValue= {thisPost.content}
                    className="description"
                    required
                  />
                  <input
                                  type="text"
                                  name="user_id"
                                  value={user.id}
                                  className="description"
                                  required
                                  style={{display: "none"}}
                                />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="Reply to Post"
                  className="button is-link"
                  style= {{textDecoration: "none", marginBottom:"10px"}}
                /> 
              </div>
            </form>
          </section>
         </div>
      </div>
    </section>
  )
}
export default ReplyPost;