import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import { handleApiError } from "../helper/Api";
import PageHeader from "../partials/page-header";
import PostItem from "../partials/post-item";
import * as Icon from "react-feather"

const Feed = props => {
  const { store, dispatch } = useContext(RootContext)
  const [state, setState] = useState({
    listData: []
  })

  const fetchPost = () => {
    axios.get(store.apiUrl + '/postfeed', store.authHeader)
      .then(res => {
        setState({
          ...state,
          listData: res.data.data
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  useEffect(() => {
    document.title = 'Feed' + store.docTitle
    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <PageHeader title="Feed" />
      <div className="border mb-3 px-3 py-2">
        <Link to="/blogs?show=follow">
          <Icon.ArrowRight className="float-right" />
          See your 32 following blogs
        </Link>
      </div>

      {state.listData.map(v => {
        return <PostItem data={v} key={v._id} />
      })}
    </React.Fragment>
  )
}
export default Feed;