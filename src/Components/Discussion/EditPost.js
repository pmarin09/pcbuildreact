import React, {useEffect, useState,useContext} from "react"
import {Context} from "../../Context"
import { useHistory, useParams} from 'react-router-dom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
function EditPost(){
  const {discussions} = useContext(Context)
  const history = useHistory()
  const{fpsbuildsurl} = useContext(Context)
  const {discussionId} = useParams()
  const {postId} = useParams()
  const [thisPost, setThisPost]=useState([])
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [message, SetMessage] = useState("");
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

  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={emoji => SetMessage(message + emoji.native)}
        theme ="dark"
        style={{ margin: "8px",position: "relative", zIndex:"1",width: "100%"}}
        color= "#0f171d"
        perline= "10"
        sheetSize="64"
      />
    );
  }
  function triggerPicker(event) {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }
 
  return(
    <section className = "section" onMouseEnter= {e=> SetMessage(thisPost.content) }>
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
                    defaultValue={message}
                    className="description"
                    onChange={e => SetMessage(e.target.value)}
                    required
                  />
                  <i className="far fa-grin"
                    onClick={triggerPicker}
                     id="emoji-button">
                  </i>
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
              {emojiPicker}
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