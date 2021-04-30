import React, {useContext, useState,useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import {Context} from "../../Context"
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { Button } from 'react-bulma-components';
import Pagination from '../../Pagination';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function DiscussionDetail() {
    const{discussions, user, adminId, toggleTheme, checkThemeStatus,loggedInStatus,fpsbuildsurl} = useContext(Context)
    const {discussionId} = useParams()
    const thisDiscussion = discussions.find(discussion => discussion.id.toString() === discussionId)
    const [emojiPickerState, SetEmojiPicker] = useState(false);
    const [message, SetMessage] = useState("");
    function showPosts(){ 
      return(      posts.map(post => (
      <div className="posts-box">
          <article className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                {post.user.attachment_url ? <img src = {`${fpsbuildsurl}/${post.user.attachment_url}`} className="discussion-avatar" /> : <Gravatar email={post.user.email}  className = "discussion-avatar" size={100} default="robohash"/>}
                </figure>
              </div>
              <div className="media-content" id= "post-content">
                <div className="content">
                {post.content}
                <hr></hr>
                <p><em><small>Posted <TimeAgo datetime={post.created_at}/>  by {post.username}</small>
                      </em>
                      </p>
                </div>
               
                {(user.id === post.user_id && loggedInStatus === "LOGGED_IN") || user.id === adminId ?
                <nav className="level is-mobile">
                    <div className="level-left">
                    <a className="level-item">
                        <Link to={`/${post.discussion_id}/editPost/${post.id}`} style={{textDecoration: "none"}}> <i className="ri-edit-box-fill"></i></Link>
                    </a>
                    <a className="level-item">
                        <i className="ri-delete-bin-5-fill"onClick ={ (e) => { 
                          e.preventDefault();
                          fetch(`${fpsbuildsurl}/discussions/` + discussionId +"/posts/"+ post.id + ".json", {
                            method: "DELETE",
                          })
                        window.location.reload();
                        }}></i>
                    </a>
                    </div>
                </nav>
                :
                ""}
                {loggedInStatus === "LOGGED_IN" || user.id === adminId ?
                  <a className="level-item" style={{float: "right"}}>
                    <Link to={`/${post.discussion_id}/replyPost/${post.id}`} style={{textDecoration: "none"}}><span>Reply</span></Link>
                    </a>
                    :
                    ""}
              </div>
          </article>
                {post.replies.map(reply => {
                  return(
                    <div className="posts-box" style={{width: "85%"}}>
                    <article className="media">
                        <div className="media-left">
                          <figure className="image is-48x48">
                          {reply.user.attachment_url ? <img src = {`${fpsbuildsurl}/${reply.user.attachment_url}`} className="discussion-avatar" /> : <Gravatar email={reply.user.email}  className = "discussion-avatar" size={100} default="robohash"/>}
                          </figure>
                        </div>
                        <div className="media-content" id= "post-content">
                          <div className="content">
                  {reply.content}
                  <hr></hr>
                <p><em><small>Posted <TimeAgo datetime={reply.created_at}/>  by {reply.user.username}</small>
                      </em>
                      </p>
                </div>
                {(user.id === reply.user_id && loggedInStatus === "LOGGED_IN") || user.id === adminId ?
                <nav className="level is-mobile">
                    <div className="level-left">
                    <a className="level-item">
                        <Link to={`/${post.discussion_id}/${post.id}/editReply/${reply.id}`} style={{textDecoration: "none"}}> <i className="ri-edit-box-fill"></i></Link>
                    </a>
                    <a className="level-item">
                        <i className="ri-delete-bin-5-fill"onClick ={ (e) => { 
                          e.preventDefault();
                          fetch(`${fpsbuildsurl}/discussions/` + discussionId +"/posts/"+ post.id + "/replies/" +reply.id+ ".json", {
                            method: "DELETE",
                          })
                        window.location.reload();
                        }}></i>
                    </a>
                    </div>
                </nav>
                :
                ""}
              </div>
          </article>
          </div>  
                )})}
        </div>
   )))}
   
    function createPost(e) {
        e.preventDefault();
        const form = new FormData(document.getElementById("newPost"));
        fetch(`${fpsbuildsurl}/discussions/${discussionId}/posts.json`, {
          method: "POST",
          body: form,
        })
        .then(response => response.json())
        .then(data => {
          console.log("Success",data)
          updatePosts()
          SetMessage("")
        })
      }

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

  const [posts, setPosts]=useState([])
  function updatePosts(){
    fetch(`${fpsbuildsurl}/discussions/${discussionId}/posts.json`)
        .then (res => res.json())
        .then (data => setPosts(data))
  }
  
    useEffect(()=>{
        fetch(`${fpsbuildsurl}/discussions/${discussionId}/posts.json`)
        .then (res => res.json())
        .then (data => setPosts(data))
        console.log(posts)
    },[])
 
   //PAGINATION 
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage] = useState(10);
   // Get current posts
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = showPosts().slice(indexOfFirstPost, indexOfLastPost);
   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
<section className = "section">
    <div className = "container">
        <div className = "columns">
            <div className = "column is-9 dark" id ="posts-container">
            {/* <form className="switch" onClick={toggleTheme}style={{float: "right"}} id="setDarkTheme">
                        <input 
                         type="hidden"
                         name="dark_theme"
                         id="theme-checkbox-hidden"
                         value={false}
                         />
                         <input 
                         type="checkbox"
                         name="dark_theme"
                         id="theme-checkbox"
                         value={true}
                         />
                        <span className="slider round"></span>
              </form> */}
                {thisDiscussion ? 
                <>
                    <h1 className="title is-2 has-text-grey discussion-title">{thisDiscussion.title}</h1>
                    <div>{thisDiscussion.description}  </div>
                    <div className="level">
                        <div className="level-left"></div>
                        <div className="level-right">
                            {(user.id === thisDiscussion.user_id && loggedInStatus === "LOGGED_IN") || user.id === adminId ? 
                                  <div className="buttons">
                                  <Link to={`/editDiscussion/${thisDiscussion.id}`} style={{textDecoration: "none"}}>
                                    <Button color = "primary" className="button is-primary is-rounded">
                                      Edit Discussion
                                    </Button>
                                  </Link>
                                  </div>
                            :
                            ""}
                        </div>
                    </div>
                    <hr className= "posts-hr"></hr>
                    { (loggedInStatus === "LOGGED_IN") ?
                      <div className = "container" style={{padding: "0px"}}>
                          <form className="form" onSubmit={createPost} id="newPost">
                            <div className="form-row mb-4">
                              <div className="textarea">
                                <textarea
                                  type="text"
                                  name="content"
                                  className="description"
                                  value= {message}
                                  onChange={e => SetMessage(e.target.value)}
                                  required
                                />
                                <i className="far fa-grin"
                                                        onClick={triggerPicker}
                                                        id="emoji-button">
                                                        </i>
                                <div className="postButton">
                                <input
                              type="submit"
                              value="Post Comment"
                              className="button is-success"
                              style={{fontFamily: "Viga"}}
                            />
                            </div>
                              </div>
                                <input
                                  value= {discussionId}
                                  name="discussion_id"
                                  style={{display: "none"}}
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
                                <input
                                  type="text"
                                  name="username"
                                  value={user.username}
                                  className="description"
                                  required
                                  style={{display: "none"}}
                                />
                                
                            </div>
                            {emojiPicker}
                          </form>
                        </div>
                    :
                    ""}
                    <div className="posts-content-box" id="posts-content-box">
                    {currentPosts}
                    </div>
                    {showPosts().length > 10 ? 
                          <Pagination
                            elementsPerPage={postsPerPage}
                            totalElements={showPosts().length}
                            paginate={paginate}
                        /> : ""}
                        {/* {checkThemeStatus()} */}
                </>
                : 
              <div className="discussions-detail-loading">
                <Loader
                    type="ThreeDots"
                    color="#B50000"
                    secondaryColor = "grey"
                    height={250}
                    width={250}
                    timeout={3000} //3 secs
                /> 
              </div>
                }
            </div>
            <hr />
        </div>
    </div>
   
    {/* {checkThemeStatus()} */}
  </section>
    )
}
export default DiscussionDetail;