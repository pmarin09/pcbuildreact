import React, {useContext} from "react"
import {Context} from "../../Context"
import { useHistory, useParams} from 'react-router-dom';
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function EditDiscussion(){
  const {fpsbuildsurl,forums, discussions} = useContext(Context)
  const history = useHistory()
  const {discussionId} = useParams()
  const thisDiscussion = discussions.filter(discussion => discussion.id.toString() === discussionId)
  const thisDiscussionTitle = thisDiscussion.map(discussion => discussion.title)
  const thisDiscussionDescription = thisDiscussion.map(discussion => discussion.description)
  const forumData = forums.map(forum => (<option value = {forum.id}>{forum.title}</option>))
  function editDiscussion(e) {
        const form = new FormData(document.getElementById("editDiscussion"));
        fetch(`${fpsbuildsurl}/discussions/` + discussionId + ".json", {
          method: "PATCH",
          body: form,
        });
       e.preventDefault();
       toast.success("Editing Discussion.. ", {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout( () => {
        history.push(`/discussions`)
        window.location.reload(false)
      },1000)
  }
  function deleteDiscussion(e) {
      const form = new FormData(document.getElementById("deleteDiscussion"));
      fetch(`${fpsbuildsurl}/discussions/` + discussionId + ".json", {
        method: "DELETE",
        body: form,
      });
      e.preventDefault();
      toast.error("Deleting Discussion.. ", {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout( () => {
        history.push(`/discussions`)
        window.location.reload(false)
      },2000)
  }
  return(
    <section className = "section">
      <ToastContainer 
        autoClose={1500}
      />
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
                    <textarea
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
              <form className="form" id="deleteDiscussion">
              <input
                  type="submit"
                  value="Delete Discussion"
                  className="button is-danger"
                  style= {{textDecoration: "none"}}
                  onClick = {e =>
                  window.confirm("Are you sure you wish to delete this item?") && deleteDiscussion(e)}
                />
                </form>
            </section>
          </div>
          </div>
      </section>
  )
}
export default EditDiscussion;