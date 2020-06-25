import React, {useContext,useState} from "react"
import{Context} from "../../Context"
import {Link} from "react-router-dom"
import { Button } from 'react-bulma-components';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import Pagination from '../../Pagination';
import comment from '../../icons/comment.png'
function Discussions(){
    const {forums, discussions, user, loggedInStatus} = useContext(Context)
    const forumsData = forums.map(forum => (
        <h3 className = "forumSideBar" key={forum.id}>
            <p ><Link to={`/forum/${forum.id}`}>{forum.title}</Link></p>
        </h3>
        ))
    const discussionsData = discussions.map(discussion => (
        <div className= "discussions-grid">
           <div style={{margin: "auto"}}> {discussion.user.attachment_url ? <img src = {`http://localhost:3000/${discussion.user.attachment_url}`} className="discussion-avatar" /> : <Gravatar email={discussion.user.email}  className = "discussion-avatar"/>} </div>
                  <div className= "discussions-title"><Link to={`/discussions/${discussion.id}`} style={{float: "left"}}>{discussion.title} - {discussion.description} </Link> {(user.id === discussion.user_id && loggedInStatus === "LOGGED_IN") ? 
                        <Link to={`/editDiscussion/${discussion.id}`} style={{textDecoration: "none"}}>
                                <i className="ri-pencil-fill" style={{float: "left"}}></i>
                        </Link>
                        :
                        ""}<hr className="hr-discussions-bottom"></hr> </div>
                     <p className= "posted"><em><small>Posted <TimeAgo datetime={discussion.created_at}/> by {discussion.username} on {
                         forums.map(forum => forum.id === discussion.forum_id ? <Link to={`/forum/${forum.id}`}>{forum.title} </Link> : "")
                     }
                       <hr className="hr-discussions-top"></hr> 
                    </small>
                     </em>
                     
                     </p>

                     <div className = "post-count"><Link to={`/discussions/${discussion.id}`} style={{float: "left"}}><img src={comment}/> {discussion.posts.length} </Link></div>
       </div>
            
        ))
    function createDiscussion(e) {
        const form = new FormData(document.getElementById("newDiscussion"));
        fetch("http://localhost:3000/discussions.json", {
          method: "POST",
          body: form,
        });
        e.preventDefault();
        alert("A new Forum has been created");
      }

 //PAGINATION 
   const [currentPage, setCurrentPage] = useState(1);
   const [discussionsPerPage] = useState(10);

  // Get current posts
  const indexOfLastDiscussion = currentPage * discussionsPerPage;
  const indexOfFirstDiscussion = indexOfLastDiscussion - discussionsPerPage;
  const currentDiscussions = discussionsData.slice(indexOfFirstDiscussion, indexOfLastDiscussion);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

    return(

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
                <td> {currentDiscussions}</td>
                
            </tr>
            
            </tbody>
           
            
        </table>
                        <Pagination
                            elementsPerPage={discussionsPerPage}
                            totalElements={discussionsData.length}
                            paginate={paginate}
                        />
</section>

        )
}

 export default Discussions;