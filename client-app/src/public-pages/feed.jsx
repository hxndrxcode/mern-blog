import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import { Api, handleApiError } from "../helper/Api";
import PageHeader from "../partials/page-header";
import PostItem from "../partials/post-item";
import * as Icon from "react-feather"

const Feed = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Feed' + store.docTitle
  const [state, setState] = useState({
    listData: [],
    redirect: false,
    followingCount: 0
  })

  const fetchPost = () => {
    if (!store.authuser) {
      return false
    }
    Api.get('postfeed', store.authHeader)
      .then(res => {
        setState({
          ...state,
          listData: res.data.data,
          followingCount: res.data.following_count
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  useEffect(() => {
    fetchPost()
    if (!store.authuser) {
      setTimeout(() => {
        setState({
          ...state,
          redirect: true
        })
      }, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.redirect ? <Redirect to="/trending" /> : (
    <React.Fragment>
      <PageHeader title="Feed" />
      {store.authuser ? (
        <div className="border mb-3 px-3 py-2">
          {state.followingCount > 0 ? (
            <Link to="/blogs?show=follow">
              <Icon.ArrowRight className="float-right" />
              <span>See your {state.followingCount} following blogs</span>
            </Link>
          ) : (
            <Link to="/blogs">
              <Icon.ArrowRight className="float-right" />
              <span>Start folllow a blog to get your feed</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="text-center">
          <span>Feed only available for logged in user. You are redirected to </span>
          <Link to="/trending">Trending</Link>...
        </div>
      )}
      {state.listData.map(v => {
        return <PostItem data={v} key={v._id} />
      })}
    </React.Fragment>
  )
}
export default Feed;