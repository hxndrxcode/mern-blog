import React, { useContext, useEffect, useState } from "react";
import { RootContext } from "../context/rootContext";
import { Api, handleApiError } from "../helper/Api";
import PageHeader from "../partials/page-header";
import PostItem from "../partials/post-item";

const Trending = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Trending' + store.docTitle
  const [state, setState] = useState({
    listData: [],
  })

  const fetchPost = () => {
    if (!store.authuser) {
      return false
    }
    Api.get('postfeed', store.authHeader)
      .then(res => {
        setState({
          ...state,
          listData: res.data.data
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  useEffect(() => {
    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <PageHeader title="Trending" />
      {state.listData.map(v => {
        return <PostItem data={v} key={v._id} />
      })}
    </React.Fragment>
  )
}
export default Trending;