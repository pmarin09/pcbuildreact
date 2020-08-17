import React, {useContext, useState,useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import {Context} from "../../Context"
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { Button } from 'react-bulma-components';
import Pagination from '../../Pagination';

function DiscussionDetail() {
    const{discussions, posts, user, toggleTheme, checkThemeStatus,loggedInStatus,fpsbuildsurl} = useContext(Context)
    const {discussionId} = useParams()
    const thisDiscussion = discussions.find(discussion => discussion.id.toString() === discussionId)
    const showPosts =  posts.filter(post => post.discussion_id.toString() === discussionId).map(filteredPost => (
      <div className="posts-box">
          <article className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                {filteredPost.user.attachment_url ? <img src = {`${fpsbuildsurl}/${filteredPost.user.attachment_url}`} className="discussion-avatar" /> : <Gravatar email={filteredPost.user.email}  className = "discussion-avatar"/>}
                </figure>
              </div>
              <div className="media-content" id= "post-content">
                <div className="content">
                {filteredPost.content}
                <hr></hr>
                <p><em><small>Posted <TimeAgo datetime={filteredPost.created_at}/>  by {filteredPost.username}</small>
                      </em>
                      </p>
                </div>
                {(user.id === filteredPost.user_id && loggedInStatus === "LOGGED_IN") ?
                <nav className="level is-mobile">
                    <div className="level-left">
                    <a className="level-item">
                        <Link to={`/${filteredPost.discussion_id}/editPost/${filteredPost.id}`} style={{textDecoration: "none"}}> <i className="ri-edit-box-fill"></i></Link>
                    </a>
                    <a className="level-item">
                        <i className="ri-delete-bin-5-fill"onClick ={ (e) => { 
                          fetch(`${fpsbuildsurl}/discussions/` + discussionId +"/posts/"+ filteredPost.id + ".json", {
                            method: "DELETE",
                          })
                        e.preventDefault();
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
   ))
console.log(user.dark_theme)
    function createPost(e) {
        const form = new FormData(document.getElementById("newPost"));
        fetch(`${fpsbuildsurl}/posts.json`, {
          method: "POST",
          body: form,
        });
        e.preventDefault();
        window.location.reload(false);
      }
   //PAGINATION 
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage] = useState(20);
   // Get current posts
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = showPosts.slice(indexOfFirstPost, indexOfLastPost);
   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
<section className = "section">
    <div className = "container">
        <div className = "columns">
            <div className = "column is-9" id ="posts-container">
            <form className="switch" onClick={toggleTheme}style={{float: "right"}} id="setDarkTheme">
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
              </form>
                {thisDiscussion ? 
                <>
                    <h1 className="title is-2 has-text-grey discussion-title">{thisDiscussion.title}</h1>
                    <div>{thisDiscussion.description}  </div>
                    <div className="level">
                        <div className="level-left"></div>
                        <div className="level-right">
                            {(user.id === thisDiscussion.user_id && loggedInStatus === "LOGGED_IN") ? 
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
                    <div className="posts-content-box" id="posts-content-box">
                    {currentPosts}
                    </div>
                    {showPosts.length > 20 ? 
                          <Pagination
                            elementsPerPage={postsPerPage}
                            totalElements={showPosts.length}
                            paginate={paginate}
                        /> : ""}
                        {checkThemeStatus()}
                </>
                : "Loading..."}
            </div>
            <hr />
        </div>
    </div>
    <hr></hr>
    { (loggedInStatus === "LOGGED_IN") ?
      <div className = "container">
        <h2 className="title is-5 has-text-grey-light">Create a New Post</h2>
          <form className="form" onSubmit={createPost} id="newPost">
            <div className="form-row mb-4">
              <div className="textarea">
                <textarea
                  type="text"
                  name="content"
                  className="description"
                  required
                />
                <div className="postButton">
                <input
              type="submit"
              value="New Post"
              className="button is-success"
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
          </form>
        </div>
    :
    ""}
    {checkThemeStatus()}
  </section>
    )
}
export default DiscussionDetail;