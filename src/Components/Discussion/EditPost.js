import React, {useContext} from "react"
import {Context} from "../../Context"
import { useHistory, useParams} from 'react-router-dom';
function EditPost(){
  const {discussions} = useContext(Context)
  const history = useHistory()
  const{posts,fpsbuildsurl} = useContext(Context)
  const {discussionId} = useParams()
  const {postId} = useParams()
  const thisPost = posts.filter(post => post.id.toString() === postId)
  const thisPostContent = thisPost.map(post => post.content)

 
    function EditPost(e) {
        const form = new FormData(document.getElementById("editPost"));
        
        fetch(`${fpsbuildsurl}/discussions/` + discussionId + "/posts/"+ postId + ".json", {
          method: "PATCH",
          body: form,
        });
       e.preventDefault();
         
         history.push(`/discussions/`+discussionId)

      }
     function deletePost(e) {
      const form = new FormData(document.getElementById("deleteDiscussion"));
      
      fetch(`${fpsbuildsurl}/discussions/` + discussionId +"/posts/"+ postId + ".json", {
        method: "DELETE",
        body: form,
      });
     e.preventDefault();
       
     history.push(`/discussions/`+discussionId)

    }
    
    return(
<section className = "section">
      <div className = "article-container">
        <div className="box">
        <h2 className="title is-5 has-text-grey-light">Edit Post</h2>
        <section className="forms text-center border border-light p-5">
          <form className="form" onSubmit={EditPost} id="editPost">
            <div className="form-row mb-4">
              <div className="textarea">
                <input
                  type="textarea"
                  name="content"
                  defaultValue= {thisPostContent}
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