import React, {useEffect, useState,useContext} from "react"
import {Context} from "../../Context"
import { useHistory, useParams} from 'react-router-dom';
function EditReply(){
  const {discussions} = useContext(Context)
  const history = useHistory()
  const{fpsbuildsurl} = useContext(Context)
  const {discussionId} = useParams()
  const {postId} = useParams()
  const {replyId} = useParams()
  const [thisReply, setThisReply]=useState([])
  
  useEffect(()=>{
    fetch(`${fpsbuildsurl}/discussions/`+ discussionId +"/posts/"+ postId + "/replies/" +replyId+ ".json")
    .then (res => res.json())
    .then (data => setThisReply(data))
},[])
  function EditReply(e) {
      const form = new FormData(document.getElementById("editPost"));
      fetch(`${fpsbuildsurl}/discussions/` + discussionId +"/posts/"+ postId + "/replies/" +replyId+ ".json",{
        method: "PATCH",
        body: form,
      });
      e.preventDefault();
      history.push(`/discussions/`+discussionId)
  }
  function deleteReply(e) {
    fetch(`${fpsbuildsurl}/discussions/` + discussionId +"/posts/"+ postId + "/replies/" +replyId+ ".json", {
      method: "DELETE",
    });
    e.preventDefault();
    history.push(`/discussions/`+discussionId)
  }
  console.log(thisReply)
  return(
    <section className = "section">
      <div className = "article-container">
        <div className="box" id="edit-post-box" style={{width: "75%", margin:"auto"}}>
          <h2 className="title is-5 has-text-grey-light">Edit Reply</h2>
          <section className="forms text-center" style={{width: "100%", height:"200%"}}>
            <form className="form" onSubmit={EditReply} id="editPost">
              <div className="form-row mb-4">
                <div className = "textarea">
                  <textarea
                    type="textarea"
                    name="content"
                    defaultValue= {thisReply.content}
                    className="description"
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="Update Reply"
                  className="button is-link"
                  style= {{textDecoration: "none", marginBottom:"10px"}}
                /> 
              </div>
            </form>
            <form className="form" onSubmit={deleteReply} id="deletePost">
              <input
                  type="submit"
                  value="Delete Reply"
                  className="button is-danger"
                  style= {{textDecoration: "none"}}
                  onClick = {e =>
                  window.confirm("Are you sure you wish to delete this post?") && deleteReply}
                />
            </form>
          </section>
         </div>
      </div>
    </section>
  )
}
export default EditReply;