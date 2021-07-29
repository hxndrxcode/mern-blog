import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../partials/page-header";
import { RootContext } from "../context/rootContext";
import axios from "axios";
import { handleApiError } from "../helper/Api";
import BlogItem from "../partials/blog-item";

const Blogs = props => {
  const { store, dispatch } = useContext(RootContext)
  const qs = new URLSearchParams(props.location.search)
  const [state, setState] = useState({
    listData: [],
    show: qs.get('show') || 'all'
  })

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

  const changeShow = e => {
    setState({
      ...state,
      show: e.target.value
    })
  }

  useEffect(() => {
    document.title = 'Explore Blogs' + store.docTitle
    fetchBlog()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.show])

  return (
    <React.Fragment>
      <PageHeader title="Explore Blogs" />
      <div className="mb-3">
        <select onChange={changeShow} value={state.show} className="form-control">
          <option value="all">Show All</option>
          <option value="follow">I am following</option>
        </select>
      </div>
      {state.listData.map(v => {
        return <BlogItem data={v} key={v._id} />
      })}
    </React.Fragment>
)
  }

export default Blogs