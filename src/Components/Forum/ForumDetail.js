import React, {useContext} from "react"
import {Link, useParams} from "react-router-dom"
import {Context} from "../../Context"
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
function ForumDetail() {
    const {forums,discussions} = useContext(Context)
    const {forumId} = useParams()
    const thisForum = forums.find(forum => forum.id.toString() === forumId)
    const showDiscussions =  discussions.filter(discussion => discussion.forum_id.toString() === forumId).map(filteredDiscussion => (
    <div className="box">
      <article className="media">
          <div className="media-left">
          <figure className="image is-48x48">
          <Gravatar email="1000-email@example.com" />
          </figure>
          </div>
          <div className="media-content">
          <Link to={`/discussions/${filteredDiscussion.id}`}>{filteredDiscussion.title}</Link>
          <div className="content">
           {filteredDiscussion.description}
           <hr></hr>
           <p><em><small>Posted <TimeAgo datetime={filteredDiscussion.created_at}/> on {forums.title}
               by 
               </small>
                </em>
                </p>
            </div>
            
          {/* Authentication */}
          <nav className="level is-mobile">
              <div className="level-left">
              <Link to={`/editDiscussion/${filteredDiscussion.id}`} style={{textDecoration: "none"}}>
        <i className="ri-pencil-fill"></i>
        </Link>
              <a className="level-item">
                  
                  <span className="icon is-small"><i className="fa fa-trash-o"></i></span>
              </a>
              </div>
          </nav>
          </div>
      </article>
      </div>
   ))
    return (
<section className = "section">
    <div className = "container">
        <div className = "columns">
            <div className = "column is-9">
                {thisForum ? 
                <>
                    <h1 className="title is-2 has-text-grey discussion-title">{thisForum.title}</h1>
                    <div>{thisForum.description}  </div>
                  
                    <div className="level">
                        <div className="level-left"></div>
                            <div className="level-right">
                         <div className="buttons">
                            
                        </div>
                        </div>
                    </div>
                    {showDiscussions}
                </>
                : "No discussions created in this forum yet..."}
            </div>
          
            <hr />
        </div>
    </div>
   <hr></hr>
        
      
  </section>
    )
}

export default ForumDetail;