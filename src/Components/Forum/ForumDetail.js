import React, {useContext, useState,useEffect} from "react"
import {Link, useParams} from "react-router-dom"
import {Context} from "../../Context"
import Gravatar from 'react-gravatar'
import TimeAgo from 'timeago-react';
import { Button } from 'react-bulma-components';
import Pagination from '../../Pagination';
import comment from '../../icons/comment.png'
import Loader from 'react-loader-spinner'
function ForumDetail() {
    const {forums,discussions,user, loggedInStatus,toggleTheme,checkThemeStatus,fpsbuildsurl} = useContext(Context)
    const {forumId} = useParams()
    const forumsData = forums.map(forum => (
        <h3 className = "forumSideBar" key={forum.id}>
            <p ><Link to={`/forum/${forum.id}`}>{forum.title}</Link></p>
        </h3>
        ))
    const showDiscussions =  discussions.filter(discussion => discussion.forum_id.toString() === forumId).map(filteredDiscussion => (
    <>
    <Link to={`/discussions/${filteredDiscussion.id}`} style={{textDecoration: "none"}}>
        <div className="forum-row">
            <div className="col">
                <div className="media col-6 align-items-center" style={{height: "75px",maxWidth:"100%"}}>
                        <Link to={`/profile/${filteredDiscussion.user_id}`}>{filteredDiscussion.user.attachment_url ? <img src = {`${fpsbuildsurl}/${filteredDiscussion.user.attachment_url}`} className="discussion-avatar" /> : <Gravatar email={filteredDiscussion.user.email}  className = "discussion-avatar" size={100} default="robohash"/>} </Link>
                    <div className="media-body flex-truncate ml-2"><div className="font-weight-semibold" style={{fontSize: "15px", textDecoration: "none"}}>{filteredDiscussion.title}</div> 
                    </div>
                </div>
            </div>
            <div className="d-none d-md-block col-6">
                <div className="forum-row" >
                    <div className="forum-col-2">
                    <div class="text-muted small mt-1">Posted <TimeAgo datetime={filteredDiscussion.created_at}/> by<Link to={`/profile/${filteredDiscussion.user_id}`}>  {filteredDiscussion.username} </Link></div>
                    </div>
                    <div className="forum-col-4">
                    <small>{forums.map(forum => forum.id === filteredDiscussion.forum_id ? <Link to={`/forum/${forum.id}`}>{forum.title} </Link> : "")}</small>
                    </div>
                    <div className="forum-col-2" style={{paddingLeft: "38px"}}>
                    <a className = "post-count"><Link to={`/discussions/${filteredDiscussion.id}`}><img src={comment}/> {filteredDiscussion.posts.length} </Link></a>
                    </div>

                </div>
            </div>
        </div>
        <hr className="forum-hr"></hr>
        </Link>
    </>
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
    useEffect(()=>{
        checkThemeStatus()
        },[])
 return (
    <div>
    <form className="switch" onClick={toggleTheme}style={{float: "right", marginBottom:"10px", display: "none"}} id="setDarkTheme">
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
    <div class="forum-flex">
    <div className= "allforums-box dark" id="allforums-box">
                { (loggedInStatus === "LOGGED_IN") ? <Link to="/newDiscussion" style={{textDecoration: "none"}}>
                            <Button className="new-discussion-btn dark" id="new-discussion-button">
                                New Discussion
                            </Button>
                        </Link> :""}
                        {forumsData} 
    </div>
    <div className="container-fluid mt-100">
    <div className="row">
    <div className="col-md-12">
        <div className="forum-card mb-3">
            <div className="card-header pr-0 pl-0">
                <div className="row no-gutters align-items-center w-100">
                    <div className="col text-muted" style={{margin:"auto", textAlign:"center", paddingRight: "none !important"} }>Discussions</div>
                    <div className="d-none d-md-block col-6 text-muted">
                        <div className="row no-gutters align-items-center">
                            <div className="forum-col-2">Posted</div>
                            <div className="forum-col-4">Forum</div>
                            <div className="forum-col-2">Replies</div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body py-3">
            {showDiscussions ? currentDiscussions :
                        <div className="discussions-loading">
                            <Loader
                            type="Circles"
                            color="#B50000"
                            secondaryColor = "grey"
                            height={160}
                            width={160}
                            timeout={3000} //3 secs
                            />
                        </div>  
                    }
            </div>
            </div>
        </div>
    </div>
    {showDiscussions.length > 10 ? 
            <Pagination
                elementsPerPage={discussionsPerPage}
                totalElements={showDiscussions.length}
                paginate={paginate}
            /> 
        : ""}
    { (loggedInStatus === "LOGGED_IN") ?checkThemeStatus() :""}
    </div>
    </div>    
    </div>
 )
}
export default ForumDetail;