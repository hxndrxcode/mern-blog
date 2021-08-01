import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Feed from "../public-pages/feed";
import Blogs from "../public-pages/blogs";
import AuthLogin from "../public-pages/auth-login";
import AuthRegister from "../public-pages/auth-register";

import MyBlog from "../private-pages/my-blog";
import EditProfile from "../private-pages/edit-profile";
import MyBlogCreate from '../private-pages/my-blog-create';
import MyPost from '../private-pages/my-post';
import MyPostCreate from '../private-pages/my-post-create';
import MyPostEdit from '../private-pages/my-post-edit';
import MyComment from '../private-pages/my-comment';
import MyPage from '../private-pages/my-page';
import MyPageCreate from '../private-pages/my-page-create';
import MyPageEdit from '../private-pages/my-page-edit';
import MyBlogSetting from '../private-pages/my-blog-setting';
import MyFollower from '../private-pages/my-follower';
import NotFound from '../public-pages/not-found';

const Routes = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/register" component={AuthRegister} />
        <Route exact path="/login" component={AuthLogin} />

        <Route exact path="/" component={Feed} />
        <Route exact path="/trending" component={Feed} />
        <Route exact path="/blogs" component={Blogs} />

        <PrivateRoute exact path="/my-blog" component={MyBlog} />
        <PrivateRoute exact path="/my-blog/create" component={MyBlogCreate} />
        <PrivateRoute exact path="/my-blog/:blogId/setting" component={MyBlogSetting} />
        <Redirect exact from="/my-blog/:blogId" to="/my-blog/:blogId/post" />

        <PrivateRoute exact path="/my-blog/:blogId/post" component={MyPost} />
        <PrivateRoute exact path="/my-blog/:blogId/post/create" component={MyPostCreate} />
        <PrivateRoute exact path="/my-blog/:blogId/post/:postId/edit" component={MyPostEdit} />

        <PrivateRoute exact path="/my-blog/:blogId/page" component={MyPage} />
        <PrivateRoute exact path="/my-blog/:blogId/page/create" component={MyPageCreate} />
        <PrivateRoute exact path="/my-blog/:blogId/page/:pageId/edit" component={MyPageEdit} />

        <PrivateRoute exact path="/my-blog/:blogId/comment" component={MyComment} />
        <PrivateRoute exact path="/my-blog/:blogId/follower" component={MyFollower} />

        <Redirect exact from="/my-account" to="/my-account/edit" />
        <PrivateRoute exact path="/my-account/edit" component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default Routes
