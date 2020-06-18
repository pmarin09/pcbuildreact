import React, {useContext} from "react"
import{Context} from "../../Context"
import {Link} from "react-router-dom"
import { Button } from 'react-bulma-components';
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';


function Discussions(){
    const {forums, discussions, user, loggedInStatus} = useContext(Context)
    const forumsData = forums.map(forum => (
        <h3 className = "forumSideBar" key={forum.id}>
            <p ><Link to={`/forum/${forum.id}`}>{forum.title}</Link></p>
        </h3>
        ))
    const discussionsData = discussions.map(discussion => (
            <>
            <h3 className="title is-5"><Gravatar email="g-email@example.com" /> <Link to={`/discussions/${discussion.id}`}>{discussion.title}</Link></h3>
                 <div className="content"> {discussion.description}
                     <p><em><small>Posted <TimeAgo datetime={discussion.created_at}/> by {discussion.username} on {
                         forums.map(forum => forum.id === discussion.forum_id ? <Link to={`/forum/${forum.id}`}>{forum.title}</Link> : "")
                     }
                    </small>
                     </em>
                     </p>
                 </div>
                 {(user.id === discussion.user_id && loggedInStatus === "LOGGED_IN") ? 
        <Link to={`/editDiscussion/${discussion.id}`} style={{textDecoration: "none"}}>
        <i className="ri-pencil-fill"></i>
        </Link>
                :
                ""}
                 <hr></hr>
             </>
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

    return(
 <section className = "section">
    <div className = "container">
        <div className="columns">
            <div className="column is-8">
                <h3 className="title is-5 has-text-grey-light">Latest Discussions</h3>
                    <div className="discussions">
                        <div className="columns bb-not-last pv10">
                        
                        <div className="column is-8">
                                    {discussionsData}  
                        </div>
                    </div>
                    </div>
                </div>
            
        <div className="column is-2 ">
        
        <Link to="/newDiscussion" style={{textDecoration: "none"}}>
            <Button color = "primary" className="button is-primary is-rounded">
            New Discussion
            </Button>
        </Link>
                <ul className="box">
                <h3 className="title is-5 has-text-grey-light">Forums</h3>
                    <li>{forumsData}  </li>
                </ul>
            <br/>
            </div>
    </div>
</div>
</section>
        )
}

 export default Discussions;