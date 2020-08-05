import React, {useContext,useState,useEffect} from "react"
import{Context} from "../../Context"
import {Link} from "react-router-dom"
import { Button } from 'react-bulma-components';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import Pagination from '../../Pagination';
import comment from '../../icons/comment.png'

function Discussions(){
    const {fpsbuildsurl,forums, discussions, user,checkLoginStatus, loggedInStatus,toggleTheme,checkThemeStatus} = useContext(Context)
    const forumsData = forums.map(forum => (
        <h3 className = "forumSideBar" key={forum.id}>
            <p ><Link to={`/forum/${forum.id}`}>{forum.title}</Link></p>
        </h3>
        ))
    const discussionsData = discussions.map(discussion => (
        <div className= "discussions-grid">
           <div style={{margin: "auto"}}> <Link to={`/profile/${discussion.user_id}`}>{discussion.user.attachment_url ? <img src = {`${fpsbuildsurl}/${discussion.user.attachment_url}`} className="discussion-avatar" /> : <Gravatar email={discussion.user.email}  className = "discussion-avatar"/>} </Link></div>
                  <div className= "discussions-title"><Link to={`/discussions/${discussion.id}`} style={{float: "left"}}><strong style={{fontSize: "15px"}}>{discussion.title}</strong> -    {discussion.description} </Link> {(user.id === discussion.user_id && loggedInStatus === "LOGGED_IN") ? 
                        <Link to={`/editDiscussion/${discussion.id}`} style={{textDecoration: "none"}}>
                                <i className="ri-pencil-fill" style={{float: "left"}}></i>
                        </Link>
                        :
                        ""}<hr className="hr-discussions-bottom"></hr> </div>
                     <div className= "posted"><em><small>Posted <TimeAgo datetime={discussion.created_at}/> by  <Link to={`/profile/${discussion.user_id}`}> {discussion.username} </Link> on {
                         forums.map(forum => forum.id === discussion.forum_id ? <Link to={`/forum/${forum.id}`}>{forum.title} </Link> : "")
                     }
                       <hr className="hr-discussions-top"></hr> 
                    </small>
                     </em>
                     
                     </div>

                     <div className = "post-count"><Link to={`/discussions/${discussion.id}`} style={{float: "left"}}><img src={comment}/> {discussion.posts.length} </Link></div>
       </div>
        ))
    function createDiscussion(e) {
        const form = new FormData(document.getElementById("newDiscussion"));
        fetch(`${fpsbuildsurl}/discussions.json`, {
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

//   useEffect(()=>{
//     checkLoginStatus()
//   },[])
 

    return(

<section className="forms text-center border border-light p-5">

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
                       
        <table className="discussions-table" id="discussions-table">
            <thead>
            <tr>
                <th className= "all-forums">All Forums</th>
                <th className= "all-discussions">Discussions</th>
                <th className = "date-posted">Date Posted</th>
                <th className = "all-posts">Posts</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <div className="allforums-box" id="allforums-box">
                <div> { (loggedInStatus === "LOGGED_IN") ? <Link to="/newDiscussion" style={{textDecoration: "none"}}>
                        <Button className="new-discussion-btn" id="new-discussion-button">
                            New Discussion
                        </Button>
                    </Link> :""}
                    {forumsData} 
               </div>
            </div>
                <td className= "discussions-td"> {currentDiscussions}</td>
                
            </tr>
            
            </tbody>
            
        </table>
        <hr></hr>
        {discussionsData.length > 10 ? 
            <Pagination
            elementsPerPage={discussionsPerPage}
            totalElements={discussionsData.length}
            paginate={paginate}/> 
            
        :""}
       { (loggedInStatus === "LOGGED_IN") ?checkThemeStatus() :""}

      
</section>

        )
}

 export default Discussions;