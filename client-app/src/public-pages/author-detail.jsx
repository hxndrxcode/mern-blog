import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../partials/page-header";
import { RootContext } from "../context/rootContext";
import axios from "axios";
import { Api, handleApiError } from "../helper/Api";
import BlogItem from "../partials/blog-item";
import { useParams } from "react-router-dom";
import * as Icon from "react-feather"

const AuthorDetail = props => {
  const { store, dispatch } = useContext(RootContext)
  const { username } = useParams()
  const qs = new URLSearchParams(props.location.search)
  const [user, setUser] = useState({})
  const [state, setState] = useState({
    listData: [],
    show: qs.get('show') || 'all',
    update: 0,
  })

  document.title = 'Profile ' + username + store.docTitle

  const fetchUser = () => {
    Api.get('author/' + username, store.authHeader)
      .then(res => {
        setUser(res.data.user)
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  const fetchBlog = () => {
    axios.get(store.apiUrl + '/exploreblog?show=' + state.show, store.authHeader)
      .then(res => {
        setState({
          ...state,
          listData: res.data.data
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  const doFollow = e => {
    Api.post('follow/' + e.target.dataset.id, null, store.authHeader)
      .then(res => {
        setState({
          ...state,
          update: new Date().getTime()
        })
      })
      .catch(err => handleApiError(err, store, dispatch))
  }

  const doUnfollow = e => {
    Api.post('unfollow/' + e.target.dataset.id, null, store.authHeader)
      .then(res => {
        setState({
          ...state,
          update: new Date().getTime()
        })
      })
      .catch(err => handleApiError(err, store, dispatch))
  }

  useEffect(() => {
    fetchUser()
    fetchBlog()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.show, state.update])

  return (
    <React.Fragment>
      <PageHeader title={'Profile ' + username} btnLink="/authors" btnText="Authors" />
      <div className="d-sm-flex d-block mb-4">
        <div className="mr-sm-3">
          <img src={user.photo} alt="" className="mb-3" />
        </div>
        <div>
          <p className="mb-1">{user.fullname}</p>
          <p className="text-muted mb-0">
            <Icon.AtSign />
            {user.username}
          </p>
          <p className="text-muted mb-1">
            <Icon.Folder />
            {user.blog_count} blogs
          </p>
          <div>
            {user.bio}
          </div>
        </div>
      </div>
      {state.listData.map(v => {
        return <BlogItem data={v} key={v._id} doFollow={doFollow} doUnfollow={doUnfollow} />
      })}
    </React.Fragment>
  )
}

export default AuthorDetail