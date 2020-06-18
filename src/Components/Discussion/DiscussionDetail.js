import React, {useContext, useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import {Context} from "../../Context"
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { Button } from 'react-bulma-components';

function DiscussionDetail() {
    const{discussions, posts, user, loggedInStatus} = useContext(Context)
    const {discussionId} = useParams()
    const thisDiscussion = discussions.find(discussion => discussion.id.toString() === discussionId)
    const thisPost = posts.find(post => post.discussion_id.toString() === discussionId)
    const showPosts =  posts.filter(post => post.discussion_id.toString() === discussionId).map(filteredPost => (
    
   <div className="box">
      <article className="media">
          <div className="media-left">
          <figure className="image is-48x48">
          <Gravatar email="1000-email@example.com" />
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
                    fetch("http://localhost:3000/discussions/" + discussionId +"/posts/"+ filteredPost.id + ".json", {
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

    function createPost(e) {
     
        const form = new FormData(document.getElementById("newPost"));
        
        fetch("http://localhost:3000/posts.json", {
          method: "POST",
          body: form,
        });
        e.preventDefault();
        window.location.reload(false);
      }

   

    return (
<section className = "section">
    <div className = "container">
        <div className = "columns">
            <div className = "column is-9">
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
                    {showPosts}
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
                <input
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
  </section>
    )
}

export default DiscussionDetail;