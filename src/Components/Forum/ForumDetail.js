import React, {useContext, useState} from "react"
import {Link, useParams} from "react-router-dom"
import {Context} from "../../Context"
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { Button } from 'react-bulma-components';
import Pagination from '../../Pagination';
import comment from '../../icons/comment.png'

function ForumDetail() {
    const {forums,discussions,user, loggedInStatus} = useContext(Context)
    const {forumId} = useParams()
    const thisForum = forums.find(forum => forum.id.toString() === forumId)
    const forumsData = forums.map(forum => (
        <h3 className = "forumSideBar" key={forum.id}>
            <p ><Link to={`/forum/${forum.id}`}>{forum.title}</Link></p>
        </h3>
        ))
 
    const showDiscussions =  discussions.filter(discussion => discussion.forum_id.toString() === forumId).map(filteredDiscussion => (
        <div className= "discussions-grid">
        <div style={{margin: "auto"}}> {filteredDiscussion.user.attachment_url ? <img src = {`http://localhost:3000/${filteredDiscussion.user.attachment_url}`} className="discussion-avatar" /> : <Gravatar email={filteredDiscussion.user.email}  className = "discussion-avatar"/>} </div>
               <div className= "discussions-title"><Link to={`/discussions/${filteredDiscussion.id}`} style={{float: "left"}}><strong style={{fontSize: "15px"}}>{filteredDiscussion.title}</strong> - {filteredDiscussion.description} </Link> {(user.id === filteredDiscussion.user_id && loggedInStatus === "LOGGED_IN") ? 
                     <Link to={`/editDiscussion/${filteredDiscussion.id}`} style={{textDecoration: "none"}}>
                             <i className="ri-pencil-fill" style={{float: "left"}}></i>
                     </Link>
                     :
                     ""}<hr className="hr-discussions-bottom"></hr> </div>
                  <p className= "posted"><em><small>Posted <TimeAgo datetime={filteredDiscussion.created_at}/> by {filteredDiscussion.username} on {
                      forums.map(forum => forum.id === filteredDiscussion.forum_id ? <Link to={`/forum/${forum.id}`}>{forum.title} </Link> : "")
                  }
                    <hr className="hr-discussions-top"></hr> 
                 </small>
                  </em>
                  
                  </p>

                  <div className = "post-count"><Link to={`/discussions/${filteredDiscussion.id}`} style={{float: "left"}}><img src={comment}/> {filteredDiscussion.posts.length} </Link></div>
    </div>
   ))


   //PAGINATION 
   const [currentPage, setCurrentPage] = useState(1);
   const [discussionsPerPage] = useState(10);

  // Get current posts
  const indexOfLastDiscussion = currentPage * discussionsPerPage;
  const indexOfFirstDiscussion = indexOfLastDiscussion - discussionsPerPage;
  const currentDiscussions = showDiscussions.slice(indexOfFirstDiscussion, indexOfLastDiscussion);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
    return (


<section className="forms text-center border border-light p-5">
<table className="table table-hover">
    <thead>
    <tr>
        <th className= "all-forums">All Forums</th>
        <th className= "all-discussions">Discussions</th>
        <th className = "all-posts">Date Posted</th>
        <th className = "all-posts">Posts</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <ul className="box">
        <td><Link to="/newDiscussion" style={{textDecoration: "none"}}>
                <Button color = "primary" className="new-discussion-btn">
                    New Discussion
                </Button>
            </Link>
            {forumsData} 
       </td>
    </ul>
        <td> {showDiscussions}</td>
        
    </tr>
    
    </tbody>
   
    
</table>
                <Pagination
                    elementsPerPage={discussionsPerPage}
                    totalElements={showDiscussions.length}
                    paginate={paginate}
                />
</section>
    )
}

export default ForumDetail;