import React, {useContext} from "react"
import {Context} from "../../Context"
import { useHistory, useParams} from 'react-router-dom';
function EditBuildPost(){
  const history = useHistory()
  const {buildId} = useParams()
  const{buildposts} = useContext(Context)
  const {buildpostId} = useParams()
  const thisBuildPost = buildposts.filter(post => post.id.toString() === buildpostId)
  const thisBuildPostContent = thisBuildPost.map(post => post.content)

 
    function EditBuildPost(e) {
        const form = new FormData(document.getElementById("editBuildPost"));
        
        fetch("https://fpsbuilds-back-staging.herokuapp.com/buildposts/" + buildpostId + ".json", {
          method: "PATCH",
          body: form,
        });
       e.preventDefault();
         
         history.goBack()
        

      }
     function deleteBuildPost(e) {
      const form = new FormData(document.getElementById("deleteBuildPost"));
      
      fetch("https://fpsbuilds-back-staging.herokuapp.com/buildposts/" + buildpostId + ".json", {
        method: "DELETE",
        body: form,
      });
     e.preventDefault();
       
     history.goBack()
     

    }
    
    return(
<section className = "section">
      <div className = "article-container">
        <div className="box">
        <h2 className="title is-5 has-text-grey-light">Edit Post</h2>
        <section className="forms text-center border border-light p-5">
          <form className="form" onSubmit={EditBuildPost} id="editBuildPost">
            <div className="form-row mb-4">
              <div className="textarea">
                <input
                  type="textarea"
                  name="content"
                  defaultValue= {thisBuildPostContent}
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
          <form className="form" onSubmit={deleteBuildPost} id="deleteBuildPost">
          <input
              type="submit"
              value="Delete Post"
              className="button is-danger"
              style= {{textDecoration: "none"}}
              onClick = {e =>
              window.confirm("Are you sure you wish to delete this post?") && deleteBuildPost}
            />
            </form>
        </section>
      </div>
      </div>
  </section>
    )
}

export default EditBuildPost;