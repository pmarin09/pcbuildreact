import React, {useEffect, useState,useContext} from "react"
import {Context} from "../../Context"
import { useHistory, useParams} from 'react-router-dom';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function EditReply(){
  const {discussions} = useContext(Context)
  const history = useHistory()
  const{fpsbuildsurl} = useContext(Context)
  const {discussionId} = useParams()
  const {postId} = useParams()
  const {replyId} = useParams()
  const [thisReply, setThisReply]=useState([])
  const [emojiPickerState, SetEmojiPicker] = useState(false);
  const [message, SetMessage] = useState("");
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
    <>
    {thisReply ? 
    <section className = "section" onMouseEnter= {e=> SetMessage(thisReply.content)}>
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
                    onChange={e => SetMessage(e.target.value)}
                    defaultValue= {message}
                    className="description"
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
                  value="Update Reply"
                  className="button is-link"
                  style= {{textDecoration: "none", marginBottom:"10px"}}
                /> 
              </div>
              {emojiPicker}
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
    :
    ""
    }
    </>
  )
}
export default EditReply;