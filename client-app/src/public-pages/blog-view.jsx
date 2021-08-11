import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import { Api, handleApiError } from "../helper/Api";
import PageHeader from "../partials/page-header";
import PostItem from "../partials/post-item";
import * as Icon from "react-feather"

const BlogView = props => {
  const { blogId } = useParams()
  const { store, dispatch } = useContext(RootContext)
  const [postList, setPostList] = useState([])
  const [blogData, setBlogdata] = useState({
    user: {}
  })

  const fetchPost = () => {
    Api.get('postbyblog/' + blogId, store.authHeader)
      .then(res => {
        setPostList(res.data.posts)
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  const fetchBlog = () => {
    Api.get('exploreblog/' + blogId, store.authHeader)
      .then(res => {
        setBlogdata(res.data.blog)
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  document.title = blogData.title + store.docTitle
  useEffect(() => {
    fetchBlog()
    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <PageHeader title={blogData.title} btnLink="/blogs" btnText="Blogs" />
      {!!blogData._id && (
        <div className="d-sm-flex d-block">
          <div className="mr-sm-3">
            <img src={blogData.logo} alt="" className="mb-3" />
          </div>
          <div>
            <p className="mb-1">{blogData.tagline}</p>
            <p className="text-muted mb-1">
              <Icon.Edit />
              {blogData.post_count} posts
              <Icon.Users className="ml-3" />
              {blogData.follower_count} followers
            </p>
            <p className="mb-1 text-muted">
              <Icon.UserCheck />
              Author: &nbsp;
              <Link to={'/author/' + blogData.user.username}>{blogData.user.username}</Link>
            </p>
            <p className="mb-0 text-muted">
              <Icon.Globe />
              <a href={`${blogData.hostname}?ref=app.blogwi.org`} target="_blank" rel="noopener noreferrer">
                {blogData.hostname}
              </a>
            </p>
          </div>
        </div>
      )}
      <hr />
      {postList.map(v => {
        return <PostItem data={v} key={v._id} showBlog={false} />
      })}
    </React.Fragment>
  )
}
export default BlogView;