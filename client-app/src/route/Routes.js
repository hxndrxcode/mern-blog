import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Feed from "../components/main/Feed";
import Blogs from "../components/main/Blogs";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

import MyBlog from "../components/main/MyBlog";
import MyAccount from "../components/main/MyAccount";
import CreateBlog from '../components/main/CreateBlog';
import MyPost from '../components/myblog/MyPost';
import CreatePost from '../components/myblog/CreatePost';
import EditPost from '../components/myblog/EditPost';

const Routes = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/" component={Feed} />
        <Route exact path="/trending" component={Feed} />
        <Route exact path="/blogs" component={Blogs} />


        <PrivateRoute exact path="/my-blog" component={MyBlog} />
        <PrivateRoute exact path="/my-blog/create" component={CreateBlog} />
        <Redirect exact from="/my-blog/:blogId" to="/my-blog/:blogId/post" />

        <PrivateRoute exact path="/my-blog/:blogId/post" component={MyPost} />
        <PrivateRoute exact path="/my-blog/:blogId/post/create" component={CreatePost} />
        <PrivateRoute exact path="/my-blog/:blogId/post/:postId/edit" component={EditPost} />

        <PrivateRoute exact path="/my-account" component={MyAccount} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  )
}

export default Routes
