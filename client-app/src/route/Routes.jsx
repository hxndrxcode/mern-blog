import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Feed from "../public-pages/feed";
import Blogs from "../public-pages/blogs";
// import AuthLogin from "../public-pages/auth-login";
// import AuthRegister from "../public-pages/auth-register";
import AuthLoginOauth from '../public-pages/auth-login-oauth';

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
import BlogView from '../public-pages/blog-view';
import Trending from '../public-pages/trending';
import MyLayout from '../private-pages/my-layout';
import AuthOauthProvider from '../public-pages/auth-oauth-provider';

const Routes = props => {
  return (
    <div>
      <Switch>
        {/* <Route exact path="/register" component={AuthRegister} /> */}
        {/* <Route exact path="/login" component={AuthLogin} /> */}
        <Route exact path="/login" component={AuthLoginOauth} />
        <Route exact path="/oauth/:provider" component={AuthOauthProvider} />

        <Route exact path="/" component={Feed} />
        <Route exact path="/trending" component={Trending} />
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/blog/:blogId" component={BlogView} />

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
        <PrivateRoute exact path="/my-blog/:blogId/layout" component={MyLayout} />

        <Redirect exact from="/my-account" to="/my-account/edit" />
        <PrivateRoute exact path="/my-account/edit" component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default Routes
