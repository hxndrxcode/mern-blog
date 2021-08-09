import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RootContext } from "../context/rootContext"
import PageHeader from "../partials/page-header"
import * as Icon from "react-feather"
import { handleApiError } from "../helper/Api"
import MyBlogMenu from "../partials/my-blog-menu"

const MyComment = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'My Comment' + store.docTitle
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    blogData: {},
    listData: [],
    search: ''
  })

  const fetchData = () => {
    axios.get(`${store.apiUrl}/mycomment?blog_id=${state.blogId}&search=${state.search}`, store.authHeader)
      .then(({ data }) => {
        setState({
          ...state,
          listData: data.comments,
          blogData: data.blog
        })
      })
  }

  const toggleItem = e => {
    let data = {
      blog_id: state.blogId,
      action: e.target.dataset.action,
      checked: [e.target.dataset.id]
    }
    axios.post(`${store.apiUrl}/mycomment/bulkaction`, data, store.authHeader)
      .then(res => {
        fetchData()
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  const keySearch = e => {
    if (e.code !== 'Enter') return false;
    setState({
      ...state,
      search: e.target.value
    })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.search])

  return !state.blogData.title ? '' : (
    <React.Fragment>
      <PageHeader title={state.blogData.title}>
        <MyBlogMenu blogId={blogId} path="comment" />
      </PageHeader>
      <div className="mb-3">
        <input type="text" onKeyUp={keySearch} className="form-control" placeholder="Search" />
      </div>
      {state.listData.map(v => {
        return (
          <div className="border p-3 mb-3" key={v._id}>
            <p className="text-muted">
              <span>
                <Icon.Clock />
                {v.formatted_date}
              </span>
              <span className="ml-2">
                <Icon.Edit />
                {v.post.title.substr(0, 30)}...
              </span>
            </p>
            <p className="">
              {v.comment.substr(0, 100)}
            </p>
            {v.is_hidden ? (
              <button onClick={toggleItem} data-id={v._id} data-action="show" className="btn btn-sm mr-2 btn-light">
                <Icon.Eye /> Show
              </button>
            ) : (
              <button onClick={toggleItem} data-id={v._id} data-action="hide" className="btn btn-sm mr-2 btn-light">
                <Icon.EyeOff /> Hide
              </button>
            )}
            <a href={`${v.blog.hostname}/post/${v.post.permalink}/comment`} target="_blank" rel="noreferrer noopener" className="btn btn-sm btn-light">
              <Icon.ExternalLink /> Visit
            </a>
          </div>
        )
      })}
    </React.Fragment >
  )
}

export default MyComment