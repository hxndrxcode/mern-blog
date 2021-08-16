import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../partials/page-header";
import { Link, useParams } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import { Api, handleApiError } from "../helper/Api";
import MyBlogMenu from "../partials/my-blog-menu";
import * as Icon from "react-feather"

const MyBlogOverview = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Overview' + store.docTitle
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    blogData: {
      navbar: [],
      dashboard: {}
    }
  })

  const fetchBlog = () => {
    Api.get('myblog/' + blogId, store.authHeader)
      .then(res => {
        setState({
          ...state,
          backupLogo: res.data.blog.logo,
          blogData: res.data.blog
        })
      })
      .catch(err => handleApiError(err, store, dispatch))
  }

  useEffect(() => {
    fetchBlog()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <PageHeader title={state.blogData.title}>
        <MyBlogMenu blogId={blogId} path="overview" />
      </PageHeader>
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="bg-light border p-3">
            <p className="mb-2">
              <Link to={'/my-blog/' + blogId + '/post'}>
                Published Post
              </Link>
              <span className="text-muted"> / Total</span>
            </p>
            <h1 className="mb-0">
              {state.blogData.dashboard.post_published_count}
              <span className="text-muted"> / {state.blogData.post_count}</span>
            </h1>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="bg-light border p-3">
            <p className="mb-2">
              <Link to={'/my-blog/' + blogId + '/comment'}>
                Unread Comment
              </Link>
              <span className="text-muted"> / Total</span>
            </p>
            <h1 className="mb-0">
              {state.blogData.dashboard.comment_unread_count}
              <span className="text-muted"> / {state.blogData.dashboard.comment_count}</span>
            </h1>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="bg-light border p-3">
            <p className="mb-2">
              <Link to={'/my-blog/' + blogId + '/follower'}>
                Total Follower
              </Link>
            </p>
            <h1 className="mb-0">
              {state.blogData.follower_count}
            </h1>
          </div>
        </div>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <td style={{ width: '30px' }}>
              {state.blogData.tagline ? <Icon.Check className="text-success" /> : <Icon.AlertTriangle className="text-danger" />}
            </td>
            <td>
              <Link to={'/my-blog/' + blogId + '/setting'}>
                Tagline
              </Link>
            </td>
            <td><span className="d-none d-md-inline text-muted">{state.blogData.tagline}</span></td>
          </tr>
          <tr>
            <td>
              {state.blogData.logo ? <Icon.Check className="text-success" /> : <Icon.AlertTriangle className="text-danger" />}
            </td>
            <td>
              <Link to={'/my-blog/' + blogId + '/setting'}>
                Logo
              </Link>
            </td>
            <td><span className="d-none d-md-inline text-muted">{state.blogData.logo}</span></td>
          </tr>
          <tr>
            <td>
              {state.blogData.navbar.length > 0 ? <Icon.Check className="text-success" /> : <Icon.AlertTriangle className="text-danger" />}
            </td>
            <td>
              <Link to={'/my-blog/' + blogId + '/layout'}>
                Navbar
              </Link>
            </td>
            <td><span className="d-none d-md-inline text-muted">{state.blogData.navbar.length} Item(s)</span></td>
          </tr>
          <tr>
            <td>
              {state.blogData.dashboard.about ? <Icon.Check className="text-success" /> : <Icon.AlertTriangle className="text-danger" />}
            </td>
            <td>
              <Link to={'/my-blog/' + blogId + '/page'}>
                About
              </Link>
            </td>
            <td><span className="d-none d-md-inline text-muted">{state.blogData.dashboard.about}</span></td>
          </tr>
          <tr>
            <td>
              {state.blogData.dashboard.privacy_policy ? <Icon.Check className="text-success" /> : <Icon.AlertTriangle className="text-danger" />}
            </td>
            <td>
              <Link to={'/my-blog/' + blogId + '/page'}>
                Privacy Policy
              </Link>
            </td>
            <td><span className="d-none d-md-inline text-muted">{state.blogData.dashboard.privacy_policy}</span></td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default MyBlogOverview