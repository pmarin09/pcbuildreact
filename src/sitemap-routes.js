import React from 'react';
import {Route} from "react-router-dom";


export default (
        <Route>
          <Route exact path = "/"></Route>
          <Route path= "/allbuilds"></Route>
          <Route  exact path = "/pcbuilds"></Route>
          <Route  path = "/pcbuilds/edit/:buildId"> </Route>
          <Route path = "/builds/:buildId"></Route>
          <Route path= "/favorites"> </Route>
          <Route path = "/signIn"> </Route>
          <Route path = "/register"> </Route>
          <Route path = "/forgotPassword"> </Route>
          <Route path = "/resetPassword"> </Route>
          <Route exact path = "/profile/:userId"> </Route>
          <Route path = "/profile/edit/:userId"> </Route>
          <Route exact path = "/forum/"></Route>
          <Route path = "/forum/:forumId"></Route>
          <Route exact path = "/discussions/"></Route>
          <Route  path = "/discussions/:discussionId"></Route>
          <Route  path = "/newdiscussion/"></Route>
          <Route  path = "/editdiscussion/:discussionId"></Route>
          <Route  path = "/:discussionId/editpost/:postId"></Route>
          <Route  path = "/editbuildpost/:buildpostId"></Route>
          <Route path = "/privacy"> <Privacy/></Route>
          <Route path = "/tos"> <Tos/></Route>
          <Route path = "/contact"> <Contact/></Route>
          <Route path = "/about"> <About/></Route>
        </Route>
    );
