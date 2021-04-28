import React, {useEffect, useState,useContext} from "react"
import {Context} from "../../Context"
import { useHistory, useParams} from 'react-router-dom';
function EditPost(){
  const {discussions} = useContext(Context)
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
  function EditPost(e) {
      const form = new FormData(document.getElementById("editPost"));
      fetch(`${fpsbuildsurl}/discussions/` + discussionId +"/posts/"+ postId + ".json",{
        method: "PATCH",
        body: form,
      });
      e.preventDefault();
      history.push(`/discussions/`+discussionId)
  }
  function deletePost(e) {
    fetch(`${fpsbuildsurl}/discussions/` + discussionId +"/posts/"+ postId + ".json", {
      method: "DELETE",
    });
    e.preventDefault();
    history.push(`/discussions/`+discussionId)
  }
  console.log(thisPost)
  return(
    <section className = "section">
      <div className = "article-container">
        <div className="box" id="edit-post-box" style={{width: "75%", margin:"auto"}}>
          <h2 className="title is-5 has-text-grey-light">Edit Post</h2>
          <section className="forms text-center" style={{width: "100%", height:"200%"}}>
            <form className="form" onSubmit={EditPost} id="editPost">
              <div className="form-row mb-4">
                <div className = "textarea">
                  <textarea
                    type="textarea"
                    name="content"
                    defaultValue= {thisPost.content}
                    className="description"
                    required
                  />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="Update Post"
                  className="button is-link"
                  style= {{textDecoration: "none", marginBottom:"10px"}}
                /> 
              </div>
            </form>
            <form className="form" onSubmit={deletePost} id="deletePost">
              <input
                  type="submit"
                  value="Delete Post"
                  className="button is-danger"
                  style= {{textDecoration: "none"}}
                  onClick = {e =>
                  window.confirm("Are you sure you wish to delete this post?") && deletePost}
                />
            </form>
          </section>
         </div>
      </div>
    </section>
  )
}
export default EditPost;