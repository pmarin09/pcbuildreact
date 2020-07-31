import React, { useState, useEffect } from "react";
import {Switch, Route} from "react-router-dom";
import Favorites from "./Build/Favorites"
import PcBuilds from "./Build/PcBuilds"
import ProfilePage from "./Profile/ProfilePage";
import EditProfile from "./Profile/EditProfile";
import Main from "./Main";
import AllBuilds from "./Build/AllBuilds"
import BuildDetail from "./Build/BuildDetail"
import EditBuild from "./Build/EditBuild"
import Discussions from "./Discussion/Discussions"
import DiscussionDetail from "./Discussion/DiscussionDetail"
import NewDiscussion from "./Discussion/NewDiscussion"
import EditDiscussion from "./Discussion/EditDiscussion"
import EditPost from "./Discussion/EditPost"
import EditBuildPost from "./Build/EditBuildPost"
import Forum from "./Forum/Forum"
import ForumDetail from "./Forum/ForumDetail"
import Login from "./auth/Login"
import Registration from "./auth/Registration"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import 'react-bulma-components/dist/react-bulma-components.min.css';


function Application() {

  return (
     
      <Switch>
      <Route exact path = "/"> <Main/> </Route>
      <Route path= "/allbuilds"> <AllBuilds/></Route>
      <Route  exact path = "/pcbuilds"> <PcBuilds/></Route>
      <Route  path = "/pcbuilds/edit/:buildId"> <EditBuild/></Route>
      <Route path = "/builds/:buildId"> <BuildDetail/> </Route>
      <Route path= "/favorites"> <Favorites/></Route>
      <Route path = "/signIn"> <Login/> </Route>
      <Route path = "/register"> <Registration/> </Route>
      <Route path = "/forgotPassword"> <ForgotPassword/> </Route>
      <Route path = "/resetPassword"> <ResetPassword/> </Route>
      <Route exact path = "/profile/:userId"> <ProfilePage/> </Route>
      <Route path = "/profile/edit/:userId"> <EditProfile/> </Route>
      <Route exact path = "/forum/"> <Forum/> </Route>
      <Route path = "/forum/:forumId"> <ForumDetail/> </Route>
      <Route exact path = "/discussions/"> <Discussions/></Route>
      <Route  path = "/discussions/:discussionId"> <DiscussionDetail/></Route>
      <Route  path = "/newdiscussion/"> <NewDiscussion/></Route>
      <Route  path = "/editdiscussion/:discussionId"> <EditDiscussion/></Route>
      <Route  path = "/:discussionId/editpost/:postId"> <EditPost/></Route>
      <Route  path = "/editbuildpost/:buildpostId"> <EditBuildPost/></Route>
      </Switch>
        
  );
}

export default Application;
