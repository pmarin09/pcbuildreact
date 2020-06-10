import React, {useContext} from "react"
import {Context} from "../../Context"
import { useHistory, useParams, Link } from 'react-router-dom';

function EditDiscussion(){

  const {forums} = useContext(Context)
  const history = useHistory()
  const{discussions} = useContext(Context)
  const {discussionId} = useParams()
  const thisDiscussion = discussions.filter(discussion => 
    discussion.id.toString() === discussionId)
  const thisDiscussionTitle = thisDiscussion.map(discussion => 
    discussion.title
    )
  const thisDiscussionDescription = thisDiscussion.map(discussion => 
    discussion.description
    )
    const forumData = forums.map(forum => (
      <option value = {forum.id}>{forum.title}</option>
   ))

    function editDiscussion(e) {
        const form = new FormData(document.getElementById("editDiscussion"));
        
        fetch("http://localhost:3000/discussions/" + discussionId + ".json", {
          method: "PATCH",
          body: form,
        });
       e.preventDefault();
         
         history.push(`/discussions`)

      }
     function deleteDiscussion(e) {
      const form = new FormData(document.getElementById("deleteDiscussion"));
      
      fetch("http://localhost:3000/discussions/" + discussionId + ".json", {
        method: "DELETE",
        body: form,
      });
     e.preventDefault();
       
       history.push(`/discussions`)
       window.location.reload(false);
    }
    
    return(
<section className = "section">
      <div className = "article-container">
        <div className="box">
        <h2 className="title is-5 has-text-grey-light">Edit Discussion</h2>
        <section className="forms text-center border border-light p-5">
          <form className="form" onSubmit={editDiscussion} id="editDiscussion">
            <div className="form-row mb-4">
              <div className="col">
                Title:
                <input
                  type="text"
                  name="title"
                  defaultValue= {thisDiscussionTitle}
                  className="form-control"
                  required
                />
              
              <div className="textarea" rows="15">
               Description:
                <input
                  type="text"
                  name="description"
                  defaultValue= {thisDiscussionDescription}
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
              
              </div>
              </div>
            </div>
            <div>
            <input
              type="submit"
              value="Edit Discussion"
              className="button is-link"
              style= {{textDecoration: "none" , marginBottom:"10px"}}
            /> 
            </div>
          </form>
          <form className="form" onSubmit={deleteDiscussion} id="deleteDiscussion">
          <input
              type="submit"
              value="Delete Discussion"
              className="button is-danger"
              style= {{textDecoration: "none"}}
              onClick = {e =>
              window.confirm("Are you sure you wish to delete this item?") && deleteDiscussion}
            />
            </form>
        </section>
      </div>
      </div>
  </section>
    )
}

export default EditDiscussion;